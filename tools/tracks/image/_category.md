# image 大类收录声明

**主题**：AI 图像创作——文生图与图像编辑产品，输入文字/图、输出图。
定义与边界裁决见 [../../categories.md](../../categories.md) §3。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **图像生成或图像编辑是产品主功能**（不是通用软件里的 AI 滤镜） |
| 2 | 有官方产品页与能力文档 |
| 3 | 能回答「产物归谁/能否商用」至少一条官方条款（permissions 维可答） |

**形态归属**

决定 `form:` 取值。⚠ 下表第一列不加反引号，audit.mjs 按这个判据检查。

| 形态 | 判据 |
|:--|:--|
| web | 主入口是网页应用（Midjourney 网页、playground 类） |
| cloud | 主入口是 API/平台服务（给开发者调模型接口） |
| local-app | 官方桌面客户端且本机跑生成 |

**边界情况**：

| 情况 | 处理 |
|---|---|
| 通用创意套件的 AI 功能（修图软件生成填充） | 不收（AI 是次要功能） |
| 3D 生成 | 不收（本类只管 2D 图像） |
| 图像生成 API 平台 | 归 `image`，`form: cloud`（API 入口在档案注明） |
| 开源权重可自托管的模型家族 | 收官方产品档案，自托管路径在正文注明 |

## 收录对象（15 份）

| id | 名称 | 厂商 | 形态 | 状态 |
|---|---|---|---|---|
| `jimeng` | 即梦 | 字节跳动（剪映团队） | 网页服务 | 8 项已核 · 活跃 |
| `tongyi-wanxiang` | 通义万相 | 阿里巴巴 | 网页服务 | 8 项已核 · 活跃 |
| `adobe-firefly` | Adobe Firefly | Adobe | 网页服务 | 8 项已核 · 活跃 |
| `clipdrop` | Clipdrop | Jasper（原 InitML，2023 并入 Stability AI，2024-02 售予 Jasper） | 网页服务 | 8 项已核 · 活跃 |
| `flux` | FLUX（Black Forest Labs） | Black Forest Labs | 厂商云 | 8 项已核 · 活跃 |
| `ideogram` | Ideogram | Ideogram | 网页服务 | 8 项已核 · 活跃 |
| `krea` | Krea | Krea | 网页服务 | 8 项已核 · 活跃 |
| `leonardo-ai` | Leonardo AI | Leonardo（2024-07 被 Canva 收购） | 网页服务 | 8 项已核 · 活跃 |
| `microsoft-designer` | Microsoft Designer | 微软 | 网页服务 | 8 项已核 · 活跃 |
| `midjourney` | Midjourney | Midjourney, Inc. | 网页服务 | 8 项已核 · 活跃 |
| `playground` | Playground | AI Playground, Inc. | 网页服务 | 8 项已核 · 活跃 |
| `recraft` | Recraft | Recraft | 网页服务 | 8 项已核 · 活跃 |
| `seaart` | SeaArt | 海艺（成都海艺互娱） | 网页服务 | 8 项已核 · 活跃 |
| `stability-ai` | Stability AI（Stable Image 平台） | Stability AI | 网页服务 | 8 项已核 · 活跃 |
| `tensor-art` | Tensor.Art | ECHO INTERNATIONAL HK LIMITED（Tensor.Art） | 网页服务 | 8 项已核 · 活跃 |

> 共 **15** 份。本清单由 `scripts/gen-category-docs.mjs` 从 `products/*.md` 自动生成；改档案后重跑脚本，不要手改表格。

> 状态读法：左边是「这页的证据是否齐」，右边是「上游产品还在不在更新」。停更不等于资料残缺。
