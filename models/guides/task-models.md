---
id: task-models
stage: 9
title: 任务模型：嵌入、重排、OCR 与语音识别
titleEn: Task models: embedding, reranking, OCR and ASR
summary: 从输入输出、运行库和验收方法区分四类任务；逐层记录平台与格式兼容性，未安装验证的组合保留未知，附练习与排查入口。
summaryEn: Distinguish four task contracts by input, output, runtime and acceptance; record platform/format compatibility by layer, retain untested combinations as unknown, and follow practice and troubleshooting links.
sources:
  - label: BAAI · bge-m3 官方模型卡
    url: https://huggingface.co/BAAI/bge-m3
    kind: docs
  - label: BAAI · bge-reranker-v2-m3 官方模型卡
    url: https://huggingface.co/BAAI/bge-reranker-v2-m3
    kind: docs
  - label: PaddlePaddle · PaddleOCR-VL 官方模型卡
    url: https://huggingface.co/PaddlePaddle/PaddleOCR-VL
    kind: docs
  - label: OpenAI · Whisper large-v3 官方模型卡
    url: https://huggingface.co/openai/whisper-large-v3
    kind: docs
  - label: Hugging Face · Safetensors 格式说明
    url: https://huggingface.co/docs/safetensors/index
    kind: docs
  - label: GGML · GGUF 格式规范
    url: https://github.com/ggml-org/ggml/blob/master/docs/gguf.md
    kind: docs
last_verified: 2026-11-04
confidence: partial
---

## [先看输入和输出|Start with input and output]

聊天生成、嵌入、重排、文档识别、语音识别是不同接口。先写输入类型、输出结构和验收方法，再查模型。下列四个模型卡只是接口例子，不是排名、全量名单或部署推荐；没有在本站下载或运行权重。核对范围为 2026-11-04 的官方模型卡示例与限制。

不熟悉输入输出概念时先读 [语音识别](https://learn.specul.com/term/语音识别/)，区分音频转写和文字生成，再回这里选任务接口。

平台支持按模型版本、库版本、硬件后端和任务一起核对。提供 Python 示例不等于已经确认 Windows、macOS 或所有 Linux GPU 可用；本文没有安装这些环境，未确认的平台明确保留未知。

## [嵌入：文字变成检索表示|Embedding: text to retrieval representations]

接口例子：[BAAI/bge-m3](https://huggingface.co/BAAI/bge-m3)。模型卡展示文本编码与多种检索表示；本节仅讨论文字检索，不推断它能直接读音频或扫描页。

- 输入：查询和文档文字，先保留分块 ID、版本与出处。
- 输出：所选模式的表示；向量不是自然语言答案。记录维度、归一化、查询/文档处理方式与模型修订。
- 运行说明：按模型卡中的 FlagEmbedding 或所列库示例核对依赖和调用；不同模式不假设互换。
- 验收：固定一组有出处的查询与相关段落，检查召回和未命中；不要只看向量维度或榜单。换模型后检查是否需要重建索引，不能把两个模型的向量混入旧索引。
- 未确认：本文未验证具体操作系统、CPU/GPU 后端、量化格式或长输入实际占用。

继续读 [怎么挑 embedding 模型](https://learn.specul.com/guide/怎么挑%20embedding%20模型/)；召回有材料但答案不对时，分别检查检索与生成。

## [重排：给查询与候选配对打分|Reranking: scoring query–candidate pairs]

接口例子：[BAAI/bge-reranker-v2-m3](https://huggingface.co/BAAI/bge-reranker-v2-m3)。官方示例用查询和候选文本对计算分数；不是先把整个库重新变成嵌入。

- 输入：同一查询与已召回的候选段落，每条保留候选 ID 和原顺序。
- 输出：候选分数与重排顺序；分数不是事实正确率，也不能跨不同模型直接当同一刻度。
- 运行说明：模型卡列出 FlagReranker 与 Transformers 等用法；确认输入成对、截断规则和输出分数解释。
- 验收：先判断正确段落是否已进入候选集；没有召回的段落无法靠这次重排补回。对照有判定依据的排序，分别记录相关性与答案证据。
- 未确认：本文未验证各平台后端、服务并发或与某个本地聊天运行器的兼容性。

读 [怎么给检索结果重排](https://learn.specul.com/guide/怎么给检索结果重排/)。少量候选已足够时可不加重排，不把它写成 RAG 必经步骤。

## [OCR 与版面：图像变成有位置的内容|OCR and layout: images to located content]

接口例子：[PaddlePaddle/PaddleOCR-VL](https://huggingface.co/PaddlePaddle/PaddleOCR-VL)。模型卡提供文档图像处理及保存 JSON/Markdown 的管线示例。文档解析管线与单次模型调用不是同一层，不能只凭权重格式判断完整流程可用。

- 输入：原页图像及需要的解析任务；PDF 有可靠文字层时先评估直接抽取。
- 输出：文本、结构或版面结果，具体字段按所用管线版本核对；不是自动核实过的业务表。
- 运行说明：从卡片链接的 PaddleOCR-VL 安装文档核对管线、依赖、后端和版本；区分本卡与其他后续版本。
- 验收：保留页码/区域，检查阅读顺序、表头、跨行内容、空格、前导零和数字；金额另复算。
- 未确认：本文未安装管线，没有验证 Windows/macOS 支持、特定显卡、GGUF 版本或扫描准确率。

用 [虚构 PDF 转表格任务](https://tools.specul.com/mcp/guides/playbook-pdf-table.html) 练习，参考 CSV 是设计答案，不能标成该模型输出。

## [ASR：录音变成转写|ASR: audio to transcript]

接口例子：[openai/whisper-large-v3](https://huggingface.co/openai/whisper-large-v3)。模型卡提供语音识别和翻译说明及 Transformers 示例，并列出转写局限。

- 输入：音频、语言/任务设置；解码与重采样由所选管线要求决定，不能只改文件后缀。
- 输出：转写或指定的翻译结果；时间戳配置需单独核对。转写不自动等于说话人分离、会议决定或行动项。
- 运行说明：按模型卡核对处理器、模型加载与音频管线。本文没有确认任意第三方客户端或量化仓可直接替代。
- 验收：回听姓名、数字、否定、静音和条件；生成式转写可能加入没有说出的文字。纪要再查决定/提议和负责人。
- 未确认：本文未运行 ASR、分离多人或验证具体平台上的延迟/内存。

用 [合成会议录音任务](https://tools.specul.com/mcp/guides/playbook-meeting-notes.html) 练习，输入只有一个声音朗读角色标签，不能用于宣称多人分离效果。

## [兼容性记录：逐层核对|A compatibility record: verify each layer]

给每个候选建立一条记录：模型仓与固定 revision；任务入口；输入预处理器/tokenizer；输出格式；权重格式与精度；运行库/运行器版本；操作系统；CPU/GPU/驱动后端；所需自定义代码；许可来源；已核对范围与未确认项。

- safetensors 是权重存储格式，不能据此推断模型架构、任务接口和硬件支持。
- GGUF 文件存在不等于任意 GGUF 运行器支持该架构、处理器与任务。先查运行器对该模型/任务/版本的明确说明；未知就保留未知。
- OpenAI 风格接口或相同文件扩展名不是行为一致的证据；嵌入、评分、识别和聊天的请求/响应分别检查。
- 需要执行仓库自定义代码时，把代码与版本作为独立依赖审阅；不要为了消除报错无条件打开远程代码执行。

上面的模型卡有不同库示例，本文不提供一张猜测出来的“所有平台都支持”表。没有安装验证的组合不能写“已兼容”。

## [按故障继续，不换模型碰运气|Follow the failure rather than swapping blindly]

- 维度/索引不匹配：先核对嵌入版本、模式与索引元数据，再看 [工具参数排查](https://tools.specul.com/mcp/guides/failure-library.html#tool-input)。
- 召回找不到：检查语料、分块、过滤与查询，再看 [检索排查](https://tools.specul.com/mcp/guides/failure-library.html#retrieval)。
- 图像/音频打不开：先看 [文件排查](https://tools.specul.com/mcp/guides/failure-library.html#files)。
- 内存不足：使用 [上下文与并发预算](https://models.specul.com/guides/gpu-cost-math.html#capacity-workbench)，先确认公式适用范围。编码器、图像和音频管线不能无条件套解码器 KV 公式。

记录失败输入、环境版本、输出和核对位置，修改一个条件再复核；不要把模型卡中的演示结果写成自己的运行记录。
