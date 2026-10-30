---
id: trae
form: ide
name: Trae
vendor: 字节跳动
homepage: https://www.trae.ai

axes:
  model_access: >-
    官方文档（docs.trae.ai/ide/models）明示内置多模型并支持 API key 添加自定义模型；
    内置清单随版本变化（本次抓到的清单含 GPT 系/DeepSeek/Gemini 系等条目，未逐条清点为完整列表）。
    国际版（trae.ai）与国内版（trae.cn）模型面不同，以各自官方页为准。
  runtime: >-
    官方口径三客户端：Desktop（独立应用，不依赖 TRAE IDE 运行，支持本地与云任务）、
    Web（云端环境免安装）、Mobile（派发管理任务，设备离线自动切云执行）。
    Desktop 给 Agent 窗口与 IDE 窗口双窗口；IDE 窗口内 IDE 模式与 SOLO 模式切换。
  local_files: >-
    官方安全页明示：代码库文件始终留在本地设备（Privacy mode 语境）；
    沙箱执行把 agent 生成的命令放进受限环境（文件访问控制+高危命令拦截）。云任务线的数据边界未逐条核验。
  background: >-
    后台/异步面是官方叙事的一部分：Desktop 支持长任务交云、Mobile 跨设备监控任务进度、
    离线自动切云执行——任务状态三端同步（官方文档口径）。
  tools: >-
    agent 可搜代码库、多步计划、调工具；自定义 agent 可配 prompt/MCP 服务器/工具集（官方文档明示 MCP 配置面）；
    CUE 补全线（多行编辑/下一编辑预测）独立成页。
  context: >-
    上下文可喂文件/文件夹/代码片段/终端输出/仓库/文档集/网页（官方文档列举）；
    跨会话记忆机制未核验到官方声明。
  permissions: >-
    账号体系（字节侧账号）；Privacy mode 开关（开启后官方声明不用你的聊天/代码/输出做分析、优化、训练）；
    沙箱执行开关。企业/团队管控面未逐条核验。
  fit: >-
    适合：要桌面+Web+移动三端同一任务流、SOLO 模式整段委托、内置多模型免自己配 key 起步。
    不适合：要国内版国际版功能一致的预期（两条线）、要完全离线使用（云任务线是产品语义一部分）。

pitfalls:
  - 国际版 trae.ai 与国内版 trae.cn 是两条线——模型清单与功能面别互相推断
  - 「代码不出本机」是 Privacy mode 语境的官方声明——云任务/Web/Mobile 线的数据边界要单独看（未逐条核验）
  - SOLO 模式是「AI 主导全流程」（官方原文 AI takes the lead）——与 IDE 模式的控制权假设完全不同，按任务复杂度切

tags: [国产, 免费+付费, 桌面, Web, 移动, SOLO, 自定义模型, MCP]
related: [cursor, claude-code-cli, codebuddy, figma-mcp]

sources:
  - label: TRAE 文档 · About TRAE（三客户端/双窗口/双模式/安全页）
    url: https://docs.trae.ai/ide/what-is-trae
    kind: official
  - label: TRAE 文档 · Built-in models & custom models
    url: https://docs.trae.ai/ide/models
    kind: official
  - label: TRAE 文档 · Changelog（changelog）
    url: https://docs.trae.ai/ide/changelog
    kind: changelog
  - label: TRAE 国内版官网
    url: https://www.trae.cn
    kind: official

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 字节跳动（北京字节跳动科技有限公司体系）；国际版与国内版两条线。
  origin_note_en: ByteDance; two lines — international (trae.ai) and domestic (trae.cn).
  direct: yes
  direct_note: trae.ai / www.trae.ai / trae.cn / docs.trae.ai 大陆直连实测 200（2026-10-21）。
  direct_note_en: trae.ai / www.trae.ai / trae.cn / docs.trae.ai measured 200 direct from mainland (2026-10-21).
  filing: unknown
  filing_note: 国内版所用模型的备案信息未核验到官方公示页（docs.trae.cn 为动态加载，本次未能直抓正文）；
    「未核验到」不等于「未备案」。
  filing_note_en: no official filing disclosure page verified for the domestic edition's models
    (docs.trae.cn is dynamically loaded; body not fetched this pass); "not verified" does not mean "not filed".
  verified: 2026-10-21
---

## 一句话定位

**Trae 是字节跳动的三端 AI IDE**（桌面/Web/移动）：Desktop 双窗口（Agent/IDE）+ SOLO 模式整段委托，
内置多模型可加自定义 key，Privacy mode 与沙箱执行是官方显式给的开关。

## 适合与不适合

适合：三端同一任务流、SOLO 整段委托、多模型免配 key 起步。
不适合：假设国内外两版功能一致、要完全离线。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **国内版 trae.cn 的当前模型清单**（docs.trae.cn 动态加载，本次未直抓到）
- **SOLO 模式高危命令在沙箱里的实际拦截行为**
- **Mobile 离线自动切云的任务边界**（哪些任务能切、上下文怎么带）

## 未知项清单

- 国内版模型清单与备案公示位置（docs.trae.cn 动态加载未直抓）
- 云任务/Web 线的存储与处理边界（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）
- 企业/团队管控面（未逐条核验）

## 相关条目

- [CodeBuddy](./codebuddy.md) — 同为国产编码助手三端叙事：腾讯云系走合规+云生态，Trae 走多模型+三端任务流。
- [Qoder CN（原通义灵码）](./qoder-cn.md) — 同为国产出海编码工具：阿里云系国内合规叙事为主，国际线关系官方未对照。
- [Cursor](./cursor.md) — 国际对照：同为独立 AI IDE，Cursor 无官方移动端任务面。
