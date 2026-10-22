# coding 大类收录清单（inventory）

> 去向枚举：`已有`（档案在 `tracks/coding/products/`）/ `待建`（P1>P2>P3 排进 T20+ 批次）/ `只进nav`（官方源不足以核验八维，进 nav.specul.com 不进档案）/ `不收`（必须带理由，L6 停运附官方公告）。
> 候选来源交叉（≥2）：① nav-data.json `cat=coding` 30 条；② v8 计划 T9 候选名单；③ 2026-10-21 WebSearch 补漏核验。
> 收录标准见 [categories.md §1](../categories.md)：agent 式参与编码 + 面向代码库 + 官方文档可核验。**纯补全不收**（不满足标准 1）。

| 工具 | 厂商 | 官方 URL | 去向 | 档案 id | 理由/备注 |
|---|---|---|---|---|---|
| Aider（编辑器侧） | Aider 开源项目 | https://aider.chat | 已有 | aider | |
| Aider CLI | Aider 开源项目 | https://aider.chat | 已有 | aider-cli | 同产品两形态 |
| Amp | Amp Frontier Corporation（原 Sourcegraph，2025-12 分拆） | https://ampcode.com | 已有 | amp | 归属已核：官方双源公告分拆为独立公司（T24 落地） |
| Claude Code（IDE 扩展） | Anthropic | https://claude.com/product/claude-code | 已有 | claude-code | |
| Claude Code CLI | Anthropic | https://claude.com/product/claude-code | 已有 | claude-code-cli | 同产品两形态 |
| Cline | Cline Bot Inc. | https://cline.bot | 已有 | cline | |
| Codex CLI | OpenAI | https://openai.com/codex/ | 已有 | codex-cli | |
| Codex（IDE 扩展） | OpenAI | https://openai.com/codex/ | 已有 | codex-ide | 同产品两形态 |
| Continue | Continue Dev, Inc. | https://continue.dev | 已有 | continue | |
| GitHub Copilot（IDE） | GitHub / Microsoft | https://github.com/features/copilot | 已有 | copilot | |
| GitHub Copilot CLI | GitHub / Microsoft | https://github.com/features/copilot | 已有 | copilot-cli | 同产品两形态 |
| Crush | Charmbracelet | https://charmbracelet.com/crush | 已有 | crush | |
| Cursor | Anysphere | https://cursor.com | 已有 | cursor | |
| Cursor CLI | Anysphere | https://cursor.com | 已有 | cursor-cli | 同产品两形态 |
| Factory Droid | Factory | https://factory.ai | 已有 | factory-droid | |
| Gemini CLI | Google | https://github.com/google-gemini/gemini-cli | 已有 | gemini-cli | |
| goose | AAIF（原 Block） | https://goose-docs.ai | 已有 | goose | |
| Grok（Build/编码模式） | xAI | https://x.ai | 已有 | grok-bot | cloud 形态 |
| Jules | Google | https://jules.google | 已有 | jules | 异步云 agent |
| Junie | JetBrains | https://www.jetbrains.com/junie/ | 已有 | junie | |
| Kiro | AWS | https://kiro.dev | 已有 | kiro | |
| Muse Spark（Meta AI 编码） | Meta | https://www.meta.ai | 已有 | meta-muse | cloud 形态 |
| ChatGPT Codex 云（Dot） | OpenAI | https://chatgpt.com/codex | 已有 | openai-dot | cloud 形态 |
| OpenCode | SST / OpenCode 社区 | https://opencode.ai | 已有 | opencode | |
| Warp | Warp Dev, Inc. | https://www.warp.dev | 已有 | warp | agentic 终端 |
| Windsurf（Devin Desktop） | Cognition | https://windsurf.com | 已有 | windsurf | ⚠ 归属已换 Cognition，档案 vendor 已记 |
| Zed | Zed Industries | https://zed.dev | 已有 | zed | |
| Devin | Cognition | https://devin.ai | 已有 | devin | P1 · 云异步 agent，与 Windsurf 同厂 |
| Replit Agent | Replit | https://replit.com | 已有 | replit-agent | P1 · 云 IDE+agent |
| Lovable | Lovable（瑞典） | https://lovable.dev | 已有 | lovable | P2 · vibe 建站，产物是可导出代码库（与 Dify 判例区分）；2026-10-22 建档 |
| Bolt.new | StackBlitz | https://bolt.new | 已有 | bolt-new | P2 · 同上；浏览器内 WebContainers 底座；2026-10-22 建档 |
| v0 | Vercel | https://v0.dev | 已有 | v0 | P2 · 同上；绑 Vercel 部署链；2026-10-22 建档 |
| Qodo（原 CodiumAI） | Qodo | https://www.qodo.ai | 只进nav | | 官方 2026-04-23 公告废弃代码生成（autocomplete+chat）、IDE 插件 2026-10-30 退役；现产品=PR 评审+SDLC 治理平台——按 CodeRabbit 判例「评审机器人不是替你改代码库的编码 agent」不收 |
| Tabnine | Tricentis（2026-07-30 收购） | https://www.tabnine.com | 不收 | | 官网整站 301 → tricentis.com、Tricentis 产品清单零命中 Tabnine——独立产品终结（Supermaven 判例同款）；nav 旧条目已标 retired。⚠ 旧备注「Salesforce 收购」是错的，收购方是 Tricentis |
| Augment Code | Augment Code（2026-10 起部分资产并入 Harness） | https://www.augmentcode.com | 已有 | augment-code | P2 · Cosmos 软件工厂/self-hosted；2026-10-08 官方公告 Cosmos/Auggie CLI/Context Engine 加入 Harness；2026-10-22 建档 |
| Amazon Q Developer | AWS | https://aws.amazon.com/q/developer/ | 已有 | amazon-q-developer | P2 · 官方 EOL：IDE 插件 2027-04-30 停支持、Q CLI 已变 Kiro CLI（官方指向 Kiro）；2026-10-22 建档带 EOL 警示 |
| CodeBuddy（IDE/CLI/插件） | 腾讯云 | https://www.codebuddy.cn | 已有 | codebuddy | P1 · 国产（L5 只转述官方）；国际版 codebuddy.ai |
| Google Antigravity（2.0/CLI/IDE/SDK） | Google | https://antigravity.google | 已有 | google-antigravity | P1 · agent-first 开发平台（原 Gemini Code Assist 线并入，建档时核官方口径） |
| Trae | 字节跳动 | https://www.trae.ai | 已有 | trae | P1 · 国产（L5） |
| Qoder（国际版） | 阿里云 | https://qoder.com | 已有 | qoder | P2 · Qoder CN 系列的国际线（国内线档案见 qoder-cn）；官方无两线对照说明页（案例页有「Alibaba Qoder」表述）；2026-10-22 建档 |
| Roo Code | Roo Code Inc.（公司转 Roomote） | https://roocode.com | 不收 | | 官方文档明示扩展 2026-05-15 关停（指替代 ZooCode/Cline）、GitHub 仓 archived:true、roocode.com 301→roomote.dev——独立产品终结（Supermaven/Tabnine 判例同款） |
| Kilo Code | Kilo-Org | https://kilo.ai | 已有 | kilocode | P3 · 开源 MIT 编码 agent（500+ 模型零加价/BYOK/本地模型）；域名已迁 kilo.ai（旧 kilocode.ai 308）；2026-10-22 建档 |
| 通义灵码（现 Qoder CN） | 阿里云 | https://qoder.com.cn | 已有 | qoder-cn | P1 · 国产（L5）；2026-05-20 官方更名 Qoder CN 系列（docs.qoder.cn 系列页公告），档案 id 用现名 qoder-cn |
| 文心快码（Baidu Comate） | 百度 | https://kuaima.baidu.com | 已有 | baidu-comate | P2 · 国产（L5）；2024-06 品牌焕新中文名文心快码；2026-09 媒体报道并入百度搭子（官方公告未检索到，官网仍活跃）；2026-10-22 建档 |
| CodeGeeX | 智谱 | https://codegeex.cn | 不收 | | VS Code Marketplace 检索零结果（Thinkanya.codegeex/saqerdev.CodeGeeX 均 404）、JetBrains 插件 23063 重定向到无关插件、open-vsx API 报 not found、官方仓 2024-08 后无提交——插件产品面已撤（CodeGeeX4 模型仍在但编码助手不可核验使用） |
| Sourcegraph Cody | Sourcegraph | https://sourcegraph.com/docs/cody/faq | 不收 | | Free/Pro/Enterprise Starter 已于 2025-07-23 停止（官方 FAQ 公告），仅 Enterprise 且不自助试用——读者无法核验使用 |
| Supermaven | （并入 Cursor） | https://supermaven.com/blog/cursor-announcement | 不收 | | 官方公告加入 Cursor，独立产品终结（插件仍维护） |
| Tabby | TabbyML | https://tabbyml.com | 只进nav | | 主体是自托管补全，agent 能力不足以过八维核验 |
| CodeRabbit | CodeRabbit | https://www.coderabbit.ai | 只进nav | | PR 评审机器人，不是「替你改代码库」的编码 agent |
| Tempo | Tempo Labs | https://tempo.new | 只进nav | | 设计转代码环境，非编码 agent |
| Anima | Anima | https://www.animaapp.com | 只进nav | | 设计转代码，非编码 agent |
| Locofy | Locofy | https://www.locofy.ai | 只进nav | | 同上 |
| Builder.io | Builder.io | https://www.builder.io | 只进nav | | 可视化建站+Figma 转码，主轴不是代码库 agent |

## 备注

- nav `cat=coding` 里的 AutoGPT / Dify / Coze / Manus / LangGraph / CrewAI / Relevance AI / Superagent / Botpress / SmythOS **不归本大类**——按 categories.md 边界裁决分别落 framework（T10）/ automation（T12）清单，nav 分类≠本站大类。
- 「已有」41 行 = `tracks/coding/products/` 现有档案全集（孤儿检查会守这条）。
- 待建 4 行按 P2→P3 排批次——T24（coding +5）落地 P1 五份（Devin/Replit Agent/CodeBuddy/Antigravity/Trae）；P1 第六份通义灵码已于 2026-10-22 建档（更名 Qoder CN，档案 id `qoder-cn`）；常态 M2（2026-10-22）落地 vibe 建站三件套（Lovable/Bolt.new/v0）；常态 M3（2026-10-22）落地 P2 收尾——建档 3（Qoder 国际线/Augment Code/Amazon Q Developer）、只进nav 1（Qodo 转型评审平台，CodeRabbit 判例）、不收 1（Tabnine 独立产品终结，nav 标 retired）；常态 M4（2026-10-22）落地 P3 收尾——建档 2（Kilo Code/文心快码）、不收 2（Roo Code 扩展关停+repo archived、CodeGeeX 插件市场全撤）；待建清零，coding 清单转入维护常态。
