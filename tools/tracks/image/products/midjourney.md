---
id: midjourney
form: web
name: Midjourney
nameEn: Midjourney
vendor: Midjourney, Inc.
homepage: https://www.midjourney.com/
license: 官方 ToS §4「Content Rights」：付费用户拥有 Assets——「You own all Assets You create with the Services to the fullest extent possible under applicable law」，且所有权「persists even if in subsequent months You downgrade or cancel Your membership」；例外：年营收超 100 万美元的公司（或其员工）须订阅 Pro/Mega 档才拥有 Assets；他人图像 upscale 后仍归原作者。非付费用户不拥有 Assets，仅获 CC BY-NC 4.0（非商用）许可。用户另授予 Midjourney 对输入与 Assets 的永久免许可金。
licenseEn: Official ToS §4 'Content Rights': paid users own their Assets — 'You own all Assets You create with the Services to the fullest extent possible under applicable law', and ownership 'persists even if in subsequent months You downgrade or cancel Your membership'. Exceptions: companies (or employees) with over $1,000,000 USD annual revenue must hold Pro/Mega to own Assets; upscaling another user's image leaves it with the original creator. Non-paid members receive a CC Noncommercial 4.0 license instead of ownership. Users grant Midjourney a perpetual royalty-free license over Content and Assets.

axes:
  model_access: >-
    模型迭代经官方更新页（updates.midjourney.com）与 Alpha changelog 披露（2026-10-08
    「Testing Thinking Mode」、9-24「Edit updates, thumbnail previews」等条目，2026-10-21 直抓核验）；
    生成时可选版本，默认版本以官方文档为准。
  runtime: >-
    网页应用与 Discord Bot 两条使用线；生成在 Midjourney 云端处理，本机不跑模型。
  local_files: >-
    支持图像上传作参考与编辑输入；产出默认在社区公开可浏览、可被他人 Remix（官方帮助页口径），
    仅 Pro/Mega 档 Stealth 模式承诺尽力不公开。
  background: >-
    生成为任务制（提交-排队-产出）；没有「关机续跑」形态的官方声明。
  tools: >-
    网页编辑器持续迭代（edit updates、缩略图预览等 changelog 条目）；Discord Bot 线可群内生成；
    Remix 机制是产品内置的二次创作路径。
  context: >-
    生成为任务制，无跨会话记忆形态；个人化偏好通过参数与 Remix 体现。
  permissions: >-
    官方隐私政策 §1 明确适用于「通过训练 Midjourney 机器学习算法的过程收集的数据」；
    官方 AB2013 训练数据披露称训练集含「第三方与 Midjourney 用户提供的数据」；
    默认公开可浏览、可被 Remix，Stealth 模式（Pro/Mega）是尽力不公开选项；
    官方文档未见面向用户的训练退出开关。
  fit: >-
    重图像风格质量、能接受「默认公开」社区形态的人。要作品不公开或商用归属清晰，
    先看订阅档与 Stealth 条款再开工；大体量公司注意营收门槛条款。

pitfalls:
  - 把「付费拥有 Assets」当成无门槛——年营收超 100 万美元的公司须 Pro/Mega 档才拥有
  - 把 Stealth 当成训练退出——它只管公开与否，官方文档没有训练 opt-out 开关
  - 以为取消订阅后失去产出所有权——官方明写所有权在降级/取消后延续

tags: [云端, 社区公开, Discord, 商业]

related: [chatgpt]

sources:
  - label: Midjourney · Updates（官方更新日志，2026-10-21 直抓核验 Thinking Mode 测试与 9-10 月 changelog 条目）
    url: https://updates.midjourney.com/
    kind: changelog
  - label: Midjourney · Terms of Service（官方 ToS，2026-10-20 经搜索快照取到 §4 全文；直连 403 为反爬拦截）
    url: https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service
    kind: docs
  - label: Midjourney · AB2013 Training Data Documentation（官方训练数据披露，含用户数据入训练集）
    url: https://docs.midjourney.com/hc/en-us/articles/42829949256205-AB2013-Documentation
    kind: docs
  - label: Midjourney · Subscription Plans（定价页指针，D9：本站不采价格数字）
    url: https://docs.midjourney.com/hc/en-us/articles/27174136160653-Subscription-Plans
    kind: pricing

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: unknown
  direct_note: midjourney.com 对 curl 直连与代理都返回 403（反爬拦截），本方法无法判定可达性。
  direct_note_en: midjourney.com returns 403 to curl both direct and proxied (anti-bot) — reachability cannot be judged by this method.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

图像生成风格质量的行业标杆：网页 + Discord 双线，社区默认公开可 Remix；
「付费拥有 Assets、但大营收公司要高档位」是最容易被忽略的一条许可门槛。

## 适合与不适合

适合重图像风格质量、接受「默认公开」社区形态的创作者。要作品不公开就查 Stealth 条款
（Pro/Mega 专属、尽力性质）；要商用归属清晰先读 ToS §4 与订阅档；公司用户注意营收例外。
在意「素材绝不进训练」——官方文档没有训练退出开关，这一点要先接受。

## 实测记录

本站尚未完成实测。图像生成不适用编码实测协议；能力口径以官方 changelog 与文档为准。

## 未知项清单

- 当前默认模型版本与全部可选版本清单（changelog 按条目披露，本站未逐版核验）
- 个人化（personalization）功能的完整边界（以官方文档为准）

## 相关条目

- [Stability AI（Stable Image 平台）](./stability-ai.md) — 对照路线：平台 + 可自托管开源权重
- [FLUX（Black Forest Labs）](./flux.md) — 对照路线：API 平台 + 开源权重家族
