---
id: truepic
form: cloud
name: Truepic Vision / Lens
nameEn: Truepic Vision / Lens
vendor: Truepic Inc.
homepage: https://www.truepic.com/
license: 商业服务，条款与隐私政策管辖（legal 与 privacy-policy 页 2026-11-06 直抓在册，
  privacy 政策生效日 2026-01-23）；未见面向客户的开源许可面，未见官方声明的免费自助档。
licenseEn: Commercial service under its own terms and privacy policy (legal and privacy-policy pages direct-fetched
  2026-11-06; the privacy policy is effective 2026-01-23). No customer-facing open-source licence is on record,
  and no free self-serve tier is stated.

axes:
  model_access: >-
    不开放选模型：在册的检测面是 Truepic 自己的验真与检查流水线。verification-tests 页在册项目为
    模糊度、时间准确性、位置、屏幕翻拍检测与可选 AI 任务；Lens 侧走 PKI 签名证书与 C2PA
    content credentials 判来源（lens-api 页在册）。验真用的具体模型是否披露、能否替换，官方页未逐条说明，记为未知。
  runtime: >-
    托管云交付：Vision 网页平台（登录入口与 Okta SSO 在文档在册）加 REST API。
    regions 页在册只有 US 与 UK 两个区域，并写明数据存在发起请求的那个区域。未见本机或离线形态的官方声明。
  local_files: >-
    你上传图像/视频与检查单，结果以 JSON 报告返回，检查单可导出 PDF（导出页在文档导航在册）。
    Lens Web SDK 在浏览器侧完成采集。官方页未声明读写你的本地文件系统，也未声明媒体最终落在哪家存储。
  background: >-
    检查按任务态推进：Inspection Statuses、Alerts、Webhooks 等页面在官方文档导航在册，
    说明是「提交后异步出结论 + 回调通知」的形态。任务队列时长与续跑细节本次未逐页核验，记为未知。
  tools: >-
    扩展面是 API 而非插件：OAuth 2.0 鉴权、Lens API 与 Lens Web SDK（各有独立 changelog）、
    webhook 与 webhook actions、网站表单、嵌入原生应用的 webview（以上页面均在文档导航在册）。
    MCP 或其他第三方工具协议未见官方声明，记为未知。
  context: >-
    以单条 inspection 为组织单位：Teams、Custom Fields、Lists、Message Template Sets 在册，
    Risk Network 提供跨客户的历史线索。这不是会话式上下文，跨请求的「记忆」机制官方未说明，记为未知。
  permissions: >-
    官方 getting-started 页在册「Vision 不提供自助注册」，走演示与合同。API 限流在册：每 10 秒最多 20 次请求。
    隐私政策（生效 2026-01-23）在册：采集标识符、内容与设备数据；以匿名化数据训练模型；
    与分包方在全球范围共享；保留期按合同，账号终止后 90 天。合规认证明细未核验到——
    官方 trust 页本次直抓只返回动态脚本壳，无在册内容，记为未知。
  fit: >-
    适合保险理赔、贷款与抵押、设备勘验这类要「拍摄即验真、事后可举证」的流程，以及要把验真结论接进自有系统的 API 用户。
    不适合要 LLM 输入输出过滤的团队（不是它的产品主轴），也不适合要自托管或要免费自助额度的人。

pitfalls:
  - 把 Truepic 当通用内容审核 API：官方在册主轴是拍摄验真与检查流水，不是 prompt 与输出过滤
  - 以为有 C2PA 凭证就等于内容真实：凭证给的是来源与编辑史，不等于内容没有误导
  - 以为能自助开通：官方 getting-started 页在册「不提供 self-serve signup」

tags: [云端, 商业, API, 自动化]
related: [adobe-content-credentials, azure-ai-content-safety, bedrock-guardrails]

sources:
  - label: Truepic · 官网（产品定位为拍摄即验真与检查平台，导航与文档入口在册，2026-11-06 直抓 200）
    url: https://www.truepic.com/
    kind: docs
  - label: Truepic Vision · Getting started（无自助注册；content credentials 表述，2026-11-06 直抓 200）
    url: https://vision.truepic.dev/docs/getting-started.md
    kind: docs
  - label: Truepic Vision · API overview（OAuth 2.0 鉴权与每 10 秒 20 次限流，2026-11-06 直抓 200）
    url: https://vision.truepic.dev/docs/api-overview.md
    kind: docs
  - label: Truepic Vision · Regions（仅 US / UK；数据存在发起请求的区域，2026-11-06 直抓 200）
    url: https://vision.truepic.dev/docs/regions.md
    kind: docs
  - label: Truepic Lens API（PKI 签名证书与 C2PA 凭证校验、JSON 验真报告，2026-11-06 直抓 200）
    url: https://vision.truepic.dev/docs/lens-api.md
    kind: docs
  - label: Truepic Vision · Verification tests（模糊度/时间/位置/屏幕翻拍与可选 AI 任务，2026-11-06 直抓 200）
    url: https://vision.truepic.dev/docs/verification-tests.md
    kind: docs
  - label: Truepic Lens API · Changelog（2024-09-26 C2PA 1.4/2.0 等条目，2026-11-06 直抓 200）
    url: https://vision.truepic.dev/docs/lens-api-changelog.md
    kind: changelog
  - label: Truepic Lens Web SDK · Changelog（最新在册条目 2025-01-22，2026-11-06 直抓 200）
    url: https://vision.truepic.dev/docs/lens-web-sdk-changelog.md
    kind: changelog
  - label: Truepic · Privacy Policy（主体 Truepic Inc.、训练用途、分包方与保留期，2026-11-06 直抓 200）
    url: https://www.truepic.com/privacy-policy
    kind: docs
  - label: Truepic · Pricing（Flex 月付 / Standard 年付结构，无免费自助档；本档不采价格数字，2026-11-06 直抓 200）
    url: https://www.truepic.com/pricing
    kind: pricing
  - label: Truepic · Blog（2026-08 AI Analysis 等产品在册条目，2026-11-06 直抓 200）
    url: https://www.truepic.com/blog
    kind: engineering
  - label: C2PA · 官网（规范主体与指导委员会成员在册含 Truepic，2026-11-06 直抓 200）
    url: https://c2pa.org/
    kind: spec

link:
  url: https://www.truepic.com/contact-us
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: maintenance
confidence: partial

cn:
  origin: foreign
  origin_note: Truepic Inc.（隐私政策当日在册主体）；官方 regions 页只列 US 与 UK。
  origin_note_en: Truepic Inc. (entity on record in the privacy policy same day); the official regions page lists only US and UK.
  direct: unknown
  direct_note: 同日实测 www.truepic.com 与 vision.truepic.dev 返回 200，但这只是站点与文档可达；
    服务侧无自助开通、区域未含大陆，故不判「可用」。verify.truepic.com 本次实测返回 000（无法建连）。
  direct_note_en: Same-day probes returned 200 for www.truepic.com and vision.truepic.dev, but that is site/documentation reachability only;
    there is no self-serve provisioning and no mainland region, so availability is not asserted. verify.truepic.com returned 000.
  filing: unknown
  filing_note: 官方站点与文档均未写中国大陆备案/登记信息；本次未检索监管公示名单，不做推断。
  filing_note_en: Neither the site nor the docs mention mainland filing/registration; the public registry was not searched.
  verified: 2026-11-06
---

## 一句话定位

它验的是「这张照片是不是当场拍的」，不是「这段话能不能发」。

官方文档把主轴写成拍摄即验真：PKI 签名证书加 C2PA content credentials，
再叠一组现场一致性检查（时间、位置、屏幕翻拍、清晰度）。

## 适合与不适合

适合保险理赔、贷款抵押、设备勘验这类要证据链的流程，以及要把验真结论用 API 接进自有系统的团队。
不适合两类人：要找 LLM 输入输出过滤的（那是护栏那条线），要自助注册先试起来的
——官方 getting-started 页明写不提供自助开通，走演示与合同。

## 能力边界

在册能判的：媒体是否为签名设备当场采集、是否翻拍屏幕、时间与位置是否自洽、
元数据是否被改动，以及可选的 AI 分析任务。不在册的：它不判内容是否有害，
也不替你决定要不要采信这张图。C2PA 侧的边界是本站观点：凭证给的是来源与处理史，
不是「真实」的终极判定（详见 [Content Credentials](./adobe-content-credentials.md)）。

## 变更记录说明

公开版本记录只有两条 SDK 线：Lens API changelog 最新在册条目为 2024-09-26
（加 C2PA 1.4 / 2.0、hash box、GPSHPositioningError 与元数据断言），
Lens Web SDK changelog 最新为 2025-01-22。Vision 平台本体无公开 changelog。
官网 blog 与 newsroom 有 2026 年的产品与集成在册条目（如 2026-08 AI Analysis），
但没有可核验的版本号，故 lifecycle 记 maintenance 而非 active。

## 实测记录

本站尚未完成实测。本档不含验真准确率、误判率或延迟数字。

**实测建议**（三条）：

- 同一张翻拍图在不同检查项下的结论是否互相矛盾
- US 与 UK 区域的延迟差异与数据驻留实际效果
- C2PA 凭证缺失与被改坏这两种状态在报告里如何区分

## 未知项清单

- 验真与 AI 分析背后的模型是否披露、能否替换
- 媒体与派生数据的完整存储位置与分包方清单
- 合规认证明细（官方 trust 页本次直抓只返回动态脚本壳，无在册内容）
- 检查任务的队列时长、重试与续跑细节
- API 的具体配额与并发上限（除每 10 秒 20 次在册值外）
- 是否支持中国大陆接入

## 相关条目

- [Content Credentials](./adobe-content-credentials.md) — 同一套凭证标准的验证侧生态；这里是采集与业务流，那里是通用验证器。
- [Azure AI Content Safety](./azure-ai-content-safety.md) — 一条管「内容该不该拦」，一条管「内容能不能举证」。
- [LiteLLM](./litellm.md) — 网关侧留的是调用与预算记录，这里留的是媒体与拍摄现场记录。
