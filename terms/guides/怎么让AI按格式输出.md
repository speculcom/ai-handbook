---
zh: 怎么让 AI 按格式输出
en: How to Get AI to Output in Your Format
kind: guide
station: 2
ord: 14
span: 6
lead: "程序要接 AI 的输出时，「请输出 JSON」经常不够。这篇讲从提示约束到结构化输出的三级做法。"
points: ["第一级：提示里给格式说明加一个完整样例，多数场景够用，但字段缺失、多余解释仍会发生。", "第二级：用接口的结构化输出/工具调用能力，由服务端约束解码保证格式合法，比口头要求可靠得多。", "定义 schema 只写需要的字段并收紧类型：字段越少，出错面越小。", "无论哪一级，接收端都要校验：模式校验失败就重试或降级，别直接喂给下游。", "格式约束和任务质量会互相拉扯：强制格式可能让内容变差，两者要分开评测。", "别用格式技巧代替内容评测：输出合法不等于输出正确。"]
terms: ["结构化输出", "工具定义", "提示词", "护栏"]
refs:
  - ["OpenAI 结构化输出指南", "https://developers.openai.com/api/docs/guides/structured-outputs", "OpenAI Structured outputs guide"]
  - ["Anthropic 工具使用文档", "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview", "Anthropic Tool use overview"]
  - ["JSON Schema 规范", "https://json-schema.org/", "JSON Schema specification"]
---

# 怎么让 AI 按格式输出（How to Get AI to Output in Your Format）

**这份指南解决什么**：程序要接 AI 的输出时，「请输出 JSON」经常不够。这篇讲从提示约束到结构化输出的三级做法。

**怎么做**：
1. 第一级：提示里给格式说明加一个完整样例，多数场景够用，但字段缺失、多余解释仍会发生。
2. 第二级：用接口的结构化输出/工具调用能力，由服务端约束解码保证格式合法，比口头要求可靠得多。
3. 定义 schema 只写需要的字段并收紧类型：字段越少，出错面越小。
4. 无论哪一级，接收端都要校验：模式校验失败就重试或降级，别直接喂给下游。
5. 格式约束和任务质量会互相拉扯：强制格式可能让内容变差，两者要分开评测。
6. 别用格式技巧代替内容评测：输出合法不等于输出正确。

**出处**：结构化输出与工具调用的接口能力见 OpenAI、Anthropic 官方文档（见下）。

- [OpenAI 结构化输出指南](https://developers.openai.com/api/docs/guides/structured-outputs)
- [Anthropic 工具使用文档](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [JSON Schema 规范](https://json-schema.org/)

---
<!-- 微型指南 · 第二站（上手） · 约 6 分钟 -->
