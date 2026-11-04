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
   "zh": "先读十个常用概念，再做三道自测。目标是分清模型、产品与能力边界，不需要记住全部名词。",
   "en": "Read ten common concepts, then try three questions. Aim to distinguish models, products and limits without memorizing the whole glossary."
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
    "说出大模型至少一件明确做不到的事"
   ],
   "en": [
    "Explain to a newcomer how a large model learned, and why billing counts tokens",
    "Tell apart an AI product from an AI model, with one example each",
    "Name at least one thing a large model plainly cannot do"
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
    "解释模型为什么会一本正经地编，以及上下文为什么越大越贵"
   ],
   "en": [
    "Walk through how a Transformer handles a sentence: split, embed, attend, generate one token at a time",
    "Explain the three training stages of a chat model and what each stage solves",
    "Say why a model fabricates confidently, and why bigger context costs more"
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
    "看懂一份基准榜单，并说出它至少一处代表不了你的实际效果"
   ],
   "en": [
    "Given a new model's page, list the questions to ask: capability, limits, cost, licence, lock-in",
    "Decide API or local for a given job, and state the reasoning",
    "Read a benchmark table and name at least one thing it cannot say about your actual use"
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
    "拿到一段 AI 文字，说清哪些部分必须人工复核、复核什么"
   ],
   "en": [
    "Name two causes of hallucination, each with an example from a writing scenario",
    "Replace trusting AI-provided citations on faith with retrieval plus your own verification",
    "Given a passage of AI text, say which parts require human review and what to check"
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
    "指出接入工具调用时最先要设的两道防线"
   ],
   "en": [
    "Break down an API call's cost into its token segments",
    "Explain what chunking and embedding each determine in a retrieval pipeline",
    "Name the first two defenses to put in place when adding tool calling"
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
    "看一份供应商评测报告，判断哪些分数可以直接采信、哪些要打问号"
   ],
   "en": [
    "Compare API usage against self-hosting on three cost dimensions",
    "Name three things to verify before switching model vendors",
    "Read a vendor's evaluation report and say which scores stand up and which need a question mark"
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
    "对路线里的论文卡，各说出研究问题与核心证据位置，并说出至少一条「论文没有主张」的流行说法"
   ],
   "en": [
    "Split a tech report's training section into pretraining and post-training, naming the key variables of each",
    "On seeing a \"new SOTA\" claim, first check the benchmark's release date against the model's training cutoff",
    "When reading a model card, point out the license, the eval setup, and the stated limitations",
    "For each paper card on this route, state its research question and where the core evidence sits, and name at least one popular claim the paper never makes"
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
    "供应商宣布模型退役时，能走一遍迁移评估的四个检查项"
   ],
   "en": [
    "Say what drives time-to-first-token and throughput respectively, with one optimization for each",
    "List three things a live service must monitor, and what to check first for each",
    "When a vendor announces retirement, walk through the four migration-assessment checks"
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
    "知道哪些内容不要输入公共聊天工具，以及怎么用临时聊天或关闭训练开关"
   ],
   "en": [
    "Explain why an AI answer can be wrong and know at least two ways to check it",
    "Given AI-generated text or images, identify which claims need human verification",
    "Know what not to paste into a public chat tool, and how to use temporary chat or turn off training"
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
    "知道发布 AI 生成内容时的标识义务，以及哪些素材不能直接商用"
   ],
   "en": [
    "Name one main failure mode for text-to-image, video generation and speech synthesis each",
    "Given a generation tool, check commercial licensing and training-data provenance before judging output",
    "Know the labelling duties for publishing AI-generated content and which assets cannot be used commercially"
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
 }
];
