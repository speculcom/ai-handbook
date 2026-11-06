# 下载练习 / Downloadable practice

四组虚构教学数据与预先设计的参考答案，CC BY 4.0。没有真实客户、真实公司制度或人员录音。不是 OCR / ASR / 文档产品的执行记录或性能评价。

Four fictional teaching datasets with designed reference answers, CC BY 4.0. No real customers, company policies or recorded people. These are not execution records or performance evaluations of OCR, ASR or document products.

- `pdf-table/`：相同版面的文字 PDF 与图像 PDF；缺失单价、前导零与换行商品名。Text/image PDFs with a missing price, leading zeros and a wrapped description.
- `merge/`：客户与两份订单；完全重复、金额冲突、歧义日期和未匹配外键。Customers/orders with duplicate, conflicting, ambiguous and unmatched records.
- `review/`：两版短制度，用于练习长文审阅方法；单位变化、条件和跨段冲突。Two short policy versions for practicing review methods, units, conditions and cross-section conflicts.
- `meeting/`：一个合成声音读角色标签的 WAV；不模拟真实多人识别。Single-voice synthetic WAV with spoken role labels; not a realistic diarization test.

先做输入，再看 reference；保留原始文件。参考文件是设计答案，不是模型输出。Practice on input first, then compare references; preserve originals. References are designed answers, not model output.

`manifest.json` 记录所有下载文件的字节数与 SHA-256。它验证文件一致性，不验证模型能力或内容真伪。The manifest records file bytes and SHA-256 for consistency checks, not model capability or truth verification.

生成说明 / Reproduction:

1. `scripts/create-task-samples.py` creates the PDFs and text/CSV fixtures using reportlab, Pillow, pypdf and Poppler. Render and visually inspect both PDFs after regeneration.
2. `scripts/create-meeting-audio.ps1` creates the synthetic WAV on Windows with the installed Microsoft David Desktop voice. Voice/version differences can change bytes and duration; this is not a fixed ASR benchmark.
3. `node scripts/package-task-samples.mjs` refreshes the asset manifest after changes. Normal site builds copy the checked assets and do not regenerate them.
