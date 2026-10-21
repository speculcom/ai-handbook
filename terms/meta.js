/* AI 名词地图 · 维度元数据
 *
 * 页面支持三种排布方式（方块墙的分组依据），都从这份 meta 读：
 *   domain  按功能域——这个词属于哪一片
 *   purpose 按用途——它帮你解决什么
 *   level   按难度——该从哪一层开始读
 *
 * color 不用写死十六进制：页面把 --dc 设为 color 变量名，
 * 由 CSS 按 data-theme 分别给深/浅两套实际色值（见 html[data-theme] 块）。
 * 这样浅色模式下自动换成深色系，文字对比度才够。
 *
 * ── 2026-10-04 补齐英文字段 ────────────────────────────────────────
 * 此前 name / desc 只有中文，英文态下 18 条全部显示中文 ——
 * 实测英文态词条详情仍见「核心概念 / 第一层 · 入门层」等中文。
 * 每条补 nameEn / shortEn / descEn，由页面的 L()/LS()/LN() 按当前语言取值。
 *
 * ⚠⚠ **这份是真相源**（_data/handbook/terms/meta.js）。build.mjs 把它复制到
 *   site/data/meta.js，再同步到 learn.specul/data/meta.js。
 *   **改learn.specul/data/meta.js 会被下次构建覆盖** ——
 *   2026-10-04 踩过一次：英文字段加在产物上，重建即丢，表现为
 *   「代码里明明写了 L(DOMAINS[k],'name')，页面却还是中文」。
 */
var META = {
  domains: {
    concept: { name:'核心概念', nameEn:'Core concepts',
      desc:'最基础的名词。不懂这些，后面的都看不懂。',
      descEn:'The most basic terms. Without these, everything after them makes no sense.',
      color:'var(--d-concept)' },
    model:   { name:'模型能力', nameEn:'Model capabilities',
      desc:'模型本身有什么特性、能做什么、边界在哪。',
      descEn:'What a model is like, what it can do, and where its limits are.',
      color:'var(--d-model)' },
    dev:     { name:'AI 编程', nameEn:'AI coding',
      desc:'用 AI 写代码、做自动化。四个图谱站在讲这一片。',
      descEn:'Writing code and automating with AI. Four atlas sites cover this area.',
      color:'var(--d-dev)' },
    agent:   { name:'智能体', nameEn:'Agents',
      desc:'让 AI 自己动手完成多步骤任务，而不只是回答。',
      descEn:'Letting AI carry out multi-step tasks itself, rather than only answering.',
      color:'var(--d-agent)' },
    data:    { name:'数据与检索', nameEn:'Data & retrieval',
      desc:'怎么让模型知道你的私有资料，并正确引用它。',
      descEn:'How to give a model your private material and have it cite correctly.',
      color:'var(--d-data)' },
    media:   { name:'图像语音视频', nameEn:'Image, speech & video',
      desc:'非文字的生成与理解：生图、语音、视频、机器人。',
      descEn:'Non-text generation and understanding: images, speech, video, robotics.',
      color:'var(--d-media)' },
    infra:   { name:'硬件与部署', nameEn:'Hardware & deployment',
      desc:'跑起来需要什么硬件与软件，本地部署必看。',
      descEn:'The hardware and software it takes to run. Essential for local deployment.',
      color:'var(--d-infra)' },
    choice:  { name:'选型与成本', nameEn:'Selection & cost',
      desc:'怎么选、多少钱、有哪些坑。决策在这一片。',
      descEn:'How to choose, what it costs, where the traps are. Decisions live here.',
      color:'var(--d-choice)' }
  },
  purposes: {
    learn: { name:'搞懂概念', nameEn:'Understand the idea',
      desc:'先知道这个词指什么、解决什么。入门从这里开始。',
      descEn:'First learn what the term means and what it solves. Start here.' },
    apply: { name:'动手做出来', nameEn:'Build it yourself',
      desc:'照着做能实现某个功能。偏工程实践。',
      descEn:'Follow along to implement something. Leans engineering.' },
    guard: { name:'不出事', nameEn:'Avoid the pitfalls',
      desc:'避开坑、限制风险。涉及安全、数据、权限的必看。',
      descEn:'Avoid traps and limit risk. Required for security, data and permissions.' },
    judge: { name:'做决定', nameEn:'Make a decision',
      desc:'支撑选型、采购与预算判断。偏成本与取舍。',
      descEn:'Supports selection, procurement and budget calls. Leans cost and trade-offs.' }
  },
  /* ── 六站（v7 §1.3 / §3.2 命名表，2026-10-18 冻结）──────────────────
   * v7 把「六层」改名为「六站」：每一站给一句「学完你能…」与「通往下一站」。
   * ⚠ `name`（一..六）**不改** —— 它是 frontmatter `layer` 字段的取值、
   *   build.mjs 的 NUM2KEY、以及 validate 的 LAYERS 枚举。改的是**展示名** short。
   * ⚠ `take` / `next` 原先手写在 learn 首页（PATH_TAKE / PATH_TAKE_EN）。
   *   现在搬进这里，页面只读这一份 —— 同一句话存两处必然漂（本项目头号疾病）。
   * 英文态用 "Station N"（2026-10-18 定）：nextEn 写的就是 "Next station"、首页 lead 写的
   *   是 "six stations" —— 若标签还留 "Layer N"，同一页两套口径（本项目头号疾病）。
   *   ⚠ 锚点 id 仍是 `layer-N`（200 个词条页的出链 + anchor-check 守它），名字改、锚点不改。 */
  levels: {
    '1': { name:'一', nameEn:'One', short:'进门', shortEn:'Getting In',
      desc:'不需要任何技术基础。先建立直觉，读完能跟人聊明白 AI 在做什么。',
      descEn:'No technical background needed. Build intuition first; finish able to explain what AI is doing.',
      take:'能跟人聊明白 AI 在做什么',
      takeEn:'Explain what AI is doing to another person',
      next:'通往下一站：上手 —— 从「聊得明白」到「用得不慌」',
      nextEn:'Next station, Hands On: from following the conversation to using it without unease' },
    '2': { name:'二', nameEn:'Two', short:'上手', shortEn:'Hands On',
      desc:'认清 AI 的能力与边界。知道它什么时候会出错，比知道它多强更重要。',
      descEn:'Grasp what AI can and cannot do. Knowing when it fails matters more than knowing how strong it is.',
      take:'知道它什么时候会出错，不被演示骗',
      takeEn:'Know when it fails, so a demo cannot fool you',
      next:'通往下一站：用深 —— 把 AI 嵌进自己的工作流',
      nextEn:'Next station, Going Deeper: put AI inside your own workflow' },
    '3': { name:'三', nameEn:'Three', short:'用深', shortEn:'Going Deeper',
      desc:'决定 AI 好不好用的那些具体做法。看完能判断一个方案靠不靠谱。',
      descEn:'The concrete practices that decide whether AI works for you. Enough to judge whether a plan holds up.',
      take:'判断一个方案靠不靠谱，而不是听服务商说',
      takeEn:'Judge whether a plan holds up instead of trusting the vendor',
      next:'通往下一站：看懂 —— 说得清它为什么这样表现',
      nextEn:'Next station, Under the Hood: say why it behaves that way' },
    '4': { name:'四', nameEn:'Four', short:'看懂', shortEn:'Under the Hood',
      desc:'理解为什么会有这些表现。看不懂这一站，前面的词你都只能背。',
      descEn:'Understand why it behaves this way. Skip this station and the earlier terms stay mere memorisation.',
      take:'看懂为什么会有这些表现，不再死记硬背',
      takeEn:'Understand why it behaves that way, rather than memorising',
      next:'通往下一站：跑起来 —— 在自己机器上跑模型',
      nextEn:'Next station, Running It: run a model on your own machine' },
    '5': { name:'五', nameEn:'Five', short:'跑起来', shortEn:'Running It',
      desc:'让模型跑在自己机器上。你会关心显存够不够、跑得多快。',
      descEn:'Run the model on your own machine. Whether VRAM suffices and how fast it runs become the concern.',
      take:'知道模型跑在自己机器上要吃多少显存',
      takeEn:'Know how much VRAM running it locally will take',
      next:'通往下一站：选得对 —— 面对新模型有自己的判断框架',
      nextEn:'Next station, Choosing Right: have your own framework for a new model' },
    '6': { name:'六', nameEn:'Six', short:'选得对', shortEn:'Choosing Right',
      desc:'把前面学到的东西变成一个决定。这是这一页的终点。',
      descEn:'Turn everything above into a decision. This is where the page ends.',
      take:'把学到的东西变成一个能签字的决定',
      takeEn:'Turn what you learned into a decision you can sign off on',
      next:'六站读完。想动手：去 Agent 图谱看能装什么，去本地模型看能跑什么',
      nextEn:'Six stations done. To build: the Agent atlas for what you can install, Models for what you can run' }
  }
};
if (typeof module !== 'undefined') module.exports = META;
