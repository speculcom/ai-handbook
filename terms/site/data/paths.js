/* AI 名词地图 · 学习路径（S23）
 * **这是产物，不要手改。** 源在 paths/*.json。
 * 每条：id / ord / zh / en / span / lead / steps（有序 slug；C5-3 起可指词条或指南/论文卡）/ checkpoint。
 */
var PATHS = [
 {
  "id": "quick-start",
  "ord": 1,
  "zh": "半小时入门",
  "en": "The Half-Hour Primer",
  "span": {
   "zh": "约 30 分钟",
   "en": "about 30 minutes"
  },
  "lead": {
   "zh": "先读十个常用概念，再做十道自测。目标是分清模型、产品与能力边界，不需要记住全部名词。",
   "en": "Read ten common concepts, then try ten questions. Aim to distinguish models, products and limits without memorizing the whole glossary."
  },
  "steps": [
   "人工智能",
   "机器学习",
   "大模型 - 大语言模型",
   "提示词",
   "Token",
   "上下文窗口",
   "AI 产品 vs AI 模型",
   "生成式 AI",
   "AI Agent 与聊天机器人的区别",
   "能力边界"
  ],
  "checkpoint": {
   "zh": [
    "向外行解释：大模型是怎么「学会」的，为什么按 Token 计费",
    "说清「AI 产品」和「AI 模型」的区别，各举一个例子",
    "说出大模型至少一件明确做不到的事",
    "机器学习、深度学习、大模型三者是什么关系？",
    "把上下文窗口从 8k 扩到 128k，为什么成本和延迟通常会上升？",
    "生成式 AI 与只做分类的模型，输出目标有什么根本不同？",
    "AI Agent 与聊天机器人最大的区别是什么？各举一个任务。",
    "为什么「回答很流畅」不能当作正确性的证据？",
    "同一句提示，为什么两次输出可能不同？",
    "拿到一个 AI 产品页，先用哪三个问题判断它是否适合？"
   ],
   "en": [
    "Explain to a newcomer how a large model learned, and why billing counts tokens",
    "Tell apart an AI product from an AI model, with one example each",
    "Name at least one thing a large model plainly cannot do",
    "How do machine learning, deep learning and large models relate?",
    "Why do cost and latency usually rise when context grows from 8k to 128k?",
    "What fundamentally differs between generative AI and a classifier?",
    "What is the biggest difference between an AI agent and a chatbot? Give one task for each.",
    "Why is fluent wording not evidence of correctness?",
    "Why can the same prompt produce different outputs twice?",
    "Which three questions should you ask first about an AI product page?"
   ]
  },
  "nextTask": {
   "href": "https://learn.specul.com/guide/%E6%80%8E%E4%B9%88%E5%90%91%20AI%20%E6%8F%90%E9%97%AE/",
   "zh": "试着写一份有资料、有边界的提示",
   "en": "Try writing a source-grounded, scoped prompt"
  },
  "stepUrls": [
   "/term/%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD/",
   "/term/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0/",
   "/term/%E5%A4%A7%E6%A8%A1%E5%9E%8B%20-%20%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B/",
   "/term/%E6%8F%90%E7%A4%BA%E8%AF%8D/",
   "/term/Token/",
   "/term/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3/",
   "/term/AI%20%E4%BA%A7%E5%93%81%20vs%20AI%20%E6%A8%A1%E5%9E%8B/",
   "/term/%E7%94%9F%E6%88%90%E5%BC%8F%20AI/",
   "/term/AI%20Agent%20%E4%B8%8E%E8%81%8A%E5%A4%A9%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%9A%84%E5%8C%BA%E5%88%AB/",
   "/term/%E8%83%BD%E5%8A%9B%E8%BE%B9%E7%95%8C/"
  ]
 },
 {
  "id": "afternoon-principles",
  "ord": 2,
  "zh": "一个下午看懂原理",
  "en": "One Afternoon Under the Hood",
  "span": {
   "zh": "一个下午",
   "en": "one afternoon"
  },
  "lead": {
   "zh": "按基础、训练、架构与生成顺序读十二个主题。重点是解释现象和限制；技术细节可在需要时回查。",
   "en": "Read twelve topics across foundations, training, architecture and generation. Focus on explaining behavior and limits; revisit details when needed."
  },
  "steps": [
   "大模型 - 大语言模型",
   "Token",
   "训练",
   "预训练",
   "训练三阶段",
   "Transformer",
   "嵌入层",
   "注意力机制",
   "自回归生成",
   "幻觉的成因",
   "上下文窗口的代价",
   "缩放定律"
  ],
  "checkpoint": {
   "zh": [
    "说出 Transformer 处理一句话的大致流程：切词 → 变向量 → 注意力 → 逐词生成",
    "说清聊天模型的训练三阶段，每一阶段各解决什么问题",
    "解释模型为什么会一本正经地编，以及上下文为什么越大越贵",
    "为什么上下文越长，注意力机制的计算与显存开销增长得很快？",
    "嵌入层把词变成向量后，为什么「相似词」的向量会接近？",
    "自回归生成为什么一次只产生一个 token，而不是整段一次输出？",
    "缩放定律能预测什么，不能预测什么？",
    "预训练与微调各自需要什么数据，解决什么问题？",
    "上下文窗口加倍，是否等于模型能力加倍？",
    "用一句话说明幻觉与生成目标的关系，并给一个核对动作。"
   ],
   "en": [
    "Walk through how a Transformer handles a sentence: split, embed, attend, generate one token at a time",
    "Explain the three training stages of a chat model and what each stage solves",
    "Say why a model fabricates confidently, and why bigger context costs more",
    "Why do attention compute and memory grow quickly with context length?",
    "After embedding, why do similar words end up with nearby vectors?",
    "Why does autoregressive generation produce one token at a time instead of the whole passage at once?",
    "What can scaling laws predict, and what can they not?",
    "What data do pretraining and fine-tuning each need, and what do they solve?",
    "Does doubling the context window double model capability?",
    "In one sentence, relate hallucination to the generation objective, and give one check."
   ]
  },
  "nextTask": {
   "href": "https://models.specul.com/guides/pretraining.html",
   "zh": "继续看预训练的数据与目标",
   "en": "Study pretraining data and objectives"
  },
  "stepUrls": [
   "/term/%E5%A4%A7%E6%A8%A1%E5%9E%8B%20-%20%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B/",
   "/term/Token/",
   "/term/%E8%AE%AD%E7%BB%83/",
   "/term/%E9%A2%84%E8%AE%AD%E7%BB%83/",
   "/term/%E8%AE%AD%E7%BB%83%E4%B8%89%E9%98%B6%E6%AE%B5/",
   "/term/Transformer/",
   "/term/%E5%B5%8C%E5%85%A5%E5%B1%82/",
   "/term/%E6%B3%A8%E6%84%8F%E5%8A%9B%E6%9C%BA%E5%88%B6/",
   "/term/%E8%87%AA%E5%9B%9E%E5%BD%92%E7%94%9F%E6%88%90/",
   "/term/%E5%B9%BB%E8%A7%89%E7%9A%84%E6%88%90%E5%9B%A0/",
   "/term/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3%E7%9A%84%E4%BB%A3%E4%BB%B7/",
   "/term/%E7%BC%A9%E6%94%BE%E5%AE%9A%E5%BE%8B/"
  ]
 },
 {
  "id": "full-week",
  "ord": 3,
  "zh": "一周路线",
  "en": "The Full Week",
  "span": {
   "zh": "一周",
   "en": "one week"
  },
  "lead": {
   "zh": "六站各选代表主题，共二十五步。把能力、成本、许可与评测放在一起看，最后用具体任务检查自己的选择。",
   "en": "Follow twenty-five representative steps across six stations. Connect capability, cost, licensing and evaluation, then examine a choice for a concrete task."
  },
  "steps": [
   "人工智能",
   "大模型 - 大语言模型",
   "提示词",
   "能力边界",
   "幻觉",
   "温度",
   "知识截止",
   "联网 - 检索增强",
   "智能体 - Agent",
   "工具调用",
   "MCP",
   "工作流编排",
   "评估",
   "Transformer",
   "注意力机制",
   "训练三阶段",
   "上下文窗口的代价",
   "显存",
   "量化",
   "GGUF",
   "llama.cpp",
   "开源模型",
   "许可证",
   "基准测试",
   "模型评测的局限"
  ],
  "checkpoint": {
   "zh": [
    "拿到一个新模型的介绍页，能列出该问的问题：能力、边界、成本、许可、锁定",
    "判断一件事该用 API 还是本地跑，并说出判断依据",
    "看懂一份基准榜单，并说出它至少一处代表不了你的实际效果",
    "为什么第一周先跑通一条最小链路，而不是先读完全部理论？",
    "每日复盘应该记录什么，才能让第二周继续？",
    "怎么判断一个周计划已经过载？",
    "项目从 demo 到可交付，最先补哪三样？",
    "为什么同一周内不要同时换模型、数据和评测？",
    "周结束时，什么证据能证明你真的学会了？",
    "第二周该保留什么、删掉什么？"
   ],
   "en": [
    "Given a new model's page, list the questions to ask: capability, limits, cost, licence, lock-in",
    "Decide API or local for a given job, and state the reasoning",
    "Read a benchmark table and name at least one thing it cannot say about your actual use",
    "Why build one minimal pipeline in week one instead of reading all the theory first?",
    "What should a daily review record so week two can continue?",
    "How do you know a one-week plan is overloaded?",
    "Moving from demo to delivery, what three things come first?",
    "Why not change model, data and evaluation in the same week?",
    "At the end of the week, what evidence shows you actually learned?",
    "In week two, what should you keep and what should you cut?"
   ]
  },
  "nextTask": {
   "href": "https://tools.specul.com/mcp/guides/toolkit-prompt-context.html#worked-example",
   "zh": "把一个实际任务写进工作表",
   "en": "Put a concrete task into a worksheet"
  },
  "stepUrls": [
   "/term/%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD/",
   "/term/%E5%A4%A7%E6%A8%A1%E5%9E%8B%20-%20%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B/",
   "/term/%E6%8F%90%E7%A4%BA%E8%AF%8D/",
   "/term/%E8%83%BD%E5%8A%9B%E8%BE%B9%E7%95%8C/",
   "/term/%E5%B9%BB%E8%A7%89/",
   "/term/%E6%B8%A9%E5%BA%A6/",
   "/term/%E7%9F%A5%E8%AF%86%E6%88%AA%E6%AD%A2/",
   "/term/%E8%81%94%E7%BD%91%20-%20%E6%A3%80%E7%B4%A2%E5%A2%9E%E5%BC%BA/",
   "/term/%E6%99%BA%E8%83%BD%E4%BD%93%20-%20Agent/",
   "/term/%E5%B7%A5%E5%85%B7%E8%B0%83%E7%94%A8/",
   "/term/MCP/",
   "/term/%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%BC%96%E6%8E%92/",
   "/term/%E8%AF%84%E4%BC%B0/",
   "/term/Transformer/",
   "/term/%E6%B3%A8%E6%84%8F%E5%8A%9B%E6%9C%BA%E5%88%B6/",
   "/term/%E8%AE%AD%E7%BB%83%E4%B8%89%E9%98%B6%E6%AE%B5/",
   "/term/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3%E7%9A%84%E4%BB%A3%E4%BB%B7/",
   "/term/%E6%98%BE%E5%AD%98/",
   "/term/%E9%87%8F%E5%8C%96/",
   "/term/GGUF/",
   "/term/llama.cpp/",
   "/term/%E5%BC%80%E6%BA%90%E6%A8%A1%E5%9E%8B/",
   "/term/%E8%AE%B8%E5%8F%AF%E8%AF%81/",
   "/term/%E5%9F%BA%E5%87%86%E6%B5%8B%E8%AF%95/",
   "/term/%E6%A8%A1%E5%9E%8B%E8%AF%84%E6%B5%8B%E7%9A%84%E5%B1%80%E9%99%90/"
  ]
 },
 {
  "id": "for-writers",
  "ord": 4,
  "zh": "内容工作者路线",
  "en": "The Writer's Route",
  "span": {
   "zh": "约 40 分钟",
   "en": "about 40 minutes"
  },
  "lead": {
   "zh": "围绕资料整理、写作与引用，了解生成限制和核对方法。读完后用一小段真实资料练习，而非只记提问技巧。",
   "en": "Study limitations and checks for research, writing and citations. Then practice on a short source passage rather than memorizing prompting tips."
  },
  "steps": [
   "生成式 AI",
   "提示词",
   "上下文窗口",
   "幻觉",
   "幻觉的成因",
   "知识截止",
   "联网 - 检索增强",
   "温度",
   "系统提示",
   "水印与内容凭证"
  ],
  "checkpoint": {
   "zh": [
    "说出幻觉的两种成因，各配一个写作场景里的例子",
    "用「联网检索 + 自己核对」替代直接采信 AI 给的引用",
    "拿到一段 AI 文字，说清哪些部分必须人工复核、复核什么",
    "知识截止日期会怎样影响一段「最新政策」的写作？",
    "温度调高，改善的是文风还是事实可靠性？",
    "系统提示与用户提示冲突时，写作者应该怎么处理？",
    "上下文里塞满资料，为什么反而可能漏掉关键句？",
    "AI 给的引用链接能打开，为什么仍不能直接引用？",
    "改写他人文章时，哪些改动可能构成断章取义？",
    "给一段 AI 文案做发布前检查，列四项必查。"
   ],
   "en": [
    "Name two causes of hallucination, each with an example from a writing scenario",
    "Replace trusting AI-provided citations on faith with retrieval plus your own verification",
    "Given a passage of AI text, say which parts require human review and what to check",
    "How does a knowledge cutoff affect writing about a “latest policy”?",
    "Does higher temperature improve style or factual reliability?",
    "What should a writer do when system and user prompts conflict?",
    "Why can filling the context with material make the key sentence harder to find?",
    "Why is a working citation link still not enough to quote?",
    "Which edits can turn a rewrite into misrepresentation?",
    "List four checks before publishing an AI-written passage."
   ]
  },
  "nextTask": {
   "href": "https://tools.specul.com/mcp/guides/playbook-research-brief.html#worked-example",
   "zh": "写一页能逐条核对出处的摘要",
   "en": "Write a one-page brief with traceable claims"
  },
  "stepUrls": [
   "/term/%E7%94%9F%E6%88%90%E5%BC%8F%20AI/",
   "/term/%E6%8F%90%E7%A4%BA%E8%AF%8D/",
   "/term/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3/",
   "/term/%E5%B9%BB%E8%A7%89/",
   "/term/%E5%B9%BB%E8%A7%89%E7%9A%84%E6%88%90%E5%9B%A0/",
   "/term/%E7%9F%A5%E8%AF%86%E6%88%AA%E6%AD%A2/",
   "/term/%E8%81%94%E7%BD%91%20-%20%E6%A3%80%E7%B4%A2%E5%A2%9E%E5%BC%BA/",
   "/term/%E6%B8%A9%E5%BA%A6/",
   "/term/%E7%B3%BB%E7%BB%9F%E6%8F%90%E7%A4%BA/",
   "/term/%E6%B0%B4%E5%8D%B0%E4%B8%8E%E5%86%85%E5%AE%B9%E5%87%AD%E8%AF%81/"
  ]
 },
 {
  "id": "for-builders",
  "ord": 5,
  "zh": "动手开发者路线",
  "en": "The Builder's Route",
  "span": {
   "zh": "约 60 分钟",
   "en": "about 60 minutes"
  },
  "lead": {
   "zh": "按搭建顺序读接口、检索、工具调用、评测与成本。阅读用于理解链路；实际接入还需按当前版本检查并验证。",
   "en": "Study interfaces, retrieval, tools, evaluation and cost in build order. This explains the pipeline; actual integration still needs version checks and validation."
  },
  "steps": [
   "API - 接口调用",
   "OpenAI 兼容接口",
   "上下文窗口",
   "向量 - 嵌入",
   "分块",
   "联网 - 检索增强",
   "工具定义",
   "工具调用",
   "MCP",
   "智能体 - Agent",
   "工作流编排",
   "评估",
   "单次调用成本",
   "提示注入"
  ],
  "checkpoint": {
   "zh": [
    "说清一次 API 调用的费用由哪几段 token 构成",
    "解释检索链路里分块与嵌入各自决定什么",
    "指出接入工具调用时最先要设的两道防线",
    "OpenAI 兼容接口为什么能接多家模型？哪些地方仍会不同？",
    "向量检索效果差，先查分块还是先换嵌入模型？给出排查顺序。",
    "检索增强能解决什么，不能解决什么？",
    "工具定义与工具调用分别由谁负责？",
    "MCP 主要解决接口标准化还是权限问题？",
    "工作流编排与 Agent 自主决策的界线在哪里？",
    "上线前的最小评测集，至少要有哪三类样本？"
   ],
   "en": [
    "Break down an API call's cost into its token segments",
    "Explain what chunking and embedding each determine in a retrieval pipeline",
    "Name the first two defenses to put in place when adding tool calling",
    "Why can an OpenAI-compatible API reach many models, and what still differs?",
    "Retrieval is weak: check chunking first or swap the embedding model? Give the order.",
    "What does retrieval augmentation solve, and what does it not?",
    "Who owns tool definition and who owns tool invocation?",
    "Does MCP mainly solve interface standardisation or permissions?",
    "Where is the line between workflow orchestration and agent autonomy?",
    "What three sample types should a minimum pre-launch evaluation set include?"
   ]
  },
  "nextTask": {
   "href": "https://tools.specul.com/mcp/guides/playbook-fix-a-bug.html#worked-example",
   "zh": "按一个小问题练习复现与验收",
   "en": "Practice reproduction and acceptance on a small issue"
  },
  "stepUrls": [
   "/term/API%20-%20%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8/",
   "/term/OpenAI%20%E5%85%BC%E5%AE%B9%E6%8E%A5%E5%8F%A3/",
   "/term/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3/",
   "/term/%E5%90%91%E9%87%8F%20-%20%E5%B5%8C%E5%85%A5/",
   "/term/%E5%88%86%E5%9D%97/",
   "/term/%E8%81%94%E7%BD%91%20-%20%E6%A3%80%E7%B4%A2%E5%A2%9E%E5%BC%BA/",
   "/term/%E5%B7%A5%E5%85%B7%E5%AE%9A%E4%B9%89/",
   "/term/%E5%B7%A5%E5%85%B7%E8%B0%83%E7%94%A8/",
   "/term/MCP/",
   "/term/%E6%99%BA%E8%83%BD%E4%BD%93%20-%20Agent/",
   "/term/%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%BC%96%E6%8E%92/",
   "/term/%E8%AF%84%E4%BC%B0/",
   "/term/%E5%8D%95%E6%AC%A1%E8%B0%83%E7%94%A8%E6%88%90%E6%9C%AC/",
   "/term/%E6%8F%90%E7%A4%BA%E6%B3%A8%E5%85%A5/"
  ]
 },
 {
  "id": "for-managers",
  "ord": 6,
  "zh": "选型决策者路线",
  "en": "The Decision-Maker's Route",
  "span": {
   "zh": "约 50 分钟",
   "en": "about 50 minutes"
  },
  "lead": {
   "zh": "把产品、部署、数据、成本与退出条件逐项拆开。目标是形成一份能说明选择原因和未知项的采购记录。",
   "en": "Separate product, deployment, data, cost and exit conditions. Aim for a procurement record explaining the choice and unresolved items."
  },
  "steps": [
   "AI 产品 vs AI 模型",
   "开源模型",
   "开放权重",
   "许可证",
   "成本",
   "自托管成本",
   "供应商锁定",
   "退出成本",
   "数据不出网",
   "数据驻留",
   "隐私与合规",
   "生成式 AI 合规义务",
   "基准测试",
   "模型评测的局限"
  ],
  "checkpoint": {
   "zh": [
    "用三个维度对比「调 API」与「自己部署」的总成本",
    "说出更换模型供应商之前必须核实的三件事",
    "看一份供应商评测报告，判断哪些分数可以直接采信、哪些要打问号",
    "API 与自托管的成本，为什么不能只比单价？",
    "供应商锁定的三个早期迹象是什么？",
    "数据驻留与「数据不出网」有什么区别？",
    "开源模型许可证要核对哪四项？",
    "模型评测榜单为什么不能直接用于采购决策？",
    "换模型前，迁移评估至少要跑哪几类样本？",
    "采购记录里的未知项应该怎么写？"
   ],
   "en": [
    "Compare API usage against self-hosting on three cost dimensions",
    "Name three things to verify before switching model vendors",
    "Read a vendor's evaluation report and say which scores stand up and which need a question mark",
    "Why can API and self-hosting not be compared on unit price alone?",
    "What are three early signs of vendor lock-in?",
    "What is the difference between data residency and “data never leaves the network”?",
    "Which four terms should you check in an open-model licence?",
    "Why can a model benchmark table not be used directly for procurement?",
    "Which sample types should a migration evaluation cover before switching models?",
    "How should unknowns be written in a procurement record?"
   ]
  },
  "nextTask": {
   "href": "https://tools.specul.com/mcp/guides/toolkit-worksheets.html#worked-example",
   "zh": "照已填示例完成一份项目记录",
   "en": "Complete a project record using the filled example"
  },
  "stepUrls": [
   "/term/AI%20%E4%BA%A7%E5%93%81%20vs%20AI%20%E6%A8%A1%E5%9E%8B/",
   "/term/%E5%BC%80%E6%BA%90%E6%A8%A1%E5%9E%8B/",
   "/term/%E5%BC%80%E6%94%BE%E6%9D%83%E9%87%8D/",
   "/term/%E8%AE%B8%E5%8F%AF%E8%AF%81/",
   "/term/%E6%88%90%E6%9C%AC/",
   "/term/%E8%87%AA%E6%89%98%E7%AE%A1%E6%88%90%E6%9C%AC/",
   "/term/%E4%BE%9B%E5%BA%94%E5%95%86%E9%94%81%E5%AE%9A/",
   "/term/%E9%80%80%E5%87%BA%E6%88%90%E6%9C%AC/",
   "/term/%E6%95%B0%E6%8D%AE%E4%B8%8D%E5%87%BA%E7%BD%91/",
   "/term/%E6%95%B0%E6%8D%AE%E9%A9%BB%E7%95%99/",
   "/term/%E9%9A%90%E7%A7%81%E4%B8%8E%E5%90%88%E8%A7%84/",
   "/term/%E7%94%9F%E6%88%90%E5%BC%8F%20AI%20%E5%90%88%E8%A7%84%E4%B9%89%E5%8A%A1/",
   "/term/%E5%9F%BA%E5%87%86%E6%B5%8B%E8%AF%95/",
   "/term/%E6%A8%A1%E5%9E%8B%E8%AF%84%E6%B5%8B%E7%9A%84%E5%B1%80%E9%99%90/"
  ]
 },
 {
  "id": "for-researchers",
  "ord": 7,
  "zh": "研究学习者路线",
  "en": "The Researcher's Route",
  "span": {
   "zh": "约 115 分钟",
   "en": "about 115 minutes"
  },
  "lead": {
   "zh": "将原理词条与论文卡交替阅读。每篇都记录研究问题、证据设置和适用边界；未披露的部分保留为未知。",
   "en": "Alternate concepts and paper cards. Record each research question, evidence setup and scope; leave undisclosed details unknown."
  },
  "steps": [
   "Transformer",
   "注意力机制",
   "论文卡-Attention Is All You Need",
   "预训练",
   "训练三阶段",
   "论文卡-GPT-3",
   "缩放定律",
   "论文卡-Chinchilla",
   "微调",
   "论文卡-InstructGPT",
   "论文卡-Self-Instruct",
   "论文卡-LIMA",
   "知识蒸馏",
   "量化",
   "困惑度",
   "怎么读一篇AI论文",
   "基准测试",
   "论文卡-HELM",
   "模型评测的局限",
   "数据污染",
   "开放权重",
   "论文卡-Llama 2",
   "模型卡"
  ],
  "checkpoint": {
   "zh": [
    "把一份技术报告的训练章节拆成预训练/后训练两段，各说出关键变量",
    "看到「刷新 SOTA」的说法，先查评测集发布时间和训练截止日期的关系",
    "读模型卡时能指出许可证、评测口径和已知局限三处关键信息",
    "对路线里的论文卡，各说出研究问题与核心证据位置，并说出至少一条「论文没有主张」的流行说法",
    "读论文时，摘要、实验设置、局限性分别该抓什么？",
    "困惑度低是否等于生成质量高？",
    "知识蒸馏与量化的目标有何不同？",
    "论文卡里的「证据位置」为什么比结论更重要？",
    "开放权重与开源模型的差别，为什么要看许可证？",
    "看到「模型卡」时，如何判断评测是否可复现？"
   ],
   "en": [
    "Split a tech report's training section into pretraining and post-training, naming the key variables of each",
    "On seeing a \"new SOTA\" claim, first check the benchmark's release date against the model's training cutoff",
    "When reading a model card, point out the license, the eval setup, and the stated limitations",
    "For each paper card on this route, state its research question and where the core evidence sits, and name at least one popular claim the paper never makes",
    "When reading a paper, what should you take from the abstract, setup and limitations?",
    "Does lower perplexity mean better generation quality?",
    "How do knowledge distillation and quantisation differ in goal?",
    "Why does the evidence location on a paper card matter more than the conclusion?",
    "Why distinguish open weights from open-source models, and why read the licence?",
    "When reading a model card, how do you judge whether its evaluation is reproducible?"
   ]
  },
  "nextTask": {
   "href": "https://learn.specul.com/guide/%E6%80%8E%E4%B9%88%E8%AF%BB%E4%B8%80%E7%AF%87AI%E8%AE%BA%E6%96%87/",
   "zh": "选一篇论文完成问题、证据与局限记录",
   "en": "Read a paper into a question/evidence/limits record"
  },
  "stepUrls": [
   "/term/Transformer/",
   "/term/%E6%B3%A8%E6%84%8F%E5%8A%9B%E6%9C%BA%E5%88%B6/",
   "/guide/%E8%AE%BA%E6%96%87%E5%8D%A1-Attention%20Is%20All%20You%20Need/",
   "/term/%E9%A2%84%E8%AE%AD%E7%BB%83/",
   "/term/%E8%AE%AD%E7%BB%83%E4%B8%89%E9%98%B6%E6%AE%B5/",
   "/guide/%E8%AE%BA%E6%96%87%E5%8D%A1-GPT-3/",
   "/term/%E7%BC%A9%E6%94%BE%E5%AE%9A%E5%BE%8B/",
   "/guide/%E8%AE%BA%E6%96%87%E5%8D%A1-Chinchilla/",
   "/term/%E5%BE%AE%E8%B0%83/",
   "/guide/%E8%AE%BA%E6%96%87%E5%8D%A1-InstructGPT/",
   "/guide/%E8%AE%BA%E6%96%87%E5%8D%A1-Self-Instruct/",
   "/guide/%E8%AE%BA%E6%96%87%E5%8D%A1-LIMA/",
   "/term/%E7%9F%A5%E8%AF%86%E8%92%B8%E9%A6%8F/",
   "/term/%E9%87%8F%E5%8C%96/",
   "/term/%E5%9B%B0%E6%83%91%E5%BA%A6/",
   "/guide/%E6%80%8E%E4%B9%88%E8%AF%BB%E4%B8%80%E7%AF%87AI%E8%AE%BA%E6%96%87/",
   "/term/%E5%9F%BA%E5%87%86%E6%B5%8B%E8%AF%95/",
   "/guide/%E8%AE%BA%E6%96%87%E5%8D%A1-HELM/",
   "/term/%E6%A8%A1%E5%9E%8B%E8%AF%84%E6%B5%8B%E7%9A%84%E5%B1%80%E9%99%90/",
   "/term/%E6%95%B0%E6%8D%AE%E6%B1%A1%E6%9F%93/",
   "/term/%E5%BC%80%E6%94%BE%E6%9D%83%E9%87%8D/",
   "/guide/%E8%AE%BA%E6%96%87%E5%8D%A1-Llama%202/",
   "/term/%E6%A8%A1%E5%9E%8B%E5%8D%A1/"
  ]
 },
 {
  "id": "for-operators",
  "ord": 8,
  "zh": "运维上线路线",
  "en": "The Operator's Route",
  "span": {
   "zh": "约 60 分钟",
   "en": "about 60 minutes"
  },
  "lead": {
   "zh": "沿运行、监控、权限、故障与退役读十四个主题。先建立排查顺序，再用具体服务的配置与日志验证。",
   "en": "Study fourteen topics covering runtime, monitoring, permissions, failure and retirement. Form an investigation order, then validate it against a service’s configuration and logs."
  },
  "steps": [
   "推理成本",
   "首字延迟",
   "吞吐",
   "KV 缓存",
   "缓存策略",
   "连续批处理",
   "速率限制",
   "可观测性",
   "护栏",
   "提示注入",
   "权限",
   "服务中断风险",
   "模型退役",
   "本地部署"
  ],
  "checkpoint": {
   "zh": [
    "说出首字延迟和吞吐各自受什么影响，各给一个优化手段",
    "给线上服务列出三件必须监控的事，并说明各自先查什么",
    "供应商宣布模型退役时，能走一遍迁移评估的四个检查项",
    "KV 缓存为什么会占满显存，何时需要分页或量化？",
    "连续批处理提升吞吐，代价是什么？",
    "速率限制与配额应该按什么维度设？",
    "提示注入在运维日志里通常留下什么痕迹？",
    "权限最小化在 AI 服务里具体落在哪三层？",
    "服务中断时，先保什么、后保什么？",
    "模型退役迁移，为什么先跑回滚再切换？"
   ],
   "en": [
    "Say what drives time-to-first-token and throughput respectively, with one optimization for each",
    "List three things a live service must monitor, and what to check first for each",
    "When a vendor announces retirement, walk through the four migration-assessment checks",
    "Why does the KV cache fill memory, and when do you need paging or quantisation?",
    "Continuous batching raises throughput; what does it cost?",
    "Which dimensions should rate limits and quotas use?",
    "What traces does prompt injection usually leave in operational logs?",
    "Where does least privilege land in an AI service?",
    "During an outage, what do you protect first and what later?",
    "Why rehearse rollback before switching during model retirement?"
   ]
  },
  "nextTask": {
   "href": "https://tools.specul.com/mcp/guides/playbook-local-model.html#worked-example",
   "zh": "从容量预算走到运行检查",
   "en": "Move from a capacity budget to runtime checks"
  },
  "stepUrls": [
   "/term/%E6%8E%A8%E7%90%86%E6%88%90%E6%9C%AC/",
   "/term/%E9%A6%96%E5%AD%97%E5%BB%B6%E8%BF%9F/",
   "/term/%E5%90%9E%E5%90%90/",
   "/term/KV%20%E7%BC%93%E5%AD%98/",
   "/term/%E7%BC%93%E5%AD%98%E7%AD%96%E7%95%A5/",
   "/term/%E8%BF%9E%E7%BB%AD%E6%89%B9%E5%A4%84%E7%90%86/",
   "/term/%E9%80%9F%E7%8E%87%E9%99%90%E5%88%B6/",
   "/term/%E5%8F%AF%E8%A7%82%E6%B5%8B%E6%80%A7/",
   "/term/%E6%8A%A4%E6%A0%8F/",
   "/term/%E6%8F%90%E7%A4%BA%E6%B3%A8%E5%85%A5/",
   "/term/%E6%9D%83%E9%99%90/",
   "/term/%E6%9C%8D%E5%8A%A1%E4%B8%AD%E6%96%AD%E9%A3%8E%E9%99%A9/",
   "/term/%E6%A8%A1%E5%9E%8B%E9%80%80%E5%BD%B9/",
   "/term/%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2/"
  ]
 },
 {
  "id": "for-consumers",
  "ord": 9,
  "zh": "普通消费者路线",
  "en": "The Everyday User's Route",
  "span": {
   "zh": "约 30 分钟",
   "en": "about 30 minutes"
  },
  "lead": {
   "zh": "从日常使用出发，了解 AI 能做什么、哪里可能出错，再检查资料、隐私与发布要求。无需编程基础。",
   "en": "Start from everyday use: learn capabilities and errors, then check sources, privacy and publication requirements. No programming background required."
  },
  "steps": [
   "人工智能",
   "生成式 AI",
   "提示词",
   "AI 搜索",
   "幻觉",
   "多模态",
   "隐私与合规",
   "水印与内容凭证"
  ],
  "checkpoint": {
   "zh": [
    "说清 AI 的回答为什么可能错，并知道至少两种核对办法",
    "拿到一段 AI 生成的文字或图片，能判断哪些信息必须人工复核",
    "知道哪些内容不要输入公共聊天工具，以及怎么用临时聊天或关闭训练开关",
    "AI 搜索与普通搜索的最大差别是什么？",
    "多模态模型看图和读文，失败方式有何不同？",
    "水印与内容凭证能证明什么，不能证明什么？",
    "提示词写得长，是否一定更好？",
    "为什么不要把自己的身份证或客户名单贴进公共聊天？",
    "看到「生成式 AI」宣传，如何判断它是不是只是模板？",
    "拿到 AI 生成的图片，发布前至少查哪三项？"
   ],
   "en": [
    "Explain why an AI answer can be wrong and know at least two ways to check it",
    "Given AI-generated text or images, identify which claims need human verification",
    "Know what not to paste into a public chat tool, and how to use temporary chat or turn off training",
    "What is the biggest difference between AI search and ordinary search?",
    "How do multimodal models fail differently on images and text?",
    "What can watermarking and content credentials prove, and what can they not?",
    "Is a longer prompt always better?",
    "Why should you not paste your ID or a customer list into a public chat?",
    "How do you tell whether a “generative AI” claim is just a template?",
    "What three checks should an AI-generated image pass before publication?"
   ]
  },
  "nextTask": {
   "href": "https://tools.specul.com/mcp/guides/chat-selection.html",
   "zh": "按用途和数据条件挑聊天工具",
   "en": "Choose chat tools by task and data constraints"
  },
  "stepUrls": [
   "/term/%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD/",
   "/term/%E7%94%9F%E6%88%90%E5%BC%8F%20AI/",
   "/term/%E6%8F%90%E7%A4%BA%E8%AF%8D/",
   "/term/AI%20%E6%90%9C%E7%B4%A2/",
   "/term/%E5%B9%BB%E8%A7%89/",
   "/term/%E5%A4%9A%E6%A8%A1%E6%80%81/",
   "/term/%E9%9A%90%E7%A7%81%E4%B8%8E%E5%90%88%E8%A7%84/",
   "/term/%E6%B0%B4%E5%8D%B0%E4%B8%8E%E5%86%85%E5%AE%B9%E5%87%AD%E8%AF%81/"
  ]
 },
 {
  "id": "for-creators",
  "ord": 10,
  "zh": "图像 / 视频 / 音频创作者路线",
  "en": "The Image / Video / Audio Creator's Route",
  "span": {
   "zh": "约 40 分钟",
   "en": "about 40 minutes"
  },
  "lead": {
   "zh": "沿文字、图像、视频与声音的生成环节，检查常见失败、素材来源与发布条件。目标是能列出验收项。",
   "en": "Study generation across text, image, video and sound, including failures, provenance and publication conditions. Aim to define acceptance checks."
  },
  "steps": [
   "生成式 AI",
   "文生图",
   "视频生成",
   "语音合成",
   "多模态",
   "水印与内容凭证",
   "生成式 AI 合规义务",
   "隐私与合规"
  ],
  "checkpoint": {
   "zh": [
    "说清文生图 / 视频生成 / 语音合成各自的一条主要失败模式",
    "拿到一个生成工具，能先核对商用许可与训练数据来源，再看效果",
    "知道发布 AI 生成内容时的标识义务，以及哪些素材不能直接商用",
    "文生图的文字为什么经常错，验收时怎么查？",
    "视频生成的时间一致性，主要看哪两处？",
    "语音合成验收，除了好听还要查什么？",
    "多模态生成里，素材来源与输出许可为什么要分开记录？",
    "AI 生成内容的标识义务，依据什么判断？",
    "接一个商单时，怎么判断训练数据来源风险？",
    "把这条路线压成一张验收清单，至少写五项。"
   ],
   "en": [
    "Name one main failure mode for text-to-image, video generation and speech synthesis each",
    "Given a generation tool, check commercial licensing and training-data provenance before judging output",
    "Know the labelling duties for publishing AI-generated content and which assets cannot be used commercially",
    "Why does text in generated images often fail, and how do you check it?",
    "Where do you check temporal consistency in generated video?",
    "Beyond sounding pleasant, what should speech synthesis acceptance check?",
    "Why record input provenance and output licence separately in multimodal generation?",
    "What determines the labelling duty for AI-generated content?",
    "How do you assess training-data provenance risk for a commercial job?",
    "Compress this route into an acceptance checklist with at least five items."
   ]
  },
  "nextTask": {
   "href": "https://tools.specul.com/mcp/guides/playbook-60s-video.html#worked-example",
   "zh": "把素材与核对项放进一分钟视频计划",
   "en": "Plan a one-minute video with asset and acceptance records"
  },
  "stepUrls": [
   "/term/%E7%94%9F%E6%88%90%E5%BC%8F%20AI/",
   "/term/%E6%96%87%E7%94%9F%E5%9B%BE/",
   "/term/%E8%A7%86%E9%A2%91%E7%94%9F%E6%88%90/",
   "/term/%E8%AF%AD%E9%9F%B3%E5%90%88%E6%88%90/",
   "/term/%E5%A4%9A%E6%A8%A1%E6%80%81/",
   "/term/%E6%B0%B4%E5%8D%B0%E4%B8%8E%E5%86%85%E5%AE%B9%E5%87%AD%E8%AF%81/",
   "/term/%E7%94%9F%E6%88%90%E5%BC%8F%20AI%20%E5%90%88%E8%A7%84%E4%B9%89%E5%8A%A1/",
   "/term/%E9%9A%90%E7%A7%81%E4%B8%8E%E5%90%88%E8%A7%84/"
  ]
 },
 {
  "id": "for-safety-review",
  "ord": 11,
  "zh": "安全与合规评审路线",
  "en": "The Safety and Compliance Review Route",
  "span": {
   "zh": "约 45 分钟",
   "en": "about 45 minutes"
  },
  "lead": {
   "zh": "上线前把风险面、数据面与义务面分开看：先确认会被怎样滥用，再确认数据去了哪里，最后确认你必须留下什么记录。读完应能写出一份带未知项的评审结论。",
   "en": "Split the pre-launch review into risk, data and obligation: how it can be misused, where the data goes, and what records you must keep. Finish with a written review that names unresolved items."
  },
  "steps": [
   "AI 安全",
   "提示注入",
   "偏好对齐",
   "拒答",
   "输出越界与拒答",
   "红队测试",
   "数据不出网",
   "数据驻留",
   "隐私与合规",
   "生成式 AI 合规义务",
   "水印与内容凭证",
   "可观测性"
  ],
  "checkpoint": {
   "zh": [
    "说出三类你会在评审会上追问的风险面，各自对应什么证据",
    "判断一项功能是否触及需要留记录的义务，并指出依据来自哪份官方文本",
    "写下一条你无法确认为「安全」的项，说明缺的是哪个官方说法",
    "提示注入的输入面与输出面，各举一个证据。",
    "拒答与输出越界，为什么不能只看「是否拒绝」？",
    "红队测试的最小记录应包含什么？",
    "偏好对齐解决什么，不解决什么？",
    "「数据不出网」与「数据驻留」在评审里各要什么证据？",
    "可观测性为何是安全评审的一部分？",
    "写一条「无法确认安全」的结论，必须包含哪三要素？"
   ],
   "en": [
    "Name three risk areas you would press for in a review meeting and what evidence answers each",
    "Judge whether a feature triggers a record-keeping obligation and cite which official text it comes from",
    "Write one item you cannot confirm as safe and say which official statement is missing",
    "Give one piece of evidence each for the input and output sides of prompt injection.",
    "Why can’t refusal and out-of-scope output be judged by “did it refuse” alone?",
    "What should a minimal red-team record contain?",
    "What does preference alignment solve, and what does it not?",
    "What evidence do “data never leaves the network” and “data residency” each need in review?",
    "Why is observability part of a safety review?",
    "What three elements must a “cannot confirm safety” conclusion contain?"
   ]
  },
  "nextTask": {
   "href": "https://learn.specul.com/guide/%E6%80%8E%E4%B9%88%E7%BB%99%E5%9B%A2%E9%98%9F%E5%81%9A%20AI%20%E9%A3%8E%E9%99%A9%E6%B8%85%E5%8D%95/",
   "zh": "把这十二步转成一份能开会用的风险清单",
   "en": "Turn these twelve steps into a risk list you can bring to a meeting"
  },
  "stepUrls": [
   "/term/AI%20%E5%AE%89%E5%85%A8/",
   "/term/%E6%8F%90%E7%A4%BA%E6%B3%A8%E5%85%A5/",
   "/term/%E5%81%8F%E5%A5%BD%E5%AF%B9%E9%BD%90/",
   "/term/%E6%8B%92%E7%AD%94/",
   "/term/%E8%BE%93%E5%87%BA%E8%B6%8A%E7%95%8C%E4%B8%8E%E6%8B%92%E7%AD%94/",
   "/term/%E7%BA%A2%E9%98%9F%E6%B5%8B%E8%AF%95/",
   "/term/%E6%95%B0%E6%8D%AE%E4%B8%8D%E5%87%BA%E7%BD%91/",
   "/term/%E6%95%B0%E6%8D%AE%E9%A9%BB%E7%95%99/",
   "/term/%E9%9A%90%E7%A7%81%E4%B8%8E%E5%90%88%E8%A7%84/",
   "/term/%E7%94%9F%E6%88%90%E5%BC%8F%20AI%20%E5%90%88%E8%A7%84%E4%B9%89%E5%8A%A1/",
   "/term/%E6%B0%B4%E5%8D%B0%E4%B8%8E%E5%86%85%E5%AE%B9%E5%87%AD%E8%AF%81/",
   "/term/%E5%8F%AF%E8%A7%82%E6%B5%8B%E6%80%A7/"
  ]
 },
 {
  "id": "for-eval-builders",
  "ord": 12,
  "zh": "评测与质量路线",
  "en": "The Evaluation and Quality Route",
  "span": {
   "zh": "约 40 分钟",
   "en": "about 40 minutes"
  },
  "lead": {
   "zh": "从「别人报的分数」走到「你能自己复跑的判法」：先弄清评测在测什么、什么时候失效，再把它落成一套能记录、能复跑、能追责的最小流程。",
   "en": "Move from other people's scores to judgements you can re-run: what an evaluation actually measures, where it fails, and how to land it as a minimal flow you can record, re-run and hold accountable."
  },
  "steps": [
   "评估",
   "基准测试",
   "模型评测的局限",
   "评测饱和",
   "训练集与测试集",
   "数据污染",
   "幻觉",
   "幻觉的成因",
   "结构化输出",
   "迁移评估",
   "可观测性"
  ],
  "checkpoint": {
   "zh": [
    "说明一份公开分数在什么条件下不能用于你的任务",
    "给自己的场景写出两条机器能判、三条只能人判的检查",
    "指出一项评测结论要能被别人复跑，最少要固定哪几样东西",
    "评测饱和是什么意思，遇到时怎么办？",
    "数据污染如何影响分数，怎么查？",
    "结构化输出评测，先看格式还是内容？",
    "迁移评估要换什么、保留什么？",
    "可观测性在评测里记录什么？",
    "幻觉评测为什么不能只用自动指标？",
    "一个 20 条样本的最小评测，机器判与人判怎么分？"
   ],
   "en": [
    "Say when a published score cannot transfer to your task",
    "Write two checks your scenario can judge automatically and three that need a person",
    "Name the minimum set of things to pin so others can reproduce an evaluation result",
    "What is benchmark saturation, and what do you do when it happens?",
    "How does data contamination affect scores, and how do you check it?",
    "For structured-output evaluation, check format or content first?",
    "In a migration evaluation, what changes and what stays fixed?",
    "What does observability record in an evaluation?",
    "Why can’t hallucination evaluation rely on automatic metrics alone?",
    "For a 20-item minimum evaluation, how do you split machine and human judging?"
   ]
  },
  "nextTask": {
   "href": "https://learn.specul.com/guide/%E6%80%8E%E4%B9%88%E6%90%AD%E4%B8%80%E6%9D%A1%E6%9C%80%E5%B0%8F%E8%AF%84%E6%B5%8B%E6%B5%81%E7%A8%8B//",
   "zh": "按这条路线落一份能复跑的最小评测流程",
   "en": "Use this route to set up a minimal evaluation flow you can re-run"
  },
  "stepUrls": [
   "/term/%E8%AF%84%E4%BC%B0/",
   "/term/%E5%9F%BA%E5%87%86%E6%B5%8B%E8%AF%95/",
   "/term/%E6%A8%A1%E5%9E%8B%E8%AF%84%E6%B5%8B%E7%9A%84%E5%B1%80%E9%99%90/",
   "/term/%E8%AF%84%E6%B5%8B%E9%A5%B1%E5%92%8C/",
   "/term/%E8%AE%AD%E7%BB%83%E9%9B%86%E4%B8%8E%E6%B5%8B%E8%AF%95%E9%9B%86/",
   "/term/%E6%95%B0%E6%8D%AE%E6%B1%A1%E6%9F%93/",
   "/term/%E5%B9%BB%E8%A7%89/",
   "/term/%E5%B9%BB%E8%A7%89%E7%9A%84%E6%88%90%E5%9B%A0/",
   "/term/%E7%BB%93%E6%9E%84%E5%8C%96%E8%BE%93%E5%87%BA/",
   "/term/%E8%BF%81%E7%A7%BB%E8%AF%84%E4%BC%B0/",
   "/term/%E5%8F%AF%E8%A7%82%E6%B5%8B%E6%80%A7/"
  ]
 },
 {
  "id": "for-robotics",
  "ord": 13,
  "zh": "机器人软件与学习路线",
  "en": "Robot software and learning route",
  "span": {
   "zh": "约 45 分钟",
   "en": "about 45 minutes"
  },
  "lead": {
   "zh": "先分清策略、示范与仿真，再看中间件、规划与迁移。目标是看懂机器人演示背后的软件与学习分层，不把遥操作或仿真成功当成实机自主能力。",
   "en": "First separate policy, demonstration and simulation, then look at middleware, planning and transfer. The goal is to understand the software and learning layers behind robot demos, without treating teleoperation or simulation success as real autonomous capability."
  },
  "steps": [
   "具身智能",
   "机器人策略",
   "模仿学习",
   "遥操作",
   "物理仿真",
   "运动规划",
   "机器人中间件",
   "仿真到实机迁移",
   "视觉语言动作模型"
  ],
  "checkpoint": {
   "zh": [
    "说清策略、模仿学习、强化学习三者关系，并指出遥操作数据通常进入哪条训练路线。",
    "解释为什么仿真里跑通不等于实机跑通，至少说出一种缩小现实差距的方法。",
    "看一段机器人演示时，能列出要追问的三件事：人控还是自主、仿真还是实机、训练数据覆盖什么。",
    "模仿学习的数据为什么需要覆盖失败与恢复？",
    "遥操作数据进入训练前，要记录哪些条件？",
    "物理仿真里最容易被忽略的三个差距？",
    "运动规划与策略的区别是什么？",
    "机器人中间件主要解决什么？",
    "VLA 模型的「视觉—语言—动作」各指什么？",
    "看一个「成功率 90%」的机器人结果，先问哪三件事？"
   ],
   "en": [
    "Explain how policy, imitation learning and reinforcement learning relate, and where teleoperation data usually enters training.",
    "Explain why passing in simulation does not mean passing on hardware, and name at least one way to narrow the reality gap.",
    "When watching a robot demo, list three questions: human-controlled or autonomous, simulation or hardware, and what the training data covers.",
    "Why should imitation-learning data cover failures and recoveries?",
    "What conditions should teleoperation data record before training?",
    "What three reality gaps are most often missed in physics simulation?",
    "What is the difference between motion planning and a policy?",
    "What does robot middleware mainly solve?",
    "In a VLA model, what do vision, language and action each refer to?",
    "On seeing a “90% success rate” robot result, what three things do you ask first?"
   ]
  },
  "stepUrls": [
   "/term/%E5%85%B7%E8%BA%AB%E6%99%BA%E8%83%BD/",
   "/term/%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%AD%96%E7%95%A5/",
   "/term/%E6%A8%A1%E4%BB%BF%E5%AD%A6%E4%B9%A0/",
   "/term/%E9%81%A5%E6%93%8D%E4%BD%9C/",
   "/term/%E7%89%A9%E7%90%86%E4%BB%BF%E7%9C%9F/",
   "/term/%E8%BF%90%E5%8A%A8%E8%A7%84%E5%88%92/",
   "/term/%E6%9C%BA%E5%99%A8%E4%BA%BA%E4%B8%AD%E9%97%B4%E4%BB%B6/",
   "/term/%E4%BB%BF%E7%9C%9F%E5%88%B0%E5%AE%9E%E6%9C%BA%E8%BF%81%E7%A7%BB/",
   "/term/%E8%A7%86%E8%A7%89%E8%AF%AD%E8%A8%80%E5%8A%A8%E4%BD%9C%E6%A8%A1%E5%9E%8B/"
  ]
 },
 {
  "id": "for-office",
  "ord": 14,
  "zh": "办公与写作路线",
  "en": "The Office Route",
  "span": {
   "zh": "约 45 分钟",
   "en": "about 45 minutes"
  },
  "lead": {
   "zh": "从「把 AI 当搜索框」走到「把 AI 接进文档、表格、会议与邮件」。先认清能力边界，再按场景练一遍完整流程。",
   "en": "Move from using AI as a search box to wiring it into documents, spreadsheets, meetings and email. Learn the limits first, then rehearse one complete workflow per scenario."
  },
  "steps": [
   "AI Agent 与聊天机器人的区别",
   "提示词",
   "结构化输出",
   "上下文窗口",
   "幻觉",
   "人工复核队列",
   "护栏",
   "许可证",
   "数据驻留",
   "怎么用 AI 做会议纪要",
   "怎么用 AI 做 PPT",
   "怎么用 AI 分析表格",
   "怎么用 AI 写邮件与排日程"
  ],
  "checkpoint": {
   "zh": [
    "拿到一份会议转写，能标出哪些句子必须回原文核对、哪些可以直接进纪要",
    "说清一次 PPT/表格任务里，AI 负责哪几步、人负责哪几步",
    "判断一条办公数据能否贴进云端模型，依据是数据驻留与授权而不是「大家都这么用」",
    "会议纪要里，哪些内容必须标「待确认」？",
    "用 AI 做 PPT，先给大纲还是先给模板？",
    "表格分析中，AI 最常把什么算错？",
    "邮件让 AI 代写，发送前必须检查哪三项？",
    "合同审阅为什么不能只要「风险清单」？",
    "翻译本地化，什么该译、什么不该译？",
    "把客户数据交给 AI 清洗，最小脱敏规则是什么？"
   ],
   "en": [
    "Given a meeting transcript, mark which sentences must be checked against the transcript and which can go straight into minutes",
    "Explain which steps AI owns and which a human owns in a deck or spreadsheet task",
    "Decide whether office data can go into a cloud model based on residency and licensing, not on “everyone does it”",
    "What must be marked “to confirm” in meeting minutes?",
    "For AI-assisted slides, start with the outline or the template?",
    "What does AI most often get wrong in table analysis?",
    "Before sending an AI-drafted email, what three checks are mandatory?",
    "Why is a “risk list” not enough for contract review?",
    "In localisation, what should and should not be translated?",
    "What is the minimum de-identification rule before giving customer data to AI for cleaning?"
   ]
  },
  "nextTask": {
   "href": "https://tools.specul.com/office/",
   "zh": "挑一个办公工具，按「输入—步骤—验收」跑一遍真实任务",
   "en": "Pick one office tool and run a real task through input, steps and acceptance"
  },
  "stepUrls": [
   "/term/AI%20Agent%20%E4%B8%8E%E8%81%8A%E5%A4%A9%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%9A%84%E5%8C%BA%E5%88%AB/",
   "/term/%E6%8F%90%E7%A4%BA%E8%AF%8D/",
   "/term/%E7%BB%93%E6%9E%84%E5%8C%96%E8%BE%93%E5%87%BA/",
   "/term/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3/",
   "/term/%E5%B9%BB%E8%A7%89/",
   "/term/%E4%BA%BA%E5%B7%A5%E5%A4%8D%E6%A0%B8%E9%98%9F%E5%88%97/",
   "/term/%E6%8A%A4%E6%A0%8F/",
   "/term/%E8%AE%B8%E5%8F%AF%E8%AF%81/",
   "/term/%E6%95%B0%E6%8D%AE%E9%A9%BB%E7%95%99/",
   "/guide/%E6%80%8E%E4%B9%88%E7%94%A8%20AI%20%E5%81%9A%E4%BC%9A%E8%AE%AE%E7%BA%AA%E8%A6%81/",
   "/guide/%E6%80%8E%E4%B9%88%E7%94%A8%20AI%20%E5%81%9A%20PPT/",
   "/guide/%E6%80%8E%E4%B9%88%E7%94%A8%20AI%20%E5%88%86%E6%9E%90%E8%A1%A8%E6%A0%BC/",
   "/guide/%E6%80%8E%E4%B9%88%E7%94%A8%20AI%20%E5%86%99%E9%82%AE%E4%BB%B6%E4%B8%8E%E6%8E%92%E6%97%A5%E7%A8%8B/"
  ]
 },
 {
  "id": "for-data",
  "ord": 15,
  "zh": "数据与 RAG 路线",
  "en": "The Data & RAG Route",
  "span": {
   "zh": "约 50 分钟",
   "en": "about 50 minutes"
  },
  "lead": {
   "zh": "数据从哪来、能不能用、怎么切、怎么测。读完能搭一条最小可评测的 RAG 语料，而不是把文档一股脑丢进向量库。",
   "en": "Where data comes from, whether it is usable, how to chunk it and how to test it. Finish with a minimum evaluable RAG corpus, not a pile of PDFs in a vector store."
  },
  "steps": [
   "数据授权",
   "训练数据溯源",
   "训练集与测试集",
   "数据污染",
   "分块",
   "混合检索",
   "检索质量度量",
   "怎么用 AI 清洗数据",
   "怎么给数据集写数据卡",
   "怎么用 AI 搭 RAG 语料"
  ],
  "checkpoint": {
   "zh": [
    "拿到一份数据集，能列出至少三项必须核对的授权信息",
    "说清「按固定字数切」和「按语义结构切」各自会在什么问题上失效",
    "用 10 个真实问题跑一次检索，记录命中率、引用准确率和拒答率",
    "数据卡里为什么必须写「不适用场景」？",
    "RAG 语料去重与保留版本，哪个优先？",
    "清洗规则写在代码里还是数据卡里？",
    "标注一致性低，先改指南还是先换标注员？",
    "训练集/验证集切分，最常见的泄漏是什么？",
    "合成数据能解决什么，不能解决什么？",
    "一个数据集要交付，最少附带哪四份东西？"
   ],
   "en": [
    "Given a dataset, list at least three licence facts that must be checked",
    "Explain when fixed-length chunking and semantic chunking each fail",
    "Run 10 real questions through retrieval and record hit rate, citation accuracy and refusal rate",
    "Why must a data card state “not suitable for” scenarios?",
    "In RAG corpora, deduplication or version retention first?",
    "Should cleaning rules live in code or in the data card?",
    "When inter-annotator agreement is low, revise the guideline or replace annotators first?",
    "What is the most common leakage when splitting train and validation sets?",
    "What can synthetic data solve, and what can it not?",
    "What four items should a dataset delivery include at minimum?"
   ]
  },
  "nextTask": {
   "href": "https://models.specul.com/data/",
   "zh": "挑一个数据集，按数据卡模板补全来源、授权与偏差三节",
   "en": "Pick a dataset and fill source, licence and bias sections using the dataset-card template"
  },
  "stepUrls": [
   "/term/%E6%95%B0%E6%8D%AE%E6%8E%88%E6%9D%83/",
   "/term/%E8%AE%AD%E7%BB%83%E6%95%B0%E6%8D%AE%E6%BA%AF%E6%BA%90/",
   "/term/%E8%AE%AD%E7%BB%83%E9%9B%86%E4%B8%8E%E6%B5%8B%E8%AF%95%E9%9B%86/",
   "/term/%E6%95%B0%E6%8D%AE%E6%B1%A1%E6%9F%93/",
   "/term/%E5%88%86%E5%9D%97/",
   "/term/%E6%B7%B7%E5%90%88%E6%A3%80%E7%B4%A2/",
   "/term/%E6%A3%80%E7%B4%A2%E8%B4%A8%E9%87%8F%E5%BA%A6%E9%87%8F/",
   "/guide/%E6%80%8E%E4%B9%88%E7%94%A8%20AI%20%E6%B8%85%E6%B4%97%E6%95%B0%E6%8D%AE/",
   "/guide/%E6%80%8E%E4%B9%88%E7%BB%99%E6%95%B0%E6%8D%AE%E9%9B%86%E5%86%99%E6%95%B0%E6%8D%AE%E5%8D%A1/",
   "/guide/%E6%80%8E%E4%B9%88%E7%94%A8%20AI%20%E6%90%AD%20RAG%20%E8%AF%AD%E6%96%99/"
  ]
 },
 {
  "id": "for-teachers",
  "ord": 16,
  "zh": "教师与课堂路线",
  "en": "The Teacher Route",
  "span": {
   "zh": "约 40 分钟",
   "en": "about 40 minutes"
  },
  "lead": {
   "zh": "从「AI 能不能进课堂」到「怎么用它备课、出题、批改和互动」。每一步都留一个教师复核点，避免把模型输出直接交给学生。",
   "en": "From “can AI enter the classroom” to lesson prep, question generation, grading and interaction. Every step keeps a teacher checkpoint so model output never goes straight to students."
  },
  "steps": [
   "生成式 AI",
   "幻觉",
   "提示词",
   "结构化输出",
   "护栏",
   "模型评测的局限",
   "人工复核队列",
   "怎么用 AI 备课",
   "怎么用 AI 出题与批改",
   "怎么设计课堂 AI 互动"
  ],
  "checkpoint": {
   "zh": [
    "说清 AI 生成的内容在课堂上哪些可以直接用、哪些必须教师先核",
    "用一条学习目标写出「导入—讲解—练习—总结」四段活动，并标出 AI 参与点",
    "给学生一条 AI 可能出错的题目，让他们找出错误并说明理由",
    "课堂 AI 互动，为什么要先设「不许问」的边界？",
    "用 AI 出题，如何避免题目只考记忆？",
    "学生用 AI 写作业，评价应改成看什么？",
    "备课资料含学生数据，最小化处理是什么？",
    "AI 批改的分数，什么时候必须人工复核？",
    "把 AI 内容带进课堂，标识与版权怎么讲？",
    "一节课的 AI 使用，怎么写进学习目标？"
   ],
   "en": [
    "Explain which AI-generated classroom content can be used directly and which a teacher must verify first",
    "Turn one learning objective into hook, explanation, practice and summary, marking where AI participates",
    "Give students an AI-generated question that may be wrong and have them find and explain the error",
    "Why set “do not ask” boundaries before AI interaction in class?",
    "How do you avoid AI-generated questions that only test recall?",
    "If students use AI for homework, what should assessment look like?",
    "Lesson material contains student data; what is the minimum handling?",
    "When must an AI-graded score be reviewed by a human?",
    "How do you teach labelling and copyright when bringing AI content into class?",
    "How do you write AI use into a lesson’s learning objectives?"
   ]
  },
  "nextTask": {
   "href": "https://learn.specul.com/guide/%E6%80%8E%E4%B9%88%E7%94%A8%20AI%20%E5%A4%87%E8%AF%BE/",
   "zh": "把一条课堂活动改写成「教师—AI—学生」三角色脚本",
   "en": "Rewrite one classroom activity as a teacher–AI–student script"
  },
  "stepUrls": [
   "/term/%E7%94%9F%E6%88%90%E5%BC%8F%20AI/",
   "/term/%E5%B9%BB%E8%A7%89/",
   "/term/%E6%8F%90%E7%A4%BA%E8%AF%8D/",
   "/term/%E7%BB%93%E6%9E%84%E5%8C%96%E8%BE%93%E5%87%BA/",
   "/term/%E6%8A%A4%E6%A0%8F/",
   "/term/%E6%A8%A1%E5%9E%8B%E8%AF%84%E6%B5%8B%E7%9A%84%E5%B1%80%E9%99%90/",
   "/term/%E4%BA%BA%E5%B7%A5%E5%A4%8D%E6%A0%B8%E9%98%9F%E5%88%97/",
   "/guide/%E6%80%8E%E4%B9%88%E7%94%A8%20AI%20%E5%A4%87%E8%AF%BE/",
   "/guide/%E6%80%8E%E4%B9%88%E7%94%A8%20AI%20%E5%87%BA%E9%A2%98%E4%B8%8E%E6%89%B9%E6%94%B9/",
   "/guide/%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E8%AF%BE%E5%A0%82%20AI%20%E4%BA%92%E5%8A%A8/"
  ]
 }
];
