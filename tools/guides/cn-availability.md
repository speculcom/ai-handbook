---
id: cn-availability
topic: guardrails
title: 国内可用性怎么读：直连、主体与备案的口径
titleEn: How to read mainland availability: direct reach, operator and filing
summary: 用 tools 档案里的 cn 三个字段回答「国内能不能连、谁在运营、有没有备案」；给出 225 份档案的统计口径、限制与自查方法，不做实时可用性承诺。
summaryEn: Three cn fields in the tool dossiers answer whether a product connects from the mainland, who operates it and whether it is filed; this page gives the counting rules, limits and a self-check method for 225 dossiers, with no real-time guarantee.
sources:
  - label: 国家网信办 · 生成式人工智能服务备案信息（批次公告与附件）
    url: https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm
    kind: docs
  - label: 本站 · tools 档案索引（225 份档案的 cn 字段来源）
    url: https://tools.specul.com/tools/index.html
    kind: docs
  - label: 本站 · 怎么查生成式 AI 合规义务（条文口径）
    url: https://learn.specul.com/guide/怎么查生成式 AI 合规义务/
    kind: docs
  - label: 本站 · 分类页「国内直连」筛选（字段的查询入口）
    url: https://tools.specul.com/tools/index.html
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [先说这不是什么|What this page is not]

这页解释字段怎么读，不是可用性数据库。

- 不承诺「现在能连」：直连结果是某个日期、某条网络路径的一次实测，网络和产品都会变。
- 不替你判断合规：备案字段只记录官方公示里有没有这个名字，不构成法律意见。
- 不排名：字段是事实记录，不是推荐顺序。

## [三个字段|Three fields]

每份 tools 档案末尾都有一段 `cn:`，对外只暴露三个判断：

| 字段 | 取值 | 回答的问题 | 怎么用 |
|---|---|---|---|
| `origin` | `domestic` / `foreign` | 运营主体在境内还是境外 | 决定数据驻留、合同主体与备案义务的第一层 |
| `direct` | `yes` / `no` / `unknown` | 从大陆网络能否直连官网 | 决定要不要额外网络方案；`unknown` 就是没测到 |
| `filing` | `filed` / `not-filed` / `unknown` | 官方备案公示里有没有记录 | 只对面向境内公众提供服务的产品有意义 |

字段旁边通常还有 `direct_note`、`filing_note`、`verified`，记录实测日期、被测域名与公示批次。读结论前先读备注。

## [225 份档案的实际分布|Distribution across 225 dossiers]

按档案写入的 `cn` 字段统计（各档案核验日期落在 2026-10-20 至 2026-11-03，本次汇总 2026-11-03）：

| 维度 | 分布 |
|---|---|
| 主体 | 境内 37 / 境外 188 |
| 直连 | 可以 169 / 不可以 46 / 未测到 10 |
| 备案 | 已备案 20 / 未备案 190 / 未知 15 |

三个数字要分开读：**境外 188 家里大多数 `filing: not-filed`，原因是它们不面向境内公众提供服务，备案义务不适用**——不是「违规运营」。

## [直连实测的口径|How direct was measured]

`direct` 不是 ping，也不是「我朋友说能打开」。档案里的口径是：

1. 选产品主域名与关键页（官网、条款、定价、文档）。
2. 从固定的境内网络发起请求，记录状态码与时间。
3. 200 记 `yes`；超时、DNS 失败、连接重置记 `no`；只有探测环境限制（如反爬 403）记 `unknown`。
4. 记录日期。同一产品换网络、换省份可能不同。

所以 `direct: yes` 的准确读法是「在该次实测的网络路径上可达」，不是「全国所有网络都可达」。

## [备案字段怎么读|Reading the filing field]

- `filed`：官方公示里有主体与产品名，档案记录批次、备案号与日期。
- `not-filed`：查过公示名单，没有记录。对面向境内公众的生成式 AI 服务，这通常意味着还没走备案；对不面向境内公众的境外产品，这一项不适用。
- `unknown`：没查到或公示口径对不上，不做推断。

备案是服务合规的一部分，不等于技术可用，也不等于数据安全评估已完成。具体义务按《生成式人工智能服务管理暂行办法》与标识办法核对，拿不准问法务。

## [怎么自查一个产品|Self-check in four steps]

1. 打开该产品的 tools 档案，读 `cn` 三个字段与 `verified` 日期。
2. 看日期：超过 90 天就当作过期线索，不要当现状。
3. 自己复测一次主域名：记录日期、网络、状态码；与档案不一致时以你的实测为准，并记下差异。
4. 涉及上线：把「主体 / 直连 / 备案」三行写进选型表，再单独列数据驻留与合同主体。

## [常见误读|Common misreads]

- 把 `not-filed` 当违规：多数境外产品不面向境内公众，备案义务不适用。
- 把 `direct: yes` 当 SLA：那是一次实测，不是服务承诺。
- 把 `origin: domestic` 当数据一定境内：主体在境内不等于所有数据都留在境内，仍要看隐私政策与部署方式。
- 把 `unknown` 当 `no`：没测到与不可达是两件事。
- 拿旧日期当今天：字段带核验日，过期就要复测。

## [核验事实|Dated facts]

1. 225 份档案均带 `cn` 块；本轮统计为境内 37 / 境外 188（2026-11-03 汇总）。
2. 直连实测分布为可以 169 / 不可以 46 / 未测到 10（同上）。
3. 备案分布为已备案 20 / 未备案 190 / 未知 15（同上）。
4. 备案公示入口为国家网信办公告页（2024-04-02 批次页面，2026-11-03 复核可访问）。
