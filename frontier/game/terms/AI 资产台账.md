---
zh: "AI 资产台账"
en: "AI asset ledger"
kind: "keyword"
ord: 101
what: "一份记录「每个资产从哪来、能不能商用」的表格。它不是法务要求，是保命要求。"
whatEn: "A table recording where each asset came from and whether it can be used commercially. It is not a legal formality — it is what saves the project."
decision: "建表成本 10 分钟，不建的成本是项目作废。"
decisionEn: "Building it costs ten minutes. Not building it can void the project."
confidence: our-judgement
---

# AI 资产台账

**定义**：一张记录每份资产**来源**与**授权**的表格。

<!-- EN -->
>  and **licence** of every asset.

## 为什么它比你想的更重要

⚠ ：模型训练用了什么数据、
输出能不能商用，取决于服务条款，而**条款随时会变**。

半年后你想上架时，才发现当初用的那个服务**改了条款**：你无从得知。

<!-- EN -->
> ## Why it matters more than you would think
>
> ⚠ The commercial rights of AI-generated assets are usually unclear — what data the model was trained on, and whether you may sell its output, comes down to the service terms. And .
>
> Six months later, when you try to ship, you find out the service you used changed its terms — and you had no way of knowing.

## 最简格式

| 文件/目录 | 来源 | 授权 | 待确认 |
|---|---|---|---|
| `hero.png` | 自己画的 | 本人原创 | — |
| `bgm.mp3` | 生成式音乐工具 X | 见条款 v2026-01 | ⚠ 是 |
| `coin.wav` | freesound.org | CC0 | — |
| `font.ttf` | 某某字体站 | ⚠ 个人免费 | ⚠ 是 |



<!-- EN -->
> ## The simplest useful format
>
> | File / directory | Source | Licence | Unconfirmed |
> |---|---|---|---|
> | `hero.png` | drawn by me | my own work | — |
> | `bgm.mp3` | generative music tool X | see terms v2026-01 | ⚠ yes |
> | `coin.wav` | freesound.org | CC0 | — |
> | `font.ttf` | some font site | ⚠ free for personal use | ⚠ yes |
>
> Rule: before you ship, the "unconfirmed" column must be empty.

## 三条实操规则

**1. 程序化生成最安全**

代码画出来的图形版权归你，没有第三方来源问题。
程序化美术（procedural art）在这一层优势明显。



每个人都会检查图片和音频的授权，**很少有人检查字体**。
而绝大多数免费字体的授权是「个人免费」，**不含商用**。



用了 CC-BY 素材而没署名，**可能违反协议**。
混用时注意保留署名信息。

<!-- EN -->
> ## Three practical rules
>
> 1. Procedural generation is the safest
>
> Code-drawn shapes are yours; there is no third-party provenance question. Procedural art has a clear advantage here.
>
> 2. ⚠ Fonts are the most forgotten
>
> Everyone checks the licence on images and audio. Almost nobody checks fonts — and most "free" fonts are free for personal use, **not** for commercial use.
>
> 3. CC-BY requires attribution
>
> Using CC-BY material without crediting it may breach the licence. Keep the attribution when you mix.

## 把「有授权」当成「可商用」

> 「AI 生成的就都是我的」

⚠ 不一定。模型训练数据的来源通常不明确，
「输出属于用户」是服务方给的授权，不是版权法的结论。

<!-- EN -->
> ## Mistaking "licensed" for "commercially usable"
>
> > "AI made it, so it's mine"
>
> ⚠ Not necessarily. The provenance of the training data is usually unclear, and "the output belongs to you" is a grant from the service provider, not a conclusion of copyright law.

## 什么时候建

**从第一天就建。** 事后补是补不回来的：你已经想不起来
三周前那张图是从哪拿的了。

<!-- EN -->
> ## When to start it
>
> **Day one.** You cannot backfill it later — by then you will not remember where the image from three weeks ago came from.

---

<!-- 层：关键词 · 一个成本 10 分钟、不做会让项目作废的习惯。 -->