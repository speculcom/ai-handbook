# safety 大类收录声明

**主题**：AI 安全与评测——给 AI 系统做约束、度量与追责的产品：护栏与内容过滤、评测与观测、
红队与审计、机密计算与访问控制、数据合规与脱敏、内容溯源与标识。
定义、收录标准与边界裁决见 [../../categories.md](../../categories.md) §11。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | 产品主轴是**安全 / 合规 / 评测**能力，不是「顺便记了个审计日志」的通用软件 |
| 2 | 有可访问的官方文档 + 变更记录，八维至少 `model_access` 与 `permissions` 可答 |
| 3 | 能力边界可核验：拦什么、评什么、以什么形态部署，官方页面上说得出 |

**形态归属**（决定 `form:` 取值；⚠ 下表第一列不加反引号——audit.mjs 把「反引号小写词开头的 ≥3 列表格行」当档案声明）：

| 形态 | 判据 |
|:--|:--|
| web | 主要交互是浏览器里的控制台 / 验证器 / 平台页 |
| cloud | 以托管 API 或云服务交付，检测与计算跑在厂商侧 |
| local-app | 装在自己的机器或自有环境里跑（pip / Docker / 桌面应用，含本机起的 UI 与服务） |
| cli | 主要交互是终端，能脚本化、能进 CI |

**本大类只收这四条形态**（`SITES.safety.owns` 必须与下面实际用到的 form 一字对齐——
不一致会让 `loadTrack()` 的 OWNED 过滤**静默跳过档案**，构建不报错、页面上没有，
并连锁触发三处门禁）。

**六条线**（档案的分组口径，不进 form 枚举）：

| 线 | 问的问题 |
|:--|:--|
| 护栏与内容过滤 | 运行时会拦下来吗？拦的是输入、输出还是工具调用？ |
| 评测与观测 | 出错看得见吗？回归能挡在发布前吗？ |
| 红队与审计 | 上线前谁替攻击者问一句「这样打得穿吗」？ |
| 机密计算与访问控制 | 数据在谁的机器上可见？谁能调用这个 agent？ |
| 数据合规与脱敏 | 个人数据进模型前怎么处理？处理结果归谁？ |
| 内容溯源与标识 | 这份内容是生成的还是拍的？拿什么证明？ |

**边界情况**：

| 情况 | 处理 |
|---|---|
| 安全 / 护栏**模型本体**（Llama Guard 类） | 不收——「模型不是产品」，与 Whisper / 权重归 models 站同口径 |
| 只做代码 lint / SAST 的传统扫描器 | 不收，不触及模型与提示词 |
| 通用 WAF / RASP / CSPM | 不收；出现 AI 工作负载专用产品线时按该线建档 |
| 通用 DLP / SSO 带 AI 场景 | 只有官方主轴覆盖模型 I/O、agent 工具调用、提示词时收 |
| 编排框架自带的 guardrails / evals 模块 | 对象本体归 `framework`，本大类只收独立产品 |
| 可视化平台自带的评测页 | 对象本体归 `automation` |
| SOC 2 / ISO 42001 等合规证书页 | 写进 `permissions` 维，不另立档案 |

## 收录对象（25 份）

> 本段由 products/ 实际在册档案生成，不是计划名单；分组口径见上文的六条线说明。

> 计划里但未在本批建档（官方正文当日取不到，按「未知就说未知」不硬写）：openai-moderation-api / privateai。

> 护栏与内容过滤 5：nemo-guardrails / azure-ai-content-safety / bedrock-guardrails / llm-guard / rebuff

| id | 名称 | 厂商 | form | 英文正文 |
|---|---|---|---|---|
| `nemo-guardrails` | NeMo Guardrails | NVIDIA | local-app | 有 |
| `azure-ai-content-safety` | Azure AI Content Safety | Microsoft | cloud | 有 |
| `bedrock-guardrails` | Amazon Bedrock Guardrails | Amazon Web Services | cloud | 有 |
| `llm-guard` | LLM Guard | Protect AI | local-app | 有 |
| `rebuff` | Rebuff | Protect AI | local-app | 有 |

> 评测与观测 9：openai-evals / inspect-ai / langfuse / arize-phoenix / langsmith / braintrust / promptfoo / ragas / langwatch

| id | 名称 | 厂商 | form | 英文正文 |
|---|---|---|---|---|
| `openai-evals` | OpenAI Evals | OpenAI | cli | 有 |
| `inspect-ai` | Inspect | UK AI Security Institute | cli | 有 |
| `langfuse` | Langfuse | Langfuse 项目 | local-app | 有 |
| `arize-phoenix` | Arize Phoenix | Arize AI | local-app | 有 |
| `langsmith` | LangSmith | LangChain | cloud | 有 |
| `braintrust` | Braintrust | Braintrust AI | web | 有 |
| `promptfoo` | promptfoo | promptfoo 项目 | cli | 有 |
| `ragas` | Ragas | VibrantLabs | local-app | 有 |
| `langwatch` | LangWatch | LangWatch | cloud | 有 |

> 红队与注入检测 3：garak / canary-scan / pyrit

| id | 名称 | 厂商 | form | 英文正文 |
|---|---|---|---|---|
| `garak` | garak | NVIDIA · Leon Derczynski | cli | 有 |
| `canary-scan` | CanaryScan | PSA Intelligence | cli | 有 |
| `pyrit` | PyRIT | Microsoft | local-app | 有 |

> 网关与访问控制 2：helicone / litellm

| id | 名称 | 厂商 | form | 英文正文 |
|---|---|---|---|---|
| `helicone` | Helicone | Helicone | cloud | 有 |
| `litellm` | LiteLLM 网关（Proxy / AI Gateway） | BerriAI · LiteLLM | local-app | 有 |

> 内容溯源与标识 2：truepic / adobe-content-credentials

| id | 名称 | 厂商 | form | 英文正文 |
|---|---|---|---|---|
| `truepic` | Truepic Vision / Lens | Truepic Inc. | cloud | 有 |
| `adobe-content-credentials` | Content Credentials（内容凭证） | Adobe · Content Authenticity Initiative / C2 | web | 有 |

> 数据合规与脱敏 4：presidio / gitguardian / nightfall / lakera-ai

| id | 名称 | 厂商 | form | 英文正文 |
|---|---|---|---|---|
| `presidio` | Presidio | Data Privacy Stack | local-app | 有 |
| `gitguardian` | GitGuardian | GitGuardian | web | 有 |
| `nightfall` | Nightfall | Nightfall AI | cloud | 有 |
| `lakera-ai` | Lakera | Lakera | cloud | 有 |
