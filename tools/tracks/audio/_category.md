# audio 大类收录声明

**主题**：AI 音频与语音——语音合成（TTS）、音乐生成、语音转写产品。
定义与边界裁决见 [../../categories.md](../../categories.md) §5。

## 收录标准（三条全满足）

| # | 标准 |
|:--:|---|
| 1 | **音频生成 / 转写是产品主功能** |
| 2 | 有官方文档可核验八维 |
| 3 | 产物/声音克隆的授权条款可核验（permissions 维必答——声音克隆涉及人格权，「官方未声明」要写明查过哪里） |

**形态归属**（决定 `form:` 取值；⚠ 下表第一列不加反引号——audit.mjs 判据）：

| 形态 | 判据 |
|:--|:--|
| web | 主入口是网页应用（创作工作室形态） |
| cloud | 主入口是 API/平台服务（TTS/转写接口交付） |

**边界情况**：

| 情况 | 处理 |
|---|---|
| 会议软件的实时字幕 | 不收（AI 是次要功能） |
| 音频开发 SDK（TTS 引擎库） | 归 `framework` 或 nav，看官方定位 |
| 语音助手硬件 | 不收 |
| 声音克隆产品 | permissions 维必须写清官方授权要求 |

## 收录对象（17 份）

| id | 名称 | 厂商 | 形态 | 状态 |
|---|---|---|---|---|
| `moyin` | 魔音工坊 | 出门问问 | 网页服务 | 8 项已核 · 活跃 |
| `aiva` | AIVA | AIVA Limited | 网页服务 | 8 项已核 · 活跃 |
| `assemblyai` | AssemblyAI | AssemblyAI | 厂商云 | 8 项已核 · 活跃 |
| `cartesia` | Cartesia | Cartesia AI, Inc. | 网页服务 | 8 项已核 · 活跃 |
| `cosyvoice` | CosyVoice | 阿里 FunAudioLLM（开源） | 本机应用 | 8 项已核 · 活跃 |
| `deepgram` | Deepgram | Deepgram | 厂商云 | 8 项已核 · 活跃 |
| `elevenlabs` | ElevenLabs | ElevenLabs | 网页服务 | 8 项已核 · 活跃 |
| `f5-tts` | F5-TTS | SWivid / 上交 X-LANCE 等（开源） | 本机应用 | 8 项已核 · 活跃 |
| `fish-audio` | fish audio | fish.audio | 网页服务 | 8 项已核 · 活跃 |
| `minimax-audio` | MiniMax Audio（海螺语音） | MiniMax（稀宇科技） | 网页服务 | 8 项已核 · 活跃 |
| `murf` | Murf | Murf AI | 网页服务 | 8 项已核 · 活跃 |
| `otter` | Otter.ai | Otter.ai | 网页服务 | 8 项已核 · 活跃 |
| `resemble` | Resemble AI | Resemble AI | 网页服务 | 8 项已核 · 活跃 |
| `soundraw` | Soundraw | SOUNDRAW Inc. | 网页服务 | 8 项已核 · 活跃 |
| `suno` | Suno | Suno Inc. | 网页服务 | 8 项已核 · 活跃 |
| `udio` | Udio | Udio | 网页服务 | 8 项已核 · 活跃 |
| `whisper` | Whisper | OpenAI（开源） | 本机应用 | 8 项已核 · 活跃 |

> 共 **17** 份。本清单由 `scripts/gen-category-docs.mjs` 从 `products/*.md` 自动生成；改档案后重跑脚本，不要手改表格。

> 状态读法：左边是「这页的证据是否齐」，右边是「上游产品还在不在更新」。停更不等于资料残缺。
