---
zh: "怎么用 OCR 把纸质文档变成可检索文本"
en: "How to Turn Paper Documents into Searchable Text"
kind: guide
station: 3
ord: 23
span: 9
lead: "扫描件不是文本；OCR 只是第一步，真正决定检索质量的是版面还原、校对与分块。"
points: ["先看来源：原生 PDF 有文本层就先抽取；只有扫描件或照片才走 OCR。", "预处理：去畸变、去噪、纠偏、裁边；手机拍摄先做透视校正。", "版面分析：先分栏、表格、页眉页脚，别把两栏读成一行、把表格拍平成文本。", "逐页留置信度：低置信区域标出来人工复核，不要整本信任。", "校对关键字段：金额、日期、编号、专有名词；这些错最贵。", "分块与索引：按标题层级切，保留页码与来源，再接入 RAG。", "验收：抽 30 页算字符错误率、表格行列还原率、关键字段准确率，达标再上线。"]
terms: ["OCR（光学字符识别）", "分块", "RAG（检索增强生成）"]
refs:
  - ["Tesseract · 官方文档", "https://tesseract-ocr.github.io/tessdoc/", "Tesseract documentation"]
  - ["Gao 等 · RAG 综述（arXiv 2312.10997）", "https://arxiv.org/abs/2312.10997", "Gao et al., Retrieval-Augmented Generation for Large Language Models: A Survey"]
last_verified: "2026-11-17"
verified_scope: "refs"
---

# 怎么用 OCR 把纸质文档变成可检索文本（How to Turn Paper Documents into Searchable Text）

**这份指南解决什么**：扫描件不是文本；OCR 只是第一步，真正决定检索质量的是版面还原、校对与分块。

**怎么做**：
1. 先看来源：原生 PDF 有文本层就先抽取；只有扫描件或照片才走 OCR。
2. 预处理：去畸变、去噪、纠偏、裁边；手机拍摄先做透视校正。
3. 版面分析：先分栏、表格、页眉页脚，别把两栏读成一行、把表格拍平成文本。
4. 逐页留置信度：低置信区域标出来人工复核，不要整本信任。
5. 校对关键字段：金额、日期、编号、专有名词；这些错最贵。
6. 分块与索引：按标题层级切，保留页码与来源，再接入 RAG。
7. 验收：抽 30 页算字符错误率、表格行列还原率、关键字段准确率，达标再上线。

**出处**：Tesseract · 官方文档；Gao 等 · RAG 综述（arXiv 2312.10997）。

- [Tesseract · 官方文档](https://tesseract-ocr.github.io/tessdoc/)
- [Gao 等 · RAG 综述（arXiv 2312.10997）](https://arxiv.org/abs/2312.10997)

---

<!-- 微型指南 · 第三站 · 约 9 分钟 · 2026-11-17 内容补齐批次新增 -->
