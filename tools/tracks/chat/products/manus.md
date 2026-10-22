---
id: manus
form: web
name: Manus
nameEn: Manus
vendor: Manus AI（Monica 团队）
homepage: https://manus.im
license: 订阅+积分制。官方 Terms（manus.im/terms 直抓核验 2026-10-22）；
  输出内容归属按该条款管辖，具体条款细节未逐条核验。
licenseEn: Subscription + credit model. Governed by the official Terms (manus.im/terms, direct-fetched 2026-10-22);
  output ownership follows those terms — clause details not verified line by line.

axes:
  model_access: >-
    模型由 Manus 侧编排路由（官方未公开完整模型清单）；用户不直接选模型——
    「用什么模型干活」是产品内部决策，这是它与通用对话产品的关键差异之一。
  runtime: >-
    任务跑在 Manus 的云端沙箱（manus.computer 域名的 sandbox 面直抓所见）：
    agent 在云 VM 里执行代码、浏览网页、产出文件；网页端下达与跟进，本机不装东西。
  local_files: >-
    产物（文件/网页/报告）生成在云端沙箱，可下载导出；上传数据存于账户侧。
    与「本机 agent」完全相反——执行面在厂商云上。
  background: >-
    异步任务是它的本体形态：任务提交后可离开页面，agent 在云端继续跑（官方叙事「把任务交给它」）；
    有宽限期/排队机制的产品化痕迹（积分制与并发限制）。
  tools: >-
    自带浏览器、代码执行、文件操作、部署（manus.space 发布面）等工具面；
    连接外部服务（邮件/日历等）经官方集成线。MCP 支持未逐条核验。
  context: >-
    以任务（session）为单位组织工作；跨任务记忆机制未核验到官方声明。
  permissions: >-
    账号+订阅体系；云端沙箱有联网能力（浏览/下载是产品语义）；
    数据留存与训练口径按官方 Terms/Privacy 管辖，细节未逐条核验。
  fit: >-
    适合：把「整段任务」（研究报告、数据整理、建站发布）异步交给云端 agent、要产物直接发布（manus.space）。
    不适合：要选模型、要本机文件参与执行、要免费大量使用（积分制）。

pitfalls:
  - 把 Manus 当「会聊天的机器人」——官方定位是通用任务 agent（聊天只是入口之一），执行在云端沙箱
  - 与 coding 大类的云异步 agent（Devin/Jules）区分：Manus 主轴是通用任务（报告/建站/数据），不是代码库
  - 云端沙箱有联网出口——上传敏感数据前想清楚它会带着这些数据在云上浏览（官方 Privacy 管辖，未逐条核验）

tags: [订阅+积分, 云端沙箱, 异步任务, 通用agent, 产物发布]
related: [devin, jules, replit-agent]

sources:
  - label: Manus · 官网（产品定位与能力叙事）
    url: https://manus.im
    kind: official
  - label: Manus · Blog（产品更新线，changelog）
    url: https://manus.im/blog
    kind: changelog
  - label: Manus · Terms（官方条款，2026-10-22 直抓核验）
    url: https://manus.im/terms
    kind: official
  - label: Manus · Privacy（官方隐私页）
    url: https://manus.im/privacy
    kind: official

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: domestic
  origin_note: Manus AI（Monica 团队；主体沿革见官方 Terms，本站未逐条核验注册地细节）。
  origin_note_en: Manus AI (Monica team; entity details per official Terms, registration specifics not verified line by line).
  direct: yes
  direct_note: manus.im 大陆直连实测 200（2026-10-22）。
  direct_note_en: manus.im measured 200 direct from mainland (2026-10-22).
  filing: unknown
  filing_name: ''
  filing_note: 未核验到 Manus 在网信办公示名单的条目（2026-10-22 检索）；其面向大陆用户的服务形态与备案状态
    官方未声明——「未核验到」不等于「未备案」。
  filing_note_en: no Manus entry verified in the CAC public registry (searched 2026-10-22); its mainland-facing
    service form and filing status are not declared by the vendor — "not verified" does not mean "not filed".
  verified: 2026-10-22
---

## 一句话定位

**Manus 是「整段任务扔给云端沙箱」的通用任务 agent**：云 VM 里执行代码/浏览/产出/发布（manus.space），
模型由产品侧编排不开放选择；积分制，异步是本体形态。

## 适合与不适合

适合：研究报告、数据整理、建站发布类整段任务异步外包。
不适合：要选模型、要本机文件参与、要免费大量用。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（对话产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **任务失败/中断时的积分扣减规则**（积分制产品，失败计费是用户最关心的）
- **云端沙箱的网络出口范围**（能访问哪些域、能否访问内网型服务）
- **产物在 manus.space 上的保留与访问控制**

## 未知项清单

- 模型编排清单（官方未公开）
- 数据留存与训练口径细节（Terms/Privacy 直抓但条款未逐条核验）
- 跨任务记忆机制（未核验到官方声明）
- 备案状态（未核验到公示条目）

## 相关条目

- [Devin](../../coding/products/devin.md) — 同为云异步 agent：Devin 主轴代码库，Manus 主轴通用任务。
- [Replit Agent](../../coding/products/replit-agent.md) — 同为云端建站发布：Replit 绑 IDE 生态，Manus 是任务外包形态。
