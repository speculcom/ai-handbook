/* AI 名词地图 · 微型指南（S24）
 * **这是产物，不要手改。** 源在 guides/*.md 的 frontmatter。
 * 每篇：id（slug=文件名）/ zh / en / kind / station / ord / span / lead / points / myth / fact。
 */
var GUIDES = [
 {
  "id": "AI 真的读懂了你的话吗",
  "zh": "AI 真的读懂了你的话吗",
  "en": "Does AI Really Understand You",
  "kind": "myth",
  "station": 1,
  "ord": 1,
  "span": 4,
  "lead": {
   "zh": "回答贴切不等于理解——它在做的是另一件事。",
   "en": "A fitting answer is not understanding — it is doing something else."
  },
  "points": null,
  "pointsEn": null,
  "myth": "它答得贴切、接得上话，说明它读懂了你的意思。",
  "mythEn": "It answers aptly and keeps up with the conversation, so it must have understood what you meant.",
  "fact": "它在按概率预测下一个词。贴切说明训练里见过相似的模式，不说明它理解你的处境。",
  "factEn": "It predicts the next word by probability. An apt answer shows it saw similar patterns in training, not that it grasps your situation."
 },
 {
  "id": "参数越多就越聪明",
  "zh": "参数越多就越聪明",
  "en": "More Parameters Always Means Smarter",
  "kind": "myth",
  "station": 1,
  "ord": 2,
  "span": 5,
  "lead": {
   "zh": "参数量只是其中一个变量，不是聪明程度的刻度。",
   "en": "Parameter count is one variable, not a dial for intelligence."
  },
  "points": null,
  "pointsEn": null,
  "myth": "参数量决定模型有多聪明，越大就一定越强。",
  "mythEn": "Parameter count decides how smart a model is — bigger is always stronger.",
  "fact": "训练数据的质量与数量同样决定表现；小模型在合适的任务上能追平大模型。",
  "factEn": "The quality and amount of training data decide performance just as much; small models match larger ones on suitable tasks."
 },
 {
  "id": "通用人工智能快到了",
  "zh": "通用人工智能快到了",
  "en": "AGI Is Just Around the Corner",
  "kind": "myth",
  "station": 1,
  "ord": 3,
  "span": 5,
  "lead": {
   "zh": "「临近」是说法，不是可核对的里程碑。",
   "en": "\"Soon\" is a claim, not a verifiable milestone."
  },
  "points": null,
  "pointsEn": null,
  "myth": "各家都在说 AGI 临近，说明它有一个可核对的到达时间。",
  "mythEn": "Everyone says AGI is near, so there must be a checkable date when it arrives.",
  "fact": "AGI 没有统一定义，各家口径不同；没有定义，也就没有「到达」这回事。",
  "factEn": "There is no agreed definition of AGI; the houses mean different things. Without a definition, \"arrived\" has no test."
 },
 {
  "id": "怎么向 AI 提问",
  "zh": "怎么向 AI 提问",
  "en": "How to Ask AI",
  "kind": "guide",
  "station": 2,
  "ord": 1,
  "span": 6,
  "lead": {
   "zh": "同样问 AI，问法不同，答案的可用性差很多。这份指南讲提问前要交代的五件事。",
   "en": "The same question asked differently produces very different answers. This guide covers the five things to state before you ask."
  },
  "points": [
   "先说清目标和完成标准：不是「写篇文章」，而是「写篇 300 字的零基础介绍」。",
   "给上下文：你是谁、读者是谁、有哪些限制，比如字数、格式、语气。",
   "把要处理的原文贴进对话，不要让 AI 猜你指的是哪一段。",
   "先要提纲再要正文：让它先列结构，你确认后再展开。",
   "不满意就指出具体哪里不对，比笼统的「重新回答」更有效。"
  ],
  "pointsEn": [
   "State the goal and the done-criteria: not \"write an article\" but \"write a 300-word intro for absolute beginners\".",
   "Give context: who you are, who the audience is, and what constraints apply — length, format, tone.",
   "Paste the source text into the conversation; don't make the AI guess which passage you mean.",
   "Ask for an outline first: have it list the structure, you approve it, then expand.",
   "When unhappy, point out exactly what is wrong — more effective than a vague \"try again\"."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么保护自己的数据",
  "zh": "怎么保护自己的数据",
  "en": "How to Protect Your Data",
  "kind": "guide",
  "station": 2,
  "ord": 2,
  "span": 6,
  "lead": {
   "zh": "把资料交给 AI 之前，先想清楚它会去哪里、会留下什么。这份指南讲六个动作。",
   "en": "Before handing material to an AI, be clear about where it goes and what it leaves behind. Six moves."
  },
  "points": [
   "先分清资料能不能出门：个人身份、公司机密、客户数据各算一类。",
   "看不懂的条款别默认同意，重点看数据会不会用于训练。",
   "能匿名化就先匿名化：去掉姓名、编号、联系方式再贴进去。",
   "敏感场景优先选本地或私有部署，数据不出自己的网。",
   "用完检查留存：对话记录和上传文件能不能删、多久删。",
   "给团队定规矩：哪些资料能进 AI，哪些必须走内部工具。"
  ],
  "pointsEn": [
   "Sort material by whether it may leave: personal identity, company secrets, and customer data are three different categories.",
   "Do not accept terms you cannot read; check specifically whether your data is used for training.",
   "Anonymize first: strip names, IDs, and contact details before pasting anything in.",
   "For sensitive work, prefer local or private deployment so data never leaves your own network.",
   "Afterwards, check retention: can the chat history and uploaded files be deleted, and how soon?",
   "Set team rules: which materials may go into an AI, and which must stay in internal tools."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么判断 AI 新闻是不是炒作",
  "zh": "怎么判断 AI 新闻是不是炒作",
  "en": "How to Tell if AI News Is Hype",
  "kind": "guide",
  "station": 2,
  "ord": 3,
  "span": 6,
  "lead": {
   "zh": "AI 新闻十有八九比事实更乐观。这份指南给你一套核对顺序，看完一条消息再决定信不信。",
   "en": "AI news is usually more optimistic than the facts. This guide gives you a checking order: read it before deciding what to believe."
  },
  "points": [
   "先找原始出处：论文、官方公告还是演示视频。转述链越长，失真越多。",
   "分清「演示」与「平均」：挑出来的成功案例不代表日常表现，问一句成功率是多少。",
   "看数字先问口径：同一基准、同一设置才能比。换了基准的涨分不是进步。",
   "看发布方动机：融资期的公司和评测机构，措辞的可靠性不一样。",
   "查有没有独立复现。只有发布者自己测过的结果，先按未证实处理。",
   "时间表打折：「明年实现」「几年后取代」是预测，不是事实。"
  ],
  "pointsEn": [
   "Find the original source first: a paper, an official announcement, or just a demo video. The longer the retelling chain, the more distortion accumulates.",
   "Separate \"demo\" from \"average\": cherry-picked success cases are not everyday performance. Ask what the success rate is.",
   "Ask about the measuring stick before reading numbers: only same-benchmark, same-setting comparisons count. A score jump after switching benchmarks is not progress.",
   "Check the publisher's motive: a company mid-fundraise and an independent evaluator do not word things with the same reliability.",
   "Look for independent replication. Results only the publisher measured itself should be treated as unconfirmed.",
   "Discount timelines: \"next year\" and \"will replace X in a few years\" are predictions, not facts."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么排查 AI 的数据泄露路径",
  "zh": "怎么排查 AI 的数据泄露路径",
  "en": "How to Trace AI Data Leak Paths",
  "kind": "guide",
  "station": 2,
  "ord": 4,
  "span": 8,
  "lead": {
   "zh": "数据离开你，通常不止一条路。这份指南把常见泄露路径逐条列出来，一条条查自己踩了哪几条。",
   "en": "Data usually leaves you through more than one path. This guide lists the common leak paths one by one so you can check which ones you are on."
  },
  "points": [
   "输入路径：粘贴进云端对话框的内容，已经离开你的设备。",
   "训练路径：不少服务默认用对话改进模型，要去找关闭开关。",
   "工具路径：接上的 server 能把内容带到它自己的服务端。",
   "日志路径：会话历史、上传文件在对方服务器留存多久。",
   "记忆路径：模型可能把训练里见过的内容复述出来。",
   "恢复路径：删除入口和生效时间要提前确认，别指望立刻干净。"
  ],
  "pointsEn": [
   "Input path: anything pasted into a cloud chat box has already left your device.",
   "Training path: many services default to improving models with your conversations; find the opt-out switch.",
   "Tool path: a connected server can carry content to its own backend.",
   "Log path: how long chat history and uploaded files persist on the other side's servers.",
   "Memory path: a model may repeat content it saw during training.",
   "Recovery path: confirm the deletion entry point and effective time in advance; do not expect instant cleanliness."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么给文档做分块",
  "zh": "怎么给文档做分块",
  "en": "How to Chunk Documents for Retrieval",
  "kind": "guide",
  "station": 2,
  "ord": 5,
  "span": 7,
  "lead": {
   "zh": "检索增强第一步是把文档切成块。块切得好不好，直接决定后面找不找得到答案。",
   "en": "The first step of retrieval-augmented generation is cutting documents into chunks. How well you cut decides whether answers can be found at all."
  },
  "points": [
   "按语义切，不按字数切：一个完整论点别被拦腰切断。",
   "块太小：上下文丢失，检索命中也答不全。",
   "块太大：一个块混多个主题，相似度被稀释。",
   "常见起点是几百到一千字，再用效果调，不迷信固定值。",
   "块之间留重叠：相邻块共享几句话，防止边界处信息断裂。",
   "保留结构信息：标题、章节、页码存进元数据，检索时能过滤。"
  ],
  "pointsEn": [
   "Cut by meaning, not by character count: never slice a complete argument in half.",
   "Chunks too small: context is lost, and even a hit cannot support a full answer.",
   "Chunks too large: one chunk mixes several topics, and the similarity signal gets diluted.",
   "A few hundred to a thousand characters is a common starting point; tune by results, do not trust a fixed value.",
   "Overlap adjacent chunks: sharing a few sentences prevents information from breaking at the boundary.",
   "Keep structural information: store titles, sections, and page numbers as metadata so retrieval can filter on them."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么给检索结果重排",
  "zh": "怎么给检索结果重排",
  "en": "How to Rerank Retrieval Results",
  "kind": "guide",
  "station": 2,
  "ord": 6,
  "span": 7,
  "lead": {
   "zh": "向量检索先粗筛，重排再精筛。两阶段配合，比只靠一步检索的召回质量高。",
   "en": "Vector retrieval does the coarse pass; reranking does the fine pass. The two-stage combo beats single-stage retrieval on recall quality."
  },
  "points": [
   "粗筛多取：向量检索先取回几十条候选，别只取前三。",
   "精筛换模型：重排模型逐条比对查询与候选，比向量距离更细。",
   "重排有成本：候选越多越慢越贵，按延迟预算定候选数。",
   "看重排模型的语种支持：不是所有重排模型都支持中文。",
   "调 top-k：最终喂给模型的条数宁少勿滥，无关块会带偏回答。",
   "评测两阶段分别量：粗筛召回率和精筛排序分开看，才知道哪阶段拖后腿。"
  ],
  "pointsEn": [
   "Coarse pass retrieves wide: pull dozens of candidates, not just the top three.",
   "Fine pass switches models: a reranker compares query and candidate item by item, finer than vector distance.",
   "Reranking has a cost: more candidates means slower and pricier; set the candidate count by your latency budget.",
   "Check language support of the reranker: not every reranking model handles Chinese.",
   "Tune top-k: fewer final items beats more — irrelevant chunks drag the answer off course.",
   "Measure the two stages separately: coarse recall and fine ranking are scored apart, so you know which stage drags."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么做混合检索",
  "zh": "怎么做混合检索",
  "en": "How to Do Hybrid Search",
  "kind": "guide",
  "station": 2,
  "ord": 7,
  "span": 7,
  "lead": {
   "zh": "向量检索擅长意思相近，关键词检索擅长精确匹配。混合检索把两条路的结果合起来。",
   "en": "Vector search is good at similar meaning; keyword search is good at exact matches. Hybrid search merges the results of both paths."
  },
  "points": [
   "精确词交给关键词：型号、编号、人名，向量检索容易漏，关键词不会。",
   "模糊问法交给向量：换个说法也能命中，这是关键词做不到的。",
   "两路结果要融合：常用倒数排名融合（RRF），按名次合并而不是按分数硬加。",
   "分数不可直接相加：向量相似度和 BM25 分数量纲不同，硬加会偏。",
   "看数据库是否原生支持：混合查询在 Qdrant、Weaviate 里是现成功能。",
   "混合后仍需重排：融合只是合并候选，精筛还是要重排模型。"
  ],
  "pointsEn": [
   "Give exact terms to keywords: model numbers, IDs, and names — vector search misses them, keyword search does not.",
   "Give fuzzy phrasing to vectors: a reworded question still hits, which keywords cannot do.",
   "Fuse the two result lists: reciprocal rank fusion (RRF) merges by rank, not by force-adding scores.",
   "Scores cannot be added directly: cosine similarity and BM25 scores have different scales; adding them skews results.",
   "Check native support: hybrid queries are built into Qdrant and Weaviate.",
   "Hybrid still needs reranking: fusion only merges candidates; the fine pass is still a reranker's job."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么挑 embedding 模型",
  "zh": "怎么挑 embedding 模型",
  "en": "How to Choose an Embedding Model",
  "kind": "guide",
  "station": 2,
  "ord": 8,
  "span": 8,
  "lead": {
   "zh": "embedding 模型决定「意思相近」怎么算。挑错模型，后面检索、重排、回答全跟着吃亏。",
   "en": "The embedding model decides how \"similar in meaning\" is computed. Pick it wrong and retrieval, reranking, and answering all suffer."
  },
  "points": [
   "先看语种支持：中文任务要在中文或多语基准上看分数，英文榜好看不等于中文好用。",
   "看维度与成本：维度高通常存储和计算更贵，按数据量估。",
   "用 MTEB 这类基准初筛，再用自己数据实测，榜单只是起点。",
   "查询与文档要同模型：混用不同模型算的向量，距离没有意义。",
   "注意归一化口径：有的模型输出要归一化才能用余弦相似度。",
   "换模型要重建索引：旧向量和新向量不兼容，迁移等于重算一遍。"
  ],
  "pointsEn": [
   "Check language support first: for Chinese tasks, read scores on Chinese or multilingual benchmarks; a good English leaderboard says nothing about Chinese.",
   "Weigh dimensions against cost: higher dimensions usually mean pricier storage and compute; estimate by data volume.",
   "Screen with benchmarks like MTEB, then test on your own data; the leaderboard is only a starting point.",
   "Queries and documents must use the same model: vectors from different models have no meaningful distance.",
   "Mind normalization: some models require normalized outputs before cosine similarity is valid.",
   "Switching models means rebuilding the index: old and new vectors are incompatible; migration means recomputing everything."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么评测 RAG 的效果",
  "zh": "怎么评测 RAG 的效果",
  "en": "How to Evaluate a RAG System",
  "kind": "guide",
  "station": 2,
  "ord": 9,
  "span": 8,
  "lead": {
   "zh": "RAG 出问题可能出在检索，也可能出在生成。评测要分开量，不然修错地方。",
   "en": "A RAG failure can come from retrieval or from generation. Evaluate them separately, or you will fix the wrong part."
  },
  "points": [
   "先备评测集：真实问题加标准答案，几十条就够起步。",
   "检索侧量召回：该找到的块有没有进候选，这是第一道关。",
   "生成侧量忠实度：回答里的每句话能不能被检索到的块支撑。",
   "答案相关性单独量：答得对题但依据错，也是问题。",
   "用 RAGAS 这类框架自动评，人工抽查校准它的判分。",
   "分场景看分数：不同问题类型分开统计，平均分掩盖短板。"
  ],
  "pointsEn": [
   "Build an eval set first: real questions with gold answers; a few dozen is enough to start.",
   "Retrieval side, measure recall: did the chunk that should be found make it into the candidates?",
   "Generation side, measure faithfulness: can every sentence in the answer be supported by the retrieved chunks?",
   "Measure answer relevance separately: on-topic answers with wrong grounding are still a problem.",
   "Automate with a framework like RAGAS, then spot-check by hand to calibrate its scoring.",
   "Break scores down by scenario: average scores hide the weak spots of specific question types."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "什么时候不该用 RAG",
  "zh": "什么时候不该用 RAG",
  "en": "When Not to Use RAG",
  "kind": "guide",
  "station": 2,
  "ord": 10,
  "span": 7,
  "lead": {
   "zh": "RAG 不是默认选项。它适合「知识会变、要出处」的场景，不适合另一些场景，硬上反而更差。",
   "en": "RAG is not the default. It fits \"knowledge changes, citations required\"; it hurts other scenarios, and forcing it makes things worse."
  },
  "points": [
   "知识量小且稳定：直接放进上下文更简单，检索层是多余复杂度。",
   "要求精确算术或推理：检索帮不上，问题在模型本身。",
   "文档质量差：垃圾进垃圾出，先修文档再谈检索。",
   "延迟预算紧：检索加重排加生成，链路长，实时场景要掂量。",
   "需要严格一致性：同一问题两次检索结果可能不同，合规场景要评估。",
   "先试基线：不加检索直接问，效果够好就不用搭 RAG。"
  ],
  "pointsEn": [
   "Small, stable knowledge: put it straight in the context; a retrieval layer is needless complexity.",
   "Exact arithmetic or reasoning required: retrieval does not help; the limit is the model itself.",
   "Poor document quality: garbage in, garbage out — fix the documents before talking about retrieval.",
   "Tight latency budget: retrieval plus reranking plus generation is a long chain; weigh it for real-time use.",
   "Strict consistency required: two runs of the same question may retrieve differently; assess this for compliance settings.",
   "Try the baseline first: ask without retrieval; if it is good enough, do not build RAG."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么把提示词写结构",
  "zh": "怎么把提示词写结构",
  "en": "How to Structure a Prompt",
  "kind": "guide",
  "station": 2,
  "ord": 11,
  "span": 7,
  "lead": {
   "zh": "「怎么向 AI 提问」讲问前交代什么；这篇讲把这些交代放进什么形状：角色、任务、约束、格式，四块分开写。",
   "en": "\"How to Ask AI\" covers what to state before asking; this guide covers what shape to put it in: role, task, constraints, and format, written as separate blocks."
  },
  "points": [
   "分块写，别写成一整段散文：角色与背景一块、任务一块、约束一块、输出格式一块，模型对分块指令的遵循更稳。",
   "系统提示放长期规则（语气、边界），用户消息放本次任务——两层各司其职，别把一次性要求塞进系统提示。",
   "用标题或标签划界（如「背景：」「要求：」），长输入时把待处理原文与指令明确隔开，防止模型把材料当指令。",
   "约束写成可检查的条目：「不超过 300 字」「面向零基础」「给出来源」，比「简短一点」「专业一点」可执行。",
   "输出格式单独一块并给例子：一段样例输出胜过三段描述。",
   "改提示词一次只改一处并对比效果，同时改多处就说不清是哪处起了作用。"
  ],
  "pointsEn": [
   "Write in blocks, not one wall of prose: role and background in one block, the task in another, constraints in another, output format in another — models follow blocked instructions more reliably.",
   "Put standing rules (tone, boundaries) in the system prompt and the current task in the user message — each layer does its job; don't stuff one-off requests into the system prompt.",
   "Mark sections with headings or tags (e.g. \"Background:\", \"Requirements:\"), and on long inputs clearly separate the material to process from the instructions, so the model doesn't treat data as directives.",
   "Write constraints as checkable items: \"under 300 words\", \"for absolute beginners\", \"cite sources\" — these beat \"shorter\" or \"more professional\".",
   "Give the output format its own block plus one worked example: a single sample output beats three paragraphs describing it.",
   "Change one thing at a time when editing a prompt and compare results; change five at once and you can't tell which one worked."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "few-shot示例怎么选",
  "zh": "few-shot 示例怎么选",
  "en": "How to Pick Few-Shot Examples",
  "kind": "guide",
  "station": 2,
  "ord": 12,
  "span": 6,
  "lead": {
   "zh": "在提示里放几个「输入→输出」例子能明显改变表现，但例子选得不好反而带偏。这篇讲选例子的五条标准。",
   "en": "Dropping a few input→output examples into the prompt changes performance noticeably — but bad examples steer the model the wrong way. Five criteria for picking them."
  },
  "points": [
   "例子覆盖你要的边界情况，而不是只放最简单的：模型会模仿例子的分布。",
   "格式与真实输入完全一致：示例里的字段名、标点、换行都会被照抄。",
   "数量从两三个起步，边际收益递减快；塞太多还挤占上下文、拉高成本。",
   "示例之间要有差异：三个几乎一样的例子等于一个，还让模型以为只会这一种。",
   "遇到输出跑偏，先检查是不是某个示例在带节奏——错误示例比没有示例更糟。"
  ],
  "pointsEn": [
   "Cover the edge cases you actually need, not just the easy ones: the model imitates the distribution of your examples.",
   "Keep the format identical to real inputs: field names, punctuation, and line breaks in the examples get copied verbatim.",
   "Start with two or three examples; marginal returns drop fast, and too many crowd the context and raise cost.",
   "Make examples differ from each other: three near-identical ones are worth one, and they teach the model it can only do that one thing.",
   "When outputs go off the rails, first check whether an example is steering them — a wrong example is worse than no example."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "思维链什么时候有用",
  "zh": "思维链什么时候有用",
  "en": "When Chain-of-Thought Helps",
  "kind": "guide",
  "station": 2,
  "ord": 13,
  "span": 6,
  "lead": {
   "zh": "「一步步想」对某些任务提升明显，对另一些几乎没用甚至帮倒忙。这篇讲怎么判断值不值得让模型展开推理。",
   "en": "\"Think step by step\" helps some tasks a lot and barely helps — or actively hurts — others. How to tell whether extended reasoning is worth it."
  },
  "points": [
   "先分清任务类型：算术、多步逻辑、规划类任务收益大；简单抽取、翻译、格式转换基本无收益。",
   "「一步步想」这类触发语对老一代模型才关键；推理模型已内置长思维链，再手动催只是浪费 token。",
   "要求模型先列步骤再作答，比只加一句「想一想」更有效，也更可控。",
   "思维链输出不是可靠的思考记录：它可能事后编出说得通的过程，别把它当审计日志。",
   "展开推理会成倍增加输出长度和延迟，实时场景先量代价再决定。",
   "判断有没有用只有一个办法：拿你自己的任务对比测，别信「普遍提升」的说法。"
  ],
  "pointsEn": [
   "Sort the task type first: arithmetic, multi-step logic, and planning gain a lot; simple extraction, translation, and format conversion gain almost nothing.",
   "Trigger phrases like \"think step by step\" mattered for older models; reasoning models already have long chains built in, so prompting for one just wastes tokens.",
   "Asking the model to list steps before answering works better — and is more controllable — than a bare \"think about it\".",
   "Chain-of-thought output is not a reliable record of thinking: the model may fabricate a plausible-sounding process after the fact; don't treat it as an audit log.",
   "Extended reasoning multiplies output length and latency; measure the cost before enabling it in real-time settings.",
   "There is only one way to know if it helps: run a comparison on your own task, don't trust claims of \"general improvement\"."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么让AI按格式输出",
  "zh": "怎么让 AI 按格式输出",
  "en": "How to Get AI to Output in Your Format",
  "kind": "guide",
  "station": 2,
  "ord": 14,
  "span": 6,
  "lead": {
   "zh": "程序要接 AI 的输出时，「请输出 JSON」经常不够。这篇讲从提示约束到结构化输出的三级做法。",
   "en": "When a program has to consume AI output, \"please output JSON\" often isn't enough. Three levels, from prompt-level constraints to structured outputs."
  },
  "points": [
   "第一级：提示里给格式说明加一个完整样例，多数场景够用，但字段缺失、多余解释仍会发生。",
   "第二级：用接口的结构化输出/工具调用能力，由服务端约束解码保证格式合法，比口头要求可靠得多。",
   "定义 schema 只写需要的字段并收紧类型：字段越少，出错面越小。",
   "无论哪一级，接收端都要校验：模式校验失败就重试或降级，别直接喂给下游。",
   "格式约束和任务质量会互相拉扯：强制格式可能让内容变差，两者要分开评测。",
   "别用格式技巧代替内容评测：输出合法不等于输出正确。"
  ],
  "pointsEn": [
   "Level one: a format spec plus one complete sample in the prompt. Enough for most cases, but missing fields and stray commentary still happen.",
   "Level two: use the API's structured-output / tool-calling capability — server-side constrained decoding guarantees valid format, far more reliable than asking nicely.",
   "Define schemas with only the fields you need and tighten types: fewer fields, smaller failure surface.",
   "Validate on the receiving end regardless of level: on schema-validation failure, retry or degrade — never feed downstream code unchecked.",
   "Format constraints and task quality pull against each other: forcing a format can degrade content, so evaluate the two separately.",
   "Don't let format tricks substitute for content evaluation: valid output is not correct output."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "它说得笃定，所以可信",
  "zh": "它说得笃定，所以可信",
  "en": "Confident Tone Means Correct",
  "kind": "myth",
  "station": 2,
  "ord": 1,
  "span": 4,
  "lead": {
   "zh": "流畅与正确是两件事，笃定的语气不增加可靠性。",
   "en": "Fluency and correctness are separate; a confident tone adds no reliability."
  },
  "points": null,
  "pointsEn": null,
  "myth": "语气肯定、结构完整，说明内容可靠。",
  "mythEn": "A confident tone and a tidy structure mean the content is trustworthy.",
  "fact": "幻觉综述里统计的错误，大多正是这种读起来很顺的编造。",
  "factEn": "In the hallucination surveys, most recorded errors are exactly this kind of smoothly written fabrication."
 },
 {
  "id": "温度调高会更聪明",
  "zh": "温度调高会更聪明",
  "en": "Higher Temperature Means Smarter",
  "kind": "myth",
  "station": 2,
  "ord": 2,
  "span": 4,
  "lead": {
   "zh": "温度只改变随机性，不改变它知道多少。",
   "en": "Temperature changes randomness only, not how much the model knows."
  },
  "points": null,
  "pointsEn": null,
  "myth": "温度调高，模型就更有想法、更聪明。",
  "mythEn": "Raising temperature makes the model more imaginative, therefore smarter.",
  "fact": "温度只改变取词的随机性；调高会增加偏离和出错，模型知道的东西一点没多。",
  "factEn": "Temperature only changes how randomly it picks tokens; raising it adds drift and errors while the model knows no more."
 },
 {
  "id": "它记得你之前说过的",
  "zh": "它记得你之前说过的",
  "en": "It Remembers What You Said Earlier",
  "kind": "myth",
  "station": 2,
  "ord": 3,
  "span": 4,
  "lead": {
   "zh": "它能看到的范围叫上下文窗口，超出部分不在输入里。",
   "en": "What it can see is the context window; anything outside is not in its input."
  },
  "points": null,
  "pointsEn": null,
  "myth": "一次对话里，它始终记得前面说过的所有内容。",
  "mythEn": "Within one conversation it always remembers everything said earlier.",
  "fact": "它只能看到上下文窗口内的内容；超出的部分不在它的输入里，与记不记得无关。",
  "factEn": "It only sees what fits the context window; anything beyond it is simply not in the input, which has nothing to do with remembering."
 },
 {
  "id": "怎么验证 AI 的输出",
  "zh": "怎么验证 AI 的输出",
  "en": "How to Verify AI Output",
  "kind": "guide",
  "station": 3,
  "ord": 1,
  "span": 7,
  "lead": {
   "zh": "AI 会一本正经地编造事实。这份指南讲怎么把「它说的」变成「你能核对的」。",
   "en": "AI will state fabricated facts with full confidence. This guide turns \"what it said\" into \"what you can check\"."
  },
  "points": [
   "把输出里的事实拆成一条条可核对的断言：数字、日期、人名、引用。",
   "凡是引用（论文、法条、接口名），去原始出处核对，别信它给的链接标题。",
   "关键数字要求它给出处；给不出处的数字当假设处理。",
   "让它自查会漏掉大半错误，交叉核对（换来源、换工具）才可靠。",
   "越具体的领域（本地法规、自家数据）越要人来核，通用模型没有这些事实。"
  ],
  "pointsEn": [
   "Break the output into individual checkable claims: numbers, dates, names, citations.",
   "For every citation (paper, statute, API name), verify at the original source — never trust the title it gives you.",
   "Demand sources for key numbers; treat numbers without sources as assumptions.",
   "Self-review catches only a fraction of errors; cross-checking (different source, different tool) is what works.",
   "The more specific the domain (local law, your own data), the more a human must check — general models don't have these facts."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "AI 常犯什么错",
  "zh": "AI 常犯什么错",
  "en": "What AI Gets Wrong",
  "kind": "guide",
  "station": 3,
  "ord": 2,
  "span": 6,
  "lead": {
   "zh": "AI 的错误有固定套路。认出这几类，就能提前防住大半。",
   "en": "AI mistakes follow fixed patterns. Recognizing these categories prevents most of them in advance."
  },
  "points": [
   "编造事实：它会给出看似合理的假引用、假数字、假日期。",
   "顺着你说：你暗示一个错误前提，它多半不纠正，直接往下推。",
   "算不准：精确计数、多位数算术、复杂日期换算最容易错。",
   "答得太满：它很少说「我不知道」，宁可给一个含糊的答案。",
   "被措辞带偏：同一问题换个问法，答案可能不同。"
  ],
  "pointsEn": [
   "Inventing facts: it produces plausible-looking fake citations, numbers, and dates.",
   "Agreeing with you: imply a wrong premise and it usually will not correct it, just build on it.",
   "Bad at exact math: precise counts, multi-digit arithmetic, and tricky date conversions fail most often.",
   "Over-answering: it rarely says \"I do not know\", preferring a vague answer instead.",
   "Swayed by phrasing: the same question asked differently can produce a different answer."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么防提示注入",
  "zh": "怎么防提示注入",
  "en": "How to Guard Against Prompt Injection",
  "kind": "guide",
  "station": 3,
  "ord": 3,
  "span": 7,
  "lead": {
   "zh": "提示注入是让外部内容劫持 AI 的攻击。这份指南讲怎么给 AI 工具设防线，让它不把网页里的话当命令。",
   "en": "Prompt injection is an attack where outside content hijacks an AI. This guide covers how to build defenses so your AI tool treats web pages as data, not commands."
  },
  "points": [
   "把外部内容当数据，不当指令：网页、文档、邮件里可能藏着「忽略之前的指令」。",
   "给最小权限：能读就只给读，能用一个目录就别给整个盘。",
   "不可逆操作留人工确认：删除、转账、对外发消息，先问人再执行。",
   "隔离会话：处理外部内容的会话，别和管密钥、管账户的会话混用。",
   "装工具前查它能碰什么：MCP server 的权限声明要先读。",
   "留执行日志：出问题时能回放它到底做了什么。"
  ],
  "pointsEn": [
   "Treat outside content as data, not instructions: web pages, documents, and emails can hide \"ignore your previous instructions\".",
   "Grant least privilege: if reading suffices, grant read-only; if one directory suffices, do not hand over the whole disk.",
   "Keep a human gate on irreversible actions: deletions, transfers, and outbound messages ask a person first.",
   "Isolate sessions: do not mix a session that processes outside content with one that holds keys or manages accounts.",
   "Check what a tool can touch before installing it: read the MCP server's permission declarations.",
   "Keep execution logs: when something goes wrong, you can replay what it actually did."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么给 AI 工具配权限",
  "zh": "怎么给 AI 工具配权限",
  "en": "How to Set Permissions for AI Tools",
  "kind": "guide",
  "station": 3,
  "ord": 4,
  "span": 7,
  "lead": {
   "zh": "AI 工具的危险程度，多半由你给它的权限决定。这份指南讲怎么给得刚好够用、又不过头。",
   "en": "How dangerous an AI tool is is mostly decided by the permissions you give it. This guide covers granting exactly enough and no more."
  },
  "points": [
   "先想它要干什么，再给权限：写代码给代码目录，别顺手给整个家目录。",
   "读和写分开给：能只读完成任务的，就不给写。",
   "划出禁区：密钥文件、账户配置、系统目录，明确不给。",
   "开确认模式：删除、覆盖、对外发送这类操作，让工具先问再动。",
   "定期收权：项目结束、任务换了，把之前开的权限收回来。",
   "用受限模式跑实验：不信任的用法先关在沙箱里试。"
  ],
  "pointsEn": [
   "Decide the job first, then the permissions: coding work gets the code directory, not your whole home directory.",
   "Grant read and write separately: if the task completes read-only, do not grant write.",
   "Mark off-limits zones: key files, account configs, and system directories are explicitly excluded.",
   "Turn on confirmation mode: deletions, overwrites, and outbound sends must ask before acting.",
   "Reclaim permissions regularly: when a project ends or the task changes, take back what you opened.",
   "Run experiments in restricted mode: try untrusted usage inside a sandbox first."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么安全地用 MCP 工具",
  "zh": "怎么安全地用 MCP 工具",
  "en": "How to Use MCP Tools Safely",
  "kind": "guide",
  "station": 3,
  "ord": 5,
  "span": 7,
  "lead": {
   "zh": "MCP 让 AI 能碰你的文件和网页。工具本身不危险，危险的是它被喂了什么内容、被给了什么权限。",
   "en": "MCP lets an AI touch your files and the web. The tools themselves are not the danger; what gets fed to them and what permissions they hold is."
  },
  "points": [
   "只装需要的 server：每多一个工具，就多一条能出事的通道。",
   "读权限声明：文件类 server 该限定目录，网页类该有安全警告。",
   "把抓来的内容当数据：网页正文里可能藏着给 AI 的指令。",
   "敏感目录不接：接文件 server 前，先确认密钥和账户配置不在里面。",
   "看 server 是谁维护的：官方与第三方，可信度不同。",
   "出事先断链：怀疑被注入时，先停工具再排查会话。"
  ],
  "pointsEn": [
   "Install only the servers you need: every extra tool is one more channel something can go wrong through.",
   "Read the permission declarations: file servers should scope to directories; fetch servers should carry security warnings.",
   "Treat fetched content as data: web page text can contain instructions aimed at the AI.",
   "Keep sensitive directories out: before connecting a file server, confirm keys and account configs are not inside.",
   "Check who maintains the server: official and third-party carry different trust levels.",
   "Cut the link first during an incident: if injection is suspected, stop the tool, then investigate the session."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么给 AI 内容做发布前检查",
  "zh": "怎么给 AI 内容做发布前检查",
  "en": "How to Run a Pre-Publication Check on AI Content",
  "kind": "guide",
  "station": 3,
  "ord": 6,
  "span": 7,
  "lead": {
   "zh": "AI 生成的内容发出去之前，有几类错误几乎必然出现。这份指南给一份发布前的检查清单。",
   "en": "Before publishing AI-generated content, a few classes of error appear almost inevitably. This guide is the pre-publication checklist."
  },
  "points": [
   "事实逐条回查：数字、日期、引文，AI 会编出看起来对的。",
   "引文先验存在：论文编号、书名、链接，逐个打开确认。",
   "敏感表述过一遍：涉及人、机构、法律的句子，换专业口径重写。",
   "图片查标识：按中国《标识办法》要求加显式标识，元数据隐式标识别漏。",
   "风格统一：AI 腔（排比、空总结）删掉，不然读者一眼看出是生成的。",
   "留修改记录：哪些是 AI 写的、你改了什么，出问题能追溯。"
  ],
  "pointsEn": [
   "Re-verify facts line by line: numbers, dates, and quotes — AI produces ones that look right.",
   "Verify citations exist: paper IDs, book titles, links — open each one and confirm.",
   "Run sensitive statements once more: sentences about people, organizations, or the law get rewritten in professional register.",
   "Check image labels: add explicit labels per China's Labeling Measures; do not miss the implicit label in metadata.",
   "Unify the voice: strip the AI register (parallel clauses, empty summaries) or readers will spot it instantly.",
   "Keep a change record: which parts AI wrote and what you changed — traceable when something goes wrong."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么自建评测口径",
  "zh": "怎么自建评测口径",
  "en": "How to Build Your Own Eval",
  "kind": "guide",
  "station": 3,
  "ord": 7,
  "span": 8,
  "lead": {
   "zh": "公共榜单测不出「它在我这活儿上行不行」。这篇讲怎么搭一套只属于你的评测：题目、判分、跑法。",
   "en": "Public leaderboards can't answer \"is it good at my job\". How to build an eval that is yours alone: questions, grading, and how to run it."
  },
  "points": [
   "从真实失败案例攒题：20-50 道你业务里真会遇到的输入，比抄公开题集有用。",
   "每题写清「什么算对」：有标准答案的精确比对，开放题给评分标准或让强模型按标准打分。",
   "固定题目版本和输入条件（模型、参数、提示词），否则分数变化说不清原因。",
   "分开看两类错误：格式错（能用规则判）和内容错（要人或模型判），修法完全不同。",
   "跑回归：换模型、改提示词后重跑同一套题，看哪些题从对变错——变错比变对更值得警惕。",
   "警惕题目泄漏：公开题集可能混进训练数据，自建题能规避这一点，也要定期换题。"
  ],
  "pointsEn": [
   "Collect questions from real failures: 20–50 inputs from your actual work beat copying a public benchmark.",
   "Write down what counts as correct for each question: exact matching where there's a gold answer; a rubric — or a strong model grading against one — for open-ended ones.",
   "Pin the question version and the input conditions (model, parameters, prompt), otherwise score changes have no explanation.",
   "Separate the two error kinds: format errors (rule-checkable) and content errors (need a human or a model judge) — the fixes are completely different.",
   "Run regressions: after swapping a model or editing a prompt, re-run the same set and watch which questions flip from right to wrong — flips to wrong deserve more attention than flips to right.",
   "Watch for contamination: public benchmarks may sit in training data; your own questions dodge that, but rotate them periodically too."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "榜单怎么读",
  "zh": "榜单怎么读",
  "en": "How to Read a Leaderboard",
  "kind": "guide",
  "station": 3,
  "ord": 8,
  "span": 7,
  "lead": {
   "zh": "误区篇说「榜单分数高不等于好用」；这篇讲怎么把榜单读出信息：谁做的、怎么测、哪里失真。",
   "en": "The myth page says a high leaderboard score doesn't mean it works well; this guide shows how to squeeze real information out of a leaderboard: who runs it, how it tests, and where it distorts."
  },
  "points": [
   "先查三件事：谁维护、题目从哪来、分数怎么算——三者不明的榜单只当广告看。",
   "看题目发布时间：榜单晚于模型训练截止才有区分度；疑似泄漏的公开题集分数普遍虚高。",
   "总分拆开看：同一模型在不同任务子集上排名可以完全颠倒，按你要的任务子集比。",
   "对比要同口径：不同榜单的分数不能互比，同一榜单里不同评测条件（上下文长度、工具开关）也不能混比。",
   "看分数差有没有意义：1-2 分常在评测噪声范围内，排名相邻基本等于打平。",
   "自建口径补位：公共榜单回答「普遍水平」，你自己的 20-50 道题回答「在我这活儿上行不行」。"
  ],
  "pointsEn": [
   "Check three things first: who maintains it, where the questions come from, and how scores are computed — a leaderboard missing all three is an ad.",
   "Look at when the questions were published: a benchmark only discriminates if it postdates the model's training cutoff; suspected-contaminated public sets inflate scores across the board.",
   "Break the aggregate apart: the same model can rank completely differently across task subsets — compare on the subset you care about.",
   "Compare only like with like: scores from different leaderboards are not comparable, and neither are different eval settings (context length, tools on/off) within one.",
   "Ask whether the gap is meaningful: 1–2 points is usually within eval noise; adjacent ranks are effectively a tie.",
   "Fill the gap with your own eval: public leaderboards answer \"general level\"; your own 20–50 questions answer \"is it good at my job\"."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "提示词怎么版本化",
  "zh": "提示词怎么版本化",
  "en": "How to Version Your Prompts",
  "kind": "guide",
  "station": 3,
  "ord": 9,
  "span": 6,
  "lead": {
   "zh": "线上效果说不清是哪次改动带来的，多半因为提示词散在代码里随手改。这篇讲把提示词当代码管的最小做法。",
   "en": "If you can't say which change moved your live numbers, it's usually because prompts live inside code and get edited on the fly. The minimal way to treat prompts like code."
  },
  "points": [
   "提示词从代码字符串里拆出来单独存放：改提示词不该触发重新编译或部署。",
   "每次改动进版本控制并写清动机：和代码一样可回溯、可对比、可回滚。",
   "改动配回归：跑一套固定输入对比新旧输出，没有评测就谈不上「改好了」。",
   "记录提示词与模型版本的配对：同一提示词换模型可能失效，两者要一起记。",
   "线上出问题时先查提示词变更记录：它和代码一样是常见变更源，却常不在审计范围里。",
   "A/B 对比要控制变量：同时换提示词和模型，就永远说不清是哪个起作用。"
  ],
  "pointsEn": [
   "Move prompts out of code strings into their own files: editing a prompt shouldn't require a rebuild or redeploy.",
   "Commit every change with the motivation written down: traceable, diffable, revertable — just like code.",
   "Pair changes with a regression run: fixed inputs, old vs new outputs; without an eval, \"improved\" is a feeling.",
   "Record prompt and model version as a pair: the same prompt can break on a new model; log them together.",
   "When production misbehaves, check the prompt changelog first: prompts are a common change source that rarely sits inside the audit trail.",
   "Control variables in A/B comparisons: swap prompt and model together and you'll never know which one did it."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "系统提示怎么设计",
  "zh": "系统提示怎么设计",
  "en": "How to Design a System Prompt",
  "kind": "guide",
  "station": 3,
  "ord": 10,
  "span": 7,
  "lead": {
   "zh": "系统提示是产品行为的隐形规格书。这篇讲写什么、不写什么、怎么测它有没有生效。",
   "en": "A system prompt is the invisible spec of your product's behavior. What to put in it, what to leave out, and how to test whether it actually holds."
  },
  "points": [
   "只放长期规则：身份、语气、边界、拒答口径；一次性任务放用户消息，别混进系统提示。",
   "写成可检查的条款：「引用外部信息必须给链接」比「要诚实」可执行，也便于逐条测试。",
   "边界条款要给出路：拒绝时说明原因并给替代方案，只写「不能做」会得到生硬拒答。",
   "系统提示不是安全边界：足够用心的用户总能绕开，真正的防线在权限与工具侧。",
   "逐条写测试：每条规则配一个「应触发/不应触发」的输入，改一版跑一遍。",
   "版本与配对同提示词管理：系统提示改动也要配模型版本记录和回归。"
  ],
  "pointsEn": [
   "Standing rules only: identity, tone, boundaries, refusal policy. One-off tasks go in the user message — don't mix them in.",
   "Write checkable clauses: \"cite a link when quoting external information\" beats \"be honest\" — it's enforceable and testable one by one.",
   "Give boundary clauses an exit: refuse with a reason plus an alternative; a bare \"don't do X\" yields robotic refusals.",
   "A system prompt is not a security boundary: a motivated user can always get around it; the real defenses sit in permissions and tools.",
   "Test clause by clause: each rule gets one should-trigger and one should-not-trigger input; re-run on every revision.",
   "Version it like a prompt: system-prompt edits need model-version records and regression runs too."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "数据标注与质检怎么看",
  "zh": "数据标注与质检怎么看",
  "en": "How to Read Data Annotation and QA",
  "kind": "guide",
  "station": 3,
  "ord": 11,
  "span": 8,
  "lead": {
   "zh": "「我们用了百万条标注数据」不说明质量。这篇讲怎么从标注者、一致性、质检流程三处看穿一份训练或评测数据的成色。",
   "en": "\"We used a million annotated rows\" says nothing about quality. How to size up a training or eval dataset from three angles: who labeled it, how consistent they were, and how QA ran."
  },
  "points": [
   "先看标注者是谁：众包、内部员工还是领域专家，单价差在哪，数据质量大概率就在哪。",
   "看一致性指标：同一批数据多人标注的吻合度低，说明规则本身有歧义，数据噪声不会小。",
   "质检流程比标注量重要：抽查比例、返工机制、分歧仲裁，三样缺一样，规模都是虚的。",
   "「什么算对」必须写进标注规则：规则含糊，标注员只能猜，猜出来的数据会教出摇摆的模型。",
   "模型标的数据（合成数据、AI 反馈）不免检：它自带模型偏见，至少要人工抽检加评测回归兜底。",
   "数据问题最后都在评测里显形：模型行为怪异时，先查最近一批数据的规则变更，别急着调参数。"
  ],
  "pointsEn": [
   "Start with who did the labeling: crowdworkers, in-house staff, or domain experts — unit price is usually a good proxy for data quality.",
   "Check inter-annotator agreement: low agreement on the same batch means the guidelines themselves are ambiguous, so the noise is real.",
   "QA process beats label count: sampling rate, rework loop, and disagreement arbitration — miss any of the three and the scale number is hollow.",
   "\"What counts as correct\" must be written into the annotation guidelines: vague rules make annotators guess, and guessed data trains a wobbly model.",
   "Model-labeled data (synthetic data, AI feedback) is not exempt: it carries the labeling model's biases; at minimum add human spot-checks plus eval regression.",
   "Data problems surface in evals eventually: when model behavior gets weird, audit the latest batch's guideline changes before touching hyperparameters."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么读一篇AI论文",
  "zh": "怎么读一篇AI论文",
  "en": "How to Read an AI Paper",
  "kind": "guide",
  "station": 3,
  "ord": 12,
  "span": 8,
  "lead": {
   "zh": "读不动论文，多半不是英语问题，是顺序问题。这份指南讲拿到一篇 AI 论文后按什么顺序读、每步要回答什么问题。",
   "en": "Not being able to get through a paper is usually a sequencing problem, not an English problem. This guide is the order to read an AI paper in, and the question each step should answer."
  },
  "points": [
   "先找研究问题：引言里「这篇要解决什么」那一两句。找不到，论文自己就没说清，谨慎往下读。",
   "摘要只当目录不当结论：NeurIPS 官方清单要求作者自查「摘要与引言的主张是否准确反映论文的贡献与范围」——摘要是承诺，证据在正文的表里。",
   "定位主证据：先回答「核心结论依据哪张表/哪张图」，再看那张表的设置——什么基准、什么基线、什么指标，最后才看数字。",
   "直接读局限节：NeurIPS 清单同样要求作者描述局限。作者自己写的局限就是适用范围的边界，比任何第三方解读可靠。",
   "分清「方法新」与「结果好」：有消融实验才能看出哪个组件在起作用；没有消融，提升的来源就是未知。",
   "引用数、会议录用、发布热度都不是质量依据；看到 SOTA 声明先查数据污染，再查是否同口径对比。"
  ],
  "pointsEn": [
   "Find the research question first: the one or two sentences in the intro saying what the paper sets out to solve. If you can't find it, the paper itself isn't clear — read on cautiously.",
   "Treat the abstract as a table of contents, not a conclusion: NeurIPS's official checklist makes authors self-audit whether 'the main claims in the abstract and introduction accurately reflect the paper's contributions and scope' — an abstract is a promise; the evidence lives in the tables.",
   "Locate the main evidence: first answer 'which table/figure does the headline claim rest on', then check that table's setup — which benchmark, which baseline, which metric — and only then look at the numbers.",
   "Read the limitations section directly: the NeurIPS checklist also asks authors to describe limitations. What authors admit themselves is the boundary of applicability — more reliable than any third-party take.",
   "Separate 'new method' from 'good results': ablations are what show which component actually matters; without ablations, the source of the gain is unknown.",
   "Citation counts, conference acceptance, and launch buzz are not evidence of quality; on seeing a SOTA claim, check benchmark contamination first, then whether the comparison is apples-to-apples."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "榜单分数高就是好用",
  "zh": "榜单分数高就是好用",
  "en": "A High Benchmark Score Means It Works For You",
  "kind": "myth",
  "station": 3,
  "ord": 1,
  "span": 5,
  "lead": {
   "zh": "基准只覆盖它测的那几项，与你的场景是两件事。",
   "en": "A benchmark covers only what it measures — your task is a different question."
  },
  "points": null,
  "pointsEn": null,
  "myth": "评测分数高的模型，在你的任务上也一定好。",
  "mythEn": "A model that scores high on the leaderboards must also be good at your task.",
  "fact": "HELM 的结论正是单一榜单不完备；分数高只说明它在被测项上强。",
  "factEn": "HELM concludes precisely that a single leaderboard is incomplete; a high score only means strength on the items tested."
 },
 {
  "id": "上下文窗口越大越好",
  "zh": "上下文窗口越大越好",
  "en": "Bigger Context Is Always Better",
  "kind": "myth",
  "station": 3,
  "ord": 2,
  "span": 5,
  "lead": {
   "zh": "窗口大小有代价，够用比拉满更划算。",
   "en": "Window size has a price; enough beats maximum."
  },
  "points": null,
  "pointsEn": null,
  "myth": "上下文窗口越大，长文档就处理得越好。",
  "mythEn": "The larger the context window, the better long documents get handled.",
  "fact": "窗口变大会推高显存与延迟。长输入里，中段内容的利用也不均匀。按需要选比选最大更划算。",
  "factEn": "A larger window raises VRAM and latency. In a long input, the middle is used unevenly. Choosing by need beats choosing the maximum."
 },
 {
  "id": "它拒绝，是因为做不到",
  "zh": "它拒绝，是因为做不到",
  "en": "Refusal Means Inability",
  "kind": "myth",
  "station": 3,
  "ord": 3,
  "span": 4,
  "lead": {
   "zh": "拒答多半是训练出来的选择，不是能力上限。",
   "en": "Most refusals are a trained choice, not a capability ceiling."
  },
  "points": null,
  "pointsEn": null,
  "myth": "它说「我不能做这个」，说明它没有这个能力。",
  "mythEn": "When it says \"I cannot do that\", it lacks the capability.",
  "fact": "多数拒答来自对齐训练的选择；有没有能力与愿不愿意输出是两回事。",
  "factEn": "Most refusals come from alignment training; having the capability and being willing to output it are different things."
 },
 {
  "id": "论文卡-HELM",
  "zh": "论文卡-HELM",
  "en": "Paper Card - HELM",
  "kind": "paper",
  "station": 3,
  "ord": 1,
  "span": 8,
  "lead": {
   "zh": "「别只看一个总分」的评测框架论文。这张卡列清它要解决什么、框架怎么搭、以及它自己声明的取舍。",
   "en": "The evaluation-framework paper behind 'don't trust a single score'. This card lays out the question, how the framework is built, and the trade-offs the authors declare."
  },
  "points": [
   "研究问题：摘要原话——语言模型的能力、局限与风险「未被充分理解」（\"their capabilities, limitations, and risks are not well understood\"）；HELM 的目标是提高透明度，不是宣布某个模型最强。",
   "框架：先对场景（用例）与指标（期望）做分类，再按覆盖度与可行性选取子集，并明说什么是缺失的（摘要点名：被忽视英语变体的问答、可信度指标）——「承认覆盖面有缺口」本身就是方法的一部分。",
   "核心做法原话：对 16 个核心场景尽可能测 7 个指标（accuracy/calibration/robustness/fairness/bias/toxicity/efficiency），\"ensuring metrics beyond accuracy don't fall to the wayside\"——保证准确率之外的指标不被丢下。",
   "作者自陈的取舍：选的是「广」不是「全」——摘要明说按 coverage 与 feasibility 选取，未覆盖处会标注；引用 HELM 时要连它的场景清单一起看，脱离场景的 HELM 排名没有意义。",
   "它没有主张的：HELM 不是新基准榜单的替代品——它反对的正是单一口径；「HELM 总分第一」这种说法与论文立场相反。"
  ],
  "pointsEn": [
   "Research question (abstract): LMs' \"capabilities, limitations, and risks are not well understood\"; HELM aims at transparency, not at crowning a strongest model.",
   "Framework: taxonomize scenarios (use cases) and metrics (desiderata), select a subset by coverage and feasibility, and state what is missing (the abstract names QA for neglected English dialects and trustworthiness metrics) — admitting coverage gaps is part of the method.",
   "Core approach verbatim: measure 7 metrics (accuracy, calibration, robustness, fairness, bias, toxicity, efficiency) across 16 core scenarios where possible, \"ensuring metrics beyond accuracy don't fall to the wayside\".",
   "Declared trade-off: broad, not exhaustive — cite HELM together with its scenario list; a HELM ranking detached from scenarios is meaningless.",
   "What it does not claim: HELM is not a replacement leaderboard — it opposes single-metric ranking itself; 'ranked first on HELM' contradicts the paper's stance."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "它逐字读懂你的文字",
  "zh": "它逐字读懂你的文字",
  "en": "It Reads Your Words One By One",
  "kind": "myth",
  "station": 4,
  "ord": 1,
  "span": 5,
  "lead": {
   "zh": "它看到的不是字，是词表里的编号。",
   "en": "What it sees is not characters but ids from a vocabulary."
  },
  "points": null,
  "pointsEn": null,
  "myth": "它像你一样按字和词理解输入。",
  "mythEn": "It reads your input word by word, the way you do.",
  "fact": "输入先被切成词表里的 token 编号。不常见的词可能被拆成几段。它处理的是编号，不是字。",
  "factEn": "The input is first cut into token ids from a vocabulary. An uncommon word may be split into pieces. What it works on is the ids, not the characters."
 },
 {
  "id": "它在一步步推理",
  "zh": "它在一步步推理",
  "en": "It Reasons Step By Step",
  "kind": "myth",
  "station": 4,
  "ord": 2,
  "span": 5,
  "lead": {
   "zh": "写出来的步骤，不保证是产生答案的实际路径。",
   "en": "The steps it writes are not guaranteed to be the path that produced the answer."
  },
  "points": null,
  "pointsEn": null,
  "myth": "它给出的推理过程，就是它实际的思考步骤。",
  "mythEn": "The reasoning it shows you is the reasoning it actually performed.",
  "fact": "它按概率逐词生成；写出来的中间步骤与产生答案的实际路径不一定一致。",
  "factEn": "It generates word by word by probability; the intermediate steps it writes need not match the path that produced the answer."
 },
 {
  "id": "注意力就是它注意到重点",
  "zh": "注意力就是它注意到重点",
  "en": "Attention Means It Notices What Matters",
  "kind": "myth",
  "station": 4,
  "ord": 3,
  "span": 5,
  "lead": {
   "zh": "注意力是一种加权计算，不是「它在留意」。",
   "en": "Attention is a weighted computation, not the model paying heed."
  },
  "points": null,
  "pointsEn": null,
  "myth": "「注意力机制」说明它会像人一样挑重点看。",
  "mythEn": "\"Attention mechanism\" means it picks out what matters, like a person would.",
  "fact": "注意力按相关性给不同位置加权；权重高不等于它认为那部分重要。",
  "factEn": "Attention weights positions by relatedness; a high weight does not mean it judged that part important."
 },
 {
  "id": "论文卡-Attention Is All You Need",
  "zh": "论文卡-Attention Is All You Need",
  "en": "Paper Card - Attention Is All You Need",
  "kind": "paper",
  "station": 4,
  "ord": 1,
  "span": 7,
  "lead": {
   "zh": "Transformer 的源头论文。这张卡列清它要解决什么、证据在哪一节、以及它没有主张什么。",
   "en": "The source paper of the Transformer. This card lays out the question it set out to solve, where the evidence lives, and what the paper does not claim."
  },
  "points": [
   "研究问题：只用注意力、不用循环和卷积，能不能做序列转换——摘要原话 \"dispensing with recurrence and convolutions entirely\"（完全弃用循环与卷积）。",
   "核心证据：第 4 节与 Table 1 对比三种架构量——最大路径长度、每层计算量、最少顺序操作数；实验是两个机器翻译任务，WMT 2014 英德翻译 28.4 BLEU（摘要原话）。",
   "作者自陈局限：这篇论文没有独立的 Limitations 节（当日核对 arXiv HTML 版）；最接近的是第 7 节注意力可视化——那是机制解读，不是局限声明。适用范围要读者自己补判断。",
   "它没有主张的：论文没有说这套架构能训出通用语言模型。「Transformer 是大模型的地基」是本站回顾性说法，不是论文结论。",
   "读法提示：Table 1 的三量对比才是论证核心；只看架构图会错过论文真正的主张。"
  ],
  "pointsEn": [
   "Research question: can sequence transduction work with attention alone — the abstract's \"dispensing with recurrence and convolutions entirely\".",
   "Core evidence: Section 4 and Table 1 compare three architectures on path length, per-layer compute, and sequential operations; experiments are two machine-translation tasks, 28.4 BLEU on WMT 2014 EN-DE (abstract).",
   "Author-stated limitations: the paper has no standalone Limitations section (verified against the arXiv HTML version on 2026-10-29); Section 7's attention visualizations explain the mechanism, not the limits — applicability is the reader's job.",
   "What it does not claim: the paper never says this architecture will train general-purpose language models. \"Transformer is the foundation of LLMs\" is our retrospective framing, not the paper's conclusion.",
   "Reading tip: the three-way complexity comparison in Table 1 is the actual argument; looking only at the architecture diagram misses the claim."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "论文卡-GPT-3",
  "zh": "论文卡-GPT-3",
  "en": "Paper Card - GPT-3",
  "kind": "paper",
  "station": 4,
  "ord": 2,
  "span": 8,
  "lead": {
   "zh": "「大模型」叙事的起点论文。这张卡列清它真正论证了什么、局限作者自己怎么写的、以及哪些流行说法不在论文里。",
   "en": "The starting point of the 'big model' narrative. This card separates what the paper actually demonstrated, what the authors themselves flagged as limits, and which popular claims are not in the paper."
  },
  "points": [
   "研究问题：预训练+微调范式要求每个任务都有专门标注数据，而人类只靠少量例子或简单指令就能做新任务——能不能让模型也做到「不更新参数、从上下文例子学任务」（摘要原话）。",
   "核心证据：第 3 节按任务族铺开的大表（语言建模、闭卷问答、翻译、常识推理、SuperGLUE 等）——主张是「同一模型不加微调跨多任务可用」，读时要逐表看基线与设置。",
   "作者自陈局限（第 5 节 Limitations，当日核对）：原话 \"it still has notable weaknesses in text synthesis and several NLP tasks\"——生成文本与若干 NLP 任务仍有明显弱点。",
   "论文里没有「涌现能力」（emergent abilities/emergence）字样（当日全文核对）：「GPT-3 展现了涌现能力」是后续论文的提法，不是这篇的结论。",
   "它没有主张的：论文没有主张模型「理解」语言；「规模一定带来一切」也不是论文措辞——论文的主张严格限定在少样本任务表现。"
  ],
  "pointsEn": [
   "Research question: pre-train + fine-tune needs task-specific labeled data, yet humans learn new language tasks from a few examples or instructions — can a model learn tasks from context without updating weights (abstract).",
   "Core evidence: the Section 3 tables organized by task family (language modeling, closed-book QA, translation, commonsense, SuperGLUE…). The claim is one model, no fine-tuning, many tasks — check baselines and settings table by table.",
   "Author-stated limitations (Section 5, verified): \"it still has notable weaknesses in text synthesis and several NLP tasks\".",
   "The words 'emergent abilities' / 'emergence' do not appear in the paper (full-text check on 2026-10-29) — that framing comes from later papers.",
   "What it does not claim: the paper does not claim the model 'understands' language, and 'scale always delivers' is not its wording either — its claims are strictly about few-shot task performance."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "论文卡-InstructGPT",
  "zh": "论文卡-InstructGPT",
  "en": "Paper Card - InstructGPT",
  "kind": "paper",
  "station": 4,
  "ord": 3,
  "span": 8,
  "lead": {
   "zh": "「对齐」进入主流训练的标志性论文。这张卡列清它要解决什么、关键数字在哪、以及作者自己列的局限在哪一节。",
   "en": "The landmark paper that moved 'alignment' into mainstream training. This card pins down the question, the key numbers, and where the authors list their own limitations."
  },
  "points": [
   "研究问题：摘要开篇原话 \"Making language models bigger does not inherently make them better at following a user's intent\"——模型变大不天然更听话，会生成不真实、有害或无用的输出。",
   "核心证据：1.3B 参数的 InstructGPT 输出被标注者偏好于 175B GPT-3（摘要原话 \"despite having 100x fewer parameters\"，参数量少 100 倍）——对齐质量与参数量解耦，这是全文最硬的一条。",
   "作者自陈局限：第 5 节（当日核对 HTML 版含 limitations 5.3 / open questions 5.4 / broader impacts 5.5 小节）；摘要还明说毒性只有小幅改善、偏见没有改善（\"small improvements in toxicity over GPT-3, but not bias\"）。",
   "对评测读者的关键一句（摘要）：\"Public NLP datasets are not reflective of how our language models are used\"——公开基准反映不了真实用法。这条直接支撑本站「榜单怎么读」的立场。",
   "它没有主张的：RLHF 解决了幻觉或偏见——论文自己说没有；「对齐=更安全」也不能从这篇直接推出，作者列的是开放问题。"
  ],
  "pointsEn": [
   "Research question: the abstract opens with \"Making language models bigger does not inherently make them better at following a user's intent\" — bigger models can be untruthful, toxic, or simply unhelpful.",
   "Core evidence: labelers prefer outputs from the 1.3B InstructGPT to the 175B GPT-3 — \"despite having 100x fewer parameters\" (abstract). Alignment quality decouples from parameter count; this is the paper's hardest result.",
   "Author-stated limitations: Section 5 (the HTML version contains 5.3 limitations / 5.4 open questions / 5.5 broader impacts); the abstract itself says toxicity improved only slightly and bias not at all.",
   "Key line for evaluation readers (abstract): \"Public NLP datasets are not reflective of how our language models are used\" — this directly supports our 'How to Read a Leaderboard' stance.",
   "What it does not claim: RLHF did not solve hallucination or bias — the paper says so; 'alignment = safer' cannot be inferred from this paper either."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "论文卡-Chinchilla",
  "zh": "论文卡-Chinchilla",
  "en": "Paper Card - Chinchilla",
  "kind": "paper",
  "station": 4,
  "ord": 4,
  "span": 7,
  "lead": {
   "zh": "「模型该多大、数据该多少」的定标论文。这张卡列清它的结论原话、证据规模、以及作者自己提醒的外推边界。",
   "en": "The calibration paper on 'how big should the model be, how much data should it see'. This card quotes the conclusion, states the evidence scale, and notes the extrapolation boundary the authors themselves flag."
  },
  "points": [
   "研究问题：摘要原话——给定算力预算下，最优的模型大小与训练 token 数各是多少；结论是「当前大模型普遍训练不足」（\"significantly undertrained\"），因为业界只顾加大模型、不增加数据。",
   "核心结论原话：\"for compute-optimal training, the model size and the number of training tokens should be scaled equally: for every doubling of model size the number of training tokens should also be doubled\"——模型与数据要等比例扩。",
   "证据规模：训练 400 多个模型（70M 到 16B+ 参数、5 到 500B token）做定标拟合，再用 70B 的 Chinchilla 验证——它「超过 Gopher 及其他大模型」（第 4.2 节，当日核对）。",
   "作者自陈的边界（当日核对）：Chinchilla 比 Gopher 多训 4 倍数据，作者自己提醒「训练/测试集泄漏可能人为抬高结果」，因此更看重其他任务——连定标论文都在防数据污染。",
   "它没有主张的：结论来自 ≤16B 模型的拟合再外推——「70B 之后规律不变」是外推不是实测；「参数量不重要」也不是论文说法，是等比例扩。"
  ],
  "pointsEn": [
   "Research question (abstract): under a fixed compute budget, what is the optimal model size and token count; the finding is that current LLMs are \"significantly undertrained\" because the field scaled models while keeping data constant.",
   "Conclusion verbatim: \"for compute-optimal training, the model size and the number of training tokens should be scaled equally: for every doubling of model size the number of training tokens should also be doubled\".",
   "Evidence scale: 400+ models trained (70M to 16B+ parameters, 5B to 500B tokens) to fit the scaling law, then validated with the 70B Chinchilla, which \"outperforms Gopher\" (Section 4.2, verified).",
   "Author-flagged boundary (verified): Chinchilla trained on 4× more data than Gopher, and the authors warn train/test leakage may artificially boost results — even a calibration paper guards against contamination.",
   "What it does not claim: the law is fitted on ≤16B models and extrapolated — 'the rule holds past 70B' is extrapolation, not measurement; 'parameter count doesn't matter' is not the paper's claim either."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "论文卡-Llama 2",
  "zh": "论文卡-Llama 2",
  "en": "Paper Card - Llama 2",
  "kind": "paper",
  "station": 4,
  "ord": 5,
  "span": 7,
  "lead": {
   "zh": "开放权重对话模型的标志性技术报告。这张卡列清它要解决什么、证据在哪一节、以及它没有主张什么。",
   "en": "The landmark tech report for open-weight chat models. This card lays out what it set out to solve, where the evidence sits, and what it does not claim."
  },
  "points": [
   "研究问题：摘要原话——发布 \"a collection of pretrained and fine-tuned large language models (LLMs) ranging in scale from 7 billion to 70 billion parameters\"（70 亿到 700 亿参数的预训练+微调模型集）；微调版 Llama 2-Chat 的目标是 \"optimized for dialogue use cases\"（面向对话场景）。",
   "核心证据：第 3 节微调流程（SFT+拒绝采样+PPO）与第 4 节安全改进——摘要自陈贡献是 \"We provide a detailed description of our approach to fine-tuning and safety improvements\"（详细公开微调与安全方法）；对比主张带限定词：\"outperform open-source chat models on most benchmarks we tested\"（多数而非全部基准）。",
   "作者自陈局限：这篇论文没有独立的 Limitations 节（2026-10-29 核对 arXiv HTML 版）；最接近的是第 5 节 Discussion（权衡与风险讨论）和第 4 节 Safety（含内容警告）——是讨论不是局限清单，适用范围要读者自己补判断。",
   "它没有主张的：摘要原话是 \"may be a suitable substitute for closed-source models\"（可能适合替代闭源模型）——没有主张超越闭源模型。「开放权重」也不等于开源：社区许可证带使用限制（见「开放权重」词条）。",
   "读法提示：这篇的核心贡献是微调与安全流程的公开程度，不是基准分数；只看评测表会错过论文真正给的东西。"
  ],
  "pointsEn": [
   "Research question: the abstract announces \"a collection of pretrained and fine-tuned large language models (LLMs) ranging in scale from 7 billion to 70 billion parameters\"; the fine-tuned Llama 2-Chat is \"optimized for dialogue use cases\".",
   "Core evidence: Section 3's fine-tuning pipeline (SFT + rejection sampling + PPO) and Section 4's safety work — the abstract itself frames the contribution as \"We provide a detailed description of our approach to fine-tuning and safety improvements\"; the comparison claim carries a qualifier: \"outperform open-source chat models on most benchmarks we tested\" (most, not all).",
   "Author-stated limits: no standalone Limitations section (checked against the arXiv HTML version on 2026-10-29); the closest are Section 5 Discussion (trade-offs and risks) and Section 4 Safety (with a content warning) — discussion, not a limitations list. Scope of validity is the reader's job.",
   "What it does not claim: the abstract says \"may be a suitable substitute for closed-source models\" — never a claim of surpassing them. And open-weight is not open-source: the community license carries use restrictions (see the Open weights term).",
   "How to read it: the core contribution is the openness of the fine-tuning and safety process, not the benchmark scores; reading only the eval tables misses what the paper actually gives."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "论文卡-LIMA",
  "zh": "论文卡-LIMA",
  "en": "Paper Card - LIMA",
  "kind": "paper",
  "station": 4,
  "ord": 6,
  "span": 7,
  "lead": {
   "zh": "「少即是多」的对齐数据实验：只用 1000 条精选样本微调。这张卡列清它要测什么、证据在哪一节、以及它没有主张什么。",
   "en": "The 'less is more' alignment-data experiment: fine-tuning on just 1,000 curated examples. This card lays out what it set out to test, where the evidence sits, and what it does not claim."
  },
  "points": [
   "研究问题：摘要原话——按两阶段训练 LIMA（65B 参数 LLaMa 模型），\"fine-tuned with the standard supervised loss on only 1,000 carefully curated prompts and responses\"（只用 1000 条精选问答做标准监督微调），\"without any reinforcement learning or human preference modeling\"（不做强化学习也不做人类偏好建模）——要测的就是两个训练阶段的相对重要性。",
   "核心证据：第 4 节人工评测（对照 GPT-4/Bard/DaVinci003）与第 5 节消融（数据多样性/质量/数量）——摘要给出受控人评数字：\"responses from LIMA are either equivalent or strictly preferred to GPT-4 in 43% of cases\"（43% 的情况下 LIMA 的回答与 GPT-4 相当或更好）；结论句是 \"almost all knowledge in large language models is learned during pretraining\"（几乎所有知识都在预训练阶段学到）。",
   "作者自陈局限：没有独立的 Limitations 节（2026-10-30 核对 arXiv HTML 版）；第 7 节 Discussion 开头明确自陈两条——构造样例的心智成本难以规模化、\"LIMA is not as robust as product-grade models\"（不如产品级模型稳健，解码 unlucky sample 或对抗性提示常出弱回答）。",
   "它没有主张的：43%/58%/65% 是「相当或更好」的受控人评占比，不是「整体达到 GPT-4 水平」；「1000 条足够」是对话风格层面的证据，论文没有主张安全、事实性、鲁棒性也能靠 1000 条解决——这三项恰恰是它自陈薄弱的地方。",
   "读法提示：这篇的价值是把「知识来自预训练、对齐数据管的是风格」这个假设做成了可检验的消融；引用它时先分清「少数据能对齐」与「少数据能对齐一切」是两个命题。"
  ],
  "pointsEn": [
   "Research question: the abstract describes training LIMA (a 65B LLaMa model) \"fine-tuned with the standard supervised loss on only 1,000 carefully curated prompts and responses\", \"without any reinforcement learning or human preference modeling\" — the point is to measure the relative importance of the two training stages.",
   "Core evidence: Section 4's human evaluation (against GPT-4, Bard, DaVinci003) and Section 5's ablations on data diversity/quality/quantity — the abstract gives the controlled human-study number: \"responses from LIMA are either equivalent or strictly preferred to GPT-4 in 43% of cases\"; the conclusion line is \"almost all knowledge in large language models is learned during pretraining\".",
   "Author-stated limits: no standalone Limitations section (checked against the arXiv HTML version on 2026-10-30); Section 7's Discussion states two limits outright — the mental effort of building such examples is hard to scale, and \"LIMA is not as robust as product-grade models\" (an unlucky decode or an adversarial prompt often yields a weak response).",
   "What it does not claim: 43%/58%/65% are shares of \"equivalent or strictly preferred\" in a controlled human study — not \"matches GPT-4 overall\"; \"1,000 examples suffice\" is evidence about dialogue style, not about safety, factuality, or robustness — the very areas the authors admit are weak.",
   "How to read it: its value is turning the hypothesis \"knowledge comes from pretraining, alignment data shapes style\" into testable ablations; when citing it, separate \"little data can align a model\" from \"little data can align everything\"."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "论文卡-Self-Instruct",
  "zh": "论文卡-Self-Instruct",
  "en": "Paper Card - Self-Instruct",
  "kind": "paper",
  "station": 4,
  "ord": 7,
  "span": 7,
  "lead": {
   "zh": "合成指令数据的开山框架：让模型自己生成指令来训练自己。这张卡列清它要解决什么、证据在哪一节、以及它没有主张什么。",
   "en": "The founding framework for synthetic instruction data: models generate the instructions that train them. This card lays out what it set out to solve, where the evidence sits, and what it does not claim."
  },
  "points": [
   "研究问题：摘要原话——指令微调模型 \"depend heavily on human-written instruction data that is often limited in quantity, diversity, and creativity\"（重度依赖人类写的指令数据，而这类数据在数量/多样性/创造力上有限）；解法是 Self-Instruct——\"improving the instruction-following capabilities of pretrained language models by bootstrapping off their own generations\"（用模型自己的生成来-bootstrapping 提升指令跟随）。",
   "核心证据：第 2 节方法（生成指令+输入+输出、过滤无效与相似样本再微调原模型；种子为 175 个人工标注任务）与第 4 节结果——把方法套在原版 GPT3 上，\"a 33% absolute improvement over the original model on Super-NaturalInstructions\"（Super-NaturalInstructions 上绝对提升 33 个百分点），\"on par with the performance of InstructGPT-001\"（与用私有用户数据和人工标注训练的 InstructGPT-001 相当）。",
   "作者自陈局限：有独立的第 8 节 Limitations（2026-10-30 核对 arXiv HTML 版），三条：长尾现象（收益偏向预训练语料高频任务，对罕见/创造性指令可能脆弱）、依赖大模型（小模型上未必有效，可能抬高门槛）、强化模型自身偏差（迭代算法可能放大不良社会偏见）。",
   "它没有主张的：摘要口径是 on par（相当）且人评 \"leaving only a 5% absolute gap behind InstructGPT-001\"（还差 5 个百分点）——没有主张超越 InstructGPT；\"almost annotation-free\"（几乎免标注）也不等于零标注：175 个种子任务和过滤规则仍是人工设计。",
   "读法提示：这篇是「合成数据训练自己」路线的源头——后来大量指令数据集与自改进方法都走它的生成+过滤骨架；读它时把「方法可复用」与「GPT3 上的具体数字」分开，数字随底座模型能力变化很大。"
  ],
  "pointsEn": [
   "Research question: the abstract notes instruction-tuned models \"depend heavily on human-written instruction data that is often limited in quantity, diversity, and creativity\"; the fix is Self-Instruct — \"improving the instruction-following capabilities of pretrained language models by bootstrapping off their own generations\".",
   "Core evidence: Section 2's method (generate instructions, inputs, and outputs; filter invalid or near-duplicate samples; fine-tune the original model; seeded from 175 human-annotated tasks) and Section 4's results — applied to vanilla GPT3, \"a 33% absolute improvement over the original model on Super-NaturalInstructions\", \"on par with the performance of InstructGPT-001\", which was trained on private user data and human annotations.",
   "Author-stated limits: a standalone Section 8 Limitations exists (checked against the arXiv HTML version on 2026-10-30), naming three: tail phenomena (gains skew toward tasks frequent in the pretraining corpus, brittleness on uncommon or creative instructions), dependence on large models (may work best for big models, raising access barriers), and reinforcing the model's own biases (the iterative loop can amplify problematic social biases).",
   "What it does not claim: the abstract says on par, and the human eval leaves \"only a 5% absolute gap behind InstructGPT-001\" — never a claim of surpassing it; and \"almost annotation-free\" is not zero annotation: the 175 seed tasks and the filtering rules are still human-designed.",
   "How to read it: this is the source of the \"synthesize data to train yourself\" line — many later instruction datasets and self-improvement methods reuse its generate-and-filter skeleton. Separate the reusable method from the specific GPT3 numbers, which move a lot with base-model capability."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "量化会让模型变笨一半",
  "zh": "量化会让模型变笨一半",
  "en": "Quantisation Halves the Quality",
  "kind": "myth",
  "station": 5,
  "ord": 1,
  "span": 5,
  "lead": {
   "zh": "影响随档位而变，量尺是每权重比特数。",
   "en": "The impact varies by tier; the ruler is bits per weight."
  },
  "points": null,
  "pointsEn": null,
  "myth": "量化就是把模型质量砍掉一半。",
  "mythEn": "Quantising cuts model quality in half.",
  "fact": "影响随档位与模型而变。bpw 才是量尺，也就是每个权重占多少比特。各档差别要逐项看。",
  "factEn": "The impact varies by tier and by model. The ruler is bpw, meaning bits per weight. The differences between tiers have to be read item by item."
 },
 {
  "id": "显存不够就跑不了",
  "zh": "显存不够就跑不了",
  "en": "Not Enough VRAM Means It Will Not Run",
  "kind": "myth",
  "station": 5,
  "ord": 2,
  "span": 5,
  "lead": {
   "zh": "能不能跑与跑多快，是两个问题。",
   "en": "Whether it runs and how fast it runs are two questions."
  },
  "points": null,
  "pointsEn": null,
  "myth": "显存装不下，就只能换显卡。",
  "mythEn": "If it does not fit in VRAM, the only option is a better graphics card.",
  "fact": "可以把部分层放到内存或 CPU 上跑。代价是速度。能不能跑与跑多快是两个问题。",
  "factEn": "Some layers can be moved to system memory or to the CPU. The price is speed. Whether it runs at all and how fast it runs are separate questions."
 },
 {
  "id": "接口兼容就等于行为一致",
  "zh": "接口兼容就等于行为一致",
  "en": "A Compatible API Means Identical Behaviour",
  "kind": "myth",
  "station": 5,
  "ord": 3,
  "span": 5,
  "lead": {
   "zh": "兼容保证的是请求与响应的形状。",
   "en": "Compatibility guarantees the shape of requests and responses, nothing more."
  },
  "points": null,
  "pointsEn": null,
  "myth": "只要接口兼容 OpenAI，换过去效果就一样。",
  "mythEn": "If the API is OpenAI-compatible, switching over gives the same behaviour.",
  "fact": "兼容保证的是请求与响应的形状；参数默认值、报错行为和输出质量各家不同。",
  "factEn": "Compatibility covers the shape of requests and responses; parameter defaults, error behaviour and output quality differ between implementations."
 },
 {
  "id": "怎么读模型卡",
  "zh": "怎么读模型卡",
  "en": "How to Read a Model Card",
  "kind": "guide",
  "station": 6,
  "ord": 1,
  "span": 6,
  "lead": {
   "zh": "模型卡是厂商给模型的说明书。这份指南讲读它时该看哪几栏、哪些话要打折。",
   "en": "A model card is the manufacturer's spec sheet for a model. This guide covers which sections to read and which claims to discount."
  },
  "points": [
   "先看用途与限制栏：官方写明「适合什么、不适合什么」，比宣传语可靠。",
   "看评测栏时先问「在哪些基准上测的」，没有基准的分数等于没有分数。",
   "看训练数据栏：数据构成决定它可能带哪些偏见。",
   "看许可栏：能不能商用、要不要署名、衍生模型要不要同许可。",
   "看已知局限栏：厂商主动写的失败场景，比「效果拔群」更值得信。",
   "对比多家时只比同口径：同一基准、同一设置，否则数字没有可比性。"
  ],
  "pointsEn": [
   "Start with intended-use and limitations: what the maker says it is and is not good for beats marketing copy.",
   "When reading benchmarks, first ask which ones were tested; a score without a benchmark is no score.",
   "Read the training-data section: the data mix determines which biases it may carry.",
   "Read the license: commercial use, attribution duties, and whether derivatives must share the same license.",
   "Trust the known-limitations section: failure modes the maker admits are worth more than \"state-of-the-art\".",
   "Compare vendors only on equal terms: same benchmark, same settings, or the numbers are not comparable."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么查生成式 AI 合规义务",
  "zh": "怎么查生成式 AI 合规义务",
  "en": "How to Check Generative AI Compliance Duties",
  "kind": "guide",
  "station": 6,
  "ord": 2,
  "span": 8,
  "lead": {
   "zh": "在国内上线一个 AI 功能，合规不是玄学，是几条能核对的条文。这份指南按上线顺序讲先查什么。",
   "en": "Launching an AI feature in China, compliance is not mysticism but a handful of checkable articles. This guide walks them in launch order."
  },
  "points": [
   "先定性：服务面向不面向境内公众。面向公众的适用《生成式人工智能服务管理暂行办法》。",
   "查训练数据来源：办法第七条要求「使用具有合法来源的数据和基础模型」。",
   "查标识义务：生成的图片、视频要按深度合成规定加标识。",
   "查要不要备案：具有舆论属性或社会动员能力的，要安全评估加算法备案。",
   "查标识新规：《人工智能生成合成内容标识办法》2025 年 9 月 1 日施行，显式标识加元数据里的隐式标识。",
   "拿不准就问法务：本站只讲条文写了什么，不替你下法律结论。"
  ],
  "pointsEn": [
   "Classify first: does the service face the public in mainland China? If so, the Interim Measures for Generative AI Services apply.",
   "Check training-data provenance: Article 7 requires \"lawfully sourced data and foundation models\".",
   "Check labeling duties: generated images and video must carry labels per the deep-synthesis rules.",
   "Check filing: services with public-opinion attributes or social mobilization capacity need security assessments and algorithm filing.",
   "Check the new labeling rules: the Labeling Measures take effect 1 September 2025 — explicit labels plus implicit labels in file metadata.",
   "When unsure, ask legal: this site states what the articles say, it does not hand down legal conclusions for you."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么对照 EU AI Act 自查",
  "zh": "怎么对照 EU AI Act 自查",
  "en": "How to Self-Check Against the EU AI Act",
  "kind": "guide",
  "station": 6,
  "ord": 3,
  "span": 8,
  "lead": {
   "zh": "欧盟 AI 法按风险分四档，义务按时间分批生效。这份指南讲怎么先给自己定性，再看撞上哪一档。",
   "en": "The EU AI Act sorts AI into four risk tiers, with obligations taking effect in batches. This guide covers how to classify yourself and which tier you hit."
  },
  "points": [
   "先定风险档：不可接受 / 高风险 / 透明性 / 最低。绝大多数应用落在最低档，无额外义务。",
   "查禁用清单：社交评分、公共场所实时生物识别等九类做法被直接禁止。",
   "透明性义务：聊天机器人要让人知道在和机器对话；生成内容要可识别，深度伪造要明显标注。",
   "通用模型义务已生效：提供通用 AI 模型的厂商要处理透明度与版权要求。",
   "高风险义务最重：风险评估、数据质量、日志、人工监督，一项都不能少。",
   "时间线要盯：不同义务分批生效，同一产品在不同日期要满足不同要求。"
  ],
  "pointsEn": [
   "Set your risk tier first: unacceptable / high / transparency / minimal. Most applications land in minimal, with no extra duties.",
   "Check the ban list: nine practices are prohibited outright, including social scoring and real-time remote biometric identification in public spaces.",
   "Transparency duties: chatbots must let people know they are talking to a machine; AI-generated content must be identifiable, and deepfakes visibly labeled.",
   "General-purpose model duties are already live: GPAI providers face transparency and copyright requirements.",
   "High-risk duties are the heaviest: risk assessment, data quality, logging, and human oversight, none optional.",
   "Watch the timeline: obligations take effect in batches, so the same product must meet different requirements on different dates."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么查 AI 生成内容的版权风险",
  "zh": "怎么查 AI 生成内容的版权风险",
  "en": "How to Check Copyright Risk for AI-Generated Content",
  "kind": "guide",
  "station": 6,
  "ord": 4,
  "span": 8,
  "lead": {
   "zh": "AI 内容的版权有两头。喂进去的数据合不合法，生成出来的东西归不归你。这份指南讲两头各怎么查。",
   "en": "AI content copyright has two ends: whether the data fed in is lawful, and whether what comes out belongs to you. This guide checks both ends."
  },
  "points": [
   "输入侧查来源：中国办法要求「使用具有合法来源的数据和基础模型」。",
   "输入侧查例外：欧盟《数字单一市场版权指令》为文本与数据挖掘设了例外，科研与商业口径不同。",
   "输出侧别默认归属：AI 生成内容能不能受版权保护，各法域结论不同，先查当地口径。",
   "商用前读厂商条款：模型使用条款对商用、竞品、输出归属各有规定。",
   "留来源记录：素材从哪来、训练数据什么构成，纠纷时来源链第一。",
   "诉讼还在进行：判例会变，重大商用决策找法务，别照新闻下结论。"
  ],
  "pointsEn": [
   "Input side, check provenance: Chinese rules require \"lawfully sourced data and foundation models\".",
   "Input side, check exceptions: the EU Directive on Copyright in the Digital Single Market sets text-and-data-mining exceptions, with research and commercial terms differing.",
   "Output side, do not assume ownership: whether AI-generated content can be copyrighted differs by jurisdiction; check local practice first.",
   "Before commercial use, read the vendor terms: model terms of use differ on commercial use, competing products, and output ownership.",
   "Keep provenance records: where materials came from and what the training data was — the chain of provenance comes first in disputes.",
   "Litigation is ongoing: case law changes; for major commercial decisions consult legal counsel, not news headlines."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "怎么读开源模型的许可证",
  "zh": "怎么读开源模型的许可证",
  "en": "How to Read an Open-Model License",
  "kind": "guide",
  "station": 6,
  "ord": 5,
  "span": 8,
  "lead": {
   "zh": "「开源」不等于随便用。模型许可证里的条件，决定你能不能商用、要不要署名、衍生模型跟不跟同许可。",
   "en": "\"Open source\" does not mean use however you like. The conditions in a model license decide whether you may use it commercially, attribute, and what derivatives inherit."
  },
  "points": [
   "先分清开源软件许可和模型许可：后者常带额外条件，不能凭「开源」两个字推断。",
   "查商用条款：有的许可禁止商用，有的设规模门槛。",
   "查署名与声明：Apache 2.0 要求保留声明和 NOTICE。",
   "查衍生模型义务：同许可（copyleft）要求改出来的模型沿用同一份许可。",
   "查使用限制：不少模型许可禁止用于某些场景，违反即失效。",
   "查许可继承：微调、量化、合并后的模型带哪份许可，本站模型档案逐仓记录。"
  ],
  "pointsEn": [
   "Separate open-source software licenses from model licenses: the latter often carry extra conditions you cannot infer from the words \"open source\".",
   "Check commercial terms: some licenses ban commercial use; others set a scale threshold.",
   "Check attribution: Apache 2.0 requires keeping notices and the NOTICE file.",
   "Check derivative duties: copyleft licenses require models you fine-tune to carry the same license.",
   "Check use restrictions: many model licenses forbid certain use cases; violating them voids the license.",
   "Check license inheritance: which license a fine-tuned, quantized, or merged model carries is recorded repo by repo in this site's model profiles."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "换模型前怎么迁移评估",
  "zh": "换模型前怎么迁移评估",
  "en": "How to Assess a Model Migration",
  "kind": "guide",
  "station": 6,
  "ord": 6,
  "span": 7,
  "lead": {
   "zh": "换模型不是改个名字：同一套提示词在新模型上可能失效。这篇讲换之前要过的四道检查。",
   "en": "Switching models is not renaming: the same prompt set can break on the new one. Four checks to pass before you switch."
  },
  "points": [
   "先跑自建评测对比新旧：公共榜单只说明普遍水平，你的真实输入才说明能不能换。",
   "逐项核接口差异：参数名、流式行为、结构化输出支持、上下文长度——兼容接口不等于行为一致。",
   "重测依赖提示词的功能：同一提示词在不同模型上表现可以差很多，边界条款尤其容易漂。",
   "核许可与数据条款：新模型的许可证、数据保留政策、区域可用性可能和旧模型不同。",
   "留回滚路径：旧模型配置保留到确认期结束，出问题能一键切回。",
   "确认期用线上指标收尾：任务完成率、拒答率、成本三项对比基线，达标才下线旧模型。"
  ],
  "pointsEn": [
   "Run your own eval on old vs new first: public leaderboards show general level; only your real inputs say whether the switch works.",
   "Diff the API surface item by item: parameter names, streaming behavior, structured-output support, context length — a compatible interface is not identical behavior.",
   "Re-test everything that depends on prompts: the same prompt can behave very differently across models; boundary clauses drift most.",
   "Check licenses and data terms: the new model's license, data-retention policy, and regional availability may differ from the old one.",
   "Keep a rollback path: retain the old model's configuration until the confirmation window closes, so you can switch back with one click.",
   "Close out with live metrics during the confirmation window: task completion, refusal rate, and cost against baseline — retire the old model only when they pass."
  ],
  "myth": null,
  "mythEn": null,
  "fact": null,
  "factEn": null
 },
 {
  "id": "预览版不能用于生产",
  "zh": "预览版不能用于生产",
  "en": "Preview Models Are Toys",
  "kind": "myth",
  "station": 6,
  "ord": 1,
  "span": 5,
  "lead": {
   "zh": "能不能用看条款与时间表，不看名字。",
   "en": "Judge it by the terms and the timeline, not by the word \"preview\"."
  },
  "points": null,
  "pointsEn": null,
  "myth": "带「预览」字样的模型只是试验品，不能上生产。",
  "mythEn": "Anything labelled \"preview\" is an experiment and cannot go to production.",
  "fact": "各家的生命周期与支持政策不同。判断依据是该家的条款和弃用时间表。名字里有没有预览不算依据。",
  "factEn": "Lifecycle and support policies differ between providers. The basis is that provider's terms and deprecation schedule. Whether the name says \"preview\" is not evidence."
 },
 {
  "id": "开源模型一定更省钱",
  "zh": "开源模型一定更省钱",
  "en": "Open Models Are Always Cheaper",
  "kind": "myth",
  "station": 6,
  "ord": 2,
  "span": 5,
  "lead": {
   "zh": "开源保证的是使用权与可改性，不是免费。",
   "en": "Open guarantees the right to use and modify, not that it is free."
  },
  "points": null,
  "pointsEn": null,
  "myth": "模型开源了，成本就一定比调用 API 低。",
  "mythEn": "Once a model is open, running it is necessarily cheaper than calling an API.",
  "fact": "自建要算硬件、运维和人力；开源保证的是使用权与可改性，不是「免费」。",
  "factEn": "Self-hosting costs hardware, operations and people; open concerns the right to use and modify, not price."
 },
 {
  "id": "换模型只是改个名字",
  "zh": "换模型只是改个名字",
  "en": "Switching Models Is Just Renaming",
  "kind": "myth",
  "station": 6,
  "ord": 3,
  "span": 5,
  "lead": {
   "zh": "接口兼容不等于迁移成本为零。",
   "en": "A compatible interface does not mean a zero-cost migration."
  },
  "points": null,
  "pointsEn": null,
  "myth": "换模型只是把配置里的名字改一下。",
  "mythEn": "Switching models is just changing a name in the config.",
  "fact": "换模型要重测行为、成本和合规；接口兼容不等于迁移成本为零。",
  "factEn": "Switching means retesting behaviour, cost and compliance; a compatible interface does not make the migration free."
 }
];
