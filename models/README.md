# AI 模型（ai-handbook / models）

> English version: [README.en.md](./README.en.md)

> **AI 模型 · 开放权重（含蒸馏）图谱** —— 两步选型：先看家族谱系卡（出品方 / 代次 / 尺寸档 / 许可 / 官方声明），再回答「这个基础模型，我该下载哪个量化版、为什么」。
>
> 线上：https://models.specul.com/
> 部署仓：https://github.com/speculcom/models

## 这是什么

一个**索引站**，不是评测站。

- 我们从 Hugging Face 公开 API 读取模型元数据（许可、体积、架构、上下文、量化档位）
- 把它整理成**能横向对比的表**，每个数字都标出处
- **我们不跑 benchmark，不给「哪个模型更强」的结论**

## 不是什么

- ❌ 不是评测站（不做能力横评）
- ❌ 不是权重镜像站（**不下载、不托管任何模型文件**）
- ❌ 不是资讯站（不追热点、不写新闻）

## 不排名宪章

本站只做事实对照（尺寸 / 许可 / 官方声明；价格按纪律不采），优劣留给读者判断。
官方榜单只转述且注明出处，本站不产出自己的排名，也不裁决路线之争。
这条从建栏第一天写死，全站每个页面页脚都带「不实测、不排名、未知就写未知」。

## 我该怎么读

16 个基础模型、129 个量化档、1270 个 GGUF 文件 —— 全列出来没人看得到底。按你的处境走：

| 你的处境 | 走哪条路 |
|---|---|
| 「我电脑跑得动吗」 | 从下面的**系列表**里挑，看成员数和量化档数；体量在 `data/series/*.json` 里 |
| 「这个档位下载量为什么这么高」 | 先看 [`data/quantizers/`](./data/quantizers/) 里量化者档案 —— 同一个模型，不同人做的档质量差很多 |
| 「我该不该用某个模型」 | 看 [`docs/selection-*.json`](./docs/)：为什么当初选了这些，过程可追溯 |
| 「为什么没有 Q4_K_M」 | 读 [`docs/METHODOLOGY.md`](./docs/METHODOLOGY.md) 里档名规则那节 |

一句话：**这里只回答「下哪个、为什么」，不回答「哪个更强」。**

站上的版本：<https://models.specul.com/>

## 目录结构

```
_data/handbook/models/
├── config.js              系列名单 + 量化者档案（人工维护）
├── data/
│   ├── series/*.json      采集产物（勿手改，由脚本生成）
│   └── quantizers/*.md    量化者档案（人工撰写）
├── docs/
│   ├── SCHEMA.md          数据结构定义 + 字段来源对照
│   ├── METHODOLOGY.md     选型方法 + 能说/不能说的边界
│   ├── LEGAL.md           五原则 + 已知风险处置
│   ├── audit-report.json  审计报告
│   └── selection-*.json   选型过程数据（可追溯「为什么选这几个」）
├── scripts/
│   ├── select-models.mjs  选型 v1（下载榜反推 + 四维打分）
│   ├── select-v2.mjs      选型 v2（降噪 + 厂商定向）
│   ├── select-v3.mjs      选型 v3（定稿核对）
│   ├── collect-models.mjs 正式采集
│   ├── audit-licenses.mjs 建站前强制审计
│   └── build.mjs          生成站点
└── site/                  站点产物
```

## 常用命令

```bash
# ① 采集（注意 hf-mirror 限流，串行 900ms 间隔；耗时随系列数增长，系列数见文末实测规模）
node scripts/collect-models.mjs

# ② 后处理：重新套用档名规则（**必须有这一步**）
#    实测新采数据里混进 210 个非权重文件（mmproj / tokenizer / imatrix …），
#    跳过它会让页面建议「直接下 非权重文件（0.0 GB，未识别）」，models-check 会报「未识别」。
#    它同时重算 coverage / totalGB / recommended。
node scripts/fix-quants.mjs

# ③ 回填量化变体的许可（**必须有这一步**）
#    实测多数 HF 量化仓的 model card 里就没有 license 字段（bartowski / AtomicChat / AesSedai …），
#    不是采集失败 —— 量化是权重的数学变换，许可必然继承基座。
#    脚本会写 licenseInherited + licenseFrom 留痕，页面据此标注「继承自基座」。
node scripts/backfill-license.mjs

# ④ 审计（不合规则 exit 1，中止建站）
node scripts/audit-licenses.mjs

# ⑤ 建站
node scripts/build.mjs
```

> ⚠ **第 ②③ 步曾在 README 里漏写**（2026-10-09 A6.5 补录时连续踩到：直接跳到审计，
> 先报「量化变体缺 license」中止建站，补了回填后又发现页面上有「未识别」）。
> **采集之后、审计之前，这两步都不能省。**

## 改系列名单的流程

1. 编辑 `config.js` 的 `SERIES` 数组
2. **同步两个翻译文件**（否则英文态露出中文，构建会 warn 报缺键）
   - `summaries.en.json` —— 键 = `<seriesCode>`
   - `member-notes.en.json` —— 键 = `<seriesCode>|<repo名>`
3. 重跑 `collect-models.mjs`
4. 跑 `fix-quants.mjs`（删非权重文件，见上方警告）
5. 跑 `backfill-license.mjs`（见上方警告）
6. 跑 `audit-licenses.mjs` 确认合规
7. 跑 `build.mjs` 生成
8. **同步跨站数字**：`_data/handbook/terms/terms/参数.md`（「N 系列 M 规格」）、`www.specul/index.html` 的徽标
   —— 这两处有 `_audit/content-freshness.mjs` 的「www枢纽」/learn 守卫盯着，漂了会报
9. 部署

**不要手改 `data/series/*.json`** —— 那是脚本产物，下次采集会被覆盖。

## 采集时踩过的坑（都写在代码注释里了）

| 坑 | 症状 | 解法 |
|---|---|---|
| **hf-mirror 限流静默失败** | 请求过密时返回非 200，看起来像 404 | 串行 + 900ms 固定间隔 + 指数退避 |
| **search 接口串模型** | 搜 `DeepSeek-V4-Flash` 搜出 `Qwen3.5-9B-DeepSeek-V4-Flash` | 硬过滤：仓名去掉 GGUF 后必须**等于**模型标识 |
| **微调衍生仓混入** | abliterated / uncensored / Distilled 下载量极高，霸占榜单 | `DERIVED` 正则排除；这些是二次发布不是量化版 |
| **`cardData.base_model` 不可靠** | 官方 GGUF 仓根本没这字段 | 不用它做锚定，改用仓名严格匹配 |
| **官方 GGUF 搜不到** | `openbmb/MiniCPM5-2B-GGUF` 索引缺失 | 按 `<org>/<Model>-GGUF` 约定名直接探测 |
| **bash 引号破坏 node 脚本** | `node -e` 里 `!==` 被 shell 吞 | 一律写成 `.mjs` 文件 |

## 法律立场

**只索引、只引述、不托管、不解读许可、不给法律意见。**

详见 [`docs/LEGAL.md`](docs/LEGAL.md)。核心是：我们只整理公开元数据并标注出处，
权重要下、去哪儿下、能不能商用——是发布者和你之间的事。

## 数据准确性承诺

| 级别 | 含义 | 页面标记 |
|---|---|---|
| **A 客观事实** | 直接从 API 读到的字段 | ✅ 实测字段 |
| **B 参数推导** | 由 A 按公开规则算出 | ✅ 推导 |
| **C 主观判断** | 我们的口径 | ❌ 我们的口径 |

**我们不写 C 级内容而不加标注。** 质量优劣、速度快慢这类需要实测的断言，本站一律不给。

## 相关站点

| 站点 | 作用 |
|---|---|
| [specul.com](https://specul.com/) | 首页 · 总入口 |
| [nav.specul.com](https://nav.specul.com/) | 导航 · AI 站点目录 |
| [tools.specul.com](https://tools.specul.com/) | AI 工具 · 现成的 AI 工具 / 自己搭（进阶） / 给 AI 装工具 |
| [learn.specul.com](https://learn.specul.com/) | 术语表 · 概念层 |
| [vg.specul.com](https://vg.specul.com/) | AI 做游戏 · 实践层 |

<!-- INDEX:BEGIN generated, do not edit -->

## 内容索引

| 系列 | 厂商 | 发布时间 | 模型仓 | 量化档 | 规模 |
|---|---|---|---|---|---|
| [DeepSeek V4](data/series/deepseek-v4.json) | DeepSeek | 2026-09-10 | 1 | 5 | MIT 许可，量化生态活跃，antirez（llama.cpp 作者）亲自维护… |
| [Gemma 4](data/series/gemma-4.json) | Google | 2026-06 | 3 | 26 | Google 开放权重最新一代，三种规格各自都有量化覆盖。 |
| [GLM 5](data/series/glm-5.json) | 智谱 AI | 2026-08-25 | 2 | 13 | 智谱当前最新一代，MIT 许可的 Flash 版对本地部署最友好。 |
| [gpt-oss](data/series/gpt-oss.json) | OpenAI | 2025-08-04 | 1 | 6 | OpenAI 唯一开放权重系列，20B 版是单卡本地部署的甜点。 |
| [KAT Coder V2.5](data/series/kat-coder.json) | Kwaipilot | 2026-07-23 | 1 | 6 | 面向代码的开放权重系列，apache-2.0，34 个第三方量化仓。 |
| [Kimi K3](data/series/kimi-k3.json) | 月之暗面 | 2026-06-13 | 1 | 10 | 月之暗面当前最新一代，41 家量化仓但整体热度中等。 |
| [Laguna 2.1](data/series/laguna.json) | Poolside | 2026-06-20 | 1 | 6 | 代码方向的开放权重系列，许可为 OpenMDW-1.1（使用前须读原文）。 |
| [MiniCPM 5](data/series/minicpm5.json) | 面壁智能 · OpenBMB | 2026-08-27 | 1 | 10 | 国产小尺寸代表，2B 规模适合低显存与端侧。 |
| [Muse Glimmer](data/series/muse-glimmer.json) | Meta | 2026-08-09 | 1 | 10 | Meta 的开放权重系列，apache-2.0，量化覆盖横跨多家主力量化者。 |
| [Ornith 1.5](data/series/ornith-1-5.json) | Ornith AI | 2026-08-18 | 2 | 20 | MIT 许可，两个规格的 GGUF 生态总量是本次盘点里最高的。 |
| [千问 3.8](data/series/qwen3-8.json) | 阿里 · 通义千问 | 2026-08-05 | 2 | 17 | 阿里当前最新一代，27B 密集模型是本地部署圈热度最高的一个。 |

<!-- INDEX:END -->

## 实测规模（A8）

<!-- STATS:BEGIN generated, do not edit -->
| 项 | 实测值 |
|---|---|
| 系列 | 11 个 |
| 模型仓（members） | 16 个 |
| 量化档（variants） | 129 个 |
| GGUF 文件 | 1270 个 |
| 量化者 | 54 位 |
| 家族谱系卡（families） | 15 张 |
| 闭源谱系卡（closed） | 6 张 |
| 基座许可分布 | apache-2.0 8 · mit 4 · other 3 · openmdw-1.1 1 |
<!-- STATS:END -->
