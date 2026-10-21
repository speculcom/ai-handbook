import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
// ============================================================================
// 内容仓推送：_data/models/{data,docs,scripts,config.js,README.md}
//           → speculcom/ai-quantized-llm
// ----------------------------------------------------------------------------
// 与 deploy.mjs 同机制（gh.exe + Contents API，git transport 被沙箱封锁）。
// 差异：内容仓要推 docs/ 里的原始调研数据（选型过程），让「为什么选这几个模型」可追溯。
// ============================================================================

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const GH = process.env.GH_BIN || 'gh';
// PAT 只从环境变量读。硬编码进脚本会被 GitHub 密钥扫描拦下（409 拒绝写入）。
const TOKEN = process.env.GH_TOKEN;
if (!TOKEN) {
  console.error('✗ 未设置 GH_TOKEN。用法：GH_TOKEN=ghp_xxx node push-content.mjs [owner/repo]');
  process.exit(1);
}
const REPO = process.argv[2] || 'speculcom/ai-quantized-llm';

function gh(args, input) {
  return execFileSync(GH, args, { env: { ...process.env, GH_TOKEN: TOKEN }, encoding: 'utf8', input, maxBuffer: 64 * 1024 * 1024 });
}
const gitBlobSha = (buf) => crypto.createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${buf.length}\0`), buf])).digest('hex');

// 要推的映射：本地路径 → 仓库路径
const MAP = [
  ['README.md', 'README.md'],
  ['config.js', 'config.js'],
  ['data', 'data'],
  ['docs/SCHEMA.md', 'docs/SCHEMA.md'],
  ['docs/METHODOLOGY.md', 'docs/METHODOLOGY.md'],
  ['docs/LEGAL.md', 'docs/LEGAL.md'],
  ['docs/harness-plan.md', 'docs/harness-plan.md'],
  ['scripts/collect-models.mjs', 'scripts/collect-models.mjs'],
  ['scripts/audit-licenses.mjs', 'scripts/audit-licenses.mjs'],
  ['scripts/build.mjs', 'scripts/build.mjs'],
  ['scripts/deploy.mjs', 'scripts/deploy.mjs'],
  ['scripts/dedupe.mjs', 'scripts/dedupe.mjs'],
  ['scripts/select-models.mjs', 'scripts/select-models.mjs'],
  ['scripts/select-v2.mjs', 'scripts/select-v2.mjs'],
  ['scripts/select-v3.mjs', 'scripts/select-v3.mjs'],
  ['scripts/p1-nav-models.mjs', 'scripts/p1-nav-models.mjs'],
  ['scripts/p1-rollback.mjs', 'scripts/p1-rollback.mjs'],
];

// 选型过程数据（可追溯，但体积可能大，按大小决定）
const OPTIONAL = ['docs/selection-report.json', 'docs/selection-v2.json', 'docs/final-candidates.json', 'docs/audit-report.json', 'docs/collect-log.json'];

// 组装待推文件列表
const files = [];
for (const [rel, repo] of MAP) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) { console.log(`  ⚠ 缺 ${rel}`); continue; }
  if (fs.statSync(abs).isDirectory()) {
    for (const f of fs.readdirSync(abs)) {
      const sub = path.join(abs, f);
      if (fs.statSync(sub).isFile()) {
        const r = repo + '/' + f;
        if (!files.some((x) => x[0] === r)) files.push([r, sub]);
      }
    }
  } else files.push([repo, abs]);
}
for (const rel of OPTIONAL) {
  const abs = path.join(ROOT, rel);
  if (fs.existsSync(abs)) {
    const kb = fs.statSync(abs).size / 1024;
    if (kb < 900) files.push([rel, abs]);
    else console.log(`  ⚠ ${rel} ${kb.toFixed(0)}KB 过大，跳过`);
  }
}

console.log(`═══ 推送内容仓 ${REPO} ═══\n待推 ${files.length} 个文件\n`);

let remote = {};
try {
  const tree = JSON.parse(gh(['api', `repos/${REPO}/git/trees/main?recursive=1`]));
  for (const t of tree.tree || []) if (t.type === 'blob') remote[t.path] = t.sha;
  console.log(`远程现有 ${Object.keys(remote).length} 个文件`);
} catch {
  console.log('· 远程为空（首次推送）');
}

const TMP = path.join(process.env.TEMP || '/tmp', 'ghput2.json');
let ok = 0, skip = 0, fail = 0;

for (const [repoPath, abs] of files) {
  const buf = fs.readFileSync(abs);
  if (remote[repoPath] === gitBlobSha(buf)) { skip++; continue; }
  fs.writeFileSync(TMP, JSON.stringify({
    message: `Update ${repoPath}`,
    content: buf.toString('base64'),
    ...(remote[repoPath] ? { sha: remote[repoPath] } : {}),
  }), 'utf8');
  try {
    gh(['api', '-X', 'PUT', `repos/${REPO}/contents/${repoPath}`, '--input', TMP]);
    ok++;
    console.log(`  ✓ ${repoPath}`);
  } catch (e) {
    fail++;
    console.log(`  ✗ ${repoPath} → ${String(e.message).slice(0, 150)}`);
  }
}

console.log(`\n更新 ${ok} | 跳过 ${skip} | 失败 ${fail}`);
if (fail) process.exit(1);
console.log(`\n内容仓：https://github.com/${REPO}`);
