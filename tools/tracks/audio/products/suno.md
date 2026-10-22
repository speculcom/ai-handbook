---
id: suno
form: web
name: Suno
nameEn: Suno
vendor: Suno Inc.
homepage: https://suno.com/
license: 官方 ToS：Pro/Premier 付费档——「Suno hereby assigns to you all of its right, title and interest in and to any Output owned by Suno」；免费/Basic 档——输出仅限「lawful, personal and non-commercial purposes」。商用许可绑定「Permitted Commercial Use」：只有经付费档下载配额下载的 Output 可商用；Remix（他人二创）无论档位一律非商用。
licenseEn: Official ToS: on Pro/Premier paid tiers, 'Suno hereby assigns to you all of its right, title and interest in and to any Output owned by Suno'; on the free/Basic tier, Outputs may only be used for 'lawful, personal and non-commercial purposes'. Commercial rights tie to 'Permitted Commercial Use' — only Outputs downloaded through your paid tier's download allocation may be commercially exploited. Remixes are non-commercial regardless of tier.

axes:
  model_access: >-
    模型迭代经官方博客披露：「Introducing v6」条目（2026-09-09，Mikey Shulman 署名，
    2026-10-21 经代理直抓核验标题与日期）；定价页快照的模型标注（v4.5-all/v5）与博客 v6 条目
    存在滞后差——当前默认模型以登录应用内为准，本站不裁决。
  runtime: >-
    网页与移动端应用为主入口；生成在 Suno 云端处理，本机不跑模型。
    Suno Studio 是浏览器内的生成式工作站（多轨时间线、stem 导出），仍属云端形态——
    界面在浏览器里，算力在云端。
  local_files: >-
    支持上传音频作参考/续写（付费档上传时长更高，见定价页指针）；上传素材的权属见 permissions 维。
  background: >-
    生成为任务制：提交提示词/素材后排队产出，产出物进账户库。
    没有「关机续跑」形态的官方声明——任务在云端跑，不依赖本机在线。
  tools: >-
    Suno Studio（网页版生成式音频工作站：多轨、stem 导出）与编辑工具线（博客 Studio 2.0、
    Speech (beta) 2026-10-01 等条目）；Persona/Inspo 等风格控制。
  context: >-
    生成为任务制，无跨会话对话记忆形态；风格延续通过 Persona 等机制。
  permissions: >-
    官方 ToS：用户保留 Submissions 所有权（「you retain all right, title, and interest in and to your
    Submissions」），但授予 Suno 全球免许可金（含创建衍生作品）；条款明确该许可覆盖
    「train, develop, fine-tune or otherwise improve」其模型，未见训练退出开关。禁止用输出训练其他模型。
  fit: >-
    做 AI 音乐、在意「上传素材归我」的人。商用要走付费下载通道（见许可列），Remix 一律非商用；
    在意「素材绝不进训练」——条款没有退出选项，要先接受。

pitfalls:
  - 把「付费即商用」读准——商用绑定「经付费下载配额下载」这一动作，且 Remix 一律非商用
  - 以为上传素材会被拿走——Submissions 所有权保留，但平台取得含训练在内的宽许可
  - 用输出训练其他模型——条款明确禁止

tags: [云端, 音乐生成, 工作站, 付费商用, 商业]

related: [runway]

sources:
  - label: Suno · Blog（官方博客，2026-10-21 经代理直抓核验 v6/Studio 2.0/Speech beta/Believe-TuneCore 合作条目与日期）
    url: https://suno.com/blog
    kind: changelog
  - label: Suno · Terms of Service（官方条款，2026-10-20 直抓 200 核验 Pro/Premier 转让、免费档非商用、Permitted Commercial Use、Remix 条款）
    url: https://suno.com/terms
    kind: docs
  - label: Suno · Pricing（定价页指针，D9：本站不采价格数字）
    url: https://suno.com/pricing
    kind: pricing

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: no
  direct_note: suno.com 大陆直连稳定超时（2026-10-20 同日两次 000）。
  direct_note_en: suno.com times out consistently from mainland (000 twice).
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

AI 音乐生成的头部：歌曲、人声、Voice Model 与 Suno Studio 工作站；
「商用绑定付费下载配额、Remix 一律非商用」是许可条款里最具体的分层。

## 适合与不适合

适合做 AI 音乐、在意上传素材所有权的创作者。商用走付费下载通道；
在意训练用途——条款授予含训练的宽许可且无退出开关，要先接受。
要语音合成/配音而非音乐，对照 ElevenLabs。

## 实测记录

本站尚未完成实测。音乐生成不适用编码实测协议；能力口径以官方博客为准。

## 未知项清单

- 当前默认模型版本（博客 v6 条目与定价页快照标注存在滞后差，本站不裁决）
- 与唱片公司授权合作（WMG/BMG/Believe 条目）对生成内容权属的具体影响（条款层未逐条核验）

## 相关条目

- [ElevenLabs](./elevenlabs.md) — 同为音频生成：语音合成向对照，训练退出是自助菜单
