# safety 大类收录声明

**主题**：AI 安全与评测——给 AI 系统做约束、度量与追责的产品：护栏与内容过滤、评测与观测、
红队与审计、机密计算与访问控制、数据合规与脱敏、内容溯源与标识。
定义、收录标准与边界裁决见 [../../categories.md](../../categories.md) §12。

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

| id | 名称 | 厂商 | 形态 | 状态 |
|---|---|---|---|---|
| `bedrock-guardrails` | Amazon Bedrock Guardrails | Amazon Web Services | 厂商云 | 8 项已核 · 活跃 |
| `arize-phoenix` | Arize Phoenix | Arize AI | 本机应用 | 8 项已核 · 活跃 |
| `azure-ai-content-safety` | Azure AI Content Safety | Microsoft | 厂商云 | 8 项已核 · 活跃 |
| `braintrust` | Braintrust | Braintrust AI | 网页服务 | 8 项已核 · 活跃 |
| `adobe-content-credentials` | Content Credentials（内容凭证） | Adobe · Content Authenticity Initiative / C2PA | 网页服务 | 8 项已核 · 活跃 |
| `garak` | garak | NVIDIA · Leon Derczynski | CLI | 8 项已核 · 活跃 |
| `gitguardian` | GitGuardian | GitGuardian | 网页服务 | 8 项已核 · 活跃 |
| `helicone` | Helicone | Helicone | 厂商云 | 8 项已核 · 活跃 |
| `inspect-ai` | Inspect | UK AI Security Institute | CLI | 8 项已核 · 活跃 |
| `lakera-ai` | Lakera | Lakera | 厂商云 | 8 项已核 · 活跃 |
| `langfuse` | Langfuse | Langfuse | 本机应用 | 8 项已核 · 活跃 |
| `langsmith` | LangSmith | LangChain | 厂商云 | 8 项已核 · 活跃 |
| `langwatch` | LangWatch | LangWatch | 厂商云 | 8 项已核 · 活跃 |
| `litellm` | LiteLLM 网关（Proxy / AI Gateway） | BerriAI · LiteLLM | 本机应用 | 8 项已核 · 活跃 |
| `nightfall` | Nightfall | Nightfall AI | 厂商云 | 8 项已核 · 活跃 |
| `presidio` | Presidio | Data Privacy Stack | 本机应用 | 8 项已核 · 活跃 |
| `promptfoo` | promptfoo | promptfoo | CLI | 8 项已核 · 活跃 |
| `pyrit` | PyRIT | Microsoft | 本机应用 | 8 项已核 · 活跃 |
| `canary-scan` | CanaryScan | PSA Intelligence | CLI | 有未核项 · 更新放缓 |
| `nemo-guardrails` | NeMo Guardrails | NVIDIA | 本机应用 | 有未核项 · 更新放缓 |
| `openai-evals` | OpenAI Evals | OpenAI | CLI | 有未核项 · 更新放缓 |
| `ragas` | Ragas | VibrantLabs | 本机应用 | 有未核项 · 更新放缓 |
| `truepic` | Truepic Vision / Lens | Truepic Inc. | 厂商云 | 有未核项 · 更新放缓 |
| `llm-guard` | LLM Guard | Protect AI | 本机应用 | 有未核项 · 已归档 |
| `rebuff` | Rebuff | Protect AI | 本机应用 | 有未核项 · 已归档 |

> 共 **25** 份。本清单由 `scripts/gen-category-docs.mjs` 从 `products/*.md` 自动生成；改档案后重跑脚本，不要手改表格。

> 状态读法：左边是「这页的证据是否齐」，右边是「上游产品还在不在更新」。停更不等于资料残缺。
