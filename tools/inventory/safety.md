# safety 大类收录清单（inventory）

> 去向枚举：`已有` / `待建`（P1>P2>P3）/ `只进nav` / `不收`（必须带理由）。
> 收录标准与边界裁决见 [categories.md §11](../categories.md)：主轴是安全/评测语义（护栏 rails、红队探针、脱敏算子、内容凭证、评测与观测）归本类；模型本体按「模型不是产品」不收；通用编排 SDK 归 framework。
> 形态只用 `web` / `cloud` / `local-app` / `cli` 四种；六条线在不同层，不做横向排名。
> 本类现有档案 25 份（三组并行建档：护栏与内容过滤 / 评测与观测 / 红队与数据合规，来源均为 2026-11-06 直抓核验）。

| 工具 | 厂商 | 官方 URL | 去向 | 档案 id | 理由/备注 |
|---|---|---|---|---|---|
| NeMo Guardrails | NVIDIA | https://docs.nvidia.com/nemo/guardrails/ | 已有 | nemo-guardrails | 护栏与内容过滤 · local-app；档案 sources 14 条全部直抓 200（docs 11 + releases + PyPI + 仓库页）；最近官方发布 v0.24.1（PyPI 2026-09-16）→ lifecycle maintenance |
| Azure AI Content Safety | Microsoft | https://azure.microsoft.com/en-us/products/ai-services/ai-content-safety | 已有 | azure-ai-content-safety | 护栏与内容过滤 · cloud；档案 sources 9 条全部直抓 200（learn 5 页 + Foundry 护栏页 + 容器页 + What's new + 定价页）；容器与 groundedness 2027-04-30 退役在册 |
| Amazon Bedrock Guardrails | Amazon Web Services | https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html | 已有 | bedrock-guardrails | 护栏与内容过滤 · cloud；档案 sources 7 条全部直抓 200（护栏主页 / 支持区域与模型 / tier / data-protection / data-retention / 文档历史 / 定价页）；**替换 openai-moderation-api**：platform.openai.com、openai.com、developers.openai.com、cookbook（跳转 developers 域）、help.openai.com 当日全部 403，官方正文取不到，故按同线换候选；此 id 不在 _category.md 的 18 份在册名单里，需人工并入 |
| Truepic Vision / Lens | Truepic Inc. | https://www.truepic.com/ | 已有 | truepic | 内容溯源与标识 · cloud；档案 sources 12 条全部直抓 200（官网 + vision.truepic.dev docs 6 页含两份 changelog + 隐私政策 + 定价 + blog + c2pa.org）；verify.truepic.com 实测 000、trust 页只返回脚本壳，相关维度写未知；公开 changelog 最新条 2025-01-22 → lifecycle maintenance |
| Content Credentials | Adobe · CAI / C2PA | https://contentcredentials.org/ | 已有 | adobe-content-credentials | 内容溯源与标识 · web；档案 sources 8 条全部直抓 200（含 verify 跳转落点、CAI 开源文档 hub、CAI 官网与 blog、Adobe Experience League 页、c2pa.org 与 spec.c2pa.org）；helpx.adobe.com 与 www.adobe.com 当日 403，Adobe 产品文档面记未知；两页规范版本号不一致 → lifecycle unknown |
| LiteLLM 网关 | BerriAI · LiteLLM | https://docs.litellm.ai/ | 已有 | litellm | 机密计算与访问控制 · local-app；档案 sources 10 条全部直抓 200（docs 8 页含 providers/deploy/virtual keys/guardrails/MCP/release notes + PyPI + 官网）；PyPI 1.108.1（2026-11-05）在册 → lifecycle active；企业版边界只按文档点到为止的条目写，未逐条清点 |
| garak | NVIDIA · Leon Derczynski | https://garak.ai/ | 已有 | garak | 红线与审计线；Apache-2.0，LICENSE 正文直读在册；cli 形态，交付物是失败样本日志而非拦截 |
| PyRIT | Microsoft（自 Azure/PyRIT 迁移） | https://microsoft.github.io/PyRIT/ | 已有 | pyrit | 红队编排框架；MIT；旧址迁移公告在册；local-app 形态（pip + 本机 GUI + CLI） |
| Lakera | Lakera（条款入口现归 Check Point） | https://www.lakera.ai/ | 已有 | lakera-ai | 托管防护 + 红队服务；privacy/security 入口当日均 301 至 Check Point，数据条款按主体读；cloud 形态 |
| Presidio | Data Privacy Stack（原 Microsoft） | https://presidio.dataprivacystack.org/ | 已有 | presidio | 数据合规与脱敏；文档旧址已迁移至 DPS 站；MIT 依 PyPI 许可字段记录，仓库 LICENSE 正文本批次直抓失败（进 unknowns） |
| Nightfall | Nightfall AI | https://www.nightfall.ai/ | 已有 | nightfall | **替换掉 privateai**：Private AI 的去标识化官方一手资料当日撑不住结论（www.privateai.com 现为 FHE 数据市场协议、docs.privateai.com 同口径、/de-identification 404），改收同方向（AI 侧 PII/凭据脱敏与 agent 数据流动）且一手材料充分的托管 DLP；cloud 形态 |
| GitGuardian | GitGuardian | https://www.gitguardian.com/ | 已有 | gitguardian | 密钥与凭据泄露监测；web 形态（dashboard 为主交互，另有 ggshield 与 self-hosting/air-gapped 面）；证书与 subprocessor 未披露到公开页 |
| OpenAI Evals | OpenAI | https://github.com/openai/evals | 已有 | openai-evals | 评测与观测线：开源评测框架加 YAML 基准登记册，oaieval / oaievalset 本机批量跑；MIT（LICENSE.md 原文直读 2026-11-06）；需自备 OPENAI_API_KEY，README 首行另指向 Dashboard 托管 Evals |
| Inspect | UK AI Security Institute · Meridian Labs | https://inspect.aisi.org.uk/ | 已有 | inspect-ai | 评测与观测线：frontier AI 评测框架，Python Task 加多模型 provider、沙箱后端与工具审批；MIT（LICENSE 原文直读 2026-11-06）；上游当日有推送，记 active |
| Ragas | VibrantLabs（仓库现属 vibrantlabsai 组织） | https://docs.ragas.io/ | 已有 | ragas | 评测与观测线：RAG 与 LLM 应用指标库加测试集生成，装在自己项目里跑；Apache-2.0（LICENSE 原文直读 2026-11-06）；旧路径 explodinggradients/ragas 当日跳转至新组织 |
| LLM Guard | Protect AI | https://github.com/protectai/llm-guard | 已有 | llm-guard | 护栏与内容过滤线，local-app。README 列 15 个输入扫描器与 21 个输出扫描器（含 PromptInjection、InvisibleText、Secrets）。MIT 许可。README 顶部宣布项目与关联 HF 模型已归档，故 lifecycle 记 archived |
| CanaryScan | PSA Intelligence | https://github.com/psaintelligence/canary-scan | 已有 | canary-scan | 接触外部文档集前的静态 canary、追踪器、信标与指纹检测，cli，七阶段管道，Apache-2.0 加内置脚本 BSD 2-Clause。当日官方正文未把自然语言提示注入列为检测通道，档案按官方口径记录。v0.2.0（2026-07-20） |
| Rebuff | Protect AI | https://github.com/protectai/rebuff | 已有 | rebuff | 提示注入自检与 canary 泄漏回检，local-app，四层防御。Apache-2.0。README 自述仍是原型且不作完全防护承诺，需自备 OpenAI 与 Pinecone 凭据，Local-only mode 仍是未完成项。仓库已归档 |
| LangWatch | LangWatch（开源核心 Apache-2.0） | https://langwatch.ai/docs/ | 已有 | langwatch | 直抓 200（docs.langwatch.ai 301 跳 langwatch.ai/docs/）· 变更记录 langwatch.ai/changelog 直抓 200 · 文档自陈可自托管 Apache-2.0 核心 |
| Helicone | Helicone | https://docs.helicone.ai | 已有 | helicone | 直抓 200 · 变更记录 www.helicone.ai/changelog 直抓 200 · 许可类型当日未取到，写为未知 |
| Arize Phoenix | Arize AI | https://github.com/Arize-ai/phoenix | 已有 | arize-phoenix | 片段未交回，按档案 frontmatter 登记 · 档案内来源 7 条 · 英文正文已在册 |
| Braintrust | Braintrust AI | https://www.braintrust.dev | 已有 | braintrust | 片段未交回，按档案 frontmatter 登记 · 档案内来源 10 条 · 英文正文已在册 |
| Langfuse | Langfuse 项目 | https://langfuse.com | 已有 | langfuse | 片段未交回，按档案 frontmatter 登记 · 档案内来源 10 条 · 英文正文已在册 |
| LangSmith | LangChain | https://www.langchain.com/langsmith | 已有 | langsmith | 片段未交回，按档案 frontmatter 登记 · 档案内来源 9 条 · 英文正文已在册 |
| promptfoo | promptfoo 项目 | https://www.promptfoo.dev | 已有 | promptfoo | 片段未交回，按档案 frontmatter 登记 · 档案内来源 9 条 · 英文正文已在册 |
