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

## 收录对象（6 份）

| id | 名称 | 厂商 |
|---|---|---|
| `chatgpt` | ChatGPT | OpenAI |
| `claude-chat` | Claude（对话应用） | Anthropic |
| `gemini-chat` | Gemini（对话应用） | Google |
| `grok-chat` | Grok | xAI |
| `kimi-chat` | Kimi | 月之暗面 Moonshot AI |
| `doubao-chat` | 豆包 | 字节跳动 |

> 候选全集与去向见 `inventory/chat.md`（T10 盘点后建立）。
