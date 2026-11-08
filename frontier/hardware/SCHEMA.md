# AI 硬件与算力 · 内容规范

真相源：`entries.json`，每条一个对象。构建器 `_sites/_template/mini-site-build.mjs` 只做投影，页面里的数字一律由数据算。

## 条目字段

| 字段 | 类型 | 要求 |
|---|---|---|
| `id` | 字符串 | 小写英文与连字符，全站唯一 |
| `title` | `{zh, en}` | 双语，短名词，不含「最好 / 最强」 |
| `category` | 字符串 | `accelerator` / `system` / `edge` / `robot-body` / `sensor` / `cloud` 之一 |
| `url` | URL | 官方 datasheet、规格页或产品文档 |
| `license` | 对象 | `kind` 或 `spdx`、`evidenceUrl`、`checkedAt` 必填 |
| `evidence` | 数组 | 每条含 `url` 与 `quote`（官方原文短句），至少 1 条 |
| `notes` | `{zh, en}` | 这张卡回答什么、不回答什么 |
| `verifiedAt` | 日期 | 实际核对日期，不批量刷新 |
| `specs` | 对象 | 可选事实维度，如显存容量、带宽、功耗、接口、尺寸；值只写官方给出的数 |

## 内容边界

- 本站只收**物理设备及其规格与预算**：芯片、加速卡、整机与多卡组合、云算力规格、机器人本体、边缘算力盒、传感器、执行器、供电与散热门槛。
- ROS2 / Isaac / Gazebo / MuJoCo / LeRobot 等 SDK 与仿真器是**软件栈**，归 `tools` 站档案与 `learn` 概念，本站不收。
- 模型、量化档、GGUF 归 `models` 站；本站只写跑这些模型需要的硬件条件。
- 性能数字只引官方口径并注明测试条件；不横排总分、不跑 benchmark、不写「最强 / 最划算」。
- 规格过时是常态：每条挂官方页面与核验日，查不到的字段留空并在 `notes` 说明，不推测填充。

## 写入流程

新增条目先写 `intake/<id>.json` 片段，由主流程合并进 `entries.json`（去重、校验必填字段、检查跨站引用目标存在）。不要让多个写入方同时改 `entries.json`。合并后重建本站、跑 `_audit/mini-site-check.mjs`，最后重建全站搜索。
