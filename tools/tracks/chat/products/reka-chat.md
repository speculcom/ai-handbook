---
id: reka-chat
form: web
name: Reka Chat（Reka Playground / Edge Chat）
nameEn: Reka Chat (Reka Playground / Edge Chat)
vendor: Reka AI, Inc.
homepage: https://app.reka.ai
license: 闭源产品（条款主体 Reka AI, Inc.，Terms of Use 2026-09 版当日在册）；Reka Edge 开放权重另线发布于 Hugging Face（RekaAI/reka-edge-2603，权重页许可未逐字核验）。
licenseEn: Closed-source product (contracting party Reka AI, Inc.; Terms of Use September 2026 version verified same day); Reka Edge open weights published separately on Hugging Face (RekaAI/reka-edge-2603; the weights-page license not verified verbatim).

axes:
  model_access: >-
    自家模型+精选开源模型双池：Reka API 当日在册模型表含 reka-edge-2603（16k 上下文、文本/图像/视频输入）、
    reka-flash-3（64k）与 deepseek4-flash/glm5.3/qwen3.8-27b/gemma4-26b 等开源档，全部经 api.reka.ai/v1
    OpenAI 兼容端点调用；对话入口（app.reka.ai「Edge Chat」）与其 API 池的关系未逐条核验。
  runtime: >-
    网页入口 app.reka.ai（chat.reka.ai 307→app.reka.ai/chat，当日核验；页内标题「Reka Playground / Edge Chat」）；
    另有 API（api.reka.ai/v1）与开放权重本机路线（docs「Run locally」：macOS Apple Silicon 32GB+ / Linux 服务化）。
  local_files: >-
    托管对话数据口径按官方隐私页（2026-06 版当日在册）管辖，未逐条核验；开放权重 Reka Edge 下载后
    完全在本机运行（docs run-locally 页在册）——托管入口与本机权重是两条数据边界。
  background: >-
    对话即时返回；异步/代理任务形态未核验到官方声明。公司现行主线是 research/Reka Cloud/视频基础设施/数据基础设施
    （官网首页当日四段自述），对话入口不在首页招牌区。
  tools: >-
    API 侧工具面在册：模型表标注 Tools/Structured outputs/Reasoning 三列（reka-edge-2603 三项全 Yes；
    reka-flash-3 Tools=No）；文档站自带 MCP server（docs.reka.ai/_mcp/server，llms.txt 在册）供 agent 接文档。
  context: >-
    会话按对话组织；跨会话记忆机制未核验到官方声明。API 侧上下文长度随模型不同（当日表：reka-edge-2603 16k、
    reka-flash-3 64k、开源档 262k），对话入口实际生效值未核验。
  permissions: >-
    账号制（app.reka.ai 需登录）；条款主体 Reka AI, Inc.（Terms of Use 2026-09：合同约束 reka.ai 及
    vision/creator/developer 子域与 Reka Labs/Cloud/Vision 服务）；隐私页 2026-06 版含 EEA/UK 专章。
  fit: >-
    适合：跟 Reka 自家模型线（Edge/Flash）+想经一家 API 横排精选开源档（DeepSeek/GLM/Qwen/Gemma）；
    要 Reka Edge 开放权重本机路线。不适合：要成熟 C 端对话产品（入口面薄、公司重心已转向 physical AI）；
    要大陆直连对话服务（未备案）。

pitfalls:
  - 公司定位已整体转向——官网当日招牌是「models and infrastructure for the physical AI era」（omni 模型/Reka Cloud/视频基础设施/egocentric 数据），news 主线是 world model 研究（Rho-1 2026-10-05 等）；对话入口只是角落产品，按「对话产品公司」理解会错位
  - API 池含精选开源模型（deepseek4-flash/glm5.3/qwen3.8-27b/gemma4-26b）——「Reka API」不等于「只用 Reka 模型」，各开源档按其自身权重许可使用
  - Reka Edge 开放权重与闭源旗舰是两线——reka-edge-2603 可在本机跑（docs run-locally），reka-flash-3 仅 API；两线能力与数据边界不同
  - 对话入口功能面薄——app.reka.ai 为 JS 应用（当日仅见「Edge Chat」标题），模型选择/记忆/上传等功能未核验到官方文档；勿按 ChatGPT 类成熟度预期

tags: [多模态, 开源聚合, 开源权重, OpenAI兼容, 闭源, 未备案]
related: [poe, ollama, aider]

sources:
  - label: Reka · 官网首页（2026-10-31 直连 200；「physical AI era」四段自述+Reka Cloud/视频/数据基础设施当日在册）
    url: https://reka.ai
    kind: official
  - label: Reka Chat · 产品入口（chat.reka.ai 307→app.reka.ai/chat 直连 200；页内标题 Reka Playground/Edge Chat）
    url: https://app.reka.ai
    kind: official
  - label: Reka · Terms of Use（2026-10-31 直连 200；Last Updated September 2026；主体 Reka AI, Inc.）
    url: https://reka.ai/legal/terms-of-use
    kind: official
  - label: Reka · Privacy Policy（2026-10-31 直连 200；Effective June 2026；含 EEA/UK 专章）
    url: https://reka.ai/legal/privacy-policy
    kind: official
  - label: Reka API · 文档（2026-10-31 直连 200；api.reka.ai/v1 OpenAI 兼容；模型表/Run locally/MCP server 在册）
    url: https://docs.reka.ai/overview
    kind: docs
  - label: Reka News（变更记录线，2026-10-31 直连 200；Rho-1 2026-10-05/Inverse Dynamics 2026-10-02/EdgeQ 2026-09-22 条目当日在册）
    url: https://reka.ai/news
    kind: changelog

last_verified: 2026-10-31
last_updated: 2026-10-31
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（Reka AI, Inc.，美国；前 DeepMind 团队创立——nav 旧条目口径，官方页未自述创始背景，按 nav 交叉标注）。
  origin_note_en: foreign entity (Reka AI, Inc., USA; founded by an ex-DeepMind team — carried from the older nav entry; the official pages do not state the founding background, noted as nav cross-reference).
  direct: yes
  direct_note: reka.ai 大陆直连 200（2026-10-31 直抓核验，www 308→裸域）；app/docs 子域同直连可达。
  direct_note_en: reka.ai measured 200 direct from mainland (fetched 2026-10-31, www 308 to apex); app/docs subdomains also reachable direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-31 检索公示页与批次清单，未见 Reka 条目）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (disclosure page and batch lists searched 2026-10-31; no Reka entry); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-31
---

## 一句话定位

**Reka Chat 是一家已整体转向 physical AI 的研究室留下的对话入口**（app.reka.ai「Edge Chat」）：
公司当日招牌是 omni 模型、Reka Cloud、视频与数据基础设施；对话产品面薄，真正的可核验面在 API（OpenAI 兼容、自家 Edge/Flash+精选开源档）与 Reka Edge 开放权重本机路线。

## 适合与不适合

适合：跟 Reka 模型线、经一家 API 横排精选开源档、要 Edge 开放权重本机路线。
不适合：要成熟 C 端对话产品、要大陆直连对话服务。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方页没给的东西）：

- **Edge Chat 入口实际挂哪个模型、与 API 模型表是否一致**（入口 JS 应用未核验）
- **托管对话数据的留存与训练口径**（隐私页 2026-06 版逐项看）
- **Reka Edge 权重本机跑的硬件门槛体验**（docs 写 Apple Silicon 32GB+，实操未测）

## 未知项清单

- Edge Chat 入口的模型选择、记忆、文件上传功能（未核验到官方声明）
- 托管版对话数据留存与训练口径（未逐条核验）
- Reka Edge 权重页的具体许可条款（HF 页未逐字核验）
- 对话入口与 API 配额/计费的关系（pricing 页在 docs 在册，入口侧未核验）

## 相关条目

- [Poe](./poe.md) — 同为多模型聚合对话：Poe 以闭源 API 池为招牌，Reka 入口面薄、聚合面主要在 API 侧。
- [Ollama](../../runner/products/ollama.md) — 开放权重本机路线对照：Reka Edge 权重下载后由本机 runner 栈承载，数据不出机器。
- [Aider](../../coding/products/aider.md) — OpenAI 兼容端点消费侧对照：api.reka.ai/v1 可直接挂进支持自定义端点的编码 agent。
