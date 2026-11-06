---
id: bedrock-guardrails
form: cloud
name: Amazon Bedrock Guardrails
nameEn: Amazon Bedrock Guardrails
vendor: Amazon Web Services
homepage: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html
license: 商业云服务，按 AWS 服务条款与共享责任模型管辖（data-protection 页 2026-11-06 直抓在册）；
  内容归属仍由所选模型的条款决定。
licenseEn: Commercial cloud service under the AWS Service Terms and the shared-responsibility model
  (recorded on the data-protection page, direct-fetched 2026-11-06); content rights still follow the terms of whichever model you pick.

axes:
  model_access: >-
    守的是你在 Bedrock 上调的模型。官方支持页在册：护栏作用于 bedrock-runtime 的 InvokeModel /
    InvokeModelWithResponseStream / Converse / ConverseStream 调用；bedrock-mantle 端点不支持。
    目录中多数模型可挂，嵌入、重排、语音与个别文本模型（页内列了具体清单）不行，挂了会报 ValidationException。
    ApplyGuardrail 可脱离模型单独评内容，因此也能守 Bedrock 之外的应用。
  runtime: >-
    托管云：区域 API + Bedrock 控制台。检测在 AWS 侧执行，Standard tier 使用跨区域推理。
    官方页未在册任何本机/离线形态，护栏策略是云端资源（draft + version）。
  local_files: >-
    不读写你的工作区文件：内容通过 API 或控制台测试窗口提交。官方 data-protection 页提示
    不要把机密信息写进标签或 Name 等自由文本字段，因为那些可能进计费与诊断日志。
  background: >-
    以同步评估为主；跨区域推理与跨区保留策略在册，托管式的长任务队列/关机续跑本次未核验到官方声明，记为未知。
  tools: >-
    策略面在册：content filters（Hate / Insults / Sexual / Violence / Misconduct / Prompt Attack）、
    denied topics、word filters、sensitive-information（PII 阻断或掩码，支持自定义 regex）、
    contextual grounding checks、Automated Reasoning checks；还能用标签只评估用户输入的片段（该能力只在 SDK/API 侧）。
  context: >-
    按请求评估文本与图像，不做会话记忆。语言面按档位分层：Classic 支持英法西，Standard 语言面更广（tier 页在册）；
    官方另有「支持语言」专页，本档未逐条核验具体语言清单。
  permissions: >-
    数据保留是显式模式：none / default / aws_review /（legacy）provider_data_share / inherit，
    按 project → account → model 默认解析。官方在册：模型提供方拿不到客户 prompt 与 completion；
    被保留的内容最长 30 天且在 AWS 边界内；要求人工复核的模型在 none / default 下直接不可用。
    IAM / SCP 可强制组织级 ZDR。合规证书明细本次未逐条核验，记为未知。
  fit: >-
    适合模型主要就在 Bedrock 上、要把护栏挂进推理调用、又要有零保留与人工复核开关可治理的团队。
    不适合需要自托管护栏（走本地库那条线）、要跨云统一护栏策略，或依赖中国区可用的场景。

pitfalls:
  - 以为设成 aws_review 就等于所有请求都被保留：官方写明各模型按 allowed_modes 独立决定
  - 以为目录里任何模型都能挂护栏：嵌入/重排/语音等被官方列为不支持，请求直接报错
  - 以为护栏必须跟着模型调用跑：ApplyGuardrail 可脱离模型单独评，计费与接入路径不同

tags: [云端, 商业, guardrails, API, 多后端]
related: [azure-ai-content-safety, nemo-guardrails, litellm]

sources:
  - label: Amazon Bedrock Guardrails · 文档主页（策略清单、ApplyGuardrail、测试窗口，2026-11-06 直抓 200）
    url: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html
    kind: docs
  - label: Amazon Bedrock Guardrails · Supported Regions and models（生效端点与不支持模型清单，2026-11-06 直抓 200）
    url: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-supported.html
    kind: docs
  - label: Amazon Bedrock Guardrails · Safeguard tiers（Classic / Standard 差异与在册区域列表，2026-11-06 直抓 200）
    url: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-tiers.html
    kind: docs
  - label: Amazon Bedrock Guardrails · Data protection（模型提供方无访问、共享责任、TLS/CloudTrail 建议，2026-11-06 直抓 200）
    url: https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html
    kind: docs
  - label: Amazon Bedrock Guardrails · Data retention（保留模式、顺序解析、30 天与人工复核边界，2026-11-06 直抓 200）
    url: https://docs.aws.amazon.com/bedrock/latest/userguide/data-retention.html
    kind: docs
  - label: Amazon Bedrock Guardrails · 文档历史（2026-10 起的变更条目，2026-11-06 直抓 200）
    url: https://docs.aws.amazon.com/bedrock/latest/userguide/doc-history.html
    kind: changelog
  - label: Amazon Bedrock · Pricing（计费单元结构；本档不采价格数字，2026-11-06 直抓但页内未给护栏明细）
    url: https://aws.amazon.com/bedrock/pricing/
    kind: pricing

link:
  url: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html
  kind: official

last_verified: 2026-11-06
last_updated: 2026-11-06
lifecycle: active
confidence: partial

cn:
  origin: foreign
  origin_note: AWS 主体；官方 tier 页的在册区域表为美欧亚中东与 GovCloud，未列中国大陆区域。
  origin_note_en: AWS entity; the recorded region table on the tier page covers US / Europe / Asia Pacific / Middle East and GovCloud,
    with no mainland-China region listed.
  direct: unknown
  direct_note: 同日实测 docs.aws.amazon.com 返回 200，这只是文档可达；服务侧在中国大陆是否由本地运营方提供
    未核验到官方来源，不以「文档能打开」推断可用或合规。
  direct_note_en: Same-day probe of docs.aws.amazon.com returned 200, which is documentation reachability only;
    whether the service is offered in the mainland by a local operator is unverified — doc reachability is not availability.
  filing: unknown
  filing_note: 官方护栏文档未写中国大陆备案/登记信息；本次未检索监管公示名单，不做推断。
  filing_note_en: The guardrail documentation says nothing about mainland filing/registration; the public registry was not searched.
  verified: 2026-11-06
---

## 一句话定位

它是挂在推理调用上的策略层，也能脱离模型单独评内容。

官方文档把两种用法分开写：一种是调模型时带上 guardrail ID 与版本，
另一种是 ApplyGuardrail——不启动模型调用，直接把内容送进护栏评。

## 适合与不适合

适合模型主要跑在 Bedrock 上的团队：策略与控制台、SDK 是一条线，数据保留模式还能当准入闸门用。
不适合需要把护栏代码留在自己环境里的团队（那是本地库那条线），也不适合指望「一套护栏跨多云同行为」的人。
按官方支持页，护栏与模型的对应关系要逐模型查 model card，不能按模型类型推断。

## 能力边界

档位差异是实质的：Standard tier 才支持代码内容里的危害检测、跨区域推理与 prompt leakage 检测，
denied topics 的字符上限也从 200 提到 1000（tier 页在册）。Classic 只保英法西。
contextual grounding 的 Standard 档只在区域子集可用，在其他区域请求会直接校验失败。
Automated Reasoning checks 是另一套东西：拿逻辑规则校验模型回答，不等同于内容过滤。

## 变更记录说明

变更记录走官方文档历史页。当日在册最新条目为 2026-10-30 的 Watermarking in Amazon Bedrock
（列出会加水印的模型与检测方式），护栏相关的历史条目在同页可回溯；
本档据此判 lifecycle = active，但护栏自身的独立发布说明页未单独设立，记为口径缺口。

## 实测记录

本站尚未完成实测。本档不含拦截率、延迟或费用数字。

**实测建议**（三条）：

- 同一 guardrail 在 Classic 与 Standard 档下对同一批样本的判定差异
- 把 account 模式设为 none 后，要求人工复核的模型不可用会给业务带来什么
- ApplyGuardrail 与随推理调用护栏的延迟与结果一致性

## 未知项清单

- 中国大陆是否有本地运营方提供本服务（官方在册区域表未含大陆区域）
- 具体计费单元与免费额度（定价页当日未给护栏明细）
- 护栏评估的输入长度上限
- 支持的完整语言清单（另有专页，本档未逐条核验）
- SOC / ISO 等合规证书清单（未逐条核验，只有共享责任模型表述在册）
- 是否存在托管式异步护栏任务队列

## 相关条目

- [Azure AI Content Safety](./azure-ai-content-safety.md) — 同为托管护栏；差别在数据保留是否做成显式模式与跨区域推理开关。
- [NeMo Guardrails](./nemo-guardrails.md) — 想把自己写的 rail 与模型端点留在自己环境里时，看这条线。
- [LiteLLM](./litellm.md) — 多云或自托管入口的策略治理在网关层，这里是云内推理层。
