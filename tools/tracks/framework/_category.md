# framework 大类收录声明

**主题**：Agent 框架与运行时——给**程序**用的 agent SDK / 编排框架，你在代码里搭 agent。
定义与边界裁决见 [../../categories.md](../../categories.md) §8。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **面向开发者**，通过代码使用（SDK / 库 / 框架） |
| 2 | **核心能力是 agent 编排**（循环、工具调用、状态、多 agent） |
| 3 | **有官方文档或仓库**可核验八维 |

**形态归属**：本大类对象几乎全部 `form: harness`（库/框架形态）。

**family 分组**（决定首页矩阵怎么分组；⚠ 下表第一列不加反引号——audit.mjs 把「反引号小写词开头的 ≥3 列表格行」当档案声明）：

| family | 含义 |
|:--|:--|
| coding-base | 编程底座（原语层，拿来造编码 agent） |
| general-harness | 通用 harness（开箱倾向，自带循环与工具面） |
| orchestration | 编排框架（图 / 多 agent / 状态管理为主轴） |

**边界情况**：

| 情况 | 处理 |
|---|---|
| 可视化编排平台（画布搭应用） | 归 `automation`（判据：不写代码的界面是不是主轴） |
| 纯 LLM 调用库（只做 API 封装，无 agent 循环） | 不收（不满足标准 2），归 nav |
| 模型训练 / 微调框架 | 不收（训练不是 agent 编排），归 nav |
| 成品编码 agent 的官方 SDK | 收本类（如 claude-agent-sdk），`related` 指向其成品档案 |

## 收录对象（15 份）

| id | 名称 | 厂商 |
|---|---|---|
| `ag2` | AG2 | ag2ai |
| `claude-agent-sdk` | Claude Agent SDK | Anthropic |
| `codex-sdk` | Codex SDK | OpenAI |
| `crewai` | CrewAI | CrewAI Inc |
| `deepagents` | Deep Agents | LangChain |
| `google-adk` | Google ADK（Agent Development Kit） | Google |
| `hermes-agent` | Hermes Agent | Nous Research |
| `langgraph` | LangGraph | LangChain Inc |
| `llamaindex` | LlamaIndex Framework | LlamaIndex（run-llama） |
| `mastra` | Mastra | Mastra AI |
| `microsoft-agent-framework` | Microsoft Agent Framework | Microsoft |
| `openai-agents-sdk` | OpenAI Agents SDK | OpenAI |
| `openhands` | OpenHands Agent Canvas | OpenHands（All-Hands-AI） |
| `pydantic-ai` | Pydantic AI | Pydantic |
| `smolagents` | smolagents | Hugging Face |

> 候选全集与去向见 `inventory/framework.md`（T9 盘点后建立）。
