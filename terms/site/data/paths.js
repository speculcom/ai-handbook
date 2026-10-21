/* AI 名词地图 · 学习路径（S23）
 * **这是产物，不要手改。** 源在 paths/*.json。
 * 每条：id / ord / zh / en / span / lead / steps（有序 slug）/ checkpoint。
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
   "zh": "只走第一站的 10 个词，按顺序读。读完能跟人聊明白 AI 在做什么，不被黑话吓住。",
   "en": "Ten terms from station one, in order. Finish able to explain what AI is doing, without being intimidated by jargon."
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
  }
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
   "zh": "第一站挑 4 个地基词，第四站读 8 个原理词。读完说得清大模型为什么这样表现，不再死记硬背。",
   "en": "Four foundation terms from station one, eight from station four. Finish able to say why large models behave the way they do."
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
  }
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
   "zh": "六站各挑代表词，共 25 个，按站的顺序走。读完面对一个新模型或新工具，有自己的判断框架。",
   "en": "Representative terms from all six stations, 25 in station order. Finish with your own framework for judging a new model or tool."
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
  }
 }
];
