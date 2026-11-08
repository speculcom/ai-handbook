---
zh: "怎么给 AI 美术素材做商用可用性判断"
en: "How to check AI art for commercial use"
stage: 4
ord: 45
what: "对每张 AI 生成的图走一遍三条线：服务条款的授予、你的输入素材、版权保护的未知 —— 结论按状态记录，不按感觉记录。"
whatEn: "Run every AI-generated image through three checks: what the service terms grant, what you fed the model, and the unsettled copyright question. Record states, not feelings."
decision: "三条线里任何一条说不清，状态就只能写「待确认」；商用可用性是被证明的，不是被默认假设的。"
decisionEn: "If any of the three lines is unclear, the state can only be 'unconfirmed'. Commercial usability is proven, never assumed."
confidence: our-judgement
---

# 怎么给 AI 美术素材做商用可用性判断

**这篇解决什么**：AI 生成的一张图能不能放进要卖、要发布的包里。它和 [AI 生成内容的版权归属](./ai-生成内容的版权.html) 的关系是：那篇讲为什么问题存在，这篇讲单张素材怎么走完判断。

<!-- EN -->
> **What this guide solves**: whether one AI-generated image may enter a package you will ship or sell. Its relation to [Copyright of AI-generated work](./ai-生成内容的版权.html): that entry explains why the question exists; this one walks a single asset through the decision.

## 适用条件

- ✅ 素材由某个生成服务产出（图像、贴图、图标、概念图）
- ✅ 项目存在商用可能：上架、带货金、接受捐赠、公司项目都算
- ⚠ 不适用：你自己画的图（直接进台账，来源填本人）与引擎商店素材（按对应商店条款走）
- 本站不是法律意见，也不对任何司法辖区下结论；这篇给的是**工程上可执行的检查流程**。

<!-- EN -->
> ## When this applies
>
> - ✅ The asset came out of a generation service (images, textures, icons, concept art)
> - ✅ There is a commercial path for the project: stores, monetised releases, donations, company work
> - Not for art you drew yourself (goes straight into the ledger, source: you) or engine-store assets (that store's terms decide)
> - This site is not legal advice and concludes for no jurisdiction. What follows is an **executable engineering check**.

## 三条线

1. **服务条款线**：生成时的服务条款是否授予商用？注意三点 —— 授予可能按**套餐档位**不同；条款**会变**；「授予你使用输出」不等于「输出归你所有」。这是服务方给的许可，不是版权法的结论。
2. **输入线**：提示词之外，你是否垫了有版权的图（参考图、IP 角色）？输入带着别人的权利，输出不会自动洗干净。
3. **版权线**：纯 AI 输出能否获得著作权保护，各司法辖区结论不同（见 [AI 生成内容的版权归属](./ai-生成内容的版权.html)）。这条线你**无法在工程上清零**，只能知道风险在哪：条款授予你使用权，不等于你能起诉抄袭者。

<!-- EN -->
> ## The three lines
>
> 1. **Service terms**: do the terms at generation time grant commercial use? Three cautions — the grant may differ by **subscription tier**; terms **change**; "you may use the output" is not "you own the output". It is a licence from the provider, not a conclusion of copyright law.
> 2. **Your inputs**: besides the prompt, did you feed copyrighted images (reference art, an IP character)? Rights that entered with your inputs do not wash off in the output.
> 3. **Copyright status**: whether purely AI-generated output is copyright-protectable differs across jurisdictions (see [Copyright of AI-generated work](./ai-生成内容的版权.html)). This line cannot be cleared by engineering — only understood: the terms may let you use it without granting you a claim against copycats.

## 步骤

1. **登记三件事**：服务名、账号档位、生成日期。缺任何一件，后面无法复核。
2. **当日核对条款文本**：打开该服务**当前的**条款/许可页，找到关于输出商用授予的原文，摘录一句进台账备注，写核验日。档位差异是真实存在的 —— 例如 Stability AI 官方许可页按其口径描述了不同许可范围下的商用条款（见文末核验表；具体边界以该页当前文本为准）。
3. **过输入线**：翻生成记录，确认没有垫第三方有版权的图；用了 IP 参考图的，直接判「不可用」，不要指望模型稀释。
4. **给出状态**：条款有明确商用授予 + 输入干净 → 「可商用（附条款摘录与核验日）」；条款含糊、档位不明、页面无商用字样 → 「待确认」；条款明确限制 → 「不可商用」。
5. **「待确认」只有两种出路**：发布前换成条款明确的素材，或回到第 2 步拿到能存档的证据。
6. **写进台账**：全部字段按 [怎么做一份素材与许可台账](./怎么做一份素材与许可台账.html) 的七列落位；对照物是 CC0（无需请求即可商用，见核验表）——生成素材拿它当「什么叫条款清楚」。

<!-- EN -->
> ## The steps
>
> 1. **Register three facts**: service, account tier, generation date. Missing any one makes later re-checks impossible.
> 2. **Read the current terms, today**: open the service's terms/licence page now, find the sentence on commercial rights to outputs, quote it into the ledger note with a verification date. Tier differences are real — Stability AI's official licence page describes commercial terms across its licence scopes (table at the end; the page's current text is the boundary).
> 3. **Run the input check**: go through generation records — no third-party copyrighted images fed in? An IP reference image means "not usable", full stop; do not hope the model dilutes it.
> 4. **Assign a state**: explicit commercial grant + clean inputs → "commercial OK (quote + date)"; vague terms, unknown tier, no commercial wording → "unconfirmed"; explicit restriction → "not commercial".
> 5. **"Unconfirmed" has exactly two exits**: replace the asset before release with one whose terms are clear, or return to step 2 and get archivable evidence.
> 6. **File it in the ledger**: all fields per the seven columns of [How to build an asset and licence ledger](./怎么做一份素材与许可台账.html). The reference point is CC0 — commercially usable without asking (see the table); treat it as the picture of "what clear terms look like".

## 一个可走查的例子

⚠ 服务名（泛指的工具 X）、图标数量与状态变化是**虚构示例**。

- **输入**：用工具 X 免费档生成 12 个 UI 图标（虚构），项目计划上 itch 页面接受付费下载。台账初始行：服务 X / 免费档 / 生成日期 2026-10（虚构）。
- **处理**：第 2 步打开工具 X 当前条款页 → 免费档文本没有出现商用授予字样；输入线检查：12 张全部纯文字提示词，干净。
- **结果判断**：条款线不清 → 状态「待确认」—— 哪怕「大家都这么用」也不改判；12 个图标暂不进导出包。
- **失败后下一步**：路线 A：升级到有商用字样的档位、重新生成、条款页截图存档、状态改「可商用」；路线 B：改用 CC0 图标包（对照：CC0 官方页写明商用无需请求许可），台账记来源与许可页。例子选了 B，因为图标不是核心美术。

<!-- EN -->
> ## A walk-through example
>
> ⚠ The service (a generic "tool X"), the icon count and the status change are **fictitious examples**.
>
> - **Input**: 12 UI icons generated on tool X's free tier (invented); the plan is a paid-download itch page. Ledger row: tool X / free tier / generated 2026-10 (invented).
> - **Processing**: step 2 opens tool X's current terms → the free-tier text carries no commercial grant; input check: all twelve were prompt-only, clean.
> - **Result**: the terms line is unclear → state "unconfirmed" — "everyone does this" does not change the verdict; the twelve icons stay out of the export.
> - **After the failure**: route A — move to a tier whose text states commercial use, regenerate, screenshot and date the terms page, flip to "commercial OK"; route B — switch to a CC0 icon pack (reference: the CC0 page allows commercial use without asking), with source and licence page in the ledger. This example took B, because the icons are not the key art.

## 失败分支

| 失败形态 | 下一步 |
|---|---|
| 条款页当日打不开或版本混乱 | 记「未核验」+ 日期；本站 2026-11-06 尝试访问部分主流生成服务条款页未成功 —— 这本身就是标「待确认」的理由，不是默认可用的理由 |
| 输出与某个已有角色高度相像 | 换提示方向重做；相像不是「风格致敬」能解决的，风险在形象本身 |
| 已经发布后发现条款变了 | 按台账核验日回溯当时的文本评估暴露面；处理走 [AI 资产台账](./ai-资产台账.html) 的「条款会变」条目 |
| 说不清当时用的哪个档位 | 该行降「待确认」，能复现生成就重记，不能就替换素材 |

<!-- EN -->
> ## Failure branches
>
> | Shape of failure | Next step |
> |---|---|
> | The terms page is unreachable or version-murky | Log "unverified" with the date; on 2026-11-06 this site failed to reach some major generators' terms pages — that is a reason to mark "unconfirmed", never a reason to assume usable |
> | The output strongly resembles an existing character | Regenerate with a different direction; "style homage" does not defuse it — the risk is the likeness itself |
> | Terms changed after you shipped | Use the ledger's verification date to reconstruct what you saw at the time; handling: the "terms change" note in the [AI asset ledger](./ai-资产台账.html) |
> | Nobody remembers which tier generated it | Demote the row to "unconfirmed"; re-record if the generation is reproducible, replace the asset if not |

## 下一步

- 素材进包前的清零流程：[怎么做一份素材与许可台账](./怎么做一份素材与许可台账.html)
- 阶段总览与人做素材的许可分层：[S4 · 资产合规](./s4-资产合规.html)

<!-- EN -->
> ## Next steps
>
> The clear-before-packaging flow: [How to build an asset and licence ledger](./怎么做一份素材与许可台账.html)
> Stage overview and the licence tiers for human-made art: [S4 · Asset licensing](./s4-资产合规.html)

## 来源与核验日

- 商用条款按许可范围划分（以 Stability 为例，边界以其页面当前文本为准） — [Stability AI 官方许可页](https://stability.ai/license) · 2026-11-06
> Commercial terms are scoped by licence tier (Stability shown as an example; its current page text is the boundary) — [Stability AI licence page](https://stability.ai/license) · 2026-11-06
- CC0：可商用、无需请求许可 — [CC0 1.0 官方页](https://creativecommons.org/publicdomain/zero/1.0/) · 2026-11-06
> CC0: commercial use allowed without asking — [CC0 1.0 official page](https://creativecommons.org/publicdomain/zero/1.0/) · 2026-11-06
- CC BY 4.0：商用须按规范署名 — [CC BY 4.0 官方页](https://creativecommons.org/licenses/by/4.0/) · 2026-11-06
> CC BY 4.0: commercial use requires attribution as specified — [CC BY 4.0 official page](https://creativecommons.org/licenses/by/4.0/) · 2026-11-06
- OpenAI、Midjourney 等服务的条款页 — 本站 2026-11-06 访问未成功，未核验 —— 涉及时一律按「待确认」处理 · —
> Terms pages for services such as OpenAI and Midjourney: our fetch failed on 2026-11-06, so anything touching them stays marked to-verify — fetch failed on 2026-11-06 · —
- 纯 AI 输出的版权保护程度 — 各司法辖区结论不同，官方未给统一结论；本站不代判 · —
> How far purely AI-generated output is copyright-protected differs by jurisdiction and there is no unified official answer; we do not decide it for you — no unified official answer across jurisdictions · —
- 「三条线」框架与状态三分法 — 本站的判断（工程检查流程），不是法律意见 · —
> The three-line framework and three-state labels are our engineering checklist design, not legal advice — our checklist design, not legal advice · —

---

<!-- 层：阶段词条 · 一张 AI 图从「好看」到「能进包」之间的三条线。 -->
