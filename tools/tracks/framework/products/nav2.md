---
id: nav2
form: harness
family: robotics
name: Nav2
nameEn: Nav2
vendor: ROS Navigation
homepage: https://docs.nav2.org/
mark: N2
accent: "#2E7D32"
providers:
  - 模型/策略无关：官方 README 只覆盖运行器本身，不列 provider 清单（本站判断，2026-11-07 核验）
  - 外部策略或模型接入通常经用户代码与生态集成，具体 provider 支持以官方文档为准

axes:
  model_access: >-
    Nav2 本身不是模型产品。官方 README 只覆盖运行器本身。不列模型 provider 清单。策略或模型接入通常经用户代码与生态集成。

    本站记为模型/策略无关（本站判断，核验范围限 README）。
  runtime: >-
    Nav2 以库/框架形态在本机进程中使用。通常经 Python/C++ 或 ROS 生态调用。不是托管云服务。具体安装与平台支持以官方 README/文档为准，本档不含本机实测。
  local_files: >-
    Nav2 会读写本地配置、场景、模型或数据资产。文件权限与资产许可需用户自行核对。它不替用户管理训练数据版权或机器人工作区安全。
  background: >-
    节点或训练进程可在后台运行。关机续跑、分布式与故障恢复不是本次核验范围。需按官方部署文档核对。
  tools: >-
    Nav2 提供命令行、插件或生态接口（如 ROS 话题/服务、仿真插件、策略训练接口）。MCP 接入不在官方 README 列出的命令行/插件/ROS 接口面内。
  context: >-
    不适用：Nav2 不是对话模型，没有 LLM 上下文窗口。状态由配置、场景、节点状态或训练 checkpoint 承载。
  permissions: >-
    权限跟随操作系统与运行环境。涉及机器人硬件时还要核对设备访问、网络与急停边界。官方 README 只给运行入口，不设统一权限模型。本档不含本机实测。
  fit: >-
    适合：移动机器人自主导航与行为编排；需要 TF 树与传感器配置。不适合：机械臂操作规划或非 ROS 系统。
pitfalls:
  - 以为导航栈开箱即适应所有底盘——控制器与代价图参数要调
  - 把行为树当黑盒，忽略恢复行为与插件边界

tags: [开源, 本地]
related: [llama-cpp]

sources:
  - label: ros-navigation/navigation2 · 官方仓库（2026-11-07 README 直抓 200）
    url: https://github.com/ros-navigation/navigation2
    kind: repo
  - label: 官方 README（定位与能力描述，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/ros-navigation/navigation2/main/README.md
    kind: docs

  - label: Commit history（变更记录入口，2026-11-07 按版本节点引用）
    url: https://github.com/ros-navigation/navigation2/commits/
    kind: changelog

link:
  url: https://docs.nav2.org/
  kind: official

last_verified: 2026-11-07
last_updated: 2026-11-07
lifecycle: active
confidence: verified
cn:
  origin: foreign
  origin_note: 国外主体或国际开源社区；备案名单不在本档核验范围。
  origin_note_en: Foreign entity or international open-source community; the CAC public registry was not searched in this pass.
  direct: unknown
  direct_note: 官方仓库 raw README 直抓 200；官网/安装源国内直达本档不含本机实测。
  direct_note_en: Official repository raw README fetched 200; direct mainland access to the website/install source was not tested here.
  filing: unknown
  filing_note: 备案名单不在本档核验范围；不做备案推断。
  filing_note_en: Filing registry not searched; recorded as unknown without inferring filing status.
  verified: 2026-11-07
---

## 一句话定位

**Nav2 是 ROS 2 导航栈，用行为树组织定位、规划与恢复。**

## 适合与不适合

适合：移动机器人自主导航与行为编排。
不适合：机械臂操作规划或非 ROS 系统。

## 实测记录

本档为官方文档核验，不含本机实测记录。最小起步：先按官方安装矩阵确认版本与依赖，再跑官方示例；不要把示例结果直接当成生产验证。

## 未知项清单

- 国内官网/安装源直达与备案状态本档不含本机实测。
- 上游最近推送/发布节奏按季度更新，本档不逐日追踪。
- MCP 接入不在官方 README 列出的接口面内。

## 相关条目

- [llama.cpp](../../runner/products/llama-cpp.md) — 另一类：本地模型运行器；策略需要本地推理时看它。
