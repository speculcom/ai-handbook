---
zh: "Flow Matching"
en: "Flow Matching"
purpose: "学一个从噪声到数据的连续速度场，用常微分方程把噪声推成样本。"
def: ["训练时让模型回归「从噪声点指向数据点」的速度，而不是直接预测噪声或像素。", "推理时从噪声出发，沿速度场积分若干步，得到样本。", "它是扩散模型之外的连续生成框架。Stable Diffusion 3、Flux 等图像模型采用了 rectified flow 变体。"]
why: "扩散模型要很多步采样，Flow Matching 把「走哪条路」学得更直，步数可以更少。理解它，才能看懂 2025–2026 图像 / 视频生成模型为什么普遍从「扩散」转向「流」。"
refs:
  - ["Flow Matching（Lipman 2022）", "https://arxiv.org/abs/2210.02747", "Flow Matching for Generative Modeling (2022)"]
  - ["Rectified Flow（2022）", "https://arxiv.org/abs/2209.03003", "Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow (2022)"]
domain: "media"
purposeTag: "learn"
level: 6
layer: "六"
ord: 37
last_verified: "2026-11-18"
verified_scope: "refs"
---

# Flow Matching

**解决什么问题**

扩散模型学的是「每一步加了多少噪声」，采样要沿一条弯曲的随机路径走很多步。Flow Matching 直接学一个速度场，把噪声点沿常微分方程推到数据点。路径可以更直，步数更少。

**怎么做**

训练时采样噪声与数据，构造一条连接两者的路径（直线或更一般的概率路径）。让网络回归该点的速度。推理时从噪声出发，用 Euler / Heun 等积分器走若干步。Rectified Flow 进一步用「拉直」让路径更接近直线。

**为什么需要知道**

它是 2025–2026 图像与视频生成模型的主流之一。看到「8 步出图」「流式视频」这类说法，底层往往不是传统 50 步扩散。它常是 flow / rectified flow 加蒸馏。

**边界**

Flow Matching 不是「一步生成」。少步仍会损失细节，步数与学生模型、调度器有关。它不是只用于图像。音频、视频、3D、动作生成都能用。但不同模态的路径设计与评估不同。论文里的 FID 提升不等于人类偏好提升。

---
<!-- 站：第六站 · 前沿 · 生成模型的「走法」本身也是一个可学的对象。 -->

