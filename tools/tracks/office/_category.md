# office 大类收录声明

**主题**：办公与写作——文档写作、表格分析、演示生成、会议记录、翻译与邮件日程。
定义与边界裁决见 [../../categories.md](../../categories.md) §7。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **产品主轴是办公交付物**（文档 / 表格 / 演示 / 会议记录 / 邮件 / 翻译），不是通用闲聊 |
| 2 | 官方说明了输入、输出与数据路径，八维至少 `runtime` / `permissions` 可答 |
| 3 | 有官方产品页与更新/帮助入口可核验 |

**形态归属**（决定 `form:` 取值；⚠ 下表第一列不加反引号）：

| 形态 | 判据 |
|:--|:--|
| web | 主入口是浏览器里的编辑器或工作台 |
| cloud | 以企业云服务交付，数据与生成在厂商侧 |
| app | 以桌面/移动客户端为主，云端能力随账号启用 |

**本大类只收这三条形态**（`SITES.office.owns` 必须与下面实际用到的 form 一字对齐）。

**五条线**（档案的分组口径，不进 form 枚举）：

| 线 | 问的问题 |
|:--|:--|
| 文档与写作 | 能起草、改写、总结吗？引用和版本怎么留？ |
| 表格与数据 | 能读表、写公式、做图表吗？数字会不会算错？ |
| 演示与设计 | 能把大纲变成可讲的页面吗？品牌与素材授权在哪？ |
| 会议与沟通 | 能记录、转写、提取行动项吗？参会人同意了吗？ |
| 翻译与邮件 | 能保持术语一致吗？敏感内容会去哪？ |

**边界情况**：

| 情况 | 处理 |
|---|---|
| ChatGPT / Gemini 的写作能力 | 对象本体归 `chat`，不因能写文档就搬进 office |
| Notion / 飞书 / 钉钉的通用协作平台 | 只收其**办公 AI 主轴**的档案；平台本身与连接器归 nav 或 mcp |
| 会议转写硬件 | 归 hardware；纯录音转写产品归 audio |
| 通用设计工具里的 AI 滤镜 | 不单独收；设计主轴在 image 的归 image |
| 企业知识库/RAG 平台 | 归 framework 或 automation；办公档案只写与文档/会议的直接交互 |

## 收录对象（15 份）

| id | 名称 | 厂商 |
|---|---|---|
| `microsoft-365-copilot` | Microsoft 365 Copilot | Microsoft |
| `google-workspace-gemini` | Google Workspace Gemini | Google |
| `notion-ai` | Notion AI | Notion |
| `gamma` | Gamma | Gamma |
| `canva-magic-studio` | Canva Magic Studio | Canva |
| `grammarly` | Grammarly | Grammarly |
| `deepl-pro` | DeepL Pro | DeepL |
| `fireflies-ai` | Fireflies.ai | Fireflies.ai |
| `tldv` | tl;dv | tl;dv |
| `adobe-acrobat-ai` | Adobe Acrobat AI Assistant | Adobe |
| `feishu-ai` | 飞书智能伙伴 | 飞书 |
| `dingtalk-ai` | 钉钉 AI 助理 | 钉钉 |
| `tencent-docs-ai` | 腾讯文档 AI | 腾讯 |
| `wps-ai` | WPS AI | 金山办公 |
| `beautiful-ai` | Beautiful.ai | Beautiful.ai |

> 这些档案是 2026-11-19 的官方页快照，`confidence: partial`；价格、合同与全国网络可达性未复核。
