---
zh: "safetensors"
en: "safetensors"
purpose: "一种更安全的模型权重文件格式。"
def: ["官方描述：一种新的简单张量存储格式，安全（相对 pickle）且仍然快（零拷贝）。", "官方指出 pickle 不安全、会执行任意代码；该格式支持懒加载。"]
why: "加载不可信权重，等于运行别人写的代码。先看格式。"
refs:
  - ["safetensors 官方仓库", "https://github.com/safetensors/safetensors", "safetensors repository"]
domain: "data"
purposeTag: "guard"
level: 5
layer: "五"
ord: 22
---

# safetensors（safetensors）

**解决什么问题**：一种更安全的模型权重文件格式。

官方描述：一种新的简单张量存储格式，安全（相对 pickle）且仍然快（零拷贝）。

官方指出 pickle 不安全、会执行任意代码；该格式支持懒加载。

**为什么需要知道**：加载不可信权重，等于运行别人写的代码。先看格式。

---

<!-- 站：第五站 · 跑起来 · 让模型跑在自己机器上。你会关心显存够不够、跑得多快。 -->
