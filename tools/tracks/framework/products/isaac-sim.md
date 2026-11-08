---
id: isaac-sim
form: local-app
family: robotics
name: Isaac Sim
nameEn: Isaac Sim
vendor: NVIDIA
homepage: https://docs.isaacsim.omniverse.nvidia.com/
mark: IS
accent: "#76B900"

axes:
  model_access: >-
    Isaac Sim 本身不是模型产品；官方 README 未列模型 provider 清单。策略或模型接入通常经用户代码与生态集成，本站记为模型/策略无关（本站判断，核验范围限 README）。
  runtime: >-
    Isaac Sim 以本机应用形态运行，带图形界面；是否支持无头/服务器模式需按官方文档逐项核对，本次未实测。安装与 GPU/驱动要求以官方文档为准。
  local_files: >-
    Isaac Sim 会读写本地配置、场景、模型或数据资产；文件权限与资产许可需用户自行核对。它不替用户管理训练数据版权或机器人工作区安全。
  background: >-
    仿真服务/节点可在后台运行，但 GUI 关闭后的行为、无头模式与资源占用本次未实测；批量并行能力取决于硬件与配置。
  tools: >-
    Isaac Sim 提供命令行、插件或生态接口（如 ROS 话题/服务、仿真插件、策略训练接口）。MCP 接入方式官方 README 未说明，记为未知。
  context: >-
    不适用：Isaac Sim 不是对话模型，没有 LLM 上下文窗口；状态由配置、场景、节点状态或训练 checkpoint 承载。
  permissions: >-
    权限跟随操作系统与运行环境；涉及机器人硬件时还要核对设备访问、网络与急停边界。官方 README 未给统一权限模型，本次未实测。
  fit: >-
    适合：高保真仿真、传感器合成与 RTX 渲染。 不适合：低配机器或纯 CPU 批量训练。

pitfalls:
  - 以为普通 GPU 都能跑——官方有 RTX 与驱动要求
  - 把合成数据直接当真实分布，忽略域差距

tags: [开源, 本地]
related: [llama-cpp]

sources:
  - label: isaac-sim/IsaacSim · 官方仓库（2026-11-07 README 直抓 200）
    url: https://github.com/isaac-sim/IsaacSim
    kind: repo
  - label: 官方 README（定位与能力描述，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/isaac-sim/IsaacSim/main/README.md
    kind: docs

  - label: Commit history（变更记录入口，2026-11-07 未逐条核验版本）
    url: https://github.com/isaac-sim/IsaacSim/commits/
    kind: changelog

link:
  url: https://docs.isaacsim.omniverse.nvidia.com/
  kind: official

last_verified: 2026-11-07
last_updated: 2026-11-07
lifecycle: unknown
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体或国际开源社区；本次未检索网信办公示名单。
  origin_note_en: Foreign entity or international open-source community; the CAC public registry was not searched in this pass.
  direct: unknown
  direct_note: 官方仓库 raw README 直抓 200；官网/安装源国内直达本次未实测。
  direct_note_en: Official repository raw README fetched 200; direct mainland access to the website/install source was not tested here.
  filing: unknown
  filing_note: 未检索备案名单，记为未知；不推断是否备案。
  filing_note_en: Filing registry not searched; recorded as unknown without inferring filing status.
  verified: 2026-11-07
---

## 一句话定位

**Isaac Sim（Isaac Sim）是机器人软件栈对象。**基于 Omniverse 的机器人仿真与合成数据应用。

## 适合与不适合

适合：高保真仿真、传感器合成与 RTX 渲染。
不适合：低配机器或纯 CPU 批量训练。

## 实测记录

本站尚未完成实测。

## 未知项清单

- 国内官网/安装源直达与备案状态本次未实测。
- 上游最近推送/发布节奏本次未通过 API 核验，lifecycle 记为 unknown。
- MCP 接入方式官方 README 未说明。

## 相关条目

- [llama.cpp](../../runner/products/llama-cpp.md) — 另一类：本地模型运行器；策略需要本地推理时看它。
