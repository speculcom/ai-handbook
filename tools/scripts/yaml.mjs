#!/usr/bin/env node
/**
 * yaml.mjs —— agent 仓 frontmatter 解析的**唯一真相源**（2026-10-15 新建）
 *
 * ## 为什么有这个文件
 * 同一份解析逻辑曾经有**四份副本**：
 *   1. `scripts/validate.mjs`（校验器）
 *   2. `sites/build.mjs`（构建器 / 渲染器）
 *   3. `_sites/_template/build.mjs`（v3 四站时代的死代码，2026-10-15 归档）
 *   4. `sources` 对象数组的正则 Extraction 在 validate 与 build 里各一份、且正则不同
 * 两份「同源」的注释都写着「避免两套解析逻辑漂移」，但**没有任何机制保证同步** ——
 * 2026-10-09 就踩到了：修了 validate.mjs 的数组判别、忘了 build.mjs，
 * 构建仍然报「缺维度 axes.*」。
 *
 * 实测两份的分歧点（不是印象，是逐行比对 + 52 份档案差分测试得出的）：
 *   | # | 行为 | validate（旧） | build（旧） |
 *   |---|------|----------------|-------------|
 *   | 1 | `>+` / `|+` 块标量 | 支持 | 不支持（当普通字符串） |
 *   | 2 | 顶层 fold 拼接 | 折成空格 | 折成换行 |
 *   | 3 | 嵌套子键块标量 | 简单 join('\n') | 保留空行分段（\n\n） |
 *   | 4 | sources 正则 | 不处理反引号标签 | 处理 |
 * 本文件取**build（渲染器）的语义**为基准 —— 因为页面是它产出的，
 * 校验器必须看渲染器看的东西（「校验器看压平的文本、渲染器看保留分段的文本」
 * 正是 v6 第 ㉕ 节那类同源残留），再加上 validate 的 `>+`/`|+` 支持。
 *
 * ## 使用者
 *   - `scripts/validate.mjs`  →  import { parseFrontmatter, parseSources, bodyAfter } from './yaml.mjs'
 *   - `sites/build.mjs`       →  import { ... } from '../scripts/yaml.mjs'
 * 守卫：`_audit/yaml-single-source.mjs`（全文只许有一份定义，消费者必须 import 它）。
 *
 * ## 已知边界（YAML 子集，不是完整 YAML）
 *   - 只认 `---\n` 开头（LF；CRLF 文件解析不出 frontmatter，与旧行为一致）
 *   - 顶层键只认行首无缩进的 `key:`；孤立缩进行跳过
 *   - 嵌套只到两级（pricing.model、axes.model_access、mcp.transport）
 *   - 对象数组（`sources:` 的 `- label:/url:/kind:`）由 parseSources 用正则单独取
 *     —— YAML 子集解析器读不出嵌套结构，这是**有意的分工**，不是待修缺陷
 */

/* 判断一个块是**数组**还是**嵌套 map**：看它的**第一行**，不看「有没有列表行」。
 *
 * ⚠ 这里原先写的是 `blockLines.some(l => l.trim().startsWith('- '))` —— 只要块里
 *   出现任何一行以 `- ` 开头就判成数组。于是 2026-10-09 改文风时踩到了：
 *   为了让读者好读，在 `axes.model_access` 里把模型清单改成了 markdown 列表，
 *   结果**整个 `axes` 被当成数组**，8 个维度全部「缺失」。
 *
 *   两者其实有明确的判别特征：数组块的**第一行**就是 `- `；
 *   而嵌套 map 的第一行一定是 `key:`（列表只可能出现在某个子键的块标量内部）。
 *   按第一行判断，两种写法都能正确解析。 */
export function isListBlock(blockLines) {
  const first = blockLines.find((l) => l.trim());
  return !!first && (first.trim().startsWith('- ') || first.trim() === '-');
}

/**
 * 解析 frontmatter，返回键值对象；没有 frontmatter 返回 null。
 *
 * ⚠ 行为基准 = 渲染器（旧 build.mjs）。三个关键决定：
 *   1. **顶层块标量**（fold 与 literal）都保留换行拼接 ——
 *      折成空格会把 `- ` 清单并成一行，也让「行首是 - 」这个信息丢失。
 *      段落与列表还原交给渲染处的 blockMd()。
 *      （旧 validate.mjs 在这里折成空格，导致 `layer_position: >-`
 *      这类顶层折叠块在校验器眼里是另一份文本。）
 *   2. **嵌套子键的块标量**保留空行为段落边界（`\n\n`），段内换行保留 `\n` ——
 *      旧写法 `parts.filter(Boolean).join(' ')` 把空行过滤掉，
 *      于是 `>-` 折叠标量里「一个意思一段」的写法在页面上全部压成一整块：
 *      结论、清单、原文引用连成一行流水文字，markdown 列表退化成正文里的
 *      「- xxx - yyy」。实测 kiro.md 的 model_access 渲染后 0 个 <p>、0 个 <ul> ——
 *      探针按空行分段量是达标的，页面却看不见分段。
 *   3. 空行必须是**段落边界**，不能丢。
 */
export function parseFrontmatter(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---\n', 4);
  if (end === -1) return null;
  const lines = text.slice(4, end).split('\n');
  const data = {};
  let i = 0;

  const indentOf = (s) => s.length - s.trimStart().length;
  const clean = (s) => {
    const v = s.trim();
    if (v === '>' || v === '>-' || v === '|' || v === '|-' || v === '>+' || v === '|+') return { block: true, fold: v[0] === '>' };
    return { block: false, val: v === 'null' ? null : v.replace(/^["']|["']$/g, '') };
  };

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trimStart().startsWith('#') || indentOf(line) > 0) { i++; continue; }

    const m = /^([A-Za-z_][A-Za-z0-9_]*):\s?(.*)$/.exec(line);
    if (!m) { i++; continue; }
    const key = m[1];
    const info = clean(m[2]);

    // 行内值
    if (!info.block && m[2].trim() !== '') {
      if (m[2].trim().startsWith('[')) {
        data[key] = m[2].trim().replace(/[[\]]/g, '').split(',')
          .map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
      } else {
        data[key] = info.val;
      }
      i++;
      continue;
    }

    // 块：收集所有缩进行
    const blockLines = [];
    let j = i + 1;
    while (j < lines.length) {
      const l = lines[j];
      if (!l.trim()) { blockLines.push(''); j++; continue; }
      if (indentOf(l) === 0) break;
      blockLines.push(l);
      j++;
    }
    // 去掉尾部空行
    while (blockLines.length && !blockLines[blockLines.length - 1].trim()) blockLines.pop();

    if (info.block) {
      // 折叠/字面量标量：保留换行（见函数头决定 1）
      data[key] = blockLines.map(l => l.trim()).join('\n').trim();
    } else if (isListBlock(blockLines)) {
      // 数组
      data[key] = blockLines
        .map(l => l.trim().replace(/^-\s*/, '').trim())
        .map(s => s.replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      // 嵌套 map（支持两级：pricing.model、axes.model_access、mcp.transport）
      const sub = {};
      /* 按下标迭代而不是 `blockLines.indexOf(l)`：块里出现**两行完全相同**的文本时
       * indexOf 返回第一处的位置，深缩进行会从错误的位置开始收集。
       * 当前 52 份档案没有触发它（差分测试可证行为不变），但这是潜伏 bug。 */
      for (let bi = 0; bi < blockLines.length; bi++) {
        const l = blockLines[bi];
        const sm = /^([A-Za-z_][A-Za-z0-9_]*):\s?(.*)$/.exec(l.trim());
        if (!sm) continue;
        const cinfo = clean(sm[2]);
        if (cinfo.block) {
          // 该子键也是块标量：向后收集更深缩进的行
          const parts = [];
          let k = bi + 1;
          while (k < blockLines.length) {
            const nl = blockLines[k];
            if (!nl.trim()) { parts.push(''); k++; continue; }
            if (indentOf(nl) <= indentOf(l)) break;
            parts.push(nl.trim());
            k++;
          }
          /* 段内换行留 `\n`（不折成空格）：清单项的续行与下一个 `- ` 行
           * 一旦被折成空格，整份清单会并成单个 `- ` 行 → 渲染成一个 <li>。
           * 空行升级为 `\n\n` 段落边界（见函数头决定 2、3）。 */
          const folded = (() => {
            const paras = [[]];
            for (const p of parts) {
              if (p) paras[paras.length - 1].push(p);
              else if (paras[paras.length - 1].length) paras.push([]);
            }
            return paras.filter((a) => a.length).map((a) => a.join('\n')).join('\n\n');
          })();
          sub[sm[1]] = cinfo.fold ? folded : parts.join('\n').trim();
        } else {
          sub[sm[1]] = cinfo.val;
        }
      }
      data[key] = sub;
    }
    i = j;
  }
  return data;
}

/**
 * 取 frontmatter 之后的正文。
 * 两个消费者原来各写一遍 `raw.indexOf('\n---\n', 4) + 5`，收在这里。
 */
export function bodyAfter(text) {
  const at = text.indexOf('\n---\n', 4);
  return at === -1 ? '' : text.slice(at + 5);
}

/**
 * 解析 `sources:` 对象数组（`- label: / url: / kind:` 三键一组）。
 *
 * 为什么用正则而不是 parseFrontmatter：YAML 子集解析器读不出**对象数组**的
 * 嵌套结构（顶层 `sources:` 的块会被当成字符串数组，每项是整行文本）。
 * 这是有意的分工。
 *
 * 正则取旧 build.mjs 的版本（比旧 validate.mjs 的多做两件事）：
 *   - 标签允许反引号包裹（`` `官方文档` ``），反引号不进 label 值；
 *   - `[^`\n]+` 不允许跨行，`(.+)` 在无反引号档案上行为相同。
 */
export function parseSources(text) {
  const sourceBlock = /sources:\n([\s\S]*?)(?=\n[a-z_]+:)/.exec(text);
  const sources = [];
  if (sourceBlock) {
    const sm = /- label:\s*`?([^`\n]+)`?\s*\n\s*url:\s*(\S+)\s*\n\s*kind:\s*(\S+)/g;
    let mm;
    while ((mm = sm.exec(sourceBlock[1])) !== null) {
      sources.push({ label: mm[1].trim(), url: mm[2].trim(), kind: mm[3].trim() });
    }
  }
  return sources;
}
