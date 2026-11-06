---
id: adobe-content-credentials
form: web
name: Content Credentials（内容凭证）
nameEn: Content Credentials
vendor: Adobe · Content Authenticity Initiative / C2PA
homepage: https://contentcredentials.org/
license: 规范侧为 C2PA 开放的公开标准（c2pa.org 与 contentcredentials.org 当日在册，站点自述「A standard by C2PA」）；
  参考实现与库在 CAI 开源文档 hub 在册；内容归属、商标与各签发方条款不在本档判定范围内。
licenseEn: On the specification side this is an open published standard of C2PA (on contentcredentials.org and c2pa.org,
  direct-fetched same day; the site self-describes as "A standard by C2PA"); reference implementations and libraries are
  listed on the CAI open-source docs hub. Content ownership, trademarks and per-issuer terms are out of scope here.

axes:
  model_access: >-
    它不接模型也不守模型：manifest 由产出内容的工具写入，声明用了哪个应用、设备或 AI 服务。
    Adobe 的 AEM 文档页在册：资产详情会列出产生该资产的应用、设备与 AI 工具（例如 Adobe Firefly）以及后续改动。
    具体哪些模型被披露取决于各签发方写入什么，本站不推断。
  runtime: >-
    浏览器里的验证器是主入口：contentcredentials.org 的 verify 当日跳转到 verify.contentauthenticity.org
    （直抓在册，但该页正文为脚本壳，未见静态说明文字）。本地侧有 SDK 与 C2PA CLI（CAI 文档 hub 在册）；
    接入方产品（如 AEM Assets）在自家界面内直接显示 manifest。
  local_files: >-
    网页验证器要你上传或拖入文件，本地库与 CLI 在你自己的机器上读写文件并解析 manifest
    （文档 hub 的 Reader / validate 流程在册）。上传到验证器侧的文件如何留存，本次未取到官方声明，记为未知。
  background: >-
    没有后台任务面：验证是按需动作，库与 CLI 是单次调用。官方页面未声明队列、续跑或订阅式的批量核验任务，
    批处理要靠你自己脚本化 CLI。
  tools: >-
    扩展面是规范与实现族：CAI 文档 hub 在册 c2pa-rs / Python / C++ / JS / Node / Mobile 库、C2PA CLI、
    conformance 与 durable credentials 条目。站点叙事在册 500+ 采用方。MCP 或其他插件协议未见官方声明，记为未知。
  context: >-
    没有会话上下文：一次校验读一份文件的凭证链。AEM 文档页在册：凭证随资产被下载、发布或共享而保留，
    面板显示签发者名称与签发日期时间。跨资产的索引或「记忆」不在产品口径里。
  permissions: >-
    校验的信任根是密码学的：文档 hub 在册用公钥验签名、校验被引用的 assertions，
    并依赖 PKI / X.509 链与 C2PA trust list；身份 assertion 与签名校验分开绑定角色。
    合规认证、数据处理方与留存政策本次未取到官方在册声明，记为未知。
  fit: >-
    适合发布方与平台把来源与编辑史做成可验证声明，也适合需要区分「没有凭证」与「凭证被改坏」两种状态的审计流程。
    不适合要拦有害内容的场景（那是内容过滤那条线），也不适合没有任何签发方参与、却想凭空验真的期待。

pitfalls:
  - 以为有 Content Credentials 就等于内容可信：它给的是来源与编辑史，不是真假判定
  - 以为没凭证就是造假或 AI 生成：官方 Inspect 口径要区分「缺失」与「无效」两种状态
  - 把它当审核开关：它不拦内容，只产出可验证声明与校验结论

tags: [云端, 本地, 开源, API]
related: [truepic, azure-ai-content-safety, litellm]

sources:
  - label: Content Credentials · 官网（标准归属、pin 与编辑史叙事、采用方叙事，2026-11-06 直抓 200）
    url: https://contentcredentials.org/
    kind: docs
  - label: Content Credentials · Verify（当日由 contentcredentials.org 跳转至此；正文为脚本壳，2026-11-06 直抓 200）
    url: https://verify.contentauthenticity.org/
    kind: docs
  - label: CAI 开源文档 hub · Getting started（实现族、C2PA CLI、Inspect 区分缺失与无效、PKI/trust list 校验，2026-11-06 直抓 200）
    url: https://opensource.contentauthenticity.org/docs/getting-started
    kind: docs
  - label: Content Authenticity Initiative · 官网（以 C2PA 规范与开源工具为主轴、加入入口与文档路径，2026-11-06 直抓 200）
    url: https://www.contentauthenticity.org/
    kind: docs
  - label: Content Authenticity Initiative · Blog（官方更新流水线；在册条目含设备与 CDN 侧实现，2026-11-06 直抓 200）
    url: https://www.contentauthenticity.org/blog
    kind: changelog
  - label: Adobe Experience League · Content Credentials（AEM Assets 中的 manifest 显示与随下载/发布保留，2026-11-06 直抓 200）
    url: https://experienceleague.adobe.com/en/docs/experience-manager-assets-essentials/help/content-credentials
    kind: docs
  - label: C2PA · 官网（开放标准定位、指导委员会成员含 Adobe 与 Truepic、自述当前规范版本，2026-11-06 直抓 200）
    url: https://c2pa.org/
    kind: docs
  - label: C2PA · Specifications（规范发布落点，当日跳转至 2.5 目录，2026-11-06 直抓 200）
    url: https://spec.c2pa.org/specifications/
    kind: spec

link:
  url: https://contentcredentials.org/
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: unknown
confidence: partial

cn:
  origin: foreign
  origin_note: Adobe 发起的 Content Authenticity Initiative，规范现由 C2PA 承载（两站当日在册表述）。
  origin_note_en: Initiated by Adobe through the Content Authenticity Initiative; the standard is now carried by C2PA
    (wording on record on both sites the same day).
  direct: yes
  direct_note: 同日实测 contentcredentials.org、verify.contentauthenticity.org、opensource.contentauthenticity.org
    与 c2pa.org 均返回 200。这只是网页可达性，不等于任何境内合规结论。
  direct_note_en: Same-day probes returned 200 for contentcredentials.org, verify.contentauthenticity.org,
    opensource.contentauthenticity.org and c2pa.org. That is page reachability only, not a mainland compliance conclusion.
  filing: unknown
  filing_note: 官方站点与文档均未提中国大陆备案/登记；凭证体系本身也不面向公众提供 AI 服务，备案适用性未核验，不做推断。
  filing_note_en: Neither the sites nor the docs mention mainland filing/registration; the credential system is not a public-facing
    AI service, and its filing applicability was not verified — no inference is made.
  verified: 2026-11-06
---

## 一句话定位

它是一份可验证的「这份内容从哪来、被改过什么」的声明。

站点自己的说法是：用加密 manifest 让受众在 AI 生成内容里证明真实性。
关键词是 manifest 与验证，不是拦截。

## 适合与不适合

适合要出证的发布方、要区分凭证缺失与凭证损坏的审核与取证流程，以及把凭证写进自家资产管的团队。
不适合三类期待：拿它当内容过滤器、拿它当「真假判定器」、以及在没有任何签发方写入时指望它凭空验真。
本站也不把它与内容过滤线的产品排在一起——两条线回答的问题不同。

## 能力边界

校验能做的是：验签名、比对内容绑定、检查被引用的 assertions、按 trust list 判断签发者可信度，
并明确区分「缺失」与「无效」。它不能保证内容不误导（本站观点）——
编辑史真实，叙事仍可能骗人；官方页面只把校验范围写成签名、绑定与 assertions。
另有一条常被忽略：身份 assertion 与签名校验是分开绑定的，
所以「谁签的」和「谁声称自己是谁」在结论里是两件事（文档 hub 在册）。

## 变更记录说明

本对象没有独立的产品 changelog。可核验的更新流水有三处：CAI 官方博客（在册条目含相机、
手机与 CDN 侧的实现落地）、C2PA 规范发布页（当日跳转落点为 2.5 目录）、
以及 c2pa.org 自述的当前版本 2.3（发布日 2026-01-08）。
两个版本号在同一天的直抓结果里不一致，本档不据此推断实际最新版本，lifecycle 记 unknown。

## 实测记录

本站尚未完成实测。本档不含凭证覆盖率、验签成功率或检测率数字。

**实测建议**（三条）：

- 同一张图在「无凭证 / 凭证完好 / 凭证被改」三态下验证器的结论差异
- 不同签发方证书在 trust list 里的可信判定差异
- 本地 CLI 与网页验证器对同一文件的结论是否一致

## 未知项清单

- 网页验证器上传文件的留存与使用政策（本次未取到官方声明）
- 合规认证与数据处理者清单（未取到官方在册页面）
- 当前生效的 C2PA 规范版本号（两页在册口径不一致）
- 官方可核验的最近更新节奏（lifecycle 因此记 unknown）
- Adobe 自家产品文档面：helpx.adobe.com 当日直抓返回 403，仅取到 Experience League 页
- 中国大陆接入与备案适用性

## 相关条目

- [Truepic](./truepic.md) — 同一套凭证的两端：这里做通用验证与写入规范，那里做拍摄现场的采集验真与业务流。
- [Azure AI Content Safety](./azure-ai-content-safety.md) — 一条答「这份内容该不该拦」，一条答「这份内容能不能举证」。
- [LiteLLM](./litellm.md) — 网关留调用与预算记录，凭证留内容本体记录，两者互不替代。
