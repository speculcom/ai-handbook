---
id: baidu-comate
form: ide
name: 文心快码（Baidu Comate）
nameEn: Baidu Comate (Wenxin Kuaima)
vendor: 百度
homepage: https://kuaima.baidu.com

axes:
  model_access: >-
    官方「模型」文档页列可选清单：DeepSeek V4 Flash/V4 Pro、GLM-4.7/5-Turbo/5.0/5.1/5.2/5v-Turbo、
    Kimi-K2.5/K2.6、MiniMax M2.5/M3/M2.7——注意主线是第三方国产大模型，不只文心系；
    企业用户可再添加第三方模型提供商 API（官方页点名百度智能云千帆 ModelBuilder 清单）。
    切换走对话框 Auto 按钮或模型选择页（官方两种方法成页）。
  runtime: >-
    形态全家桶（官方文档导航）：Comate AI IDE（独立 IDE）、VS Code / JetBrains 全系 / Visual Studio /
    Xcode 插件、CLI；企业控制台（权限/用量/知识管理/指令管理/开放中心）与 Deepwiki、AgentHub 企业面成页。
    个人版/企业版/私有化部署版三档（官方 FAQ 明示差异：License 管理、数据报表、规模化私有部署）。
  local_files: >-
    插件/IDE/CLI 形态处理本机代码；官方 FAQ 明示 SaaS 推理需把正在编写文件的上文传给模型，
    并承诺「不使用这部分上传的代码做任何积累、分析、加工等后续动作」；
    私有化部署下模型与服务都在客户私域，数据不出域（FAQ 原文口径）。
  background: >-
    Mission Mode（明确目标端到端交付：自主分解目标、持续执行直到完成）与 Spec 模式（规范驱动）官方成页；
    Automation（定时/事件自动化）扩展能力成页；Comate NEXT 计划（云端工作台、智能体自主协作）
    见官方文档页口径。
  tools: >-
    扩展能力官方全成页：Subagent（内置 Explore 子代理，各自独立上下文窗口）、Skills（开放标准能力包）、
    Rules（自定义指令：代码规范/框架偏好/项目约定）、MCP、Command、Memory；
    「@」快捷键加 File/Folder/Terminal/Doc/Rules 上下文、「/」快捷键加 Skills/Commands/Subagents。
  context: >-
    Memory 官方成页（跨会话记忆）；代码索引官方成页（仓库级索引）；
    企业面知识管理（私域知识注入）。内置 Explore 子代理做代码库探索。
  permissions: >-
    账号走百度智能云体系；企业控制台权限管理/三级角色（企业管理员/部门管理员/普通成员口径见企业文档）；
    Agent 执行的文件/终端操作审批细节未逐条核验。
  fit: >-
    适合：国内合规与私有化叙事（金融/医疗等客群官方点名）、IDE 全家桶（含 Xcode/Visual Studio 这类
    同行少覆盖的 IDE）、国产模型清单可切、企业控制台+AgentHub 资产中台。
    不适合：要海外前沿模型清单（官方模型页主线是国产模型）、要 BYOK 接任意自有 Key
    （企业面走千帆/第三方提供商，个人 BYOK 未核验到）。
  name_history: >-
    品牌史：Comate（2023-06 百度智能云开放邀测）→ Comate X（2023-08 商用版）→
    中文名「文心快码」（2024-06 文心大模型大会品牌焕新）；官网 kuaima.baidu.com 与
    comate.baidu.com 并行可用，文档在 cloud.baidu.com/doc/COMATE——检索时 Comate/文心快码都要认。

pitfalls:
  - 中文名「文心快码」与英文名 Baidu Comate 是同一产品（2024-06 官方品牌焕新）——
    官网已主用 kuaima.baidu.com，旧链接 comate.baidu.com 仍可用
  - 2026-09-07 媒体报道（界面新闻经财联社转述）称文心快码并入通用智能体平台「百度搭子（DuMate）」——
    **官方公告本站未检索到**，官网与文档仍独立活跃在售；两口径分开记录，别当停运处理
  - 官方模型页当前清单以第三方国产模型为主（DeepSeek/GLM/Kimi/MiniMax）——
    「Comate=只用文心大模型」的旧印象已过时，企业面还可加千帆等第三方提供商
  - SaaS 面代码上文会传服务侧推理（官方 FAQ 明示），承诺不积累不加工；
    数据敏感场景官方给的路径是私有化部署版——别按「插件=全本地」推断

tags: [国产, 免费+付费, IDE, 插件, CLI, 国产模型, MCP, 私有化, 企业控制台]
related: [codebuddy, qoder-cn, trae, context7]

sources:
  - label: 百度智能云文档 · COMATE 概述（Tab/Agent/Mode 四模式/Skills/Rules/Subagents/快捷键）
    url: https://cloud.baidu.com/doc/COMATE/s/qm7yrpa11
    kind: official
  - label: 百度智能云文档 · COMATE 模型（可选模型清单与切换方法）
    url: https://cloud.baidu.com/doc/COMATE/s/emsseobso
    kind: official
  - label: 百度智能云文档 · COMATE 常见问题（三档差异/IDE 清单/代码数据口径）
    url: https://cloud.baidu.com/doc/COMATE/s/Dlnvqzquu
    kind: official
  - label: 百度智能云文档 · CLI 快速入门（CLI 形态在位）
    url: https://cloud.baidu.com/doc/COMATE/s/0mrcv8nsa
    kind: official
  - label: 百度智能云文档 · Comate AI IDE 更新日志（changelog）
    url: https://cloud.baidu.com/doc/COMATE/s/2mjzerjsp
    kind: changelog
  - label: 文心快码官网（产品入口/最新动态）
    url: https://kuaima.baidu.com
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 百度（百度智能云体系）——官方文档在 cloud.baidu.com，账号走百度智能云。
  origin_note_en: Baidu (Baidu Intelligent Cloud); docs live on cloud.baidu.com with a Baidu Cloud account.
  direct: yes
  direct_note: kuaima.baidu.com / comate.baidu.com / cloud.baidu.com 大陆直连实测 200（2026-10-22）。
  direct_note_en: kuaima.baidu.com / comate.baidu.com / cloud.baidu.com measured 200 direct from mainland (2026-10-22).
  filing: unknown
  filing_note: 官方文档未公示所用模型的备案号；当前模型页清单（DeepSeek/GLM/Kimi/MiniMax）各模型
    备案状态未逐条核验（这些模型本身多在网信办公示名单，但 Comate 侧引用口径未核验）；「未核验到」不等于「未备案」。
  filing_note_en: the official docs do not publish filing numbers for the models used; the current model
    list (DeepSeek/GLM/Kimi/MiniMax) was not verified one by one (those models themselves mostly appear in
    the CAC registry, but Comate's referencing path was not verified); "not verified" does not mean "not filed".
  verified: 2026-10-22
---

## 一句话定位

**文心快码（Baidu Comate）是百度的 AI 编码全家桶**：Comate AI IDE + VS Code/JetBrains/Visual Studio/Xcode
插件 + CLI，官方模型页以国产模型为主（DeepSeek/GLM/Kimi/MiniMax 可切、企业可加千帆），
Skills/Rules/Subagents/MCP/Memory/Automation 扩展面全成页，个人/企业/私有化三档——
私有化「数据不出域」是它的官方合规主打。

## 适合与不适合

适合：国内合规与私有化叙事（金融/医疗客群官方点名）、IDE 覆盖广（含 Xcode/Visual Studio）、企业控制台与 AgentHub 资产中台。
不适合：要海外前沿模型清单、要个人 BYOK 接任意自有 Key（未核验到）。

## 实测记录

本站尚未完成实测。测试协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **「并入百度搭子」报道后的产品独立性**（官网/文档/计费是否仍独立走 Comate 体系）
- **SaaS 面代码上文传输的实际边界**（FAQ 只讲补全上文，Agent 多文件读取传什么未写）
- **私有化部署版的模型切换自由度**（官方称支持文心/开源/企业微调模型，未实测）

## 未知项清单

- 并入百度搭子（DuMate）的官方口径（只有媒体报道，未见官方公告；官网仍活跃）
- 所用各模型的备案号公示（官方文档未公示）
- 个人 BYOK 是否支持（企业面走千帆/第三方提供商，个人面未核验到）
- Agent 执行的文件/终端审批模型细节（未逐条核验）

## 相关条目

- [CodeBuddy](./codebuddy.md) — 同为国产大厂编码全家桶：腾讯系混元备案号官方文档可查；文心快码所用模型备案号官方未公示。
- [Qoder CN（原通义灵码）](./qoder-cn.md) — 同为国产大厂编码线：阿里系走「一方产品+全家桶 Credits」；文心快码走「私有化数据不出域」叙事。
- [Trae](./trae.md) — 同为国产编码工具：Trae 出海双线活跃；文心快码主线在国内企业面（私有化）。
