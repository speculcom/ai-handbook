---
id: azure-ai-content-safety
form: cloud
name: Azure AI Content Safety
nameEn: Azure AI Content Safety
vendor: Microsoft
homepage: https://azure.microsoft.com/en-us/products/ai-services/ai-content-safety
license: 商业云服务，按 Azure 协议与产品条款管辖（产品页与定价页 2026-11-06 直抓在册，档位 F0 / S0）。
  数据条款在册要点：检测输入不入库、不用客户数据训练模型。
licenseEn: Commercial cloud service governed by the Azure agreements and product terms (product and pricing pages
  direct-fetched 2026-11-06; tiers F0 / S0). Recorded data clauses: detection inputs are not stored in the model,
  and customer data is not used to train the models.

axes:
  model_access: >-
    它不给模型，只给护栏。官方 Foundry 护栏页在册：护栏用 Azure AI Content Safety 的分类模型，
    适用于所有「Azure 出售的 Foundry Models」（音频转写除外），agent 侧 tool call / tool response 为 preview。
    也可以完全脱离 Foundry，用独立 REST API 守任意平台的模型输出。
  runtime: >-
    托管云 API + 网页工作台（contentsafety.cognitive.azure.com 在册）。检测在 Azure 侧执行。
    官方容器页在册 own-environment 选项只有 Analyze text / Analyze image / Prompt Shields，
    且 connected 与 disconnected 容器于 2027-04-30 退役，容器仍需回连 Azure 计量。
  local_files: >-
    不读写你的工作区文件：内容通过 REST / SDK 提交，或在工作台里上传样本与数据集。
    数据页在册的唯一留存项是 blocklist：条目存 Azure Storage、同区域、微软托管密钥加密，可用 DELETE API 删。
  background: >-
    同步请求—响应为主。官方 FAQ 在册「异步过滤」：过滤与流式返回并行、内容不缓冲，
    代价是「不安全内容可能在过滤完成前短暂露出」。这是延迟取舍，不是关机后续跑的托管任务。
  tools: >-
    API 面在册：Analyze text、Analyze image、Multimodal（preview，2027-04-30 退役）、Prompt Shields、
    Protected material（text / code）、Groundedness（preview，同期退役）、Custom categories（standard / rapid）、
    Task Adherence、Blocklist。SDK 覆盖 C# / Python / Java / JavaScript；工作台可导出调用代码。
  context: >-
    按单次请求判定，不做长上下文或记忆。官方 limits 页在册输入上限：文本 10K 字符、
    图像 4MB、Prompt Shields 10K 字符、groundedness 源 55K 字符、task adherence 100K 字符等。
    多轮与会话管理由调用方自己负责。
  permissions: >-
    数据页在册三条硬陈述：检测时不存储输入文本与图像、不用客户数据训练或改进模型、
    Azure OpenAI 的 Abuse Monitoring 不适用（内容不做人工复核）。区域页在册：数据留在你所选区域。
    鉴权支持 Microsoft Entra ID / 托管身份，支持 CMK / BYOK。档位 F0 / S0，F0 有月度免费额度（数字见定价页）。
  fit: >-
    适合已经把工作负载放在 Azure 上、要多模态分级严重度与提示攻击检测、并要求区域驻留与「不训练」承诺的团队。
    不适合需要离线长期跑护栏的场景（容器即将退役），也不适合要自己掌握 rail 代码与模型端点的团队——那类需求看本地线。

pitfalls:
  - 把容器当长期离线方案：官方页在册 connected / disconnected 容器 2027-04-30 退役
  - 把「异步过滤」当成零暴露：官方 FAQ 写明不安全内容可能在过滤完成前短暂露出
  - 以为多语言同等可靠：官方在册部分能力仅以英文训练评估，中文只在部分分类器的训练测试语言里

tags: [云端, 商业, guardrails, API, 多平台]
related: [nemo-guardrails, bedrock-guardrails, litellm]

sources:
  - label: Azure AI Content Safety · 产品页（定位与能力条目，2026-11-06 直抓 200）
    url: https://azure.microsoft.com/en-us/products/ai-services/ai-content-safety
    kind: docs
  - label: Azure AI Content Safety · Overview（能力清单、Studio、限流、档位、退役公告，2026-11-06 直抓 200）
    url: https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview
    kind: docs
  - label: Azure AI Content Safety · Region availability（逐区域可用性表与输入/语言限制，2026-11-06 直抓 200）
    url: https://learn.microsoft.com/en-us/azure/ai-services/content-safety/region-availability
    kind: docs
  - label: Azure AI Content Safety · FAQ（数据留存与训练用途、异步过滤、严重度阈值建议，2026-11-06 直抓 200）
    url: https://learn.microsoft.com/en-us/azure/ai-services/content-safety/faq
    kind: docs
  - label: Azure AI Content Safety · Data, privacy, and security（不存储、不训练、区域驻留、blocklist 存储，2026-11-06 直抓 200）
    url: https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/content-safety/data-privacy
    kind: docs
  - label: Azure AI Content Safety · Foundry guardrails overview（干预点、默认护栏、阻断档位与适用范围，2026-11-06 直抓 200）
    url: https://learn.microsoft.com/en-us/azure/ai-foundry/guardrails/guardrails-overview
    kind: docs
  - label: Azure AI Content Safety · Containers overview（本机容器范围与 2027-04-30 退役，2026-11-06 直抓 200）
    url: https://learn.microsoft.com/en-us/azure/ai-services/content-safety/how-to/containers/container-overview
    kind: migration
  - label: Azure AI Content Safety · What's new（2026-10 模型更新与分阶段上线、退役清单，2026-11-06 直抓 200）
    url: https://learn.microsoft.com/en-us/azure/ai-services/content-safety/whats-new
    kind: changelog
  - label: Azure AI Content Safety · Pricing（档位结构与计费单元，本页不采价格数字，2026-11-06 直抓 200）
    url: https://azure.microsoft.com/en-us/pricing/details/content-safety/
    kind: pricing

link:
  url: https://contentsafety.cognitive.azure.com
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: Microsoft 主体；官方区域表按 Americas / Europe / Asia Pacific / Middle East & Africa 分组在册。
  origin_note_en: Microsoft entity; the official region table is grouped as Americas / Europe / Asia Pacific / Middle East & Africa.
  direct: unknown
  direct_note: 同日实测 learn.microsoft.com 与 azure.microsoft.com 返回 200，但这只是文档可达；
    官方区域在册表未列中国大陆区域，定价页当日也未写中国区可用性。服务在大陆是否可用未核验到官方来源，
    不以「网页能打开」推断合规可用。
  direct_note_en: Same-day probes returned 200 for learn.microsoft.com and azure.microsoft.com, but that is documentation reachability only;
    the official region table lists no mainland-China region and the pricing page said nothing about a China region.
    Service availability in the mainland is unverified — page reachability is not treated as compliant availability.
  filing: unknown
  filing_note: 官方页面当日在册内容未提中国大陆备案/登记；本次未检索监管公示名单，不做推断。
  filing_note_en: The pages fetched same day say nothing about mainland filing/registration; the public registry was not searched.
  verified: 2026-11-06
---

## 一句话定位

它是云上的内容判定接口，不替你决定怎么处理结果。

官方 FAQ 把这点写得很直白：API 返回的是分类元数据（严重度或二值结果），
删除、打标、拦截这些执行动作由你自己的策略来做。

## 适合与不适合

适合已在 Azure 上跑模型、要文本与图像分级严重度加提示攻击检测、并要求区域驻留的团队。
不适合两类需求：要长期离线跑护栏（容器已公告退役），要自己掌握 rail 逻辑与模型端点
（那是本地库那条线）。想拿它做「谁更准」的横向排名也不合适——官方语言页明确建议你自己测。

## 能力边界

在册的判定对象有四类干预点：用户输入、工具调用（preview）、工具响应（preview）、输出。
Foundry 侧模型默认挂 Microsoft.DefaultV2；输出侧的内容危害关掉需要走审批表单，
输入侧人人可关。agent 护栏会整体覆盖模型护栏，官方页给了示例说明这种覆盖的实际后果。
另有一条硬边界写在 Overview：本服务不得用于检测非法儿童性虐待图像。

## 变更记录说明

变更记录走官方 What's new 页（无独立 releases 页）。当日在册要点：
2026-10 文本内容危害分类与 Prompt Shields（UPIA / XPIA）模型更新，先在 Spain Central 灰度、
分阶段扩展，并明确「不改动 PII、task adherence、blocklist、protected material 与图像能力」；
同期公告 2027-04-30 退役 Multimodal、Custom categories（rapid）、connected / disconnected 容器、
Embedded SDK 与 Groundedness detection。更早的 GA / preview 节奏可回溯到 2023-05 公开预览。

## 实测记录

本站尚未完成实测。本档不含拦截率、误报率或延迟数字；官方也要求逐语言自测。

**实测建议**（三条）：

- 中文与英文样本在同一档位下的严重度分布差异（官方在册分类器训练测试语言含中文）
- 异步过滤的实际露出窗口有多长（FAQ 在册该取舍）
- agent 护栏覆盖模型护栏后，工具调用与响应是否真的未被扫描

## 未知项清单

- 中国大陆是否有运营方提供本服务（官方区域表与定价页均未在册）
- 内容安全分类模型的具体版本号（官方 FAQ 说明不做版本发布）
- 各能力在不同语言下的准确率
- Embedded SDK 与 Multimodal 的替代迁移路径细节（只取到退役日期）
- F0 免费额度的具体数值（本页不采价格与配额数字，见定价页）

## 相关条目

- [NeMo Guardrails](./nemo-guardrails.md) — 同一条线的另一端：这里检测在厂商侧，那里在你自己的进程里。
- [Amazon Bedrock Guardrails](./bedrock-guardrails.md) — 同样是托管护栏，差别在数据保留模式与跨区域推理的显式开关。
- [Content Credentials](./adobe-content-credentials.md) — 这里判「内容该不该拦」，那里证「内容从哪来」。
