---
id: gamma
form: web
name: Gamma
nameEn: Gamma
vendor: Gamma
homepage: https://gamma.app/
license: 官方产品页与条款页为准；本条目只记录能力与边界，不复制价格数字或完整合同。
licenseEn: See the official product and terms pages; this entry records capabilities and boundaries only, not price figures or the full contract.

axes:
  model_access: >-
    由第三方生成式模型驱动，官方未在产品页公开完整模型清单。生成质量与可用功能随套餐变化。
  runtime: >-
    运行在 Gamma 云端，网页端为主。生成、渲染和导出都在服务端完成。
  local_files: >-
    可上传文档、图片和品牌素材作为生成输入。本地文件需先上传，不能直接读取本机目录。
  background: >-
    演示/文档生成在会话内完成，可继续编辑和重新生成。没有关机后持续运行的代理。
  tools: >-
    支持从提示词生成演示、文档和网页。导出 PPT / PDF / 图片，并提供品牌模板与协作编辑。
  context: >-
    上下文以当前项目、上传素材和品牌设置为主。跨项目记忆与团队知识库能力有限。
  permissions: >-
    生成内容的商用与再分发取决于套餐和官方条款。上传素材的版权与肖像权由用户自行确认。
  fit: >-
    适合快速把大纲变成可讲的演示或一页式文档。不适合需要精确财务模型、复杂图表联动或正式排版控制的场景。
pitfalls:
  - 把自动排版当品牌规范——导出前仍要检查字体、留白和图表标签。
  - 以为生成内容可以直接商用——素材版权与套餐条款要分开核对。
  - 把长文档直接粘进去期待完整保留结构——先分段、再校对层次。

tags: [演示, 文档, 网页, 设计]
related: [beautiful-ai, canva-magic-studio, chatgpt]

sources:
  - label: Gamma · 官方产品页
    url: https://gamma.app/
    kind: official
  - label: Gamma · 官方更新 / 发布记录
    url: https://gamma.app/changelog
    kind: changelog
  - label: Gamma · 官方帮助 / 文档
    url: https://help.gamma.app/
    kind: docs

last_verified: 2026-11-19
last_updated: 2026-11-19
lifecycle: active
confidence: verified
cn:
  origin: foreign
  origin_note: Gamma（美国）。
  origin_note_en: Gamma (US).
  direct: unknown
  direct_note: 本次大陆直连以当地网络与官方入口为准；是否直连以当地网络与官方入口为准。
  direct_note_en: No mainland-China network probe was run; direct reachability depends on the local network and the official entry point.
  filing: unknown
  filing_note: 本次备案状态按最近公示名单快照，不据此判断备案义务。
  filing_note_en: No filing registry search was run; this does not determine filing obligations.
  verified: 2026-11-19
---

## 一句话定位

Gamma 是把大纲快速变成演示或一页式文档的生成工具。

## 适合与不适合

适合：快速把大纲变成可讲的演示或一页式文档。

不适合：需要精确财务模型、复杂图表联动或正式排版控制的场景。

## 实测记录

**依据：** 2026-11-19 只核对官方产品页、帮助入口与条款入口，记录能力边界、数据路径和已知限制；没有登录账号、没有跑完整任务，也没有复核对价格数字与全部企业合同。页面中的功能名称以官方当前入口为准。

## 未知项清单

- 具体模型、档位差异、额度和地区可用范围
- 企业版的数据驻留、保留周期与管理员开关细节
- 生成质量、长文档处理和并发限制（本档不做运行验证）
- 具体价格与合同条款（按 D9 口径不落价格数字）

## 相关条目

- [beautiful-ai](../office/products/beautiful-ai.md) — 相邻场景，按任务与权限边界对照。
- [canva-magic-studio](../office/products/canva-magic-studio.md) — 相邻场景，按任务与权限边界对照。
- [chatgpt](../chat/products/chatgpt.md) — 相邻场景，按任务与权限边界对照。
