---
id: moe-selection
stage: 6
title: MoE 选型：总参数、激活参数与真实成本
titleEn: Choosing an MoE model: total parameters, active parameters and real cost
summary: MoE 把「参数量」拆成总参数与激活参数两个数字。选型时要同时算显存、带宽、通信和批量，而不是只看总参数或榜单。
summaryEn: An MoE splits “parameter count” into total and active parameters. Selection must budget memory, bandwidth, communication and batch size together, not just total parameters or leaderboard scores.
sources:
  - label: Switch Transformer（arXiv 2101.03961，稀疏激活与负载均衡的原始工作，2026-11-17 直抓摘要页）
    url: https://arxiv.org/abs/2101.03961
    kind: paper
  - label: Mixtral of Experts（arXiv 2401.04088，8 专家 top-2、47B 总参数 / 13B 激活，2026-11-17 直抓摘要页）
    url: https://arxiv.org/abs/2401.04088
    kind: paper
  - label: DeepSeek-V3 技术报告（arXiv 2412.19437，671B 总参数 / 37B 激活、无辅助损失负载均衡，2026-11-17 直抓摘要页）
    url: https://arxiv.org/abs/2412.19437
    kind: paper
last_verified: 2026-11-17
confidence: verified
---

## [先分清两个数字|Two numbers first]

MoE 的「参数量」几乎总要拆成两栏：**总参数**与**每 token 激活参数**。
**依据：** Mixtral 8×7B 每层 8 个专家、每 token 选 2 个，总参数 47B，推理时只激活 13B；
DeepSeek-V3 总参数 671B，每 token 激活 37B。
两个数字回答的是不同问题：总参数决定要装下多少权重，激活参数决定每 token 大约要做多少计算。

## [省的是算力，不是显存|You save compute, not memory]

稀疏激活降低的是每 token 的 FLOPs，不是权重占用的显存。
所有专家通常都要常驻显存，或者从内存/闪存按需换入；后者的瓶颈会从算力变成带宽。
粗算显存：`总参数 × 每参数字节 + KV cache + 运行时开销`。
4-bit 量化的 47B 模型仍需约 24 GB 权重，再叠加 KV cache；13B 激活并不意味着 13B 的显存。
先按总参数选卡，再按激活参数估速度，顺序不能反。

## [路由与负载均衡|Routing and load balance]

MoE 的路由器只给每个 token 选少数专家，训练时容易出现「少数专家吃掉大部分 token」的坍塌。
Switch Transformer 用辅助负载均衡损失约束专家利用率；
DeepSeek-V3 报告了无辅助损失的负载均衡策略，并在 14.8T token 预训练中保持稳定。
选型时不要只看「专家数」；要问：推理框架是否支持这套路由、是否有容量因子、超长尾批次会不会把某些专家打爆。

## [并行与通信|Parallelism and communication]

专家并行会把不同专家放到不同卡上，token 需要 all-to-all 发送到对应专家再收回。
这会引入通信开销，也会让小批量推理更难摊薄。
单卡能放下时，优先单卡或张量并行；跨机专家并行适合高吞吐服务，不适合低并发交互。
批量越大，路由越容易均衡、吞吐越高；批量小且任务杂时，尾延迟更明显。

## [选型清单|Selection checklist]

1. 用**总参数 + 量化档位**算权重显存，用**激活参数**估单 token 算力。
2. 确认推理框架支持该模型的路由与专家并行；不支持时，纸面参数没有意义。
3. 测 batch=1 的首字延迟与 batch=32 的吞吐，两者常常差一个数量级。
4. 在你的任务集上比较 MoE 与同激活量的 dense 模型，不要用榜单总分代替。
5. 问清容量因子与丢弃策略：被丢弃的 token 会直接影响答案质量。

**边界**：以上参数来自各自论文摘要；不同版本的量化、并行配置和上下文长度都会改变实际占用，部署前必须实测。

**先补概念**：[MoE - 混合专家](https://learn.specul.com/term/MoE%20-%20%E6%B7%B7%E5%90%88%E4%B8%93%E5%AE%B6/) 与 [专家卸载](https://learn.specul.com/term/%E4%B8%93%E5%AE%B6%E5%8D%B8%E8%BD%BD/) 是学 AI 站的相关科普。
