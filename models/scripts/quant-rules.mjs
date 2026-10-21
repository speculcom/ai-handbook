// 量化档名识别规则 —— 采集（collect-models.mjs）与后处理（fix-quants.mjs）共用。
//
// 为什么要抽出来：档名规则是这套数据里最容易出错、也最需要「改一处两处生效」的部分。
// 之前规则内嵌在 collect-models.mjs，后处理脚本只能复制一份，改档名就得记得改两个文件——
// 已经踩过一次（补标 bpw 的 fix-bpw.mjs 里 TIERS 与主脚本各存一份）。
//
// 数据来源：全部来自 Hugging Face 上真实存在的文件名（见 docs/METHODOLOGY.md 的取样说明）。
// 数值是 llama.cpp 官方 ggml 量化类型表里的 bpw，不是我们自己猜的。

export const QUANT_MAP = [
  // [正则, 归一标签, 每权重比特数]
  // 顺序重要：更长更具体的放前面，避免 Q4 抢先匹配 IQ4
  [/(?:^|[-_.])UD-IQ1_S(?:[-_.]|$)/i, 'UD-IQ1_S', 1.70],
  [/(?:^|[-_.])UD-IQ1_M(?:[-_.]|$)/i, 'UD-IQ1_M', 1.96],
  [/(?:^|[-_.])UD-IQ2_XXS(?:[-_.]|$)/i, 'UD-IQ2_XXS', 2.13],
  [/(?:^|[-_.])UD-IQ2_M(?:[-_.]|$)/i, 'UD-IQ2_M', 2.39],
  [/(?:^|[-_.])UD-IQ2_XS(?:[-_.]|$)/i, 'UD-IQ2_XS', 2.31],
  [/(?:^|[-_.])UD-IQ3_XXS(?:[-_.]|$)/i, 'UD-IQ3_XXS', 3.06],
  [/(?:^|[-_.])UD-IQ3_S(?:[-_.]|$)/i, 'UD-IQ3_S', 3.35],
  [/(?:^|[-_.])UD-IQ3_M(?:[-_.]|$)/i, 'UD-IQ3_M', 3.66],
  [/(?:^|[-_.])UD-IQ4_NL(?:[-_.]|$)/i, 'UD-IQ4_NL', 4.05],
  [/(?:^|[-_.])UD-IQ4_XS(?:[-_.]|$)/i, 'UD-IQ4_XS', 4.25],
  [/(?:^|[-_.])UD-Q2_K_XL(?:[-_.]|$)/i, 'UD-Q2_K_XL', 3.35],
  [/(?:^|[-_.])UD-Q3_K_M(?:[-_.]|$)/i, 'UD-Q3_K_M', 4.15],
  [/(?:^|[-_.])UD-Q3_K_XL(?:[-_.]|$)/i, 'UD-Q3_K_XL', 4.42],
  [/(?:^|[-_.])UD-Q4_K_XL(?:[-_.]|$)/i, 'UD-Q4_K_XL', 5.62],
  [/(?:^|[-_.])UD-Q6_K(?:[-_.]|$)/i, 'UD-Q6_K', 6.54],
  [/(?:^|[-_.])UD-Q8_K_XL(?:[-_.]|$)/i, 'UD-Q8_K_XL', 8.72],
  [/(?:^|[-_.])IQ1_S(?:[-_.]|$)/i, 'IQ1_S', 1.62],
  [/(?:^|[-_.])IQ1_M(?:[-_.]|$)/i, 'IQ1_M', 1.90],
  [/(?:^|[-_.])IQ2_XXS(?:[-_.]|$)/i, 'IQ2_XXS', 2.13],
  [/(?:^|[-_.])IQ2_M   |(?:^|[-_.])IQ2M(?:[-_.]|$)/i, 'IQ2_M', 2.39],
  [/(?:^|[-_.])IQ2_XS(?:[-_.]|$)/i, 'IQ2_XS', 2.31],
  [/(?:^|[-_.])IQ2_S(?:[-_.]|$)/i, 'IQ2_S', 2.46],
  [/(?:^|[-_.])IQ3_XXS(?:[-_.]|$)/i, 'IQ3_XXS', 3.06],
  // IQ3_XS（单 X，非 XXS）：llama.cpp 的独立档，3.36 bpw
  [/(?:^|[-_.])IQ3_XS(?:[-_.]|$)/i, 'IQ3_XS', 3.36],
  [/(?:^|[-_.])IQ3_S(?:[-_.]|$)/i, 'IQ3_S', 3.35],
  [/(?:^|[-_.])IQ3_M(?:[-_.]|$)/i, 'IQ3_M', 3.66],
  [/(?:^|[-_.])IQ4_XS(?:[-_.]|$)/i, 'IQ4_XS', 4.25],
  [/(?:^|[-_.])IQ4_NL(?:[-_.]|$)/i, 'IQ4_NL', 4.05],
  // ── k-quant 尺寸变体（_S / _M / _L / _XL）────────────────────────────
  // 必须排在裸档名（Q5_K 等）之前，否则 `Qwen3.8-Flash-Next-Q5_K_S.gguf`
  // 会被 `Q5_K` 规则抢先匹配，归成同一个「Q5_K」。
  //
  // 为什么必须拆开而不是取最小值（2026-10-01 实测发现）：
  //   Qwen3.8-Flash-Next 的 Q5_K 家族实测体积
  //     Q5_K_S128.1 GB / Q5_K_M 134.7 GB / Q5_K_L 151.1 GB / UD-Q5_K_XL 158.3 GB
  //   原实现把它们全归成「Q5_K」再取最小值 81.9 GB —— 而81.9 那个文件其实叫
  //   `AD-5.00bpw-Q5_K_M-M64.gguf`（M64 = 只量化 64 个矩阵的混合精度），
  //   根本不是标准 Q5_K。取最小值等于拿一个特殊变体冒充整个档位，
  //   会给用户「Q5_K 只要 82 GB」的错误建议。
  // bpw 按 llama.cpp k-quant 定义随尺寸微调（S 略低、XL 略高）。
  [/(?:^|[-_.])Q2_K_XS(?:[-_.]|$)/i, 'Q2_K_XS', 2.71],
  [/(?:^|[-_.])Q2_K_S(?:[-_.]|$)/i, 'Q2_K_S', 2.71],
  [/(?:^|[-_.])Q2_K_M(?:[-_.]|$)/i, 'Q2_K_M', 2.80],
  [/(?:^|[-_.])Q2_K_L(?:[-_.]|$)/i, 'Q2_K_L', 2.89],
  [/(?:^|[-_.])Q3_K_XS(?:[-_.]|$)/i, 'Q3_K_XS', 3.50],
  [/(?:^|[-_.])Q3_K_S(?:[-_.]|$)/i, 'Q3_K_S', 3.50],
  [/(?:^|[-_.])Q3_K_M(?:[-_.]|$)/i, 'Q3_K_M', 3.55],
  [/(?:^|[-_.])Q3_K_L(?:[-_.]|$)/i, 'Q3_K_L', 3.60],
  [/(?:^|[-_.])Q3_K_XL(?:[-_.]|$)/i, 'Q3_K_XL', 3.66],
  [/(?:^|[-_.])Q4_K_XS(?:[-_.]|$)/i, 'Q4_K_XS', 4.75],
  [/(?:^|[-_.])Q4_K_S(?:[-_.]|$)/i, 'Q4_K_S', 4.75],
  [/(?:^|[-_.])Q4_K_M(?:[-_.]|$)/i, 'Q4_K_M', 4.85],
  [/(?:^|[-_.])Q4_K_L(?:[-_.]|$)/i, 'Q4_K_L', 4.95],
  [/(?:^|[-_.])Q5_K_S(?:[-_.]|$)/i, 'Q5_K_S', 5.54],
  [/(?:^|[-_.])Q5_K_M(?:[-_.]|$)/i, 'Q5_K_M', 5.69],
  [/(?:^|[-_.])Q5_K_L(?:[-_.]|$)/i, 'Q5_K_L', 5.84],
  [/(?:^|[-_.])Q6_K_XL(?:[-_.]|$)/i, 'Q6_K_XL', 6.66],
  // UD 系列的尺寸变体
  [/(?:^|[-_.])UD-Q5_K_XL(?:[-_.]|$)/i, 'UD-Q5_K_XL', 5.84],
  [/(?:^|[-_.])UD-Q5_K_L(?:[-_.]|$)/i, 'UD-Q5_K_L', 5.79],
  [/(?:^|[-_.])UD-Q4_K_L(?:[-_.]|$)/i, 'UD-Q4_K_L', 4.95],
  [/(?:^|[-_.])UD-Q3_K_L(?:[-_.]|$)/i, 'UD-Q3_K_L', 3.60],
  [/(?:^|[-_.])UD-Q2_K_S(?:[-_.]|$)/i, 'UD-Q2_K_S', 2.71],
  // 裸档名（必须在上面这些尺寸变体之后）
  [/(?:^|[-_.])Q2_K(?:[-_.]|$)/i, 'Q2_K', 2.80],
  [/(?:^|[-_.])Q3_K(?:[-_.]|$)/i, 'Q3_K', 3.55],
  [/(?:^|[-_.])Q4_K(?:[-_.]|$)/i, 'Q4_K', 4.85],
  [/(?:^|[-_.])Q5_K(?:[-_.]|$)/i, 'Q5_K', 5.69],
  [/(?:^|[-_.])Q6_K(?:[-_.]|$)/i, 'Q6_K', 6.59],
  [/(?:^|[-_.])Q8_0(?:[-_.]|$)/i, 'Q8_0', 8.50],
  [/(?:^|[-_.])BF16|F16/i, 'BF16', 16.0],
  [/(?:^|[-_.])MXFP4|NVFP4/i, 'MXFP4', 4.25],

  // ── 第二批补录（2026-09-30 首次建站审计发现的漏项）─────────────────
  // 遗留格式（legacy）变体：Q4_1_L / Q5_0_L / Q5_1_L —— 权重布局不同，bpw 与非 L 版一致
  [/(?:^|[-_.])Q4_1_L(?:[-_.]|$)/i, 'Q4_1_L', 4.83],
  [/(?:^|[-_.])Q5_0_L(?:[-_.]|$)/i, 'Q5_0_L', 5.54],
  [/(?:^|[-_.])Q5_1_L(?:[-_.]|$)/i, 'Q5_1_L', 5.69],
  // 新增 k-quant 档（llama.cpp 后续版本引入）
  [/(?:^|[-_.])Q4_1(?:[-_.]|$)/i, 'Q4_1', 4.83],
  [/(?:^|[-_.])Q5_0(?:[-_.]|$)/i, 'Q5_0', 5.54],
  [/(?:^|[-_.])Q5_1(?:[-_.]|$)/i, 'Q5_1', 5.69],
  [/(?:^|[-_.])Q2_0(?:[-_.]|$)/i, 'Q2_0', 2.62],
  [/(?:^|[-_.])Q1_0(?:[-_.]|$)/i, 'Q1_0', 1.65],
  // 三元量化（ternary），GPTQ 风格
  [/(?:^|[-_.])TQ1_0(?:[-_.]|$)/i, 'TQ1_0', 1.69],
  [/(?:^|[-_.])TQ2_0(?:[-_.]|$)/i, 'TQ2_0', 2.06],
  // IQ1_KT：k-quant 家族的 1-bit 变体
  [/(?:^|[-_.])IQ1_KT(?:[-_.]|$)/i, 'IQ1_KT', 1.50],
  // UD 系列的遗留变体
  [/(?:^|[-_.])UD-Q8_K_L(?:[-_.]|$)/i, 'UD-Q8_K_L', 8.72],
  // 全精度 F32（bf16/f16 之外的第三种原始精度）
  [/(?:^|[-_.])F32(?:[-_.]|$)/i, 'F32', 32.0],
  // 混合精度档（AD-5.00bpw-Q5_K_M-M64，Qwen3.8-Flash-Next 仓实测110.5 GB）
  // 不放在 QUANT_MAP 里：它必须在 norm 剥离前判定，详见 parseQuant 内的专门分支。
  // 原因：norm 那步会把 `-5.00bpw-` 前缀与 `-M64` 后缀一起规范化掉。
];

// 裸档名兜底：文件名里没有分隔符（如 minicpm_IQ3_XS.gguf、Q3_K.gguf）也能认。
// 只放 QUANT_MAP 里没有的短名，避免两处规则打架。
// 注意：这里的 Q5_K 必须带尺寸后缀边界，否则 `Q5_K_S` 会被它抢先命中，
// 又被归成裸「Q5_K」—— 正是上面尺寸变体拆分要解决的问题。
export const LOOSE = [
  [/IQ3_XXS/i, 'IQ3_XXS', 3.06], [/IQ3_XS/i, 'IQ3_XS', 3.36],
  [/IQ4_NL/i, 'IQ4_NL', 4.05], [/IQ4_XS/i, 'IQ4_XS', 4.25],
  [/IQ3_M/i, 'IQ3_M', 3.66], [/IQ3_S/i, 'IQ3_S', 3.35], [/IQ2_M/i, 'IQ2_M', 2.39],
  [/IQ2_XS/i, 'IQ2_XS', 2.31], [/IQ2_S/i, 'IQ2_S', 2.46], [/IQ1_S/i, 'IQ1_S', 1.62],
  [/Q2_K_(?:XS|S|M|L)/i, 'Q2_K_M', 2.80], [/Q3_K_(?:XS|S|M|L|XL)/i, 'Q3_K_M', 3.55],
  [/Q4_K_(?:XS|S|M|L)/i, 'Q4_K_M', 4.85], [/Q5_K_(?:S|M|L)/i, 'Q5_K_M', 5.69],
  [/Q6_K_XL/i, 'Q6_K_XL', 6.66],
  [/Q2_K/i, 'Q2_K', 2.80], [/Q3_K/i, 'Q3_K', 3.55], [/Q4_0/i, 'Q4_0', 4.55],
  [/Q4_K/i, 'Q4_K', 4.85], [/Q5_K/i, 'Q5_K', 5.69], [/Q6_K/i, 'Q6_K', 6.59],
  [/Q8_0/i, 'Q8_0', 8.50],
];

export const TIER_RULES = [
  { max: 3.0, tier: '极限压缩', desc: '能装下就装，质量明显下降' },
  { max: 3.7, tier: '长上下文优先', desc: 'KV 缓存也吃紧时的选择' },
  { max: 5.0, tier: '平衡档', desc: '默认推荐，质量和体积的折中点' },
  { max: 7.0, tier: '保守档', desc: '几乎无质量损失' },
  { max: 99, tier: '近似无损', desc: '体积接近原始精度' },
];

/** bpw → 档位。null 表示「认不出」，页面据此显示「未识别」而不是瞎猜。 */
export function tierOf(bpw) {
  if (!bpw) return { tier: '未识别', desc: '' };
  for (const r of TIER_RULES) if (bpw <= r.max) return { tier: r.tier, desc: r.desc };
  return { tier: TIER_RULES[TIER_RULES.length - 1], desc: TIER_RULES[TIER_RULES.length - 1].desc };
}

/**
 * 从 GGUF 文件名解析量化档位。
 * 返回 { quant, bitsPerWeight, notWeight? }
 *
 * 处理的历史坑（都已由真实文件名验证）：
 *  1. 非权重文件命名不止「开头就是 imatrix」：还有 mmproj-*、mtp-*、<model>-imatrix、
 *     <model>.imatrix、minicpm_IQ3_XS（裸 imatrix）、<model>-tokenizer → 必须包含匹配。
 *  2. 三种分隔符：`-` `_` `.`（实测 gemma-4-E4B-it.Q5_0.gguf 用点号）。
 *  3. imatrix 变体后缀：-AS / -L21 / -3.86bpw / -H32 等，需先剥离再匹配主档名。
 */
export function parseQuant(filename) {
  const base = filename.split('/').pop() || filename;

  // 非权重文件。实测命名不止「开头就是 imatrix」这一种：
  //   mmproj-*.gguf（多模态投影）/ mtp-*.gguf 与 <model>-MTP.gguf（多 token 预测头）/
  //   <model>-imatrix.gguf、<model>.imatrix.gguf、minicpm_IQ3_XS.gguf（裸 imatrix）/
  //   <model>-tokenizer.gguf。所以必须「包含匹配」而非「开头匹配」。
  // mtp 用带边界的写法，避免将来出现含该字母串的正常模型名时被误删。
  //
  // ngrams / PLE / RP 是 2026-10-01 新发现的两种（实测 Qwen3.8-Flash-Next）：
  //   ngrams-<model>-BF16.gguf（102.4 GB）—— 这是 tokenizer 训练用的 n-gram 词表，
  //     体积比主模型小得多，却因为名字里带「BF16」被当成 BF16 权重，
  //     导致「取各档最小体积」时把 102 GB 当成 BF16 的代表（真 BF16 是 354 GB）。
  //   <model>-PLE-BF16.gguf / -RPLE-*.gguf —— 动态上下文扩展的附加权重，
  //     需要与主模型配对单独加载，不能当主模型算显存。
  if (/imatrix|tokenizer|mmproj|chat|vocab|README|LICENSE|gitattributes/i.test(base)
      || /(?:^|[-_.])mtp(?:[-_.]|$)/i.test(base)
      || /(?:^|[-_.])ngrams(?:[-_.]|$)/i.test(base)
      || /(?:^|[-_.])r?ple(?:[-_.]|$)/i.test(base)) {
    return { quant: '非权重文件', bitsPerWeight: null, notWeight: true };
  }

  // 混合精度档必须在 norm 剥离之前判定 —— 下面那步会把 `-5.00bpw-` 前缀
  // 连同 `-M64` 后缀一起规范化掉，正则就再也匹配不到了。
  const mixed = base.match(/(?:^|[-_.])AD-(\d+(?:\.\d+)?)bpw-([A-Za-z0-9_]+?)-M(\d+)(?:[-_.]|$)/i);
  if (mixed) {
    return {
      quant: `AD-MIXED ${mixed[2]}-M${mixed[3]}`,
      bitsPerWeight: parseFloat(mixed[1]),
      declared: true,
      mixed: true,
    };
  }

  const norm = base.replace(/[-_.](AS|L\d+|H\d+|M\d+|N\d+|C\d+|G\d+|S\d+)(?=[-_.]|$)/gi, '$1@')
                   .replace(/[-_.]\d+(\.\d+)?bpw(?=[-_.]|$)/gi, '@')
                   .replace(/@/g, '-');

  for (const [re, label, bpw] of QUANT_MAP) {
    if (re.test(norm)) return { quant: label, bitsPerWeight: bpw };
  }
  for (const [re, label, bpw] of LOOSE) {
    if (re.test(base)) return { quant: label, bitsPerWeight: bpw };
  }

  // 作者自己在文件名里标了 bpw（如 -MTP-3.86bpw）→ 采信作者标注
  const declared = base.match(/(\d+(?:\.\d+)?)\s*bpw/i);
  if (declared) {
    return { quant: `作者标注 ${declared[1]}bpw`, bitsPerWeight: parseFloat(declared[1]), declared: true };
  }

  return { quant: '其他', bitsPerWeight: null };
}
