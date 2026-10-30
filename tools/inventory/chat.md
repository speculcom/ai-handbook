# chat 大类收录清单（inventory）

> 去向枚举：`已有` / `待建`（P1>P2>P3）/ `只进nav` / `不收`（必须带理由）。
> 收录标准见 [categories.md §2](../categories.md)：**通用**对话产品（网页/应用/API），官方定位「什么都能问」；垂直问答、角色扮演陪伴类不收。
> 候选来源交叉（≥2）：nav cat=llm 44 条（对话向约 20 条）+ 计划候选名单 + 2026-10-21 官方核验补漏（18 个 URL 直抓：全部 200 或 Cloudflare 403 拦截，无死链）。
> 本类现有档案 20 份（T6 升八维批 6 + T25 建档批 8 + C6-1 建档批 6）。

| 工具 | 厂商 | 官方 URL | 去向 | 档案 id | 理由/备注 |
|---|---|---|---|---|---|
| ChatGPT | OpenAI | https://chatgpt.com | 已有 | chatgpt | |
| Claude（聊天） | Anthropic | https://claude.ai | 已有 | claude-chat | |
| Gemini（聊天） | Google | https://gemini.google.com | 已有 | gemini-chat | |
| Grok（聊天） | xAI | https://grok.com | 已有 | grok-chat | Build/编码模式归 coding（grok-bot） |
| Kimi（聊天） | 月之暗面 | https://www.kimi.com | 已有 | kimi-chat | |
| 豆包 | 字节跳动 | https://www.doubao.com | 已有 | doubao-chat | |
| DeepSeek（对话） | 深度求索 | https://chat.deepseek.com | 已有 | deepseek-chat | P1 · 2026-10-21 直抓 200 · L5 只转述官方 |
| 腾讯元宝 | 腾讯 | https://yuanbao.tencent.com | 已有 | yuanbao-chat | P1 · 直抓 200 · 元宝是 C 端对话入口（混元是模型品牌，见下行） |
| 智谱清言 | 智谱 AI | https://chatglm.cn | 已有 | chatglm-chat | P1 · 直抓 200 |
| 通义千问（对话） | 阿里巴巴 | https://tongyi.aliyun.com | 已有 | tongyi-qianwen | P1 · 直抓 200 |
| 文心 | 百度 | https://yiyan.baidu.com | 已有 | wenxin | P1 · 直抓 200 · 品牌史：文心一言→文小言（2024-09 App 端）→「文心」统一（2025-11-02），档案要写改名史 |
| Microsoft Copilot | 微软 | https://copilot.microsoft.com | 已有 | microsoft-copilot | P1 · 直抓 200 |
| Manus | Manus AI（Monica 团队） | https://manus.im | 已有 | manus | P2 · 直抓 200 · T12 移交裁决：通用任务 agent（官方定位「Less structure, more intelligence」，含聊天模式），主轴非编码不归 coding、非搭 agent 底座不归 automation——落 chat |
| 讯飞星火 | 科大讯飞 | https://xinghuo.xfyun.cn | 已有 | xinghuo-spark | P2 · 直抓 200 |
| 海螺 AI | MiniMax | https://hailuoai.com | 已有 | hailuo-chat | C6-1 落地 · 直连 200（2026-10-30）· 对话入口 /chat · 备案号主语=模型层 |
| 阶跃星辰 | 阶跃星辰 | https://www.stepfun.com | 已有 | stepfun | C6-1 落地 · 对话入口 chat.stepfun.com 直连 200 · 备案 Shanghai-JieYue-20231106（PDF 镜像交叉） |
| Le Chat | Mistral AI | https://chat.mistral.ai | 已有 | le-chat | C6-1 落地 · 403=CF 拦截非死链（mistral.ai 主站/news 200）· direct=unknown（000 不下结论） |
| Meta AI | Meta | https://www.meta.ai | 已有 | meta-ai | C6-1 落地 · 403=CF 拦截非死链（ai.meta.com/blog 200）· 与 coding 的 meta-muse 两条产品线 |
| Poe | Quora | https://poe.com | 已有 | poe | C6-1 落地 · 307→login 403=登录墙非死链（terms/privacy/changelog 200）· 多模型聚合对话 |
| HuggingChat | Hugging Face | https://huggingface.co/chat | 已有 | huggingchat | C6-1 落地 · 308→200 · 前端 chat-ui Apache-2.0（GitHub API 当日核验）· Models 137/Omni 当日在册 |
| Reka | Reka AI | https://www.reka.ai | 待建 | reka-chat | P3 |
| DeepSeek 平台 | 深度求索 | https://platform.deepseek.com | 只进nav | | API 控制台，不是对话产品——档案 deepseek-chat 覆盖该厂商 |
| Google AI Studio | Google | https://aistudio.google.com | 只进nav | | 开发者模型试验台（API 向），非 C 端对话 |
| Anthropic Console | Anthropic | https://console.anthropic.com | 只进nav | | API 控制台 |
| Cohere | Cohere | https://cohere.com | 只进nav | | 模型/API 厂商（North 是企业平台），无 C 端通用对话产品 |
| Pi | Inflection AI | https://pi.ai | 只进nav | | 官方自我定位「emotionally intelligent personal AI」——情感陪伴向，贴 categories.md「陪伴类不收」线，稳妥只进nav |
| 腾讯混元 | 腾讯 | https://hunyuan.tencent.com | 只进nav | | 模型/研究/开源发布站（官网无对话入口，对话走元宝）——是模型品牌不是对话产品 |
| Character.AI | Character Technologies | https://character.ai | 不收 | | 角色扮演陪伴类——categories.md 不收示例点名（内容合规风险高且非通用助手） |
| 百川智能（百小应） | 百川智能 | https://www.baichuan-ai.com | 不收 | | 官方战略转向医疗垂类：官网首页现为「百小医·你的AI家庭医生」（2026-10-21 直抓核验），通用对话产品已让位——不满足「通用」 |
| Writer | Writer | https://writer.com | 不收 | | 企业内容创作平台（垂直场景），不满足收录标准 1「通用对话」 |

## 备注

- 本类 20 已有——T25（chat +8）已落地 P1 六份（DeepSeek/元宝/智谱清言/通义千问/文心/Microsoft Copilot）+ P2 前二（Manus/讯飞星火）；C6-1（chat +6，2026-10-30）落地 P2 余六份（海螺AI/阶跃AI/Le Chat/Meta AI/Poe/HuggingChat）。⚠ Microsoft Copilot 档案 id 用 `microsoft-copilot`——`copilot` 已被 coding 大类的 GitHub Copilot 占用。
- **不归本大类的 nav 条目**（写明去向，防分类混淆）：Perplexity / 秘塔 AI 搜索 / 天工 / You.com / Phind / Devv / 博查 / Brave Search / Consensus / Andi——搜索向对话归 `research`（T18 裁决）；Cohere/Nomic 等模型厂商 API 归 nav。
- Manus 裁决链：T12 automation 标「T14 再裁」→ 本表落 chat/待建 P2（通用任务 agent，聊天是入口之一）。
- L5：DeepSeek/元宝/智谱清言/通义/文心/星火/海螺/阶跃——国产只转述官方口径。
- 403 说明：poe/meta/mistral/pi/character 直抓返回 Cloudflare 403，是反爬拦截不是站点死亡（浏览器可达）——去向按产品事实定，不按 curl 码定。
