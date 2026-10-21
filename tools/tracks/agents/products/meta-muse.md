---
id: meta-muse
track: cloud
tasks: ["long-task"]
name: Meta Muse
vendor: Meta
homepage: https://about.fb.com/news/2026/09/introducing-muse/
mark: MU
accent: "#0866FF"

axes:
  model_access: >-
    **模型是厂商指定的** —— **官方原文**："powered by Muse Spark, Meta's most capable model to date, built for real-world agentic work like this"。

    Muse Spark 是 Meta 另有的模型名（Meta Careers 页把 **官方原文**："Muse Spark · natively multimodal reasoning, visual chain of thought and multi-agent orchestration" 列为独立条目）。

    **没有模型选择入口。** 同一模型名还出现在 AI 眼镜的更新说明里
    （Muse Spark on Meta Ray-Ban Display），是跨形态复用的。

  runtime: >-
    **形态的答案就是本产品**：官方原文 Muse 跑在 **Muse Secure VM** 上，
    官方形容为 **官方原文**："a dedicated, virtual machine (VM) that houses both the agent and a person's data"，并且 **官方原文**："Every Muse user’s VM is isolated so no one else’s agent can access it"（见帮助中心页）。

    **接入口径与本地 agent 不同**：官方强调 **官方原文**："talking to it works just like messaging another person, in the Muse app or directly in WhatsApp"——
    **WhatsApp 是入口之一**，这是它与另两家的明显差异。

    发布渠道：iOS / Android / muse.ai，美国先行，官方称 **官方原文**："coming soon to AI glasses"。

  local_files: >-
    **它不是为读写你本机文件设计的**，官方全文未提及本地文件系统。

    数据都在 Muse Secure VM 里。

    官方另有一句针对 app 连接的数据最小化承诺（帮助中心页）：
    **「例如，连接你的邮件允许 Muse 搜索你的邮件」「但除非你要求，否则它不会下载你的整个收件箱」**。

    **这一句是官方在数据面给出的具体边界，值得单独记。**

  background: >-
    **官方明确写了关闭应用后的行为**，这一句比「常驻」更具体：
    **官方原文**："For tasks that take more time, Muse keeps working after people close the app, and comes back when something changes or when it needs approval, like before it sends an email or makes a purchase"。

    即**后台持续 + 遇审批才回来**。

    **「回来」的触发条件官方列了三类**（帮助中心审批页）：

    - 任务有进展（状态栏实时显示「Is working」/「Making something」/「Is updating memory」）
    - 到了定时任务或提醒的时间（助手图标内 **Upcoming** 列出 scheduled tasks 与 reminders，且每个 scheduled task 可单独设审批）
    - 以及需要你批准的那一刻

    另有一处官方原句用了「proactively」：
    **官方原文**："a personal AI agent that proactively helps with people's goals and suggests ideas"
    以及能 **官方原文**："make suggestions unprompted"。

    **触发源不止你发指令** —— 帮助中心 Connector 页写了反向推送：
    **官方原文**："Some Connectors can also share information proactively with Muse. For example, calendar Connectors can update Muse automatically when there are changes in your schedule"，且**这类 Connector 会在连接前标明**。

    **后台自主时是只读还是读写？本条给的是机制而非原句**（2026-10-03 补齐）。
    默认权限档下
    **官方原文**："your Muse will ask for permission before every write action and important read actions"
    而 Connector 页写默认态是 **官方原文**："Muse will not take **many important actions**, like sending an email, without your approval"（注意是 many，不是 every）。

    两句合起来的后果是明确的：**后台期间读操作照常跑，任何写操作都必须回前台等批准**
    —— 这正好对上发布页那句 **官方原文**："comes back ... when it needs approval, like before it sends an email or makes a purchase"。

    **这不是官方那句「后台是只读」的原文，是从两处权限条款推出的机制结论**，
    与Dot 官方明写只读不同，**不要当成同一句话引用**。

  tools: >-
    **支付工具是最独特的一项，官方点名了合作方**：
    **官方原文**："Muse can checkout with Link built by Stripe, and it is the first AI agent covered by Link's purchase protections"，包含物损坏/丢失免费保障、
    价格下降保护、无手续费退货、合资格购买的退货保证。

    官方说明机制：**官方原文**："Link's wallet for agents generates a one-time-use card so your real card details stay hidden"。

    Shop Pay **官方原文**："coming soon"，另有 1Password 支持（同样是复用你已有的登录）。

    浏览器能力官方写明：**官方原文**："It can open a browser, fill out forms, and negotiate on their behalf"。

  context: >-
    **记忆机制是官方卖点之一**：
    **官方原文**："Muse also remembers what matters to a person, so it can make suggestions unprompted and act on details that person only mentioned once"

    官方举的例子很具体（把 Instagram 存的菜谱 reel 变成购物清单、
    记住朋友饮食禁忌后再发邀请）。

    帮助中心另有一句把记忆的**来源**说清了：
    **官方原文**："Muse is designed to remember context from your conversations, so you can refer back to things you've discussed before"

    ——即对话本身是记忆的一等来源，不只是你显式要求记住的东西。

    **存储形态官方写了是可查的文件，不是黑盒**：
    **官方原文**："You can find out what Muse remembers about you at any time by asking directly, or by viewing files like your MEMORY.md"。

    forget skill 的机制也写明了，顺便带一个**官方自带的限定词**：
    **官方原文**："Forgetting works by asking Muse to look for information about a specific person, topic or matter in its memories and supporting files and remove it **to the best of its ability**"

    **「尽其所能」不是保证抹净**，这个 hedge 值得单独记。

    **删除侧也有官方机制**：
    **官方原文**："You can delete any message you send to Muse, Side Chats with Muse, and files in your virtual machine"

    支持重置，也支持忘掉特定主题（forget skill）。

    官方也提醒残留：
    **官方原文**："Muse may still remember information it learned from what you deleted"

    **这条限定值得记，删除不等于抹掉已学到的。**

    **残留不止删除这一条路径（2026-10-03 补）**。断开 Connector 也不清记忆。
    **官方原文**："Information that Muse previously used to perform tasks with that Connector might still remain in Muse's memories and your conversation history"。

    **对比之下 reset 才是硬边界**：
    **官方原文**："Resetting Muse permanently deletes all information, chat history, files and active tasks. **This cannot be undone.**"

    ⚠ **上下文窗口大小官方没有公布**，未见任何官方数字。

    另有一处工程细节官方提到但未展开：VM **官方原文**："maintains backups to help protect your agent's history from data loss"

    ——**有备份机制，但备份保留多久、与删除语义怎么 interplay，两页都没写。**

  permissions: >-
    **本条最独特的设计：独立 Sentinel agent 做审批。**

    **官方原文**："A separate Sentinel agent runs on that same machine, kept apart from Muse at the system level. Nothing Muse does reaches the internet unless the Sentinel approves it, and it asks the person for permission when needed"

    **即审批不由 Muse 自己判断，而是与它系统级隔离的另一个 agent 判断。**

    这与 Dot 的「自动审核」在实现层不同（Dot 未说明审核器是否独立）。

    其余：敏感动作前询问（发邮件、购买）；
    **官方原文**："Muse shows people a complete audit trail of everything it has done and plans to do"
    （**审计面比 Dot 的活动视图更宽 —— 含「计划要做的事」**）；

    用户自行选 app 与权限粒度：
    **官方原文**："for things like email, people choose what Muse can do, whether it reads their mail or can also send on their behalf"；

    **凭据隔离**：
    **官方原文**："Muse has no visibility into people's passwords or payment methods. Any credentials a person shares with Muse go into secure storage"，
    且 **官方原文**："Muse also cannot see passwords a person types into the browser themselves"；

    帮助中心把机制写得更细：用凭据前会过三道检查（连的是不是预期服务、
    是不是你授权的、你有没有给过这类动作的许可）；

    **训练开关**：
    **官方原文**："People can also opt out of their interactions being used to train Meta's AI models"
    （帮助中心页补充：设置默认开，可随时改，改动也适用于历史交互；
    开启时仍会移除姓名/邮箱/电话/SSN 等部分身份信息，并与账号脱钩）；

    **不与广告系统共享**。Muse 官方两处都写了不把对话或 VM 数据给 Meta 广告系统。
    帮助中心页补充：即使 Accounts Center 里绑了其他 Meta 产品也一样。

    **⚠ 官方自己承认 prompt injection 未解决（2026-10-03 补，一手措辞）**：
    **官方原文**："Websites, emails, files and connected services can contain instructions intended to manipulate an AI agent. This is sometimes called a prompt injection attack. Muse uses multiple protections to help detect and resist these attempts. These include model training, automated detection systems, and limits on the information and services Muse can access during a task."

    **关键一句**：
    **官方原文**："Important permission and security checks operate separately from the AI model, meaning that they don't rely only on Muse recognizing that an instruction may be malicious."

    ——**官方承认「模型自己认出恶意指令」不足以兜底**。这与 Sentinel 的设计动机一致。

    官方也照例写了 **官方原文**："No automated system is perfect"，并要求用户自行复核活动。

    **⚠ Custom Connector 是官方自己标出的风险口（2026-10-03 补）**：
    用户可让 Muse 现造一个连接器，官方随即给出警告：
    **官方原文**："Meta doesn't review custom connectors or how they use your information, so grant access with caution and review the provider's privacy policies."

    ——**这是官方承认存在审查盲区**，评估第三方接入时必须算进去。

    反向的权限收敛也有官方条款：
    **官方原文**："Many Connectors can also be set up so that Muse is only able to retrieve data, but not take actions (like sending a calendar invite)"

    ——**读-only 连接器是官方提供的降权手段。**

    ⚠ 帮助中心页有一处**尚未实现的承诺**：Muse Confidential VM。
    官方写 **官方原文**："In the future / Later this year"，
    即**整台 VM 用只有用户持有的密钥加密、连 Meta 都读不了**，**当前不可用**。

  fit: >-
    官方定位是 **官方原文**："for billions of people worldwide, so there's no learning curve"，
    并明确点名场景：发邮件、订旅行这类日常事务，
    以及更大的目标（卖车卖更高、压低账单、随生活变化调训练计划）。

    **不适合**：要读写本地项目文件的人（能力圈完全不同）；
    在欧盟/英国等地区首发就要用的人（官方写 **官方原文**："rolling out in the US"）；
    需要 Confidential VM 那种「连厂商都读不到」保证的人（**尚未实现**）。

pitfalls:
  - 把 Confidential VM 当成现成特性 —— 官方写 Later this year，尚未上线
  - 把 Sentinel 当成「Muse 自己会先问一下」 —— 它是系统级隔离的独立 agent
  - 以为删消息就等于抹掉了记忆 —— 官方明说可能仍记得已学到的内容
  - 以为「free for most」等于全功能免费 —— 边界未量化
  - 把 Muse 的后台权限说成「官方写了只读」 —— 官方给的是机制（写操作必审批），不是只读原句
  - 以为断开 Connector 就清掉了相关记忆 —— 官方写明might still remain
  - 以为 forget skill 是保证抹净 —— 官方措辞是 to the best of its ability

tags: [编码agent, 云端, 厂商云, 常驻, 审批, 记忆, 支付, 免费档]
related: [crewai]

sources:
  - label: Meta · Introducing Muse: The World's First Personal AI Agent Built for Everyone（官方 Newsroom 发布页，2026-09-08，正文 7,655 字逐节取）
    url: https://about.fb.com/news/2026/09/introducing-muse/
    kind: official

  - label: Meta Help Centre · How Muse handles your privacy, safety and security（VM 隔离 / Sentinel / Secure Credentials / 训练开关 / 审计 / prompt injection 官方自认 / 删除与forget 语义）
    url: https://www.meta.com/help/1047255454427887/
    kind: docs

  - label: Meta Help Centre · How Muse works with your guidance and approval（read vs write actions 定义 / 两档权限设置 / 五个审批选项 / Activity log / Upcoming / 可逆性）
    url: https://meta.com/help/1385290430137537/
    kind: docs

  - label: Meta Help Centre · How Muse works with Connectors（Connector 机制 / 只读连接器 / 自定义连接器的官方警告 / 断开后记忆残留）
    url: https://meta.com/help/1687253048996149/
    kind: docs

  - label: Meta · Meta AI glasses release notes（Muse Spark 跨形态复用、上市地区）
    url: https://meta.com/help/1809764829519902/
    kind: changelog

link:
  url: https://about.fb.com/news/2026/09/introducing-muse/
  kind: official

last_verified: 2026-10-03
last_updated: 2026-10-03
lifecycle: active
confidence: partial
cn:
  origin: foreign
  origin_note: 国外主体（网信办公示名单未见对应备案主体）。
  origin_note_en: foreign entity (no matching filing entity in the CAC registry).
  direct: yes
  direct_note: 官方新闻页 about.fb.com 直连实测 200；产品入口在 Meta 系应用内，未单独实测。
  direct_note_en: the official news page about.fb.com measured 200 direct; the product ships inside Meta apps, which were not probed separately.
  filing: not-filed
  filing_note: 未见于网信办公示名单（2026-10-20 检索 13 批附件，https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm）；该产品未面向大陆公众提供服务，备案不适用。
  filing_note_en: not in the CAC public registry (13 batch attachments searched 2026-10-20, https://www.cac.gov.cn/2024-04/02/c_1713729983803145.htm); the product does not serve the mainland public, so filing does not apply.
  verified: 2026-10-20
---

## 一句话定位

**唯一一家把「审批权交给另一个 agent」的**。Muse Secure VM 上跑着两个系统级隔离的东西：干活的 Muse，和否决它的 Sentinel。

## 与 Dot 的关键设计差异（两份同期档案，最值得对照的地方）

| | OpenAI Dot | Meta Muse |
|---|---|---|
| 谁做审批 | 「自动审核」，**未说明审核器是否独立** | **独立的 Sentinel agent**，系统级与 Muse 隔离 |
| 审批写得多严 | 「更改密码等特定敏感任务始终需要由你亲自完成」 | 「Nothing Muse does reaches the internet unless the Sentinel approves it」 |
| 审计面 | 活动视图看进度 | 「complete audit trail of everything it has done **and plans to do**」 |
| 凭据 | 用已存密码，不向模型暴露 | Secure Credentials Store，且看不到用户自己敲的密码 |
| 接入口 | ChatGPT / Slack / Teams / 短信 | **WhatsApp**（像给人发消息一样） |
| 能不能付款 | 官方未在发布页写 | **能**，Stripe Link，含购买保障 |
| 训练开关 | 个人套餐自选 | 帮助中心写「默认开，可关，改动也适用历史交互」 |
| 后台自主的权限 | **官方明确只读** | **写操作必回前台审批**（由默认档「every write action 需许可」推出，官方无「后台只读」原句） |

**最后一行值得单独强调**：Dot 官方**明写**只读，Muse 官方**没有**那句原话。
本次补核验后Muse 拿到的是**机制层结论**（默认权限档要求每个写操作都许可，
所以后台期间写操作必须回前台等批准），**不是「后台是只读」的原文**。
两者强度不同，引用时不要混用—— 这条边界仍要守住。

## Sentinel：一个独立的否决层

```
A separate Sentinel agent runs on that same machine, kept apart from Muse
at the system level. Nothing Muse does reaches the internet unless the
Sentinel approves it, and it asks the person for permission when needed.
```

**这句话的分量在于「kept apart at the system level」** ——
不是提示词层面的约束（「请先检查是否合规」），
是系统层隔离的另一个进程/agent。

含义：**Muse 自己不能给自己放行。**
这与「靠模型自觉判断该不该问」是两种强度完全不同的设计。

## 审计面比 Dot 更宽：含「打算做什么」

```
Muse shows people a complete audit trail of everything it has done
and plans to do.
```

**注意 `and plans to do`** ——
审的不只是已发生的动作，还包括计划中的动作。
这比「事后看日志」早一步介入（用户能在它动手前看到它打算动手）。

## 删除不等于抹掉（官方自己提醒的）

```
You can delete any message you send to Muse, Side Chats with Muse,
and files in your virtual machine.
...
After you delete something from Muse, Muse may still remember information
it learned from what you deleted.
```

官方提供 forget skill（让它忘掉某个主题/某人/某次交互），
并可查看 `MEMORY.md` 看它记住了什么。

**但删除后「仍可能记得」这句是官方主动写的** ——
这意味着**数据删除权与模型记忆是两条线**，前者不自动覆盖后者。
做合规评估时这一点必须单独看。

## Confidential VM：写下来了，但还没上线

```
Later this year, Meta will introduce Muse Confidential VM, where the whole VM,
including a person's data and conversations with Muse, is encrypted with a key
only they hold, so not even Meta can access it.
```

**官方措辞是 Later this year / In the future —— 当前不可用。**

这一条如果被当成现成特性写进选型结论，就是把承诺当事实。
本站明确标注：未实现。

## 支付：唯一一家官方点名支付合作方的

```
Muse can checkout with Link built by Stripe, and it is the first AI agent
covered by Link's purchase protections: free coverage for damaged or lost items,
price drops, no-fee returns, and a return guarantee on eligible purchases.
Link's wallet for agents generates a one-time-use card so your real card details
stay hidden.
```

机制值得记：**一次性卡 + 代用户结账**，所以真实卡号不暴露。
Shop Pay coming soon，另有 1Password 支持（同样是复用已有登录）。

**对比另两家**：Dot 与 Grok Bot 的官方发布页都没提agent 能直接付款。
这是三家里唯一一个有官方支付路径说明的。

## 与数据面的具体边界

帮助中心页有一句很具体的承诺，值得抄下来：

```
For example, connecting your email allows Muse to search your email,
but it won't download your whole inbox (unless you tell it to).
```

**「连了邮件不等于把整个收件箱搬走」** —— 这是官方给的最小权限范例。

另外两处明确承诺：

- 不与 Meta 广告系统共享对话或 VM 数据（**即使 Accounts Center 绑了其他 Meta 产品**）
- Secure Credentials Store：凭据进保管处，Muse 能用但看不到；
  且**用户在浏览器里自己敲的密码它也看不到**

## 适合与不适合

**适合**（官方口径）：日常事务 + 更长目标，发邮件订旅行这类不需要学习成本的事。
官方强调「no learning curve」，这是它与另两家定位最不一样的地方。

**不适合**：
要读写本地项目文件的人（不是同一种东西）；
首发就要用的人（官方写 rolling out in the US；
AI glasses 形态「coming soon」）；
需要「连 Meta 都读不到」保证的人（**Confidential VM 未上线**）。

## 采集限制

| 页面 | 状态 |
|---|---|
| Meta Newsroom 发布页 | ✅ Playwright 取到 7,655 字，九维度均从正文取证 |
| Help Centre · privacy/safety/security | ✅ **2026-10-03 取到整页正文**（约 2,400 词），`permissions` / `context` 引用已逐字复核 |
| Help Centre · guidance and approval | ✅ **2026-10-03 取到整页正文**（约 1,500 词），审批档位 / 审批选项 / 可逆性出自此页 |
| Help Centre · how Muse works with Connectors | ✅ **2026-10-03 取到整页正文**（约 900 词），自定义连接器风险出自此页 |
| Meta AI glasses release notes | ⚠️ 仅用于确认 Muse Spark 跨形态复用与地区表述 |
| Meta Careers（Muse Spark 技术描述） | ⚠️ 仅取到摘要 |

**⚠️ 一处取证方式不一致，如实记录**：
三页 Help Centre 均为**检索接口返回的整页正文**。`WebFetch` 直抓 meta.com 在本机仍失败。
正文完整、可逐字引用，但**不是本机渲染抓出来的**——
若要用于正式对外引用，应再复核一次。

**confidence 仍为 partial，但原因已经换了两条**：
补核验前是因为**「Help Centre 直抓超时、只拿到检索摘要」**；
补完后三页正文齐了，剩下的是**官方压根没公布的数据**——
上下文窗口大小、Sentinel 判定标准。

## 三个值得单独记的官方自认风险

这次补核验最大的收获不是补上了什么，而是**官方自己承认的三处限制**：

| 官方原话 | 含义 |
|---|---|
| 「No automated system is perfect」 | 官方不承诺审批层无误判 |
| 「they don't rely only on Muse recognizing that an instruction may be malicious」 | **官方承认模型自己判断不足以兜底** |
| 「Meta doesn't review custom connectors or how they use your information」 | **官方承认自定义连接器存在审查盲区** |

第二条与 Sentinel 的设计互为印证：**审批之所以要放在模型之外，
是因为官方自己认为「模型认得出恶意指令」这件事不可靠。**

## 残留记忆有四条路径，只有 reset 是硬边界

之前只记了「删了仍可能记得」。这次拿到第二条 —— **断开 Connector 也不清记忆**：

```
Information that Muse previously used to perform tasks with that Connector
might still remain in Muse's memories and your conversation history.
```

| 操作 | 清什么 | 官方口径 |
|---|---|---|
| 删消息 / Side Chats / VM 文件 | 该次交互与文件 | 「may still remember information it learned from what you deleted」 |
| forget skill | 指定人 / 主题 / 事项 | 「remove it **to the best of its ability**」（尽力，非保证） |
| 断开 Connector | 停止数据交换 | 「might still remain in Muse's memories」 |
| **reset** | 全部信息、对话历史、文件、活动任务 | 「**This cannot be undone.**」 |

**做数据删除评估时这一点必须单独看**：官方措辞里前三条都留了余地，
只有 reset 是确定性的。

## 实测记录

本站尚未完成实测。测试协议见 [tasks/_protocol.md](../tasks/_protocol.md)。

**实测建议**：与 OpenAI Dot 做**同题对照**才有意义 ——
两者同期发布、定位相近。差异集中在 `permissions`（Sentinel vs 自动审核）
与 `context`（是否默认开训练）。

这两项都不需要跑基准，只需要读设置页 + 观察行为，
但**要付费订阅才能测**（Muse 目前美国首发）。

## 未知项清单

- 上下文窗口大小（官方无任何数字）
- Sentinel 的判定标准与误判处理
- Confidential VM 的上线时间与形态
- VM 备份的保留时长，及其与删除语义的相互作用
- 非美国地区的可用性与功能差异
- 免费档「most of what people need」的边界在哪

## 相关条目

- [OpenAI Dot](./openai-dot.md) — **同期发布，必读对照**（审批层设计不同）
- [xAI Grok Bot](./grok-bot.md) — 同期发布，第三家
- [Codex](./codex-ide.md) — 本地 CLI 形态的对照项（机器归你）
