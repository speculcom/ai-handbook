---
id: helicone
form: cloud
name: Helicone
vendor: Helicone
homepage: https://docs.helicone.ai
license: 未在 2026-11-06 直抓核到许可证表述；官方文档与更新记录当日可达，许可类型不据推测填值。
licenseEn: No licence statement verified on 2026-11-06; docs and changelog were reachable, but the type is not assumed.

axes:
  model_access: >-
    官方文档把自己描述为「AI Gateway」，称覆盖 100+ 模型；模型密钥由平台侧托管，用户在账户里充值后调用。
  runtime: >-
    托管网关形态：请求经由平台，官方称调用记录在 Requests 页面「数秒内」出现。是否提供自托管，当日抓取的那页未给说明。
  local_files: >-
    用托管网关意味着请求与响应经过平台；本地文件是否留存、留存多久，当日未核到具体政策。
  background: >-
    网关常驻服务，官方列出 automatic logging、observability 与 fallbacks；后台任务的持久队列能力面未逐条核验。
  tools: >-
    官方描述的是网关与观测能力；作为工具扩展生态的一部分（SDK、代理配置）当日未逐条核验。
  context: >-
    上下文由你接入的模型决定；平台对请求体的记录范围、截断与保留窗口当日未核到。
  permissions: >-
    账户体系内管理密钥与用量（官方写「maintains the keys for you」）；团队分级、审计日志与数据导出权限当日未逐条核验。
  fit: >-
    适合：想用一个入口统一多家模型调用、集中看用量与失败，并接受请求经第三方平台。
    不适合：数据不允许离开自己环境的场景；需要自托管且必须核到官方部署说明的场景。

pitfalls:
  - 把「统一入口」当成「统一能力」——各家模型的参数与行为差异不会因网关消失
  - 只看观测面板方便，没确认请求体里带了什么敏感内容就送出去
  - 把平台侧托管密钥当成自己不需要做密钥轮换与最小权限

tags: [AI 网关, 观测, 日志, 用量, 多家模型]
related: [langwatch, litellm]

sources:
  - label: Helicone · 官方文档（AI Gateway · automatic logging, observability and fallbacks；100+ models）
    url: https://docs.helicone.ai
    kind: docs
  - label: Helicone · 更新记录
    url: https://www.helicone.ai/changelog
    kind: changelog

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: 文档与更新记录均为境外站点，当日直抓可达。
  origin_note_en: Docs and changelog are hosted outside the mainland; both were reachable on the check date.
  direct: yes
  direct_note: docs.helicone.ai 与 www.helicone.ai/changelog 直抓 200（2026-11-06）。
  direct_note_en: docs.helicone.ai and www.helicone.ai/changelog returned 200 direct on 2026-11-06.
  filing: unknown
  filing_note: 备案与境内服务口径当日未核到；页面可达不等于境内可用。
  filing_note_en: Filing and in-country availability not verified on the check date; reachability is not availability.
  verified: 2026-11-06
---

## 一句话定位

**Helicone 是放在你的应用与多家模型之间的网关**：官方描述它覆盖 100+ 模型，内置自动日志、观测与失败回退，密钥由平台侧托管、用量在控制台里看。它解决的是「调用集中管理」，不是「模型质量判断」。

## 适合与不适合

适合：需要一家以上模型接入、想把日志/用量/失败回退收在一处，且接受请求经第三方平台。
不适合：数据不允许离开自己环境的场景；或要求自托管但你还没核到官方部署说明的场景。

## 实测记录

本档未做延迟、可用性或回退生效条件的测试；「100+ 模型」「数秒内出现」等表述是官方页原文，本站不重复其数字作为评价依据，也不据此评价同类产品。

## 未知项清单

- 许可证类型（当日未取到官方表述）
- 是否提供自托管及其功能范围
- 请求/响应日志的留存位置、时长与删除方式
- 数据是否用于任何训练或改进用途
- 团队权限分级、审计日志与导出能力
- 计费口径与限额（价格数字不进档案）

## 相关条目

- [LangWatch](./langwatch.md) — 同属「网关与访问控制」线：本档案只写自己在册的官方口径，对照请看那份。
- [LiteLLM 网关（Proxy / AI Gateway）](./litellm.md) — 同属「网关与访问控制」线：本档案只写自己在册的官方口径，对照请看那份。

## 第一次怎么用

1. 先过一遍你要送出去的数据：客户姓名、订单号、密钥、源码片段。任一项不能离开自己环境，就先别用托管网关。
2. 接入时把「谁在调用哪个模型、失败会怎样」写清楚：网关只保证集中，不保证行为一致；回退条件与超时阈值要显式设定并演练一次。
3. 密钥仍在你的账上：平台代管不等于免轮换，按你的离职与泄露预案设定轮换周期。
4. 上线后核对日志范围：确认记录里没混进不该长期留存的内容，再决定保留多久、怎么导出。
