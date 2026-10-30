---
id: elevenlabs
form: web
name: ElevenLabs
nameEn: ElevenLabs
vendor: ElevenLabs
homepage: https://elevenlabs.io/
license: 官方 ToU §1(c)：付费用户可将输出用于商用，免费用户仅限「non-commercial purposes」；§4(c)(ii)：用户保留 Output 的权利与所有权。商用权与档位绑定——换档即换商用许可。
licenseEn: Official ToU §1(c): paid users may use Outputs commercially, while free users are limited to 'non-commercial purposes'. §4(c)(ii): users retain rights and ownership in their Outputs. Commercial rights are tier-bound — changing plans changes the commercial license.

axes:
  model_access: >-
    模型迭代经官方 changelog 披露：Eleven v4 与 Eleven v4 Turbo 发布（2026-09-28 条目）、
    Scribe v2 Medical 正式可用（2026-09-11）、music_v2_5 API 支持（2026-09-14）
    ——2026-10-21 直抓核验；平台内还聚合第三方模型配置（changelog 条目含 gpt/claude 系 LLM 接入）。
  runtime: >-
    网页、API 与移动端；生成在云端处理。API 是配音/语音产品集成的主入口之一。
  local_files: >-
    支持文本、脚本与音频素材输入（转录、克隆训练）；素材处理口径见 permissions 维。
  background: >-
    生成为请求制；Agents/电话线产品有持续会话形态（changelog 通话排队等条目）；
    没有「关机续跑」形态的官方声明。
  tools: >-
    产品面宽：TTS、Voice Design/克隆、Speech to Text（Scribe 系）、Text to Dialogue、
    Conversational AI（电话/Widget）、Workflows/Flows 编排、音频效果（audio_effects 2026-10-12 条目）。
  context: >-
    生成为请求制，无跨会话对话记忆形态；声音资产（Voice Library/个人声音）是持久化形态。
  permissions: >-
    官方 ToU §4(d) 授予平台为运营与改进（含训练）使用内容的许可；§4(i) 提供 Data use 设置菜单
    可退出把内容用于训练——自助退出在同类里少见。声音克隆须本人授权或取得合法授权。
  fit: >-
    做配音、有声内容、语音产品的团队。训练退出是自助菜单（相对少见，值得点名）；
    克隆他人声音前先拿授权——这是人格权红线，不是纯条款问题。

pitfalls:
  - 商用权与档位绑定——免费档输出仅非商用，换档才放开
  - 以为训练退出没有——§4(i) 有自助 Data use 菜单（同类里少见，别按别家经验套）
  - 声音克隆未授权即用——官方要求本人或合法授权，涉及人格权

tags: [云端, TTS, 声音克隆, API, 转写, 商业]

related: [gemini-chat]

sources:
  - label: ElevenLabs · Changelog（官方日志，2026-10-21 直抓核验 Eleven v4/v4 Turbo、Scribe v2 Medical、audio_effects 等条目与日期）
    url: https://elevenlabs.io/changelog
    kind: changelog
  - label: ElevenLabs · Terms of Use（官方条款，2026-10-20 直抓 200 核验 §1(c)/§4(c)(ii)/§4(d)/§4(i)）
    url: https://elevenlabs.io/terms-of-use
    kind: docs
  - label: ElevenLabs · Pricing（定价页指针，D9：本站不采价格数字）
    url: https://elevenlabs.io/pricing
    kind: pricing

last_verified: 2026-10-30
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: yes
  direct_note: 官网直连实测 200。
  direct_note_en: official site measured 200 direct.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

语音合成与配音的产品面最全者：TTS、克隆、转写、对话 AI、工作流编排一条齐；
「训练退出是自助菜单」在同类里少见，商用权与档位绑定。

## 适合与不适合

适合做配音、有声内容、语音产品集成的团队——API 线成熟。在意训练用途可用自助
Data use 菜单退出（同类里少见）；克隆声音前先拿授权。要生成音乐而非语音，对照 Suno。

## 实测记录

本站尚未完成实测。语音生成不适用编码实测协议；能力口径以官方 changelog 为准。

## 未知项清单

- 各档位的模型与配额分流细节（changelog 滚动披露，本站未逐档核验）
- 声音克隆训练素材的留存与删除细节（ToU 未逐条核验到独立章节）

## 相关条目

- [Suno](./suno.md) — 同为音频生成：音乐向对照，训练许可无退出选项
