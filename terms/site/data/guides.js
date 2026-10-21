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
