# framework 大类收录清单（inventory）

> 去向枚举：`已有`（档案在 `tracks/framework/products/`）/ `待建`（P1>P2>P3）/ `只进nav` / `不收`（必须带理由）。
> 收录标准见 [categories.md §7](../categories.md)：你拿来**自己搭 agent 的底座**（SDK/框架/运行时），不是替你干活的成品。
> 候选来源交叉（≥2）：nav 相关条目 + v8 计划候选名单 + 2026-10-21 WebSearch 核验（官方口径优先）。

| 工具 | 厂商 | 官方 URL | 去向 | 档案 id | 理由/备注 |
|---|---|---|---|---|---|
| AG2（AutoGen 社区延续） | AG2 社区 | https://ag2.ai | 已有 | ag2 | ⚠ 与 microsoft/autogen 的关系建档时按官方口径写清 |
| Claude Agent SDK | Anthropic | https://docs.claude.com/en/api/agent-sdk/overview | 已有 | claude-agent-sdk | |
| Codex SDK | OpenAI | https://developers.openai.com/codex/sdk | 已有 | codex-sdk | |
| CrewAI | CrewAI Inc. | https://www.crewai.com | 已有 | crewai | |
| Deep Agents | LangChain 团队 | https://docs.langchain.com/oss/python/deepagents | 已有 | deepagents | |
| Google ADK | Google | https://google.github.io/adk-docs/ | 已有 | google-adk | |
| Hermes Agent | Nous Research | https://hermes-agent.nousresearch.com | 已有 | hermes-agent | |
| LangGraph | LangChain, Inc. | https://www.langchain.com/langgraph | 已有 | langgraph | |
| LlamaIndex | LlamaIndex Inc. | https://www.llamaindex.ai | 已有 | llamaindex | |
| Mastra | Mastra (YC) | https://mastra.ai | 已有 | mastra | |
| Microsoft Agent Framework | Microsoft | https://learn.microsoft.com/en-us/agent-framework/ | 已有 | microsoft-agent-framework | 1.0 GA 2026-04-03（官方 devblogs）；SK+AutoGen 官方指定后继 |
| OpenHands | All Hands AI | https://docs.all-hands.dev | 已有 | openhands | |
| OpenAI Agents SDK | OpenAI | https://openai.github.io/openai-agents-python/ | 已有 | openai-agents-sdk | |
| Pydantic AI | Pydantic | https://ai.pydantic.dev | 已有 | pydantic-ai | |
| smolagents | Hugging Face | https://huggingface.co/docs/smolagents | 已有 | smolagents | |
| LangChain（核心） | LangChain, Inc. | https://www.langchain.com | 已有 | langchain | P1 · 生态主体，档案缺核心框架本体 |
| DSPy | Stanford NLP / Databricks | https://dspy.ai | 已有 | dspy | P2 · 编程语言模型而非手搭 prompt |
| Haystack | deepset | https://haystack.deepset.ai | 已有 | haystack | P2 · RAG 管线出身，现含 agent 层 |
| AgentScope | 阿里巴巴（魔搭） | https://agentscope.io | 已有 | agentscope | P2 · 国产（L5 只转述官方） |
| Strands Agents | AWS | https://strandsagents.com | 已有 | strands-agents | P2 · AWS 开源 agent SDK |
| SWE-agent | Princeton / Stanford | https://swe-agent.com | 已有 | swe-agent | P2 · 研究向 agent harness |
| Open Interpreter | Open Interpreter 社区 | https://openinterpreter.com | 已有 | open-interpreter | C6-6 建档（2026-10-31）：仓 301 迁 openinterpreter/openinterpreter（68,746★ 推送 2026-10-11）、Rust 重写线 rust-v* |
| Letta（原 MemGPT） | Letta, Inc. | https://www.letta.com | 已有 | letta | P3 · 有状态 agent 服务器 |
| ElizaOS | ElizaOS 社区 | https://www.elizaos.ai | 已有 | elizaos | C6-6 建档（2026-10-31）：elizaos.ai 301→elizaresearch.ai（Eliza Research 主体站）、docs.elizaos.ai 在册、elizaOS/eliza MIT 19,739★ 推送 2026-10-30 |
| MetaGPT | DeepWisdom（深度赋智） | https://docs.deepwisdom.ai | 已有 | metagpt | C6-6 建档（2026-10-31）：FoundationAgents org 迁址、71,097★ 但推送停 2026-01-21/release 停 v0.8.2（2025-03）→lifecycle=maintenance（组织侧 OpenManus/CEO-Arena 仍活跃两口径并写） |
| Agno（原 Phidata） | Agno Inc. | https://www.agno.com | 已有 | agno | C6-6 建档（2026-10-31）：42,981★ 推送 2026-10-30、v3.1.12（2026-10-29）、条款挂 os.agno.com/legal/（主站 /terms 404）、主体页脚 Agno Inc. |
| Semantic Kernel | Microsoft | https://learn.microsoft.com/en-us/semantic-kernel/ | 已有 | semantic-kernel | C6-6 建档（2026-10-31）：28,724★ 推送 2026-10-30、python-1.46.0（2026-10-28）/dotnet-1.81.0（2026-10-06）双线仍发版；MAF 指定后继按官方口径写入正文与 pitfalls |
| AutoGen（microsoft/autogen 原版） | Microsoft | https://github.com/microsoft/autogen | 不收 | | 官方 README 明示由 Microsoft Agent Framework 接续（同团队），新投资不再进本仓——读者选型应看 MAF 与 ag2 |
| OpenAI Swarm | OpenAI | https://github.com/openai/swarm | 不收 | | 官方 README 自标 educational/experimental，指明用 Agents SDK 替代 |
| OpenAI Assistants API | OpenAI | https://developers.openai.com/api/docs/deprecations | 不收 | | 官方公告：2026-08-26 已 sunset（Responses/Conversations API 接替）——L6 停运不收 |
| Temporal | Temporal Technologies | https://temporal.io | 只进nav | | 持久执行引擎，不是 agent 框架（可作底座配件进 nav） |
| Amazon Bedrock Agents | AWS | https://aws.amazon.com/bedrock/agents/ | 只进nav | | 托管服务不是「拿来自己搭的底座」SDK；与 Strands 区分 |
| Langfuse | Langfuse (open source) | https://langfuse.com | 只进nav | | 可观测性平台，不是框架 |
| Prompt flow | Microsoft | https://github.com/microsoft/promptflow | 只进nav | | 工作流编排工具，主轴偏 LLMOps |

## 备注

- nav 里 Dify / Coze / AutoGPT / Flowise / Langflow / n8n / Manus / Relevance AI / Superagent / Botpress / SmythOS / 百宝箱 **不归本大类**——低代码搭 agent 应用归 `automation`（T12 清单收编）。
- T23 建档批已落地 7 份（P1 1 + P2 5 + P3 补位 1：Letta）。Strands 仓现名 strands-agents/harness-sdk（旧 sdk-python redirect，2026-10-21 直抓核验）。
- **C6-6（2026-10-31）：P3 最后 5 行全部建档（22→27）——framework 大类 inventory 全部销账**，转入维护常态。
- 「已有」27 行 = `tracks/framework/products/` 现有档案全集（孤儿检查守）。
- completeness 现值 framework 94/120 的 26 缺口全部是「官方未声明/未知」类合法终态（见 2026-10-21 日志），不影响去向判定。
