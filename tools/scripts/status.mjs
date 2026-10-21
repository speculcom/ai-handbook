import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AXES = ['model_access','runtime','local_files','background','tools','context','permissions','fit'];
const MCP_AXES = ['transport','auth','scope'];
const PAT = /(未核验|未知|未声明|未逐条|本次未能|未能逐)/;

console.log('=== 各赛道现状 ===');
console.log('赛道  对象  verified  partial  stale  未核验维度/总维度');

const totals = { objects: 0, verified: 0, partial: 0, stale: 0, unknown: 0, dims: 0 };

// 2026-10-08：['ide','cli','mcp'] 是 v3 旧赛道名，v4 改成 agents/harness/tools。
// 旧值导致目录全不存在 → 循环 continue → 静默报告「0 对象」，看不出是脚本坏了。
const TRACKS = ['agents', 'harness', 'tools'];
const trackDir = t => path.join(ROOT, 'tracks', t, 'products');

if (!TRACKS.some(t => fs.existsSync(trackDir(t)))) {
  console.error(`tracks 下没找到任何产物目录（期望 ${TRACKS.join(' / ')}）—— 本脚本等于没运行，别把「0 对象」当结论。`);
  process.exit(1);
}

for (const t of TRACKS) {
  const dir = trackDir(t);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const c = { verified: 0, partial: 0, stale: 0 };
  let unk = 0, dims = 0;

  for (const f of files) {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const fm = raw.split('\n---\n')[0];
    const conf = (/^confidence:\s*(\S+)/m.exec(fm) || [])[1];
    if (conf && c[conf] !== undefined) c[conf]++;

    // 抽 axes / mcp 段
    const ai = fm.indexOf('\naxes:');
    const mi = fm.indexOf('\nmcp:');
    const pi = fm.indexOf('\npitfalls:');
    const axesSeg = ai >= 0 ? fm.slice(ai, mi > ai ? mi : pi) : '';
    const mcpSeg = mi >= 0 ? fm.slice(mi, pi) : '';
    // 2026-10-08：v3 时 MCP 维度只属于 mcp 赛道；v4 合并后落在 tools 赛道（9/9 文件都有 mcp: 段）。
    const keys = t === 'tools' ? [...AXES, ...MCP_AXES] : AXES;

    for (const k of keys) {
      const seg = (k === 'transport' || k === 'auth' || k === 'scope') ? mcpSeg : axesSeg;
      const i = seg.indexOf(`  ${k}:`);
      dims++;
      if (i < 0) continue;
      const after = seg.slice(i + `  ${k}:`.length);
      const m = after.match(/\n(?=  [a-z_]+:)|\n(?=\S)/);
      const body = m ? after.slice(0, m.index) : after;
      if (PAT.test(body)) unk++;
    }
  }

  totals.objects += files.length;
  totals.verified += c.verified;
  totals.partial += c.partial;
  totals.stale += c.stale;
  totals.unknown += unk;
  totals.dims += dims;

  const pad = (s, n) => String(s) + ' '.repeat(Math.max(0, n - String(s).length));
  console.log(`  ${pad(t, 5)}${pad(files.length, 6)}${pad(c.verified, 11)}${pad(c.partial, 9)}${pad(c.stale, 7)}${unk}/${dims}`);
}

console.log('');
console.log(`合计：${totals.objects} 对象 · verified ${totals.verified} · partial ${totals.partial} · stale ${totals.stale}`);
console.log(`维度补齐：${totals.dims - totals.unknown}/${totals.dims} = ${Math.round((totals.dims - totals.unknown) / totals.dims * 100)}%`);

// 未核验维度的成因分类
console.log('');
console.log('=== 未核验维度成因（每赛道抽 3 条）===');
for (const t of TRACKS) {
  const dir = trackDir(t);
  if (!fs.existsSync(dir)) continue;
  const shown = new Set();
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.md'))) {
    if (shown.size >= 3) break;
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const fm = raw.split('\n---\n')[0];
    const ai = fm.indexOf('\naxes:');
    const mi = fm.indexOf('\nmcp:');
    const pi = fm.indexOf('\npitfalls:');
    const segs = [['\naxes:', ai >= 0 ? fm.slice(ai, mi > ai ? mi : pi) : ''], ['\nmcp:', mi >= 0 ? fm.slice(mi, pi) : '']];
    for (const [label, seg] of segs) {
      const re = /^  ([a-z_]+):[\s\S]*?(?=\n  [a-z_]+:|\n\w+:)/gm;
      let m;
      while ((m = re.exec(seg)) !== null) {
        const body = m[0];
        if (!PAT.test(body)) continue;
        // 归因
        let why = '官方未公开';
        if (/本次未实测|未实测/.test(body)) why = '需实测';
        else if (/仓库未声明|未声明|本次未核验/ .test(body)) why = '官方未声明';
        else if (/文档不可访问|未读到|已下架|归档/.test(body)) why = '渠道不可达';
        const line = `${label.replace(/\n/g, '')}.${m[1]} → ${why}`;
        if (!shown.has(line.split(' ')[0])) { shown.add(line); console.log('  ' + line); }
      }
    }
  }
}
