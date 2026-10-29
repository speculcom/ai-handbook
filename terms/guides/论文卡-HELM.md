---
zh: 论文卡-HELM
en: Paper Card - HELM
kind: paper
station: 3
ord: 1
span: 8
lead: "「别只看一个总分」的评测框架论文。这张卡列清它要解决什么、框架怎么搭、以及它自己声明的取舍。"
points: ["研究问题：摘要原话——语言模型的能力、局限与风险「未被充分理解」（\"their capabilities, limitations, and risks are not well understood\"）；HELM 的目标是提高透明度，不是宣布某个模型最强。", "框架：先对场景（用例）与指标（期望）做分类，再按覆盖度与可行性选取子集，并明说什么是缺失的（摘要点名：被忽视英语变体的问答、可信度指标）——「承认覆盖面有缺口」本身就是方法的一部分。", "核心做法原话：对 16 个核心场景尽可能测 7 个指标（accuracy/calibration/robustness/fairness/bias/toxicity/efficiency），\"ensuring metrics beyond accuracy don't fall to the wayside\"——保证准确率之外的指标不被丢下。", "作者自陈的取舍：选的是「广」不是「全」——摘要明说按 coverage 与 feasibility 选取，未覆盖处会标注；引用 HELM 时要连它的场景清单一起看，脱离场景的 HELM 排名没有意义。", "它没有主张的：HELM 不是新基准榜单的替代品——它反对的正是单一口径；「HELM 总分第一」这种说法与论文立场相反。"]
terms: ["基准测试", "模型评测的局限", "评测饱和"]
refs:
  - ["Liang 等《Holistic Evaluation of Language Models》（arXiv 2211.09110）", "https://arxiv.org/abs/2211.09110", "Liang et al., Holistic Evaluation of Language Models (arXiv 2211.09110)"]
  - ["HTML 版 · 第 1 节 Introduction", "https://arxiv.org/html/2211.09110#S1", "HTML version · Section 1 Introduction"]
  - ["HELM 平台（Stanford CRFM）", "https://crfm.stanford.edu/helm/", "HELM platform (Stanford CRFM)"]
---

# 论文卡：HELM（How to Read It）

**这张卡解决什么**：「别只看一个总分」的评测框架论文。这张卡列清它要解决什么、框架怎么搭、以及它自己声明的取舍。

**读这张论文要带走的**：
1. 研究问题：模型的能力、局限与风险未被充分理解；HELM 目标是透明度。
2. 框架：场景×指标分类 → 按覆盖与可行选取 → 明说缺口。
3. 核心做法：16 场景 × 7 指标，保证准确率之外的指标不被丢下。
4. 取舍自陈：广而不全，引用要连场景清单一起看。
5. 「HELM 总分第一」这种说法与论文立场相反。

**出处**：以上原话与章节锚点均 2026-10-29 经 arXiv abs 页与 HTML 版当日核对；HELM 平台页当日可达核对。

- [Liang 等《Holistic Evaluation of Language Models》（arXiv 2211.09110）](https://arxiv.org/abs/2211.09110)
- [HTML 版 · 第 1 节 Introduction](https://arxiv.org/html/2211.09110#S1)
- [HELM 平台（Stanford CRFM）](https://crfm.stanford.edu/helm/)

---
<!-- 论文卡 · 第三站 · 约 8 分钟 -->
