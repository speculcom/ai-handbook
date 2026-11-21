# framework 大类收录声明

**主题**：框架与运行时——给**程序**用的 agent SDK / 编排框架，以及机器人中间件、仿真器与学习栈。你在代码里搭 agent，或驱动仿真与策略。
定义与边界裁决见 [../../categories.md](../../categories.md) §9。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **面向开发者**，通过代码使用（SDK / 库 / 框架 / 可脚本化的仿真运行时） |
| 2 | **核心能力是 agent 编排**（循环、工具调用、状态、多 agent）**或机器人运行时**（中间件、物理仿真、策略训练与部署栈） |
| 3 | **有官方文档或仓库**可核验八维 |

**形态归属**：agent 侧对象几乎全部 `form: harness`（库/框架形态）；机器人侧带图形界面的仿真器用 `form: local-app`，其余用 `harness`。`owns` 必须覆盖这两值，否则 `loadTrack()` 会静默跳过档案。

**family 分组**（决定首页矩阵怎么分组；⚠ 下表第一列不加反引号——audit.mjs 把「反引号小写词开头的 ≥3 列表格行」当档案声明）：

| family | 含义 |
|:--|:--|
| coding-base | 编程底座（原语层，拿来造编码 agent） |
| general-harness | 通用 harness（开箱倾向，自带循环与工具面） |
| orchestration | 编排框架（图 / 多 agent / 状态管理为主轴） |
| robotics | 机器人软件栈（中间件 / 仿真器 / 学习栈，family 必填同口径） |

**边界情况**：

| 情况 | 处理 |
|---|---|
| 可视化编排平台（画布搭应用） | 归 `automation`（判据：不写代码的界面是不是主轴） |
| 纯 LLM 调用库（只做 API 封装，无 agent 循环） | 不收（不满足标准 2），归 nav |
| 模型训练 / 微调框架（通用 LLM 训练，非机器人策略栈） | 不收（训练不是 agent 编排），归 nav |
| 成品编码 agent 的官方 SDK | 收本类（如 claude-agent-sdk），`related` 指向其成品档案 |
| 机器人本体、边缘算力盒、传感器、执行器、供电散热门槛 | 归 `hardware` 站（物理设备规格卡，不是软件栈） |
| 机器人概念词条与学习顺序（具身智能、仿真到实机迁移） | 归 `learn` 站；「我要做一个能动的机器人」这条路线归主站 `topic-robot.html` |
| 机器人策略的模型本体与量化档 | 归 `models` 站（模型不是产品，同全站口径） |

## 收录对象（42 份）

| id | 名称 | 厂商 | 形态 | 状态 |
|---|---|---|---|---|
| `ag2` | AG2 | ag2ai | 框架 / SDK | 8 项已核 · 活跃 |
| `agentscope` | AgentScope | 阿里巴巴（魔搭社区） | 框架 / SDK | 8 项已核 · 活跃 |
| `agno` | Agno（原 Phidata） | Agno Inc. | 框架 / SDK | 8 项已核 · 活跃 |
| `claude-agent-sdk` | Claude Agent SDK | Anthropic | 框架 / SDK | 8 项已核 · 活跃 |
| `codex-sdk` | Codex SDK | OpenAI | 框架 / SDK | 8 项已核 · 活跃 |
| `crewai` | CrewAI | CrewAI Inc | 框架 / SDK | 8 项已核 · 活跃 |
| `deepagents` | Deep Agents | LangChain | 框架 / SDK | 8 项已核 · 活跃 |
| `drake` | Drake | Robot Locomotion Group / MIT | 框架 / SDK | 8 项已核 · 活跃 |
| `dspy` | DSPy | Stanford NLP / Databricks | 框架 / SDK | 8 项已核 · 活跃 |
| `elizaos` | ElizaOS（Eliza） | ElizaOS 社区（Eliza Research） | 框架 / SDK | 8 项已核 · 活跃 |
| `gazebo` | Gazebo Sim | Open Robotics | 本机应用 | 8 项已核 · 活跃 |
| `genesis` | Genesis | Genesis Embodied AI | 框架 / SDK | 8 项已核 · 活跃 |
| `google-adk` | Google ADK（Agent Development Kit） | Google | 框架 / SDK | 8 项已核 · 活跃 |
| `haystack` | Haystack | deepset | 框架 / SDK | 8 项已核 · 活跃 |
| `hermes-agent` | Hermes Agent | Nous Research | 框架 / SDK | 8 项已核 · 活跃 |
| `isaac-lab` | Isaac Lab | NVIDIA | 框架 / SDK | 8 项已核 · 活跃 |
| `isaac-sim` | Isaac Sim | NVIDIA | 本机应用 | 8 项已核 · 活跃 |
| `langchain` | LangChain | LangChain, Inc. | 框架 / SDK | 8 项已核 · 活跃 |
| `langchain4j` | LangChain4j | LangChain4j 社区 | 框架 / SDK | 8 项已核 · 活跃 |
| `langgraph` | LangGraph | LangChain Inc | 框架 / SDK | 8 项已核 · 活跃 |
| `lerobot` | LeRobot | Hugging Face | 框架 / SDK | 8 项已核 · 活跃 |
| `letta` | Letta / MemGPT | Letta, Inc. | 框架 / SDK | 8 项已核 · 活跃 |
| `llamaindex` | LlamaIndex Framework | LlamaIndex（run-llama） | 框架 / SDK | 8 项已核 · 活跃 |
| `mastra` | Mastra | Mastra AI | 框架 / SDK | 8 项已核 · 活跃 |
| `microsoft-agent-framework` | Microsoft Agent Framework | Microsoft | 框架 / SDK | 8 项已核 · 活跃 |
| `moveit2` | MoveIt 2 | MoveIt | 框架 / SDK | 8 项已核 · 活跃 |
| `mujoco` | MuJoCo | Google DeepMind | 框架 / SDK | 8 项已核 · 活跃 |
| `nav2` | Nav2 | ROS Navigation | 框架 / SDK | 8 项已核 · 活跃 |
| `open-interpreter` | Open Interpreter | Open Interpreter（开源社区） | 框架 / SDK | 8 项已核 · 活跃 |
| `openai-agents-sdk` | OpenAI Agents SDK | OpenAI | 框架 / SDK | 8 项已核 · 活跃 |
| `openhands` | OpenHands Agent Canvas | OpenHands（All-Hands-AI） | 框架 / SDK | 8 项已核 · 活跃 |
| `pybullet` | PyBullet | Bullet Physics | 框架 / SDK | 8 项已核 · 活跃 |
| `pydantic-ai` | Pydantic AI | Pydantic | 框架 / SDK | 8 项已核 · 活跃 |
| `ros2` | ROS 2 | Open Robotics | 框架 / SDK | 8 项已核 · 活跃 |
| `semantic-kernel` | Semantic Kernel（SK） | Microsoft | 框架 / SDK | 8 项已核 · 活跃 |
| `smolagents` | smolagents | Hugging Face | 框架 / SDK | 8 项已核 · 活跃 |
| `spring-ai` | Spring AI | Spring（VMware/Broadcom） | 框架 / SDK | 8 项已核 · 活跃 |
| `strands-agents` | Strands Agents SDK | AWS | 框架 / SDK | 8 项已核 · 活跃 |
| `swe-agent` | SWE-agent | Princeton / Stanford（学术团队） | 框架 / SDK | 8 项已核 · 活跃 |
| `vercel-ai-sdk` | Vercel AI SDK 7 | Vercel | 框架 / SDK | 8 项已核 · 活跃 |
| `webots` | Webots | Cyberbotics | 本机应用 | 8 项已核 · 活跃 |
| `metagpt` | MetaGPT | DeepWisdom（深度赋智，国产） | 框架 / SDK | 有未核项 · 更新放缓 |

> 共 **42** 份。本清单由 `scripts/gen-category-docs.mjs` 从 `products/*.md` 自动生成；改档案后重跑脚本，不要手改表格。

> 状态读法：左边是「这页的证据是否齐」，右边是「上游产品还在不在更新」。停更不等于资料残缺。
