---
id: vidu
form: web
name: Vidu
nameEn: Vidu
vendor: 生数科技（清华系）
homepage: https://www.vidu.cn
license: 免费+订阅。按官方条款页管辖（vidu.com/terms 直抓核验 2026-10-22）；
  商用权按档位区分，细节未逐条核验。
licenseEn: Free + subscription. Governed by the official terms page (vidu.com/terms, direct-fetched 2026-10-22);
  commercial rights vary by plan, details not verified line by line.

axes:
  model_access: >-
    自研 Vidu 视频大模型线（官方 FAQ：北京生数科技联合清华大学发布，主打长时长/高一致性/高动态）；
    用户不选裸模型。开放权重线未核验到官方声明。
  runtime: >-
    网页（vidu.cn 国内入口 / vidu.com 海外入口）+ API（企业侧，官方叙事）；生成在厂商云端。
  local_files: >-
    作品存账户侧云端，生成历史在网页作品页可见；下载归本地。
    未见官方声明的本机数据面。
  background: >-
    生成即时/排队（按档位波动，未逐条核验）；无「关机续跑」任务面（未核验到声明）。
  tools: >-
    文生视频、图生视频、**参考生视频（多主体参考）**是官方点名的差异功能（角色一致性向）；
    首尾帧控制线（官方 FAQ 所见）；2D 动画风格线（官方 FAQ 叙事）。
  context: >-
    以账户作品组织；跨会话记忆未核验到官方声明。多主体参考是它的「一致性」机制——参考图复用不是记忆。
  permissions: >-
    账号+订阅体系（D9：价格不采）；训练用途开关未逐条核验。
    备案：Vidu 备案号 Beijing-Vidu-20241125S0003（网信办 2025-01 批次公示直抓核验，2026-10-22）；
    算法备案「Vidu视频生成算法-1/-2」见深度合成算法备案清单（阿里云百炼公示页交叉）。
  fit: >-
    适合：角色一致性要求高的叙事/动画向生成（多主体参考）、国产直连、动漫风格动态化。
    不适合：要模型自选、要开放权重、写实电影级大场面主打。

pitfalls:
  - 「参考生视频」是它的招牌差异——按普通文生视频工具理解会低估多主体参考的价值
  - vidu.cn（国内）与 vidu.com（海外）是双入口——账号/内容政策是否互通未核验，别按同一体系理解
  - 备案号主语是「Vidu」服务（网信办公示）——算法备案（网信算备…号）与服务备案是两套编号，别混引

tags: [免费+订阅, 国产直连, 多主体参考, 动画向, 清华系]
related: [kling, hailuo-video, flux]

sources:
  - label: Vidu · 官网（产品与能力叙事、官方 FAQ）
    url: https://www.vidu.cn
    kind: official
  - label: Vidu · Terms（官方条款，2026-10-22 直抓核验）
    url: https://www.vidu.com/terms
    kind: official
  - label: Vidu · Blog（官方更新线，changelog）
    url: https://www.vidu.com/blog
    kind: changelog
  - label: 网信办 · 生成式人工智能服务已备案信息（2025-01 批次，备案号出处）
    url: https://www.cac.gov.cn/cms/pub/interact/downloadfile.jsp?filepath=NUtqEIwGiCjGm2Bhl20cvMJN~~~VfG4e3TRGnFD8PfRvz0vHSSJ6sATU6DtmcGo1/SlbWBI5~oROMVCft2OZdVAfqphfFn00jUfFRLdBE5I=&fText=%E7%94%9F%E6%88%90%E5%BC%8F%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E6%9C%8D%E5%8A%A1%E5%B7%B2%E5%A4%87%E6%A1%88%E4%BF%A1%E6%81%AF(2025%E5%B9%B41%E6%9C%88)
    kind: docs

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

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
  verified: 2026-10-22
---

## 一句话定位

**Vidu 是清华系生数科技的视频大模型入口**：招牌是「参考生视频」多主体一致性——
角色一致性要求高的叙事/动画向场景，它是国产阵营里最点这个题的。

## 适合与不适合

适合：多角色叙事一致性、动漫风格动态化、国产直连使用。
不适合：模型自选、开放权重、写实大场面主打。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **多主体参考在 3+ 角色场景的一致性衰减**
- **首尾帧控制的实际插值质量**
- **国内/海外双入口的作品互通性**

## 未知项清单

- 开放权重线（未核验到官方声明）
- API 企业侧的接入面与配额（未逐条核验）
- 训练用途开关（未逐条核验）
- 跨会话记忆机制（未核验到官方声明）

## 相关条目

- [可灵](./kling.md) — 同为国产视频头部：可灵生态面宽，Vidu 差异在多主体参考一致性。
- [海螺视频](./hailuo-video.md) — 同为国产自研视频入口：海螺入口轻，Vidu 功能面（参考/首尾帧）更细。
- [FLUX](../image/products/flux.md) — 上下游衔接：Vidu 图生视频常以 FLUX 系出图作首帧。
