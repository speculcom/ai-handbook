import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
// ============================================================================
// 部署：site/ → speculcom/models（Pages 部署仓）
// ----------------------------------------------------------------------------
// 为什么不用 git：github.com 的 git transport 在本工作区被沙箱封锁
// （schannel 吊销检查失败 / node execSync EBUSY）。可靠路径 = gh.exe + Contents API。
//
// 内容仓与部署仓分离：
//   speculcom/ai-quantized-llm  内容层（数据 + 脚本 + 文档）
//   speculcom/models            部署层（site/ 的静态产物）
//
// 用法：node scripts/deploy.mjs [owner/repo]   默认 speculcom/models
// ============================================================================

const HERE = path.dirname(fileURLToPath(import.meta.url));

/** git blob 的 SHA-1（"blob <len>\0<content>"），用于跳过内容未变的文件 */
function gitBlobSha(buf) {
  const head = Buffer.from(`blob ${buf.length}\0`, 'utf8');
  return crypto.createHash('sha1').update(Buffer.concat([head, buf])).digest('hex');
}

const GH = process.env.GH_BIN || 'gh';
// PAT 只从环境变量读。硬编码进脚本会被 GitHub 密钥扫描拦下（409 拒绝写入）。
const TOKEN = process.env.GH_TOKEN;
if (!TOKEN) {
  console.error('✗ 未设置 GH_TOKEN。用法：GH_TOKEN=ghp_xxx node deploy.mjs [owner/repo]');
  process.exit(1);
}
const REPO = process.argv[2] || 'speculcom/models';
// Windows 注意：不能用 new URL(import.meta.url).pathname（在 Windows 上得到 "/C:/..."）
const SITE = path.resolve(HERE, '..', 'site');

// EBUSY 是本机的老坑：node 的 execFileSync 调 gh.exe 偶尔报「资源忙」。
// 重试即可，命令本身没问题（直接用 Bash 调 gh 从不报这个）。
function gh(args, input) {
  let last;
  for (let i = 0; i < 4; i++) {
    try {
      return execFileSync(GH, args, {
        env: { ...process.env, GH_TOKEN: TOKEN },
        encoding: 'utf8',
        input,
        maxBuffer: 64 * 1024 * 1024,
      });
    } catch (e) {
      last = e;
      if (e.code === 'EBUSY' || /EBUSY/.test(String(e.message))) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 400 * (i + 1));
        continue;
      }
      throw e;
    }
  }
  throw last;
}
const log = (s) => process.stdout.write(s + '\n');

// ── 收集文件 ────────────────────────────────────────────────────────────
function walk(dir, base = dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, base, out);
    else out.push(path.relative(base, p).replace(/\\/g, '/'));
  }
  return out;
}

if (!fs.existsSync(SITE)) { log('✗ site/ 不存在，请先跑 build.mjs'); process.exit(1); }
const files = walk(SITE).sort();
log(`═══ 部署 ${REPO} ═══\n文件 ${files.length} 个，源目录 ${SITE}\n`);

// ── 建仓（已存在则忽略） ────────────────────────────────────────────────
try {
  gh(['api', `repos/${REPO}`]);
  log('✓ 仓库已存在');
} catch {
  log('· 仓库不存在，创建中…');
  gh(['repo', 'create', REPO, '--public', '--description', 'Models 图谱 · 本地部署量化模型对比。只回答一个问题：这个基础模型，我该下载哪个量化版、为什么。', '--disable-issues']);
  log('✓ 已创建');
}

// ── 远程现状 ────────────────────────────────────────────────────────────
let remote = {};
try {
  const tree = JSON.parse(gh(['api', `repos/${REPO}/git/trees/main?recursive=1`]));
  for (const t of tree.tree || []) if (t.type === 'blob') remote[t.path] = t.sha;
  log(`远程现有文件 ${Object.keys(remote).length} 个`);
} catch {
  log('· 远程为空（首次部署）');
}

// ── 逐文件 PUT ──────────────────────────────────────────────────────────
const TMP = path.join(process.env.TEMP || '/tmp', 'ghput.json');
let ok = 0, skip = 0, fail = 0;

for (const rel of files) {
  const abs = path.join(SITE, rel);
  const buf = fs.readFileSync(abs);

  // 本地 SHA-1（git blob 格式: "blob <len>\0<content>"）
  const localSha = gitBlobSha(buf);

  if (remote[rel] === localSha) { skip++; continue; }   // 内容未变，跳过

  const payload = {
    message: `Update ${rel}`,
    content: buf.toString('base64'),
    ...(remote[rel] ? { sha: remote[rel] } : {}),
  };
  fs.writeFileSync(TMP, JSON.stringify(payload), 'utf8');

  try {
    gh(['api', '-X', 'PUT', `repos/${REPO}/contents/${rel}`, '--input', TMP]);
    ok++;
    log(`  ✓ ${rel}`);
  } catch (e) {
    fail++;
    log(`  ✗ ${rel} → ${String(e.message).slice(0, 160)}`);
  }
}

// 远程多余的文件：删掉本地已不存在的（仅限 site 目录内，避免误删）
let removed = 0;
for (const rel of Object.keys(remote)) {
  if (files.includes(rel)) continue;
  // 只清理由本脚本管理过的路径
  if (!/^(series\/[\w-]+\.html$|index\.html$|site\.css$|brand\.[cj]s$|llms\.txt$|robots\.txt$|sitemap\.xml$|CNAME$)/.test(rel)) continue;
  const body = JSON.stringify({ message: `Remove ${rel}`, sha: remote[rel] });
  fs.writeFileSync(TMP, body, 'utf8');
  try { gh(['api', '-X', 'DELETE', `repos/${REPO}/contents/${rel}`, '--input', TMP]); removed++; log(`  − ${rel}`); }
  catch (e) { log(`  ! 删除失败 ${rel} → ${String(e.message).slice(0, 100)}`); }
}

// ── Pages ───────────────────────────────────────────────────────────────
log('\n═══ Pages 配置 ═══');
try {
  const p = JSON.parse(gh(['api', `repos/${REPO}/pages`]));
  log(`✓ Pages 已启用：${p.html_url}　状态 ${p.status}`);
} catch {
  log('· 启用 Pages（source: main /）');
  const cfg = JSON.stringify({ source: { branch: 'main', path: '/' } });
  fs.writeFileSync(TMP, cfg, 'utf8');
  try { gh(['api', '-X', 'POST', `repos/${REPO}/pages`, '--input', TMP]); log('✓ 已启用'); }
  catch (e) { log('✗ 启用失败：' + String(e.message).slice(0, 200)); }
}

// ── 域名 ────────────────────────────────────────────────────────────────
log('\n═══ 自定义域名 ═══');
try {
  const c = JSON.parse(gh(['api', `repos/${REPO}/pages/custom-domain`]));
  log(`✓ 域名 ${c.domain}（${c.cname || c.html_url}）`);
} catch {
  const d = JSON.stringify({ domain: 'models.specul.com' });
  fs.writeFileSync(TMP, d, 'utf8');
  try { gh(['api', '-X', 'PUT', `repos/${REPO}/pages/custom-domain`, '--input', TMP]); log('✓ 已设 models.specul.com'); }
  catch (e) { log('✗ 设置失败：' + String(e.message).slice(0, 200)); }
}

log(`\n═══ 完成 ═══\n更新 ${ok} | 跳过(内容未变) ${skip} | 删除 ${removed} | 失败 ${fail}`);
if (fail) process.exit(1);
