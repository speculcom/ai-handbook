---
id: media-selection
topic: planning
title: 图像 / 视频 / 音频工具怎么选
titleEn: How to choose image, video and audio tools
summary: 商用许可先过筛，再看输入输出与编辑链、本地还是云端、中文与区域可用；最后按产量估算成本。
summaryEn: Screen for commercial licensing first, then input/output and edit chains, local vs cloud, Chinese and regional access; finally estimate cost by volume.
sources:
  - label: Adobe · Firefly 官方页（商用安全与生成模型说明）
    url: https://www.adobe.com/products/firefly.html
    kind: official
  - label: Runway · 官方定价与许可入口
    url: https://runwayml.com/pricing
    kind: pricing
  - label: ElevenLabs · 官方定价与语音克隆条款
    url: https://elevenlabs.io/pricing
    kind: pricing
  - label: OpenAI · Terms of Use（生成内容归属与使用条款）
    url: https://openai.com/policies/row-terms-of-use/
    kind: docs
  - label: Google · Gemini API Additional Terms（生成内容与 SynthID 口径）
    url: https://ai.google.dev/gemini-api/terms
    kind: docs
last_verified: 2026-11-03
confidence: partial
---

## [这一篇讲什么|What this guide covers]

图像、视频、音频工具的第一道筛子不是「效果好不好」，而是**商用许可**。
第二道是输入输出与编辑链，第三道是本地还是云端，最后才是价格。
本篇不排名、不报价格；许可原文与定价以官方页为准。

<!-- EN -->
> The first screen for image, video and audio tools is not "does it look good" but **commercial licensing**.
> The second is input/output and edit chains, the third is local vs cloud, and price comes last.
> This guide ranks nothing and quotes no prices; licence text and pricing follow the official pages.

## [第一道：商用许可|First: commercial licensing]

| 要核对的 | 为什么 | 去哪里看 |
|---|---|---|
| 生成内容能否商用 | 免费档常只允许个人使用 | 官方 terms / pricing 页 |
| 训练数据来源 | 部分工具宣称「商用安全」，依据是训练数据授权 | 官方 trust/legal 页 |
| 语音克隆与肖像 | 需要被克隆者的授权；平台可能要求额外验证 | 官方 voice/face cloning 条款 |
| 字体与素材嵌入 | 字体许可按嵌入方式分档，游戏/App 内嵌常需商用授权 | 字体官方许可页 |

<!-- EN -->
> | What to check | Why | Where |
> |---|---|---|
> | Commercial use of output | Free tiers often allow personal use only | official terms / pricing pages |
> | Training-data provenance | Some tools claim "commercially safe" based on licensed training data | official trust/legal pages |
> | Voice cloning and likeness | You need consent from the person cloned; platforms may require extra verification | official voice/face cloning terms |
> | Font and asset embedding | Font licences differ by embedding method; game/App embedding often needs a commercial licence | the font's official licence page |

## [第二道：输入输出与编辑链|Second: input/output and edit chain]

- **输入**：文生图、图生图、视频生视频、音频驱动口型，支持的输入类型决定工作流。
- **输出**：分辨率、时长、水印、文件格式；能否导出无损或分层文件。
- **编辑链**：能否局部重绘、扩图、替换主体、保持角色一致性；是否支持时间线或分镜。
- **批量与 API**：要量产就看是否有官方 API、并发限制与商用条款，而不是只看网页版。

<!-- EN -->
> - **Input**: text-to-image, image-to-image, video-to-video, audio-driven lip sync; supported inputs determine the workflow.
> - **Output**: resolution, duration, watermark, file format; whether lossless or layered files can be exported.
> - **Edit chain**: inpainting, outpainting, subject replacement, character consistency; timeline or storyboard support.
> - **Batch and API**: for volume, check official APIs, concurrency limits and commercial terms, not just the web UI.

## [第三道：本地还是云端|Third: local vs cloud]

- **本地**：模型权重与算力在你手里，适合隐私敏感、离线、长期高频；代价是显卡、部署与运维。
- **云端**：开箱即用、模型更新快；代价是按量计费、数据出境与网络依赖。
- **混合**：本地跑批量、云端做难例，是常见折中；要确认两端产出的格式与许可一致。

<!-- EN -->
> - **Local**: weights and compute stay with you — good for privacy, offline use and high long-term volume; the cost is GPUs, deployment and operations.
> - **Cloud**: ready to use and fast to update; the cost is metered billing, cross-border data and network dependency.
> - **Hybrid**: local for batches, cloud for hard cases — a common compromise; confirm both sides produce compatible formats and licences.

## [第四道：中文与区域可用|Fourth: Chinese and regional access]

- 中文提示词的遵循度、中文文字渲染、中文语音的自然度，都要用你自己的样本测。
- 国内直连、备案与数据出境是独立约束；海外工具在大陆可能直连超时。
- 商用发布还要看平台对 AI 生成内容的标识要求（水印、内容凭证）。

<!-- EN -->
> - Test Chinese prompt adherence, Chinese text rendering and Chinese speech naturalness with your own samples.
> - Mainland reachability, filing and cross-border data are separate constraints; overseas tools may time out from the mainland.
> - Commercial publishing also depends on AI-content labelling rules (watermarks, content credentials).

## [常见误判|Common misreads]

- **把「免费可用」当成「可商用」**：免费档通常不含商用授权。
- **把「生成效果好」当成「工作流可用」**：不能局部修改或保持一致性，产量一大会返工。
- **把「有网页版」当成「有 API」**：量产要看官方 API 与并发限制。
- **忽略字体与音乐**：生成画面之外的字体、配乐、音效仍受各自许可约束。

<!-- EN -->
> - **Mistaking "free to use" for "licensed for commercial use"**: free tiers usually exclude commercial rights.
> - **Mistaking "good output" for "usable workflow"**: without local editing or consistency, volume creates rework.
> - **Mistaking "has a web UI" for "has an API"**: volume depends on official APIs and concurrency limits.
> - **Ignoring fonts and music**: fonts, scores and sound effects outside the generated image keep their own licences.
