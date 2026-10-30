# AI 手册（ai-handbook）

> English version: [README.en.md](./README.en.md)

一本手册，三部分：**学 AI · 用 AI 工具 · 跑 AI 模型**。中文为主、中英双语，每条判断带官方出处。

这是 specul.com 站群三个内容栏目的**合并仓**（2026-10，v7 D8）：此前三个栏目各有一个仓（ai-glossary / ai-agent-guide / ai-quantized-llm），内容与品牌资产各自漂移，改一处要修三处。合并后一套核心只有一份——三个子树共用 `shared/` 的品牌与外壳，数字口径与门禁全站一致。

## 三个子树

| 子树 | 回答的问题 | 渲染成哪个站 |
|---|---|---|
| `terms/` | 这些名词是什么、为什么要知道它？ | [learn.specul.com](https://learn.specul.com/) |
| `tools/` | 该用哪个 agent / 运行时 / 工具？ | [tools.specul.com](https://tools.specul.com/) |
| `models/` | 同一模型几十个量化版，我该下哪个？ | [models.specul.com](https://models.specul.com/) |

每个子树有自己的 `README.md`（内容地图、字段规范、校验器），本文件只放总目录与共同纪律。

## 共享核心（宪章：只有一份）

`shared/brand/` 是全站品牌资产（`brand.css` / `brand.js` / `shell.mjs` / `site.css`）在本仓内的**唯一** vendored 副本，三个子树的构建都从这里取。真相源在工作区 `www.specul/` 与 `_sites/_template/`；副本一致性由 `_audit/brand-sync.mjs` 强制（子树里再出现 `brand/` 目录即门禁失败）。

## 共同纪律

1. **固定维度对比** —— 维度不因对象而变，横向才可比
2. **每条判断挂官方源** —— 不凭印象，链接指向发布页或源码
3. **未知是合法答案** —— 查不到就说查不到，不编
4. **不给总分排名** —— 加权总分掩盖取舍，取舍才是决策依据
5. **只索引，不托管** —— 不下载、不再分发第三方权重或二进制

## 构建与校验

- 三站构建入口：`terms/scripts/build.mjs` · `tools/sites/build.mjs` · `models/scripts/build.mjs`（各自只读本仓，一次 clone 可构建三站）
- 三个校验器：各子树 `scripts/validate.mjs`，数据不合规直接失败退出
- 本文件的统计块与 `llms.txt` 由 `_audit/gen-repo-docs.mjs` 从三个子树的数据生成，勿手改

## 实测规模（A8）

<!-- STATS:BEGIN generated, do not edit -->
| 项 | 实测值 |
|---|---|
| terms · 词条 | 200 词 |
| terms · 分站 | 进门 35 · 上手 35 · 用深 35 · 看懂 35 · 跑起来 30 · 选得对 30 |
| terms · 学习路径 | 8 条（精选有序路径 · 各带检查点） |
| terms · 微型指南 | 58 篇（5-10 分钟一篇 · 英文覆盖 58/58） |
| terms · 编年史与版图 | 18 条时间线 · 12 家公司 · 5 条术语演变 |
| terms · 领域（domain） | concept 56 · infra 34 · choice 33 · agent 25 · media 19 · model 14 · dev 10 · data 9 |
| terms · 用途（purposeTag） | learn 80 · apply 49 · guard 36 · judge 35 |
| terms · 出处条目（refs） | 481 条 |
| terms · 英文覆盖 | 200 / 200 |
| tools · 档案总数 | 198 份 |
| tools · 大类分布 | coding 41 · chat 20 · image 13 · video 12 · audio 17 · research 11 · automation 22 · framework 22 · mcp 28 · runner 12 |
| tools · 形态分布（form） | web 88 · mcp 28 · harness 22 · cli 19 · ide 19 · cloud 14 · local-app 8 |
| tools · 对比维度 | 8 维（mcp 大类另加传输 / 认证 / 范围 3 维） |
| models · 系列 | 11 个 |
| models · 模型仓（members） | 16 个 |
| models · 量化档（variants） | 129 个 |
| models · GGUF 文件 | 1270 个 |
| models · 量化者 | 54 位 |
| models · 家族谱系卡（families） | 15 张 |
| models · 闭源谱系卡（closed） | 6 张 |
| models · 基座许可分布 | apache-2.0 8 · mit 4 · other 3 · openmdw-1.1 1 |
<!-- STATS:END -->

## 许可

自有内容 CC BY 4.0；数据层逐条引述第三方原文（模型许可以各发布页原文为准）。
**产品名与商标归各权利方所有，本仓与全站仅作识别与评论之用**（L3 声明，与全站页脚同一句口径）。
