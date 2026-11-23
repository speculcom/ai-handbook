---
id: vidu
form: web
name: Vidu
nameEn: Vidu
vendor: 生数科技（清华系）
homepage: https://www.vidu.cn
license: 免费+订阅+API。按官方条款页管辖（vidu.com/terms，2026-10-22 取得）；商用权按档位区分，API 企业侧按合同（2026-11-21）。
licenseEn: Free, subscription and API tiers. Governed by the official terms page (vidu.com/terms, fetched 2026-10-22); commercial rights vary by plan, with enterprise API usage under contract (2026-11-21).

axes:
  model_access: >-
    自研 Vidu Q 系列视频模型。官方 API 文档列出 viduq3-pro、viduq3-turbo、viduq2-pro、viduq2-turbo、viduq1、vidu2.0 等型号，按型号提供不同时长、分辨率与音频能力。

    另有 S 系列实时交互数字人，含 S2-Avatar 与 S2-Editing。用户选的是模型档，不是裸权重（2026-11-21）。
  runtime: >-
    **官方入口：** 网页端分 vidu.cn 国内站与 vidu.com 海外站，另开放平台 API（`https://api.vidu.com/ent/v2/text2video` 等）。

    生成在厂商云端完成。客户端提交任务后轮询或收回调（2026-11-21）。
  local_files: >-
    不碰本机。输入图片走 URL 或 Base64。成片由任务查询返回下载地址，落到本地由用户自行保存。作品历史在账户侧，未见本机模型面（2026-11-21）。
  background: >-
    异步任务制。创建任务返回 `task_id` 与 state（created/queueing/processing/success/failed），可轮询，也可设 `callback_url` 收回调，失败重试三次。

    `off_peak` 错峰任务 48 小时内生成。未完成自动取消并退积分，支持取消（2026-11-21）。
  tools: >-
    覆盖文生视频、图生视频、首尾帧生视频与多主体参考生视频。首尾帧接口为 `/ent/v2/start-end2video`，参考接口为 `/ent/v2/reference2video`，含智能主体库 subjects。

    官方 API 给 1–16 秒时长，540p/720p/1080p，16:9/9:16/3:4/4:3/1:1 画幅与 seed 控制（2026-11-21）。
  context: >-
    Q 系列按任务组织。每次生成独立，靠参考图或主体库复用角色，不是会话记忆。S 系列实时数字人官方明确带 short-term memory，用于连续互动。两者记忆面分开（2026-11-21）。
  permissions: >-
    账号加订阅或积分，API 走 Key（`Authorization: Token ...`）。生成内容商用按档位与条款，API 企业侧按合同。

    大陆入口需实名与内容合规，备案号 Beijing-Vidu-20241125S0003 在案（2026-11-21）。
  fit: >-
    适合角色一致性要求高的叙事与动画，尤其是多主体参考。也适合首尾帧过渡、国产直连、要 API 批量出片。不适合模型自选或开放权重。不适合写实电影级大场面主打。也不适合离线部署（2026-11-21）。

pitfalls:
  - 「参考生视频」是它的招牌差异——按普通文生视频工具理解会低估多主体参考的价值
  - vidu.cn（国内）与 vidu.com（海外）是双入口——账号/内容政策是否互通未核验，别按同一体系理解
  - 备案号主语是「Vidu」服务（网信办公示）——算法备案（网信算备…号）与服务备案是两套编号，别混引

tags: [免费+订阅, 国产直连, 多主体参考, 动画向, 清华系]
related: [kling, hailuo-video, flux]

sources:
  - label: Vidu · 官网（产品与能力叙事、官方 FAQ，2026-11-21 抓取 200）
    url: https://www.vidu.cn
    kind: official
  - label: Vidu · Terms（官方条款，2026-10-22 直抓核验）
    url: https://www.vidu.com/terms
    kind: official
  - label: Vidu · Blog（官方更新线，changelog，2026-11-21 抓取 200）
    url: https://platform.vidu.com/news/joint
    kind: changelog
  - label: 网信办 · 生成式人工智能服务已备案信息（2025-01 批次，备案号出处，2026-10-22 直抓）
    url: https://www.cac.gov.cn/cms/pub/interact/downloadfile.jsp?filepath=NUtqEIwGiCjGm2Bhl20cvMJN~~~VfG4e3TRGnFD8PfRvz0vHSSJ6sATU6DtmcGo1/SlbWBI5~oROMVCft2OZdVAfqphfFn00jUfFRLdBE5I=&fText=%E7%94%9F%E6%88%90%E5%BC%8F%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E6%9C%8D%E5%8A%A1%E5%B7%B2%E5%A4%87%E6%A1%88%E4%BF%A1%E6%81%AF(2025%E5%B9%B41%E6%9C%88)
    kind: docs
  - label: Vidu API · Platform Introduction（Q 系列与 S 系列能力面，2026-11-21 抓取 200）
    url: https://platform.vidu.com/docs
    kind: docs
  - label: Vidu API · Text to Video（task_id、状态机、回调与 off_peak，2026-11-21 抓取 200）
    url: https://platform.vidu.com/docs/text-to-video
    kind: docs
  - label: Vidu API · Start-End to Video（首尾帧任务与图片约束，2026-11-21 抓取 200）
    url: https://platform.vidu.com/docs/start-end-to-video
    kind: docs

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified

cn:
  origin: domestic
  origin_note: 北京生数科技有限公司（中国，清华系团队）。
  origin_note_en: Beijing Shengshu Technology Co., Ltd. (China, Tsinghua-linked team).
  direct: yes
  direct_note: vidu.cn / vidu.studio 大陆直连实测 200（2026-10-22）。
  direct_note_en: vidu.cn / vidu.studio measured 200 direct from mainland (2026-10-22).
  filing: filed
  filing_no: Beijing-Vidu-20241125S0003
  filing_note: 网信办 2025-01 批次公示直抓核验（2026-10-22）；另有算法备案「Vidu视频生成算法-1/-2」
    （阿里云百炼公示页交叉核验）。
  filing_note_en: verified against the CAC January 2025 published batch (direct fetch, 2026-10-22); the
    algorithm filings "Vidu video generation algorithm -1/-2" are cross-verified via Alibaba Cloud Bailian's
    disclosure page.
  verified: 2026-11-21
---

## 一句话定位

**Vidu 是清华系生数科技的视频大模型入口**：招牌是「参考生视频」多主体一致性——
角色一致性要求高的叙事/动画向场景，这是它公开说明的产品方向。

## 适合与不适合

适合：多角色叙事一致性、动漫风格动态化、国产直连使用。
不适合：模型自选、开放权重、写实大场面主打。

## 实测记录

本档核对官方产品文档与 API 参考的模型、任务与参数面。多主体一致性与首尾帧插值质量需按账号实测。

## 未知项清单

- 开放权重线：官方 API 文档以闭源 API 供给为主，权重状态按官方仓库核对。
- API 配额与并发：按开放平台控制台的套餐页核对。
- 训练用途开关：按官方条款与隐私页核对。
- 国内/海外双入口的账号与内容政策：分别按各自站点条款核对。

## 相关条目

- [可灵](./kling.md) — 同为国产视频头部：可灵生态面宽，Vidu 差异在多主体参考一致性。
- [海螺视频](./hailuo-video.md) — 同为国产自研视频入口：海螺入口轻，Vidu 功能面（参考/首尾帧）更细。
- [FLUX](../image/products/flux.md) — 上下游衔接：Vidu 图生视频常以 FLUX 系出图作首帧。


