---
zh: "OCR（光学字符识别）"
en: "OCR (Optical Character Recognition)"
alias: ["光学字符识别", "文字识别", "OCR 识别"]
purpose: "把图片或扫描件里的文字识别成可编辑、可检索的文本。"
def: ["OCR 通常包括版面分析、文字检测、字符识别和后处理。", "现代系统还要处理表格、多栏、手写体和旋转，识别结果常需置信度与人工复核。"]
why: "RAG 处理纸质档案时，OCR 是第一步。识别错会直接变成检索错和答案错。"
refs:
  - ["Tesseract · 官方文档", "https://tesseract-ocr.github.io/tessdoc/", "Tesseract documentation"]
  - ["Tesseract · 官方仓库", "https://github.com/tesseract-ocr/tesseract", "Tesseract repository"]
domain: "media"
purposeTag: "apply"
level: 3
layer: "三"
ord: 55
last_verified: "2026-11-17"
verified_scope: "refs"
figure: "fig-ocr.svg"
figure_caption: "OCR 不是一步。版面分析定位区域，检测框出文字，识别成字符，后处理修正常见错误。"
figure_caption_en: "OCR is a pipeline: layout analysis finds regions, detection locates text, recognition reads characters, post-processing fixes common errors."
---

# OCR（光学字符识别）（OCR (Optical Character Recognition)）

**解决什么问题**：把图片或扫描件里的文字识别成可编辑、可检索的文本。

OCR 通常包括版面分析、文字检测、字符识别和后处理。

现代系统还要处理表格、多栏、手写体和旋转，识别结果常需置信度与人工复核。

**别名**：光学字符识别、文字识别、OCR 识别

**为什么需要知道**：RAG 处理纸质档案时，OCR 是第一步。识别错会直接变成检索错和答案错。

**看具体例子**：
- [Tesseract · 官方文档](https://tesseract-ocr.github.io/tessdoc/)
- [Tesseract · 官方仓库](https://github.com/tesseract-ocr/tesseract)

---

<!-- 站：第三站 · 由 2026-11-17 内容补齐批次新增。 -->
