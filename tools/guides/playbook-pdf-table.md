---
id: playbook-pdf-table
topic: planning
title: 任务：把 PDF 或扫描页转成可核对的表格
titleEn: Playbook: turn a PDF or scan into a checkable table
summary: 先分辨文字层与图像，再保留页码和行号；用空单元格、前导零和金额校验练习，不把参考答案当 OCR 实测。
summaryEn: Distinguish text from image input, retain page and row evidence, and check blanks, leading zeros and amounts. Includes designed references, not OCR results.
sources:
  - label: Tesseract · 图像质量与表格识别边界
    url: https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html
    kind: docs
  - label: Python · CSV 格式与字符串读取
    url: https://docs.python.org/3/library/csv.html
    kind: docs
last_verified: 2026-11-04
confidence: partial
---

## [下载与范围|Downloads and scope]

以下是本站制作的虚构订单，CC BY 4.0。两份 PDF 内容相同，一份有文字层，另一份是光栅图像。参考表按设计数据编写，不是运行 OCR 得到的结果，也不代表任何工具的识别率。输入为英文，便于比较字符与列。

- [可选中文字的 PDF](https://tools.specul.com/samples/pdf-table/fictional-order-text.pdf)
- [只有图像的 PDF](https://tools.specul.com/samples/pdf-table/fictional-order-scan.pdf)
- [参考 CSV](https://tools.specul.com/samples/pdf-table/reference.csv)
- [校验说明](https://tools.specul.com/samples/pdf-table/checks.txt)

先只下载输入完成练习，再看参考表。真实文件先确认使用权限、敏感字段、上传目的地和保留政策；不确定时先用这里的虚构文件。

## [先定交付格式|Define the deliverable]

交付一份 UTF-8 CSV 和一份异常清单。列为 item_id、description、quantity、unit_price、currency、line_amount、page、source_row、status。编号是文本；金额保留两位小数；缺失单价和金额留空并标状态，不写 0。page 是原 PDF 的页号，source_row 是该页数据行号，不是 CSV 文件行号。

只接受原页提供的信息。税、运费和应付总额均未提供；已知行金额之和不等于应付总额。

## [按页处理|Process page by page]

1. 尝试选中并复制一句文字，再对照原页。能复制不等于顺序和表格结构正确；检查是否有隐藏 OCR 层。
2. 有可靠文字层时先抽取文字和表格；只有图像时才走 OCR。保留原文件和每页图像，不覆盖原件。
3. 扫描有旋转、裁边或模糊时，先看原图，再调整角度与分辨率。改善后的图仍需回原件核对。Tesseract 文档单列了表格识别限制，识别字符并不等于恢复列结构。
4. 先试这一页：编号 001 的名称换行仍是一条商品；003 的空单价仍为空。逐格校对后才推广到更多页。
5. 输出表与异常单，保留页号、原行号和修改记录。真实多页材料另查重复表头、跨页行、脚注和合并单元格。

## [可复制的任务说明|Reusable task instruction]

```text
将提供的订单页整理成 CSV，不查询外部信息。
字段：item_id,description,quantity,unit_price,currency,line_amount,page,source_row,status。
编号按文本保留前导零；换行名称合并为同一行。
缺失值留空并写 status，不猜价格、税率或总额。
另列无法确认的单元格和对应原页位置。先给一页结果供核对。
```

工具若不支持原页定位，另外保存一份逐行对照记录；没有定位时不要宣称结果可追溯。

## [验收与参考结果|Acceptance and reference]

- 正好 3 条数据行，编号 001、002、003 保持原样。
- 001 的 description 包含 Notebook, dotted，不能拆成两个商品；CSV 中的逗号需正确引用。
- 2 × 12.50 = 25.00；3 × 4.00 = 12.00；已知金额小计为 CNY 37.00。
- 003 的 unit_price、line_amount 为空，status 为 unit_price_missing。
- 每行能回到第 1 页的对应数据行；另列未提供税和运费。

可用 CSV 解析器重新打开导出文件，确认列数和字符串类型；在表格软件中导入编号列时指定文本。参考答案只是验收口径，接受等价列名，但不能丢失证据或未知项。

## [失败后查哪里|When it fails]

- 无法选中文字：确认是否为图像页，再选 OCR；文件损坏或权限问题看 [文件排查](https://tools.specul.com/mcp/guides/failure-library.html#files)。
- 名称断行、列错位：先用原页确定行列，再修抽取规则，不让模型补齐看不见的格。
- 金额对不上：区分识别错误、计算错误和源文件本身不一致；异常留在记录中。
- CSV 无法解析：查分隔符、引号、编码与换行，再看 [结构化输出排查](https://tools.specul.com/mcp/guides/failure-library.html#json)。

## [下一步与核验范围|Next step and verification scope]

把这张表作为输入，继续 [多表合并练习](https://tools.specul.com/mcp/guides/playbook-table-merge.html)。需要判断输出是否有依据，读 [怎么验证 AI 的输出](https://learn.specul.com/guide/怎么验证%20AI%20的输出/)。

2026-11-04 核对了本文列出的官方说明范围；本站仅生成并检查示例 PDF 的文字层、图像版和参考文件，未运行 OCR 或测量任何工具表现。
