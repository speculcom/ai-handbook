---
id: invideo
form: web
name: invideo AI
nameEn: invideo AI
vendor: invideo
homepage: https://invideo.io
license: 免费+订阅。按官方隐私/法务页管辖（invideo.io/privacy-policy 与 /legal 直抓核验 2026-10-30；
  /terms-of-service 等常规条款路径 404，条款面走 /legal）；商用权按档位区分，细节未逐条核验。
licenseEn: Free + subscription. Governed by the official privacy/legal pages (invideo.io/privacy-policy
  and /legal, direct-fetched 2026-10-30; the usual /terms-of-service paths return 404 — the terms
  surface lives under /legal); commercial rights vary by plan, details not verified line by line.

axes:
  model_access: >-
    不披露模型选择面——产品是「文字脚本→成片」管线，底层生成模型供应商未逐条核验。
  runtime: >-
    网页云编辑器（invideo.io）；官方 agents.md 叙事：项目活在浏览器里、多人可同时编辑，
    生成与渲染在厂商云端。未见官方离线客户端。
  local_files: >-
    作品存账户侧云端（agents.md 叙事：项目活在浏览器里、完整编辑历史随项目存云端）；
    成片导出归本地。未见官方声明的本机数据面或离线工程文件格式。
  background: >-
    云端渲染/排队（未逐条核验）；项目有时间线分支与完整编辑历史（agents.md 叙事），
    改动可先提议再合入——这是协作机制不是「关机续跑」。
  tools: >-
    **远程 MCP server 是招牌差异**（/mcp/ 页当日在册：agent 按项目 URL 打开项目、导入素材、
    编辑时间线，改动实时落在真实编辑器里人可接手；invideo.io/agents.md 给 agent 连接指引）；
    文字成片、营销视频模板线（首页「agentic video editor for serious creatives」在册）。
  context: >-
    项目=主时间线+分支+完整编辑历史（agents.md 的 GitHub-for-video 叙事）；
    跨会话记忆未核验到官方声明——历史可回看是项目机制，不是模型记忆。
  permissions: >-
    账号+订阅体系（/pricing 200，D9：价格不采）；MCP 连接要求用户经客户端登录授权（agents.md 在册）；
    训练用途开关未逐条核验。
  fit: >-
    适合：营销/口播成片流水线、把剪辑委托给 AI agent（官方 MCP 面）、小团队多人协作剪辑。
    不适合：开放权重、影视级合成、大陆直连（实测 000）。

pitfalls:
  - 「agentic」是产品自称——真实能力面是官方 MCP server（/mcp/ 与 agents.md 在册），剪辑操作质量本站未实测
  - 大陆直连实测 000（2026-10-30 两次复测，代理 200 可达）——不是死站，是可达性
  - 条款双主体（Invideo Inc.·特拉华 + Invideo Innovation Pte. Ltd.·新加坡，隐私页在册）——签约主体按注册入口，未逐条核验

tags: [免费+订阅, MCP支持, agentic剪辑, 营销视频, 文字成片, 需网络环境]
related: [runway, synthesia, figma-mcp]

sources:
  - label: invideo · 官网（「agentic video editor for serious creatives」定位，2026-10-30 直抓在册）
    url: https://invideo.io
    kind: official
  - label: invideo · Privacy Policy（双主体 Invideo Inc. / Invideo Innovation Pte. Ltd. 在册）
    url: https://invideo.io/privacy-policy/
    kind: official
  - label: invideo · MCP server 页（远程 MCP：agent 编辑时间线，2026-10-30 直抓在册）
    url: https://invideo.io/mcp/
    kind: official
  - label: invideo · Blog（官方更新线，changelog）
    url: https://invideo.io/blog/
    kind: changelog

last_verified: 2026-10-30
last_updated: 2026-10-30
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: invideo（隐私页在册双主体：Invideo Inc.（美国特拉华）与 Invideo Innovation Pte. Ltd.（新加坡））。
  origin_note_en: invideo (the privacy page carries two entities: Invideo Inc. (Delaware, US) and Invideo Innovation Pte. Ltd. (Singapore)).
  direct: no
  direct_note: invideo.io 大陆直连实测 000（2026-10-30 两次复测；代理下 200 可达）——直连不可达，需网络环境。
  direct_note_en: invideo.io measured 000 direct from mainland (2026-10-30, two retests; 200 via proxy) — unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-30 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-30); the product does not serve the
    mainland public, so filing does not apply.
  verified: 2026-10-30
---

## 一句话定位

**invideo 把「给 agent 剪视频」做成产品**：官方远程 MCP server 让 AI agent 按项目 URL 打开时间线、
导入素材、动手剪辑，改动实时落在真实编辑器里——人和 agent 编辑同一份工程。

## 适合与不适合

适合：营销/口播成片流水线、把剪辑委托给 agent（官方 MCP 面）、小团队协作。
不适合：开放权重、影视级合成、大陆直连场景（实测 000）。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **MCP 连接后 agent 剪辑操作的实际粒度与出错率（对照 agents.md 声明的工具面）**
- **文字成片管线对中文脚本/素材的实际支持度**
- **「分支+提议合入」协作机制在单人+agent 场景的实用性**

## 未知项清单

- 底层生成模型供应商清单（未核验到官方声明）
- MCP 工具清单的完整粒度（未逐条核验）
- 训练用途开关（未逐条核验）
- 不同注册入口对应的签约主体（双主体在册，未逐条核验）

## 相关条目

- [Runway](./runway.md) — 同为视频编辑：Runway 是生成工具链自己调，invideo 是成片编辑器+agent 委托。
- [Synthesia](./synthesia.md) — 同为营销视频向：Synthesia 数字人培训片，invideo 素材+口播成片。
- [Figma MCP](../mcp/products/figma-mcp.md) — 同「专业工具暴露官方 MCP server」逻辑：Figma MCP 接设计，invideo MCP 接剪辑。
