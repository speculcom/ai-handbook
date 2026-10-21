import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { SERIES, SECONDARY_QUANTIZERS, PRIMARY_QUANTIZERS } from '../config.js';
import { parseQuant, tierOf } from './quant-rules.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// ============================================================================
// 采集：从 HF 公开 API 拉取每个系列成员的量化变体全量清单
// ----------------------------------------------------------------------------
// 数据来源（全部为 HF 公开只读 API，本站不下载任何权重文件）：
//   GET /api/models/{id}                       → license / gguf 架构 / 上下文 / 下载量
//   GET /api/models/{id}/tree/main?recursive=1 → 每个 .gguf 的真实体积
//   GET /api/models?search=&filter=gguf        → 找出所有第三方量化仓
//
// 合规：
//   - 只索引元数据，不托管权重
//   - gated 仓库（401/403）跳过并记录，不尝试绕过
//   - 许可缺失的条目标记 licenseMissing，audit 阶段会失败
//
// 时间预算：7 系列 × (1 + 1 + N) 次请求，约 3~5 分钟
// ============================================================================

const MIRROR = 'https://hf-mirror.com';
const OUT = path.resolve(HERE, '..');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// hf-mirror 有速率限制：请求过密会静默返回非 200（看起来像 404）。
// 串行 + 固定间隔 + 对 429/5xx 指数退避，是唯一可靠的跑法。
const GAP = 900;

const DERIVED = /(abliterated|uncensored|heretic|roleplay|tavern|snexus|rori|abliterate|EfficientThink|GSQ-RCO|OrcaRouter|Swift-\d|Cerebellum|neo-max|obliterat|twin-turbo|BIONICLE)/i;

const stats = { requests: 0, skipped: [], errors: [], throttled: 0 };
async function api(p) {
  stats.requests++;
  for (let i = 0; i < 4; i++) {
    await sleep(GAP);   // 每次请求前先等，避免撞限流
    try {
      const r = await fetch(MIRROR + p, { signal: AbortSignal.timeout(25000) });
      if (r.ok) return { ok: true, data: await r.json() };
      if (r.status === 401 || r.status === 403) return { ok: false, gated: true, status: r.status };
      if (r.status === 429 || r.status >= 500) {
        stats.throttled++;
        await sleep(3000 * (i + 1));   // 退避
        continue;
      }
      return { ok: false, status: r.status };
    } catch (e) {
      if (i === 3) return { ok: false, err: String(e.message || e) };
      await sleep(2000);
    }
  }
  return { ok: false, throttled: true };
}

// ── 量化文件名解析规则来自 ./quant-rules.mjs（采集与后处理共用一份） ──────────
// bitsPerWeight 是「按命名推算」，属 B 级信息；规则清单与出处见 docs/METHODOLOGY.md

// ── 主流程 ───────────────────────────────────────────────────────────────
const out = [];
for (const s of SERIES) {
  console.log(`\n[系列] ${s.name.zh} (${s.code})`);
  const members = [];

  for (const m of s.members) {
    const meta = await api(`/api/models/${m.repo}`);
    if (!meta.ok) {
      const why = meta.gated ? `gated(${meta.status})` : (meta.err || meta.status);
      console.log(`  ✗ ${m.repo} → ${why}`);
      stats.skipped.push({ repo: m.repo, reason: why });
      continue;
    }
    const b = meta.data;
    const base = {
      repo: b.id,
      url: `https://huggingface.co/${b.id}`,
      label: m.label, params: m.params, role: m.role, note: m.note,
      license: b.cardData?.license || null,
      licenseLink: b.cardData?.license_link || null,
      licenseName: b.cardData?.license_name || null,
      pipeline: b.pipeline_tag,
      downloads: b.downloads || 0,
      likes: b.likes || 0,
      lastModified: b.lastModified || null,
      baseModelField: b.cardData?.base_model || null,
      isBase: true,
    };
    console.log(`  ✓ ${m.repo}  许可=${base.license || '缺失'}  下载=${base.downloads}`);

    // ── 找所有第三方 GGUF 量化仓 ──
    // 关键：search 是模糊的，会串到「别的模型的微调版」（如 Qwen3.5-9B-DeepSeek-V4-Flash）。
    // 必须用「模型标识在仓名里完整出现」做硬过滤，只保留纯量化仓。
    const modelKey = m.repo.split('/')[1];                 // 例：Qwen3.8-27B
    const coreName = modelKey.replace(/-GGUF$/i, '');      // 去掉 GGUF 后缀
    // 量化仓的两种常见命名：<Model>-GGUF  与  <Org>_<Model>-GGUF（bartowski/mradermacher 风格）
    const q = await api(`/api/models?search=${encodeURIComponent(coreName)}&filter=gguf&limit=100&sort=downloads&direction=-1`);
    if (!q.ok) stats.errors.push({ member: m.repo, stage: 'search', detail: q.throttled ? 'throttled' : (q.status || q.err) });

    const seen = new Set();
    const repos = (q.ok ? q.data : []).filter((x) => {
      if (DERIVED.test(x.id)) return false;                  // 排除微调衍生仓
      // 硬条件：仓名去掉 GGUF 后必须等于 coreName，或等于 <Org>_<coreName>
      const name = (x.id.split('/')[1] || '').replace(/-GGUF$/i, '');
      const stripped = name.replace(/^[A-Za-z0-9.\-]+?_/, '');   // 去掉 org_ 前缀
      if (name !== coreName && stripped !== coreName) return false;
      // 去重必须在通过条件之后 add —— 之前写成 return false 分支里，add 从未执行，
      // 导致同一个 id 会被收两次（实测 MiniCPM 官方仓重复）。
      if (seen.has(x.id)) return false;
      seen.add(x.id);
      return true;
    });

    // 兜底：search 有时索引不到官方 GGUF（如 openbmb/MiniCPM5-2B-GGUF），
    // 按 HF 命名约定直接探测 <org>/<Model>-GGUF 与 <org>/<model>-GGUF。
    const org = m.repo.split('/')[0];
    for (const cand of [`${org}/${coreName}-GGUF`, `${org}/${coreName.toLowerCase()}-GGUF`]) {
      // HF API 会把大小写不同的候选名规范化成同一个 id（实测 MiniCPM 官方仓因此被塞了两次）
      if (seen.has(cand)) continue;
      const probe = await api(`/api/models/${cand}`);
      if (probe.ok && !seen.has(probe.data.id)) {
        seen.add(probe.data.id);
        repos.unshift({ id: probe.data.id, downloads: probe.data.downloads || 0, likes: probe.data.likes || 0 });
      }
    }

    // 量化者分组：
    //   主量化者（PRIMARY 名单）无条件优先 —— 档位全、有 imatrix、社区影响大
    //   其他按下载量排序，受降权名单抑制
    // 上限 10 个/成员：再多的边际价值低，反而稀释页面
    const rank = (x) => {
      const o = x.id.split('/')[0];
      if (PRIMARY_QUANTIZERS.has(o)) return 0;
      if (SECONDARY_QUANTIZERS.has(o)) return 2;
      // 名单会过时，所以再加一道通用门槛：下载量低于 5000 的一律降权。
      // 依据：实测里个人玩家的仓下载量普遍 <5000，而有社区价值的量化者
      // 几乎都在 10 万以上（unsloth 640万 / bartowski 48万 / ggml-org 104万）。
      if ((x.downloads || 0) < 5000) return 3;
      return 1;
    };
    const ordered = repos
      .slice()
      .sort((a, b) => {
        // 官方 GGUF 无条件第一：模型作者自己发的，最可信
        const ao = a.id.split('/')[0] === m.repo.split('/')[0] ? 0 : 1;
        const bo = b.id.split('/')[0] === m.repo.split('/')[0] ? 0 : 1;
        if (ao !== bo) return ao - bo;
        return rank(a) - rank(b) || (b.downloads || 0) - (a.downloads || 0);
      })
      .slice(0, 10);

    const variants = [];
    for (const r of ordered) {
      const owner = r.id.split('/')[0];
      const isOfficial = owner === m.repo.split('/')[0];
      const vm = await api(`/api/models/${r.id}`);
      if (!vm.ok) {
        stats.skipped.push({ repo: r.id, reason: vm.gated ? 'gated' : (vm.err || vm.status) });
        continue;
      }
      const v = vm.data;

      // tree 拿真实文件体积
      const tr = await api(`/api/models/${r.id}/tree/main?recursive=1`);
      if (!tr.ok) { stats.skipped.push({ repo: r.id, reason: 'tree:' + (tr.err || tr.status) }); continue; }

      const rawFiles = (tr.data || [])
        .filter((f) => f.type === 'file' && f.path.toLowerCase().endsWith('.gguf'))
        // 排除 imatrix / tokenizer / chat template 等非权重 GGUF
        .filter((f) => !/^(imatrix|tokenizer|chat|vocab)/i.test(f.path.split('/').pop()));

      // 分片合并：一个量化档可能是 -00001-of-00005 这样 5 个文件。
      // 必须按「去掉分片后缀后的档位名」聚合成一条，否则档位数会虚报 5 倍
      // （实测：某仓 169 档其实只有 ~34 个真实档位）。
      const byShardKey = new Map();
      for (const f of rawFiles) {
        const base = f.path.split('/').pop();
        // -00001-of-00005.gguf → 去掉分片后缀
        const shardM = base.match(/^(.*?)-\d{5}-of-\d{5}\.gguf$/i);
        const groupName = shardM ? shardM[1] + '.gguf' : base;
        const groupPath = f.path.replace(/[^/]+$/, groupName);
        if (!byShardKey.has(groupPath)) {
          byShardKey.set(groupPath, { name: groupName, path: groupPath, sizeBytes: 0, shardCount: 0 });
        }
        const g = byShardKey.get(groupPath);
        g.sizeBytes += f.size;
        g.shardCount++;
      }

      const files = [...byShardKey.values()]
        .map((g) => {
          const { quant, bitsPerWeight } = parseQuant(g.name + ' ' + g.path);
          const { tier, desc } = tierOf(bitsPerWeight);
          return {
            name: g.name,
            path: g.path,
            sizeBytes: g.sizeBytes,
            sizeGB: +(g.sizeBytes / 1e9).toFixed(2),
            quant, bitsPerWeight, tier, tierDesc: desc,
            isSharded: g.shardCount > 1,
            shardCount: g.shardCount,
          };
        })
        .sort((a, b) => (a.bitsPerWeight ?? 99) - (b.bitsPerWeight ?? 99));

      if (files.length === 0) continue;

      const best = files.reduce((acc, f) => {
        if (!acc) return f;
        // 平衡档优先，其次体积小的
        const score = (x) => (x.tier === '平衡档' ? 0 : x.tier === '保守档' ? 1 : x.tier === '长上下文优先' ? 2 : 3);
        return score(f) < score(acc) ? f : acc;
      }, null);

      variants.push({
        quantizer: owner,
        isOfficial,
        repo: v.id,
        url: `https://huggingface.co/${v.id}`,
        license: v.cardData?.license || null,
        licenseLink: v.cardData?.license_link || null,
        downloads: v.downloads || 0,
        likes: v.likes || 0,
        lastModified: v.lastModified || null,
        contextLength: v.gguf?.context_length || null,
        architecture: v.gguf?.architecture || null,
        imatrix: !!v.gguf?.quantize_imatrix_file,
        imatrixFile: v.gguf?.quantize_imatrix_file || null,
        totalFileSize: v.gguf?.totalFileSize || null,
        declaredBase: v.cardData?.base_model || null,
        coverage: files.length,
        totalGB: +files.reduce((s, f) => s + f.sizeGB, 0).toFixed(1),
        recommended: best ? { quant: best.quant, sizeGB: best.sizeGB, tier: best.tier, name: best.name } : null,
        files,
      });
      process.stdout.write(`      · ${r.id} (${files.length} 档)\n`);
    }

    variants.sort((a, b) => {
      if (a.isOfficial !== b.isOfficial) return a.isOfficial ? -1 : 1;
      return b.downloads - a.downloads;
    });

    members.push({ ...base, variants, variantCount: variants.length });
  }

  out.push({
    code: s.code, name: s.name, vendor: s.vendor, family: s.family,
    released: s.released, summary: s.summary, positions: s.positions,
    sources: s.sources, members,
  });
  console.log(`  → ${members.length} 个成员，共 ${members.reduce((n, m) => n + m.variantCount, 0)} 个量化仓`);
}

// ── 落盘 ────────────────────────────────────────────────────────────────
fs.mkdirSync(`${OUT}/data/series`, { recursive: true });
for (const s of out) {
  fs.writeFileSync(`${OUT}/data/series/${s.code}.json`, JSON.stringify({
    ...s,
    collectedAt: new Date().toISOString(),
    schemaVersion: 1,
  }, null, 2));
}
fs.writeFileSync(`${OUT}/docs/collect-log.json`, JSON.stringify({
  collectedAt: new Date().toISOString(),
  requests: stats.requests,
  skipped: stats.skipped,
  errors: stats.errors,
  note: 'skipped 中 gated=需登录授权访问的仓库，本站不尝试绕过。',
}, null, 2));

console.log('\n════════════════════════════════════');
console.log('完成。请求数', stats.requests, '| 跳过', stats.skipped.length);
for (const s of out) {
  console.log(`  ${s.code}.json — ${s.name.zh} — ${s.members.length} 成员 / ${s.members.reduce((n, m) => n + m.variantCount, 0)} 量化仓 / ${s.members.reduce((n, m) => n + m.coverage || 0, 0)} 文件`);
}
