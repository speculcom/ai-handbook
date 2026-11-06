---
zh: "插件与 MCP 的信任边界"
en: "Plugin and MCP Trust Boundary"
purpose: "装一个 server 或插件时，你到底把哪些东西交给了别人，边界画在哪。"
def: ["MCP 的连接默认面对第三方：工具描述和返回内容都来自别人写的 server。工具描述里的文字既会被当成内容读，也可能被当成指令执行，这就是注入的入口。", "MCP 官方安全实践把三类风险单列：Confused Deputy（server 用它自己的权限替你访问你本拿不到的资源）、Token Passthrough（客户端把凭据原样转给 server）、SSRF（有抓取能力的 server 打到内网地址）。", "边界要画在授权和数据流向上，不是画在「这个 server 很有名」上。文件类 server 需要你事先声明可访问的目录，抓取类 server 的页面直接写明它能访问本地与内网 IP。", "日志也在边界之内。工具参数进了 server 就等于内容交出去了；它留多久、给谁看，看那一份 server 自己的条款。条款没写的，就按它会留来打算。"]
why: "装插件的成本不是一次性的，它长期多出一个出口和一套凭据。边界看清以后，你会按最小权限来开、按能不能撤销来决定装不装。"
refs:
  - ["MCP 官方安全最佳实践（Confused Deputy / Token Passthrough / SSRF）", "https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices", "MCP specification: security best practices"]
  - ["本站文件 server 为什么强制声明目录", "https://tools.specul.com/mcp/filesystem.html", "Why Filesystem requires declared dirs"]
  - ["本站抓取 server 的安全警告", "https://tools.specul.com/mcp/fetch.html", "Fetch server security caution"]
  - ["MCP 是什么 · 本站 9 份 server 档案", "https://tools.specul.com/mcp/", "What MCP is · server profiles"]
domain: "agent"
purposeTag: "guard"
level: 2
layer: "二"
ord: 41
last_verified: "2026-11-06"
verified_scope: "refs"
---

# 插件与 MCP 的信任边界（Plugin and MCP Trust Boundary）

**解决什么问题**：装一个 server 或插件时，你到底把哪些东西交给了别人，边界画在哪。

MCP 的连接默认面对第三方：工具描述和返回内容都来自别人写的 server。工具描述里的文字既会被当成内容读，也可能被当成指令执行，这就是注入的入口。

MCP 官方安全实践把三类风险单列：Confused Deputy（server 用它自己的权限替你访问你本拿不到的资源）、Token Passthrough（客户端把凭据原样转给 server）、SSRF（有抓取能力的 server 打到内网地址）。

边界要画在授权和数据流向上，不是画在「这个 server 很有名」上。文件类 server 需要你事先声明可访问的目录，抓取类 server 的页面直接写明它能访问本地与内网 IP。

日志也在边界之内。工具参数进了 server 就等于内容交出去了；它留多久、给谁看，看那一份 server 自己的条款。条款没写的，就按它会留来打算。

**为什么需要知道**：装插件的成本不是一次性的，它长期多出一个出口和一套凭据。边界看清以后，你会按最小权限来开、按能不能撤销来决定装不装。

**看具体例子**：
- [MCP 官方安全最佳实践](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices)
- [本站 9 份 MCP server 档案](https://tools.specul.com/mcp/)

---

<!-- 站：第二站 · 上手 · 认清 AI 的能力与边界。知道它什么时候会出错，比知道它多强更重要。 -->
