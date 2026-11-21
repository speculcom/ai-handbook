# chat 大类收录声明

**主题**：AI 对话助手——网页/应用形态的通用聊天产品，含国产。
定义与边界裁决见 [../../categories.md](../../categories.md) §2。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **面向普通用户的通用对话产品**（含其官方 API 入口） |
| 2 | 官方披露了可用的模型信息或产品能力页（八维至少 model_access / runtime 可答） |
| 3 | 有官方文档或帮助中心可核验 |

**形态归属**（决定 `form:` 取值；⚠ 下表第一列不加反引号——audit.mjs 把「反引号小写词开头的 ≥3 列表格行」当档案声明）：

| 形态 | 判据 |
|:--|:--|
| web | 主入口是网页/云托管应用（绝大多数对话助手） |
| app | 主入口是桌面/移动客户端且核心体验在端上 |

**边界情况**：

| 情况 | 处理 |
|---|---|
| 编程向对话产品（编码 agent 聊天界面） | 归 `coding` |
| 搜索向对话产品（主打带引用的答案） | 归 `research` |
| 对话产品带代码能力（ChatGPT 能写代码） | 仍归 `chat`（官方自我定位是通用助手） |
| 云端常驻任务型 agent（Dot / Muse / Grok Bot） | 归 `coding`（`form: cloud`）——主轴是替你干活 |
| 客服机器人 / 垂直问答 / 角色扮演陪伴 | 不收 |

## 收录对象（23 份）

| id | 名称 | 厂商 | 形态 | 状态 |
|---|---|---|---|---|
| `doubao-chat` | 豆包 | 字节跳动 | 网页服务 | 8 项已核 · 活跃 |
| `hailuo-chat` | 海螺AI | MiniMax（稀宇科技） | 网页服务 | 8 项已核 · 活跃 |
| `stepfun` | 阶跃AI | 阶跃星辰 | 网页服务 | 8 项已核 · 活跃 |
| `yuanbao-chat` | 腾讯元宝 | 腾讯 | 网页服务 | 8 项已核 · 活跃 |
| `tongyi-qianwen` | 通义千问 | 阿里巴巴 | 网页服务 | 8 项已核 · 活跃 |
| `wenxin` | 文心 | 百度 | 网页服务 | 8 项已核 · 活跃 |
| `xinghuo-spark` | 讯飞星火 | 科大讯飞 | 网页服务 | 8 项已核 · 活跃 |
| `chatglm-chat` | 智谱清言 | 智谱 AI | 网页服务 | 8 项已核 · 活跃 |
| `chatgpt` | ChatGPT | OpenAI | 网页服务 | 8 项已核 · 活跃 |
| `claude-chat` | Claude（对话应用） | Anthropic | 网页服务 | 8 项已核 · 活跃 |
| `deepseek-chat` | DeepSeek | 深度求索 | 网页服务 | 8 项已核 · 活跃 |
| `gemini-chat` | Gemini（对话应用） | Google | 网页服务 | 8 项已核 · 活跃 |
| `grok-chat` | Grok | xAI | 网页服务 | 8 项已核 · 活跃 |
| `huggingchat` | HuggingChat | Hugging Face | 网页服务 | 8 项已核 · 活跃 |
| `kimi-chat` | Kimi | 月之暗面 Moonshot AI | 网页服务 | 8 项已核 · 活跃 |
| `le-chat` | Le Chat | Mistral AI | 网页服务 | 8 项已核 · 活跃 |
| `librechat` | LibreChat | LibreChat AI | 网页服务 | 8 项已核 · 活跃 |
| `manus` | Manus | Manus AI（Monica 团队） | 网页服务 | 8 项已核 · 活跃 |
| `meta-ai` | Meta AI | Meta | 网页服务 | 8 项已核 · 活跃 |
| `microsoft-copilot` | Microsoft Copilot | 微软 | 网页服务 | 8 项已核 · 活跃 |
| `open-webui` | Open WebUI | Open WebUI 社区 | 网页服务 | 8 项已核 · 活跃 |
| `poe` | Poe | Quora | 网页服务 | 8 项已核 · 活跃 |
| `reka-chat` | Reka Chat（Reka Playground / Edge Chat） | Reka AI, Inc. | 网页服务 | 8 项已核 · 活跃 |

> 共 **23** 份。本清单由 `scripts/gen-category-docs.mjs` 从 `products/*.md` 自动生成；改档案后重跑脚本，不要手改表格。

> 状态读法：左边是「这页的证据是否齐」，右边是「上游产品还在不在更新」。停更不等于资料残缺。
