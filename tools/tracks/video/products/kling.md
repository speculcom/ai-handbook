---
id: kling
form: web
name: 可灵 Kling AI
nameEn: Kling AI
vendor: Kling AI Pte. Ltd.（快手）
homepage: https://klingai.com/global/
license: 官方国际版 ToS §4.4：「You own all intellectual property rights and other proprietary interests in and to the Content under applicable law… We do not claim ownership of the Content.」——所有权归用户；但 §4.6：「without our written permission, you may not use, reproduce, distribute… the Output for any commercial purposes」——商用需书面许可。会员的商业许可在《Terms of Paid Service》（3.1.2 会员商用不受限、7.2 水印归属）——该页正文为动态加载、本次直抓未能取得，本站不转述其细节；非会员按 §4.5 须为输出标注 Kling 品牌。
licenseEn: Official international ToS §4.4: 'You own all intellectual property rights and other proprietary interests in and to the Content under applicable law… We do not claim ownership of the Content.' But §4.6: 'without our written permission, you may not use, reproduce, distribute… the Output for any commercial purposes' — commercial use requires written permission. The membership commercial license lives in the Terms of Paid Service (reported as 3.1.2 members' commercial use unrestricted and 7.2 watermark rights) — that page loads its text dynamically and could not be fetched directly on 2026-10-20, so this site does not restate its details. Non-members must label output with Kling branding per §4.5.

axes:
  model_access: >-
    模型家族官方发布线披露：Kling 4.0 于 2026-10-15 正式上线（快手投资者关系新闻稿 2026-10-16
    确认：单次原生生成最长 30 秒、全能参考最多 15 项素材/10 关键帧、最高 10-bit HDR、
    提示词输入 8000 tokens）；Kling 4.0 Flash 面向高频场景先行开放（2026-09 下旬内测口径）。
  runtime: >-
    网页 / App / API 三线；生成在云端处理；另有 Team Space 团队空间。
  local_files: >-
    支持图像/视频/主体/声音多模态参考输入（4.0 全能参考口径见官方新闻稿）；上传内容处理口径见 permissions 维。
  background: >-
    生成为任务制：提交后云端排队产出，产出物进账户素材库；
    没有「关机续跑」形态的官方声明——任务在云端跑，不依赖本机在线。
  tools: >-
    API 线面向企业与开发者（4.0 发布口径称 API 将开放）；平台内 Recreate/下载等社区机制（ToS §4.8）；
    被第三方平台聚合调用（如 Runway MCP 上架 Kling 3.0/O3，见 Runway changelog 2026-09-18）。
  context: >-
    生成为任务制，无跨会话对话记忆形态；创作延续靠素材库与参考输入
    （4.0 全能参考最多 15 项素材是请求内能力，不是会话记忆）。
  permissions: >-
    官方国际版 ToS（2026-04-21 生效）§4.7.3(f)：平台可为「create, test, improve, train」其模型处理内容；
    §4.7.4 退出走邮件 support@kling.ai（撤销面向未来，不溯及已完成的训练）。
    §4.8：发布到社区的内容可被其他用户 Recreate/下载。
  fit: >-
    重图生视频质量与中文生态的人。商用要先过会员线（见许可列），发布到社区等于公开；
    训练退出是邮件申请、且只面向未来。

pitfalls:
  - 把「所有权归用户」读成「可自由商用」——§4.6 商用需书面许可，会员线才放开
  - 把训练退出当成即时生效——邮件申请只面向未来，不溯及已完成的训练
  - 把国际版与国内版条款混用——两套产品条款，本档案主轴是国际版

tags: [云端, 图生视频, 中文生态, 社区Recreate, 商业]

related: [doubao-chat]

sources:
  - label: Kuaishou IR · Kling AI Officially Launches Kling 4.0（官方新闻稿，2026-10-16，确认 10-15 上线与 4.0 能力口径）
    url: https://ir.kuaishou.com/news-releases/news-release-details/kling-ai-officially-launches-next-generation-kling-40-raising/
    kind: changelog
  - label: Kling AI · Terms of Service（国际版官方条款，2026-10-20 直抓 200 核验 §4.4/§4.6/§4.7 全文）
    url: https://app.klingai.com/global/docs/user-policy
    kind: docs
  - label: Kling AI · Terms of Paid Service（条款入口页，正文动态加载、本次未能直抓核验——会员商用细节本站不转述）
    url: https://app.klingai.com/global/docs/paid-service-terms
    kind: docs
  - label: Kling AI · 全球站更新页（产品入口页，2026-10-21 直抓核验 Kling 4.0 展示位）
    url: https://klingai.com/global/updates
    kind: changelog
  - label: Kling AI · Membership（定价页指针，D9：本站不采价格数字）
    url: https://klingai.com/global/membership
    kind: pricing

last_verified: 2026-10-21
last_updated: 2026-10-21
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: 快手（北京）旗下产品。
  origin_note_en: Kuaishou product (Beijing).
  direct: yes
  direct_note: klingai.com 大陆直连实测 200。
  direct_note_en: klingai.com measured 200 direct.
  filing: filed
  filing_note: 2024-11 批次附件第 218 行。
  filing_note_en: Listed in the CAC registry as 可灵 (Beijing-KeLing-202409250032, filed 2024-10-15).
  verified: 2026-10-20
  filing_name: 可灵
  filing_no: Beijing-KeLing-202409250032
  filing_date: 2024-10-15
---

## 一句话定位

国产视频生成的头部：Kling 4.0 单次原生 30 秒、全能参考 15 项素材，已备案、大陆直连可用；
「所有权归用户、但商用要过会员线」是许可条款的关键分层。

## 适合与不适合

适合重图生视频质量、在中文生态里工作的创作者。商用先确认会员线与水印条款；
发布到社区等于公开、可被他人 Recreate。要 API 直连的企业用户走 API 线（4.0 发布口径称将开放）。
训练退出走邮件、只面向未来——在意这一点要先接受。

## 实测记录

本站尚未完成实测。视频生成不适用编码实测协议；能力口径以官方新闻稿与产品页为准。

## 未知项清单

- 《Terms of Paid Service》会员商用条款细节（页面动态加载，2026-10-20 直抓未能取得正文，本站不转述）
- API 线当前开放范围与定价（4.0 新闻稿称将开放，本站未核验落地状态）

## 相关条目

- [Runway](./runway.md) — 对照路线：创作平台形态、训练许可无退出选项
- [Veo（Google）](./veo.md) — 对照路线：模型接口形态、付费不训练
