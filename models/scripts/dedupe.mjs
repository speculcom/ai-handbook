import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// 后处理：去掉采集产物里的重复量化仓
// 起因：collect-models.mjs 的 seen.add() 没接线（写在未被执行的分支里），
// 导致同一 id 被收两次（实测 openbmb/MiniCPM5-2B-GGUF 重复）。
// 已在采集脚本里修好；这个脚本用于清理已有 JSON，不必重跑 5 分钟采集。

const DIR = path.resolve(HERE, '..', 'data', 'series');
let fixed = 0, total = 0;

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json'))) {
  const p = path.join(DIR, f);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  let touched = false;

  for (const m of j.members || []) {
    const seen = new Set();
    const before = m.variants.length;
    const kept = [];
    for (const v of m.variants) {
      if (seen.has(v.repo)) { touched = true; continue; }
      seen.add(v.repo);
      kept.push(v);
    }
    // 官方仓排最前，其余按下载量
    kept.sort((a, b) => {
      if (a.isOfficial !== b.isOfficial) return a.isOfficial ? -1 : 1;
      return (b.downloads || 0) - (a.downloads || 0);
    });
    m.variants = kept;
    m.variantCount = kept.length;
    if (before !== kept.length) total += before - kept.length;
  }

  if (touched) { fs.writeFileSync(p, JSON.stringify(j, null, 2)); fixed++; }
}

console.log(`清理完成：修正 ${fixed} 个文件，共去掉 ${total} 个重复条目`);
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json'))) {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  const dup = j.members.some((m) => new Set(m.variants.map((v) => v.repo)).size !== m.variants.length);
  const ids = j.members.flatMap((m) => m.variants.map((v) => v.quantizer));
  const uq = [...new Set(ids)];
  console.log(`  ${f.padEnd(20)} ${dup ? '✗ 仍有重复' : '✓'}  成员 ${j.members.length} / 仓 ${j.members.reduce((n, m) => n + m.variants.length, 0)} / 量化者 ${uq.length}`);
}
