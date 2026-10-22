---
id: ideogram
form: web
name: Ideogram
nameEn: Ideogram
vendor: Ideogram
homepage: https://ideogram.ai
license: 产品免费+订阅。开源侧特殊：Ideogram 4.0 开放量化权重（HF 直抓 401=仓存在需授权；GitHub ideogram-oss 组织直抓 200），
  按 Ideogram Non-Commercial Model Agreement 免费非商用；商用自托管需 Self-Serve 商业许可（官方 licensing 页直抓核验）。
  官方 FAQ 口径：Ideogram 不主张输出所有权，输出可商用（禁用于训练竞品模型）。
licenseEn: Product free + subscription. Open side is special: Ideogram 4.0 ships quantized weights
  (HF direct 401 = repo exists behind gating; GitHub ideogram-oss org direct 200) free for non-commercial use
  under the Ideogram Non-Commercial Model Agreement; commercial self-hosting needs the Self-Serve commercial
  license (official licensing page, direct-fetched). Per the official FAQ, Ideogram does not claim output
  ownership; outputs are commercially usable (except to train competing models).

axes:
  model_access: >-
    自家模型族：4.0 开放权重（量化版在 HF，推理代码 Apache-2.0 在 GitHub ideogram-oss），4.5 闭源托管
    （官方文档只给 api.ideogram.ai 托管调用线）；平台 catalog 还聚合第三方图像/视频模型（官方叙事，未逐条清点）。
    主打差异是排版文字渲染（「crystal-clear type」官方口径）。
  runtime: >-
    网页（ideogram.ai）+ API（developer.ideogram.ai 直抓 200）+ 官方 MCP server（官方文档明示
    「Connect Ideogram to Claude, Cursor, and other MCP clients」）；4.0 权重可自托管。
  local_files: >-
    托管线作品存账户侧；4.0 自托管线全在你侧——两条线数据边界不同（官方 licensing 页把「数据留在你的栈里」
    列为许可卖点）。
  background: >-
    托管生成即时/排队；无「关机续跑」任务面（未核验到声明）。自托管线后台行为由你的部署决定。
  tools: >-
    产品内含生成、编辑（4.5 precise edit：未改动像素逐字复制是官方卖点）、背景移除/物体移除等专用 app、
    风格控制；API 统一端点切模型；MCP server 官方提供。
  context: >-
    以项目/作品组织；跨会话记忆未核验到官方声明。多轮编辑的「漂移控制」是 4.5 的官方叙事。
  permissions: >-
    账号+订阅体系；开放权重线按非商用协议/商业许可两档（D9：价格不采，档位存在是事实）；
    输出商用限制=不训练竞品（官方 FAQ 直抓口径）。
  fit: >-
    适合：图内排版文字要求高（海报/品牌物料）、要开放权重非商用研究+商业自托管路径、要官方 MCP 接入 agent 流。
    不适合：要免费商用自托管（商业自托管需付费许可）、要 4.5 权重（闭源）。

pitfalls:
  - 开放权重只覆盖 4.0——4.5 是闭源托管（官方文档无下载路径）；「Ideogram 开源」的说法主语必须落到 4.0
  - 开放权重≠免费商用——非商用协议免费，商用自托管要 Self-Serve/Enterprise 许可（官方 licensing 页三档）
  - 平台 catalog 聚合第三方模型——「用 Ideogram」可能是用别家的模型，看请求里的 model 字符串

tags: [免费+订阅, 排版文字强, 开放权重4.0, 商业自托管许可, MCP官方]
related: [flux, stability-ai, midjourney, chatgpt]

sources:
  - label: Ideogram · Licensing（开放权重三档许可结构，2026-10-22 直抓核验）
    url: https://ideogram.ai/licensing/
    kind: official
  - label: Ideogram · 官方文档（产品/API/MCP 叙事）
    url: https://docs.ideogram.ai
    kind: official
  - label: ideogram-oss · GitHub 组织（4.0 推理代码 Apache-2.0）
    url: https://github.com/ideogram-oss
    kind: repo
  - label: ideogram-oss/ideogram4 · Releases（changelog）
    url: https://github.com/ideogram-oss/ideogram4/releases
    kind: changelog

last_verified: 2026-10-22
last_updated: 2026-10-22
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Ideogram（加拿大多伦多/美国旧金山双线叙事）。
  origin_note_en: Ideogram (Toronto / San Francisco dual-line narrative).
  direct: no
  direct_note: ideogram.ai 大陆直连实测 000（2026-10-22，代理下 403=CF 拦截可达）——直连不可达，需网络环境。
  direct_note_en: ideogram.ai measured 000 direct from mainland (2026-10-22; 403 via proxy = CF challenge, reachable) —
    unreachable without a network path.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-22 检索）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (searched 2026-10-22); the product does not serve the mainland
    public, so filing does not apply.
  verified: 2026-10-22
---

## 一句话定位

**Ideogram 是「图内排版文字」最强的图像模型族**：4.0 开放量化权重（非商用免费/商用自托管需许可），
4.5 闭源托管主打 precise edit；官方 MCP server 可直接接进 agent 工作流。

## 适合与不适合

适合：海报/品牌物料的图内文字、开放权重研究+商业自托管路径、MCP 接入。
不适合：要免费商用自托管、要 4.5 权重（闭源）。

## 实测记录

本站尚未完成实测。编码向实测协议见 [protocols/coding/_protocol.md](../../../protocols/coding/_protocol.md)（创作产品不适用编码任务集）。

**实测建议**（三条，都指向官方可读页没给的东西）：

- **4.0 量化权重在消费级显卡的实际可用档**（归 models/runner 侧）
- **4.5 precise edit 的「未改动像素逐字复制」实测验证**（官方强口径）
- **平台 catalog 当前第三方模型清单**（官方叙事未逐条清点）

## 未知项清单

- 平台 catalog 第三方模型完整清单（未逐条清点）
- 4.0 各量化档（fp8/nf4）的具体差异（HF 仓 401 需授权，未逐仓核验）
- 跨会话记忆机制（未核验到官方声明）
- 托管线训练用途开关（未逐条核验）

## 相关条目

- [FLUX](./flux.md) — 同为开放权重图生成族：FLUX 有全精度开放线，Ideogram 只放量化版。
- [Stability AI](./stability-ai.md) — 同为「产品+开放权重」双轨：SD 系权重更宽（商用门槛低）。
- [ChatGPT](../../chat/products/chatgpt.md) — 同为文字渲染图像线：GPT Image 在对话里出图，Ideogram 是专职排版向创作台。
