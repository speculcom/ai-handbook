---
zh: "ONNX（开放神经网络交换格式）"
en: "ONNX (Open Neural Network Exchange)"
alias: ["开放神经网络交换格式", "ONNX 格式", "onnx"]
purpose: "让不同框架训练出的模型用同一种文件格式交换和部署。"
def: ["ONNX 定义计算图、算子与数据类型的开放标准，推理引擎可以直接加载。", "它不负责训练，解决的是「一个框架训练、另一个环境推理」的格式壁垒。"]
why: "跨平台部署、边缘设备、供应商替换都会碰到它。算子覆盖不全时仍需回退或自定义。"
refs:
  - ["ONNX · 官方网站", "https://onnx.ai/", "ONNX official site"]
  - ["ONNX · 官方仓库", "https://github.com/onnx/onnx", "ONNX repository"]
domain: "infra"
purposeTag: "apply"
level: 5
layer: "五"
ord: 37
last_verified: "2026-11-17"
verified_scope: "refs"
figure: "fig-onnx.svg"
figure_caption: "ONNX 位于训练与部署之间。不同框架导出同一个计算图格式。不同推理引擎再各自加载。"
figure_caption_en: "ONNX sits between training and deployment: frameworks export one graph format, and different inference engines load it."
---

# ONNX（开放神经网络交换格式）（ONNX (Open Neural Network Exchange)）

**解决什么问题**：让不同框架训练出的模型用同一种文件格式交换和部署。

ONNX 定义计算图、算子与数据类型的开放标准，推理引擎可以直接加载。

它不负责训练，解决的是「一个框架训练、另一个环境推理」的格式壁垒。

**别名**：开放神经网络交换格式、ONNX 格式、onnx

**为什么需要知道**：跨平台部署、边缘设备、供应商替换都会碰到它。算子覆盖不全时仍需回退或自定义。

**看具体例子**：
- [ONNX · 官方网站](https://onnx.ai/)
- [ONNX · 官方仓库](https://github.com/onnx/onnx)

---

<!-- 站：第五站 · 由 2026-11-17 内容补齐批次新增。 -->
