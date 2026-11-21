# video 大类收录声明

**主题**：AI 视频创作——文生视频、图生视频与 AI 原生视频编辑产品。
定义与边界裁决见 [../../categories.md](../../categories.md) §4。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **视频生成 / AI 视频编辑是产品主功能** |
| 2 | 有官方产品页与能力文档 |
| 3 | 产物条款可核验（permissions 维可答） |

**形态归属**（决定 `form:` 取值；⚠ 下表第一列不加反引号——audit.mjs 判据）：

| 形态 | 判据 |
|:--|:--|
| web | 主入口是网页应用（生成工作室形态） |
| cloud | 主入口是 API/云服务（模型经云 API 交付） |

**边界情况**：

| 情况 | 处理 |
|---|---|
| 剪辑软件里的 AI 功能（自动字幕、智能剪） | 不收（AI 是次要功能） |
| 数字人 / 直播推流工具 | 只进 nav，除非生成视频是其主功能 |
| 视频理解 / 分析产品 | 归 `research` 或 nav |
| 模型经多家云 API 提供（Veo 类） | 收模型家族档案，入口在 runtime 注明 |

## 收录对象（14 份）

| id | 名称 | 厂商 | 形态 | 状态 |
|---|---|---|---|---|
| `hailuo-video` | 海螺视频 | MiniMax（稀宇科技） | 网页服务 | 8 项已核 · 活跃 |
| `kling` | 可灵 Kling AI | Kling AI Pte. Ltd.（快手） | 网页服务 | 8 项已核 · 活跃 |
| `d-id` | D-ID | D-ID | 网页服务 | 8 项已核 · 活跃 |
| `genmo` | Genmo | Genmo | 网页服务 | 8 项已核 · 活跃 |
| `heygen` | HeyGen | HeyGen | 网页服务 | 8 项已核 · 活跃 |
| `higgsfield` | Higgsfield | Higgsfield AI | 网页服务 | 8 项已核 · 活跃 |
| `invideo` | invideo AI | invideo | 网页服务 | 8 项已核 · 活跃 |
| `luma` | Luma（Dream Machine） | Luma AI | 网页服务 | 8 项已核 · 活跃 |
| `pika` | Pika | Pika Labs | 网页服务 | 8 项已核 · 活跃 |
| `pixverse` | PixVerse | 爱诗科技 | 网页服务 | 8 项已核 · 活跃 |
| `runway` | Runway | Runway AI, Inc. | 网页服务 | 8 项已核 · 活跃 |
| `synthesia` | Synthesia | Synthesia | 网页服务 | 8 项已核 · 活跃 |
| `veo` | Veo（Google） | Google | 厂商云 | 8 项已核 · 活跃 |
| `vidu` | Vidu | 生数科技（清华系） | 网页服务 | 8 项已核 · 活跃 |

> 共 **14** 份。本清单由 `scripts/gen-category-docs.mjs` 从 `products/*.md` 自动生成；改档案后重跑脚本，不要手改表格。

> 状态读法：左边是「这页的证据是否齐」，右边是「上游产品还在不在更新」。停更不等于资料残缺。
