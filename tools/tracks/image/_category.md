# image 大类收录声明

**主题**：AI 图像创作——文生图与图像编辑产品，输入文字/图、输出图。
定义与边界裁决见 [../../categories.md](../../categories.md) §3。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **图像生成或图像编辑是产品主功能**（不是通用软件里的 AI 滤镜） |
| 2 | 有官方产品页与能力文档 |
| 3 | 能回答「产物归谁/能否商用」至少一条官方条款（permissions 维可答） |

**形态归属**（决定 `form:` 取值；⚠ 下表第一列不加反引号——audit.mjs 判据）：

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

## 收录对象（3 份）

| id | 名称 | 厂商 |
|---|---|---|
| `midjourney` | Midjourney | Midjourney, Inc. |
| `stability-ai` | Stability AI（Stable Image 平台） | Stability AI |
| `flux` | FLUX | Black Forest Labs |

> 候选全集与去向见 `inventory/image.md`（T11 盘点后建立）。
