---
zh: 怎么排查 AI 的数据泄露路径
en: How to Trace AI Data Leak Paths
kind: guide
station: 2
ord: 4
span: 8
lead: "数据离开你，通常不止一条路。这份指南把常见泄露路径逐条列出来，一条条查自己踩了哪几条。"
points: ["输入路径：粘贴进云端对话框的内容，已经离开你的设备。", "训练路径：不少服务默认用对话改进模型，要去找关闭开关。", "工具路径：接上的 server 能把内容带到它自己的服务端。", "日志路径：会话历史、上传文件在对方服务器留存多久。", "记忆路径：模型可能把训练里见过的内容复述出来。", "恢复路径：删除入口和生效时间要提前确认，别指望立刻干净。"]
terms: ["隐私与合规", "数据不出网", "数据驻留", "提示注入"]
refs:
  - ["AWS 数据隐私常见问题", "https://aws.amazon.com/compliance/data-privacy-faq/", "AWS data privacy FAQs"]
  - ["AWS 数字主权", "https://aws.amazon.com/compliance/digital-sovereignty/", "AWS digital sovereignty"]
  - ["自托管方案对照（本站）", "https://agent.specul.com/", "Self-hosted options compared"]
---

# 怎么排查 AI 的数据泄露路径（How to Trace AI Data Leak Paths）

**这份指南解决什么**：数据离开你，通常不止一条路。这份指南把常见泄露路径逐条列出来，一条条查自己踩了哪几条。

**怎么做**：
1. 输入路径：粘贴进云端对话框的内容，已经离开你的设备。
2. 训练路径：不少服务默认用对话改进模型，要去找关闭开关。
3. 工具路径：接上的 server 能把内容带到它自己的服务端。
4. 日志路径：会话历史、上传文件在对方服务器留存多久。
5. 记忆路径：模型可能把训练里见过的内容复述出来。
6. 恢复路径：删除入口和生效时间要提前确认，别指望立刻干净。

**出处**：数据留存与驻留的口径可参考云厂商的官方隐私与数字主权页；敏感场景的替代方案见本站自托管对照（见下）。

- [AWS 数据隐私常见问题](https://aws.amazon.com/compliance/data-privacy-faq/)
- [AWS 数字主权](https://aws.amazon.com/compliance/digital-sovereignty/)
- [自托管方案对照（本站）](https://agent.specul.com/)

---
<!-- 微型指南 · 第二站（上手） · 约 8 分钟 -->
