# automation 大类收录声明

**主题**：AI 自动化与工作流——可视化/低代码搭 AI 工作流与 agent 的平台，自带运行时。
定义与边界裁决见 [../../categories.md](../../categories.md) §7。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **可视化/低代码搭建**是产品主轴（画布、表单、自然语言配置），不是写代码的 SDK |
| 2 | 平台自带运行时（搭出来的东西在它上面跑） |
| 3 | 有官方文档可核验八维 |

**形态归属**（决定 `form:` 取值；⚠ 下表第一列不加反引号——audit.mjs 把「反引号小写词开头的 ≥3 列表格行」当档案声明）：

| 形态 | 判据 |
|:--|:--|
| web | 主入口是网页平台（多数低代码平台） |
| local-app | 主入口是本地安装的应用且核心体验在端上 |

**边界情况**：

| 情况 | 处理 |
|---|---|
| 代码优先的 agent SDK/框架 | 归 `framework`（如 Strands、Agents SDK） |
| 无 LLM 主轴的传统 RPA | 不收（归 nav） |
| 画布产物是媒体（ComfyUI） | 只进 nav——生成管线不是「应用运行时」 |
| 通用成品 agent（Manus） | 归 `chat`（T14 裁决） |
| 托管云上的可视化 agent 平台（Bedrock/Copilot Studio） | 收本类，`form: web` |

## 收录对象（14 份）

| id | 名称 | 厂商 |
|---|---|---|
| `n8n` | n8n | n8n GmbH |
| `dify` | Dify | LangGenius |
| `coze` | 扣子 / Coze | 字节跳动 |
| `zapier` | Zapier | Zapier |
| `copilot-studio` | Microsoft Copilot Studio | Microsoft |
| `make` | Make | Make（原 Integromat） |
| `activepieces` | Activepieces | Activepieces |
| `flowise` | Flowise | FlowiseAI |
| `langflow` | Langflow | DataStax |
| `pipedream` | Pipedream | Pipedream |
| `vertex-agent-builder` | Vertex AI Agent Builder | Google |
| `bedrock-agents` | Bedrock Agents / AgentCore | AWS |
| `agentforce` | Salesforce Agentforce | Salesforce |
| `relevance-ai` | Relevance AI | Relevance AI |

> 候选全集与去向见 `inventory/automation.md`。
