# frontier · 新分站内容源

这个目录放 2026-11-07 之后新建的四个分站的内容源，与 `terms/`（学 AI）、`tools/`（AI 工具）、`models/`（AI 模型）并列，同属 `speculcom/ai-handbook` 内容仓。一个内容源仓可以喂多个网站仓，源与产物分开维护。

| 目录 | 分站 | 域名 | 真相源 | 构建器 |
|---|---|---|---|---|
| `demos/` | 作品库 | `demos.specul.com` | `entries.json`、`ledger.json`、`shots/`、`intake/` | `scripts/build.mjs` |
| `hardware/` | AI 硬件与算力 | `hardware.specul.com` | `entries.json` | `scripts/build.mjs` |
| `papers/` | 论文 | `papers.specul.com` | `entries.json` | `scripts/build.mjs` |
| `chain/` | 链 × AI | `chain.specul.com` | `entries.json` | `scripts/build.mjs` |

## 目录约定

- `<key>/` 是内容源，`<key>/site/` 是构建产物，**不要手改 `site/` 里的文件**。
- 三个 mini 站（hardware / papers / chain）共用 `_sites/_template/mini-site-build.mjs`，字段结构见该构建器头部注释；源目录由 `_sites/registry.json` 的 `srcRoot` 指定。
- 作品库是独立构建器，另有 `scripts/capture.mjs` 用于按许可依据截图并登记台账。
- 条目写入走 `intake/<id>.json` 片段，再由主流程合并进 `entries.json`；不要让多个写入方同时改同一个 `entries.json`。

## 构建

在工作区根目录运行：

```bash
node _data/handbook/frontier/demos/scripts/build.mjs
node _data/handbook/frontier/hardware/scripts/build.mjs
node _data/handbook/frontier/papers/scripts/build.mjs
node _data/handbook/frontier/chain/scripts/build.mjs
```

任何一页重建后，最后要重建全站搜索，并跑 `node _audit/build-correct.mjs --check`。

## 口径

不跑 benchmark、不写「最好 / 最强」、不排名；每条判断挂官方来源与核验日；查不到写未知；翻译不刷新 `last_verified`。未上线站的 `live` 状态在 `_sites/registry.json` 里，发布器、线上核对与搜索索引都会跳过它们。
