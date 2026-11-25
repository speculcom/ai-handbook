# automation 大类收录声明

**主题**

AI 自动化与工作流。可视化/低代码搭 AI 工作流与 agent 的平台，自带运行时。
定义与边界裁决见 [../../categories.md](../../categories.md) §8。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **可视化/低代码搭建**是产品主轴（画布、表单、自然语言配置），不是写代码的 SDK |
| 2 | 平台自带运行时（搭出来的东西在它上面跑） |
| 3 | 有官方文档可核验八维 |

**形态归属**

决定 `form:` 取值。⚠ 下表第一列不加反引号。audit.mjs 会把「反引号小写词开头的 ≥3 列表格行」当成档案声明。

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

## 收录对象（24 份）

| id | 名称 | 厂商 | 形态 | 状态 |
|---|---|---|---|---|
| `coze` | 扣子 / Coze | 字节跳动 | 网页服务 | 8 项已核 · 活跃 |
| `activepieces` | Activepieces | Activepieces Inc. | 网页服务 | 8 项已核 · 活跃 |
| `autogpt` | AutoGPT（现 Experts AI 团队平台） | AutoGPT（Determinist Ltd 运营） | 网页服务 | 8 项已核 · 活跃 |
| `bedrock-agents` | Bedrock Agents / AgentCore | AWS | 网页服务 | 8 项已核 · 活跃 |
| `botpress` | Botpress | Botpress | 网页服务 | 8 项已核 · 活跃 |
| `dify` | Dify | LangGenius（国产出海） | 网页服务 | 8 项已核 · 活跃 |
| `fastgpt` | FastGPT | labring（环际云，国产） | 网页服务 | 8 项已核 · 活跃 |
| `flowise` | Flowise | FlowiseAI, Inc. | 网页服务 | 8 项已核 · 活跃 |
| `gumloop` | Gumloop | Gumloop | 网页服务 | 8 项已核 · 活跃 |
| `langflow` | Langflow | DataStax（原 Langflow AI） | 网页服务 | 8 项已核 · 活跃 |
| `lindy` | Lindy | Lindy | 网页服务 | 8 项已核 · 活跃 |
| `make` | Make | Make（原 Integromat） | 网页服务 | 8 项已核 · 活跃 |
| `maxkb` | MaxKB | 飞致云（国产） | 网页服务 | 8 项已核 · 活跃 |
| `copilot-studio` | Microsoft Copilot Studio | Microsoft | 网页服务 | 8 项已核 · 活跃 |
| `power-automate` | Microsoft Power Automate | Microsoft | 网页服务 | 8 项已核 · 活跃 |
| `n8n` | n8n | n8n GmbH | 网页服务 | 8 项已核 · 活跃 |
| `pipedream` | Pipedream（Connect / Workflows） | Pipedream | 网页服务 | 8 项已核 · 活跃 |
| `relevance-ai` | Relevance AI | Relevance AI（悉尼） | 网页服务 | 8 项已核 · 活跃 |
| `agentforce` | Salesforce Agentforce | Salesforce | 网页服务 | 8 项已核 · 活跃 |
| `vertex-agent-builder` | Vertex AI Agent Builder（Gemini Enterprise 平台线） | Google | 网页服务 | 8 项已核 · 活跃 |
| `voiceflow` | Voiceflow | Voiceflow | 网页服务 | 8 项已核 · 活跃 |
| `zapier` | Zapier | Zapier | 网页服务 | 8 项已核 · 活跃 |
| `smythos` | SmythOS | SmythOS | 网页服务 | 有未核项 · 更新放缓 |
| `opal` | Google Opal | Google Labs | 网页服务 | 有未核项 · 已归档 |

> 共 **24** 份。本清单由 `scripts/gen-category-docs.mjs` 从 `products/*.md` 自动生成；改档案后重跑脚本，不要手改表格。

> 状态读法：左边是「这页的证据是否齐」，右边是「上游产品还在不在更新」。停更不等于资料残缺。
