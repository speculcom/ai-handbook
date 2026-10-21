/* AI 名词地图 · 词条数据
 *
 * **这是产物，不要手改。** 源在 terms/*.md。
 * 改词：编辑 terms/<slug>.md，然后跑 node scripts/build.mjs。
 *
 * 结构：6 层，每层 { num, name, desc, terms[] }
 * 每词字段：zh / en / alias / purpose / def / why / refs / domain / purposeTag / level
 */
var TERMS = [
 {
  "num": "一",
  "name": "进门",
  "desc": "不需要任何技术基础。先建立直觉，读完能跟人聊明白 AI 在做什么。",
  "terms": [
   {
    "zh": "人工智能",
    "en": "Artificial Intelligence, AI",
    "alias": [
     "AI"
    ],
    "purpose": "让机器做原本需要人类智能才能做的事——看图、听话、写字、决策。",
    "def": [
     "一个宽泛的领域，指让机器表现出类似人类智能的能力。它本身不是一门具体技术，而是很多技术的统称。",
     "「人工智能」这个词日常里被用来指大模型聊天，但严格说大模型只是其中一支。"
    ],
    "why": "你只需要知道它是个大筐。别人说「用了 AI」时，先问一句具体是哪支技术，答案往往差很远。",
    "refs": [
     [
      "AIMA《人工智能：一种现代方法》官网",
      "https://aima.cs.berkeley.edu/",
      "Artificial Intelligence: A Modern Approach (AIMA)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 1,
    "purposeEn": "Let machines do what used to need human intelligence — see images, understand speech, write, and decide.",
    "defEn": [
     "A broad field: making machines behave in ways we recognise as intelligent. It is not one technology but many, and today's chatbots are only a branch of it."
    ],
    "whyEn": "People often use \"AI\" to mean a chat model. Strictly speaking a large language model is one approach inside AI, not AI itself — most claims about \"AI\" are really claims about one kind of model.",
    "slug": "人工智能"
   },
   {
    "zh": "机器学习",
    "en": "Machine Learning, ML",
    "purpose": "不手写规则，直接给机器大量例子，让它自己总结规律。",
    "def": [
     "让计算机从数据里自动找出规律、并用规律对新情况做预测或分类的一类方法。",
     "和传统编程的区别：传统是你写「规则」，机器学习是你给「例子」，规则由它自己总结。"
    ],
    "why": "它解释了 AI 为什么需要大量数据和算力。这不是玄学，是这类方法的本质要求。",
    "refs": [
     [
      "斯坦福 CS229 机器学习课程",
      "https://cs229.stanford.edu/",
      "Stanford CS229: Machine Learning"
     ],
     [
      "Google 机器学习速成课程",
      "https://developers.google.com/machine-learning/crash-course",
      "Google Machine Learning Crash Course"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 2,
    "alias": [],
    "purposeEn": "Instead of writing rules by hand, let the machine find patterns in data.",
    "defEn": [
     "A method where a system improves at a task by fitting parameters to examples, rather than following rules a programmer wrote."
    ],
    "whyEn": "It is the foundation under essentially everything called AI today. Knowing where the rules came from tells you what the system can and cannot do.",
    "slug": "机器学习"
   },
   {
    "zh": "深度学习",
    "en": "Deep Learning",
    "purpose": "用很多层「神经元」叠起来的网络，从数据里学出复杂特征。",
    "def": [
     "机器学习的一个分支，核心是层数很深的人工神经网络。",
     "「深度」指网络的层数多，不是指它更深奥。"
    ],
    "why": "你现在用的所有大模型都属于这一类。看到这个词就知道：背后是数据 + 算力堆出来的。",
    "refs": [
     [
      "《深度学习》(花书) 官网",
      "https://www.deeplearningbook.org/",
      "Deep Learning (MIT Press, Goodfellow et al.)"
     ],
     [
      "Nature 深度学习论文",
      "https://www.nature.com/articles/nature14539",
      "Deep Learning (Nature, LeCun, Bengio & Hinton)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 3,
    "alias": [],
    "purposeEn": "Stack many layers so the network learns its own features instead of being told them.",
    "defEn": [
     "Machine learning using multi-layer neural networks, where representations are learned from raw data rather than hand-designed."
    ],
    "whyEn": "It is what made image, speech and language tasks leap forward. Understanding it helps you judge which claims about \"deep learning\" are real.",
    "slug": "深度学习"
   },
   {
    "zh": "神经网络",
    "en": "Neural Network",
    "purpose": "模仿大脑神经元连接方式的一类数学结构，是现代 AI 的通用积木。",
    "def": [
     "由大量简单计算单元（神经元）分层连接、互相协作完成计算的结构。",
     "每个单元做的事很简单（加权求和 + 激活），难的是整体如何调参数。"
    ],
    "why": "它是「看懂站」的基础设施。理解了它，后面的 Transformer 才好理解——那是它的一个变种。",
    "refs": [
     [
      "CS231n：神经网络（一）讲义",
      "https://cs231n.github.io/neural-networks-1/",
      "CS231n: Neural Networks Part 1 (notes)"
     ],
     [
      "《深度学习》第6章：深度前馈网络",
      "https://www.deeplearningbook.org/contents/mlp.html",
      "Deep Learning, Ch.6: Deep Feedforward Networks"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 4,
    "alias": [],
    "purposeEn": "A network of simple units whose combined output can approximate very complex functions.",
    "defEn": [
     "Layers of connected units, each applying a small transformation, whose overall behaviour is learned from data rather than specified."
    ],
    "whyEn": "It is the mechanism behind deep learning. You do not need the maths to use it, but it explains both what it can do and why it fails in particular ways.",
    "slug": "神经网络"
   },
   {
    "zh": "大模型 / 大语言模型",
    "en": "Large Language Model, LLM",
    "alias": [
     "大语言模型",
     "LLM",
     "语言模型"
    ],
    "purpose": "读过海量文本、学会「接着往下写」的模型，能对话、能写作、能写代码。",
    "def": [
     "参数量极大、在海量文本上训练出来的模型，通常几十亿到数千亿参数。",
     "它的核心能力只有一句话：给定前面的文字，预测下一个最可能的词。"
    ],
    "why": "这是你日常接触最多的东西。选模型、选档位、算成本，都围绕它。",
    "refs": [
     [
      "按设备选量化档位（千问 3.8）",
      "https://models.specul.com/series/qwen3-8/#b0",
      "Pick tiers by device (Qwen3.8)"
     ],
     [
      "哪个模型适合编程",
      "https://agent.specul.com/",
      "Which models suit coding"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 5,
    "purposeEn": "After training, the learned parameters that let a system generalise to inputs it has never seen.",
    "defEn": [
     "The trained artefact: parameters plus the architecture that produced them. \"Loading a model\" means loading these, not running a program."
    ],
    "whyEn": "Model and product are different things. Many misunderstandings about AI products come from treating a model as if it were an application.",
    "slug": "大模型 - 大语言模型"
   },
   {
    "zh": "参数",
    "en": "Parameter",
    "purpose": "模型里可调的数字，训练就是不断调整它们。参数越多，一般越「博学」。",
    "def": [
     "模型内部的数值参数，是模型学到的知识与能力的载体。",
     "常说的「70 亿参数」指可训练参数的数量级，不等于质量。"
    ],
    "why": "它是你理解「为什么本地跑不动大模型」的关键。参数量直接决定要占多少显存。",
    "refs": [
     [
      "11 系列 16 规格的实测体积",
      "https://models.specul.com/",
      "Measured sizes: 16 specs, 11 series"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 6,
    "alias": [],
    "purposeEn": "The numbers the training process adjusts; everything the model knows lives in them.",
    "defEn": [
     "Weights and biases inside the network. Model size usually refers to how many there are, and larger counts generally mean more capacity."
    ],
    "whyEn": "It grounds abstract claims: a \"7B model\" is a statement about parameter count, not about being better than everything else.",
    "slug": "参数"
   },
   {
    "zh": "训练",
    "en": "Training",
    "purpose": "让模型从数据里学会规律，产出这个模型。",
    "def": [
     "用数据反复调整模型参数的过程。跑完训练得到的是一个「模型」。",
     "训练成本极高，普通公司和个人基本不可能从头训一个大模型。"
    ],
    "why": "它和「推理」是一对概念。分清这两个词，你就明白为什么模型能下载、但没人能「训」你手里这个。",
    "refs": [
     [
      "PyTorch 官方教程：训练模型",
      "https://docs.pytorch.org/tutorials/beginner/introyt/trainingyt.html",
      "PyTorch tutorial: Training with PyTorch"
     ],
     [
      "《深度学习》第8章：训练优化",
      "https://www.deeplearningbook.org/contents/optimization.html",
      "Deep Learning, Ch.8: Optimization for Training"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 7,
    "alias": [],
    "purposeEn": "Let the system learn its parameters from data by repeated exposure.",
    "defEn": [
     "Fitting parameters so predictions match targets, usually by minimising a loss over many examples."
    ],
    "whyEn": "Training determines what the model knows. It is also where cost and bias enter — training data is not neutral.",
    "slug": "训练"
   },
   {
    "zh": "推理",
    "en": "Inference",
    "purpose": "训练完之后，真正拿来回答你问题的过程。",
    "def": [
     "用一个已经训练好的模型做计算、产出结果的过程。",
     "和训练相反：训练需要大量算力，推理是持续的小规模计算。"
    ],
    "why": "你每次和模型对话、每次它在本地生成内容，用的都是推理。算速度和成本时说的也是它。",
    "refs": [
     [
      "本地推理的速度受什么影响",
      "https://models.specul.com/",
      "What affects local inference speed"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 8,
    "alias": [],
    "purposeEn": "The model you trained is now answering real queries — a different phase with different costs.",
    "defEn": [
     "Running a trained model to produce an answer. Often confused with \"reasoning\", but inference simply means using the model."
    ],
    "whyEn": "Training and inference have different cost structures. It explains why a model can be cheap to make and expensive to serve.",
    "slug": "推理"
   },
   {
    "zh": "提示词",
    "en": "Prompt",
    "alias": [
     "Prompt"
    ],
    "purpose": "你给模型的指令。说得越具体，模型的输出越准。",
    "def": [
     "输入给模型的那段文字。模型只根据你写的来推断意图。",
     "同一个模型，提示词不同，效果差距可以非常大。"
    ],
    "why": "这是投入产出比最高的一个词——不用换模型，光改提示词就能明显变好。",
    "refs": [
     [
      "OpenAI 提示工程指南",
      "https://platform.openai.com/docs/guides/prompt-engineering",
      "OpenAI Prompt engineering guide"
     ],
     [
      "Anthropic 提示工程总览",
      "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
      "Anthropic Prompt engineering overview"
     ]
    ],
    "domain": "model",
    "purposeTag": "apply",
    "level": 1,
    "layer": "一",
    "ord": 9,
    "purposeEn": "The instructions you give the model, and often the main lever you actually control.",
    "defEn": [
     "The input text shaping the model's behaviour. In a chat interface it is what you type; in an API it is part of the request."
    ],
    "whyEn": "For using models, prompt quality often matters more than model choice — the same model behaves very differently under different phrasing.",
    "slug": "提示词"
   },
   {
    "zh": "Token",
    "en": "Token",
    "alias": [
     "词元"
    ],
    "purpose": "模型处理文本的最小单位。计费和长度限制都按它算。",
    "def": [
     "模型把文本切成的片段，一个 token 大约是四分之一个英文单词，或一到两个汉字。",
     "上下文长度、API 报价都以 token 为单位。"
    ],
    "why": "这是最容易被忽略却最影响账单的词。「我的上下文够不够」「为什么这么贵」，答案都在它。",
    "refs": [
     [
      "Anthropic 官方：Token 计数",
      "https://platform.claude.com/docs/en/build-with-claude/token-counting",
      "Anthropic: token counting docs"
     ]
    ],
    "domain": "concept",
    "purposeTag": "apply",
    "level": 1,
    "layer": "一",
    "ord": 10,
    "purposeEn": "The smallest unit a model processes text in. Both billing and length limits are measured in it.",
    "defEn": [
     "The pieces a model splits text into. One token is roughly a quarter of an English word, or one to two Chinese characters.",
     "Context length and API pricing are both denominated in tokens."
    ],
    "whyEn": "The most easily overlooked word that most affects your bill. \"Is my context enough\" and \"why is this so expensive\" are both answered here.",
    "slug": "Token"
   },
   {
    "zh": "上下文窗口",
    "en": "Context Window",
    "alias": [
     "上下文",
     "Context"
    ],
    "purpose": "模型一次能「看见」多少内容。超出部分它就完全不知道。",
    "def": [
     "模型单次能处理的 token 总量上限，包含你的指令、给它的资料和它的回答。",
     "超出的内容会被截断，不是「记不住」，是「这次没看见」。"
    ],
    "why": "这是最容易让人误判模型能力的地方。塞了 500 页文档进去却答不出来，往往是超窗了。",
    "refs": [
     [
      "各成员的上下文长度（千问 3.8）",
      "https://models.specul.com/series/qwen3-8/",
      "Context length per member (Qwen3.8)"
     ],
     [
      "MCP 怎么解决喂资料的问题",
      "https://agent.specul.com/tools/context7.html",
      "How MCP feeds documents (context7)"
     ]
    ],
    "domain": "model",
    "purposeTag": "apply",
    "level": 1,
    "layer": "一",
    "ord": 11,
    "purposeEn": "How much the model can see at once — the page of text it can keep in mind while answering.",
    "defEn": [
     "The token budget for one request: system prompt, documents, conversation history and the reply all draw from it."
    ],
    "whyEn": "It sets a hard ceiling on what can be asked. \"It forgot what I told it\" is usually a context-window limit, not a memory bug.",
    "slug": "上下文窗口"
   },
   {
    "zh": "词表",
    "en": "Vocabulary",
    "purpose": "模型认识的全部字符集合。大小决定了它懂不懂中文、懂不懂代码。",
    "def": [
     "模型输出时能用的所有字符或片段的集合。",
     "词表越大，模型需要学的概念越多，对冷门语言和代码的支持通常越好。"
    ],
    "why": "解释了一个常见现象：为什么小模型对中文和代码的表现明显变差。原因是词表里根本没有足够的碎片可用。",
    "refs": [
     [
      "Hugging Face 分词器课程",
      "https://huggingface.co/learn/nlp-course/zh-CN/chapter2/4",
      "Hugging Face NLP Course: Tokenizers chapter"
     ],
     [
      "Cornell CS5740：分词讲义",
      "https://www.cs.cornell.edu/courses/cs5740/2024sp/slides/06%20-%20tokenization.pdf",
      "Cornell CS 5740: Tokenization lecture slides"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 12,
    "alias": [],
    "purposeEn": "The full set of characters a model knows. Its size decides whether it handles Chinese or code well.",
    "defEn": [
     "The set of characters or pieces a model can use when producing output.",
     "The larger the vocabulary, the more concepts the model must learn, and usually the better support for rare languages and code."
    ],
    "whyEn": "It explains a common observation: small models get markedly worse at Chinese and code — there simply are not enough pieces in the vocabulary.",
    "slug": "词表"
   },
   {
    "zh": "AI 产品 vs AI 模型",
    "en": "Product vs Model",
    "purpose": "区分「模型本身」和「你实际用的那个软件」。",
    "def": [
     "模型是底层的计算能力，产品是包装它的应用：界面、计费、协作功能、权限管理。",
     "同一个模型可以出现在很多不同产品里，体验差别很大。"
    ],
    "why": "这解释了为什么「模型排行榜第一」不等于「你用的那个工具最好用」。",
    "refs": [
     [
      "OpenAI Model Spec（官方）",
      "https://model-spec.openai.com/",
      "OpenAI Model Spec"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 13,
    "alias": [],
    "purposeEn": "Separate the model itself from the piece of software you actually use.",
    "defEn": [
     "The model is the underlying capability; the product wraps it with interface, billing, collaboration features and permission management.",
     "One model can appear inside many products, and the experience varies widely."
    ],
    "whyEn": "It explains why \"top of the model leaderboard\" does not mean \"the tool you use is the best\".",
    "slug": "AI 产品 vs AI 模型"
   },
   {
    "zh": "生成式 AI",
    "en": "Generative AI",
    "purpose": "能凭空产出新内容的 AI——文字、图片、音频、视频都算。",
    "def": [
     "从已有数据分布中采样并生成新内容的 AI，与「判别式」（只做判断分类）相对。"
    ],
    "why": "你现在接触的绝大多数 AI 都是生成式。它和「识别」「分类」类AI 的能力边界很不一样。",
    "refs": [
     [
      "Google 生成式 AI 入门指南",
      "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/overview",
      "Google Cloud: Generative AI beginner's guide"
     ],
     [
      "生成式 AI 论文（arXiv）",
      "https://arxiv.org/abs/2309.07930",
      "Generative AI (arXiv:2309.07930)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 14,
    "alias": [],
    "purposeEn": "AI that produces new content from nothing — text, images, audio, video all count.",
    "defEn": [
     "AI that samples from an existing data distribution to generate new content, as opposed to discriminative AI which only judges or classifies."
    ],
    "whyEn": "Nearly all AI you encounter is generative. Its capability boundary differs sharply from recognition and classification.",
    "slug": "生成式 AI"
   },
   {
    "zh": "AI Agent 与聊天机器人的区别",
    "en": "Agent vs Chatbot",
    "purpose": "聊天的终点是回答，Agent 的终点是做完。",
    "def": [
     "聊天机器人是「一问一答」。Agent 会自己规划步骤、调工具、检查结果，循环直到完成。"
    ],
    "why": "判断一个工具是哪种，决定了它值不值得你花时间配置。",
    "refs": [
     [
      "Agent 框架对照",
      "https://agent.specul.com/",
      "Agent profiles & comparisons"
     ]
    ],
    "domain": "concept",
    "purposeTag": "judge",
    "level": 1,
    "layer": "一",
    "ord": 15,
    "alias": [],
    "purposeEn": "A chatbot's job ends with an answer; an agent's ends with the work being done.",
    "defEn": [
     "A chatbot is question and answer. An agent plans its own steps, calls tools, checks results and loops until finished."
    ],
    "whyEn": "Which of the two you are looking at decides whether it is worth your time to configure.",
    "slug": "AI Agent 与聊天机器人的区别"
   },
   {
    "zh": "开源生态",
    "en": "Open-source Ecosystem",
    "purpose": "模型、工具、数据、文档都由社区维护，可自由组合。",
    "def": [
     "由公开代码与社区贡献构成的协作体系，模型和量化版本尤其活跃。"
    ],
    "why": "选择本地部署时，这个生态的活跃度直接决定你能拿到多少现成方案。",
    "refs": [
     [
      "导航站的开发框架分类",
      "https://nav.specul.com/",
      "Nav directory: dev frameworks"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 16,
    "alias": [],
    "purposeEn": "Models, tools, data and documentation all maintained by the community, freely combinable.",
    "defEn": [
     "A collaborative system built on public code and community contribution, especially active around models and quantisations."
    ],
    "whyEn": "When choosing local deployment, this ecosystem's activity directly determines how many ready-made solutions you can get.",
    "slug": "开源生态"
   },
   {
    "zh": "能力边界",
    "en": "Capability Boundary",
    "purpose": "知道模型明确做不到什么，比知道它能做什么更能避免踩坑。",
    "def": [
     "一个系统在特定输入下可靠产出的范围之外的部分。"
    ],
    "why": "这是使用 AI 的核心素养——把重要任务放在可靠区间内。",
    "refs": [
     [
      "Model Cards（论文）",
      "https://arxiv.org/abs/1810.03993",
      "Model Cards for Model Reporting (paper)"
     ],
     [
      "Anthropic 透明度中心（官方）",
      "https://www.anthropic.com/transparency",
      "Anthropic Transparency Hub (Model Report)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "guard",
    "level": 1,
    "layer": "一",
    "ord": 17,
    "alias": [],
    "purposeEn": "Knowing precisely what a model cannot do prevents more mistakes than knowing what it can.",
    "defEn": [
     "The region outside the range in which a system reliably produces correct output for a given input."
    ],
    "whyEn": "It is core literacy for using AI — keep important tasks inside the reliable range.",
    "slug": "能力边界"
   },
   {
    "zh": "权限",
    "en": "Permission",
    "purpose": "决定这个工具能碰你的哪些东西：读文件、改代码、发请求、花钱。",
    "def": [
     "指一个工具被允许做的操作范围。范围越大越方便，也越容易出事。",
     "好的工具会分级授权：读要批准、写要批准、删要二次确认。"
    ],
    "why": "这是AI 工具安全的第一道闸门。**给一个能写文件和跑命令的工具不给权限限制，等于把电脑交出去**。",
    "refs": [
     [
      "FileSystem server 为什么强制声明目录",
      "https://agent.specul.com/tools/filesystem.html",
      "Why Filesystem requires declared dirs"
     ],
     [
      "OpenHands 的受限模式",
      "https://agent.specul.com/harness/openhands.html",
      "OpenHands Restricted Mode"
     ],
     [
      "CLI 的权限询问机制",
      "https://agent.specul.com/opencode.html",
      "CLI permission prompts"
     ]
    ],
    "domain": "agent",
    "purposeTag": "guard",
    "level": 1,
    "layer": "一",
    "ord": 18,
    "alias": [],
    "purposeEn": "The set of operations a tool is allowed to perform. Wider is more convenient and more dangerous.",
    "defEn": [
     "The permitted action scope of a tool. A wider scope is easier to use and easier to get into trouble with.",
     "Good tools authorise in tiers: reading needs approval, writing needs approval, deleting needs confirmation."
    ],
    "whyEn": "It is the first gate on AI tool safety. **Giving a tool that writes files and runs commands no permission limits is handing over the machine.**",
    "slug": "权限"
   },
   {
    "zh": "AGI（通用人工智能）",
    "en": "AGI (Artificial General Intelligence)",
    "purpose": "「什么都能像人一样干」的假想 AI。实验室用来表述目标的词，目前还不存在。",
    "def": [
     "AGI 指在广泛任务上达到或超越人类水平的假想智能系统。",
     "OpenAI 章程把它界定为「在多数具经济价值的工作上超越人类的高自主系统」。",
     "同一份章程写明：通往 AGI 的时间线不确定；它是目标，不是现实。",
     "Google DeepMind 提出了 AGI 进度分级框架。按能力深度与任务广度两个轴分级。"
    ],
    "why": "宣传常暗示「AGI 快到了」。知道它是假想目标、业界有分级框架，你才能判断「突破」说法在吹哪一级。",
    "refs": [
     [
      "OpenAI Charter（官方章程，AGI 定义与使命）",
      "https://openai.com/charter/",
      "OpenAI Charter (official AGI definition and mission)"
     ],
     [
      "Morris 等《Levels of AGI for Operationalizing Progress on the Path to AGI》（Google DeepMind，ICML 2024）",
      "https://arxiv.org/abs/2311.02462",
      "Morris et al., Levels of AGI (Google DeepMind, ICML 2024)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 19,
    "alias": [],
    "purposeEn": "The hypothetical 'capable of anything a human can' AI: a word labs use to state their goal — it does not exist yet.",
    "defEn": [
     "AGI refers to a hypothetical intelligent system reaching or exceeding human level across a wide range of tasks.",
     "OpenAI's charter defines it as 'highly autonomous systems that outperform humans at most economically valuable work'.",
     "The same charter states the timeline to AGI remains uncertain; it is a goal, not a reality.",
     "Google DeepMind proposed a levels-of-AGI framework grading progress by depth of capability and breadth of generality."
    ],
    "whyEn": "Marketing often implies 'AGI is close'. Knowing it is a hypothetical goal with an industry grading framework lets you judge which level a 'breakthrough' claim is actually about.",
    "slug": "AGI"
   },
   {
    "zh": "强化学习",
    "en": "Reinforcement Learning (RL)",
    "purpose": "靠奖励试错学习的范式，与监督、无监督并列的三大训练范式之一。",
    "def": [
     "强化学习研究智能体如何与环境交互、靠最大化累计奖励学会决策。",
     "它不同于监督学习（有标签答案）和无监督学习（无标签找结构）。",
     "训练三阶段里的 RLHF，就是这个范式用在语言模型微调上。"
    ],
    "why": "聊天模型的「对齐」阶段用的就是它。懂「按奖励学」，才懂模型为什么被练得爱顺着人。",
    "refs": [
     [
      "Sutton & Barto《Reinforcement Learning: An Introduction》第 2 版（MIT Press 官方页）",
      "https://mitpress.mit.edu/9780262039246/reinforcement-learning/",
      "Sutton & Barto, Reinforcement Learning: An Introduction, 2nd ed. (MIT Press)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 20,
    "alias": [],
    "purposeEn": "Learning by trial and error against rewards: one of the three training paradigms alongside supervised and unsupervised learning.",
    "defEn": [
     "Reinforcement learning studies how an agent learns to act by interacting with an environment and maximizing cumulative reward.",
     "It differs from supervised learning (labeled answers) and unsupervised learning (finding structure without labels).",
     "RLHF in the three-stage training recipe is this paradigm applied to fine-tuning language models."
    ],
    "whyEn": "The alignment stage of chat models runs on it. Understanding 'learning against rewards' explains why models are trained to please.",
    "slug": "强化学习"
   },
   {
    "zh": "基础模型",
    "en": "Foundation Model",
    "purpose": "「大模型」的学术名称。指在海量数据上预训练、能适配一大堆任务的模型。",
    "def": [
     "这个词由斯坦福 Bommasani 等人 2021 年提出。",
     "指在大规模数据上预训练、可适配到广泛下游任务的模型。",
     "作者用「基础」强调它们处于核心地位、但本身并不完整。"
    ],
    "why": "论文和监管文件常用「基础模型」而不是「大模型」。知道说的是同一类东西，就不会把两个词当成两件事。",
    "refs": [
     [
      "Bommasani 等《On the Opportunities and Risks of Foundation Models》（Stanford HAI，2021）",
      "https://arxiv.org/abs/2108.07258",
      "Bommasani et al., On the Opportunities and Risks of Foundation Models (Stanford HAI, 2021)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 21,
    "alias": [],
    "purposeEn": "The academic name for 'large models': pre-trained on massive data, adaptable to a wide range of tasks.",
    "defEn": [
     "The term was proposed by Bommasani et al. at Stanford in 2021.",
     "It refers to models pre-trained on broad data at scale and adaptable to a wide range of downstream tasks.",
     "The authors chose 'foundation' to underscore their central yet incomplete character."
    ],
    "whyEn": "Papers and regulation say 'foundation model' where marketing says 'large model'. Knowing they name the same thing keeps you from treating them as two categories.",
    "slug": "基础模型"
   },
   {
    "zh": "训练语料",
    "en": "Training Corpus",
    "purpose": "模型「读过」的海量文本汇编：它的来源和毛病，决定了模型的一切表现。",
    "def": [
     "大模型的预训练语料是对海量公开网络文本的清洗汇编。",
     "Common Crawl 是代表性来源。它是一家非营利组织，2007 年成立，维护免费开放的网页存档。",
     "GPT-3 论文承认大规模网络语料带来方法学问题，语料构成细节见论文 §2.2。",
     "语料里的偏见、错误、过时信息，都会原样带进模型。"
    ],
    "why": "「模型知道什么」上限就是语料。理解语料从哪来、有什么毛病，才理解模型为什么有知识截止和偏见。",
    "refs": [
     [
      "Common Crawl 官网（free, open repository of web crawl data）",
      "https://commoncrawl.org",
      "Common Crawl (free, open repository of web crawl data)"
     ],
     [
      "GPT-3 论文（语料与方法学问题见 §2.2）",
      "https://arxiv.org/abs/2005.14165",
      "GPT-3 paper (corpus and methodological issues, §2.2)"
     ],
     [
      "从业者深版：数据与算力专题（AI 模型站）",
      "https://models.specul.com/guides/data-compute.html",
      "Practitioner deep-dive: data & compute guide (AI Models site)"
     ]
    ],
    "domain": "data",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 22,
    "alias": [],
    "purposeEn": "The massive text compilation a model has 'read': its sources and flaws shape everything the model does.",
    "defEn": [
     "A large model's pre-training corpus is a cleaned compilation of vast public web text.",
     "Common Crawl is a representative source: a non-profit founded in 2007 maintaining a free, open repository of web crawl data.",
     "The GPT-3 paper acknowledges methodological issues from training on large web corpora; corpus details are in §2.2.",
     "Biases, errors, and outdated information in the corpus carry straight into the model."
    ],
    "whyEn": "What a model knows is capped by its corpus. Understanding where it comes from and what's wrong with it explains knowledge cutoffs and bias.",
    "slug": "训练语料"
   },
   {
    "zh": "开放权重",
    "en": "Open Weights",
    "purpose": "权重可下载、但许可证未必算「开源」。它是介于开源与闭源之间的第三种形态。",
    "def": [
     "开放权重指模型权重可公开下载，但许可证常附带限制条款。",
     "「开源」的严格定义来自 OSI《开源定义》十条准则，含源码可得、不得限制使用领域。",
     "OSI 官方明确认定 Llama 3.x 的社区许可证不符合开源定义。",
     "学界与 OSI 通常把 Llama 这类许可称为开放权重。英文叫 open weights，不叫 open source。"
    ],
    "why": "「开源模型」的宣传经常实际是开放权重。两者商用条款差很多，选模型前要看许可证原文。",
    "refs": [
     [
      "OSI《Open Source Definition》官方页（十条准则）",
      "https://opensource.org/osd",
      "OSI Open Source Definition (ten criteria)"
     ],
     [
      "OSI 官方博客《Meta's Llama license is still not open source》",
      "https://opensource.org/blog/metas-llama-license-is-still-not-open-source",
      "OSI blog: Meta's Llama license is still not open source"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 1,
    "layer": "一",
    "ord": 23,
    "alias": [],
    "purposeEn": "Weights you can download, but a license that may not qualify as 'open source' — a third form between open and closed.",
    "defEn": [
     "Open weights means model weights are publicly downloadable, often with restrictive license terms.",
     "The strict definition of 'open source' is OSI's ten-criterion Open Source Definition, including source availability and no field-of-use restrictions.",
     "OSI has stated explicitly that the Llama 3.x community license does not meet the open source definition.",
     "Researchers and OSI typically call such licenses 'open weights' rather than open source."
    ],
    "whyEn": "'Open-source model' marketing is often actually open weights. The commercial terms differ a lot — read the license before choosing.",
    "slug": "开放权重"
   },
   {
    "zh": "小语言模型",
    "en": "Small Language Model (SLM)",
    "purpose": "1B–8B 参数级的小个子：便宜、快、能本地跑，能力未必弱。",
    "def": [
     "小语言模型通常指约 1B–8B 参数级的模型，面向消费级硬件和边缘设备。",
     "一篇覆盖约 160 篇研究的综述结论：这个参数段的模型可以追平甚至超过大模型。",
     "它的优势在成本、延迟与本地部署，不是能力上限。"
    ],
    "why": "不是所有任务都需要旗舰大模型。知道小模型的存在和边界，才知道什么时候该用便宜的。",
    "refs": [
     [
      "《Small Language Models (SLMs) Can Still Pack a Punch: A Survey》（综述，约 160 篇文献）",
      "https://arxiv.org/abs/2501.05465",
      "Small Language Models Can Still Pack a Punch: A Survey"
     ]
    ],
    "domain": "model",
    "purposeTag": "judge",
    "level": 1,
    "layer": "一",
    "ord": 24,
    "alias": [],
    "purposeEn": "The 1B–8B parameter class: cheap, fast, runnable locally — and not necessarily weak.",
    "defEn": [
     "Small language models usually mean roughly 1B–8B parameters, aimed at consumer hardware and edge devices.",
     "A survey of about 160 papers concludes models in this range can match or even outperform large models.",
     "Their advantages are cost, latency, and local deployment — not capability ceilings."
    ],
    "whyEn": "Not every task needs a flagship model. Knowing small models exist and where their limits are tells you when the cheap option is the right one.",
    "slug": "小语言模型"
   },
   {
    "zh": "模型卡",
    "en": "Model Card",
    "purpose": "模型的「说明书」：用途、实测表现、已知短板，发布时该一起给。",
    "def": [
     "模型卡概念由 Mitchell 等人 2019 年提出：随模型发布的短文档。",
     "它报告预期用途、在不同人群与条件下的实测表现、评测方法与已知局限。",
     "提出动机：让模型在不适用的场景里少被误用。",
     "如今主流模型发布普遍附带模型卡或同类文档。"
    ],
    "why": "选模型别只看名字和跑分。模型卡是官方自己承认的短板清单，比任何评测文章都诚实。",
    "refs": [
     [
      "Mitchell 等《Model Cards for Model Reporting》（FAT* 2019）",
      "https://arxiv.org/abs/1810.03993",
      "Mitchell et al., Model Cards for Model Reporting (FAT* 2019)"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 1,
    "layer": "一",
    "ord": 25,
    "alias": [],
    "purposeEn": "A model's 'spec sheet': intended use, measured performance, known shortcomings — issued with the model.",
    "defEn": [
     "The model card concept was proposed by Mitchell et al. in 2019: short documents accompanying released models.",
     "They report intended use, benchmarked performance across groups and conditions, evaluation procedures, and known limitations.",
     "The motivation: reduce misuse of models in contexts they are not suited for.",
     "Major model releases now commonly ship model cards or equivalent documentation."
    ],
    "whyEn": "When choosing a model, don't stop at the name and scores. The model card is the vendor's own admitted shortcoming list — more honest than any review.",
    "slug": "模型卡"
   },
   {
    "zh": "合成数据",
    "en": "Synthetic Data",
    "purpose": "用程序或模型造出来喂训练的数据：省标注钱，但有自己的毛病。",
    "def": [
     "合成数据指由仿真程序或模型生成、而非真人真事采集的训练数据。",
     "它兴起于视觉领域：3D 场景渲染能造出像素级精确的标注，省下数十万美元人工。",
     "核心难题是「合成到真实」的迁移：合成数据不完全像真实数据。",
     "大模型时代，模型自己生成的文本也越来越多地用作训练数据。"
    ],
    "why": "模型用模型造的数据训练，效果与风险都在研究之中。听到「我们用了合成数据」，要问迁移验证做了没有。",
    "refs": [
     [
      "Nikolenko《Synthetic Data for Deep Learning》（综述，156 页）",
      "https://arxiv.org/abs/1909.11512",
      "Nikolenko, Synthetic Data for Deep Learning (survey)"
     ]
    ],
    "domain": "data",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 26,
    "alias": [],
    "purposeEn": "Data generated by programs or models to train on: saves labeling money, but has its own problems.",
    "defEn": [
     "Synthetic data is training data generated by simulation software or models rather than collected from real people and events.",
     "It rose in computer vision: 3D-rendered scenes yield pixel-perfect labels at a fraction of manual cost.",
     "The core problem is synthetic-to-real transfer: synthetic data does not fully resemble real data.",
     "In the LLM era, model-generated text is increasingly used as training data."
    ],
    "whyEn": "Training models on model-made data is an active area of risk and benefit. When a vendor says 'we used synthetic data', ask whether transfer validation was done.",
    "slug": "合成数据"
   },
   {
    "zh": "文生图",
    "en": "Text-to-Image Generation",
    "purpose": "打字变图片：扩散模型最出圈的应用，从像素空间搬进潜空间才变得可用。",
    "def": [
     "早期扩散模型直接在像素空间去噪，训练要烧数百 GPU 天。",
     "latent diffusion 论文把扩散搬进预训练自编码器的潜空间。训练与推理成本大幅下降。",
     "加入交叉注意力后，文本等条件可以直接引导生成，文生图由此成立。",
     "该论文（Stable Diffusion 的基础）2022 年发表于 CVPR。"
    ],
    "why": "「输入一句话出图」不是魔法，是这套架构组合。知道潜空间这步，才懂为什么它比早期方案便宜可用。",
    "refs": [
     [
      "Rombach 等《High-Resolution Image Synthesis with Latent Diffusion Models》（CVPR 2022）",
      "https://arxiv.org/abs/2112.10752",
      "Rombach et al., High-Resolution Image Synthesis with Latent Diffusion Models (CVPR 2022)"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 27,
    "alias": [],
    "purposeEn": "Typing turns into pictures: diffusion's most visible application — practical only after moving from pixel space to latent space.",
    "defEn": [
     "Early diffusion models denoised directly in pixel space, costing hundreds of GPU-days to train.",
     "The latent diffusion paper moved diffusion into the latent space of a pretrained autoencoder, slashing training and inference cost.",
     "Adding cross-attention let text and other conditions guide generation — making text-to-image work.",
     "That paper, the basis of Stable Diffusion, was published at CVPR 2022."
    ],
    "whyEn": "'Type a sentence, get a picture' is not magic but this architecture stack. Knowing the latent-space step explains why it is affordable where early approaches were not.",
    "slug": "文生图"
   },
   {
    "zh": "越狱",
    "en": "Jailbreak",
    "purpose": "绕过模型安全护栏的提示手法：对齐不是保险箱。",
    "def": [
     "越狱指让已对齐的模型产出它本应拒绝的内容的提示手法。",
     "早期越狱靠人工设计、且脆弱易失效。",
     "Zou 等人用自动搜索生成「对抗后缀」，一条后缀可通用于多种提问。",
     "这些后缀不止对开源模型有效。它们能迁移到 ChatGPT、Bard、Claude 等黑箱产品。"
    ],
    "why": "「这家模型很安全」的说法要打个问号。论文实测：当时主流产品都能被同一后缀突破。护栏是持续攻防，不是一次性达标。",
    "refs": [
     [
      "Zou 等《Universal and Transferable Adversarial Attacks on Aligned Language Models》",
      "https://arxiv.org/abs/2307.15043",
      "Zou et al., Universal and Transferable Adversarial Attacks on Aligned LMs"
     ]
    ],
    "domain": "agent",
    "purposeTag": "guard",
    "level": 1,
    "layer": "一",
    "ord": 28,
    "alias": [],
    "purposeEn": "Prompting tricks that bypass a model's safety guardrails: alignment is not a safe.",
    "defEn": [
     "A jailbreak makes an aligned model produce content it is supposed to refuse.",
     "Early jailbreaks were hand-crafted and brittle.",
     "Zou et al. used automated search to generate 'adversarial suffixes' — one suffix working across many different queries.",
     "These suffixes transferred to black-box products like ChatGPT, Bard, and Claude, not just open models."
    ],
    "whyEn": "'This model is safe' deserves skepticism: the paper showed major products were then breakable by one shared suffix. Guardrails are an ongoing offense-defense, not a one-time certification.",
    "slug": "越狱"
   },
   {
    "zh": "AI 安全",
    "en": "AI Safety",
    "purpose": "研究通用 AI 能做什么、有什么风险、怎么缓解的领域。已有政府背书的国际综述。",
    "def": [
     "国际 AI 安全报告由图灵奖得主 Yoshua Bengio 主持。百余位独立专家撰写。",
     "它由 30 多个国家和国际组织背书。源自 2023 年布莱切利峰会 30 国的共识。",
     "报告只汇总科学证据：能力、风险、缓解手段，不提政策建议。",
     "2026 年 2 月发布第二期，另有面向决策者的扩展摘要。"
    ],
    "why": "讨论 AI 风险时，这份报告是目前最中立的共同事实基线。引用它比引用任何单一公司的安全声明可靠。",
    "refs": [
     [
      "International AI Safety Report 官网（Bengio 主持，30+ 国背书）",
      "https://internationalaisafetyreport.org",
      "International AI Safety Report (chaired by Yoshua Bengio, backed by 30+ countries)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "guard",
    "level": 1,
    "layer": "一",
    "ord": 29,
    "alias": [],
    "purposeEn": "The field studying what general-purpose AI can do, what risks it poses, and how to mitigate them — now with a government-backed international review.",
    "defEn": [
     "The International AI Safety Report is chaired by Turing Award winner Yoshua Bengio and written by over 100 independent experts.",
     "It is backed by 30+ countries and international organizations, stemming from the 2023 Bletchley Summit consensus.",
     "The report synthesizes scientific evidence only — capabilities, risks, mitigations — without policy recommendations.",
     "Its second annual edition was published in February 2026, with an Extended Summary for Policymakers."
    ],
    "whyEn": "When debating AI risk, this report is the most neutral shared factual baseline available. Citing it beats citing any single company's safety statement.",
    "slug": "AI 安全"
   },
   {
    "zh": "图灵测试",
    "en": "Turing Test",
    "purpose": "1950 年图灵提出的经典问题：聊不出你是机器，算不算机器会思考？",
    "def": [
     "出自图灵 1950 年论文《Computing Machinery and Intelligence》，他原称「模仿游戏」。",
     "玩法：评判者与机器和真人分别对话，分不清哪个是机器，机器即通过。",
     "现代评测普遍不再把它当严格的能力指标。",
     "但它是「AI 能否以假乱真」这一整条讨论的源头。"
    ],
    "why": "「通过图灵测试」仍是媒体爱用的说法。知道它 70 多年前就提出、今天已不被专业评测当真，你才对这类标题免疫。",
    "refs": [
     [
      "Turing《Computing Machinery and Intelligence》（Mind, 1950，Oxford Academic 官方页）",
      "https://doi.org/10.1093/mind/LIX.236.433",
      "Turing, Computing Machinery and Intelligence (Mind, 1950)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 30,
    "alias": [],
    "purposeEn": "Turing's 1950 classic: if conversation can't tell machine from human, does that count as machine thinking?",
    "defEn": [
     "From Turing's 1950 paper 'Computing Machinery and Intelligence', where he called it the 'imitation game'.",
     "Setup: a judge converses with a machine and a human; if the judge can't tell which is which, the machine passes.",
     "Modern evaluation generally no longer treats it as a rigorous capability measure.",
     "But it is the source of the whole 'can AI pass as real' discussion."
    ],
    "whyEn": "'Passed the Turing test' is still a media favorite. Knowing it dates to 1950 and is no longer taken seriously by professional evaluation inoculates you against such headlines.",
    "slug": "图灵测试"
   },
   {
    "zh": "监督学习",
    "en": "Supervised Learning",
    "purpose": "给机器带答案的练习题，让它学会从题目推答案。",
    "def": [
     "训练数据每条都带正确答案，模型学着从输入推出答案。",
     "常见任务分两类：预测连续数值叫回归，判断类别叫分类。"
    ],
    "why": "大模型的预训练并不属于这一类。分清它，你才知道模型是怎么练出来的。",
    "refs": [
     [
      "scikit-learn 监督学习官方教程",
      "https://scikit-learn.org/stable/supervised_learning.html",
      "scikit-learn supervised learning tutorial"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 31,
    "alias": [],
    "purposeEn": "Give the machine practice questions with answers, so it learns to derive answers from inputs.",
    "defEn": [
     "Every training example carries the correct answer; the model learns to map input to answer.",
     "Two classic task families: predicting a continuous number is regression, deciding a category is classification."
    ],
    "whyEn": "Pretraining a large model is not this kind of learning. Telling them apart is how you understand how models are actually trained.",
    "slug": "监督学习"
   },
   {
    "zh": "无监督学习",
    "en": "Unsupervised Learning",
    "purpose": "不给答案，让机器自己在数据里找结构。",
    "def": [
     "训练数据没有标注答案，模型自己找分组、压缩或规律。",
     "聚类和降维是它的两类经典任务。"
    ],
    "why": "嵌入向量、数据分群背后常用它。它也解释了为什么没标注的数据也有价值。",
    "refs": [
     [
      "scikit-learn 无监督学习官方教程",
      "https://scikit-learn.org/stable/unsupervised_learning.html",
      "scikit-learn unsupervised learning tutorial"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 1,
    "layer": "一",
    "ord": 32,
    "alias": [],
    "purposeEn": "No answers given — the machine finds structure in the data by itself.",
    "defEn": [
     "Training data carries no labels; the model discovers groupings, compressions or patterns on its own.",
     "Clustering and dimensionality reduction are its two classic task families."
    ],
    "whyEn": "Embeddings and data grouping often rest on it. It also explains why unlabeled data still has value.",
    "slug": "无监督学习"
   },
   {
    "zh": "泛化",
    "en": "Generalization",
    "alias": [
     "举一反三"
    ],
    "purpose": "模型对没见过的数据也表现好，这才叫学会了。",
    "def": [
     "在训练数据上表现好不算数，在新数据上表现好才算。",
     "衡量它的办法：留一部分数据不参与训练，专门用来考试。"
    ],
    "why": "AI 产品宣传的分数，只有来自没见过的数据才有意义。这是判断评测真假的第一关。",
    "refs": [
     [
      "Google 机器学习速成课程 · 过拟合与泛化",
      "https://developers.google.com/machine-learning/crash-course/overfitting",
      "Google ML Crash Course: overfitting and generalization"
     ],
     [
      "Google 机器学习速成课程",
      "https://developers.google.com/machine-learning/crash-course",
      "Google Machine Learning Crash Course"
     ]
    ],
    "domain": "concept",
    "purposeTag": "judge",
    "level": 1,
    "layer": "一",
    "ord": 33,
    "purposeEn": "A model has truly learned only when it performs well on data it has never seen.",
    "defEn": [
     "Doing well on training data proves nothing; doing well on new data is what counts.",
     "How it is measured: hold part of the data out of training and use it purely as an exam."
    ],
    "whyEn": "Scores advertised by AI products only mean something if they come from unseen data. This is the first test of whether an evaluation is real.",
    "slug": "泛化"
   },
   {
    "zh": "过拟合",
    "en": "Overfitting",
    "purpose": "把练习题背熟了，换一套新题就不会做。",
    "def": [
     "模型记住了训练数据里的噪声和细节，在新数据上反而变差。",
     "训练分数一路涨、考试分数掉头向下，是它的典型信号。"
    ],
    "why": "评测造假、榜单注水多半与它有关。看到「训练集上 99 分」要警惕。",
    "refs": [
     [
      "Google 机器学习速成课程 · 过拟合",
      "https://developers.google.com/machine-learning/crash-course/overfitting",
      "Google ML Crash Course: overfitting"
     ]
    ],
    "domain": "concept",
    "purposeTag": "judge",
    "level": 1,
    "layer": "一",
    "ord": 34,
    "alias": [],
    "purposeEn": "Memorized the practice questions, then fails a different set of questions.",
    "defEn": [
     "The model memorises noise and details in the training data and gets worse on new data.",
     "The classic signal: training score keeps climbing while the exam score turns downward."
    ],
    "whyEn": "Inflated benchmarks and leaderboard games are usually tied to it. Treat \"99 on the training set\" with suspicion.",
    "slug": "过拟合"
   },
   {
    "zh": "训练集与测试集",
    "en": "Training Set, Test Set",
    "alias": [
     "训练数据",
     "测试数据"
    ],
    "purpose": "把数据分成两堆：一堆用来练，一堆留着考试。",
    "def": [
     "训练集供模型学习；测试集不参与训练，只用来评估。",
     "分数只有来自测试集，才反映真实水平。"
    ],
    "why": "同一模型在不同测试集上分数会不同。比较两个模型，先问它们考的是不是同一张卷。",
    "refs": [
     [
      "scikit-learn 模型选择与评估官方文档",
      "https://scikit-learn.org/stable/model_selection.html",
      "scikit-learn model selection and evaluation"
     ],
     [
      "Google 机器学习速成课程 · 过拟合",
      "https://developers.google.com/machine-learning/crash-course/overfitting",
      "Google ML Crash Course: overfitting"
     ]
    ],
    "domain": "data",
    "purposeTag": "judge",
    "level": 1,
    "layer": "一",
    "ord": 35,
    "purposeEn": "Split the data into two piles: one to practice with, one kept for the exam.",
    "defEn": [
     "The training set is what the model learns from; the test set never takes part in training and is used only for evaluation.",
     "A score reflects real ability only when it comes from the test set."
    ],
    "whyEn": "The same model scores differently on different test sets. When comparing two models, first ask whether they sat the same exam.",
    "slug": "训练集与测试集"
   }
  ]
 },
 {
  "num": "二",
  "name": "上手",
  "desc": "认清 AI 的能力与边界。知道它什么时候会出错，比知道它多强更重要。",
  "terms": [
   {
    "zh": "幻觉",
    "en": "Hallucination",
    "alias": [
     "胡说八道",
     "一本正经地编"
    ],
    "purpose": "模型用非常自信的语气说出看起来合理、但事实错误的内容。",
    "def": [
     "模型生成的内容不来自「查询」，而来自「预测下一个词」，所以会编。",
     "它在不熟悉的领域、以及需要精确数字和引用的地方尤其容易发生。"
    ],
    "why": "这是使用 AI 最需要防的一件事。规则很简单：**涉及事实、数字、法律、医疗的部分，必须另找来源核对**。",
    "refs": [
     [
      "幻觉综述（NLG）",
      "https://arxiv.org/abs/2202.03629",
      "Survey of Hallucination in Natural Language Generation"
     ],
     [
      "Anthropic 减少幻觉指南",
      "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations",
      "Reduce hallucinations – Claude Docs"
     ]
    ],
    "domain": "model",
    "purposeTag": "guard",
    "level": 2,
    "layer": "二",
    "ord": 1,
    "purposeEn": "The model states something plausible and confident that is simply not true.",
    "defEn": [
     "Output that is fluent and confident but factually wrong. It comes from producing likely-sounding text rather than retrieving verified facts."
    ],
    "whyEn": "It is the single biggest practical risk with language models, and the reason fact-checking matters more than ever.",
    "slug": "幻觉"
   },
   {
    "zh": "多模态",
    "en": "Multimodal",
    "alias": [
     "多模态模型"
    ],
    "purpose": "能同时看图、读文档、听声音、生成图像，不只是处理文字。",
    "def": [
     "能接收和产出多种模态（文字、图片、音频、视频）的模型或系统。"
    ],
    "why": "决定了你能不能把界面截图、设计稿、报错截图直接丢给它问。不用先转成文字。",
    "refs": [
     [
      "OpenAI 视觉能力指南",
      "https://platform.openai.com/docs/guides/vision",
      "OpenAI Vision guide"
     ],
     [
      "Claude 视觉能力文档",
      "https://platform.claude.com/docs/en/build-with-claude/vision",
      "Claude Vision documentation"
     ]
    ],
    "domain": "model",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 2,
    "purposeEn": "Handle text, images, audio and video in one system rather than bolting separate models together.",
    "defEn": [
     "A model that takes or produces more than one kind of input or output, so images and text can be reasoned about together."
    ],
    "whyEn": "It is what makes document Q&A, screenshot understanding and video generation practical rather than staged pipelines.",
    "slug": "多模态"
   },
   {
    "zh": "推理模型",
    "en": "Reasoning Model",
    "alias": [
     "思考模型",
     "带思考的模型"
    ],
    "purpose": "回答前先在内部「想」一串步骤，复杂问题的正确率明显更高。",
    "def": [
     "先产生一段中间推理过程、再给结论的模型。典型代表是带 thinking / reasoning 档位的那种。",
     "代价是速度更慢、输出更多 token。"
    ],
    "why": "选型时最该关注的一个属性。要写代码、算数、做规划，用推理模型；要快、成本低，用普通模型。",
    "refs": [
     [
      "OpenAI 推理模型指南",
      "https://platform.openai.com/docs/guides/reasoning",
      "OpenAI Reasoning models guide"
     ],
     [
      "Claude 思考机制",
      "https://platform.claude.com/docs/en/build-with-claude/thinking",
      "Thinking – Claude Docs"
     ]
    ],
    "domain": "model",
    "purposeTag": "judge",
    "level": 2,
    "layer": "二",
    "ord": 3,
    "purposeEn": "Works through a chain of internal steps before answering, which markedly improves accuracy on hard problems.",
    "defEn": [
     "A model that produces intermediate reasoning before its conclusion — typically one with a thinking or reasoning mode.",
     "The cost is slower responses and more output tokens."
    ],
    "whyEn": "The single most important attribute when choosing a model: reasoning models for coding, arithmetic and planning; ordinary models for speed and cost.",
    "slug": "推理模型"
   },
   {
    "zh": "温度",
    "en": "Temperature",
    "purpose": "控制模型输出的随机性。调低更稳，调高更有创意。",
    "def": [
     "采样时控制「每次是否选最高概率的词」这个随机程度的参数。温度为0 时输出最确定。"
    ],
    "why": "写代码、抽取信息要低温；起名字、写文案可以高温。这是你能直接调的少数参数之一。",
    "refs": [
     [
      "OpenAI 温度参数说明",
      "https://platform.openai.com/docs/guides/text-generation",
      "OpenAI temperature parameter guide"
     ],
     [
      "Gemini 模型参数（温度）",
      "https://ai.google.dev/gemini-api/docs/models/generative-models",
      "Gemini model parameters (temperature)"
     ]
    ],
    "domain": "model",
    "purposeTag": "apply",
    "level": 2,
    "layer": "二",
    "ord": 4,
    "alias": [],
    "purposeEn": "Controls how random the output is. Lower is steadier; higher is more creative.",
    "defEn": [
     "A sampling parameter controlling how often the highest-probability token is chosen. A temperature of 0 gives the most deterministic output."
    ],
    "whyEn": "Low temperature for code and extraction; high temperature for naming and copywriting. It is one of the few parameters you can adjust directly.",
    "slug": "温度"
   },
   {
    "zh": "采样 / 采样参数",
    "en": "Sampling",
    "purpose": "模型在多个候选词里怎么挑，决定输出的发散程度。",
    "def": [
     "一组控制生成过程的参数统称：温度、Top-p、Top-k 等。",
     "它们只影响「怎么挑词」，不影响模型本身的智商。"
    ],
    "why": "知道这组参数后，模型输出的不稳定就有了可解释的原因。而不是「它今天抽风」。",
    "refs": [
     [
      "Gemini 采样参数（topK/topP）",
      "https://ai.google.dev/gemini-api/docs/models/generative-models",
      "Gemini sampling parameters (topK/topP)"
     ],
     [
      "Anthropic Messages 采样参数",
      "https://platform.claude.com/docs/en/build-with-claude/working-with-messages",
      "Anthropic Messages API sampling parameters"
     ]
    ],
    "domain": "model",
    "purposeTag": "apply",
    "level": 2,
    "layer": "二",
    "ord": 5,
    "alias": [],
    "purposeEn": "How the model picks among candidate tokens — this determines how far the output diverges.",
    "defEn": [
     "A collective term for parameters controlling generation: temperature, Top-p, Top-k and so on.",
     "They affect only how a token is chosen, not the intelligence of the model itself."
    ],
    "whyEn": "Once you know these parameters, unstable output has an explainable cause instead of \"it was feeling odd today\".",
    "slug": "采样 - 采样参数"
   },
   {
    "zh": "系统提示",
    "en": "System Prompt",
    "purpose": "给模型设定的角色和规则，决定它整个对话的基调。",
    "def": [
     "在用户输入之外，由应用开发者预设的一段指令，用来约束行为和输出格式。"
    ],
    "why": "它是「同一个模型，不同应用表现完全不同」的原因。你用的每个 AI 产品背后都有一份系统提示。",
    "refs": [
     [
      "Anthropic 系统提示修改指南",
      "https://platform.claude.com/docs/en/agent-sdk/modifying-system-prompts",
      "Anthropic Modifying system prompts"
     ],
     [
      "OpenAI 消息角色（system）说明",
      "https://help.openai.com/zh-hans-cn/articles/7042661-moving-from-completions-to-chat-completions-in-the-openai-api",
      "OpenAI chat roles / system message"
     ]
    ],
    "domain": "model",
    "purposeTag": "apply",
    "level": 2,
    "layer": "二",
    "ord": 6,
    "alias": [],
    "purposeEn": "The role and rules set for a model, which determine the tone of the whole conversation.",
    "defEn": [
     "Instructions preset by the application developer, outside the user's input, constraining behaviour and output format."
    ],
    "whyEn": "It is why the same model behaves so differently across applications. Every AI product you use has one behind it.",
    "slug": "系统提示"
   },
   {
    "zh": "微调",
    "en": "Fine-tuning",
    "purpose": "拿一个已有的模型，用你自己的数据继续训练，让它更懂你的领域。",
    "def": [
     "在已有模型的权重基础上继续训练，通常用较少的数据和时间。",
     "它和「提示词」是两种不同手段：提示词改行为，微调改能力倾向。"
    ],
    "why": "多数场景你**不需要**微调。先用提示词和 RAG，不够再考虑微调。两者成本差一个量级。",
    "refs": [
     [
      "OpenAI 微调指南",
      "https://platform.openai.com/docs/guides/fine-tuning",
      "OpenAI model optimization / fine-tuning guide"
     ],
     [
      "Azure OpenAI 微调",
      "https://learn.microsoft.com/en-AU/azure/ai-services/openai/how-to/fine-tuning",
      "Customize a model with fine-tuning – Azure OpenAI"
     ]
    ],
    "domain": "model",
    "purposeTag": "apply",
    "level": 2,
    "layer": "二",
    "ord": 7,
    "alias": [],
    "purposeEn": "Teach an existing model a specific task or style, rather than describing the task in the prompt.",
    "defEn": [
     "Further training of an already-trained model on task-specific data, changing its weights rather than its instructions."
    ],
    "whyEn": "It can beat prompting for a narrow task, but it costs more and is harder to maintain. Prompting first is usually the right order.",
    "slug": "微调"
   },
   {
    "zh": "偏好对齐",
    "en": "RLHF / Alignment",
    "purpose": "让模型的输出符合人类偏好，而不是只会续写文本。",
    "def": [
     "用人类对多个候选回答的排序来训练模型，让它更倾向于给出有帮助、无害、诚实的回答。"
    ],
    "why": "它解释了为什么模型有时候会「不肯回答」或「过度客气」。那是训练出来的，不是技术限制。",
    "refs": [
     [
      "InstructGPT（RLHF 论文）",
      "https://arxiv.org/abs/2203.02155",
      "Training LMs to follow instructions with human feedback"
     ],
     [
      "从业者深版：偏好对齐专题（AI 模型站）",
      "https://models.specul.com/guides/alignment.html",
      "Practitioner deep-dive: preference alignment (AI Models site)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 8,
    "alias": [],
    "purposeEn": "Makes a model's output match human preference, rather than merely continuing text.",
    "defEn": [
     "Training a model on human rankings of several candidate answers so it tends to be helpful, harmless and honest."
    ],
    "whyEn": "It explains why a model sometimes refuses or is excessively agreeable — that is trained behaviour, not a technical limit.",
    "slug": "偏好对齐"
   },
   {
    "zh": "知识截止",
    "en": "Knowledge Cutoff",
    "purpose": "模型训练数据的时间边界。边界之后的事它不知道。",
    "def": [
     "模型训练数据截止的日期。晚于这个日期的信息，它没有学过。"
    ],
    "why": "问它最近的事件、今天的新闻、价格，它要么不知道要么会编。涉及最新信息必须配搜索。",
    "refs": [
     [
      "OpenAI 模型目录（知识截止）",
      "https://developers.openai.com/api/docs/models",
      "OpenAI models catalog (knowledge cutoff)"
     ],
     [
      "Anthropic 模型概览（知识截止）",
      "https://platform.claude.com/docs/en/about-claude/models/overview",
      "Anthropic models overview (knowledge cutoff)"
     ]
    ],
    "domain": "model",
    "purposeTag": "guard",
    "level": 2,
    "layer": "二",
    "ord": 9,
    "alias": [],
    "purposeEn": "The date boundary of a model's training data. Anything after it, the model does not know.",
    "defEn": [
     "The cut-off date of the training corpus. Information later than that was never learned."
    ],
    "whyEn": "Ask it about recent events, today's news or current prices and it either does not know or makes something up. Anything current needs search.",
    "slug": "知识截止"
   },
   {
    "zh": "联网 / 检索增强",
    "en": "Retrieval-Augmented Generation, RAG",
    "alias": [
     "RAG",
     "检索增强"
    ],
    "purpose": "回答之前先去查资料，把查到的内容塞进上下文里再回答。",
    "def": [
     "一种做法：先从你的文档或数据库里检索相关片段，再让模型基于这些片段作答。",
     "它解决的是「模型不知道你的私有资料」和「知识会过时」两个问题。"
    ],
    "why": "这是让模型用上你的私有文档最实用的手段，通常比微调更便宜也更安全。",
    "refs": [
     [
      "context7 用 MCP 喂文档的方案",
      "https://agent.specul.com/tools/context7.html",
      "Feeding docs via MCP (context7)"
     ],
     [
      "LlamaIndex 文档解析",
      "https://agent.specul.com/harness/llamaindex.html",
      "LlamaIndex document parsing"
     ],
     [
      "Pinecone RAG 指南",
      "https://www.pinecone.io/learn/retrieval-augmented-generation/",
      "Retrieval-Augmented Generation (RAG) – Pinecone"
     ]
    ],
    "domain": "data",
    "purposeTag": "apply",
    "level": 2,
    "layer": "二",
    "ord": 10,
    "purposeEn": "Let the model look things up before answering, instead of answering from memory alone.",
    "defEn": [
     "Retrieval-augmented generation: fetch relevant passages first, then have the model answer using them, ideally with citations."
    ],
    "whyEn": "It is the most practical way to reduce hallucination and give a model private or current knowledge.",
    "slug": "联网 - 检索增强"
   },
   {
    "zh": "向量 / 嵌入",
    "en": "Embedding / Vector",
    "purpose": "把一段文字变成一串数字。机器于是能按「意思相近」而不是「字面相同」来检索。",
    "def": [
     "把文本映射成高维数字数组，相近含义的文本会得到相近的向量。",
     "它是「语义搜索」的实现基础。搜「怎么退货」能命中讲「退款流程」的文档，靠的是这个。"
    ],
    "why": "它解释了 RAG 里的「检索」到底在检索什么。它也是向量数据库存在的原因。",
    "refs": [
     [
      "向量与上下文",
      "https://agent.specul.com/tools/context7.html",
      "Vectors and context (context7)"
     ]
    ],
    "domain": "data",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 11,
    "alias": [],
    "purposeEn": "Represent text as coordinates, so meaning can be compared by geometry rather than by string match.",
    "defEn": [
     "Turning text into a list of numbers where closer vectors mean closer meaning. It is how semantic search and retrieval work."
    ],
    "whyEn": "Most retrieval systems are built on it. It also explains why keyword search still matters alongside vector search.",
    "slug": "向量 - 嵌入"
   },
   {
    "zh": "向量数据库",
    "en": "Vector Database",
    "purpose": "专门存和查这些数字数组的数据库。RAG 能在百万份文档里瞬间找到相关的那几段，靠的就是它。",
    "def": [
     "为「按相似度检索」设计的存储引擎，传统数据库做不了这种查询。"
    ],
    "why": "如果你要做 RAG，这就是必需件。理解它能帮你判断一个方案为什么快、为什么慢。",
    "refs": [
     [
      "Qdrant 什么是向量数据库",
      "https://qdrant.tech/documentation/overview/what-is-qdrant/",
      "What is Qdrant? Vector databases"
     ],
     [
      "向量数据库概念",
      "https://qdrant.tech/articles/what-is-a-vector-database/",
      "What is a Vector Database? – Qdrant"
     ]
    ],
    "domain": "data",
    "purposeTag": "apply",
    "level": 2,
    "layer": "二",
    "ord": 12,
    "alias": [],
    "purposeEn": "A database built to store and search those numeric arrays, so RAG can find the relevant passages among millions of documents in an instant.",
    "defEn": [
     "Storage engines designed for similarity search — a query traditional databases cannot serve."
    ],
    "whyEn": "If you are building RAG this is a must-have. Understanding it tells you why an approach is fast or slow.",
    "slug": "向量数据库"
   },
   {
    "zh": "分块",
    "en": "Chunking",
    "purpose": "把长文档切成小块再送进模型。切得好不好，直接决定回答准不准。",
    "def": [
     "RAG 流程里把文档切成段落的过程。切太小丢上下文，切太大塞不进上下文窗口。"
    ],
    "why": "它是 RAG 里最容易被忽略、却最影响效果的环节。很多「AI 答得不准」的原因是切块切坏了。",
    "refs": [
     [
      "Chroma 分块指南",
      "https://docs.trychroma.com/guides/build/chunking",
      "Chunking – Chroma Docs"
     ]
    ],
    "domain": "data",
    "purposeTag": "apply",
    "level": 2,
    "layer": "二",
    "ord": 13,
    "alias": [],
    "purposeEn": "Cut a long document into pieces before feeding it to the model. How you chunk decides how accurate the answer is.",
    "defEn": [
     "The step in a RAG pipeline that splits a document into passages. Too small loses context; too large does not fit the context window."
    ],
    "whyEn": "The most overlooked yet most consequential step in RAG. Many \"the AI answered wrongly\" cases trace back to bad chunking.",
    "slug": "分块"
   },
   {
    "zh": "扩散模型",
    "en": "Diffusion Model",
    "purpose": "生成图片的主流方法：从一片噪声一步步「擦」出图像。",
    "def": [
     "从随机噪声开始，通过多步去噪逐步生成图像的生成模型。",
     "现在绝大多数图像生成工具都基于它。开源的 Stable Diffusion 系列也是。"
    ],
    "why": "它是图像生成的技术底座。理解它就理解了为什么生图要等一会儿、以及为什么「步数」是个参数。",
    "refs": [
     [
      "DDPM 去噪扩散概率模型论文",
      "https://arxiv.org/abs/2006.11239",
      "Denoising Diffusion Probabilistic Models (DDPM)"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 14,
    "alias": [],
    "purposeEn": "The dominant method for image generation: \"wipe\" an image out of noise step by step.",
    "defEn": [
     "A generative model that starts from random noise and produces an image through many denoising steps.",
     "Almost every image-generation tool today, including the open-source Stable Diffusion family, is built on it."
    ],
    "whyEn": "It is the technical base of image generation. Understanding it explains why generation takes a moment and why \"steps\" is a parameter.",
    "slug": "扩散模型"
   },
   {
    "zh": "潜空间",
    "en": "Latent Space",
    "purpose": "图像生成的关键机制——模型在压缩后的空间里处理，而不是原始像素。",
    "def": [
     "先用编码器把图像压缩到低维空间，生成过程在这个空间进行，最后解码回图像。"
    ],
    "why": "它解释了为什么生图模型要「加载 VAE」。它也解释了为什么压缩过程会影响细节。",
    "refs": [
     [
      "潜扩散模型（LDM）原论文",
      "https://arxiv.org/abs/2112.10752",
      "High-Resolution Image Synthesis with Latent Diffusion Models"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 15,
    "alias": [],
    "purposeEn": "The key mechanism in image generation — the model works in a compressed space, not on raw pixels.",
    "defEn": [
     "An encoder first compresses an image into a lower-dimensional space; generation happens there and a decoder restores it."
    ],
    "whyEn": "It explains why image models need to load a VAE, and why that compression affects fine detail.",
    "slug": "潜空间"
   },
   {
    "zh": "CLIP",
    "en": "Contrastive Language-Image Pre-training",
    "purpose": "让模型理解「文字描述」和「图片内容」的对应关系，是文生图的基础。",
    "def": [
     "把图片和文字映射到同一空间，让「一只猫」这句话能对应到猫的图像特征。"
    ],
    "why": "几乎所有文生图工具都内置它。它决定了模型对提示词的理解能力上限。",
    "refs": [
     [
      "CLIP 原论文（OpenAI）",
      "https://arxiv.org/abs/2103.00020",
      "CLIP: Learning Transferable Visual Models"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 16,
    "alias": [],
    "purposeEn": "Lets a model relate text descriptions to image content — the foundation of text-to-image generation.",
    "defEn": [
     "Maps images and text into the same space, so the phrase \"a cat\" lands near the visual features of cats."
    ],
    "whyEn": "Nearly every text-to-image tool ships it. It sets the ceiling on how well a model understands a prompt.",
    "slug": "CLIP"
   },
   {
    "zh": "ControlNet",
    "en": "ControlNet",
    "purpose": "让你用线稿、深度图、姿态图精确控制生成结果。",
    "def": [
     "附加在扩散模型上的控制网络，用结构图约束生成内容的形状和姿态。"
    ],
    "why": "它是图像生成里最实用的控制手段，做精确构图时的必需品。",
    "refs": [
     [
      "ControlNet 原论文（Stanford）",
      "https://arxiv.org/abs/2302.05543",
      "Adding Conditional Control to Text-to-Image Diffusion Models"
     ]
    ],
    "domain": "media",
    "purposeTag": "apply",
    "level": 2,
    "layer": "二",
    "ord": 17,
    "alias": [],
    "purposeEn": "Gives precise control over the result using line art, depth maps or pose skeletons.",
    "defEn": [
     "A control network attached to a diffusion model, constraining the shape and pose of what gets generated."
    ],
    "whyEn": "The most practical control mechanism in image generation, and essential when you need an exact composition.",
    "slug": "ControlNet"
   },
   {
    "zh": "语音识别",
    "en": "ASR, Automatic Speech Recognition",
    "alias": [
     "ASR",
     "语音转文字"
    ],
    "purpose": "把说的话转成文字。",
    "def": [
     "将音频信号转换为文本的技术，也叫语音转写。"
    ],
    "why": "它是所有语音交互的入口。转写质量直接决定后续理解质量。",
    "refs": [
     [
      "Whisper 语音识别论文",
      "https://arxiv.org/abs/2212.04356",
      "Robust Speech Recognition via Large-Scale Weak Supervision"
     ],
     [
      "OpenAI 官方博客：Whisper",
      "https://openai.com/index/whisper/",
      "OpenAI: Introducing Whisper"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 18,
    "purposeEn": "Turn what was said into text.",
    "defEn": [
     "Technology converting an audio signal into text, also called speech-to-text."
    ],
    "whyEn": "It is the entry point for all voice interaction, and transcription quality directly caps how well the rest of the system understands.",
    "slug": "语音识别"
   },
   {
    "zh": "语音合成",
    "en": "TTS, Text-to-Speech",
    "alias": [
     "TTS",
     "文字转语音"
    ],
    "purpose": "把文字读出来。",
    "def": [
     "把文本转换为自然语音的技术。"
    ],
    "why": "做语音功能时的输出端。现在可以生成接近真人的语气和情感。",
    "refs": [
     [
      "Tacotron 2 语音合成论文",
      "https://arxiv.org/abs/1712.05884",
      "Natural TTS Synthesis (Tacotron 2)"
     ],
     [
      "VITS 端到端语音合成论文",
      "https://arxiv.org/abs/2106.06103",
      "VITS: Conditional VAE for End-to-End TTS"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 19,
    "purposeEn": "Read text out loud.",
    "defEn": [
     "Technology converting text into natural-sounding speech."
    ],
    "whyEn": "It is the output side of any voice feature. It can now produce tone and emotion close to a real person.",
    "slug": "语音合成"
   },
   {
    "zh": "数字人",
    "en": "Digital Avatar",
    "purpose": "有形象和声音的虚拟人，可用于客服、虚拟主播等场景。",
    "def": [
     "结合了语音合成、图像生成与驱动技术的虚拟人物形态。"
    ],
    "why": "它是多模态能力的综合应用，也是导航站里一个独立的内容分类。",
    "refs": [
     [
      "NVIDIA ACE 数字人平台",
      "https://developer.nvidia.com/omniverse/ace",
      "NVIDIA ACE (Avatar Cloud Engine)"
     ],
     [
      "NVIDIA Tokkio 数字人定制文档",
      "https://docs.nvidia.com/ace/tokkio/5.0/customization/customization-options.html",
      "NVIDIA Tokkio Digital Human Customization Docs"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 20,
    "alias": [],
    "purposeEn": "A virtual person with an appearance and a voice, used for customer service, virtual presenters and similar.",
    "defEn": [
     "A virtual human form combining speech synthesis, image generation and animation."
    ],
    "whyEn": "It is a combined application of multimodal capability, and a category of its own in this directory.",
    "slug": "数字人"
   },
   {
    "zh": "AI 搜索",
    "en": "AI Search",
    "purpose": "不用关键词，而是用一句话描述你想要什么，直接给答案。",
    "def": [
     "理解自然语言查询、直接生成回答的搜索产品。"
    ],
    "why": "它改变了「找资料」的方式，也部分替代了传统搜索引擎。",
    "refs": [
     [
      "OpenAI 网页搜索工具指南",
      "https://platform.openai.com/docs/guides/tools-web-search",
      "OpenAI Web Search tool guide"
     ],
     [
      "Google 搜索接地",
      "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search",
      "Grounding with Google Search – Google Cloud"
     ]
    ],
    "domain": "model",
    "purposeTag": "apply",
    "level": 2,
    "layer": "二",
    "ord": 21,
    "alias": [],
    "purposeEn": "Describe what you want in a sentence instead of keywords, and get an answer directly.",
    "defEn": [
     "Search products that understand natural-language queries and generate an answer instead of returning links."
    ],
    "whyEn": "It changes how you look things up, and partly replaces conventional search engines.",
    "slug": "AI 搜索"
   },
   {
    "zh": "视频生成",
    "en": "Video Generation",
    "purpose": "从文字或图片生成短视频片段。",
    "def": [
     "用扩散或自回归方式生成视频序列的模型，能产出数秒到数十秒的片段。"
    ],
    "why": "这是当前生成式 AI 里最不成熟的方向，时长与一致性仍是主要限制。",
    "refs": [
     [
      "导航站的多模态生成分类",
      "https://nav.specul.com/",
      "Nav directory: multimodal generation"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 22,
    "alias": [],
    "purposeEn": "Generating short video clips from text or images.",
    "defEn": [
     "Producing video content conditioned on a text prompt or a still image."
    ],
    "whyEn": "It is the next step beyond image generation, and the gap between a striking demo and controllable output is still wide.",
    "slug": "视频生成"
   },
   {
    "zh": "具身智能",
    "en": "Embodied AI",
    "purpose": "让 AI 有身体、能感知环境并做出动作——机器人那一套。",
    "def": [
     "把 AI 能力延伸到物理世界的技术体系，包含感知、控制与规划。"
    ],
    "why": "这是 AI 里离日常生活最远的一支。它也是导航站条目最多的分类（87 条）。",
    "refs": [
     [
      "导航站的机器人分类",
      "https://nav.specul.com/",
      "Nav directory: robotics"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 23,
    "alias": [],
    "purposeEn": "Giving AI a body so it can sense its surroundings and act — the robotics side of things.",
    "defEn": [
     "A technology system extending AI into the physical world, covering perception, control and planning."
    ],
    "whyEn": "It is the branch of AI furthest from everyday life, and also the largest category in this directory (87 entries).",
    "slug": "具身智能"
   },
   {
    "zh": "机器视觉",
    "en": "Computer Vision",
    "purpose": "让摄像头「看懂」画面——识别人、物体、文字、动作。",
    "def": [
     "让计算机从图像和视频中提取并理解信息的技术。"
    ],
    "why": "它是自动驾驶、安防、医疗影像的技术基础。它与多模态大模型是同一方向的两个阶段。",
    "refs": [
     [
      "斯坦福 CS231n 计算机视觉课程",
      "https://cs231n.stanford.edu/",
      "Stanford CS231n: Deep Learning for Computer Vision"
     ],
     [
      "AlexNet 论文（ImageNet）",
      "https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf",
      "ImageNet Classification with Deep CNNs"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 24,
    "alias": [],
    "purposeEn": "Lets a camera \"see\" — recognise people, objects, text and actions.",
    "defEn": [
     "Technology that extracts and understands information from images and video."
    ],
    "whyEn": "The technical foundation of autonomous driving, security and medical imaging — two stages along the same direction as multimodal models.",
    "slug": "机器视觉"
   },
   {
    "zh": "自动驾驶",
    "en": "Autonomous Driving",
    "purpose": "车辆自己识别环境、规划路线并控制方向盘。",
    "def": [
     "用传感器融合与 AI 决策实现车辆自主行驶的技术体系。"
    ],
    "why": "它是具身智能里最成熟、最有明确分级标准的应用场景。",
    "refs": [
     [
      "Waymo 官方：车辆如何行驶",
      "https://support.google.com/waymo/answer/9190838",
      "Waymo: How our cars drive"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 25,
    "alias": [],
    "purposeEn": "The vehicle senses its surroundings, plans a route and controls the steering itself.",
    "defEn": [
     "A technology system for autonomous driving using sensor fusion and AI decision-making."
    ],
    "whyEn": "The most mature application of embodied AI, and the one with clear established grading levels.",
    "slug": "自动驾驶"
   },
   {
    "zh": "AI 芯片",
    "en": "AI Accelerator",
    "alias": [
     "AI 加速卡"
    ],
    "purpose": "专门做 AI 运算的芯片，比通用 GPU 更高效但生态更封闭。",
    "def": [
     "为矩阵运算优化的处理器，通常指各类 AI 专用加速硬件。"
    ],
    "why": "它决定了你能把多大的模型塞进多少钱的设备里。",
    "refs": [
     [
      "导航站的算力与芯片分类",
      "https://nav.specul.com/",
      "Nav directory: compute & chips"
     ],
     [
      "从业者深版：数据与算力专题（AI 模型站）",
      "https://models.specul.com/guides/data-compute.html",
      "Practitioner deep-dive: data & compute guide (AI Models site)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 26,
    "purposeEn": "Chips built specifically for AI computation — more efficient than general GPUs, but with a more closed ecosystem.",
    "defEn": [
     "Processors optimised for matrix computation, usually referring to AI-specific accelerator hardware of various kinds."
    ],
    "whyEn": "It determines how large a model you can fit onto a device at a given price.",
    "slug": "AI 芯片"
   },
   {
    "zh": "校准",
    "en": "Calibration",
    "purpose": "模型报出的自信程度，经常高于它的实际正确率：自信不等于对。",
    "def": [
     "Guo 等人 2017 年的发现：现代神经网络普遍校准不佳。",
     "表现是输出的置信度与实际正确率不符，常表现为过度自信。",
     "大模型一本正经地自信说错，正是这个问题的直观呈现。",
     "论文提出了温度缩放等事后校正手段。"
    ],
    "why": "模型说「我确定」不是统计保证。知道置信度普遍虚高，你对「自信地错」的答案会多一分警惕。",
    "refs": [
     [
      "Guo 等《On Calibration of Modern Neural Networks》（ICML 2017）",
      "https://arxiv.org/abs/1706.04599",
      "Guo et al., On Calibration of Modern Neural Networks (ICML 2017)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "judge",
    "level": 2,
    "layer": "二",
    "ord": 27,
    "alias": [],
    "purposeEn": "A model's stated confidence often exceeds its actual accuracy: confident is not the same as correct.",
    "defEn": [
     "Guo et al. 2017: modern neural networks are poorly calibrated.",
     "The symptom: output confidence does not match real accuracy, usually overconfidence.",
     "A large model confidently stating something wrong is this problem in plain view.",
     "The paper proposed post-hoc fixes such as temperature scaling."
    ],
    "whyEn": "'I'm sure' from a model is not a statistical guarantee. Knowing confidence is generally inflated makes you more wary of confidently wrong answers.",
    "slug": "校准"
   },
   {
    "zh": "LoRA",
    "en": "LoRA (Low-Rank Adaptation)",
    "purpose": "省钱的微调法：冻住原权重，只训练一小块「补丁」。",
    "def": [
     "LoRA 冻结预训练权重，往每层注入可训练的低秩分解矩阵。",
     "对比 GPT-3 175B 全量微调：可训练参数约少一万倍，显存需求约降三倍。",
     "训练完可把低秩矩阵并入原权重，不增加推理延迟。",
     "社区里大量消费级显卡上跑出来的微调模型用的就是它。"
    ],
    "why": "「在自家显卡上微调」从科幻变成日常，LoRA 是分水岭。选微调方案时它是默认起点。",
    "refs": [
     [
      "Hu 等《LoRA: Low-Rank Adaptation of Large Language Models》（2021）",
      "https://arxiv.org/abs/2106.09685",
      "Hu et al., LoRA: Low-Rank Adaptation of Large Language Models (2021)"
     ]
    ],
    "domain": "model",
    "purposeTag": "apply",
    "level": 2,
    "layer": "二",
    "ord": 28,
    "alias": [],
    "purposeEn": "Budget fine-tuning: freeze the original weights, train only a small 'patch'.",
    "defEn": [
     "LoRA freezes pre-trained weights and injects trainable low-rank decomposition matrices into each layer.",
     "Versus full fine-tuning of GPT-3 175B: about 10,000x fewer trainable parameters and roughly 3x less GPU memory.",
     "After training the low-rank matrices can be merged into the weights, adding no inference latency.",
     "Many community fine-tunes trained on consumer GPUs use it."
    ],
    "whyEn": "LoRA is the watershed that made 'fine-tune on your own GPU' routine. It is the default starting point when choosing a fine-tuning approach.",
    "slug": "LoRA"
   },
   {
    "zh": "流式输出",
    "en": "Streaming Output",
    "purpose": "回答边生成边推送：你看到逐字出现，而不是等全文算完。",
    "def": [
     "自回归模型逐 token 生成，流式模式把每个 token 即时推送给客户端。",
     "常见实现是 SSE（服务器推送事件流）：服务器以事件流持续下发。",
     "价值在首字延迟：长回答不必等全部算完才开始读。",
     "中途可停：取消请求即停止生成与计费。"
    ],
    "why": "聊天界面的逐字效果、为什么能中途打断、为什么按输出 token 计费——都来自这个机制。",
    "refs": [
     [
      "MDN《Using server-sent events》（SSE 事件流机制的权威文档）",
      "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events",
      "MDN: Using server-sent events (SSE)"
     ],
     [
      "GPT-3 论文（自回归逐 token 生成的定义）",
      "https://arxiv.org/abs/2005.14165",
      "GPT-3 paper (autoregressive token-by-token generation)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 2,
    "layer": "二",
    "ord": 29,
    "alias": [],
    "purposeEn": "Answers stream out as they are generated: you read word by word instead of waiting for the full text.",
    "defEn": [
     "Autoregressive models generate token by token; streaming pushes each token to the client immediately.",
     "A common implementation is SSE (server-sent events): the server delivers a continuous event stream.",
     "The value is time-to-first-token: long answers don't wait for full computation before you start reading.",
     "It can be stopped mid-way: canceling the request stops generation and billing."
    ],
    "whyEn": "The word-by-word effect in chat UIs, why you can interrupt, why output tokens are billed — all come from this mechanism.",
    "slug": "流式输出"
   },
   {
    "zh": "拒答",
    "en": "Refusal",
    "purpose": "模型对某些请求直接拒绝回答：安全对齐的直接产物。",
    "def": [
     "对齐训练的目标就是让模型拒绝产出不当内容。",
     "Zou 等人的攻击研究以此为前提：他们的攻击目标是让模型「给出肯定回答而非拒绝」。",
     "拒答是护栏起作用的信号，也是误伤正常请求时的摩擦来源。",
     "同一个请求在不同家模型上拒与不拒差异很大，这是产品间的真实差异。"
    ],
    "why": "遇到拒答，你该知道这不是「模型坏了」，而是对齐在工作。评估一家模型时，拒答边界的松紧是选型维度。",
    "refs": [
     [
      "Zou 等《Universal and Transferable Adversarial Attacks on Aligned Language Models》（对齐与拒答的表述出处）",
      "https://arxiv.org/abs/2307.15043",
      "Zou et al., Universal and Transferable Adversarial Attacks (alignment/refusal context)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "guard",
    "level": 2,
    "layer": "二",
    "ord": 30,
    "alias": [],
    "purposeEn": "The model flatly declines certain requests: a direct product of safety alignment.",
    "defEn": [
     "Alignment training aims precisely at making models refuse to produce disallowed content.",
     "Zou et al.'s attack research takes this as its premise: their attack aims for 'an affirmative response rather than refusing to answer'.",
     "Refusal is a signal the guardrails are working — and a source of friction when legitimate requests get caught.",
     "The same request refused by one vendor and answered by another is a real product difference."
    ],
    "whyEn": "When refused, you should know the model isn't 'broken' — alignment is working. When evaluating models, refusal boundaries are a selection dimension.",
    "slug": "拒答"
   },
   {
    "zh": "红队测试",
    "en": "Red Teaming",
    "purpose": "发布前雇人主动攻击模型找漏洞：安全声明背后的实际工序。",
    "def": [
     "红队测试指以对抗性方式测试系统、找出潜在漏洞。",
     "Anthropic 官方表述：红队是提升 AI 安全的关键工具。",
     "前沿实验室在部署前做内部评测，并引入外部红队（含众包平台）。",
     "Anthropic 自己也承认：红队缺乏标准化实践，各家做法差异大。"
    ],
    "why": "「经过安全测试」的含金量取决于红队怎么做的。知道没有统一标准，你才会去问测试细节。",
    "refs": [
     [
      "Anthropic 官方《Challenges in red teaming AI systems》",
      "https://anthropic.com/news/challenges-in-red-teaming-ai-systems",
      "Anthropic: Challenges in red teaming AI systems"
     ]
    ],
    "domain": "concept",
    "purposeTag": "guard",
    "level": 2,
    "layer": "二",
    "ord": 31,
    "alias": [],
    "purposeEn": "Hiring people to attack a model before release to find holes: the real process behind safety claims.",
    "defEn": [
     "Red teaming means testing a system adversarially to identify potential vulnerabilities.",
     "Anthropic's official framing: red teaming is a critical tool for improving AI safety.",
     "Frontier labs run internal evaluations before deployment and bring in external red teamers, including crowdworker platforms.",
     "Anthropic itself concedes red teaming lacks standardized practice; approaches differ widely."
    ],
    "whyEn": "'Tested for safety' is only as strong as how the red teaming was done. Knowing there is no uniform standard makes you ask for details.",
    "slug": "红队测试"
   },
   {
    "zh": "水印与内容凭证",
    "en": "Watermarks and Content Credentials",
    "purpose": "识别 AI 生成内容的两条路：嵌进内容的水印，和记录出处的元数据。",
    "def": [
     "DeepMind 的 SynthID 把不可见数字水印直接嵌入生成内容本身。图像、音频、文本、视频都覆盖。",
     "水印人眼不可察觉，但可被检测技术识别。",
     "C2PA「内容凭证」走另一条路：用元数据记录内容的出处与编辑历史。",
     "两者互补：一个改内容本身，一个改内容的说明书。"
    ],
    "why": "「这段内容是不是 AI 做的」目前没有万能答案。知道两条技术路线各自的强弱，才不会被「AI 检测器」的绝对承诺骗到。",
    "refs": [
     [
      "Google DeepMind 官方 SynthID 页",
      "https://deepmind.google/technologies/synthid/",
      "Google DeepMind SynthID (official page)"
     ],
     [
      "C2PA 官方（Coalition for Content Provenance and Authenticity）",
      "https://c2pa.org",
      "C2PA: Coalition for Content Provenance and Authenticity"
     ]
    ],
    "domain": "media",
    "purposeTag": "guard",
    "level": 2,
    "layer": "二",
    "ord": 32,
    "alias": [],
    "purposeEn": "Two routes to identify AI-generated content: watermarks embedded in the content, provenance metadata beside it.",
    "defEn": [
     "DeepMind's SynthID embeds invisible digital watermarks directly into generated images, audio, text, or video.",
     "The watermarks are imperceptible to humans but detectable by matching technology.",
     "C2PA 'Content Credentials' takes the other route: metadata recording the content's origin and edit history.",
     "They complement each other: one changes the content itself, one changes its paperwork."
    ],
    "whyEn": "'Is this AI-made?' has no universal answer yet. Knowing each route's strengths keeps you from being sold absolute promises by 'AI detectors'.",
    "slug": "水印与内容凭证"
   },
   {
    "zh": "深度伪造",
    "en": "Deepfake",
    "purpose": "用生成模型造出以假乱真的真人音视频：眼见不再为实。",
    "def": [
     "深度伪造指用深度学习合成或篡改的图像、音频、视频。人难以辨真伪，且常以真实人物为对象。",
     "综述指出：deepfake 算法能造出与真实影像无法区分的假内容。",
     "检测与生成是一场持续军备竞赛，检测器普遍滞后于生成器。",
     "滥用场景包括冒充真人诈骗、伪造事件影像。"
    ],
    "why": "看到「实拍」视频先问一句有没有可能是合成的。涉及钱和决策的音视频，要换渠道二次确认。",
    "refs": [
     [
      "Vasco 等《Deep Learning for Deepfakes Creation and Detection: A Survey》",
      "https://arxiv.org/abs/1909.11573",
      "Survey: Deep Learning for Deepfakes Creation and Detection"
     ]
    ],
    "domain": "media",
    "purposeTag": "guard",
    "level": 2,
    "layer": "二",
    "ord": 33,
    "alias": [],
    "purposeEn": "Generative models producing indistinguishable fake video and audio of real people: seeing is no longer believing.",
    "defEn": [
     "Deepfakes are deep-learning-synthesized or manipulated images, audio, or video that humans struggle to distinguish from authentic ones, often targeting real people.",
     "Surveys: deepfake algorithms can create fake media indistinguishable from authentic media.",
     "Detection and generation are an ongoing arms race; detectors generally lag generators.",
     "Abuse scenarios include impersonation scams and fabricated footage of events."
    ],
    "whyEn": "When you see 'real footage', ask first whether it could be synthetic. For audio and video involving money or decisions, verify through a second channel.",
    "slug": "深度伪造"
   },
   {
    "zh": "偏见",
    "en": "Bias",
    "purpose": "模型在不同人群、语言、文化上的表现不均：源头在训练数据。",
    "def": [
     "国际 AI 安全报告指出：模型在训练数据里少见的语言与文化语境中表现下降。",
     "表现的不均直接归因于训练数据的分布。",
     "语料本身携带的刻板印象会被模型学到并复述。",
     "人对 AI 建议不加检查就接受（自动化偏见）是另一层问题，别与模型偏见混为一谈。"
    ],
    "why": "同一个模型对不同的人不一定一样好。评估 AI 产品时，「对你所在的语境表现如何」是必问题。",
    "refs": [
     [
      "International AI Safety Report 2026《Extended Summary for Policymakers》（能力与语境表现章节）",
      "https://internationalaisafetyreport.org/publication/2026-report-extended-summary-policymakers",
      "International AI Safety Report 2026, Extended Summary for Policymakers"
     ],
     [
      "GPT-3 论文（大规模网络语料的方法学问题，§2.2）",
      "https://arxiv.org/abs/2005.14165",
      "GPT-3 paper (methodological issues of large web corpora, §2.2)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "guard",
    "level": 2,
    "layer": "二",
    "ord": 34,
    "alias": [],
    "purposeEn": "Uneven model performance across groups, languages, and cultures — rooted in training data.",
    "defEn": [
     "The International AI Safety Report notes performance declines in languages and cultural contexts less common in training data.",
     "The unevenness is attributed directly to the distribution of training data.",
     "Stereotypes carried by the corpus are learned and reproduced by the model.",
     "Humans accepting AI suggestions without checking (automation bias) is a separate layer — don't conflate it with model bias."
    ],
    "whyEn": "The same model is not equally good for everyone. When evaluating an AI product, 'how does it perform in your context' is a required question.",
    "slug": "偏见"
   },
   {
    "zh": "自动化偏见",
    "en": "Automation Bias",
    "purpose": "人这头的毛病：AI 说得顺畅，人就懒得检查照单全收。",
    "def": [
     "国际 AI 安全报告指出：人们会表现出自动化偏见。即不加仔细检查就接受 AI 的建议。",
     "它与模型偏见是两回事：一个错在模型，一个错在人的使用方式。",
     "AI 输出越流畅自信、界面越权威，人越容易放松核查。",
     "流程上的对策：高风险决定强制二次验证，而不是依赖「看起来靠谱」。"
    ],
    "why": "模型出错只是事故的一半，另一半是人不再核查。知道这个毛病，才会在关键流程里强制设检查点。",
    "refs": [
     [
      "International AI Safety Report 2026《Extended Summary for Policymakers》（automation bias 表述）",
      "https://internationalaisafetyreport.org/publication/2026-report-extended-summary-policymakers",
      "International AI Safety Report 2026, Extended Summary for Policymakers"
     ]
    ],
    "domain": "concept",
    "purposeTag": "guard",
    "level": 2,
    "layer": "二",
    "ord": 35,
    "alias": [],
    "purposeEn": "The human-side flaw: smooth AI output makes people skip checking and accept it wholesale.",
    "defEn": [
     "The International AI Safety Report notes people exhibit automation bias — accepting AI suggestions without checking them carefully.",
     "It is distinct from model bias: one is the model being wrong, the other is how humans use it.",
     "The more fluent and confident the output and the more authoritative the interface, the more people relax their checking.",
     "Process countermeasure: mandatory second verification for high-stakes decisions, not reliance on seeming reliable."
    ],
    "whyEn": "Model error is only half of many incidents; the other half is humans no longer verifying. Knowing this flaw is why critical workflows need enforced checkpoints.",
    "slug": "自动化偏见"
   }
  ]
 },
 {
  "num": "三",
  "name": "用深",
  "desc": "决定 AI 好不好用的那些具体做法。看完能判断一个方案靠不靠谱。",
  "terms": [
   {
    "zh": "智能体 / Agent",
    "en": "Agent",
    "alias": [
     "智能体",
     "代理"
    ],
    "purpose": "让模型不止回答，还能自己动手。调工具、查资料、写文件，循环执行直到完成。",
    "def": [
     "给模型配上目标、工具和循环，让它自主执行多步骤任务的一套做法。",
     "关键区别：普通问答是「你问一句它答一句」。Agent 是「给它一件事，它自己走到完成」。"
    ],
    "why": "这是本站 harness 分区存在的全部理由。如果你只需要问答，不需要 Agent。",
    "refs": [
     [
      "10 份 Agent 框架档案",
      "https://agent.specul.com/",
      "10 agent framework profiles"
     ],
     [
      "CrewAI 的角色分工",
      "https://agent.specul.com/harness/crewai.html",
      "CrewAI role division"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 1,
    "purposeEn": "Stop answering and start acting: let the model take multi-step actions on its own.",
    "defEn": [
     "A system where a model plans, calls tools, reads results and repeats until the task is done, rather than replying once."
    ],
    "whyEn": "It is the difference between \"it tells you how\" and \"it does it for you\". Most of the practical value in agents comes from tool use, not conversation.",
    "slug": "智能体 - Agent"
   },
   {
    "zh": "工具调用",
    "en": "Tool Calling / Function Calling",
    "purpose": "模型自己决定「我要查一下数据库」，然后真的去调那个程序。",
    "def": [
     "模型输出一个结构化的调用意图，由你的程序执行后把结果喂回去。",
     "模型本身不执行任何东西，它只是输出「要调哪个函数、传什么参数」。"
    ],
    "why": "这是 Agent 能「真的做事」而不是「只是说要做」的分界线。没有它，模型只能空谈。",
    "refs": [
     [
      "OpenAI 函数调用指南",
      "https://platform.openai.com/docs/guides/function-calling",
      "OpenAI Function Calling Guide"
     ],
     [
      "Anthropic 工具调用文档",
      "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview",
      "Anthropic Tool Use with Claude"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 2,
    "alias": [],
    "purposeEn": "Let the model actually do things — search, run code, edit files — rather than only describe them.",
    "defEn": [
     "A mechanism where the model emits a structured request for a function, the system runs it, and the result goes back into the conversation."
    ],
    "whyEn": "It is what turns a language model into a usable assistant. It also introduces real risk: the model can act wrongly, not just speak wrongly.",
    "slug": "工具调用"
   },
   {
    "zh": "MCP",
    "en": "Model Context Protocol",
    "alias": [
     "模型上下文协议"
    ],
    "purpose": "一套标准接口，让 AI 用统一的方式接外部工具和数据。不用为每个服务单独适配。",
    "def": [
     "Anthropic 提出的开放协议。它用统一规范描述「AI 可以调哪些工具、可以读哪些资源」。",
     "它的作用类似 AI 世界的 USB-C：接什么设备都能用同一套接口。"
    ],
    "why": "如果你要给 AI 接数据，这是当前最省事、最通用的做法。本站 MCP 分区专讲这个。",
    "refs": [
     [
      "MCP 是什么·9 份 server 档案",
      "https://agent.specul.com/tools/index.html",
      "What MCP is · 9 server profiles"
     ],
     [
      "文件操作 server",
      "https://agent.specul.com/tools/filesystem.html",
      "Filesystem server"
     ],
     [
      "网页抓取 server",
      "https://agent.specul.com/tools/fetch.html",
      "Fetch server"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 3,
    "purposeEn": "A standard interface for connecting AI to external tools and data in one uniform way, without a bespoke integration per service.",
    "defEn": [
     "An open protocol proposed by Anthropic describing, in one specification, which tools an AI may call and which resources it may read.",
     "It plays the role of USB-C for AI: whatever device you plug in, the interface is the same."
    ],
    "whyEn": "If you want to connect data to an AI, this is the least-effort and most general approach today. This site's MCP track covers it.",
    "slug": "MCP"
   },
   {
    "zh": "多 Agent 协作",
    "en": "Multi-Agent",
    "purpose": "把一件复杂的事拆给多个各有所长的角色来分工完成。",
    "def": [
     "让多个各自带不同工具和提示的 Agent 分工协作。典型模式是「规划者 + 执行者 + 审查者」。",
     "代价是 token 消耗和延迟都会成倍上升。"
    ],
    "why": "不是所有事都该多 Agent。任务简单时，一个 Agent 加工具更快也更可靠。",
    "refs": [
     [
      "CrewAI 的角色分工模式",
      "https://agent.specul.com/harness/crewai.html",
      "CrewAI role division"
     ],
     [
      "LangGraph 低层编排",
      "https://agent.specul.com/harness/langgraph.html",
      "LangGraph low-level orchestration"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 4,
    "alias": [],
    "purposeEn": "Split a complex job across several roles, each strong at something different.",
    "defEn": [
     "Multiple agents with different tools and prompts working together — the classic pattern is planner plus executor plus reviewer.",
     "The cost is that token consumption and latency both multiply."
    ],
    "whyEn": "Not everything needs multiple agents. On simple tasks one agent with tools is faster and more reliable.",
    "slug": "多 Agent 协作"
   },
   {
    "zh": "工作流编排",
    "en": "Orchestration / Pipeline",
    "purpose": "把「AI 做一步、人工确认、再做下一步」这种固定流程固定下来。",
    "def": [
     "用代码明确写出步骤顺序和分支条件，而不是全交给模型自己决定。"
    ],
    "why": "可靠的生产系统大多是人机协作的工作流，不是全自动 Agent。这是控制风险的关键设计。",
    "refs": [
     [
      "Google ADK 的图执行引擎",
      "https://agent.specul.com/harness/google-adk.html",
      "Google ADK graph engine"
     ],
     [
      "OpenAI Agents SDK",
      "https://agent.specul.com/harness/openai-agents-sdk.html",
      "OpenAI Agents SDK"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 5,
    "alias": [],
    "purposeEn": "Fix a repeated pattern: the AI does a step, a human confirms, the next step runs.",
    "defEn": [
     "Writing the step order and branch conditions explicitly in code, rather than leaving every decision to the model."
    ],
    "whyEn": "Reliable production systems are mostly human-in-the-loop workflows, not fully autonomous agents. This is the key design decision for controlling risk.",
    "slug": "工作流编排"
   },
   {
    "zh": "记忆",
    "en": "Memory",
    "purpose": "让 Agent 跨对话记住事，不用每次都重新交代背景。",
    "def": [
     "把历史信息持久化保存，让后续会话能取回使用。",
     "两种做法：存在程序里（可控），或存在模型外部的存储里（灵活但要管权限）。"
    ],
    "why": "「AI 每次都忘事」是使用中最常见的抱怨，答案就是要有记忆层。",
    "refs": [
     [
      "知识图谱记忆 server",
      "https://agent.specul.com/tools/memory.html",
      "Knowledge-graph memory server"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 6,
    "alias": [],
    "purposeEn": "Let an agent remember things across conversations instead of restating the background every time.",
    "defEn": [
     "Persisting historical information so later sessions can retrieve it.",
     "Two approaches: store it in the program (controllable), or in external storage the model can reach (flexible, but then permissions matter)."
    ],
    "whyEn": "\"The AI forgets everything every time\" is the most common complaint in use, and the answer is a memory layer.",
    "slug": "记忆"
   },
   {
    "zh": "长时任务",
    "en": "Long-running Task",
    "purpose": "跑几小时甚至几天、跨多个上下文的复杂工作。",
    "def": [
     "超出单次上下文或单次会话时长的任务，需要外部存储进度、阶段性恢复。"
    ],
    "why": "这是 Agent 能力的天花板所在。宣称能跑长任务的框架，值得重点核实它怎么存进度。",
    "refs": [
     [
      "Hermes 的学习闭环",
      "https://agent.specul.com/harness/hermes-agent.html",
      "Hermes learning loop"
     ],
     [
      "Deep Agents 长任务设计",
      "https://agent.specul.com/harness/deepagents.html",
      "Deep Agents long-task design"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 7,
    "alias": [],
    "purposeEn": "Work running for hours or days across many contexts.",
    "defEn": [
     "Tasks exceeding a single context window or session, requiring external progress storage and staged resumption."
    ],
    "whyEn": "This is the ceiling on agent capability. For a framework claiming long-running tasks, check how it stores progress.",
    "slug": "长时任务"
   },
   {
    "zh": "人机协作",
    "en": "Human-in-the-Loop",
    "purpose": "关键步骤让人确认，而不是全自动往下跑。",
    "def": [
     "在流程的特定节点插入人工审核，由人决定是否继续或怎么改。"
    ],
    "why": "涉及写文件、发请求、花钱、改数据库的动作，都应该留人工确认。这是控制事故的主要手段。",
    "refs": [
     [
      "CLI 的权限询问机制",
      "https://agent.specul.com/opencode.html",
      "CLI permission prompts"
     ]
    ],
    "domain": "agent",
    "purposeTag": "guard",
    "level": 3,
    "layer": "三",
    "ord": 8,
    "alias": [],
    "purposeEn": "A human confirms the key steps instead of the system running on unattended.",
    "defEn": [
     "Inserting human review at specific points in a flow, so a person decides whether to continue or how to change it."
    ],
    "whyEn": "Anything that writes files, sends requests, spends money or modifies a database should have a human checkpoint. This is the main lever against accidents.",
    "slug": "人机协作"
   },
   {
    "zh": "护栏",
    "en": "Guardrails",
    "purpose": "限制模型能做什么、不能做什么，防止它跑偏或做危险操作。",
    "def": [
     "在输入和输出两侧加的一层检查规则，可以是关键词、权限、也可以是另一个模型判断。"
    ],
    "why": "给 Agent 配了写文件和跑命令的能力，就必须配护栏。这是能力与风险的直接交换。",
    "refs": [
     [
      "OpenHands 的受限模式",
      "https://agent.specul.com/harness/openhands.html",
      "OpenHands Restricted Mode"
     ]
    ],
    "domain": "agent",
    "purposeTag": "guard",
    "level": 3,
    "layer": "三",
    "ord": 9,
    "alias": [],
    "purposeEn": "Constrain what the model may and may not do, so it does not drift or take dangerous actions.",
    "defEn": [
     "A layer of checks on the input and output side — keywords, permissions, or another model's judgement."
    ],
    "whyEn": "If you give an agent the ability to write files and run commands, you must give it guardrails. This is a direct trade of capability for risk.",
    "slug": "护栏"
   },
   {
    "zh": "沙箱",
    "en": "Sandbox",
    "purpose": "把 AI 的操作关在一个受控环境里，出问题也出不到外面。",
    "def": [
     "隔离的执行环境，比如容器或受限目录，限制它能碰哪些文件和命令。"
    ],
    "why": "判断一个 Agent 工具是否可靠，先看它默认在不在沙箱里跑。",
    "refs": [
     [
      "Docker 沙箱隔离层",
      "https://docs.docker.com/ai/sandboxes/security/isolation/",
      "Docker Sandboxes: Isolation layers"
     ],
     [
      "Claude Code 沙箱",
      "https://www.anthropic.com/engineering/claude-code-sandboxing",
      "Beyond permission prompts: sandboxing"
     ]
    ],
    "domain": "agent",
    "purposeTag": "guard",
    "level": 3,
    "layer": "三",
    "ord": 10,
    "alias": [],
    "purposeEn": "Confine what the AI does to a controlled environment so a mistake stays contained.",
    "defEn": [
     "An isolated execution environment — a container or restricted directory — limiting which files and commands it can touch."
    ],
    "whyEn": "When judging whether an agent tool is trustworthy, first check whether it runs sandboxed by default.",
    "slug": "沙箱"
   },
   {
    "zh": "评估",
    "en": "Evaluation, Evals",
    "purpose": "判断一个方案到底好不好，而不是「看起来不错」。",
    "def": [
     "用一批固定题目和评分标准，量化比较不同模型、不同提示词、不同方案的效果。"
    ],
    "why": "没有评估就没有改进依据。这是区分「认真做的产品」和「说得好听的产品」的分水岭。",
    "refs": [
     [
      "OpenAI Evals 官方指南",
      "https://platform.openai.com/docs/guides/evals",
      "OpenAI Working with Evals"
     ],
     [
      "HELM 论文",
      "https://arxiv.org/abs/2211.09110",
      "Holistic Evaluation of Language Models (HELM)"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 3,
    "layer": "三",
    "ord": 11,
    "alias": [],
    "purposeEn": "Decide whether an approach is actually good, rather than merely plausible-sounding.",
    "defEn": [
     "A fixed set of questions plus scoring criteria, to compare models, prompts or approaches quantitatively."
    ],
    "whyEn": "Without evaluation there is no basis for improvement. It is the dividing line between a product built seriously and one that merely sounds good.",
    "slug": "评估"
   },
   {
    "zh": "可观测性",
    "en": "Observability",
    "purpose": "看清模型这一趟到底做了什么、花了多少、错在哪一步。",
    "def": [
     "记录调用链、每步输入输出、token 消耗和耗时，让问题可追溯。"
    ],
    "why": "模型行为有随机性，不记录就永远查不出问题。这是把 Demo 变成生产系统的必备条件。",
    "refs": [
     [
      "OpenTelemetry 可观测性入门",
      "https://opentelemetry.io/docs/concepts/observability-primer/",
      "OpenTelemetry Observability Primer"
     ],
     [
      "LangSmith 可观测性文档",
      "https://docs.langchain.com/langsmith/observability",
      "LangSmith Observability"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 3,
    "layer": "三",
    "ord": 12,
    "alias": [],
    "purposeEn": "See what the model actually did this run, what it cost, and which step went wrong.",
    "defEn": [
     "Recording the call chain, each step's input and output, token usage and latency so problems can be traced."
    ],
    "whyEn": "Model behaviour is probabilistic; without records you can never diagnose a problem. This is what separates a demo from a production system.",
    "slug": "可观测性"
   },
   {
    "zh": "代码补全",
    "en": "Code Completion",
    "purpose": "在编辑器里根据上下文自动补出接下来的代码。",
    "def": [
     "根据光标位置和已有代码推测并插入后续代码的功能。"
    ],
    "why": "这是 AI 编程工具最早也最基础的能力。所有 IDE 类工具都从它开始。",
    "refs": [
     [
      "8 份 IDE 对照",
      "https://agent.specul.com/",
      "8 IDE tools compared"
     ]
    ],
    "domain": "dev",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 13,
    "alias": [],
    "purposeEn": "Complete the following code automatically in the editor, based on context.",
    "defEn": [
     "Inferring and inserting the code that follows, from the cursor position and what is already written."
    ],
    "whyEn": "The earliest and most basic AI coding capability — every IDE-class tool started here.",
    "slug": "代码补全"
   },
   {
    "zh": "仓库级理解",
    "en": "Repository-level Understanding",
    "purpose": "让 AI 读懂整个项目，而不是只看当前打开的那一个文件。",
    "def": [
     "AI 建立整个代码库的索引与结构认知，能跨文件回答问题、影响范围分析。"
    ],
    "why": "这是「Copilot 类工具」与「简单补全」的分水岭。做重构类任务时必须要有它。",
    "refs": [
     [
      "Cursor 代码库索引",
      "https://cursor.com/blog/secure-codebase-indexing",
      "Securely indexing large codebases – Cursor"
     ]
    ],
    "domain": "dev",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 14,
    "alias": [],
    "purposeEn": "Let the AI read the whole project, not just the file that happens to be open.",
    "defEn": [
     "The AI builds an index and structural model of the entire codebase, so it can answer across files and reason about blast radius."
    ],
    "whyEn": "This is the dividing line between Copilot-class tools and simple completion. Refactoring tasks require it.",
    "slug": "仓库级理解"
   },
   {
    "zh": "终端 Agent",
    "en": "CLI Agent",
    "purpose": "在命令行里自主执行任务：改文件、跑测试、提交代码。",
    "def": [
     "运行在终端中的 AI 智能体，能直接操作开发环境。"
    ],
    "why": "它比 IDE 类工具更适合自动化和脚本化场景。也是脚本/CI 环境的唯一选择。",
    "refs": [
     [
      "6 份 CLI 对照",
      "https://agent.specul.com/",
      "6 CLI agents compared"
     ]
    ],
    "domain": "dev",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 15,
    "alias": [],
    "purposeEn": "Run tasks autonomously in the command line: edit files, run tests, commit code.",
    "defEn": [
     "An AI agent running in the terminal, able to operate the development environment directly."
    ],
    "whyEn": "It suits automation and scripting better than IDE-class tools, and is the only option in scripted or CI environments.",
    "slug": "终端 Agent"
   },
   {
    "zh": "差异对比",
    "en": "Diff",
    "purpose": "看 AI 到底改了什么。这是接受 AI 代码最关键的一步。",
    "def": [
     "逐行比较改动前后的差异，是审查 AI 产出的基本手段。"
    ],
    "why": "官方资料里有个反复出现的模式。AI 的改动始终保持在版本控制里、可 diff 可撤销。这是安全前提。",
    "refs": [
     [
      "Aider 的 Git 集成设计",
      "https://agent.specul.com/aider-cli.html",
      "Aider's Git integration"
     ]
    ],
    "domain": "dev",
    "purposeTag": "guard",
    "level": 3,
    "layer": "三",
    "ord": 16,
    "alias": [],
    "purposeEn": "See exactly what the AI changed — the most important step when accepting AI-written code.",
    "defEn": [
     "Comparing before and after line by line, the basic means of reviewing AI output."
    ],
    "whyEn": "A pattern that recurs in official guidance: keep AI changes under version control, diffable and revertible. That is a precondition for safety.",
    "slug": "差异对比"
   },
   {
    "zh": "App Server",
    "en": "App Server",
    "purpose": "让同一个 AI 会话能在终端、编辑器、网页之间接力。",
    "def": [
     "把 AI 会话状态抽成独立服务，供多个前端接入的设计。"
    ],
    "why": "它解释了为什么有的工具「关掉终端换个界面继续聊」。会话不在终端里，而在服务里。",
    "refs": [
     [
      "Codex 的 app server 架构",
      "https://agent.specul.com/codex-cli.html",
      "Codex app-server architecture"
     ],
     [
      "Codex IDE 扩展",
      "https://agent.specul.com/codex-ide.html",
      "Codex IDE extension"
     ]
    ],
    "domain": "dev",
    "purposeTag": "learn",
    "level": 3,
    "layer": "三",
    "ord": 17,
    "alias": [],
    "purposeEn": "Let one AI session hand off between terminal, editor and web.",
    "defEn": [
     "A design where AI session state lives in a standalone service that several front ends can attach to."
    ],
    "whyEn": "It explains why some tools let you close the terminal and carry on in another interface: the session lives in a service, not in the terminal.",
    "slug": "App Server"
   },
   {
    "zh": "ACP",
    "en": "Agent Client Protocol",
    "purpose": "让不同厂商的 AI 编码工具能挂进同一个编辑器。",
    "def": [
     "一种协议约定，使编辑器能加载各家不同的 Agent 实现。"
    ],
    "why": "它和 MCP 是同一类思路——用标准接口替代逐个适配。",
    "refs": [
     [
      "Zed 的三种 agent path 编排",
      "https://agent.specul.com/zed.html",
      "Zed's three agent-path orchestration"
     ]
    ],
    "domain": "dev",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 18,
    "alias": [],
    "purposeEn": "Let AI coding tools from different vendors plug into the same editor.",
    "defEn": [
     "A protocol agreement that lets an editor load agent implementations from any vendor."
    ],
    "whyEn": "It is the same idea as MCP — a standard interface instead of per-vendor integration.",
    "slug": "ACP"
   },
   {
    "zh": "配对编程",
    "en": "Pair Programming",
    "purpose": "AI 作为编程搭档，实时参与开发过程。",
    "def": [
     "两个人共同写代码的实践，被扩展为「人 + AI」协作的模式。"
    ],
    "why": "这是理解所有 AI 编程工具定位的原始概念。它们都在不同程度上自动化这个模式。",
    "refs": [
     [
      "Aider 的设计理念",
      "https://agent.specul.com/aider-cli.html",
      "Aider's design philosophy"
     ]
    ],
    "domain": "dev",
    "purposeTag": "learn",
    "level": 3,
    "layer": "三",
    "ord": 19,
    "alias": [],
    "purposeEn": "AI as a programming partner taking part in development in real time.",
    "defEn": [
     "The practice of two people writing code together, extended to a human plus AI collaboration model."
    ],
    "whyEn": "It is the original concept behind every AI coding tool — they all automate this pattern to different degrees.",
    "slug": "配对编程"
   },
   {
    "zh": "浏览 / 网页操作",
    "en": "Browser Automation",
    "purpose": "让 AI 自己去点页面、填表单、截图取信息。",
    "def": [
     "用程序控制浏览器执行操作的技术，是很多 Agent 获取信息的手段。"
    ],
    "why": "它既是最有用的能力之一，也是最容易出安全风险的能力。它能操作真实账号。",
    "refs": [
     [
      "Playwright MCP server",
      "https://agent.specul.com/tools/playwright.html",
      "Playwright MCP server"
     ],
     [
      "网页抓取 server 的安全警告",
      "https://agent.specul.com/tools/fetch.html",
      "Fetch server's security warning"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 20,
    "alias": [],
    "purposeEn": "Let the AI click pages, fill forms and take screenshots to gather information.",
    "defEn": [
     "Technology controlling a browser programmatically, used by many agents to collect information."
    ],
    "whyEn": "It is both one of the most useful capabilities and one of the most security-sensitive, because it can operate real accounts.",
    "slug": "浏览 - 网页操作"
   },
   {
    "zh": "参考服务器",
    "en": "Reference Server",
    "purpose": "官方提供的「标准示范」实现，用来告诉你协议该怎么写。",
    "def": [
     "MCP 官方提供的一批最小实现，不是给普通用户用的，是给开发者参考和测试的。"
    ],
    "why": "看官方实现是理解一个协议最快的办法——比读文档直接得多。",
    "refs": [
     [
      "Everything 是测试用 server",
      "https://agent.specul.com/tools/everything.html",
      "The Everything test server"
     ],
     [
      "Filesystem 实现",
      "https://agent.specul.com/tools/filesystem.html",
      "Filesystem server"
     ]
    ],
    "domain": "agent",
    "purposeTag": "learn",
    "level": 3,
    "layer": "三",
    "ord": 21,
    "alias": [],
    "purposeEn": "Official \"reference\" implementations showing how the protocol should be written.",
    "defEn": [
     "Minimal implementations published by the MCP project — not for end users, but for developers to reference and test against."
    ],
    "whyEn": "Reading the official implementation is the fastest way to understand a protocol — far quicker than the documentation.",
    "slug": "参考服务器"
   },
   {
    "zh": "版本控制",
    "en": "Version Control",
    "alias": [
     "Git"
    ],
    "purpose": "记录每一次改动，随时回退。这是 AI 编程的安全底座。",
    "def": [
     "管理文件变更历史、支撑多人协作与回滚的机制。"
    ],
    "why": "AI 会犯错、会删错文件。有版本控制才有胆量让它动手。",
    "refs": [
     [
      "Git MCP server 的作用域",
      "https://agent.specul.com/tools/git.html",
      "Git MCP server scope"
     ]
    ],
    "domain": "dev",
    "purposeTag": "guard",
    "level": 3,
    "layer": "三",
    "ord": 22,
    "purposeEn": "Record every change and roll back at will — the safety foundation of AI-assisted coding.",
    "defEn": [
     "A mechanism tracking the history of file changes, supporting collaboration and rollback."
    ],
    "whyEn": "AI makes mistakes and deletes the wrong file. Without version control you cannot afford to let it act.",
    "slug": "版本控制"
   },
   {
    "zh": "持续集成",
    "en": "Continuous Integration, CI",
    "purpose": "代码一提交就自动跑测试和检查。",
    "def": [
     "自动化的代码验证流程，在提交时触发构建与测试。"
    ],
    "why": "它决定了 AI 的产出能否被自动验证——能验证才能放心批量使用。",
    "refs": [
     [
      "GitHub Actions 持续集成",
      "https://docs.github.com/en/actions/get-started/continuous-integration",
      "GitHub Actions: Continuous integration"
     ],
     [
      "GitHub Actions 概念介绍",
      "https://docs.github.com/en/actions/get-started/understand-github-actions",
      "Understanding GitHub Actions"
     ]
    ],
    "domain": "dev",
    "purposeTag": "guard",
    "level": 3,
    "layer": "三",
    "ord": 23,
    "alias": [],
    "purposeEn": "Tests and checks run automatically as soon as code is committed.",
    "defEn": [
     "An automated verification pipeline that triggers a build and tests on commit."
    ],
    "whyEn": "It decides whether AI output can be verified automatically — and verifiable output is what makes batch use safe.",
    "slug": "持续集成"
   },
   {
    "zh": "提示注入",
    "en": "Prompt Injection",
    "purpose": "外部内容里藏着指令，骗AI 执行你没打算让它做的事。",
    "def": [
     "攻击者把指令藏在模型会读取的内容里，比如网页、文档、邮件。模型会把它当成用户指令执行。",
     "这是 Agent 时代最重要的安全风险之一。"
    ],
    "why": "这解释了为什么让 AI 读网页或邮件有风险。它也解释了权限确认机制为什么必须保留。",
    "refs": [
     [
      "Fetch server 的安全警告",
      "https://agent.specul.com/tools/fetch.html",
      "Fetch server's security warning"
     ]
    ],
    "domain": "agent",
    "purposeTag": "guard",
    "level": 3,
    "layer": "三",
    "ord": 24,
    "alias": [],
    "purposeEn": "The main security risk in agent systems: content that talks the model into doing something you did not intend.",
    "defEn": [
     "An attack where instructions hidden in retrieved documents, tool output or a web page hijack the model's behaviour."
    ],
    "whyEn": "It is the single most important thing to understand before deploying an agent that reads untrusted content.",
    "slug": "提示注入"
   },
   {
    "zh": "远程执行",
    "en": "Remote Execution",
    "purpose": "云端 Agent 在你电脑上跑任务，关掉笔记本也不中断。",
    "def": [
     "把执行放到远端服务器，本机只作为查看界面。"
    ],
    "why": "这是「长时间任务」的实现基础，也是自托管方案的核心差异点。",
    "refs": [
     [
      "Cursor 的云端 Agent 与自托管",
      "https://agent.specul.com/cursor.html",
      "Cursor cloud agent & self-hosting"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 25,
    "alias": [],
    "purposeEn": "A cloud agent runs tasks on your machine, so closing the laptop does not stop it.",
    "defEn": [
     "Moving execution to a remote server, with the local machine acting only as a viewer."
    ],
    "whyEn": "It is the basis for long-running tasks and the core difference between hosted and self-hosted setups.",
    "slug": "远程执行"
   },
   {
    "zh": "技能 / Skills",
    "en": "Skills",
    "purpose": "把重复的工作流程打包成可复用的能力。",
    "def": [
     "把一套提示词、工具配置和执行步骤封装起来，供多次任务调用。"
    ],
    "why": "这是从「每次重新交代」到「一次配置反复用」的关键机制。",
    "refs": [
     [
      "Agent Skills 工程博客",
      "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills",
      "Anthropic Agent Skills engineering blog"
     ],
     [
      "Agent Skills API 指南",
      "https://platform.claude.com/docs/en/build-with-claude/skills-guide",
      "Using Agent Skills with the API"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 26,
    "alias": [],
    "purposeEn": "Package a repetitive workflow into a reusable capability.",
    "defEn": [
     "Wrapping a set of prompts, tool configuration and execution steps so they can be called across many tasks."
    ],
    "whyEn": "It is the mechanism that moves you from re-explaining every time to configuring once and reusing.",
    "slug": "技能 - Skills"
   },
   {
    "zh": "结构化输出",
    "en": "Structured Output",
    "purpose": "让模型的回答是严格的格式（JSON 等），而不是一段散文。",
    "def": [
     "约束模型输出为机器可解析的结构，供程序直接使用。"
    ],
    "why": "工具调用的前提。没有它，模型没法可靠地告诉程序「该调什么、传什么参数」。",
    "refs": [
     [
      "OpenAI 结构化输出指南",
      "https://platform.openai.com/docs/guides/structured-outputs",
      "OpenAI Structured Outputs Guide"
     ],
     [
      "Pydantic AI 结构化输出",
      "https://pydantic.dev/docs/ai/core-concepts/output",
      "Pydantic AI: Output"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 27,
    "alias": [],
    "purposeEn": "Make the model's answer a strict format (JSON and the like) rather than a paragraph of prose.",
    "defEn": [
     "Constraining the model to output machine-parsable structure that a program can consume directly."
    ],
    "whyEn": "A precondition for tool calling. Without it a model cannot reliably tell a program what to call or which arguments to pass.",
    "slug": "结构化输出"
   },
   {
    "zh": "上下文工程",
    "en": "Context Engineering",
    "purpose": "决定「哪些内容放进模型的有限窗口」这件事本身。",
    "def": [
     "Anthropic 把上下文称为「关键但有限的资源」。",
     "核心工作是持续筛选：什么进窗口、什么留在外面。"
    ],
    "why": "窗口不是越大越好。会筛内容，才知道该塞什么、该删什么。",
    "refs": [
     [
      "Anthropic《Effective context engineering for AI agents》",
      "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
      "Anthropic, Effective context engineering for AI agents"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 28,
    "alias": [],
    "purposeEn": "Deciding what goes into the model's limited window is itself a discipline.",
    "defEn": [
     "Anthropic calls context \"a critical but finite resource\" for agents.",
     "The core work is curating what enters the window and what stays out."
    ],
    "whyEn": "Bigger windows are not free. Curating is how you decide what to include and what to drop.",
    "slug": "上下文工程"
   },
   {
    "zh": "上下文压缩",
    "en": "Compaction",
    "alias": [
     "压缩",
     "对话压缩"
    ],
    "purpose": "对话长到快装不下时，把前面内容总结一遍再重新开始。",
    "def": [
     "Anthropic 的定义：把接近窗口上限的对话做摘要，再用它开启新窗口。",
     "官方同时把结构化笔记列为应对窗口限制的配套做法。"
    ],
    "why": "长任务跑一半「忘了前面」，多半是这一步没做好。",
    "refs": [
     [
      "Anthropic《Effective context engineering for AI agents》",
      "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
      "Anthropic, Effective context engineering for AI agents"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 29,
    "purposeEn": "When a conversation nearly fills the window, summarize it and start again.",
    "defEn": [
     "Anthropic's definition: summarize a conversation nearing the window limit, then reinitiate a new window with the summary.",
     "Compaction loses detail, so it is usually paired with external notes."
    ],
    "whyEn": "A long task that \"forgets\" halfway is usually a compaction failure.",
    "slug": "上下文压缩"
   },
   {
    "zh": "提示链",
    "en": "Prompt Chaining",
    "alias": [
     "链式提示",
     "步骤链"
    ],
    "purpose": "把一件事拆成固定的几步，每步的输出喂给下一步。",
    "def": [
     "Anthropic 的定义：把任务分解成一系列步骤，上一步的输出作为下一步的输入。",
     "官方指出它以延迟换准确性：准确性比延迟重要时更适用。"
    ],
    "why": "比「一句话让模型做完所有事」更可控。很多 Agent 其实就是提示链。",
    "refs": [
     [
      "Anthropic《Building effective agents》",
      "https://www.anthropic.com/engineering/building-effective-agents",
      "Anthropic, Building effective agents"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 30,
    "purposeEn": "Split a job into fixed steps, feeding each output into the next.",
    "defEn": [
     "Anthropic's definition: decompose a task into a sequence of steps, passing each output to the next.",
     "Each step is testable on its own; the cost is a longer chain and more latency."
    ],
    "whyEn": "More controllable than asking for everything at once. Many \"agents\" are really chains.",
    "slug": "提示链"
   },
   {
    "zh": "Workflow 还是 Agent",
    "en": "Workflow vs Agent",
    "alias": [
     "工作流与自主体"
    ],
    "purpose": "先判断这件事该不该做成自主体。",
    "def": [
     "Anthropic 的区分：workflow 用预定义代码路径编排模型与工具。",
     "agent 则由模型动态决定自己的流程和工具使用。",
     "官方建议从最简方案开始，够用就不必构建自主体系统。"
    ],
    "why": "选型的第一问。把 workflow 硬做成 Agent，只会更贵更不可靠。",
    "refs": [
     [
      "Anthropic《Building effective agents》",
      "https://www.anthropic.com/engineering/building-effective-agents",
      "Anthropic, Building effective agents"
     ]
    ],
    "domain": "agent",
    "purposeTag": "judge",
    "level": 3,
    "layer": "三",
    "ord": 31,
    "purposeEn": "First decide whether the job should be agentic at all.",
    "defEn": [
     "Anthropic's distinction: workflows orchestrate models and tools through predefined code paths.",
     "Agents are systems where the model dynamically directs its own process and tool use.",
     "The official advice is to find the simplest solution and add complexity only when needed."
    ],
    "whyEn": "The first selection question. Forcing a workflow into an agent costs more and works worse.",
    "slug": "Workflow 还是 Agent"
   },
   {
    "zh": "编排模式",
    "en": "Agentic Workflow Patterns",
    "alias": [
     "并行化",
     "编排者—执行者",
     "评估者—优化者"
    ],
    "purpose": "几种被官方命名的固定协作结构。",
    "def": [
     "并行化：多个子任务同时跑再汇总，适合可切分或要多视角的任务。",
     "编排者—执行者：中心模型拆任务、派给执行模型、再综合结果。",
     "评估者—优化者：一个模型生成，另一个给反馈，循环改进。"
    ],
    "why": "有现成的官方命名结构，不必从零发明一套。",
    "refs": [
     [
      "Anthropic《Building effective agents》",
      "https://www.anthropic.com/engineering/building-effective-agents",
      "Anthropic, Building effective agents"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 32,
    "purposeEn": "A few officially named collaboration structures you can reuse.",
    "defEn": [
     "Parallelization: run divided subtasks simultaneously and aggregate outputs.",
     "Orchestrator-workers: a central LLM breaks down tasks, delegates to workers, then synthesizes results.",
     "Evaluator-optimizer: one call generates, another critiques, in a loop."
    ],
    "whyEn": "Official patterns already exist; you do not have to invent one.",
    "slug": "编排模式"
   },
   {
    "zh": "工具定义",
    "en": "Tool Definition",
    "alias": [
     "工具描述",
     "工具规格"
    ],
    "purpose": "写给模型看的「这个工具是干什么的、参数怎么填」。",
    "def": [
     "Anthropic 指出：工具的说明与规格本身就是在做提示工程。",
     "官方把「为 Agent 写好工具」当作一项独立的工程工作。"
    ],
    "why": "Agent 不好用，常见原因不在模型，在工具说明写得差。",
    "refs": [
     [
      "Anthropic《Writing effective tools for agents》",
      "https://www.anthropic.com/engineering/writing-tools-for-agents",
      "Anthropic, Writing effective tools for agents"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 33,
    "purposeEn": "The instructions you write for the model about what a tool does and how to fill it.",
    "defEn": [
     "Anthropic notes that tool descriptions and specs are themselves prompt engineering.",
     "Vague descriptions lead the model to pick the wrong tool or fill wrong arguments."
    ],
    "whyEn": "When an agent misbehaves, the cause is often the tool description, not the model.",
    "slug": "工具定义"
   },
   {
    "zh": "速率限制",
    "en": "Rate Limiting",
    "alias": [
     "限流",
     "429"
    ],
    "purpose": "API 对你单位时间能发多少请求的配额。",
    "def": [
     "HTTP 429 表示「请求过多」，MDN 说明它通常由速率限制触发。",
     "配额用尽时服务端拒绝请求，客户端需等待后重试。"
    ],
    "why": "跑批量任务时最先撞的是它，不是模型能力。",
    "refs": [
     [
      "MDN：HTTP 429 Too Many Requests",
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429",
      "MDN, HTTP 429 Too Many Requests"
     ]
    ],
    "domain": "dev",
    "purposeTag": "learn",
    "level": 3,
    "layer": "三",
    "ord": 34,
    "purposeEn": "The quota on how many requests you may send in a time window.",
    "defEn": [
     "HTTP 429 means \"Too Many Requests\"; MDN states it is commonly used for rate limiting.",
     "When quota is exhausted the server rejects requests and the client must wait and retry."
    ],
    "whyEn": "Batch jobs hit this first, not model capability.",
    "slug": "速率限制"
   },
   {
    "zh": "子代理隔离",
    "en": "Sub-agent Isolation",
    "alias": [
     "子代理架构"
    ],
    "purpose": "让子代理去搜，主对话只拿结论，不被细节塞满。",
    "def": [
     "Anthropic 的做法：搜索的细节上下文留在子代理内部。",
     "主代理只负责综合结果，把窗口留给决策。"
    ],
    "why": "「窗口被搜索记录填满」是长任务的典型失败模式，这是它的解法。",
    "refs": [
     [
      "Anthropic《Effective context engineering for AI agents》",
      "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
      "Anthropic, Effective context engineering for AI agents"
     ]
    ],
    "domain": "agent",
    "purposeTag": "apply",
    "level": 3,
    "layer": "三",
    "ord": 35,
    "purposeEn": "Let sub-agents do the searching so the main conversation keeps only the conclusions.",
    "defEn": [
     "Anthropic's pattern: detailed search context stays isolated inside sub-agents.",
     "The lead agent focuses on synthesizing results, keeping the window for decisions."
    ],
    "whyEn": "\"The window filled up with search results\" is a classic long-task failure; this is the fix.",
    "slug": "子代理隔离"
   }
  ]
 },
 {
  "num": "四",
  "name": "看懂",
  "desc": "理解为什么会有这些表现。看不懂这一站，前面的词你都只能背。",
  "terms": [
   {
    "zh": "Transformer",
    "en": "Transformer",
    "purpose": "当前所有主流大模型共用的底层架构。",
    "def": [
     "一种神经网络结构，核心是「注意力机制」，用来处理一整段文本之间的关系。",
     "它能并行处理整句话，而不是一个词一个词往后读——这是它能训练出万亿参数规模的原因。"
    ],
    "why": "它是大模型的「根」。理解它，你才能理解上下文窗口、幻觉、KV 缓存这些概念从哪来。",
    "refs": [
     [
      "Attention Is All You Need（论文）",
      "https://arxiv.org/abs/1706.03762",
      "Attention Is All You Need (paper)"
     ],
     [
      "Hugging Face 课程（Transformer）",
      "https://huggingface.co/learn/nlp-course/chapter1/4",
      "How do Transformers work? (Hugging Face NLP course)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 1,
    "alias": [],
    "purposeEn": "The architecture underneath every mainstream large model today.",
    "defEn": [
     "A neural network structure built around the attention mechanism, handling the relationships across a whole passage of text.",
     "It processes a sentence in parallel rather than one word at a time — which is why it scales to trillions of parameters."
    ],
    "whyEn": "It is the root of large models. Understand it and the origin of context windows, hallucination and the KV cache becomes clear.",
    "slug": "Transformer"
   },
   {
    "zh": "注意力机制",
    "en": "Attention",
    "purpose": "让模型在处理一个词时，自动看向句子里最相关的其他词。",
    "def": [
     "计算每个词与句中所有其他词的关联程度，据此加权聚合信息。",
     "「Transformer 里的注意力」与「模型注意力不集中」是同一个词的不同含义。前者是算法组件，后者是行为描述。"
    ],
    "why": "它解释了为什么模型能理解长句里的指代关系。它也是上下文长度受限的技术根源之一。",
    "refs": [
     [
      "Attention Is All You Need（论文）",
      "https://arxiv.org/abs/1706.03762",
      "Attention Is All You Need (paper)"
     ],
     [
      "Bahdanau 注意力论文（ICLR 2015）",
      "https://arxiv.org/abs/1409.0473",
      "Bahdanau Attention (Neural Machine Translation)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 2,
    "alias": [],
    "purposeEn": "When processing one word, the model automatically looks at the most relevant other words in the sentence.",
    "defEn": [
     "Computing how related each word is to every other word, and aggregating information weighted by that.",
     "\"Attention\" inside a Transformer and \"the model isn't paying attention\" in everyday speech are the same word meaning different things."
    ],
    "whyEn": "It explains why models can resolve references across a long sentence — and is one technical root of the context length limit.",
    "slug": "注意力机制"
   },
   {
    "zh": "位置编码",
    "en": "Positional Encoding",
    "purpose": "让模型知道每个词在句子里的先后顺序。",
    "def": [
     "给每个位置附加一组数字，使模型能分辨「猫追狗」和「狗追猫」。"
    ],
    "why": "它解释了为什么上下文窗口超了之后，模型对长文的理解会明显退化。",
    "refs": [
     [
      "RoFormer / RoPE（论文）",
      "https://arxiv.org/abs/2104.09864",
      "RoFormer: Rotary Position Embedding (paper)"
     ],
     [
      "Attention Is All You Need（正余弦编码）",
      "https://arxiv.org/abs/1706.03762",
      "Attention Is All You Need (sinusoidal encoding, paper)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 3,
    "alias": [],
    "purposeEn": "Lets the model know the order of words in a sentence.",
    "defEn": [
     "Attaching a set of numbers to each position so the model can tell \"the cat chased the dog\" from \"the dog chased the cat\"."
    ],
    "whyEn": "It explains why comprehension of long passages degrades noticeably once you exceed the context window.",
    "slug": "位置编码"
   },
   {
    "zh": "嵌入层",
    "en": "Embedding Layer",
    "purpose": "把词变成数字向量的第一步，模型内部只认数字。",
    "def": [
     "模型内部把每个 token 映射成高维向量的那一层，是向量检索技术的源头。"
    ],
    "why": "它连接「看懂站」和「用深站」。你理解的 embedding 概念，和这里的实现是同一个东西。",
    "refs": [
     [
      "Word2Vec（论文）",
      "https://arxiv.org/abs/1301.3781",
      "Word2Vec: Efficient Estimation of Word Representations"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 4,
    "alias": [],
    "purposeEn": "The first step of turning words into numeric vectors — models only work in numbers internally.",
    "defEn": [
     "The layer mapping each token to a high-dimensional vector inside the model — the origin of vector retrieval."
    ],
    "whyEn": "It connects the conceptual layer to the applied one: the embedding you use in practice is this.",
    "slug": "嵌入层"
   },
   {
    "zh": "KV 缓存",
    "en": "KV Cache",
    "purpose": "让模型逐字生成时不用每一步都重算整段话，生成速度才可用。",
    "def": [
     "把已经算过的注意力中间结果缓存起来，只为新 token 计算增量。",
     "代价是它**持续占用显存**——这直接决定了你的显存能撑多长的上下文。"
    ],
    "why": "这是本地部署时最常见的 OOM（显存不够）原因。上下文开大就先撞它。",
    "refs": [
     [
      "vLLM 前缀缓存设计",
      "https://docs.vllm.ai/en/stable/design/prefix_caching/",
      "Automatic Prefix Caching – vLLM design docs"
     ],
     [
      "vLLM KV 缓存管理",
      "https://docs.vllm.ai/en/latest/design/hybrid_kv_cache_manager/",
      "Hybrid KV Cache Manager – vLLM design docs"
     ],
     [
      "从业者深版：跑起来深水专题（AI 模型站）",
      "https://models.specul.com/guides/serving-deep-dive.html",
      "Practitioner deep-dive: serving deep dive guide (AI Models site)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 5,
    "alias": [],
    "purposeEn": "Stops the model recomputing the whole passage on every token it generates — this is what makes generation speed usable.",
    "defEn": [
     "Caching the attention intermediates already computed, so only new tokens need incremental work.",
     "The cost is that it **occupies VRAM continuously** — which directly caps how long a context you can afford."
    ],
    "whyEn": "It is the most common cause of OOM when deploying locally. Raise the context size and you hit this first.",
    "slug": "KV 缓存"
   },
   {
    "zh": "上下文窗口的代价",
    "en": "Context Cost",
    "purpose": "上下文开得越大越慢越贵，不是免费扩容。",
    "def": [
     "窗口变大意味着注意力计算量和 KV 缓存占用同步上升。"
    ],
    "why": "解释了一个反直觉现象。把所有资料一次性塞进去，往往不如做 RAG 分批检索。",
    "refs": [
     [
      "RAG server 的做法",
      "https://agent.specul.com/tools/context7.html",
      "How a RAG server does it (context7)"
     ]
    ],
    "domain": "model",
    "purposeTag": "guard",
    "level": 4,
    "layer": "四",
    "ord": 6,
    "alias": [],
    "purposeEn": "A larger context window is slower and more expensive — it is not free capacity.",
    "defEn": [
     "A bigger window means attention computation and KV cache memory both grow."
    ],
    "whyEn": "It explains a counter-intuitive result: pasting in everything at once is often worse than retrieving in batches with RAG.",
    "slug": "上下文窗口的代价"
   },
   {
    "zh": "预训练",
    "en": "Pre-training",
    "purpose": "在海量文本上做「预测下一个词」，这是模型学到世界知识的阶段。",
    "def": [
     "第一批训练，目标单一：续写文本。成本以亿计。"
    ],
    "why": "它解释了为什么模型「什么都知道一点」。那是泛读的结果，不是为你的任务专门学的。",
    "refs": [
     [
      "BERT（论文）",
      "https://arxiv.org/abs/1810.04805",
      "BERT: Pre-training of Deep Bidirectional Transformers"
     ],
     [
      "Hugging Face 课程（Transformer）",
      "https://huggingface.co/learn/nlp-course/chapter1/4",
      "How do Transformers work? (Hugging Face NLP course)"
     ],
     [
      "从业者深版：预训练专题（AI 模型站）",
      "https://models.specul.com/guides/pretraining.html",
      "Practitioner deep-dive: pre-training (AI Models site)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 7,
    "alias": [],
    "purposeEn": "Predicting the next token over vast text — the stage where a model absorbs world knowledge.",
    "defEn": [
     "The first training run, with a single objective: continue the text. It costs hundreds of millions."
    ],
    "whyEn": "It explains why a model \"knows a bit about everything\": that is the result of reading widely, not learning for your task.",
    "slug": "预训练"
   },
   {
    "zh": "训练算力",
    "en": "Compute",
    "purpose": "训练和推理都要烧算力，这是 AI 最硬的资源门槛。",
    "def": [
     "训练需要大量 GPU 和时间；推理便宜得多但持续消耗。"
    ],
    "why": "它解释了为什么大模型公司烧钱、为什么本地跑大模型要先算显存账。",
    "refs": [
     [
      "算力与芯片相关站点",
      "https://nav.specul.com/",
      "Nav: compute & chips sites"
     ],
     [
      "从业者深版：数据与算力专题（AI 模型站）",
      "https://models.specul.com/guides/data-compute.html",
      "Practitioner deep-dive: data & compute guide (AI Models site)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 8,
    "alias": [],
    "purposeEn": "Both training and inference burn compute. This is AI's hardest resource threshold.",
    "defEn": [
     "Training needs many GPUs and a lot of time; inference is far cheaper but costs continuously."
    ],
    "whyEn": "It explains why large-model companies burn money, and why running one locally means doing the VRAM arithmetic first.",
    "slug": "训练算力"
   },
   {
    "zh": "推理成本",
    "en": "Inference Cost",
    "purpose": "模型每回答一次要花的钱，由输入和输出的 token 量决定。",
    "def": [
     "通常按输入 token 和输出 token 分别计价，输出更贵。",
     "同一个模型，问法不同，账单可以差一个量级。"
    ],
    "why": "这是把 AI 用在日常场景时最容易踩的坑。它也是「选模型」必须考虑的成本项。",
    "refs": [
     [
      "OpenAI 官方 API 定价",
      "https://openai.com/api/pricing/",
      "OpenAI API Pricing"
     ],
     [
      "OpenAI 官方模型文档",
      "https://platform.openai.com/docs/models",
      "OpenAI Models Documentation"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 4,
    "layer": "四",
    "ord": 9,
    "alias": [],
    "purposeEn": "What a model costs per answer, determined by how many tokens go in and come out.",
    "defEn": [
     "Usually priced separately for input and output tokens, with output more expensive.",
     "The same model can cost an order of magnitude more depending on how you phrase the question."
    ],
    "whyEn": "The easiest trap to fall into when using AI day to day, and a cost item any model choice has to account for.",
    "slug": "推理成本"
   },
   {
    "zh": "多头注意力",
    "en": "Multi-Head Attention",
    "purpose": "让模型同时从好几个角度去看一句话，而不是只盯一种关系。",
    "def": [
     "把注意力计算重复多遍，每遍关注句子里不同种类的关系，最后把结果合在一起。",
     "原论文用了 8 个「头」——相当于 8 个视角同时读同一句话。"
    ],
    "why": "单看一个词只有一种理解方式。多个头一起看，语法关系、指代关系、邻近关系才能同时被抓住。",
    "refs": [
     [
      "Attention Is All You Need（论文 §3.2）",
      "https://arxiv.org/abs/1706.03762",
      "Attention Is All You Need §3.2 (paper)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 10,
    "alias": [],
    "purposeEn": "Lets a model look at a sentence from several angles at once, instead of tracking only one kind of relation.",
    "defEn": [
     "Repeats the attention computation several times, each pass focusing on a different kind of relation, then combines the results.",
     "The original paper used 8 heads — like 8 readers examining the same sentence simultaneously."
    ],
    "whyEn": "A single attention pass yields a single kind of understanding. Multiple heads capture grammar, coreference, and adjacency at the same time.",
    "slug": "多头注意力"
   },
   {
    "zh": "前馈网络",
    "en": "Feed-Forward Network",
    "purpose": "Transformer 每层里的消化环节：注意力看完之后，由它加工。",
    "def": [
     "一种基本的神经网络结构：信息一层一层往前传，每层做一次变换。",
     "在 Transformer 里，每层先做注意力，再接一个前馈网络。",
     "这个前馈网络逐位置处理，两者交替进行。"
    ],
    "why": "注意力负责「谁和谁相关」，前馈网络负责「把相关的东西加工成判断」。缺了它，模型只会连线，不会思考。",
    "refs": [
     [
      "Attention Is All You Need（论文 §3.3）",
      "https://arxiv.org/abs/1706.03762",
      "Attention Is All You Need §3.3 (paper)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 11,
    "alias": [],
    "purposeEn": "The digestion step inside every Transformer layer: attention looks around, then this part processes.",
    "defEn": [
     "A basic neural-network structure: information passes layer by layer, each layer applying one transformation.",
     "In a Transformer, each layer runs attention first, then a feed-forward network.",
     "This feed-forward network works position by position, alternating with attention."
    ],
    "whyEn": "Attention decides which words relate to each other; the feed-forward network turns those relations into judgments. Without it, a model can only draw lines, not think.",
    "slug": "前馈网络"
   },
   {
    "zh": "残差连接",
    "en": "Residual Connection",
    "purpose": "给网络留一条「直通通道」，让信号穿过很多层也不丢失。",
    "def": [
     "每一层除了输出加工后的结果，还把自己收到的原始输入原样加上去。",
     "它来自图像识别里的 ResNet。",
     "后来它成了 Transformer 能堆到几十层的前提之一。"
    ],
    "why": "网络越深越容易训不动——信号穿过几十层会走样。直通通道让模型「改一点、保留大部分」，深才可行。",
    "refs": [
     [
      "ResNet 论文（Deep Residual Learning）",
      "https://arxiv.org/abs/1512.03385",
      "Deep Residual Learning for Image Recognition (paper)"
     ],
     [
      "Attention Is All You Need（论文 §3.1）",
      "https://arxiv.org/abs/1706.03762",
      "Attention Is All You Need §3.1 (paper)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 12,
    "alias": [],
    "purposeEn": "Gives the network a \"pass-through lane\" so the signal survives passing through many layers.",
    "defEn": [
     "Each layer adds its raw input back onto its processed output.",
     "It came from ResNet in image recognition.",
     "Later it became one of the prerequisites for Transformers stacking dozens of layers."
    ],
    "whyEn": "Deeper networks are harder to train — signals get distorted across dozens of layers. The pass-through lane lets the model \"change a bit, keep most of it,\" which is what makes depth feasible.",
    "slug": "残差连接"
   },
   {
    "zh": "层归一化",
    "en": "Layer Normalization",
    "purpose": "给网络每一层的输出做一次「调平」，让深层训练不失控。",
    "def": [
     "对单个样本在某一层里的全部数值做归一化（拉回统一的均值和方差），再往下传。",
     "Transformer 的每个子层后面都跟着它，和残差连接搭配使用。"
    ],
    "why": "深层网络里数值容易越传越偏，一旦失控训练就崩。调平是「模型能稳定训到几十层」的幕后功臣之一。",
    "refs": [
     [
      "Layer Normalization（论文）",
      "https://arxiv.org/abs/1607.06450",
      "Layer Normalization (paper)"
     ],
     [
      "Attention Is All You Need（论文 §3.1）",
      "https://arxiv.org/abs/1706.03762",
      "Attention Is All You Need §3.1 (paper)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 13,
    "alias": [],
    "purposeEn": "Levels out each layer's output so deep training doesn't spiral out of control.",
    "defEn": [
     "Normalizes all values of a single sample within one layer (back to a common mean and variance) before passing them on.",
     "In Transformers it follows every sub-layer, paired with residual connections."
    ],
    "whyEn": "Values in deep networks drift as they propagate; once they spiral, training collapses. Leveling is one of the behind-the-scenes reasons models train stably at dozens of layers.",
    "slug": "层归一化"
   },
   {
    "zh": "编码器与解码器",
    "en": "Encoder & Decoder",
    "purpose": "Transformer 的两种半机：一个读懂，一个生成。",
    "def": [
     "编码器读入整段文本、建立理解；解码器一边读已生成的部分、一边往下写。",
     "BERT 基于编码器。GPT 一类模型只用解码器这半边。",
     "论文里对它的说法是「只看左侧上下文的 Transformer」。"
    ],
    "why": "「读懂型」和「生成型」模型的分野就在这。它决定了模型擅长什么：理解检索，还是续写生成。",
    "refs": [
     [
      "Attention Is All You Need（论文 §3，完整结构）",
      "https://arxiv.org/abs/1706.03762",
      "Attention Is All You Need §3 (paper)"
     ],
     [
      "BERT 论文（基于 Transformer 编码器）",
      "https://arxiv.org/abs/1810.04805",
      "BERT paper (Transformer encoder)"
     ],
     [
      "GPT-1 论文（多层 Transformer 解码器）",
      "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf",
      "GPT-1 paper (Transformer decoder)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 14,
    "alias": [],
    "purposeEn": "The two halves of a Transformer: one reads, one generates.",
    "defEn": [
     "The encoder reads a whole passage and builds understanding; the decoder reads what has been generated so far and keeps writing.",
     "BERT is built on the encoder. GPT-style models use only the decoder half.",
     "The papers call it \"a Transformer that attends only to left context\"."
    ],
    "whyEn": "The divide between \"understanding models\" and \"generation models\" sits right here. It decides what a model is good at: retrieval and comprehension, or continuation and generation.",
    "slug": "编码器与解码器"
   },
   {
    "zh": "子词分词",
    "en": "Subword Tokenization",
    "purpose": "把词切成更小的碎片，让模型遇到没见过的词也能拼出来。",
    "def": [
     "最常见的方案是 BPE：从字符出发，按出现频率反复合并相邻片段，得到一套子词。",
     "「未登录词」问题由此缓解——整词不在词表里，它的碎片多半在。"
    ],
    "why": "你看到模型把生僻词拆成奇怪片段，不是「不认识」，是子词分词在工作。词表大小与合并规则共同决定模型对中文、代码的友好度。",
    "refs": [
     [
      "BPE 原论文（Subword Units）",
      "https://arxiv.org/abs/1508.07909",
      "Neural Machine Translation of Rare Words with Subword Units (paper)"
     ],
     [
      "Hugging Face 分词器课程",
      "https://huggingface.co/learn/nlp-course/chapter2/4",
      "Hugging Face NLP Course: Tokenizers chapter"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 15,
    "alias": [],
    "purposeEn": "Cuts words into smaller fragments so a model can still assemble words it has never seen.",
    "defEn": [
     "The dominant scheme is BPE: start from characters, repeatedly merge the most frequent adjacent pairs into a subword inventory.",
     "It eases the out-of-vocabulary problem — a whole word may miss the vocabulary, but its fragments usually are in it."
    ],
    "whyEn": "When a model splits a rare word into odd fragments, it is not \"failing to recognize\" it — subword tokenization is at work. Vocabulary size and merge rules together decide how friendly a model is to Chinese and code.",
    "slug": "子词分词"
   },
   {
    "zh": "训练三阶段",
    "en": "SFT → Reward Model → RL",
    "purpose": "聊天模型是怎么练成的：先会续写，再学会好好回答。",
    "def": [
     "第一阶段是预训练：海量文本上学续写。",
     "第二阶段训练奖励模型：人给多个回答排序，模型学会判断好坏。",
     "第三阶段是强化学习：按奖励模型的打分继续优化。"
    ],
    "why": "ChatGPT 一类模型的「听话」来自后两阶段，不是预训练。较新的 DPO 把后两阶段合并成一步，不用单独训奖励模型。",
    "refs": [
     [
      "InstructGPT 论文（三阶段见 §3.1）",
      "https://arxiv.org/abs/2203.02155",
      "InstructGPT paper (three stages, §3.1)"
     ],
     [
      "DPO 论文（免 RL 的对齐方法）",
      "https://arxiv.org/abs/2305.18290",
      "Direct Preference Optimization (paper)"
     ],
     [
      "从业者深版：SFT 与偏好对齐专题（AI 模型站）",
      "https://models.specul.com/guides/sft.html",
      "Practitioner deep-dives: SFT and alignment (AI Models site)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 16,
    "alias": [],
    "purposeEn": "How chat models are trained: first they learn to continue text, then they learn to answer well.",
    "defEn": [
     "Stage one is pretraining: learning to continue text from massive corpora.",
     "Stage two trains a reward model: humans rank candidate answers, and a model learns to judge quality.",
     "Stage three is reinforcement learning: keep optimizing against the reward model's scores."
    ],
    "whyEn": "What makes ChatGPT-style models \"follow instructions\" comes from stages two and three, not pretraining. The newer DPO merges the last two stages into one, with no separate reward model.",
    "slug": "训练三阶段"
   },
   {
    "zh": "知识蒸馏",
    "en": "Knowledge Distillation",
    "purpose": "用大模型的软输出训练小模型：能力保留大半，部署容易得多。",
    "def": [
     "大模型带高温 softmax 输出「软目标」，小模型学这些概率分布。",
     "通行的「教师 / 学生」叫法是后来的通俗命名。",
     "原论文的用词是 cumbersome model 与 distilled model。"
    ],
    "why": "你能在本地跑的小模型，不少是蒸馏产物。模型名里带 -distill 或 - distilled，多半和它有关。",
    "refs": [
     [
      "Hinton 等人《Distilling the Knowledge in a Neural Network》",
      "https://arxiv.org/abs/1503.02531",
      "Distilling the Knowledge in a Neural Network (paper)"
     ],
     [
      "从业者深版：蒸馏专题（AI 模型站）",
      "https://models.specul.com/guides/distillation.html",
      "Practitioner deep-dive: distillation (AI Models site)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 17,
    "alias": [],
    "purposeEn": "Train a small model on a big model's soft outputs: keep most of the capability, deploy far more easily.",
    "defEn": [
     "The large model emits \"soft targets\" via a high-temperature softmax; the small model learns those probability distributions.",
     "The popular \"teacher / student\" wording is a later community name; the original paper says cumbersome model and distilled model."
    ],
    "whyEn": "Many small models you can run locally are distilled products. Model names containing -distill or -distilled usually relate to this.",
    "slug": "知识蒸馏"
   },
   {
    "zh": "MoE（混合专家）",
    "en": "Mixture of Experts (MoE)",
    "purpose": "一种模型结构：每层放很多「专家」，每个词只用到其中少数几个。",
    "def": [
     "MoE 层由多个专家子网络加一个可训练的门控（路由）网络组成。",
     "每个 token 只激活少数专家。",
     "参数总量大增，但每 token 的计算量近似不变。",
     "Switch Transformer 把路由简化成每 token 只选一个专家。"
    ],
    "why": "DeepSeek、Mixtral 这类大模型用的就是它。「总参数」和「激活参数」是两个数，看模型别被前者吓到或骗到。",
    "refs": [
     [
      "Switch Transformer（论文）",
      "https://arxiv.org/abs/2101.03961",
      "Switch Transformers (paper)"
     ],
     [
      "Shazeer 等《Sparsely-Gated Mixture-of-Experts Layer》",
      "https://arxiv.org/abs/1701.06538",
      "Outrageously Large Neural Networks: The Sparsely-Gated MoE Layer (paper)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 18,
    "alias": [],
    "purposeEn": "A model architecture: each layer holds many \"experts,\" but each word uses only a few of them.",
    "defEn": [
     "An MoE layer is several expert sub-networks plus a trainable gating (routing) network.",
     "Each token activates only a few experts — total parameters grow hugely while per-token compute stays roughly constant.",
     "Switch Transformer simplified routing to one expert per token."
    ],
    "whyEn": "DeepSeek and Mixtral use it. \"Total parameters\" and \"active parameters\" are two different numbers — do not let the first one intimidate or mislead you.",
    "slug": "MoE - 混合专家"
   },
   {
    "zh": "上下文学习",
    "en": "In-context Learning",
    "purpose": "在对话里现学现用：给几个例子，模型就会做新任务，不用重新训练。",
    "def": [
     "GPT-3 论文的核心论点：模型不更新权重。",
     "它只靠提示里的任务说明和少量示例完成任务。",
     "示例给 0 个、1 个还是几个，效果差别很大。",
     "论文标题就是「Few-Shot Learners」。"
    ],
    "why": "你调提示词、给示例、贴一段参考——用的全是它。知道它的边界，才知道什么时候该考虑微调。",
    "refs": [
     [
      "GPT-3 论文（Language Models are Few-Shot Learners）",
      "https://arxiv.org/abs/2005.14165",
      "GPT-3 paper (few-shot learners)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 19,
    "alias": [],
    "purposeEn": "Learning on the spot inside a conversation: give a few examples and the model does a new task, no retraining.",
    "defEn": [
     "The core claim of the GPT-3 paper: the model updates no weights, relying only on task instructions and a few examples in the prompt.",
     "Whether you give 0, 1, or several examples changes results a lot — the paper's title is literally \"Few-Shot Learners.\""
    ],
    "whyEn": "Tweaking prompts, giving examples, pasting reference text — all of it uses this. Knowing its limits tells you when fine-tuning is the better route.",
    "slug": "上下文学习"
   },
   {
    "zh": "长上下文",
    "en": "Long Context",
    "purpose": "让模型一次读入几十万字的技术，和它为什么贵。",
    "def": [
     "注意力的计算量随文本长度平方增长——文本长十倍，计算多百倍。",
     "各家靠改注意力、改位置编码、做缓存来压这个成本。",
     "窗口从几千 token 走到百万级。",
     "窗口长不等于读得准：超长文本里模型对中间部分的把握会下降。"
    ],
    "why": "「能塞进去」和「能用好」是两回事。选模型看窗口数字之前，先看你真需要多长、它长文实测怎么样。",
    "refs": [
     [
      "Attention Is All You Need（复杂度表：自注意力每层 O(n²·d)）",
      "https://arxiv.org/abs/1706.03762",
      "Attention Is All You Need (complexity table)"
     ],
     [
      "Google 官方博客：Gemini 1.5 宣布 100 万 token 窗口（私有预览）",
      "https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/",
      "Google blog: Gemini 1.5 1M-token context (private preview)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 20,
    "alias": [],
    "purposeEn": "The technology behind reading hundreds of thousands of words at once — and why it is expensive.",
    "defEn": [
     "Attention cost grows with the square of text length — 10x the text means 100x the compute.",
     "Vendors tame the cost with modified attention, positional encoding, and caching; windows grew from thousands of tokens to millions.",
     "A long window does not mean accurate reading: grasp of the middle of very long text drops."
    ],
    "whyEn": "\"Can fit it in\" and \"can use it well\" are different things. Before comparing window sizes, check how long you actually need and how the model performs on long text in practice.",
    "slug": "长上下文"
   },
   {
    "zh": "自回归生成",
    "en": "Autoregressive Generation",
    "purpose": "大模型「一个字一个字往外蹦」的生成方式，很多下游问题的根源。",
    "def": [
     "自回归模型逐 token 生成。每一步以已生成的文本为条件，预测下一个 token。",
     "GPT 系列论文对自己的定义就是「自回归语言模型」。",
     "生成质量取决于每一步的选择，错误也会顺着往下带。"
    ],
    "why": "流式输出为什么是一个字一个字出来的？为什么中途能停？为什么一步选歪后面会顺着歪？根源都在这。",
    "refs": [
     [
      "GPT-3 论文（Brown et al. 2020，摘要自称 an autoregressive language model）",
      "https://arxiv.org/abs/2005.14165",
      "GPT-3 paper (Brown et al. 2020)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 21,
    "alias": [],
    "purposeEn": "How large models emit text one token at a time — the root of many downstream issues.",
    "defEn": [
     "An autoregressive model generates token by token: each step predicts the next token conditioned on what has already been generated.",
     "The GPT papers define their own models as autoregressive language models.",
     "Output quality depends on every single step; errors get carried forward."
    ],
    "whyEn": "Why streamed output arrives word by word, why it can be stopped mid-way, why one bad pick warps what follows — it all traces back to this.",
    "slug": "自回归生成"
   },
   {
    "zh": "logits 与概率分布",
    "en": "Logits and Probability Distribution",
    "purpose": "模型每一步输出的不是词，而是整个词表的分数表。采样参数都作用在这上面。",
    "def": [
     "每一步，模型给词表里每个候选 token 打一个分数，即 logits。",
     "分数经 softmax 变成概率分布：所有候选的概率加起来为 1。",
     "温度、top-k、top-p 都是在这张分布上做手脚。"
    ],
    "why": "理解了它，采样参数不再是玄学。它们改的是分布的形状，不是模型的「想法」。",
    "refs": [
     [
      "Jurafsky & Martin《Speech and Language Processing》第 3 章（语言模型输出词表上的概率分布）",
      "https://web.stanford.edu/~jurafsky/slp3/3.pdf",
      "Jurafsky & Martin, Speech and Language Processing, ch. 3"
     ],
     [
      "Holtzman 等《The Curious Case of Neural Text Degeneration》§3.3（温度采样的讨论）",
      "https://arxiv.org/abs/1904.09751",
      "Holtzman et al., The Curious Case of Neural Text Degeneration, §3.3"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 22,
    "alias": [],
    "purposeEn": "What the model outputs at each step is not a word but a score table over the whole vocabulary. All sampling parameters act on it.",
    "defEn": [
     "At each step the model assigns a score — a logit — to every candidate token in the vocabulary.",
     "Softmax turns the scores into a probability distribution: all candidates sum to 1.",
     "Temperature, top-k and top-p all reshape this distribution."
    ],
    "whyEn": "Once you get it, sampling parameters stop being mysticism: they change the shape of the distribution, not the model's 'mind'.",
    "slug": "logits 与概率分布"
   },
   {
    "zh": "贪心解码与束搜索",
    "en": "Greedy Decoding and Beam Search",
    "purpose": "每步都选最可能词的解码方式，以及它为什么反而写出空洞重复的文本。",
    "def": [
     "贪心解码每步取概率最高的 token。束搜索同时保留几条最优路径。",
     "Holtzman 等人指出这类解码的问题。",
     "以最大化为主的解码会产出平淡、空洞、陷入重复循环的文本。",
     "对策之一是 nucleus sampling（top-p）。每步从累计概率首次达到 p 的最小候选集里采样。"
    ],
    "why": "「选最可能的词」听起来最稳，实测却最容易写得干瘪复读。这解释了为什么聊天模型默认带随机性。",
    "refs": [
     [
      "Holtzman 等《The Curious Case of Neural Text Degeneration》（ICLR 2020）",
      "https://arxiv.org/abs/1904.09751",
      "Holtzman et al., The Curious Case of Neural Text Degeneration (ICLR 2020)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 23,
    "alias": [],
    "purposeEn": "Decoding that always picks the most likely token — and why it instead produces hollow, repetitive text.",
    "defEn": [
     "Greedy decoding takes the highest-probability token at each step; beam search keeps several best paths in parallel.",
     "Holtzman et al. identified the problem with this class of decoding.",
     "Maximization-based decoding yields text that is bland, incoherent, or stuck in repetitive loops.",
     "One countermeasure is nucleus sampling (top-p): sample from the smallest candidate set whose cumulative probability first reaches p."
    ],
    "whyEn": "'Pick the most likely word' sounds safest but in practice writes the dullest, most repetitive prose. This is why chat models ship with randomness by default.",
    "slug": "贪心解码与束搜索"
   },
   {
    "zh": "幻觉的成因",
    "en": "Why Hallucination Happens",
    "purpose": "为什么模型会一本正经地编：不是它想骗你，是训练目标使然。",
    "def": [
     "语言模型本质是逐词概率预测器，训练要求它永远给出下一个词的猜测。",
     "Anthropic 的研究页直言：训练鼓励幻觉。模型于是会编出貌似合理但不真的回答。",
     "学界常把幻觉定义为「生成内容不被输入来源支持或与事实不符」。",
     "流畅自然的表象与不忠实并存，这正是它难被发现的原因。"
    ],
    "why": "知道成因，才知道哪些缓解手段有效、哪些只是安慰。给出处、允许说不知道属于前者。",
    "refs": [
     [
      "Anthropic 官方研究页《Tracing the thoughts of a large language model》",
      "https://www.anthropic.com/research/tracing-thoughts-language-model",
      "Anthropic research: Tracing the thoughts of a large language model"
     ],
     [
      "Ji 等《Hallucination in Large Language Models: A Survey》（ACM Computing Surveys 2023）",
      "https://arxiv.org/abs/2202.03629",
      "Ji et al., Hallucination Survey (ACM Computing Surveys 2023)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "guard",
    "level": 4,
    "layer": "四",
    "ord": 24,
    "alias": [],
    "purposeEn": "Why models fabricate with a straight face: not deception, but the training objective.",
    "defEn": [
     "A language model is a word-by-word probability predictor; training requires it to always guess the next word.",
     "Anthropic's research page states plainly that training incentivizes hallucination, so the model confabulates plausible-but-untrue responses.",
     "The standard definition: generated content not supported by the input source or contrary to fact.",
     "Fluent, natural surface coexists with unfaithfulness — that is exactly why it is hard to spot."
    ],
    "whyEn": "Knowing the cause tells you which mitigations actually work (provide sources, allow 'I don't know') and which are just reassurance.",
    "slug": "幻觉的成因"
   },
   {
    "zh": "困惑度",
    "en": "Perplexity (PPL)",
    "purpose": "语言模型最常用的内在评测指标：模型对测试文本有多「意外」。",
    "def": [
     "困惑度定义为模型对测试序列逐 token 平均负对数似然的指数。",
     "等价于平均交叉熵损失的指数。困惑度越低，模型对文本预测越确信。",
     "它对分词方式敏感：只宜在相同 tokenizer 的模型之间直接比较。",
     "它适用于自回归模型，对 BERT 这类掩码模型定义不佳。"
    ],
    "why": "论文和模型卡常报这个数。知道它只跟同分词的模型可比，就不会被跨家的困惑度数字误导。",
    "refs": [
     [
      "Hugging Face Transformers 官方文档《Perplexity of fixed-length models》",
      "https://huggingface.co/docs/transformers/perplexity",
      "Hugging Face docs: Perplexity of fixed-length models"
     ],
     [
      "Jurafsky & Martin《Speech and Language Processing》§3.3 与 §7.7.1",
      "https://web.stanford.edu/~jurafsky/slp3/3.pdf",
      "Jurafsky & Martin, Speech and Language Processing, §3.3 and §7.7.1"
     ]
    ],
    "domain": "concept",
    "purposeTag": "judge",
    "level": 4,
    "layer": "四",
    "ord": 25,
    "alias": [],
    "purposeEn": "The most common intrinsic metric for language models: how surprised the model is by test text.",
    "defEn": [
     "Perplexity is the exponentiated average negative log-likelihood of a sequence, token by token.",
     "Equivalently, the exponent of the average cross-entropy loss; lower perplexity means the model predicts the text more confidently.",
     "It is sensitive to tokenization: compare it directly only between models sharing the same tokenizer.",
     "It applies to autoregressive models and is ill-defined for masked models like BERT."
    ],
    "whyEn": "Papers and model cards report this number. Knowing it is only comparable across same-tokenizer models keeps you from being misled by cross-vendor figures.",
    "slug": "困惑度"
   },
   {
    "zh": "缩放定律",
    "en": "Scaling Laws",
    "purpose": "损失随参数、数据、算力呈幂律下降的经验规律。它是大模型军备竞赛的理论依据。",
    "def": [
     "Kaplan 等人发现：损失随参数量、数据量、训练算力各自呈幂律变化。这一趋势跨越七个以上数量级。",
     "该文主张固定算力下主要增大模型（并概括为「大模型可能比大数据更重要」）。",
     "Hoffmann 等人发表 Chinchilla 论文。他们基于 400 余个模型的实验提出反驳。结论是算力最优时，参数量与训练 token 数应等比放大。",
     "他们据此指出现有大模型普遍训练不足。"
    ],
    "why": "「模型多大、喂多少数据」不是拍脑袋，背后有这两篇。各家训练配方转向海量数据，源头就在这。",
    "refs": [
     [
      "Kaplan 等《Scaling Laws for Neural Language Models》",
      "https://arxiv.org/abs/2001.08361",
      "Kaplan et al., Scaling Laws for Neural Language Models"
     ],
     [
      "Hoffmann 等《Training Compute-Optimal Large Language Models》（Chinchilla）",
      "https://arxiv.org/abs/2203.15556",
      "Hoffmann et al., Training Compute-Optimal LLMs (Chinchilla)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 26,
    "alias": [],
    "purposeEn": "The empirical power-law by which loss falls with parameters, data, and compute — the theory behind the scaling arms race.",
    "defEn": [
     "Kaplan et al. found loss follows power laws in model size, dataset size, and training compute, with trends spanning more than seven orders of magnitude.",
     "That paper favored growing model size under a fixed compute budget, summarized as 'big models may be more important than big data'.",
     "Hoffmann et al. (Chinchilla), from over 400 trained models, countered: compute-optimal training scales parameters and training tokens equally.",
     "They concluded that existing large models were significantly undertrained."
    ],
    "whyEn": "'How big, how much data' is not guesswork — these two papers are behind it. The industry's shift to massive data diets traces to them.",
    "slug": "缩放定律"
   },
   {
    "zh": "涌现能力",
    "en": "Emergent Abilities",
    "purpose": "小模型没有、大模型突然会了的能力——以及它可能是评测假象的争论。",
    "def": [
     "Wei 等人把涌现定义为：小模型不具备、大模型具备的能力。这种能力无法由小模型的缩放曲线外推预测。",
     "思维链提示就是文中举的涌现例子。",
     "Schaeffer 等人提出相反解释：许多「涌现」源于评测指标的非连续选择。",
     "改用连续指标后，性能随规模平滑变化；涌现未必是缩放的根本属性。"
    ],
    "why": "「大到某个规模突然会变聪明」是营销常用话术。正反两篇都读过，你才有判断依据。",
    "refs": [
     [
      "Wei 等《Emergent Abilities of Large Language Models》（TMLR 2022）",
      "https://arxiv.org/abs/2206.07682",
      "Wei et al., Emergent Abilities of Large Language Models (TMLR 2022)"
     ],
     [
      "Schaeffer 等《Are Emergent Abilities of Large Language Models a Mirage?》（NeurIPS 2023）",
      "https://arxiv.org/abs/2304.15004",
      "Schaeffer et al., Are Emergent Abilities a Mirage? (NeurIPS 2023)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "judge",
    "level": 4,
    "layer": "四",
    "ord": 27,
    "alias": [],
    "purposeEn": "Abilities small models lack that large models suddenly have — and the dispute that they may be a metric artifact.",
    "defEn": [
     "Wei et al. define an emergent ability as one absent in smaller models but present in larger ones, unpredictable by extrapolating small-model scaling curves.",
     "Chain-of-thought prompting is their flagship example.",
     "Schaeffer et al. offered the opposite account: many apparent emergences come from discontinuous metric choices.",
     "With continuous metrics, performance changes smoothly with scale; emergence may not be a fundamental property of scaling."
    ],
    "whyEn": "'Suddenly gets smart past some size' is a marketing staple. Read both sides before you judge the claim.",
    "slug": "涌现能力"
   },
   {
    "zh": "思维链",
    "en": "Chain of Thought (CoT)",
    "purpose": "让模型先列推理步骤再给答案的提示方式，以及它对模型规模的依赖。",
    "def": [
     "Wei 等人提出：在示例中给出若干中间推理步骤，可显著提升足够大的模型的推理表现。",
     "PaLM 540B 仅用 8 个思维链示例。它在 GSM8K 数学题上达到当时最优。",
     "该文同时指出思维链是规模的涌现能力：约 10B 以下的小模型上反而降低性能。",
     "小模型会产出「流畅但无逻辑」的推理链。"
    ],
    "why": "「让模型一步步想」对小模型可能有害。知道规模门槛，才知道这招什么时候该用、什么时候是自我安慰。",
    "refs": [
     [
      "Wei 等《Chain-of-Thought Prompting Elicits Reasoning in Large Language Models》",
      "https://arxiv.org/abs/2201.11903",
      "Wei et al., Chain-of-Thought Prompting (NeurIPS 2022)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "apply",
    "level": 4,
    "layer": "四",
    "ord": 28,
    "alias": [],
    "purposeEn": "Prompting the model to lay out reasoning steps before answering — and its dependence on model scale.",
    "defEn": [
     "Wei et al. showed that a few chain-of-thought exemplars markedly improve reasoning in sufficiently large models.",
     "PaLM 540B with just eight exemplars reached state-of-the-art accuracy on the GSM8K math benchmark.",
     "The same paper shows CoT is an emergent ability of scale: it hurts models below roughly 10B parameters.",
     "Small models produce fluent but illogical chains of thought."
    ],
    "whyEn": "'Make the model think step by step' can backfire on small models. Knowing the scale threshold tells you when the trick works and when it is self-comfort.",
    "slug": "思维链"
   },
   {
    "zh": "数据污染",
    "en": "Data Contamination",
    "purpose": "评测题混进训练数据，模型「考过原题」——评测分数因此失真。",
    "def": [
     "指评测集的内容在预训练阶段混进了训练数据，被模型提前见过。",
     "GPT-3 论文自己就做过 n-gram 重叠检查，评估各评测集被污染的影响。",
     "Magar 与 Schwartz 进一步把污染分成两种行为：「记住」与「利用」。该研究对两者做了量化。",
     "静态评测集公开可得，污染几乎不可避免。"
    ],
    "why": "榜单上「某模型在 X 基准特别高」，可能只是它见过原题。评测评判模型前先问：这个基准会不会已经漏进训练数据。",
    "refs": [
     [
      "GPT-3 论文 §2.2 与 §4/附录 C（测试集污染的 n-gram 重叠研究）",
      "https://arxiv.org/abs/2005.14165",
      "GPT-3 paper §2.2 and §4/Appendix C (test set contamination studies)"
     ],
     [
      "Magar & Schwartz《Data Contamination: From Memorization to Exploitation》（ACL 2022）",
      "https://arxiv.org/abs/2203.08242",
      "Magar & Schwartz, Data Contamination: From Memorization to Exploitation (ACL 2022)"
     ]
    ],
    "domain": "concept",
    "purposeTag": "judge",
    "level": 4,
    "layer": "四",
    "ord": 29,
    "alias": [],
    "purposeEn": "Eval questions leaking into training data — models have 'seen the exam', so scores become distorted.",
    "defEn": [
     "Contamination means evaluation-set content was inadvertently seen during pre-training.",
     "The GPT-3 paper itself ran n-gram overlap checks to assess contamination across eval sets.",
     "Magar & Schwartz split contamination into memorization and exploitation, and quantified both.",
     "With static eval sets publicly available, contamination is nearly unavoidable."
    ],
    "whyEn": "'Model X tops benchmark Y' may just mean it saw the questions. Before trusting a leaderboard slot, ask whether that benchmark has already leaked into training data.",
    "slug": "数据污染"
   },
   {
    "zh": "评测饱和",
    "en": "Benchmark Saturation",
    "purpose": "基准被刷到接近满分、失去区分度——榜单为什么需要持续更新。",
    "def": [
     "Ott 等人对 3765 个基准的实证研究显示：相当比例的基准迅速接近饱和。",
     "饱和加上静态数据公开可得，导致过拟合评测集。",
     "社区因此主张用持续更新的数据流做评测，替代一考定终身。",
     "看榜单先看基准的发布日期和饱和程度。"
    ],
    "why": "「在 X 榜第一」的含金量取决于那个榜还剩多少区分度。饱和榜单上的名次差距可能毫无意义。",
    "refs": [
     [
      "Ott 等《Mapping global dynamics of benchmark creation and saturation in AI》（Nature Communications 2022）",
      "https://arxiv.org/abs/2203.04592",
      "Ott et al., Benchmark creation and saturation in AI (Nature Communications 2022)"
     ],
     [
      "HelloFresh：用持续数据流评测对抗污染与过拟合",
      "https://arxiv.org/abs/2406.03428",
      "HelloFresh: continuous data streams against contamination and overfitting"
     ]
    ],
    "domain": "concept",
    "purposeTag": "judge",
    "level": 4,
    "layer": "四",
    "ord": 30,
    "alias": [],
    "purposeEn": "Benchmarks approach perfect scores and lose discriminating power — why leaderboards need constant renewal.",
    "defEn": [
     "Ott et al.'s study of 3,765 benchmarks found a large fraction quickly trended towards near-saturation.",
     "Saturation plus publicly available static data leads to overfitting the eval set.",
     "The community therefore advocates evaluation on continuously updated data streams instead of one-shot exams.",
     "When reading a leaderboard, check the benchmark's release date and how saturated it is."
    ],
    "whyEn": "The value of 'number one on X' depends on how much headroom that benchmark still has. Rank gaps on a saturated board can be meaningless.",
    "slug": "评测饱和"
   },
   {
    "zh": "扩散模型怎么生成",
    "en": "How Diffusion Models Generate",
    "purpose": "生图主流方法在原理层长什么样：加噪、去噪、预测噪声。",
    "def": [
     "训练分两个过程。前向过程把真图一步步加噪，直到变成纯噪声。",
     "反向过程学的是去噪：每一步预测当前图里混进了多少噪声。",
     "生成时从一片随机噪声出发，按学到的去噪步骤一步步「擦」出图像。",
     "DDPM（Ho 等，2020）把这套做法确立为主流方法。",
     "潜扩散模型（LDM，2021）把扩散搬进 VAE 压缩后的潜空间。算力大幅下降，今天多数生图模型是这一支。"
    ],
    "why": "第二站的「扩散模型」告诉你它是什么；这一条告诉你它为什么这样工作。生图要迭代多步、「步数」是个参数，都从这里来。",
    "refs": [
     [
      "DDPM 原论文《Denoising Diffusion Probabilistic Models》（arXiv）",
      "https://arxiv.org/abs/2006.11239",
      "Denoising Diffusion Probabilistic Models (arXiv 2006.11239)"
     ],
     [
      "潜扩散模型（LDM）原论文",
      "https://arxiv.org/abs/2112.10752",
      "High-Resolution Image Synthesis with Latent Diffusion Models (arXiv 2112.10752)"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 31,
    "alias": [],
    "purposeEn": "What the mainstream image-generation method looks like at the principle level: add noise, remove noise, predict noise.",
    "defEn": [
     "Training has two processes. The forward process adds noise to a real image step by step until it is pure noise.",
     "The reverse process learns denoising: at each step it predicts how much noise the current image contains.",
     "Generation starts from random noise and 'erases' an image by following the learned denoising steps.",
     "DDPM (Ho et al., 2020) established this recipe as the mainstream method.",
     "Latent diffusion (LDM, 2021) runs the diffusion inside a VAE-compressed latent space, cutting compute sharply. Most image models today are this branch."
    ],
    "whyEn": "The station-2 entry 'diffusion model' tells you what it is; this one tells you why it works that way. The many iterations and the 'steps' parameter both come from here.",
    "slug": "扩散模型怎么生成"
   },
   {
    "zh": "视频生成是怎么做的",
    "en": "How Video Generation Works",
    "purpose": "视频生成不是「逐帧生图」那么简单：时间一致性才是难点。",
    "def": [
     "视频扩散模型在图像扩散的基础上加入时间维度，让相邻帧保持连贯。",
     "《Video Diffusion Models》（Ho 等，2022）是早期代表作。先建空间模型，再加时序层。",
     "难点在一致性：物体移动、镜头运动都要跨帧连贯，模型常在这里出错。",
     "时长与一致性是当前主要限制。这也是它比生图更不成熟的原因。"
    ],
    "why": "选视频工具时，能生成多长、稳不稳，比画面好不好看更能区分产品。",
    "refs": [
     [
      "《Video Diffusion Models》论文（arXiv）",
      "https://arxiv.org/abs/2204.03458",
      "Video Diffusion Models (arXiv 2204.03458)"
     ],
     [
      "OpenAI Sora 官方页",
      "https://openai.com/index/sora/",
      "OpenAI Sora (official)"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 32,
    "alias": [],
    "purposeEn": "Video generation is not simply 'generate one frame at a time': temporal consistency is the hard part.",
    "defEn": [
     "Video diffusion models add a temporal dimension on top of image diffusion so neighbouring frames stay coherent.",
     "Video Diffusion Models (Ho et al., 2022) is an early landmark. Build the spatial model first, then add temporal layers.",
     "The difficulty is consistency — object motion and camera motion must stay coherent across frames, and models fail here most often.",
     "Duration and consistency are the current limits. That is why it is less mature than image generation."
    ],
    "whyEn": "When choosing a video tool, 'how long can it generate, how stable is it' separates products better than 'does the picture look good'.",
    "slug": "视频生成是怎么做的"
   },
   {
    "zh": "语音克隆是怎么做的",
    "en": "How Voice Cloning Works",
    "purpose": "几秒录音就能合成某人声音：原理是「声纹向量」与「读文本」分开训练。",
    "def": [
     "说话人编码器先把几秒参考录音压成一个固定长度的声纹向量。",
     "语音合成模型读文本时以这个向量为条件，输出带该音色的语音。",
     "2018 年 Google 的做法确立了这条路：编码器与合成器分开训练，互不拖累。",
     "YourTTS（2021）把它做成开源零样本。几秒录音即可克隆，不需要微调，还能跨语言。",
     "这是滥用风险最高的生成能力之一。中国《生成式 AI 服务管理暂行办法》第十二条要求生成内容按深度合成规定加标识。"
    ],
    "why": "接到「像某某人的声音」的需求时要知道三件事。技术上很容易。合规上有标识义务，伦理上需要本人同意。",
    "refs": [
     [
      "Jia 等《Transfer Learning from Speaker Verification to Multispeaker TTS》（NeurIPS 2018，arXiv）",
      "https://arxiv.org/abs/1806.04558",
      "Transfer Learning from Speaker Verification to Multispeaker TTS (NeurIPS 2018)"
     ],
     [
      "YourTTS 论文（零样本多说话人 TTS，arXiv）",
      "https://arxiv.org/abs/2112.02418",
      "YourTTS: Towards Zero-Shot Multi-Speaker TTS (arXiv 2112.02418)"
     ],
     [
      "《生成式人工智能服务管理暂行办法》全文（国家网信办）",
      "https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm",
      "Interim Measures for Generative AI Services (CAC, full text)"
     ]
    ],
    "domain": "media",
    "purposeTag": "guard",
    "level": 4,
    "layer": "四",
    "ord": 33,
    "alias": [],
    "purposeEn": "A few seconds of recording is enough to synthesise someone's voice: the principle is training 'voiceprint vector' and 'reading text' separately.",
    "defEn": [
     "A speaker encoder first compresses a few seconds of reference audio into a fixed-length voice embedding.",
     "The synthesis model conditions on that vector while reading text, producing audio in that timbre.",
     "Google's 2018 approach established the path: encoder and synthesizer are trained independently, so neither drags the other down.",
     "YourTTS (2021) made it open-source and zero-shot: no fine-tuning, a few seconds of audio to clone, and it works across languages.",
     "This is among the highest-abuse-risk generation capabilities. Article 12 of China's Interim Measures for Generative AI Services requires generated content to carry deep-synthesis labelling."
    ],
    "whyEn": "When someone asks for 'a voice like so-and-so', you need to know it is technically easy, carries a labelling obligation under regulation, and ethically requires that person's consent.",
    "slug": "语音克隆是怎么做的"
   },
   {
    "zh": "语音识别是怎么听的",
    "en": "How Speech Recognition Works",
    "purpose": "把话转成文字的主流做法：弱监督大规模训练，一个模型听多种口音。",
    "def": [
     "Whisper（OpenAI，2022）用 68 万小时网络音视频做弱监督训练。一套模型覆盖多语言与多口音。",
     "它把语音识别变成「翻译式」任务：音频进编码器，文字像解码输出一样逐词生成。",
     "弱监督的代价：训练数据没有人工校对，转写在专业词、口音边缘上会出错。",
     "评测口径是词错率（WER）：错词数除以总词数，越低越好。"
    ],
    "why": "语音功能的错误率直接决定后续理解质量。知道它是「统计转写」而不是「听懂」，才知道要在哪一环兜底。",
    "refs": [
     [
      "Whisper 论文《Robust Speech Recognition via Large-Scale Weak Supervision》（arXiv）",
      "https://arxiv.org/abs/2212.04356",
      "Robust Speech Recognition via Large-Scale Weak Supervision (arXiv 2212.04356)"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 34,
    "alias": [],
    "purposeEn": "The mainstream way to turn speech into text: large-scale weak supervision, one model for many accents.",
    "defEn": [
     "Whisper (OpenAI, 2022) trains on 680,000 hours of web audio-video with weak supervision; one model covers many languages and accents.",
     "It turns recognition into a translation-style task: audio goes into an encoder, text comes out as decoded output word by word.",
     "The cost of weak supervision: training data has no human proofreading, so transcripts fail on specialist terms and accent edges.",
     "The evaluation metric is word error rate (WER): wrong words divided by total words — lower is better."
    ],
    "whyEn": "The error rate of the speech stage directly determines the quality of everything after it. Knowing it is statistical transcription rather than understanding tells you where to add a safety net.",
    "slug": "语音识别是怎么听的"
   },
   {
    "zh": "文字怎么变成声音",
    "en": "How Text Becomes Speech",
    "purpose": "现代 TTS 的原理：端到端一步出波形，节奏是「猜」出来的分布。",
    "def": [
     "老式 TTS 分两步：先把文字转成频谱图，再用声码器还原成波形。两步分开训练，误差会叠加。",
     "FastSpeech 2（2020）用非自回归方式并行生成频谱，训练提速三倍。",
     "VITS（2021）把两步合成一个端到端模型，直接从文字生成波形。人耳评测接近真人录音。",
     "「一对多」是核心难点：同一句话可以有多种语速和语调。VITS 用随机时长预测器把这种变化建模成分布，而不是取平均。",
     "取平均的代价就是「机器人腔」。"
    ],
    "why": "合成语音「不像真人」时，问题多半在节奏建模，不在音质或采样率。",
    "refs": [
     [
      "FastSpeech 2 论文（arXiv）",
      "https://arxiv.org/abs/2006.04558",
      "FastSpeech 2: Fast and High-Quality End-to-End Text to Speech (arXiv 2006.04558)"
     ],
     [
      "VITS 论文（端到端语音合成，arXiv）",
      "https://arxiv.org/abs/2106.06103",
      "Conditional VAE with Adversarial Learning for End-to-End TTS (arXiv 2106.06103)"
     ]
    ],
    "domain": "media",
    "purposeTag": "learn",
    "level": 4,
    "layer": "四",
    "ord": 35,
    "alias": [],
    "purposeEn": "How modern TTS works end to end: one model outputs the waveform, and rhythm is a distribution it samples rather than an average.",
    "defEn": [
     "Old-style TTS had two stages: text to spectrogram, then a vocoder back to waveform. Training them separately lets errors compound.",
     "FastSpeech 2 (2020) generates spectrograms in parallel with a non-autoregressive model, a 3x training speed-up over FastSpeech.",
     "VITS (2021) merges the two stages into one end-to-end model that generates waveform directly from text, with human listening tests close to real recordings.",
     "The one-to-many mapping is the core difficulty: the same sentence can be spoken at many speeds and intonations. VITS models that variation as a distribution with a stochastic duration predictor instead of averaging it.",
     "Averaging is exactly what produces the 'robotic' sound."
    ],
    "whyEn": "When synthesised speech 'doesn't sound human', the problem is usually in rhythm modelling, not audio quality or sample rate.",
    "slug": "文字怎么变成声音"
   }
  ]
 },
 {
  "num": "五",
  "name": "跑起来",
  "desc": "让模型跑在自己机器上。你会关心显存够不够、跑得多快。",
  "terms": [
   {
    "zh": "GPU",
    "en": "Graphics Processing Unit",
    "alias": [
     "显卡",
     "图形处理器"
    ],
    "purpose": "真正做矩阵运算的芯片。跑大模型靠它，CPU 很慢。",
    "def": [
     "擅长大规模并行计算的处理器，最初为图形渲染设计，现在是大模型训练与推理的主力。"
    ],
    "why": "决定你「能不能跑、跑多快」。同一张卡，显存大小比算力型号更卡脖子。",
    "refs": [
     [
      "NVIDIA CUDA 工具包文档",
      "https://docs.nvidia.com/cuda/",
      "CUDA Toolkit documentation"
     ],
     [
      "CUDA C++ 编程指南",
      "https://docs.nvidia.com/cuda/cuda-programming-guide/index.html",
      "CUDA C++ Programming Guide"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 1,
    "purposeEn": "The chip that actually does the matrix arithmetic. Large models run on it; a CPU is far too slow.",
    "defEn": [
     "A processor built for large-scale parallel computation, originally designed for graphics rendering and now the workhorse of model training and inference."
    ],
    "whyEn": "It decides whether a model runs and how fast. On the same card, VRAM capacity matters more than the compute tier.",
    "slug": "GPU"
   },
   {
    "zh": "显存",
    "en": "VRAM",
    "purpose": "显卡上的内存。装不下模型就是硬装不下，跟别的无关。",
    "def": [
     "GPU 上的高速内存。模型权重和 KV 缓存都要放进去，超了就无法运行。",
     "显存是本地部署的第一道硬门槛，不是性能问题而是「能不能跑」问题。"
    ],
    "why": "这是本地跑模型唯一需要先算清楚的账。选量化档位本质上就是为了塞进显存。",
    "refs": [
     [
      "按显存倒推选档位（千问 3.8）",
      "https://models.specul.com/series/qwen3-8/#b0",
      "Choosing by VRAM, backwards (Qwen3.8)"
     ],
     [
      "从业者深版：GPU 事实与成本数学（AI 模型站）",
      "https://models.specul.com/guides/gpu-cost-math.html",
      "Practitioner deep-dive: GPU facts & cost math (AI Models site)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "judge",
    "level": 5,
    "layer": "五",
    "ord": 2,
    "alias": [],
    "purposeEn": "Memory on the graphics card. If the model does not fit, it simply does not run — nothing else matters.",
    "defEn": [
     "High-speed memory on the GPU. Model weights and the KV cache both live there, and overflowing means it cannot run.",
     "VRAM is the first hard threshold for local deployment — not a performance question but a can-it-run-at-all question."
    ],
    "whyEn": "It is the only budget you must settle before running a model locally. Choosing a quantisation tier is essentially about fitting inside VRAM.",
    "slug": "显存"
   },
   {
    "zh": "量化",
    "en": "Quantization",
    "purpose": "把模型权重从高精度压成低精度，省显存、提速，代价是质量下降。",
    "def": [
     "用更少的位数表示每个权重数值。常见单位是 bpw（每个权重平均占多少比特）。",
     "位数越低越省，但质量损失越大。"
    ],
    "why": "这是本地部署最核心的技术手段。同样一个模型，选对量化档能决定能不能跑起来。",
    "refs": [
     [
      "五档量化规则的说明",
      "https://models.specul.com/",
      "The five quantisation tiers explained"
     ],
     [
      "从业者深版：GPU 事实与成本数学（AI 模型站）",
      "https://models.specul.com/guides/gpu-cost-math.html",
      "Practitioner deep-dive: GPU facts & cost math (AI Models site)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "apply",
    "level": 5,
    "layer": "五",
    "ord": 3,
    "alias": [],
    "purposeEn": "Compress model weights from high to low precision, saving VRAM and speeding things up at the cost of quality.",
    "defEn": [
     "Representing each weight value with fewer bits. The common unit is bpw — average bits per weight.",
     "Fewer bits saves more but loses more quality."
    ],
    "whyEn": "The core technique in local deployment. For the same model, choosing the right quantisation tier often decides whether it runs at all.",
    "slug": "量化"
   },
   {
    "zh": "bpw",
    "en": "Bits Per Weight",
    "purpose": "量化档位的数值表示：平均每个权重占几个比特。",
    "def": [
     "衡量量化程度的指标。本站按 bpw 分成五档：极限压缩、长上下文优先、平衡档、保守档、近似无损。",
     "数值越低，模型体积越小。"
    ],
    "why": "它把「Q4、Q8、Q3」这些各家不同的叫法统一成可比较的数字。这是选型时最实用的标尺。",
    "refs": [
     [
      "量化档位横向对比（千问 3.8）",
      "https://models.specul.com/series/qwen3-8/#c0",
      "Quant tiers side by side (Qwen3.8)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "judge",
    "level": 5,
    "layer": "五",
    "ord": 4,
    "alias": [],
    "purposeEn": "The numeric form of a quantisation level: how many bits each weight averages.",
    "defEn": [
     "A measure of how aggressively a model is quantised. This site groups them into five tiers: extreme compression, long context first, balanced, conservative and near-lossless.",
     "Lower numbers mean a smaller model."
    ],
    "whyEn": "It unifies vendor-specific names like Q4, Q8 and Q3 into one comparable number — the most practical yardstick when choosing.",
    "slug": "bpw"
   },
   {
    "zh": "GGUF",
    "en": "GGUF",
    "purpose": "本地跑模型的事实标准文件格式。llama.cpp 生态几乎只认它。",
    "def": [
     "llama.cpp 项目定义的模型文件格式，把模型结构与量化参数打包在一起。",
     "目前社区量化版本绝大多数产出这个格式。"
    ],
    "why": "如果你要本地跑模型，下载到的基本就是它。非 GGUF 格式往往需要额外转换步骤。",
    "refs": [
     [
      "GGUF 格式规范",
      "https://github.com/ggml-org/ggml/blob/master/docs/gguf.md",
      "GGUF format specification"
     ]
    ],
    "domain": "infra",
    "purposeTag": "apply",
    "level": 5,
    "layer": "五",
    "ord": 5,
    "alias": [],
    "purposeEn": "The de facto standard file format for running models locally. The llama.cpp ecosystem accepts little else.",
    "defEn": [
     "The model file format defined by the llama.cpp project, packaging the model structure together with its quantisation parameters.",
     "The vast majority of community quantisations ship in this format."
    ],
    "whyEn": "If you run models locally, this is what you download. Other formats usually need an extra conversion step.",
    "slug": "GGUF"
   },
   {
    "zh": "llama.cpp",
    "en": "llama.cpp",
    "purpose": "在普通电脑上跑大模型的主流开源引擎，CPU 也能跑。",
    "def": [
     "用 C/C++ 写的推理引擎，强调轻量与跨平台。支持 CPU + GPU 混合推理。",
     "它是本地部署生态的底座——大量量化版本是为它准备的。"
    ],
    "why": "本地部署的默认选项。选它意味着你能用上最多的量化版本和社区支持。",
    "refs": [
     [
      "llama.cpp 官方仓库",
      "https://github.com/ggml-org/llama.cpp",
      "llama.cpp GitHub repository"
     ]
    ],
    "domain": "infra",
    "purposeTag": "apply",
    "level": 5,
    "layer": "五",
    "ord": 6,
    "alias": [],
    "purposeEn": "The mainstream open-source engine for running large models on an ordinary computer, CPU included.",
    "defEn": [
     "An inference engine written in C/C++ that emphasises lightness and cross-platform support, with mixed CPU and GPU inference.",
     "It is the foundation of the local deployment ecosystem — many quantisations exist specifically for it."
    ],
    "whyEn": "The default choice for local deployment. Picking it means access to the largest set of quantisations and community support.",
    "slug": "llama.cpp"
   },
   {
    "zh": "vLLM",
    "en": "vLLM",
    "purpose": "在服务器上高并发跑模型的服务引擎。",
    "def": [
     "面向生产的高吞吐推理引擎，通过连续批处理等手段提升并发效率。"
    ],
    "why": "个人本地部署用不上它。但如果你要给别人提供 API，就需要这一类工具。",
    "refs": [
     [
      "vLLM 官方文档",
      "https://docs.vllm.ai/en/latest/",
      "vLLM documentation"
     ],
     [
      "从业者深版：跑起来深水专题（AI 模型站）",
      "https://models.specul.com/guides/serving-deep-dive.html",
      "Practitioner deep-dive: serving deep dive guide (AI Models site)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 7,
    "alias": [],
    "purposeEn": "A serving engine for running models at high concurrency on a server.",
    "defEn": [
     "A production-oriented high-throughput inference engine that improves concurrency via techniques such as continuous batching."
    ],
    "whyEn": "You will not need it for a personal local setup, but you do need something like it to offer an API to others.",
    "slug": "vLLM"
   },
   {
    "zh": "GPU 层卸载",
    "en": "-ngl / Offload",
    "purpose": "把模型一部分交给 GPU、一部分留在 CPU，显存不够时的妥协手段。",
    "def": [
     "按层分配计算位置：显存够的部分放 GPU，剩下的放 CPU 由内存承担。",
     "llama.cpp 里通常用 `-ngl` 参数控制。"
    ],
    "why": "它让「显存差一点」的模型也能跑起来，代价是速度下降明显。这是权衡，不是免费午餐。",
    "refs": [
     [
      "按显存倒推选档位（千问 3.8）",
      "https://models.specul.com/series/qwen3-8/#b0",
      "Choosing by VRAM, backwards (Qwen3.8)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "apply",
    "level": 5,
    "layer": "五",
    "ord": 8,
    "alias": [],
    "purposeEn": "Give part of the model to the GPU and keep the rest on the CPU — the compromise when VRAM falls short.",
    "defEn": [
     "Assigning layers across devices: whatever fits in VRAM goes to the GPU, the rest runs on the CPU backed by system memory.",
     "In llama.cpp this is usually controlled with the `-ngl` flag."
    ],
    "whyEn": "It lets models that \"almost\" fit run at all, at a clear cost in speed. A trade-off, not a free lunch.",
    "slug": "GPU 层卸载"
   },
   {
    "zh": "张量并行",
    "en": "Tensor Parallelism",
    "alias": [
     "TP"
    ],
    "purpose": "把一个模型拆到多张卡上一起算，单卡装不下时用。",
    "def": [
     "把模型权重按维度切分到多张 GPU，每张算一部分，需要卡间通信。"
    ],
    "why": "多卡部署的主要手段。显存够就优先单卡——通信开销会拖慢速度。",
    "refs": [
     [
      "PyTorch 张量并行文档",
      "https://docs.pytorch.org/docs/2.3/distributed.tensor.parallel.html",
      "PyTorch Tensor Parallelism docs"
     ],
     [
      "Megatron-LM 论文",
      "https://arxiv.org/abs/1909.08053",
      "Megatron-LM (arXiv paper)"
     ],
     [
      "从业者深版：开源训练栈专题（AI 模型站）",
      "https://models.specul.com/guides/training-stack.html",
      "Practitioner deep-dive: open training stack guide (AI Models site)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 9,
    "purposeEn": "Split one model across several GPUs when it does not fit on a single card.",
    "defEn": [
     "Partitioning model weights across multiple GPUs by dimension, each computing part, with inter-card communication required."
    ],
    "whyEn": "The main technique for multi-GPU deployment. Prefer a single card when VRAM allows — communication overhead slows things down.",
    "slug": "张量并行"
   },
   {
    "zh": "专家卸载",
    "en": "MoE Offload / ncmoe",
    "purpose": "对「专家很多但每次只激活一部分」的稀疏模型，把不常用的专家放内存里。",
    "def": [
     "混合专家（MoE）模型每次推理只激活少数专家，其余权重可放在较慢的存储上按需调取。"
    ],
    "why": "它解释了为什么有些超大模型在单卡上也能跑。因为不是所有权重都同时参与计算。",
    "refs": [
     [
      "llama.cpp CLI 参数文档",
      "https://github.com/ggml-org/llama.cpp/blob/master/tools/cli/README.md",
      "llama.cpp CLI arguments"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 10,
    "alias": [],
    "purposeEn": "For sparse models with many experts where only a few activate per token, keep the rarely-used experts in memory.",
    "defEn": [
     "A mixture-of-experts (MoE) model activates only a few experts per inference, so the remaining weights can sit on slower storage and be fetched as needed."
    ],
    "whyEn": "It explains why some very large models run on a single card: not all weights participate at once.",
    "slug": "专家卸载"
   },
   {
    "zh": "首字延迟",
    "en": "Time To First Token, TTFT",
    "purpose": "从发出提问到看到第一个字要多久。这个数字决定「感觉快不快」。",
    "def": [
     "生成第一个 token 所花的时间。它主要由提示词长度和是否需要预填充决定。"
    ],
    "why": "这是感知速度的关键指标。一个模型每字都很快但首字要等3 秒，用起来依然会觉得慢。",
    "refs": [
     [
      "vLLM 指标设计文档",
      "https://docs.vllm.ai/en/latest/design/metrics/",
      "vLLM metrics design"
     ],
     [
      "vLLM 性能基准套件",
      "https://docs.vllm.ai/en/stable/contributing/benchmarks.html",
      "vLLM benchmark suites"
     ]
    ],
    "domain": "infra",
    "purposeTag": "judge",
    "level": 5,
    "layer": "五",
    "ord": 11,
    "alias": [],
    "purposeEn": "How long from sending a question to seeing the first word. This number decides whether it feels fast.",
    "defEn": [
     "The time taken to produce the first token, driven mainly by prompt length and whether prefill is needed."
    ],
    "whyEn": "The key metric for perceived speed. A model that generates fast per token but waits three seconds for the first one still feels slow.",
    "slug": "首字延迟"
   },
   {
    "zh": "吞吐",
    "en": "Throughput, TPS",
    "alias": [
     "tokens per second",
     "tok/s"
    ],
    "purpose": "每秒能生成多少字。决定长文生成要等多久。",
    "def": [
     "每秒输出的 token 数量。吞吐高则长文本生成快。"
    ],
    "why": "它和首字延迟是两个独立指标，要一起看。只看其中一个容易误判实际体验。",
    "refs": [
     [
      "NVIDIA AIPerf 指标参考",
      "https://docs.nvidia.com/aiperf/server-metrics/ai-perf-server-metrics-reference",
      "NVIDIA AIPerf server metrics reference"
     ],
     [
      "vLLM 性能基准套件",
      "https://docs.vllm.ai/en/stable/contributing/benchmarks.html",
      "vLLM benchmark suites"
     ]
    ],
    "domain": "infra",
    "purposeTag": "judge",
    "level": 5,
    "layer": "五",
    "ord": 12,
    "purposeEn": "How many tokens per second come out. It determines how long you wait for a long generation.",
    "defEn": [
     "Tokens produced per second. Higher throughput means faster long-form generation."
    ],
    "whyEn": "It is a separate metric from time-to-first-token, and the two must be read together — looking at only one misleads the actual experience.",
    "slug": "吞吐"
   },
   {
    "zh": "预填充",
    "en": "Prefill",
    "purpose": "把你输入的那一整段先读完，再开始生成回答的那一步。",
    "def": [
     "模型处理输入部分的阶段。输入越长，预填充越慢，首字延迟越大。"
    ],
    "why": "解释了一个常见现象：塞了一大段资料后，模型「想」很久才开始回答。那是预填充在算。",
    "refs": [
     [
      "NVIDIA AIPerf 指标参考",
      "https://docs.nvidia.com/aiperf/server-metrics/ai-perf-server-metrics-reference",
      "NVIDIA AIPerf server metrics reference"
     ],
     [
      "vLLM 指标设计文档",
      "https://docs.vllm.ai/en/latest/design/metrics/",
      "vLLM metrics design"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 13,
    "alias": [],
    "purposeEn": "The step where your whole input is read through before generation begins.",
    "defEn": [
     "The stage where the model processes the input portion. Longer input means slower prefill and higher time to first token."
    ],
    "whyEn": "It explains a common observation: after you paste a long document the model \"thinks\" for a long time before answering — that is prefill computing.",
    "slug": "预填充"
   },
   {
    "zh": "Prompt Cache",
    "en": "Prompt Cache",
    "alias": [
     "提示词缓存",
     "前缀缓存"
    ],
    "purpose": "把重复的系统提示和资料缓存起来，重复问同一份上下文时省时间和钱。",
    "def": [
     "复用已处理过的相同前缀，跳过重复计算。"
    ],
    "why": "做 Agent 时系统提示通常很长，缓存能显著降低成本。这也是本站不自己托管模型的一个原因。",
    "refs": [
     [
      "Claude 提示词缓存文档",
      "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
      "Anthropic prompt caching docs"
     ],
     [
      "OpenAI 提示词缓存指南",
      "https://developers.openai.com/api/docs/guides/prompt-caching",
      "OpenAI prompt caching guide"
     ]
    ],
    "domain": "infra",
    "purposeTag": "apply",
    "level": 5,
    "layer": "五",
    "ord": 14,
    "purposeEn": "Cache repeated system prompts and documents, saving time and money when asking about the same context again.",
    "defEn": [
     "Reusing processing already done for an identical prefix so it is not computed twice."
    ],
    "whyEn": "System prompts in agent work are usually long, so caching meaningfully lowers cost. It is also why this site does not host models itself.",
    "slug": "Prompt Cache"
   },
   {
    "zh": "连续批处理",
    "en": "Continuous Batching",
    "purpose": "让服务器把不同时刻到达的请求拼在一起算，而不是排队。",
    "def": [
     "vLLM 官方把它列为核心加速手段：对到达的请求做连续批处理。",
     "官方把它与分块预填充、前缀缓存一起列为让 vLLM 快的手段。"
    ],
    "why": "同一个模型，服务引擎不同，能扛的并发差好几倍。",
    "refs": [
     [
      "vLLM 官方文档首页",
      "https://docs.vllm.ai/en/latest/",
      "vLLM documentation"
     ],
     [
      "从业者深版：跑起来深水专题（AI 模型站）",
      "https://models.specul.com/guides/serving-deep-dive.html",
      "Practitioner deep-dive: serving deep dive guide (AI Models site)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 15,
    "alias": [],
    "purposeEn": "The server batches requests that arrived at different moments instead of queueing them.",
    "defEn": [
     "vLLM lists it as a core acceleration technique: continuous batching of incoming requests.",
     "Together with chunked prefill and prefix caching it forms the throughput base of a serving engine."
    ],
    "whyEn": "Same model, different serving engine: concurrency differs by multiples.",
    "slug": "连续批处理"
   },
   {
    "zh": "分块预填充",
    "en": "Chunked Prefill",
    "purpose": "把很长的输入切成小块处理，顺便和生成中的请求混在一起跑。",
    "def": [
     "vLLM 官方定义：允许把大的预填充拆成较小的块，并与解码请求一起批处理。",
     "官方称它通过平衡计算密集与显存密集两类操作，同时改善吞吐和延迟。"
    ],
    "why": "长输入把首字延迟拖爆时，这是服务端最常用的缓解手段。",
    "refs": [
     [
      "vLLM 优化配置文档",
      "https://docs.vllm.ai/en/latest/configuration/optimization.html",
      "vLLM optimization configuration"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 16,
    "alias": [],
    "purposeEn": "Process a long input in smaller chunks, mixing it with requests that are generating.",
    "defEn": [
     "vLLM's definition: process large prefills in smaller chunks and batch them with decode requests.",
     "The docs say it improves both throughput and latency by balancing compute-bound and memory-bound work."
    ],
    "whyEn": "When a long input wrecks time-to-first-token, this is the standard server-side mitigation.",
    "slug": "分块预填充"
   },
   {
    "zh": "流水线并行",
    "en": "Pipeline Parallelism",
    "purpose": "把模型按层切成几段，分别放在不同显卡上接力算。",
    "def": [
     "vLLM 官方列出的分布式手段之一：张量、流水线、数据、专家、上下文并行。",
     "含义是按层段把模型切到多张卡上接力计算。"
    ],
    "why": "多卡怎么分工，官方就这几种口径。选错方式，卡再多也快不起来。",
    "refs": [
     [
      "vLLM 官方文档首页",
      "https://docs.vllm.ai/en/latest/",
      "vLLM documentation"
     ],
     [
      "从业者深版：开源训练栈专题（AI 模型站）",
      "https://models.specul.com/guides/training-stack.html",
      "Practitioner deep-dive: open training stack guide (AI Models site)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 17,
    "alias": [],
    "purposeEn": "Cut the model into layer ranges and run them on different GPUs in relay.",
    "defEn": [
     "One of vLLM's listed distributed techniques: tensor, pipeline, data, expert and context parallelism.",
     "It lets a model larger than one GPU's memory run in pieces, at the cost of passing intermediate results."
    ],
    "whyEn": "These are the official ways to split work across cards. Pick wrong and extra cards do not help.",
    "slug": "流水线并行"
   },
   {
    "zh": "上下文并行",
    "en": "Context Parallelism",
    "purpose": "把超长上下文拆到多张卡上分别处理。",
    "def": [
     "vLLM 官方把它与张量、流水线、数据、专家并行并列为分布式推理手段。",
     "它针对的是注意力开销随序列长度二次增长。"
    ],
    "why": "想要超长上下文靠的是这类技术，不是单卡显存更大。",
    "refs": [
     [
      "vLLM 官方文档首页",
      "https://docs.vllm.ai/en/latest/",
      "vLLM documentation"
     ],
     [
      "FlashAttention 论文",
      "https://arxiv.org/abs/2205.14135",
      "FlashAttention paper"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 18,
    "alias": [],
    "purposeEn": "Split a very long context across several cards for processing.",
    "defEn": [
     "vLLM lists it alongside tensor, pipeline, data and expert parallelism for distributed inference.",
     "It targets the quadratic growth of attention cost with sequence length."
    ],
    "whyEn": "Very long contexts come from techniques like this, not from a single bigger card.",
    "slug": "上下文并行"
   },
   {
    "zh": "投机解码",
    "en": "Speculative Decoding",
    "alias": [
     "推测解码"
    ],
    "purpose": "用小模型先猜几个词，大模型一次验证，生成更快。",
    "def": [
     "Leviathan 等人的定义：一种并行计算多个 token 的采样算法。前提是不改变输出。",
     "原论文在 T5-XXL 上报告 2–3 倍加速，且输出完全一致。",
     "vLLM 已内置 n-gram、EAGLE 等多种投机解码实现。"
    ],
    "why": "本地跑大模型时，这是少数「白拿」的提速手段之一。",
    "refs": [
     [
      "Leviathan 等《Fast Inference from Transformers via Speculative Decoding》",
      "https://arxiv.org/abs/2211.17192",
      "Speculative decoding paper (ICML 2023)"
     ],
     [
      "vLLM 官方文档首页",
      "https://docs.vllm.ai/en/latest/",
      "vLLM documentation"
     ],
     [
      "从业者深版：跑起来深水专题（AI 模型站）",
      "https://models.specul.com/guides/serving-deep-dive.html",
      "Practitioner deep-dive: serving deep dive guide (AI Models site)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 19,
    "purposeEn": "Guess several tokens cheaply, then have the big model verify them in one pass.",
    "defEn": [
     "Leviathan et al.'s definition: an algorithm to sample from autoregressive models faster, computing several tokens in parallel with no changes to the outputs.",
     "The paper reports 2x-3x acceleration on T5-XXL with identical outputs.",
     "vLLM ships n-gram, EAGLE and other speculative decoding implementations."
    ],
    "whyEn": "For local inference this is one of the few speedups you get for free.",
    "slug": "投机解码"
   },
   {
    "zh": "FlashAttention",
    "en": "FlashAttention",
    "purpose": "一种更省显存、更快的注意力算法，长上下文的基石。",
    "def": [
     "Dao 等人的定义：IO 感知的精确注意力算法。用分块减少显存与片上缓存之间的读写。",
     "原论文指出自注意力的时间与空间复杂度随序列长度二次增长，这是长序列慢的根源。"
    ],
    "why": "「上下文开大就慢」的底层原因在这里；它也是各家推理库的标配内核。",
    "refs": [
     [
      "Dao 等《FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness》",
      "https://arxiv.org/abs/2205.14135",
      "FlashAttention paper"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 20,
    "alias": [],
    "purposeEn": "A more memory-efficient, faster attention algorithm; the base of long contexts.",
    "defEn": [
     "Dao et al.'s definition: an IO-aware exact attention algorithm using tiling to cut reads and writes between GPU memory and on-chip SRAM.",
     "The paper identifies quadratic cost in sequence length as why long sequences are slow."
    ],
    "whyEn": "This is the underlying reason bigger contexts are slower, and a standard kernel in serving stacks.",
    "slug": "FlashAttention"
   },
   {
    "zh": "PagedAttention",
    "en": "PagedAttention",
    "purpose": "借操作系统的分页思路管理 KV 缓存，让显存几乎不浪费。",
    "def": [
     "Kwon 等人的定义：受操作系统虚拟内存与分页技术启发的注意力算法。",
     "论文称基于它构建的 vLLM 在 KV 缓存上接近零浪费，吞吐提升 2–4 倍。"
    ],
    "why": "vLLM 快的真正原因。理解了它，才明白显存要算的是缓存而不只是权重。",
    "refs": [
     [
      "Kwon 等《Efficient Memory Management for LLM Serving with PagedAttention》",
      "https://arxiv.org/abs/2309.06180",
      "PagedAttention paper (SOSP 2023)"
     ],
     [
      "从业者深版：跑起来深水专题（AI 模型站）",
      "https://models.specul.com/guides/serving-deep-dive.html",
      "Practitioner deep-dive: serving deep dive guide (AI Models site)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 21,
    "alias": [],
    "purposeEn": "Manage the KV cache with OS paging ideas so memory is barely wasted.",
    "defEn": [
     "Kwon et al.'s definition: an attention algorithm inspired by classical virtual memory and paging in operating systems.",
     "The paper reports vLLM achieving near-zero KV cache waste and 2-4x throughput."
    ],
    "whyEn": "The real reason vLLM is fast. Memory budgeting is about cache, not only weights.",
    "slug": "PagedAttention"
   },
   {
    "zh": "safetensors",
    "en": "safetensors",
    "purpose": "一种更安全的模型权重文件格式。",
    "def": [
     "官方描述：一种新的简单张量存储格式，安全（相对 pickle）且仍然快（零拷贝）。",
     "官方指出 pickle 不安全、会执行任意代码；该格式支持懒加载。"
    ],
    "why": "加载不可信权重，等于运行别人写的代码。先看格式。",
    "refs": [
     [
      "safetensors 官方仓库",
      "https://github.com/safetensors/safetensors",
      "safetensors repository"
     ]
    ],
    "domain": "data",
    "purposeTag": "guard",
    "level": 5,
    "layer": "五",
    "ord": 22,
    "alias": [],
    "purposeEn": "A safer file format for model weights.",
    "defEn": [
     "The official description: a simple format for storing tensors safely (as opposed to pickle) that is still fast (zero-copy).",
     "The docs state pickle is unsafe and runs arbitrary code; the format supports lazy loading."
    ],
    "whyEn": "Loading untrusted weights is running someone else's code. Check the format first.",
    "slug": "safetensors"
   },
   {
    "zh": "MLX",
    "en": "MLX",
    "purpose": "苹果芯片上的机器学习框架，由 Apple 研究团队开源。",
    "def": [
     "官方描述：面向 Apple silicon 的机器学习数组框架。由 Apple 机器学习研究团队出品。",
     "特点是统一内存模型：数组驻留共享内存，CPU 与 GPU 上运算无需搬运数据。"
    ],
    "why": "用 Mac 跑模型时值得知道它存在。官方并未声称统一内存能让 Mac 跑大模型。",
    "refs": [
     [
      "MLX 官方仓库",
      "https://github.com/ml-explore/mlx",
      "MLX repository"
     ]
    ],
    "domain": "infra",
    "purposeTag": "learn",
    "level": 5,
    "layer": "五",
    "ord": 23,
    "alias": [],
    "purposeEn": "A machine learning framework for Apple silicon, open-sourced by Apple's research team.",
    "defEn": [
     "The official description: an array framework for machine learning on Apple silicon, from Apple machine learning research.",
     "Its notable feature is the unified memory model: arrays live in shared memory, so CPU and GPU operations need no data transfer."
    ],
    "whyEn": "Worth knowing if you run models on a Mac. Note the docs do not claim unified memory runs large models.",
    "slug": "MLX"
   },
   {
    "zh": "OpenAI 兼容接口",
    "en": "OpenAI-compatible API",
    "alias": [
     "OpenAI 兼容 API"
    ],
    "purpose": "本地跑的模型，用现成的 OpenAI 客户端就能连。",
    "def": [
     "vLLM 官方提供兼容 OpenAI Completions、Chat Completions、Embeddings 等接口的 HTTP 服务。",
     "llama.cpp 的服务端同样以 OpenAI 兼容 API 方式启动。"
    ],
    "why": "换后端不用改代码，这是本地与云端之间最省事的切换方式。",
    "refs": [
     [
      "vLLM OpenAI 兼容服务文档",
      "https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html",
      "vLLM OpenAI-compatible server"
     ],
     [
      "llama.cpp 官方仓库",
      "https://github.com/ggml-org/llama.cpp",
      "llama.cpp repository"
     ]
    ],
    "domain": "infra",
    "purposeTag": "apply",
    "level": 5,
    "layer": "五",
    "ord": 24,
    "purposeEn": "Serve a local model so existing OpenAI clients can connect unchanged.",
    "defEn": [
     "vLLM provides an HTTP server compatible with OpenAI's Completions, Chat Completions and Embeddings APIs.",
     "llama.cpp's server likewise launches as an OpenAI-compatible API server."
    ],
    "whyEn": "Swap backends without touching your code: the cheapest switch between local and cloud.",
    "slug": "OpenAI 兼容接口"
   },
   {
    "zh": "CPU 推理",
    "en": "CPU Inference",
    "purpose": "没有显卡也能跑模型。",
    "def": [
     "llama.cpp 官方称其目标。概括是「以最少配置、在广泛硬件上实现 LLM（与 VLM）推理」。",
     "官方列出 BLAS、ZenDNN、OpenVINO 等面向 CPU 的后端。"
    ],
    "why": "决定「没有显卡能不能玩」。能不能跑、跑多快，取决于后端与硬件。",
    "refs": [
     [
      "llama.cpp 官方仓库",
      "https://github.com/ggml-org/llama.cpp",
      "llama.cpp repository"
     ]
    ],
    "domain": "infra",
    "purposeTag": "judge",
    "level": 5,
    "layer": "五",
    "ord": 25,
    "alias": [],
    "purposeEn": "You can run models without a GPU; the cost is speed.",
    "defEn": [
     "llama.cpp states its goal is LLM (and VLM) inference with minimal setup and state-of-the-art performance on a wide range of hardware.",
     "It lists CPU-facing backends such as BLAS, ZenDNN and OpenVINO."
    ],
    "whyEn": "Answers \"can I run this without a graphics card\". Yes, but expect tokens per second, not per millisecond.",
    "slug": "CPU 推理"
   },
   {
    "zh": "Ollama",
    "en": "Ollama",
    "purpose": "一条命令就在自己电脑上跑起开源模型的工具。",
    "def": [
     "把下载、量化、运行打包成一个命令的本地推理工具。",
     "它自带模型库，选个名字就能跑，也有命令行和接口。"
    ],
    "why": "本地跑模型门槛最低的一条路。想试试大模型在自己机器上什么样，从它开始最省事。",
    "refs": [
     [
      "Ollama 官网",
      "https://ollama.com/",
      "Ollama official site"
     ]
    ],
    "domain": "infra",
    "purposeTag": "apply",
    "level": 5,
    "layer": "五",
    "ord": 26,
    "alias": [],
    "purposeEn": "A tool that runs an open model on your own computer with a single command.",
    "defEn": [
     "It packages download, quantisation and running into one command.",
     "It ships its own model library — pick a name and run; it offers both a command line and an API."
    ],
    "whyEn": "The lowest-threshold path to running models locally. If you want to see what a large model feels like on your own machine, start here.",
    "slug": "Ollama"
   },
   {
    "zh": "LM Studio",
    "en": "LM Studio",
    "purpose": "带图形界面的本地模型应用，不用碰命令行。",
    "def": [
     "一个桌面应用：在里面搜模型、下载模型、开聊天。",
     "它也能开一个本地接口，让别的程序连上来用。"
    ],
    "why": "给不想装环境、不想敲命令的人。它和 Ollama 是同一件事的两种入口。",
    "refs": [
     [
      "LM Studio 官网",
      "https://lmstudio.ai/",
      "LM Studio official site"
     ]
    ],
    "domain": "infra",
    "purposeTag": "apply",
    "level": 5,
    "layer": "五",
    "ord": 27,
    "alias": [],
    "purposeEn": "A local-model desktop app with a graphical interface — no command line needed.",
    "defEn": [
     "One desktop app: search models, download them and chat, all inside it.",
     "It can also expose a local API so other programs connect to it."
    ],
    "whyEn": "For people who do not want to install environments or type commands. It and Ollama are two entry points to the same thing.",
    "slug": "LM Studio"
   },
   {
    "zh": "量化方法",
    "en": "Quantization Methods (GPTQ, AWQ)",
    "alias": [
     "GPTQ",
     "AWQ"
    ],
    "purpose": "把模型压小不是只有一种做法，不同方法效果不同。",
    "def": [
     "GPTQ 和 AWQ 是最常见的两族训练后量化方法。",
     "它们都靠少量样本校准，决定哪些数值该保留精度。AWQ 按激活值的重要性挑选保留的权重。"
    ],
    "why": "同一个模型的不同量化档，可能出自不同方法。同名 4-bit 文件，质量未必一样。",
    "refs": [
     [
      "GPTQ 论文",
      "https://arxiv.org/abs/2210.17323",
      "GPTQ paper"
     ],
     [
      "AWQ 论文",
      "https://arxiv.org/abs/2306.00978",
      "AWQ paper"
     ]
    ],
    "domain": "infra",
    "purposeTag": "apply",
    "level": 5,
    "layer": "五",
    "ord": 28,
    "purposeEn": "Shrinking a model has more than one method, and the methods differ in results.",
    "defEn": [
     "GPTQ and AWQ are the two most common families of post-training quantisation.",
     "Both calibrate with a small sample to decide which values keep their precision; AWQ picks the weights to keep by how much each matters to activations."
    ],
    "whyEn": "Different quantisation tiers of the same model may come from different methods. Two files both labelled 4-bit need not be equal in quality.",
    "slug": "量化方法"
   },
   {
    "zh": "剪枝",
    "en": "Pruning",
    "purpose": "删掉模型里不重要的连接，让它变小变快。",
    "def": [
     "把权重接近零的连接去掉，模型更小、推理更快。",
     "论文实测：对预训练模型做结构化剪枝，精度损失可以很小。"
    ],
    "why": "它和量化是两条互补的压缩路线。本地跑不动的模型，有时靠剪枝救回来。",
    "refs": [
     [
      "剪枝有效性研究论文",
      "https://arxiv.org/abs/1710.01878",
      "To prune, or not to prune (paper)"
     ]
    ],
    "domain": "infra",
    "purposeTag": "apply",
    "level": 5,
    "layer": "五",
    "ord": 29,
    "alias": [],
    "purposeEn": "Delete the unimportant connections in a model to make it smaller and faster.",
    "defEn": [
     "Removing weights close to zero makes the model smaller and inference faster.",
     "Measured in the paper: structured pruning of a pretrained model can lose very little accuracy."
    ],
    "whyEn": "It is a compression route complementary to quantisation. A model that will not fit locally is sometimes rescued by pruning.",
    "slug": "剪枝"
   },
   {
    "zh": "QLoRA",
    "en": "QLoRA",
    "purpose": "把模型压到 4-bit 再微调，一张消费级显卡也能练。",
    "def": [
     "先把模型量化成 4-bit 冻结住，再只训练少量附加参数。",
     "论文实测：单张 48GB 显卡就能微调 650 亿参数的模型。"
    ],
    "why": "它把「微调大模型」从机房拉到了个人电脑。想自己练模型，先看它够不够你的卡。",
    "refs": [
     [
      "QLoRA 论文",
      "https://arxiv.org/abs/2305.14314",
      "QLoRA paper"
     ]
    ],
    "domain": "infra",
    "purposeTag": "apply",
    "level": 5,
    "layer": "五",
    "ord": 30,
    "alias": [],
    "purposeEn": "Quantise the model to 4-bit first, then fine-tune — one consumer GPU is enough.",
    "defEn": [
     "The model is quantised to 4-bit and frozen; only a small set of added parameters is trained.",
     "Measured in the paper: a single 48GB GPU can fine-tune a 65-billion-parameter model."
    ],
    "whyEn": "It moved \"fine-tuning a large model\" from the datacentre to the personal computer. If you want to train a model yourself, check it against your card first.",
    "slug": "QLoRA"
   }
  ]
 },
 {
  "num": "六",
  "name": "选得对",
  "desc": "把前面学到的东西变成一个决定。这是这一页的终点。",
  "terms": [
   {
    "zh": "开源模型",
    "en": "Open-weight Model",
    "alias": [
     "开放权重"
    ],
    "purpose": "权重公开、你可以下载下来在自己机器上跑、不用给厂商交钱。",
    "def": [
     "参数权重对外公开的模型。注意：代码开源和权重开源是两回事，权重开源才意味着你能自部署。"
    ],
    "why": "它决定了「能不能离线」「能不能微调」「隐私数据要不要外发」。",
    "refs": [
     [
      "7 个可本地运行的开源系列",
      "https://models.specul.com/",
      "7 open series you can run locally"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 1,
    "purposeEn": "The weights are public: you can download them, run them on your own machine, and pay nobody.",
    "defEn": [
     "Models whose parameter weights are published. Note that open code and open weights are different things — only open weights mean you can self-host."
    ],
    "whyEn": "It decides whether you can work offline, whether you can fine-tune, and whether private data has to leave.",
    "slug": "开源模型"
   },
   {
    "zh": "闭源模型",
    "en": "Closed / Proprietary Model",
    "purpose": "你不拿到权重，只能通过官方接口调用。",
    "def": [
     "模型不公开权重，只能走官方提供的 API 或产品使用。"
    ],
    "why": "通常更强、更新更快，但数据要外发、成本按量付费、有服务中断风险。",
    "refs": [
     [
      "FAccT 论文：开放权重 vs 闭源",
      "https://arxiv.org/abs/2405.16820",
      "Laboratory-Scale AI: Open-Weight vs Closed Models (FAccT)"
     ],
     [
      "OpenAI 官方模型文档",
      "https://platform.openai.com/docs/models",
      "OpenAI Models Documentation"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 2,
    "alias": [],
    "purposeEn": "You do not get the weights; you can only call it through the official interface.",
    "defEn": [
     "Models whose weights are not published, usable only through the provider's API or product."
    ],
    "whyEn": "Usually stronger and updated faster, but data leaves your machine, you pay per use, and you carry outage risk.",
    "slug": "闭源模型"
   },
   {
    "zh": "许可证",
    "en": "License",
    "purpose": "规定你能不能用、能不能改、能不能商用。选型时最容易忽略的约束。",
    "def": [
     "模型的使用许可条款，各家宽严不一。",
     "要注意的点：能否商用、能否二次分发、衍生模型能否继承原许可。"
    ],
    "why": "这是法务层面的硬约束。技术再好，许可不允许就不能用。",
    "refs": [
     [
      "本站如何处理许可继承",
      "https://models.specul.com/",
      "How this site handles licence inheritance"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 3,
    "alias": [],
    "purposeEn": "What you may do with it: use, modify, or commercialise. The constraint most often overlooked during selection.",
    "defEn": [
     "The licence terms attached to a model; providers vary widely in strictness.",
     "The points to check: commercial use allowed? Redistribution allowed? Do derivatives inherit the original licence?"
    ],
    "whyEn": "A hard legal constraint. However good the technology is, if the licence forbids it, you cannot use it.",
    "slug": "许可证"
   },
   {
    "zh": "API / 接口调用",
    "en": "API",
    "purpose": "不自己搞模型，按用量付钱调用别人的。",
    "def": [
     "通过网络接口把提示词发给模型服务方，返回结果。"
    ],
    "why": "这是绝大多数人用 AI 的实际方式。不需要显卡，按量付费，代价是数据外发和长期成本。",
    "refs": [
     [
      "OpenAI API 快速开始",
      "https://platform.openai.com/docs/quickstart",
      "OpenAI API Quickstart"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 4,
    "alias": [],
    "purposeEn": "Do not run a model yourself — pay per use for someone else's.",
    "defEn": [
     "Send the prompt to a model provider over a network interface and get the result back."
    ],
    "whyEn": "This is how most people actually use AI. No graphics card needed and you pay as you go; the cost is that data leaves your machine and the bill keeps going.",
    "slug": "API - 接口调用"
   },
   {
    "zh": "本地部署",
    "en": "Local Deployment",
    "purpose": "模型下载到自己机器上跑，数据不外发。",
    "def": [
     "在本机或自有服务器上运行模型推理，不经过第三方接口。"
    ],
    "why": "隐私敏感、要用专门的量化版本，或者长期高频调用。这些场景下本地部署通常更划算。",
    "refs": [
     [
      "按设备选量化档位（千问 3.8）",
      "https://models.specul.com/series/qwen3-8/#b0",
      "Pick tiers by device (Qwen3.8)"
     ],
     [
      "本地引擎怎么选",
      "https://nav.specul.com/",
      "Nav: how to pick a local engine"
     ]
    ],
    "domain": "infra",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 5,
    "alias": [],
    "purposeEn": "Download the model and run it on your own machine, so data never leaves.",
    "defEn": [
     "Running model inference on your own hardware or server, without going through a third-party API."
    ],
    "whyEn": "Usually the better choice when data is sensitive, when you need a specific quantisation, or when calling at high volume long-term.",
    "slug": "本地部署"
   },
   {
    "zh": "数据不出网",
    "en": "Data Sovereignty",
    "purpose": "你的资料完全不经过第三方。这是很多场景的硬性要求。",
    "def": [
     "所有数据都在自己控制的机器上处理，不上传到外部服务。"
    ],
    "why": "涉及合同、个人隐私、源代码的场景，这是能不能用的分界线。它不是加分项。",
    "refs": [
     [
      "自托管方案对照",
      "https://agent.specul.com/",
      "Self-hosted options compared"
     ],
     [
      "Cursor 的自托管支持",
      "https://agent.specul.com/cursor.html",
      "Cursor's self-hosted support"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 6,
    "alias": [],
    "purposeEn": "Your material never passes through a third party. This is a hard requirement in many situations.",
    "defEn": [
     "All data processed on machines you control, never uploaded to an external service."
    ],
    "whyEn": "Where contracts, personal data or source code are involved, this is the line between usable and not — not a nice-to-have.",
    "slug": "数据不出网"
   },
   {
    "zh": "基准测试",
    "en": "Benchmark",
    "purpose": "用统一的题库横向比较模型强弱。",
    "def": [
     "标准化评测集（如 MMLU、HumanEval 等）给出的分数。"
    ],
    "why": "重要但不可尽信——公开榜单容易过时，也可能与你的实际任务无关。",
    "refs": [
     [
      "MMLU 论文",
      "https://arxiv.org/abs/2009.03300",
      "Measuring Massive Multitask Language Understanding (MMLU)"
     ],
     [
      "HELM 评测榜",
      "https://crfm.stanford.edu/helm/",
      "Holistic Evaluation of Language Models (HELM)"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 7,
    "alias": [],
    "purposeEn": "Compare models head to head using a shared question set.",
    "defEn": [
     "Scores from standardised evaluation suites such as MMLU or HumanEval."
    ],
    "whyEn": "Important but not to be trusted blindly — public leaderboards go stale and may have little relation to your actual task.",
    "slug": "基准测试"
   },
   {
    "zh": "总分 / 综合评测",
    "en": "Aggregate Score",
    "purpose": "把多个基准的分数加权成一个总分，方便快速比较。",
    "def": [
     "多个评测维度的加权汇总。不同机构的加权方式差别很大。"
    ],
    "why": "看到「综合分 XX」要先问三件事：怎么加权？用的哪套题？什么时候的数据？",
    "refs": [
     [
      "HELM 论文",
      "https://arxiv.org/abs/2211.09110",
      "Holistic Evaluation of Language Models (HELM)"
     ],
     [
      "Project MPG：多基准聚合",
      "https://arxiv.org/abs/2410.22368",
      "Project MPG: generalized LLM benchmark"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 8,
    "alias": [],
    "purposeEn": "Collapse several benchmark scores into one number for quick comparison.",
    "defEn": [
     "A weighted aggregate across several evaluation dimensions. Weighting differs substantially between providers."
    ],
    "whyEn": "When you see \"an overall score of X\", ask first: how was it weighted, which question set, and when was the data collected.",
    "slug": "总分 - 综合评测"
   },
   {
    "zh": "供应商锁定",
    "en": "Vendor Lock-in",
    "purpose": "用得越深，换模型或换服务商越难。",
    "def": [
     "依赖某个模型专有的提示格式、工具调用约定或微调方式，导致迁移成本高。"
    ],
    "why": "这是选型时最容易被忽略的长期成本。判断方法：你换模型要改多少代码？",
    "refs": [
     [
      "OpenTelemetry 官方文档",
      "https://opentelemetry.io/docs/what-is-opentelemetry/",
      "What is OpenTelemetry?"
     ],
     [
      "Anthropic 模型弃用政策",
      "https://console.anthropic.com/docs/en/about-claude/model-deprecations",
      "Anthropic Model Deprecations"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 9,
    "alias": [],
    "purposeEn": "The deeper you go, the harder it is to switch models or providers.",
    "defEn": [
     "Depending on a vendor's proprietary prompt formats, tool-calling conventions or fine-tuning formats, so migrating costs a lot."
    ],
    "whyEn": "The long-term cost most easily missed during selection. The test: how much code changes if you swap models?",
    "slug": "供应商锁定"
   },
   {
    "zh": "模型评测的局限",
    "en": "Evaluation Limits",
    "purpose": "知道榜单分数不等于你的实际效果，这点很重要。",
    "def": [
     "公开评测难以覆盖你的具体任务，且存在数据污染、过时等问题。"
    ],
    "why": "正确的做法是拿自己的真实任务去小样本实测，而不是只看榜单。",
    "refs": [
     [
      "涌现能力是幻象？论文",
      "https://arxiv.org/abs/2304.15004",
      "Are Emergent Abilities a Mirage?"
     ],
     [
      "HELM 论文（不完备性）",
      "https://arxiv.org/abs/2211.09110",
      "Holistic Evaluation of Language Models (HELM)"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 10,
    "alias": [],
    "purposeEn": "A leaderboard score is not the same as your actual result — this matters.",
    "defEn": [
     "Public evaluations struggle to cover your specific task, and suffer from data contamination and staleness."
    ],
    "whyEn": "The right approach is a small-scale test with your own real tasks rather than reading leaderboards alone.",
    "slug": "模型评测的局限"
   },
   {
    "zh": "隐私与合规",
    "en": "Privacy & Compliance",
    "purpose": "数据经过哪些机器、留存多久、有没有审计。",
    "def": [
     "涉及个人信息、商业机密、行业监管要求的约束条件。"
    ],
    "why": "这是选型的**否决项**而非加分项——不合规的方案再好也不能用。",
    "refs": [
     [
      "MCP server 的权限边界",
      "https://agent.specul.com/tools/filesystem.html",
      "MCP server permission boundary"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 11,
    "alias": [],
    "purposeEn": "Which machines data passes through, how long it is retained, and whether it is audited.",
    "defEn": [
     "Constraints around personal information, commercial secrets and industry regulation."
    ],
    "whyEn": "This is a **veto item** in selection rather than a bonus — a non-compliant option cannot be used however good it is.",
    "slug": "隐私与合规"
   },
   {
    "zh": "单次调用成本",
    "en": "Cost per Call",
    "purpose": "完成一次任务的实际花销，而不只是单价。",
    "def": [
     "单价 × 实际消耗的 token 数。不同任务的消耗量可以差几个量级。"
    ],
    "why": "按单价选模型容易出错。同样便宜，消耗量不同的模型总成本可能相反。",
    "refs": [
     [
      "OpenAI 官方 API 定价",
      "https://openai.com/api/pricing/",
      "OpenAI API Pricing"
     ],
     [
      "Anthropic Claude 定价",
      "https://platform.claude.com/docs/en/about-claude/pricing",
      "Anthropic Claude Pricing"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 12,
    "alias": [],
    "purposeEn": "What a task actually costs to run, not just the unit price.",
    "defEn": [
     "Unit price times the tokens actually consumed. Consumption can differ by orders of magnitude between tasks."
    ],
    "whyEn": "Choosing a model on unit price alone is easy to get wrong. Two models can cost the same per token and end up in the opposite order overall.",
    "slug": "单次调用成本"
   },
   {
    "zh": "缓存策略",
    "en": "Caching Strategy",
    "purpose": "重复的内容不重复计算，直接复用。这是降本的第一手段。",
    "def": [
     "缓存重复的输入与结果，减少重复调用与计算。"
    ],
    "why": "它对成本的影响往往大于选一个更便宜的模型。",
    "refs": [
     [
      "Claude 提示词缓存",
      "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
      "Anthropic prompt caching docs"
     ]
    ],
    "domain": "choice",
    "purposeTag": "apply",
    "level": 6,
    "layer": "六",
    "ord": 13,
    "alias": [],
    "purposeEn": "Do not recompute repeated content; reuse it directly. The first lever for cutting cost.",
    "defEn": [
     "Caching repeated inputs and results to avoid duplicate calls and computation."
    ],
    "whyEn": "Its effect on cost is often larger than choosing a cheaper model.",
    "slug": "缓存策略"
   },
   {
    "zh": "路由",
    "en": "Routing",
    "purpose": "简单问题派给便宜快的模型，难问题派给强模型。",
    "def": [
     "按任务复杂度自动选择模型的机制。"
    ],
    "why": "这是同时控制成本与质量最有效的手段，也是当前产品设计的主流做法。",
    "refs": [
     [
      "OpenRouter 提供方路由文档",
      "https://openrouter.ai/docs/guides/routing/provider-selection",
      "OpenRouter Provider Routing"
     ],
     [
      "LangChain 模型文档（动态选型）",
      "https://docs.langchain.com/oss/javascript/langchain/models",
      "LangChain Models: dynamic model selection"
     ]
    ],
    "domain": "choice",
    "purposeTag": "apply",
    "level": 6,
    "layer": "六",
    "ord": 14,
    "alias": [],
    "purposeEn": "Send easy questions to a cheap fast model and hard ones to a strong model.",
    "defEn": [
     "Mechanism that picks a model automatically based on task complexity."
    ],
    "whyEn": "The most effective way to control cost and quality together, and standard practice in current product design.",
    "slug": "路由"
   },
   {
    "zh": "自托管成本",
    "en": "Self-hosting Cost",
    "purpose": "本地跑不花钱，但硬件、电费、运维都是真实成本。",
    "def": [
     "设备购置、电力、显存扩容与维护工作构成的总成本。"
    ],
    "why": "它让「本地一定比 API 便宜」这个常见假设变得可验证。要按你的实际使用量算。",
    "refs": [
     [
      "按设备选量化档位（千问 3.8）",
      "https://models.specul.com/series/qwen3-8/#b0",
      "Pick tiers by device (Qwen3.8)"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 15,
    "alias": [],
    "purposeEn": "Running locally costs no per-token fee, but hardware, electricity and operations are real costs.",
    "defEn": [
     "The total of hardware purchase, power, VRAM expansion and the ongoing maintenance work."
    ],
    "whyEn": "It makes the common assumption \"local is always cheaper than an API\" testable — compute it against your actual usage.",
    "slug": "自托管成本"
   },
   {
    "zh": "服务中断风险",
    "en": "Vendor Dependency",
    "purpose": "依赖别人的服务意味着它可能涨价、下线或限流。",
    "def": [
     "第三方服务不可用导致工作受阻的风险。"
    ],
    "why": "关键流程如果完全依赖单一供应商，这是很实际的运营风险。",
    "refs": [
     [
      "OpenAI 官方状态页",
      "https://status.openai.com/",
      "OpenAI Status"
     ],
     [
      "Anthropic 模型弃用政策",
      "https://console.anthropic.com/docs/en/about-claude/model-deprecations",
      "Anthropic Model Deprecations"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 16,
    "alias": [],
    "purposeEn": "Depending on someone else's service means it may raise prices, shut down, or rate-limit you.",
    "defEn": [
     "The risk that an unavailable third-party service blocks your work."
    ],
    "whyEn": "If a critical process depends entirely on one provider, this is a very real operational risk.",
    "slug": "服务中断风险"
   },
   {
    "zh": "可替换性",
    "en": "Portability",
    "purpose": "换个模型或服务商，需要改多少东西。",
    "def": [
     "方案对特定供应商的依赖程度，通用协议与开放格式能显著提高可替换性。"
    ],
    "why": "这是长期成本里最容易被忽略的一项，也是抗中断能力的基础。",
    "refs": [
     [
      "MCP 作为标准接口的价值",
      "https://agent.specul.com/tools/index.html",
      "MCP as a standard interface"
     ],
     [
      "ACP 协议",
      "https://agent.specul.com/zed.html",
      "The ACP protocol (Zed)"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 17,
    "alias": [],
    "purposeEn": "How much has to change if you swap models or providers.",
    "defEn": [
     "How dependent a design is on a particular provider. Open protocols and formats raise substitutability substantially."
    ],
    "whyEn": "The most easily overlooked item in long-term cost, and the basis of resilience when something breaks.",
    "slug": "可替换性"
   },
   {
    "zh": "社区与文档",
    "en": "Community & Docs",
    "purpose": "出问题能不能找到人问，接口有没有写清楚的文档。",
    "def": [
     "项目活跃度、文档质量、问题响应速度等非技术因素。"
    ],
    "why": "它是选型里权重很高但最容易被忽略的一项。文档差会长期消耗你的时间。",
    "refs": [
     [
      "站点如何逐条核实并写来源",
      "https://agent.specul.com/harness/claude-agent-sdk.html",
      "How sources are verified item by item"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 18,
    "alias": [],
    "purposeEn": "When something breaks, can you find someone to ask, and is the API properly documented.",
    "defEn": [
     "Non-technical factors: project activity, documentation quality, responsiveness to issues."
    ],
    "whyEn": "It carries heavy weight in selection while being the easiest to overlook — poor documentation consumes your time for a long time.",
    "slug": "社区与文档"
   },
   {
    "zh": "迭代速度",
    "en": "Release Cadence",
    "purpose": "项目更新有多快，版本是否稳定。",
    "def": [
     "发布频率与稳定性。频繁更新意味着改进快但也可能引入 breaking change。"
    ],
    "why": "它决定你是在追一个快速发展的东西，还是一个趋于稳定的工具。",
    "refs": [
     [
      "OpenAI 模型发布说明",
      "https://help.openai.com/en/articles/9624314-model-release-notes",
      "OpenAI Model Release Notes"
     ],
     [
      "OpenTelemetry 版本与稳定性",
      "https://opentelemetry.io/docs/specs/otel/versioning-and-stability/",
      "OpenTelemetry Versioning and Stability"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 19,
    "alias": [],
    "purposeEn": "How fast the project moves and how stable its versions are.",
    "defEn": [
     "Release frequency and stability. Frequent updates mean faster improvement but also possible breaking changes."
    ],
    "whyEn": "It decides whether you are chasing something moving quickly or using a tool that is settling down.",
    "slug": "迭代速度"
   },
   {
    "zh": "退出成本",
    "en": "Exit Cost",
    "purpose": "不用了，迁移走要付出多少。",
    "def": [
     "停止使用某方案时，把数据与流程迁走的代价。"
    ],
    "why": "和可替换性是同一件事的两面。它在选型当下看不见，出问题时最痛。",
    "refs": [
     [
      "Anthropic 迁移指南",
      "https://console.anthropic.com/docs/en/about-claude/models/migration-guide",
      "Anthropic Claude Migration Guide"
     ],
     [
      "OpenAI 导出数据帮助页",
      "https://help.openai.com/zh-hans-cn/articles/7260999",
      "OpenAI – Export Your Data"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 20,
    "alias": [],
    "purposeEn": "What it costs to migrate away when you stop using it.",
    "defEn": [
     "The cost of moving your data and workflow elsewhere when you abandon a given approach."
    ],
    "whyEn": "Two sides of the same coin as substitutability. Invisible at selection time, most painful when something breaks.",
    "slug": "退出成本"
   },
   {
    "zh": "成本",
    "en": "Cost",
    "purpose": "为一个AI 方案实际要花多少钱。除了单价，还有你消耗掉的数量。",
    "def": [
     "把费用摊到一次任务上得到的真实开销。",
     "构成：调用单价 × 实际消耗量（token 次数、时长、并发数）。"
    ],
    "why": "**按单价选模型容易出错**——同样便宜，消耗量不同的模型总成本可能相反。",
    "refs": [
     [
      "官方档位与额度核实",
      "https://agent.specul.com/harness/crewai.html",
      "Plans and quotas verified item by item"
     ],
     [
      "提示词缓存如何降本",
      "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
      "How prompt caching cuts cost"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 21,
    "alias": [],
    "purposeEn": "What an AI approach actually costs. Beyond unit price there is also how much you consume.",
    "defEn": [
     "The real expense once costs are amortised across a task.",
     "It comprises unit price times actual consumption (token count, duration, concurrency)."
    ],
    "whyEn": "**Choosing a model on unit price alone is easy to get wrong** — two models with identical prices can invert once real consumption differs.",
    "slug": "成本"
   },
   {
    "zh": "传输方式",
    "en": "Transport",
    "purpose": "你的数据用什么方式送到模型或工具那里：留在本机还是发到第三方。",
    "def": [
     "数据在组件之间移动的通道。本地进程内传输与跨网络传输安全性完全不同。",
     "常见的两种：本地进程间通信，以及远程 HTTP 请求。"
    ],
    "why": "这是判断「我的数据会不会外流」的第一道判断。**发到远程的方案，天然不适合敏感资料**。",
    "refs": [
     [
      "MCP 三维里的传输方式",
      "https://agent.specul.com/tools/index.html",
      "Transport in MCP's three axes"
     ],
     [
      "远程托管 vs 本地 server",
      "https://agent.specul.com/tools/context7.html",
      "Remote vs local servers (context7)"
     ]
    ],
    "domain": "data",
    "purposeTag": "learn",
    "level": 6,
    "layer": "六",
    "ord": 22,
    "alias": [],
    "purposeEn": "How your data actually reaches the model or tool: staying on your machine, or going to a third party.",
    "defEn": [
     "The channel data moves through between components. In-process local transfer and cross-network transfer have very different safety properties.",
     "The two common forms: local inter-process communication, and remote HTTP requests."
    ],
    "whyEn": "It is the first question to ask when deciding whether your data can leak. **Anything sent to a remote service is inherently unsuitable for sensitive material.**",
    "slug": "传输方式"
   },
   {
    "zh": "模型退役",
    "en": "Model Retirement",
    "alias": [
     "模型下线",
     "弃用与退役"
    ],
    "purpose": "云端模型会被下线，这是选型时要算的风险。",
    "def": [
     "微软官方区分两阶段：弃用后新客户不能再部署，已有部署仍可用。",
     "退役后所有推理请求返回 410 Gone。",
     "官方称标准生命周期约 18 个月，并在退役前至少提前 60 天通知。"
    ],
    "why": "「这家 API 会不会哪天关掉」有具体答案：会，而且有时间表。",
    "refs": [
     [
      "Microsoft Foundry 模型生命周期与支持政策",
      "https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/model-retirements",
      "Microsoft Foundry models lifecycle and support policy"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 23,
    "purposeEn": "Cloud models get retired; treat it as a selection risk.",
    "defEn": [
     "Microsoft distinguishes two stages: once deprecated, new customers cannot deploy while existing deployments keep working.",
     "Once retired, all inference requests return 410 Gone.",
     "The docs describe a standard 18-month lifecycle with at least 60 days' notice before retirement."
    ],
    "whyEn": "\"Will this API shut down someday\" has a concrete answer: yes, on a published schedule.",
    "slug": "模型退役"
   },
   {
    "zh": "预览版与正式版",
    "en": "Preview vs GA",
    "alias": [
     "Preview",
     "GA"
    ],
    "purpose": "模型 API 的两种成熟度，决定能不能上生产。",
    "def": [
     "微软官方对 Preview 的定义：它是实验性的。权重、运行时与 API 结构都可能变，且不保证转为正式版。",
     "官方明确不建议把预览模型用于生产负载。",
     "正式版（GA）的权重与 API 固定。"
    ],
    "why": "选 API 先看这个标签。预览版更新，但随时会变。",
    "refs": [
     [
      "Microsoft Foundry 模型生命周期与支持政策",
      "https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/model-retirements",
      "Microsoft Foundry models lifecycle and support policy"
     ]
    ],
    "domain": "choice",
    "purposeTag": "judge",
    "level": 6,
    "layer": "六",
    "ord": 24,
    "purposeEn": "Two maturity levels of a model API, deciding whether it belongs in production.",
    "defEn": [
     "Microsoft defines Preview as experimental: weights, runtime and API schema might change, with no guarantee of reaching GA.",
     "The docs state preview models are not recommended for production workloads.",
     "GA means production-ready with fixed weights and APIs."
    ],
    "whyEn": "Check this label first. Preview is newer, but it can change at any time.",
    "slug": "预览版与正式版"
   },
   {
    "zh": "模型版本与变体",
    "en": "Model Family, Version, Variant",
    "alias": [
     "模型家族",
     "模型版本"
    ],
    "purpose": "同一个模型名后面那串日期和 mini、nano，含义不同。",
    "def": [
     "微软官方定义：模型家族是一代模型；版本是家族内带日期的发布。",
     "变体是同一家族内的规模或能力档位，例如 mini、nano。"
    ],
    "why": "换「同名新版本」常常改变行为。写清版本日期，问题才可复现。",
    "refs": [
     [
      "Microsoft Foundry 模型生命周期与支持政策",
      "https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/model-retirements",
      "Microsoft Foundry models lifecycle and support policy"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 25,
    "purposeEn": "The date and the mini/nano suffix in a model name mean different things.",
    "defEn": [
     "Microsoft's definition: a model family is a generation; a version is a dated release within it.",
     "A variant is a size or capability tier in the same family, such as mini or nano."
    ],
    "whyEn": "Switching to a \"newer version of the same name\" often changes behavior. Pin the date to stay reproducible.",
    "slug": "模型版本与变体"
   },
   {
    "zh": "区域可用性",
    "en": "Regional Availability",
    "purpose": "同一个模型，在你所在的区域可能根本没有。",
    "def": [
     "微软官方：并非所有模型与版本组合都在所有区域可用。",
     "相邻版本可能不会同时出现在同一区域。"
    ],
    "why": "跨区部署或换供应商前，先确认「这个区域有没有」。",
    "refs": [
     [
      "Microsoft Foundry 模型生命周期与支持政策",
      "https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/model-retirements",
      "Microsoft Foundry models lifecycle and support policy"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 26,
    "alias": [],
    "purposeEn": "A model may simply not exist in the region you are in.",
    "defEn": [
     "Microsoft states that not all model and version combinations are available in all regions.",
     "Successive versions may not appear in the same region at the same time."
    ],
    "whyEn": "Before cross-region deployment or switching vendors, confirm \"is it here\".",
    "slug": "区域可用性"
   },
   {
    "zh": "数据驻留",
    "en": "Data Residency",
    "alias": [
     "数据驻留地"
    ],
    "purpose": "你的数据存在哪个区域，由谁决定。",
    "def": [
     "AWS 官方：客户选择在哪个 AWS 区域存储客户内容。",
     "官方称除提供服务所必需或依法要求外，不会把内容移出所选区域。"
    ],
    "why": "「数据不出网」在云端的具体形态。合规审查时这是要拿书面承诺的一项。",
    "refs": [
     [
      "AWS 数据隐私常见问题",
      "https://aws.amazon.com/compliance/data-privacy-faq/",
      "AWS data privacy FAQs"
     ],
     [
      "AWS 数字主权",
      "https://aws.amazon.com/compliance/digital-sovereignty/",
      "AWS digital sovereignty"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 27,
    "purposeEn": "Which region your data sits in, and who decides.",
    "defEn": [
     "AWS states that the customer chooses the AWS Region(s) where customer content is stored.",
     "AWS says it will not move or replicate content outside the chosen region(s) except as necessary to provide the service or comply with law."
    ],
    "whyEn": "The cloud form of \"data never leaves our network\", and a written commitment to collect during review.",
    "slug": "数据驻留"
   },
   {
    "zh": "训练内容摘要",
    "en": "Training Content Summary",
    "purpose": "欧盟要求通用模型公开「训练用了哪些内容」的摘要。",
    "def": [
     "欧盟《人工智能法》第 53(1)(d) 条这样规定。通用目的 AI 模型提供者须编制并公开「训练所用内容的足够详细摘要」。",
     "摘要须按 AI Office 提供的模板发布。",
     "法条用词是「训练所用内容」，不是「训练数据集」。"
    ],
    "why": "想知道一个模型用了什么数据，欧盟境内有法定线索可循。",
    "refs": [
     [
      "AI Act Explorer 第 53 条（第三方镜像；正式文本见 EUR-Lex）",
      "https://artificialintelligenceact.eu/article/53/",
      "AI Act Explorer, Article 53 (third-party mirror; official text on EUR-Lex)"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 28,
    "alias": [],
    "purposeEn": "The EU requires general-purpose model providers to publish a summary of training content.",
    "defEn": [
     "Article 53(1)(d) requires providers to draw up and make publicly available a sufficiently detailed summary about the content used for training.",
     "The summary must follow a template provided by the AI Office.",
     "The wording is \"content used for training\", not \"training dataset\"."
    ],
    "whyEn": "Inside the EU there is now a legal trail for asking what a model was trained on.",
    "slug": "训练内容摘要"
   },
   {
    "zh": "生成式 AI 合规义务",
    "en": "Generative AI Compliance Duties",
    "alias": [
     "生成式人工智能服务管理暂行办法"
    ],
    "purpose": "面向境内公众提供生成式 AI 服务要遵守的具体义务。",
    "def": [
     "《生成式人工智能服务管理暂行办法》第七条这样规定。训练数据处理须「使用具有合法来源的数据和基础模型」。",
     "第十二条：图片、视频等生成内容须按深度合成管理规定标识。",
     "第十七条：具有舆论属性或社会动员能力的服务须开展安全评估并履行算法备案。"
    ],
    "why": "在国内上线一个 AI 功能，这三条是最先要核对的。",
    "refs": [
     [
      "《生成式人工智能服务管理暂行办法》全文（国家网信办）",
      "https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm",
      "Interim Measures for Generative AI Services (CAC, full text)"
     ]
    ],
    "domain": "choice",
    "purposeTag": "guard",
    "level": 6,
    "layer": "六",
    "ord": 29,
    "purposeEn": "The specific duties when serving generative AI to the public in China.",
    "defEn": [
     "Article 7 requires using data and base models with lawful sources in training-data processing.",
     "Article 12 requires labeling generated images and videos per the deep-synthesis rules.",
     "Article 17 requires services with public-opinion or mobilization attributes to run a security assessment and complete algorithm filing."
    ],
    "whyEn": "These three are the first checks before shipping an AI feature domestically.",
    "slug": "生成式 AI 合规义务"
   },
   {
    "zh": "迁移评估",
    "en": "Migration Evaluation",
    "purpose": "换模型时该怎么做决定，而不是等供应商推荐。",
    "def": [
     "微软官方建议：不要等官方指定替代品才开始评估新模型。",
     "官方约在退役前 90–120 天才选定替代品。",
     "官方建议用自己的应用、提示词和代表性数据评估，把质量、延迟、成本放在一起比较。"
    ],
    "why": "这条把「模型评测的局限」落到操作层面：换模型要自己测。",
    "refs": [
     [
      "Microsoft Foundry 模型生命周期与支持政策",
      "https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/model-retirements",
      "Microsoft Foundry models lifecycle and support policy"
     ]
    ],
    "domain": "choice",
    "purposeTag": "apply",
    "level": 6,
    "layer": "六",
    "ord": 30,
    "alias": [],
    "purposeEn": "How to decide on a new model instead of waiting for the vendor's recommendation.",
    "defEn": [
     "Microsoft advises not to wait for the official replacement before evaluating newer models.",
     "The official replacement is selected roughly 90-120 days before retirement.",
     "Evaluate candidates against your own application, prompts and representative data, comparing quality, latency and cost together."
    ],
    "whyEn": "This turns \"limits of benchmarks\" into practice: switching models means testing them yourself.",
    "slug": "迁移评估"
   }
  ]
 }
];
