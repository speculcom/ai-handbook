# automation 大类收录清单（inventory）

> 去向枚举：`已有` / `待建`（P1>P2>P3）/ `只进nav` / `不收`（必须带理由）。
> 收录标准见 [categories.md §7](../categories.md)：可视化/低代码搭 AI 工作流与 agent；平台自带运行时；官方文档可核验。**代码优先的 SDK 归 framework；无 LLM 主轴的传统 RPA 归 nav。**
> 候选来源交叉（≥2）：nav（cat=coding 里的 Dify/Coze/Manus/Relevance/Superagent/Botpress/SmythOS/百宝箱 + cat=tools/app 相关）+ v8 计划候选名单 + 2026-10-21 官方核验补漏。
> 本类现有档案 15 份（T20 建档批 2026-10-21 落地 14 + C6-2 建档批 1）。

| 工具 | 厂商 | 官方 URL | 去向 | 档案 id | 理由/备注 |
|---|---|---|---|---|---|
| n8n | n8n GmbH | https://n8n.io | 已有 | n8n | P1 · 低代码工作流，AI 节点为主轴 |
| Dify | Dify（LangGenius） | https://dify.ai | 已有 | dify | P1 · 国产出海（L5 只转述官方） |
| Coze / 扣子 | 字节跳动 | https://www.coze.com | 已有 | coze | P1 · 国内版 coze.cn 同产品两入口，一档案写清 |
| Zapier（AI 功能/Canvas） | Zapier | https://zapier.com | 已有 | zapier | P1 · 传统自动化转 AI 主轴 |
| Make | Make（原 Integromat） | https://www.make.com | 已有 | make | P2 |
| Activepieces | Activepieces | https://www.activepieces.com | 已有 | activepieces | P2 · 开源低代码 |
| Flowise | FlowiseAI | https://flowiseai.com | 已有 | flowise | P2 · 画布搭 LLM 应用 |
| Langflow | DataStax | https://www.langflow.org | 已有 | langflow | P2 · 画布，DataStax 收购后按官方口径 |
| Pipedream（Connect/Workflows） | Pipedream | https://pipedream.com | 已有 | pipedream | P2 · 开发者向但界面主轴是搭流程 |
| Microsoft Copilot Studio | Microsoft | https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio | 已有 | copilot-studio | P1 · 企业低代码 agent 平台 |
| OpenAI AgentKit（Agent Builder/ChatKit） | OpenAI | https://openai.com/index/introducing-agentkit/ | 不收 | | **官方公告页 2026-06-03 更新：Agent Builder 与 Evals 正在收尾、2026-11-30 起不再提供**（官方推荐迁 Agents SDK / Workspace Agents）；ChatKit 仍可用但属嵌入式 UI SDK（开发者件）——已宣布停运的产品不建档（L6），官方公告直抓核验 2026-10-21 |
| Google Vertex AI Agent Builder | Google | https://cloud.google.com/products/agent-builder | 已有 | vertex-agent-builder | P2 · 界面+代码混合，建档按官方定位 |
| Bedrock 可视化 agent（Flows/AgentCore） | AWS | https://aws.amazon.com/bedrock/agents/ | 已有 | bedrock-agents | P2 · 托管 agent 平台（与 framework 的 Strands 区分）· 旧 URL bedrock/agent/ 已 404（2026-10-21 直抓核验），现行入口 bedrock/agents/ 与 bedrock/agentcore/ |
| Salesforce Agentforce | Salesforce | https://www.salesforce.com/agentforce/ | 已有 | agentforce | P2 |
| Relevance AI | Relevance AI | https://relevanceai.com | 已有 | relevance-ai | P2 · 无代码 agent 团队 |
| Botpress | Botpress | https://botpress.com | 已有 | botpress | C6-2 落地 · 直连 200 · 客服向 agent 平台（主仓 MIT=集成/工具面≠产品开源；v12 on-prem AGPL-3.0） |
| Voiceflow | Voiceflow | https://www.voiceflow.com | 待建 | voiceflow | P3 · 对话/语音 agent 画布 |
| Lindy | Lindy.ai | https://www.lindy.ai | 待建 | lindy | P3 |
| Gumloop | Gumloop | https://www.gumloop.com | 待建 | gumloop | P3 |
| Relay.app | Relay | https://relay.app | 待建 | relay-app | P3 |
| Wordware | Wordware | https://wordware.ai | 待建 | wordware | P3 · 自然语言编程界面 |
| FastGPT | FastGPT（labring） | https://fastgpt.io | 待建 | fastgpt | P3 · 国产开源 RAG 应用构建（L5） |
| MaxKB | 1Panel/飞致云 | https://maxkb.cn | 待建 | maxkb | P3 · 国产（L5） |
| AutoGPT（现低代码平台） | Significant-Gravitas | https://agpt.co | 待建 | autogpt | P3 · 官方已从自主 agent 实验转低代码平台，建档按现状定归属 |
| SmythOS | SmythOS | https://smythos.com | 待建 | smythos | P3 |
| Superagent | Superagent | https://superagent.sh | 只进nav | | 产品定位多次转向，官方文档不足以稳定核验八维 |
| Manus | Butterfly Effect（ Monica） | https://manus.im | 只进nav | | 通用自主 agent **成品**，不是「搭工作流的界面」——去向 T14 chat 清单再裁决 |
| ComfyUI | Comfy Org | https://www.comfy.org | 只进nav | | 节点画布但产物是**媒体**不是应用——生成管线主轴，归 nav |
| Windmill | Windmill Labs | https://www.windmill.dev | 只进nav | | 脚本编排平台，LLM 只是场景之一 |
| Composio | Composio | https://composio.dev | 只进nav | | 工具集成层（与 MCP 生态重叠），不是搭应用的运行时 |
| UiPath | UiPath | https://www.uipath.com | 不收 | | 经典 RPA 主轴无 LLM（categories.md 不收示例点名）；AI 功能是附加不是运行时主轴 |
| 实在智能 / 来也 RPA 类 | 各家 | https://www.laiye.com | 不收 | | 同上：RPA 主轴，LLM 非运行时核心 |

## 备注

- T20 建档批已落地 14 份（P1 6 + P2 8）；P3 层（Voiceflow/Lindy/Gumloop/Relay/Wordware/FastGPT/MaxKB/AutoGPT/SmythOS）留后续批次。
- Coze 国内版 coze.cn、Dify 国产背景等按 **L5**：事实只转述官方，不评价监管。
- nav 里 cat=coding 的 Dify/Coze/扣子/Manus/Relevance AI/Superagent/Botpress/SmythOS/百宝箱 与 cat=tools 的 n8n 相关条目，去向以本清单为准（nav 分类≠本站大类）。百宝箱（agents.baidu.com）并入「待建」前先核官方活跃度——若入口收敛则只进nav。
