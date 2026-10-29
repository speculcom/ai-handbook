---
zh: 论文卡-Llama 2
en: Paper Card - Llama 2
kind: paper
station: 4
ord: 5
span: 7
lead: "开放权重对话模型的标志性技术报告。这张卡列清它要解决什么、证据在哪一节、以及它没有主张什么。"
points: ["研究问题：摘要原话——发布 \"a collection of pretrained and fine-tuned large language models (LLMs) ranging in scale from 7 billion to 70 billion parameters\"（70 亿到 700 亿参数的预训练+微调模型集）；微调版 Llama 2-Chat 的目标是 \"optimized for dialogue use cases\"（面向对话场景）。", "核心证据：第 3 节微调流程（SFT+拒绝采样+PPO）与第 4 节安全改进——摘要自陈贡献是 \"We provide a detailed description of our approach to fine-tuning and safety improvements\"（详细公开微调与安全方法）；对比主张带限定词：\"outperform open-source chat models on most benchmarks we tested\"（多数而非全部基准）。", "作者自陈局限：这篇论文没有独立的 Limitations 节（2026-10-29 核对 arXiv HTML 版）；最接近的是第 5 节 Discussion（权衡与风险讨论）和第 4 节 Safety（含内容警告）——是讨论不是局限清单，适用范围要读者自己补判断。", "它没有主张的：摘要原话是 \"may be a suitable substitute for closed-source models\"（可能适合替代闭源模型）——没有主张超越闭源模型。「开放权重」也不等于开源：社区许可证带使用限制（见「开放权重」词条）。", "读法提示：这篇的核心贡献是微调与安全流程的公开程度，不是基准分数；只看评测表会错过论文真正给的东西。"]
terms: ["开放权重", "微调", "偏好对齐"]
refs:
  - ["Touvron 等《Llama 2: Open Foundation and Fine-Tuned Chat Models》（arXiv 2307.09288）", "https://arxiv.org/abs/2307.09288", "Touvron et al., Llama 2: Open Foundation and Fine-Tuned Chat Models (arXiv 2307.09288)"]
  - ["HTML 版 · 第 3 节 Fine-tuning", "https://arxiv.org/html/2307.09288#S3", "HTML version · Section 3 Fine-tuning"]
  - ["HTML 版 · 第 4 节 Safety", "https://arxiv.org/html/2307.09288#S4", "HTML version · Section 4 Safety"]
---

# 论文卡：Llama 2（How to Read It）

**这张卡解决什么**：开放权重对话模型的标志性技术报告。这张卡列清它要解决什么、证据在哪一节、以及它没有主张什么。

**读这张论文要带走的**：
1. 研究问题：发布 7B–70B 的预训练+微调模型集；Llama 2-Chat 面向对话场景。
2. 核心证据：第 3 节微调流程与第 4 节安全改进；对比主张带限定词（多数基准上超越开源对话模型）。
3. 作者自陈局限：无独立 Limitations 节（2026-10-29 核对 arXiv HTML 版）；第 5 节 Discussion 与第 4 节 Safety 是最接近的讨论。
4. 它没有主张的：摘要只说「可能适合替代闭源模型」；开放权重≠开源（社区许可证带使用限制）。
5. 读法提示：核心贡献是微调与安全流程的公开程度，不是基准分数。

**出处**：以上原话与章节锚点均 2026-10-29 经 arXiv abs 页与 HTML 版当日核对（HTML 版无摘要块，摘要引自 abs 页）。

- [Touvron 等《Llama 2: Open Foundation and Fine-Tuned Chat Models》（arXiv 2307.09288）](https://arxiv.org/abs/2307.09288)
- [HTML 版 · 第 3 节 Fine-tuning](https://arxiv.org/html/2307.09288#S3)
- [HTML 版 · 第 4 节 Safety](https://arxiv.org/html/2307.09288#S4)

---
<!-- 论文卡 · 第四站 · 约 7 分钟 -->
