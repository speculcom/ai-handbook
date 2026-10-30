# AI Tools (ai-handbook / tools)

> 中文版：[README.md](./README.md)

**An atlas of AI tools** · plain Markdown · open source

Records the capability boundaries, runtime location and official evidence for
**AI tools** (coding agents, chat assistants, image/video/audio creation, agent
frameworks, MCP tools…), organized in one fixed coordinate
system, so that choosing becomes a traceable judgement rather than a hunch.

This repository **holds data only, it does not emit conclusion pages**. The conclusion layer
is consumed by tools.specul.com (v8 · since 2026-10-21 the content is reorganized into
**10 categories**; the former three divisions agents / harness / tools are retired):

| Category | Subject |
|---|---|
| `coding` | AI coding — agents living in editors, terminals, or a vendor cloud, working autonomously on codebases |
| `chat` | Chat assistants — general-purpose chat products, including Chinese ones |
| `image` · `video` · `audio` | AI creation — images, video, audio and voice |
| `research` · `automation` | AI search & research, automation & workflows |
| `framework` | Agent frameworks & runtimes — the base you use to build your own agent |
| `mcp` | Tools for your AI — MCP servers |
| `runner` | Local model runners |

**Why "atlas"**: not a pile of tool names, but a map that can place all 177 objects.

**Three families** (homepage card grouping, not a directory layer): ready-made (coding / chat /
image / video / audio / research / automation) · build-your-own (framework / runner) ·
plug-in-and-run (mcp). The three families use different coordinate systems — no ranking across them.

Category definitions and boundary rulings: see [categories.md](./categories.md).

---

## This is not another awesome list

Projects of this kind are usually a column of links. This repository takes a different route:

| Common practice | This repository |
|---|---|
| Sorted by stars / popularity | **No overall rankings** |
| Copying vendor marketing copy | Only capability boundaries verifiable from official sources |
| Leaving it blank when not found | **"Unknown" is a valid answer**, with the reason given |
| One flat list | **A fixed set of 8 axes × every object**, comparable horizontally |
| Nobody notices dead links | Every judgement cites an official source with a verification date |

**Verified snapshots, not a claim of live measurement.**

---

## How to read this

There are 177 profiles here. Most people need three of them. Pick the lane that matches the problem in front of you:

| What you are trying to solve | Where to go |
|---|---|
| "Which coding agent should I use?" | First work out whether it's an IDE, a CLI or a vendor cloud — then look in [`tracks/coding/`](./tracks/coding/) |
| "I want a chat assistant or a creation tool" | [`tracks/chat/`](./tracks/chat/) · [`tracks/image/`](./tracks/image/) · [`tracks/video/`](./tracks/video/) · [`tracks/audio/`](./tracks/audio/) — read the "commercial license" line first |
| "I want to build my own agent" | Go straight to [`tracks/framework/`](./tracks/framework/): where state lives, how context gets compressed, how far permissions reach |
| "My agent needs to reach the outside world" | [`tracks/mcp/`](./tracks/mcp/) — the MCP server ecosystem |
| "I want to know how two things actually differ" | Read [`axes/`](./axes/) to see what each of the 8 dimensions asks, then compare side by side |

One trap worth naming up front: a ready-made tool and a build-your-own base are not the same
kind of thing. The first question is "which one is nicer to use"; the second is
"where do I keep state, how do I fit the context in, how much permission do I
grant". Mixing the two produces a comparison that means nothing.

Live version: <https://tools.specul.com/>

---

## The methodology

In one line: **do not let unmeasured things look like they have conclusions.**

Four core rules:

| Rule | How it is applied |
|---|---|
| **Abandon the aggregate score** | Without reproducible measurement under a shared input, budget and environment, no total ranking is given |
| **Fixed coordinate system** | Every object is described on the same set of 8 axes; custom axes are not allowed |
| **Unknown is a valid answer** | When it cannot be found, write "unknown" plus the reason; never fill in by guesswork |
| **Every judgement carries evidence** | Judgements trace back to first-party official sources, distinguishing announcement / verification / effective dates |

The full methodology is in [METHODOLOGY.md](./METHODOLOGY.md).

---

## Quick start

### I want to look up one tool's capability boundary

1. See what each of the 8 axes asks about in [axes/](./axes/)
2. Find the entry under that category's `products/` (category definitions: [categories.md](./categories.md))
3. Follow the entry's `sources` back to the official text

### I want to add a tool

1. Read [SCHEMA.md](./SCHEMA.md) for the field format (v2: directory = category, `form:` has 8 values)
2. Copy any entry in the same category as a template
3. Fill in the 8 axes according to the criteria in [axes/](./axes/)
4. Open a PR with links to the official sources you read

### I want to correct a piece of data

Open an Issue stating the entry id, the field name, and a link to your evidence.
Corrections without a source are not accepted.

### I want to run a measurement round

Read the matching `protocols/_protocol.md` (three protocols: coding / framework / mcp) and follow it.

---

## Layout

```
tools/ (ai-handbook subtree)
├── METHODOLOGY.md              methodology
├── SCHEMA.md                   data format spec (v2)
├── categories.md               the 10 categories: definitions and boundary rulings
├── CONTRIBUTING.md             how to contribute
├── SOURCES.md                  source index
├── axes/                       definitions and criteria for the 8 axes (incl. consumer readings)
│   ├── model-access.md         models and access conditions
│   ├── runtime.md              where it runs
│   ├── local-files.md          local files
│   ├── background.md           tasks that survive shutdown
│   ├── tools.md                tools and extensions
│   ├── context.md              context and memory
│   ├── permissions.md          permissions and limits
│   └── fit.md                  what tasks it suits
├── tracks/
│   ├── coding/                 AI coding category
│   │   ├── _category.md        category declaration (criteria + form rulings + object table)
│   │   └── products/           41 objects
│   ├── chat/                   chat assistants (14 objects)
│   ├── image/ · video/ · audio/  three creation categories (13 + 12 + 10 objects)
│   ├── framework/              agent frameworks & runtimes (22 objects)
│   ├── mcp/                    MCP ecosystem (3 additional axes, 28 objects)
│   └── research/ · automation/ · runner/  search & research, automation, local runners (11 + 14 + 12 objects)
├── protocols/                  measurement protocols (coding / framework / mcp)
├── scripts/                    validators (validate / audit / quality)
└── CHANGELOG.md                data-layer changelog
```

### `family` grouping in the framework category

The framework objects are grouped into three sets by **abstraction level** — the most
important distinguishing axis for this category:

| family | Meaning | Objects |
|---|---|---|
| `coding-base` | Bases aimed directly at programming tasks | Claude Agent SDK · Codex SDK · OpenAI Agents SDK · Pydantic AI · smolagents |
| `orchestration` | Orchestration / graph-execution frameworks | CrewAI · Google ADK · LangGraph · LlamaIndex · Microsoft Agent Framework · AG2 · Mastra |
| `general-harness` | General-assistant style, or shipping a complete runtime | Deep Agents · Hermes Agent · OpenHands |

Grouping is not a ranking — frameworks in the same group solve different problems, so they
cannot be compared directly.

---

## Data confidence tiers

Every entry carries two independent markers:

### `confidence` — how reliable this site's data is

| Value | Meaning |
|---|---|
| `verified` | All 8 axes have official sources, and the verification date is within 90 days |
| `partial` | Some axes are marked unknown, or verification is older than 90 days |
| `stale` | Upstream has released significant changes that we have not yet verified |

### `lifecycle` — the state of the object itself

This matters more than `last_verified` for the question "will this data still be useful
tomorrow".

| Value | Meaning |
|---|---|
| `active` | Upstream had commits or releases in the last 30 days |
| `maintenance` | Upstream updated in the last 90 days, but the pace has clearly slowed |
| `archived` | Upstream is archived, stopped updating, or transferred maintenance |
| `unknown` | No changelog / no repository to judge by |

**Constraint**: when `lifecycle` is `archived` or `unknown`, `confidence` must not be `verified`.

**Why it is a separate field**: an object may have been verified today and still become
useless tomorrow if upstream has been quiet for six months.

Example: an open-source CLI tool whose last push was 4 months ago — that fact must be
recorded explicitly, and not hidden behind a fresh verification date.

**When you cite data from this repository, include `confidence`, `lifecycle` and
`last_verified` together.**

---

## Known limits

Stating honestly what this repository **cannot** do:

| Not doing | Why |
|---|---|
| No single overall ranking | Without unified cross-tool measurement, a ranking would mislead |
| No guessing at unverified information | "Unknown" is more useful than an invented number |
| No cross-currency conversion | Exchange rates, regions and account differences get hidden by conversion |
| No objects without official documentation | Objects that cannot be verified do not enter the repository |
| No paid measurement (currently) | The protocol is ready; no conclusions are published until it is run |
| No guarantee of complete coverage | Recording density varies with each object's upstream activity |
| Data may go stale | Every entry carries `lifecycle` and `last_verified`; check both |

---

## License

Content is licensed under [CC BY 4.0](./LICENSE).

**Requirements**: attribute "ai-coding-agent-atlas contributors" and link back to this
repository. **Product names and trademarks belong to their respective owners; this repository
and its sites use them for identification and commentary only** (the L3 notice, same wording as
the site-wide footer).

---

## Raw material is not committed

Web page snapshots captured during collection (Cursor / Windsurf / Copilot pricing pages and
changelogs, roughly 480KB) are **not included in this repository**, because the copyright of
third-party site content is not ours to redistribute.

**This does not hurt verifiability**: every entry lists the corresponding official source URL
and verification date, and anyone can visit the original to check.

If you need the raw snapshots for research, please contact us via an Issue.

---

## Related projects

| Project | Role |
|---|---|
| **specul.com** | Brand site (投机 · 推演 — speculation · inference) |
| **nav.specul.com** | Conclusion layer: AI site directory |
| **tools.specul.com** | Conclusion layer: AI tools across 10 categories |
| **learn.specul.com** | Conclusion layer: AI glossary |
| **models.specul.com** | Conclusion layer: quantized model index for local deployment |
| **vg.specul.com** | Conclusion layer: making games with AI |

**Methodology prototype**: this repository's three rules — abandon aggregate scores, make
"unknown" legitimate, attach evidence to every judgement — are borrowed from
[AgentClash](https://aiagentclash.com/), but the coordinate system and category definitions
are independently designed here.

<!-- INDEX:BEGIN generated, do not edit -->

## Content index

### AI coding — 41

Coding agents in your editor, terminal, or a vendor cloud

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [Baidu Comate (Wenxin Kuaima)](tracks/coding/products/baidu-comate.md) | Baidu | ide | partial | active |
| [Aider](tracks/coding/products/aider-cli.md) | Aider-AI | cli | partial | maintenance |
| [Aider (Watch mode)](tracks/coding/products/aider.md) | Aider-AI | ide | partial | maintenance |
| [Amazon Q Developer](tracks/coding/products/amazon-q-developer.md) | AWS | ide | partial | maintenance |
| [Amp](tracks/coding/products/amp.md) | Amp Frontier Corporation (spun out of Sourcegraph, Dec 2025) | cli | partial | active |
| [Augment Code](tracks/coding/products/augment-code.md) | Augment Code | cloud | partial | active |
| [Bolt.new](tracks/coding/products/bolt-new.md) | StackBlitz | cloud | partial | active |
| [Claude Code CLI](tracks/coding/products/claude-code-cli.md) | Anthropic | cli | partial | active |
| [Claude Code (IDE extension)](tracks/coding/products/claude-code.md) | Anthropic | ide | partial | active |
| [Cline](tracks/coding/products/cline.md) | Cline Bot | ide | partial | active |
| [CodeBuddy](tracks/coding/products/codebuddy.md) | Tencent Cloud | ide | partial | active |
| [Codex CLI](tracks/coding/products/codex-cli.md) | OpenAI | cli | partial | active |
| [Codex (IDE extension)](tracks/coding/products/codex-ide.md) | OpenAI | ide | partial | active |
| [Continue](tracks/coding/products/continue.md) | Continue | ide | partial | archived |
| [Crush](tracks/coding/products/crush.md) | Charm | cli | partial | active |
| [Cursor](tracks/coding/products/cursor.md) | Anysphere | ide | partial | active |
| [Cursor CLI](tracks/coding/products/cursor-cli.md) | Anysphere | cli | partial | active |
| [Devin](tracks/coding/products/devin.md) | Cognition | cloud | partial | active |
| [Droid](tracks/coding/products/factory-droid.md) | Factory AI | cli | partial | active |
| [Gemini CLI](tracks/coding/products/gemini-cli.md) | Google | cli | partial | active |
| [GitHub Copilot](tracks/coding/products/copilot.md) | GitHub / Microsoft | ide | partial | active |
| [GitHub Copilot CLI](tracks/coding/products/copilot-cli.md) | GitHub | cli | partial | active |
| [Google Antigravity](tracks/coding/products/google-antigravity.md) | Google | ide | partial | active |
| [Goose](tracks/coding/products/goose.md) | Agentic AI Foundation | cli | partial | active |
| [Jules](tracks/coding/products/jules.md) | Google | cloud | partial | active |
| [Junie](tracks/coding/products/junie.md) | JetBrains | ide | partial | active |
| [Kilo Code](tracks/coding/products/kilocode.md) | Kilo-Org | ide | partial | active |
| [Kiro](tracks/coding/products/kiro.md) | AWS | ide | partial | active |
| [Lovable](tracks/coding/products/lovable.md) | Lovable | cloud | partial | active |
| [Meta Muse](tracks/coding/products/meta-muse.md) | Meta | cloud | partial | active |
| [OpenAI Dot](tracks/coding/products/openai-dot.md) | OpenAI | cloud | partial | active |
| [OpenCode](tracks/coding/products/opencode.md) | OpenCode | cli | partial | active |
| [Qoder](tracks/coding/products/qoder.md) | Alibaba Cloud | ide | partial | active |
| [Qoder CN (formerly Lingma)](tracks/coding/products/qoder-cn.md) | Alibaba Cloud | ide | partial | active |
| [Replit Agent](tracks/coding/products/replit-agent.md) | Replit | cloud | partial | active |
| [Trae](tracks/coding/products/trae.md) | ByteDance | ide | partial | active |
| [v0](tracks/coding/products/v0.md) | Vercel | cloud | partial | active |
| [Warp](tracks/coding/products/warp.md) | Warp | cli | partial | active |
| [Windsurf / Devin Desktop](tracks/coding/products/windsurf.md) | Cognition | ide | partial | active |
| [xAI Grok Bot](tracks/coding/products/grok-bot.md) | xAI | cloud | partial | active |
| [Zed](tracks/coding/products/zed.md) | Zed Industries | ide | partial | active |

### Chat assistants — 14

General-purpose chat assistants, web/app, including Chinese products

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [Doubao](tracks/chat/products/doubao-chat.md) | ByteDance | web | partial | active |
| [Tencent Yuanbao](tracks/chat/products/yuanbao-chat.md) | Tencent | web | partial | active |
| [Tongyi Qianwen (Qwen Chat)](tracks/chat/products/tongyi-qianwen.md) | Alibaba | web | partial | active |
| [Wenxin](tracks/chat/products/wenxin.md) | Baidu | web | partial | active |
| [iFlytek Spark](tracks/chat/products/xinghuo-spark.md) | iFlytek | web | partial | active |
| [ChatGLM (Zhipu Qingyan)](tracks/chat/products/chatglm-chat.md) | Zhipu AI | web | partial | active |
| [ChatGPT](tracks/chat/products/chatgpt.md) | OpenAI | web | partial | active |
| [Claude (chat app)](tracks/chat/products/claude-chat.md) | Anthropic | web | verified | active |
| [DeepSeek Chat](tracks/chat/products/deepseek-chat.md) | DeepSeek | web | partial | active |
| [Gemini (chat app)](tracks/chat/products/gemini-chat.md) | Google | web | partial | active |
| [Grok](tracks/chat/products/grok-chat.md) | xAI | web | partial | active |
| [Kimi](tracks/chat/products/kimi-chat.md) | Moonshot AI | web | partial | active |
| [Manus](tracks/chat/products/manus.md) | Manus AI (Monica team) | web | partial | active |
| [Microsoft Copilot](tracks/chat/products/microsoft-copilot.md) | Microsoft | web | partial | active |

### Image creation — 13

Text-to-image and AI image editing

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [Jimeng AI](tracks/image/products/jimeng.md) | ByteDance (Jianying/CapCut team) | web | partial | active |
| [Tongyi Wanxiang (Wan)](tracks/image/products/tongyi-wanxiang.md) | Alibaba | web | partial | active |
| [Adobe Firefly](tracks/image/products/adobe-firefly.md) | Adobe | web | partial | active |
| [Clipdrop](tracks/image/products/clipdrop.md) | Jasper (formerly InitML; via Stability AI 2023, sold to Jasper Feb 2024) | web | partial | active |
| [FLUX (Black Forest Labs)](tracks/image/products/flux.md) | Black Forest Labs | cloud | partial | active |
| [Ideogram](tracks/image/products/ideogram.md) | Ideogram | web | partial | active |
| [Krea](tracks/image/products/krea.md) | Krea | web | partial | active |
| [Leonardo AI](tracks/image/products/leonardo-ai.md) | Leonardo (acquired by Canva, Jul 2024) | web | partial | active |
| [Microsoft Designer](tracks/image/products/microsoft-designer.md) | Microsoft | web | partial | active |
| [Midjourney](tracks/image/products/midjourney.md) | Midjourney, Inc. | web | partial | active |
| [Recraft](tracks/image/products/recraft.md) | Recraft | web | partial | active |
| [SeaArt](tracks/image/products/seaart.md) | Haiyi (Chengdu Haiyi Huyu) | web | partial | active |
| [Stability AI (Stable Image platform)](tracks/image/products/stability-ai.md) | Stability AI | web | partial | active |

### Video creation — 12

Text/image-to-video generation and AI-native video editing

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [Hailuo Video](tracks/video/products/hailuo-video.md) | MiniMax (Xiyu Jizhi) | web | partial | active |
| [Kling AI](tracks/video/products/kling.md) | Kling AI Pte. Ltd. (Kuaishou) | web | partial | active |
| [D-ID](tracks/video/products/d-id.md) | D-ID | web | partial | active |
| [HeyGen](tracks/video/products/heygen.md) | HeyGen | web | partial | active |
| [Higgsfield](tracks/video/products/higgsfield.md) | Higgsfield AI | web | partial | active |
| [Luma (Dream Machine)](tracks/video/products/luma.md) | Luma AI | web | partial | active |
| [Pika](tracks/video/products/pika.md) | Pika Labs | web | partial | active |
| [PixVerse](tracks/video/products/pixverse.md) | Aishi Technology | web | partial | active |
| [Runway](tracks/video/products/runway.md) | Runway AI, Inc. | web | partial | active |
| [Synthesia](tracks/video/products/synthesia.md) | Synthesia | web | partial | active |
| [Veo (Google)](tracks/video/products/veo.md) | Google | cloud | partial | active |
| [Vidu](tracks/video/products/vidu.md) | Shengshu Technology (Tsinghua-linked) | web | partial | active |

### Audio & voice — 10

TTS, music generation, transcription products

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [Moyin Workshop](tracks/audio/products/moyin.md) | Mobvoi | web | partial | active |
| [AssemblyAI](tracks/audio/products/assemblyai.md) | AssemblyAI | cloud | partial | active |
| [Deepgram](tracks/audio/products/deepgram.md) | Deepgram | cloud | partial | active |
| [ElevenLabs](tracks/audio/products/elevenlabs.md) | ElevenLabs | web | partial | active |
| [fish audio](tracks/audio/products/fish-audio.md) | fish.audio | web | partial | active |
| [MiniMax Audio (Hailuo Voice)](tracks/audio/products/minimax-audio.md) | MiniMax (Xiyu Jizhi) | web | partial | active |
| [Otter.ai](tracks/audio/products/otter.md) | Otter.ai | web | partial | active |
| [Suno](tracks/audio/products/suno.md) | Suno Inc. | web | partial | active |
| [Udio](tracks/audio/products/udio.md) | Udio | web | partial | active |
| [Whisper](tracks/audio/products/whisper.md) | OpenAI (open source) | local-app | partial | active |

### Search & research — 11

Citation-first search and research products

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [Metaso AI Search](tracks/research/products/metaso.md) | Metaso (Shanghai Metaso Network Technology) | web | partial | active |
| [Tiangong AI Search](tracks/research/products/tiangong.md) | Kunlun Tech | web | partial | active |
| [Andi Search](tracks/research/products/andi.md) | Andi | web | partial | active |
| [Consensus](tracks/research/products/consensus.md) | Consensus | web | partial | active |
| [Devv](tracks/research/products/devv.md) | Devv AI | web | partial | active |
| [Elicit](tracks/research/products/elicit.md) | Elicit | web | partial | active |
| [Genspark](tracks/research/products/genspark.md) | Genspark | web | partial | active |
| [Kagi](tracks/research/products/kagi.md) | Kagi | web | partial | active |
| [NotebookLM](tracks/research/products/notebooklm.md) | Google | web | partial | active |
| [Perplexity](tracks/research/products/perplexity.md) | Perplexity AI | web | partial | active |
| [You.com](tracks/research/products/you-com.md) | You.com | web | partial | active |

### Automation & workflows — 14

Visual AI-app builders and workflow automation platforms

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [Coze](tracks/automation/products/coze.md) | ByteDance | web | partial | active |
| [Activepieces](tracks/automation/products/activepieces.md) | Activepieces Inc. | web | partial | active |
| [Bedrock Agents / AgentCore](tracks/automation/products/bedrock-agents.md) | AWS | web | partial | active |
| [Dify](tracks/automation/products/dify.md) | LangGenius (China-origin, global-facing) | web | partial | active |
| [Flowise](tracks/automation/products/flowise.md) | FlowiseAI, Inc. | web | partial | active |
| [Langflow](tracks/automation/products/langflow.md) | DataStax (formerly Langflow AI) | web | partial | active |
| [Make](tracks/automation/products/make.md) | Make (formerly Integromat) | web | partial | active |
| [Microsoft Copilot Studio](tracks/automation/products/copilot-studio.md) | Microsoft | web | partial | active |
| [n8n](tracks/automation/products/n8n.md) | n8n GmbH | web | partial | active |
| [Pipedream（Connect / Workflows）](tracks/automation/products/pipedream.md) | Pipedream | web | partial | active |
| [Relevance AI](tracks/automation/products/relevance-ai.md) | Relevance AI (Sydney) | web | partial | active |
| [Salesforce Agentforce](tracks/automation/products/agentforce.md) | Salesforce | web | partial | active |
| [Vertex AI Agent Builder](tracks/automation/products/vertex-agent-builder.md) | Google | web | partial | active |
| [Zapier](tracks/automation/products/zapier.md) | Zapier | web | partial | active |

### Agent frameworks & runtimes — 22

Building blocks for your own agent

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [AG2](tracks/framework/products/ag2.md) | ag2ai | harness | partial | active |
| [AgentScope](tracks/framework/products/agentscope.md) | Alibaba (ModelScope) | harness | partial | active |
| [Claude Agent SDK](tracks/framework/products/claude-agent-sdk.md) | Anthropic | harness | partial | active |
| [Codex SDK](tracks/framework/products/codex-sdk.md) | OpenAI | harness | partial | active |
| [CrewAI](tracks/framework/products/crewai.md) | CrewAI Inc | harness | partial | active |
| [Deep Agents](tracks/framework/products/deepagents.md) | LangChain | harness | partial | active |
| [DSPy](tracks/framework/products/dspy.md) | Stanford NLP / Databricks | harness | partial | active |
| [Google ADK（Agent Development Kit）](tracks/framework/products/google-adk.md) | Google | harness | partial | active |
| [Haystack](tracks/framework/products/haystack.md) | deepset | harness | partial | active |
| [Hermes Agent](tracks/framework/products/hermes-agent.md) | Nous Research | harness | partial | active |
| [LangChain](tracks/framework/products/langchain.md) | LangChain, Inc. | harness | partial | active |
| [LangGraph](tracks/framework/products/langgraph.md) | LangChain Inc | harness | partial | active |
| [Letta / MemGPT](tracks/framework/products/letta.md) | Letta, Inc. | harness | partial | active |
| [LlamaIndex Framework](tracks/framework/products/llamaindex.md) | LlamaIndex（run-llama） | harness | partial | active |
| [Mastra](tracks/framework/products/mastra.md) | Mastra AI | harness | partial | active |
| [Microsoft Agent Framework](tracks/framework/products/microsoft-agent-framework.md) | Microsoft | harness | partial | active |
| [OpenAI Agents SDK](tracks/framework/products/openai-agents-sdk.md) | OpenAI | harness | partial | active |
| [OpenHands Agent Canvas](tracks/framework/products/openhands.md) | OpenHands（All-Hands-AI） | harness | partial | active |
| [Pydantic AI](tracks/framework/products/pydantic-ai.md) | Pydantic | harness | partial | active |
| [smolagents](tracks/framework/products/smolagents.md) | Hugging Face | harness | partial | active |
| [Strands Agents SDK](tracks/framework/products/strands-agents.md) | AWS | harness | partial | active |
| [SWE-agent](tracks/framework/products/swe-agent.md) | Princeton / Stanford (academic teams) | harness | partial | active |

### Tools for your AI — 28

MCP servers and the tool ecosystem

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [Atlassian Remote MCP Server（Jira/Confluence）](tracks/mcp/products/atlassian-mcp.md) | Atlassian | mcp | partial | active |
| [Brave Search MCP Server](tracks/mcp/products/brave-search-mcp.md) | Brave | mcp | partial | active |
| [Chrome DevTools MCP](tracks/mcp/products/chrome-devtools-mcp.md) | Google (Chrome DevTools team) | mcp | partial | active |
| [Cloudflare MCP Server](tracks/mcp/products/cloudflare-mcp.md) | Cloudflare | mcp | partial | active |
| [Context7](tracks/mcp/products/context7.md) | Upstash | mcp | partial | active |
| [Datadog MCP Server](tracks/mcp/products/datadog-mcp.md) | Datadog | mcp | partial | active |
| [Everything MCP Server](tracks/mcp/products/everything.md) | Model Context Protocol | mcp | verified | active |
| [Exa MCP Server](tracks/mcp/products/exa-mcp.md) | Exa | mcp | partial | active |
| [Fetch MCP Server](tracks/mcp/products/fetch.md) | Model Context Protocol | mcp | verified | active |
| [Figma MCP Server](tracks/mcp/products/figma-mcp.md) | Figma | mcp | partial | active |
| [Filesystem MCP Server](tracks/mcp/products/filesystem.md) | Model Context Protocol | mcp | verified | active |
| [Firecrawl MCP Server](tracks/mcp/products/firecrawl-mcp.md) | Firecrawl | mcp | partial | active |
| [Git MCP Server](tracks/mcp/products/git.md) | Model Context Protocol | mcp | verified | active |
| [GitHub MCP Server](tracks/mcp/products/github-mcp.md) | GitHub | mcp | partial | active |
| [Grafana MCP Server](tracks/mcp/products/grafana-mcp.md) | Grafana Labs | mcp | partial | active |
| [Knowledge Graph Memory Server](tracks/mcp/products/memory.md) | Model Context Protocol | mcp | verified | active |
| [Linear MCP](tracks/mcp/products/linear-mcp.md) | Linear | mcp | partial | active |
| [MongoDB MCP Server](tracks/mcp/products/mongodb-mcp.md) | MongoDB | mcp | partial | active |
| [Neon MCP Server](tracks/mcp/products/neon-mcp.md) | Neon | mcp | partial | active |
| [Notion MCP](tracks/mcp/products/notion-mcp.md) | Notion | mcp | partial | active |
| [Playwright MCP Server](tracks/mcp/products/playwright.md) | Microsoft | mcp | verified | active |
| [Sentry MCP / Toolkit](tracks/mcp/products/sentry-mcp.md) | Sentry | mcp | partial | active |
| [Sequential Thinking MCP Server](tracks/mcp/products/sequential-thinking.md) | Model Context Protocol | mcp | verified | active |
| [Slack MCP Server](tracks/mcp/products/slack-mcp.md) | Slack (Salesforce) | mcp | partial | active |
| [Stripe Agent Toolkit / MCP](tracks/mcp/products/stripe-mcp.md) | Stripe | mcp | partial | active |
| [Supabase MCP](tracks/mcp/products/supabase-mcp.md) | Supabase | mcp | partial | active |
| [Time MCP Server](tracks/mcp/products/time.md) | Model Context Protocol | mcp | verified | active |
| [Zapier MCP](tracks/mcp/products/zapier-mcp.md) | Zapier | mcp | partial | active |

### Local model runners — 12

Desktop apps that run open-weight models on your machine

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [GPT4All](tracks/runner/products/gpt4all.md) | Nomic AI | local-app | partial | maintenance |
| [Jan](tracks/runner/products/jan.md) | Menlo Research | local-app | partial | active |
| [KoboldCpp](tracks/runner/products/koboldcpp.md) | LostRuins (KoboldAI community) | local-app | partial | active |
| [llama.cpp](tracks/runner/products/llama-cpp.md) | ggml-org | cli | partial | active |
| [LM Studio](tracks/runner/products/lm-studio.md) | Element Labs | local-app | partial | active |
| [LocalAI](tracks/runner/products/localai.md) | Mudler T. (mudler) | cli | partial | active |
| [MLX（mlx-lm）](tracks/runner/products/mlx.md) | Apple | cli | partial | active |
| [Ollama](tracks/runner/products/ollama.md) | Ollama Inc. | cli | partial | active |
| [SGLang](tracks/runner/products/sglang.md) | LMSYS / sgl-project | cli | partial | active |
| [Text Generation Inference（TGI）](tracks/runner/products/tgi.md) | Hugging Face | cli | partial | archived |
| [text-generation-webui / textgen](tracks/runner/products/text-generation-webui.md) | oobabooga | local-app | partial | maintenance |
| [vLLM](tracks/runner/products/vllm.md) | vLLM project (PyTorch Foundation) | cli | partial | active |


<!-- INDEX:END -->

## Measured size (A8)

<!-- STATS:BEGIN generated, do not edit -->
| Item | Measured value |
|---|---|
| Total profiles | 177 |
| By category | coding 41 · chat 14 · image 13 · video 12 · audio 10 · research 11 · automation 14 · framework 22 · mcp 28 · runner 12 |
| By form | web 69 · mcp 28 · harness 22 · cli 19 · ide 19 · cloud 14 · local-app 6 |
| Comparison axes | 8 (the mcp category adds 3 more: transport / auth / scope) |
<!-- STATS:END -->