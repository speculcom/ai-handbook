---
id: distillation
stage: 4
title: 蒸馏：小模型怎么从大模型身上学
titleEn: Distillation: how small models learn from big ones
summary: logit 蒸馏与数据蒸馏两条路、为什么开放权重家族几乎人人蒸馏、以及「蒸馏来的」这个标签在选型里意味着什么。从业者视角深版；一页科普在学 AI 站。
summaryEn: Logit distillation versus data distillation, why nearly every open-weight family distils, and what the "distilled" label means when choosing a model. Practitioner depth; the one-page explainer lives on the Learn site.
sources:
  - label: 知识蒸馏原始论文（arXiv 1503.02531，Hinton 等，软标签蒸馏，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/1503.02531
    kind: paper
  - label: DistilBERT 论文（arXiv 1910.01108，自蒸馏减半 BERT 的公开范例，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/1910.01108
    kind: paper
  - label: MiniCPM 论文（arXiv 2404.06395，小模型训练含蒸馏阶段的小模型谱系，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2404.06395
    kind: paper
  - label: DeepSeek-R1 论文（arXiv 2501.12948，用 R1 蒸馏 1.5B–70B 小模型的官方路线，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2501.12948
    kind: paper
  - label: LLaMA 2 论文（arXiv 2307.09288，13B/34B 用 70B 生成数据蒸馏的官方说明，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2307.09288
    kind: paper
  - label: Gemma 技术报告（arXiv 2403.08295，基于 Gemini 技术栈训练，2026-10-20 直抓摘要页）
    url: https://arxiv.org/abs/2403.08295
    kind: paper
  - label: Llama Community License 原文页（官方许可文本入口，2026-10-20 直抓 200）
    url: https://www.llama.com/llama-license/
    kind: licence
  - label: Gemma Terms of Use 原文页（官方许可文本入口，2026-10-20 直抓 200）
    url: https://ai.google.dev/gemma/terms
    kind: licence
last_verified: 2026-10-20
confidence: verified
---

## [这一篇讲什么|What this guide covers]

**蒸馏 = 让小模型向大模型学，而不是直接从原始数据学。**

原始方法是 Hinton 等人的软标签蒸馏（出处见文末清单）。
不只给「答案是猫」这个硬结论，还给出概率分布：
六成像猫、三成像狗、一成像狐狸。

类间相似度信息比硬标签的信息量大。
大模型时代，这条路分成了两支。

## [两支：logit 蒸馏与数据蒸馏|Two branches: logits versus data]

**logit 蒸馏**要同时跑教师与学生，教师输出分布当训练信号。

DistilBERT 是公开范例：同架构自蒸馏，参数减半、
速度提升 60%、保留 97% 语言理解能力（论文口径）。

开放权重家族里 logit 级蒸馏越来越少——教师太大，跑不起。

**数据蒸馏**只要教师生成数据，学生照常 SFT。
LLaMA 2 论文写明：13B 与 34B 用 70B 生成的对话数据训练。

DeepSeek-R1 把自家的长思维链样本蒸馏进一系列小模型，
从 1.5B 一直做到 70B，官方论文给出各尺寸的成绩表。
这是「思维链蒸馏」的官方范例。

MiniCPM 谱系把蒸馏写进训练流程的正式阶段（论文口径）。

## [为什么开放权重几乎人人蒸馏|Why every open-weight family distils]

三个理由，都有官方出处可查：

1. **便宜**：数据蒸馏不需要教师常驻显存，成本结构等于普通 SFT。

2. **快**：小模型推理便宜，跑在端侧与显卡农场里都划算（与预训练篇的「过训练」同一张账）。

3. **许可**：多数家族许可允许用其输出再训模型（以各许可文本为准，本站不解读条款）。

## [选型时「蒸馏来的」意味着什么|What "distilled" means when choosing]

本站口径与 S53 派生标记同一套纪律：
**只有官方自己声明的谱系才标「蒸馏/派生」**。
依据是模型卡的 `base_model` 字段，或论文、技术报告的明文。
不猜，也不根据「像」来推断。

事实层面的含义：蒸馏模型的能力上限受教师约束。
教师不会的，它大概率不会。

但小模型在窄任务上可以超过教师。
R1 蒸馏出的 7B 在数学评测上超过不少更大的通用模型（官方论文口径）。

「蒸馏来的」不是贬义标签。它告诉你权重谱系从哪来。
选型时把它当出处信息读，不当质量结论读。

## [许可与合规：蒸馏不豁免原模型条款|Licences: distilling does not escape the base terms]

用某模型的输出去训新模型，是否受原模型许可约束？
各许可写法不同，Llama 与 Gemma 的条款各有附加约定（条款文本见文末清单）。

本站的立场与全站法律页一致：
只索引、只引述、不解读许可、不给法律意见。

## [和学 AI 站的分工|How this differs from the Learn site]

一页科普版在学 AI 站：[知识蒸馏](https://learn.specul.com/term/知识蒸馏/)
与 [剪枝](https://learn.specul.com/term/剪枝/)（压缩的另一条路）。

本篇讲两支蒸馏的成本结构、官方范例、选型读法与许可边界。
本站家族卡上的「派生自 X」标记（S53）用的就是本篇的谱系口径。
