---
id: local-log-retention
title: 把日志留在本地到底意味着什么
titleEn: What keeping logs on your own machine actually means
summary: 把「日志留在本地」拆成三条线：写在哪、谁能读、留多久。逐条给运行器官方文档里的证据位置，并说明磁盘加密、备份同步与监听地址为什么都不在这四个字里。
summaryEn: Unpack "logs stay local" into three lines: where they are written, who can read them, and how long they persist. Each item points at the runner's own documentation, and explains why disk encryption, backup sync and bind address are not contained in those four words.
sources:
  - label: Ollama 排障文档（macOS 与 Windows 的日志位置、Linux 查看命令，2026-11-06 直抓）
    url: https://docs.ollama.com/troubleshooting
    kind: docs
  - label: Ollama 常见问题文档（模型保存目录与 OLLAMA_HOST 绑定地址，2026-11-06 直抓）
    url: https://docs.ollama.com/faq
    kind: docs
  - label: vLLM 环境变量文档（日志配置、级别、统计间隔与调试开关，2026-11-06 直抓）
    url: https://docs.vllm.ai/en/latest/configuration/env_vars/
    kind: docs
  - label: llama.cpp · llama-server 参数文档（--log-disable 与 --api-key 两项，2026-11-06 直抓）
    url: https://raw.githubusercontent.com/ggml-org/llama.cpp/master/tools/server/README.md
    kind: docs
  - label: Microsoft Learn · BitLocker 概览（整卷加密与设备加密的恢复密钥备份去向，2026-11-06 直抓）
    url: https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/
    kind: docs
last_verified: 2026-11-06
confidence: partial
---

## [这是存储位置陈述，不是保密承诺|A storage-location statement, not a confidentiality promise]

「把日志留在本地」是一句关于文件写入位置的陈述，不是保密承诺。

它只说明目标路径在同一台机器上，不说明谁能读、别处有没有副本，也不说明留多久。

本站不替你判断任何合规义务，也不把「本地」写成「安全」。这一篇给的是核对顺序与证据位置。

## [先分清三条线|Separate the three lines first]

三个问题要三类证据，合并成一个「本地」就会漏掉东西。

- 写在哪：日志、会话历史、崩溃转储、缓存与临时文件是不同文件。
- 谁能读：账户权限、进程权限、磁盘是否加密、备份是否同步。
- 留多久：轮转策略、保留上限、删除之后是否还留有历史副本。

查不到说明时只有一条处理办法：**官方未说明**就记为未说明。不用「一般都这样」替它补答案。

## [默认落在哪里|Where the files land by default]

这一层只有运行器自己的文档能回答，本站不代读任何机器。

- Ollama 的排障文档给了日志位置：macOS 看 `~/.ollama/logs/server.log`；Windows 给的是 `%LOCALAPPDATA%\Ollama` 目录；Linux 用 `journalctl -u ollama` 查看。位置见 [troubleshooting](https://docs.ollama.com/troubleshooting)。
- 同一家的问题页写明模型保存在 `~/.ollama/models`，见 [faq](https://docs.ollama.com/faq)。模型文件与日志是两类对象，保留策略分开记。
- vLLM 把日志做成一组独立开关：`VLLM_CONFIGURE_LOGGING`、`VLLM_LOGGING_LEVEL`、`VLLM_LOG_STATS_INTERVAL`，见 [env_vars](https://docs.vllm.ai/en/latest/configuration/env_vars/)。
- llama-server 的参数表列出 `--log-disable` 与 `--api-key`，见 [server 参数文档](https://raw.githubusercontent.com/ggml-org/llama.cpp/master/tools/server/README.md)。请求内容是否写入日志、按什么级别写，以该页与所用版本的说明为准。

## [留在本地不等于不出去|Local files do not stay local by themselves]

四条通道会让「留在本地」这个说法变得不准确，每条都要单独处理。

- 备份与同步：网盘、系统备份工具会连同日志目录一起复制出去，副本不再受原路径控制。
- 加密与密钥去向：微软的 BitLocker 概览写明整卷加密针对的是设备丢失、被盗带来的数据窃取与暴露风险；同一页面也说明设备加密会把恢复密钥备份到 Microsoft Entra ID、AD DS 或用户的 Microsoft 账户。见 [BitLocker Overview](https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/)。
- 监听地址：Ollama 的文档写用 `OLLAMA_HOST` 改绑定地址，见 [faq](https://docs.ollama.com/faq)。绑到全部网卡时，同一网络里的其他机器也能发请求。
- 凭据：`--api-key` 一类设置决定谁能调用本机服务，密钥与被调用的内容都可能出现在别的日志里。

加密保护静态数据，密钥位置是另一件事。这四个通道都能关，但没有一个是「本地」两个字自动关掉的。

## [日志里装的是什么|What the logs actually carry]

日志内容由运行器决定，本站不替任何实现假设字段。核对时按四类分开。

- 请求侧：提示文字、附件或文件路径、工具调用参数、系统提示内容。
- 响应侧：生成的文字、错误信息、被截断的位置。
- 运行侧：时间戳、耗时、并发数、请求标识与调用方地址。
- 派生副本：崩溃转储、调试开关打开后的响应体、按间隔记录的统计。

vLLM 的变量页里有一项把 API 响应写进日志用于调试。它也有一项按秒记录统计。开与不开是两种事实。

某项是否落盘、落在哪个文件、按什么级别落，都回到该运行器的说明去查，不靠惯例推断。

## [留存与删除要按顺序做|Retention and deletion, in order]

顺序错一步，删除就只是错觉。下面五步按顺序做，每步都要写日期。

- 先列写入点：日志、会话历史、缓存、临时文件、崩溃目录各算一条。
- 再定上限：按天数还是按大小轮转，两处都要写明由谁设置。
- 然后查副本：备份、同步盘、快照与容器卷是否另有一份。
- 删除之后复查：原路径与副本位置各查一次，两次都要有记录。
- 最后记口径：写了查了什么、哪天查、结论覆盖到哪个范围。

第五步的记录只证明记录当天的状态。它不证明过去，也不保证以后。

## [容量与成本的连带账|The capacity and cost side-effect]

日志吃的是磁盘，不吃容量工作台里那块内存预算，两笔账不要记在同一栏。

- 增长口径按「每天写入量 × 保留天数」自己估，本站不给任何通用数值。
- 任务内存的假设、字段与单位在容量工作台里逐项填：[上下文与并发预算](https://models.specul.com/guides/gpu-cost-math.html#capacity-workbench)。
- 费用构成用 [成本计算器](https://tools.specul.com/mcp/guides/cost-calculator.html) 记录，存储与备份是其中的独立项。
- 工作台的 KV 算式只管各层结构相同的标准全注意力 MHA / GQA 解码器，与日志留存没有推导关系；MLA、混合与滑动窗口要另算，磁盘那笔更不在它里面。

## [能说什么、不能说什么|What this does and does not establish]

能说的一句话是：本机能列出写入点、权限与保留期，而且每次核对都带日期。

不能说的一句话是：本地跑就满足了某个合规要求。加密不等于没人读得到，删了文件也不等于没有副本。

- 不写法律意见，不替代你所在辖区的义务判断。
- 不做「哪种部署更隐私」的排名，也不把某个运行器说成更安全。
- 未核到的字段一律留空，不用默认惯例把它填成事实。

结果核对与排查入口：[20 项自测清单](https://tools.specul.com/mcp/guides/selftest-20.html)、[按症状排查](https://tools.specul.com/mcp/guides/failure-library.html#by-symptom)。

## [和学 AI 站的分工|How this differs from the Learn site]

学 AI 站的 [数据驻留](https://learn.specul.com/term/%E6%95%B0%E6%8D%AE%E9%A9%BB%E7%95%99/)、[隐私与合规](https://learn.specul.com/term/%E9%9A%90%E7%A7%81%E4%B8%8E%E5%90%88%E8%A7%84/)、[本地部署](https://learn.specul.com/term/%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2/) 与 [可观测性](https://learn.specul.com/term/%E5%8F%AF%E8%A7%82%E6%B5%8B%E6%80%A7/) 是给使用者的一页科普。

这一篇给的是核对顺序、证据位置和说法边界。同一个概念在两处深度不同，互链不重复。

七件事的总入口见「本地跑起来之前先确认的七件事」。容量算法的边界见「GPU 事实与成本数学」。
