# ai-agent-guide

> 中文版：[README.md](./README.md)

**An atlas of AI agents** · plain Markdown · open source

Records the capability boundaries, runtime location and official evidence for
**AI coding agents / agent runtimes / MCP servers**, organized in one fixed coordinate
system, so that choosing becomes a traceable judgement rather than a hunch.

This repository **holds data only, it does not emit conclusion pages**. The conclusion layer
is consumed by one site with three divisions (v4 architecture since 2026-10-04; the former
`ide` / `cli` / `mcp` / `harness` subdomains have been merged):

| Division | Subject | Objects covered |
|---|---|---|
| `agent.specul.com/` | Finished agents (IDE / CLI / vendor-cloud forms) | Cursor · Claude Code · Copilot · Windsurf · Zed · Cline · Aider · Codex · OpenCode · Crush · Gemini CLI · Kiro · Goose · Warp · Jules · Dot · Muse · Grok Bot and 27 profiles |
| `agent.specul.com/harness/` | Agent runtimes / orchestration frameworks / SDKs | Claude Agent SDK · Codex SDK · OpenAI Agents SDK · Pydantic AI · smolagents · CrewAI · Google ADK · LangGraph · LlamaIndex · Microsoft Agent Framework · AG2 · Mastra · Deep Agents · Hermes Agent · OpenHands |
| `agent.specul.com/tools/` | MCP servers / tool ecosystem | filesystem · git · memory · sequential-thinking · fetch · time · playwright · context7 · everything · github-mcp |

**Why "atlas"**: not a pile of tool names, but a map that can place every object.

**Why the harness division is separate**: a finished agent is "a product you use directly",
while a harness is "the base you use to build your own agent". The selection questions are
completely different — the first asks "which one works well", the second asks "where does
state live, how is context compressed, how much permission do I grant".

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

There are 52 profiles here. Most people need three of them. Pick the lane that matches the problem in front of you:

| What you are trying to solve | Where to go |
|---|---|
| "Which finished tool should I use?" | First work out whether it's an IDE, a CLI or a vendor cloud — then look in [`tracks/agents/`](./tracks/agents/) |
| "I want to build my own agent" | Go straight to [`tracks/harness/`](./tracks/harness/): where state lives, how context gets compressed, how far permissions reach |
| "My agent needs to reach the outside world" | [`tracks/tools/`](./tracks/tools/) — the MCP server ecosystem |
| "I want to know how two things actually differ" | Read [`axes/`](./axes/) to see what each of the 8 dimensions asks, then compare side by side |

One trap worth naming up front: a ready-made agent and a harness are not the same
kind of thing. The first question is "which one is nicer to use"; the second is
"where do I keep state, how do I fit the context in, how much permission do I
grant". Mixing the two produces a comparison that means nothing.

Live version: <https://agent.specul.com/>

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
2. Find the entry under that division's `products/`
3. Follow the entry's `sources` back to the official text

### I want to add a tool

1. Read [SCHEMA.md](./SCHEMA.md) for the field format
2. Copy any entry in the same division as a template
3. Fill in the 8 axes according to the criteria in [axes/](./axes/)
4. Open a PR with links to the official sources you read

### I want to correct a piece of data

Open an Issue stating the entry id, the field name, and a link to your evidence.
Corrections without a source are not accepted.

### I want to run a measurement round

Read the division's `tasks/_protocol.md`, follow the protocol, and write results into `runs/`.

---

## Layout

```
ai-agent-guide/
├── METHODOLOGY.md              methodology
├── SCHEMA.md                   data format spec
├── CONTRIBUTING.md             how to contribute
├── SOURCES.md                  source index
├── axes/                       definitions and criteria for the 8 axes
│   ├── model-access.md         models and access conditions
│   ├── runtime.md              where it runs
│   ├── local-files.md          local files
│   ├── background.md           tasks that survive shutdown
│   ├── tools.md                tools and extensions
│   ├── context.md              context and memory
│   ├── permissions.md          permissions and limits
│   └── fit.md                  what tasks it suits
├── tracks/
│   ├── agents/                 finished agents (v4: absorbs the former ide / cli / cloud forms)
│   │   ├── _track.md           division definition and inclusion criteria
│   │   ├── products/           objects
│   │   ├── tasks/              measurement task sets
│   │   └── runs/               measurement records
│   ├── harness/                agent runtimes / orchestration frameworks / SDKs
│   └── tools/                  MCP ecosystem (3 additional axes of its own)
│       ├── _track.md           division definition and inclusion criteria
│       ├── products/           objects
│       └── tasks/              measurement protocol (not yet run)
├── scripts/                    validators (validate / audit / quality)
├── CHANGELOG.md                data-layer changelog
└── raw/                        collected raw material (web snapshots; not committed)
```

### `family` grouping in the harness division

The harness objects are grouped into three sets by **abstraction level** — the most
important distinguishing axis for this division:

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
repository. Third-party trademarks and product names in the data belong to their respective
owners; this repository indexes and compares only.

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
| **agent.specul.com** | Conclusion layer: agents / harnesses / MCP tools, three divisions |
| **learn.specul.com** | Conclusion layer: AI glossary |
| **models.specul.com** | Conclusion layer: quantized model index for local deployment |
| **vg.specul.com** | Conclusion layer: making games with AI |

**Methodology prototype**: this repository's three rules — abandon aggregate scores, make
"unknown" legitimate, attach evidence to every judgement — are borrowed from
[AgentClash](https://aiagentclash.com/), but the coordinate system and division definitions
are independently designed here.

<!-- INDEX:BEGIN generated, do not edit -->

## Content index

### Ready-made agents — 27

Products you install and use

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [Aider](tracks/agents/products/aider-cli.md) | Aider-AI | cli | partial | maintenance |
| [Aider (Watch mode)](tracks/agents/products/aider.md) | Aider-AI | ide | partial | maintenance |
| [Amp](tracks/agents/products/amp.md) | Sourcegraph | cli | partial | active |
| [Claude Code CLI](tracks/agents/products/claude-code-cli.md) | Anthropic | cli | partial | active |
| [Claude Code (IDE extension)](tracks/agents/products/claude-code.md) | Anthropic | ide | partial | active |
| [Cline](tracks/agents/products/cline.md) | Cline Bot | ide | partial | active |
| [Codex CLI](tracks/agents/products/codex-cli.md) | OpenAI | cli | partial | active |
| [Codex (IDE extension)](tracks/agents/products/codex-ide.md) | OpenAI | ide | partial | active |
| [Continue](tracks/agents/products/continue.md) | Continue | ide | partial | archived |
| [Crush](tracks/agents/products/crush.md) | Charm | cli | partial | active |
| [Cursor](tracks/agents/products/cursor.md) | Anysphere | ide | partial | active |
| [Cursor CLI](tracks/agents/products/cursor-cli.md) | Anysphere | cli | partial | active |
| [Droid](tracks/agents/products/factory-droid.md) | Factory AI | cli | partial | active |
| [Gemini CLI](tracks/agents/products/gemini-cli.md) | Google | cli | partial | active |
| [GitHub Copilot](tracks/agents/products/copilot.md) | GitHub / Microsoft | ide | partial | active |
| [GitHub Copilot CLI](tracks/agents/products/copilot-cli.md) | GitHub | cli | partial | active |
| [Goose](tracks/agents/products/goose.md) | Agentic AI Foundation | cli | partial | active |
| [Jules](tracks/agents/products/jules.md) | Google | cloud | partial | active |
| [Junie](tracks/agents/products/junie.md) | JetBrains | ide | partial | active |
| [Kiro](tracks/agents/products/kiro.md) | AWS | ide | partial | active |
| [Meta Muse](tracks/agents/products/meta-muse.md) | Meta | cloud | partial | active |
| [OpenAI Dot](tracks/agents/products/openai-dot.md) | OpenAI | cloud | partial | active |
| [OpenCode](tracks/agents/products/opencode.md) | OpenCode | cli | partial | active |
| [Warp](tracks/agents/products/warp.md) | Warp | cli | partial | active |
| [Windsurf / Devin Desktop](tracks/agents/products/windsurf.md) | Cognition | ide | partial | active |
| [xAI Grok Bot](tracks/agents/products/grok-bot.md) | xAI | cloud | partial | active |
| [Zed](tracks/agents/products/zed.md) | Zed Industries | ide | partial | active |

### Harnesses — 15

Building blocks for your own agent

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [AG2](tracks/harness/products/ag2.md) | ag2ai | harness | partial | active |
| [Claude Agent SDK](tracks/harness/products/claude-agent-sdk.md) | Anthropic | harness | partial | active |
| [Codex SDK](tracks/harness/products/codex-sdk.md) | OpenAI | harness | partial | active |
| [CrewAI](tracks/harness/products/crewai.md) | CrewAI Inc | harness | partial | active |
| [Deep Agents](tracks/harness/products/deepagents.md) | LangChain | harness | partial | active |
| [Google ADK（Agent Development Kit）](tracks/harness/products/google-adk.md) | Google | harness | partial | active |
| [Hermes Agent](tracks/harness/products/hermes-agent.md) | Nous Research | harness | partial | active |
| [LangGraph](tracks/harness/products/langgraph.md) | LangChain Inc | harness | partial | active |
| [LlamaIndex Framework](tracks/harness/products/llamaindex.md) | LlamaIndex（run-llama） | harness | partial | active |
| [Mastra](tracks/harness/products/mastra.md) | Mastra AI | harness | partial | active |
| [Microsoft Agent Framework](tracks/harness/products/microsoft-agent-framework.md) | Microsoft | harness | partial | active |
| [OpenAI Agents SDK](tracks/harness/products/openai-agents-sdk.md) | OpenAI | harness | partial | active |
| [OpenHands Agent Canvas](tracks/harness/products/openhands.md) | OpenHands（All-Hands-AI） | harness | partial | active |
| [Pydantic AI](tracks/harness/products/pydantic-ai.md) | Pydantic | harness | partial | active |
| [smolagents](tracks/harness/products/smolagents.md) | Hugging Face | harness | partial | active |

### Tools — 10

MCP servers and the tool ecosystem

| Name | Vendor | Form | Confidence | Lifecycle |
|---|---|---|---|---|
| [Context7](tracks/tools/products/context7.md) | Upstash | mcp | partial | active |
| [Everything MCP Server](tracks/tools/products/everything.md) | Model Context Protocol | mcp | verified | active |
| [Fetch MCP Server](tracks/tools/products/fetch.md) | Model Context Protocol | mcp | verified | active |
| [Filesystem MCP Server](tracks/tools/products/filesystem.md) | Model Context Protocol | mcp | verified | active |
| [Git MCP Server](tracks/tools/products/git.md) | Model Context Protocol | mcp | verified | active |
| [GitHub MCP Server](tracks/tools/products/github-mcp.md) | GitHub | mcp | partial | active |
| [Knowledge Graph Memory Server](tracks/tools/products/memory.md) | Model Context Protocol | mcp | verified | active |
| [Playwright MCP Server](tracks/tools/products/playwright.md) | Microsoft | mcp | verified | active |
| [Sequential Thinking MCP Server](tracks/tools/products/sequential-thinking.md) | Model Context Protocol | mcp | verified | active |
| [Time MCP Server](tracks/tools/products/time.md) | Model Context Protocol | mcp | verified | active |


<!-- INDEX:END -->

## Measured size (A8)

<!-- STATS:BEGIN generated, do not edit -->
| Item | Measured value |
|---|---|
| Total profiles | 52 |
| By division | agents 27 · harness 15 · tools 10 |
| By form (track) | harness 15 · cli 12 · ide 11 · mcp 10 · cloud 4 |
| Comparison axes | 8 (tools division adds 3 more: transport / auth / scope) |
<!-- STATS:END -->