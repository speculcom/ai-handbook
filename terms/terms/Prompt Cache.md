---
zh: "Prompt Cache"
en: "Prompt Cache"
alias: ["提示词缓存", "前缀缓存"]
purpose: "把重复的系统提示和资料缓存起来，重复问同一份上下文时省时间和钱。"
def: ["复用已处理过的相同前缀，跳过重复计算。"]
why: "做 Agent 时系统提示通常很长，缓存能显著降低成本。这也是本站不自己托管模型的一个原因。"
refs:
  - ["Claude 提示词缓存文档", "https://platform.claude.com/docs/en/build-with-claude/prompt-caching", "Anthropic prompt caching docs"]
  - ["OpenAI 提示词缓存指南", "https://developers.openai.com/api/docs/guides/prompt-caching", "OpenAI prompt caching guide"]
domain: "infra"
purposeTag: "apply"
level: 5
layer: "五"
ord: 14
---

# Prompt Cache（Prompt Cache）

**解决什么问题**：把重复的系统提示和资料缓存起来，重复问同一份上下文时省时间和钱。

复用已处理过的相同前缀，跳过重复计算。

**别名**：提示词缓存、前缀缓存

**为什么需要知道**：做 Agent 时系统提示通常很长，缓存能显著降低成本。这也是本站不自己托管模型的一个原因。

---

<!-- 站：第五站 · 跑起来 · 让模型跑在自己机器上。你会关心显存够不够、跑得多快。 -->