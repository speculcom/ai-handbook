---
id: drake
form: harness
family: robotics
name: Drake
nameEn: Drake
vendor: Robot Locomotion Group / MIT
homepage: https://drake.mit.edu/
mark: DK
accent: "#8E24AA"
providers:
  - 模型/策略无关：官方 README 未列 provider 清单（本站判断，2026-11-07 核验）
  - 外部策略或模型接入通常经用户代码与生态集成，具体 provider 支持以官方文档为准

axes:
  model_access: >-
    Drake 本身不是模型产品。官方文档未列模型 provider 清单。策略或模型接入经用户代码、LCM/ROS 2 集成或外部训练框架完成。官方定位是 C++/Python 工具箱。

    用于机器人动力学分析与控制系统构建。模型层由用户自带（2026-11-21）。
  runtime: >-
    Drake 以 C++/Python 库在本机进程内运行。官方支持 Ubuntu 24.04/26.04、macOS Tahoe/Golden Gate 与 Amazon Linux 2023。

    提供 pip、APT、二进制包和源码构建四种方式。不是托管云服务，也不提供浏览器端运行面（官方 Installation 页，2026-11-21）。
  local_files: >-
    Drake 读写本地场景、模型、配置与数据资产。安装内容默认落在 /opt/drake 或 Python 虚拟环境。文件权限与资产许可由用户核对。

    它不替用户管理训练数据版权、机器人工作区安全或云存储同步（官方安装文档，2026-11-21）。
  background: >-
    Drake 不提供托管调度、作业队列或服务端常驻进程。仿真、求解与可视化都在用户启动的 Python/C++ 进程内运行。后台执行取决于操作系统与用户自己的进程管理。

    官方文档只描述库的构建与调用。未列断点续跑、分布式调度或作业恢复服务（2026-11-21）。
  tools: >-
    Drake 以 C++/Python API 为主。配套 pydrake、MathematicalProgram 求解器、Meshcat 可视化、LCM 与 ROS 2 集成。

    官方文档列 Python、LCM、ROS 2（unsupported）、Julia（unsupported）四类集成。未列 MCP 服务器或 agent 工具协议（2026-11-21）。
  context: >-
    不适用：Drake 不是对话模型，没有 LLM 上下文窗口。状态由场景文件、配置、节点状态或用户代码中的 checkpoint 承载。

    跨会话记忆、提示词上下文与多轮对话管理不属于它的能力面（2026-11-21）。
  permissions: >-
    权限完全跟随操作系统与宿主进程。Drake 不引入账号、角色或云端 ACL。读取模型/场景、访问机器人设备与网络均按进程权限执行。涉及实机时，急停、设备访问和网络隔离由用户配置。

    官方安装文档只列平台与依赖。未定义统一权限模型（2026-11-21）。
  fit: >-
    适合：机器人动力学建模。接触/摩擦仿真。轨迹优化。控制设计与验证，以及需要暴露方程结构（稀疏性、解析梯度、多项式结构）的规划算法研究。

    不适合：开箱即用的 ROS 导航栈。云端仿真服务或通用游戏引擎式内容制作（2026-11-21）。
pitfalls:
  - 以为它是通用仿真游戏引擎——它偏模型化分析与优化
  - 忽略求解器选择与约束建模对结果的影响

tags: [开源, 本地]
related: [llama-cpp]

sources:
  - label: RobotLocomotion/drake · 官方仓库（2026-11-07 README 直抓 200）
    url: https://github.com/RobotLocomotion/drake
    kind: repo
  - label: 官方 README（定位与能力描述，2026-11-07 直抓 200）
    url: https://raw.githubusercontent.com/RobotLocomotion/drake/master/README.md
    kind: docs

  - label: Commit history（变更记录入口，版本以 Releases 页为准，2026-11-21）
    url: https://github.com/RobotLocomotion/drake/commits/
    kind: changelog

  - label: Drake · 官方首页（定位、核心库与集成清单，2026-11-21 抓取 200）
    url: https://drake.mit.edu/index.html
    kind: docs
  - label: Drake · Installation and Quickstart（支持平台与安装方式，2026-11-21 抓取 200）
    url: https://drake.mit.edu/installation.html
    kind: docs

link:
  url: https://drake.mit.edu/
  kind: official

last_verified: 2026-11-21
last_updated: 2026-11-21
lifecycle: active
confidence: verified
cn:
  origin: foreign
  origin_note: 国外主体或国际开源社区。网信办公示名单适用性按产品是否面向大陆公众判断。
  origin_note_en: Foreign entity or international open-source community; CAC registry applicability depends on whether the product serves the mainland public.
  direct: unknown
  direct_note: 官方仓库 raw README 与官网文档取得 200。官网与安装源的大陆链路质量按实际网络环境核对。
  direct_note_en: Official repository raw README and site docs returned 200; mainland link quality to the site and install sources must be checked against the actual network.
  filing: unknown
  filing_note: 未见于网信办公示名单检索记录。该产品为开源软件，备案适用性按实际分发方式判断。
  filing_note_en: Not found in the CAC public-registry check; this is open-source software and filing applicability depends on how it is distributed.
  verified: 2026-11-21
---

## 一句话定位

**Drake（Drake）是机器人软件栈对象。
**模型化设计与验证工具箱，偏控制与优化。

## 适合与不适合

适合：动力学建模、轨迹优化与控制系统分析。
不适合：开箱即用的 ROS 导航或大模型策略训练。

## 实测记录

本档核对官方文档的支持平台、安装方式与集成清单。
安装体积、求解器性能与实机部署需按项目环境另行评估。

## 未知项清单

- 国内网络到官网与安装源的链路质量、以及备案适用性，需按实际网络环境核对。本档不推断。
- 上游版本节奏以 GitHub Releases 页为准。具体版本兼容性按 Release Notes 核对。
- 官方文档未列 MCP 服务器。如需 MCP 接入需自行封装 Python/C++ API。
## 相关条目

- [llama.cpp](../../runner/products/llama-cpp.md) — 另一类：本地模型运行器。策略需要本地推理时看它。
