# audio 大类收录清单（inventory）

> 去向枚举：`已有` / `待建`（P1>P2>P3）/ `只进nav` / `不收`（必须带理由）。
> 收录标准见 [categories.md §5](../categories.md)：TTS/音乐生成/转写是**主功能**；声音克隆的授权条款 permissions 维必答；音频 SDK 看官方定位归 framework 或 nav。
> 候选来源交叉（≥2）：nav cat=gen 音频向约 10 条 + 计划候选名单 + 2026-10-21 官方核验补漏（23 个 URL 直抓）。
> 本类现有档案 17 份（T6 升八维批 2 + T28 建档批 8 + C6-2 建档批 2 + C6-3 建档批 5）。

| 工具 | 厂商 | 官方 URL | 去向 | 档案 id | 理由/备注 |
|---|---|---|---|---|---|
| Suno | Suno | https://suno.com | 已有 | suno | 直抓 200 |
| ElevenLabs | ElevenLabs | https://elevenlabs.io | 已有 | elevenlabs | 直抓 200 |
| Udio | Udio | https://www.udio.com | 已有 | udio | T28 落地 · 直连 200 · 版权和解转型期（UMG 2025-10-29/WMG 2025-11-19 官方公告直抓）· walled garden 方向 |
| MiniMax Audio（海螺语音） | MiniMax | https://www.minimax.io | 已有 | minimax-audio | T28 落地 · 直连 200 · 备案号 Shanghai-MiniMax-202505230046（模型层）· 克隆授权线必答 · L5 |
| Whisper | OpenAI（开源） | https://github.com/openai/whisper | 已有 | whisper | T28 落地 · MIT 权重（官方仓 LICENSE 直抓）· form: local-app · 生态（whisper.cpp 等）在 runtime 维带出 |
| fish audio | fish.audio | https://fish.audio | 已有 | fish-audio | T28 落地 · 直连 000（代理 200）· zero-shot 克隆+音色市场 · 注册主体未核验到→filing: unknown 诚实标注 |
| Deepgram | Deepgram | https://www.deepgram.com | 已有 | deepgram | T28 落地 · 直连 200 · 转写 API 平台（form: cloud）· Nova/Aura 双线（docs/models 直抓） |
| AssemblyAI | AssemblyAI | https://www.assemblyai.com | 已有 | assemblyai | T28 落地 · 直连 200 · 同上 · LeMUR「转写+理解」差异叙事 |
| Otter.ai | Otter | https://otter.ai | 已有 | otter | T28 落地 · 直连 200 · 转写产品（会议记录是主功能——不是「会议软件里的实时字幕」）· 机器人入会合规面 |
| 魔音工坊 | 出门问问 | https://www.moyin.com | 已有 | moyin | T28 落地 · 直连 200 · 算法备案在清单（原始附件未直抓→编号以官方查询平台为准）· L5 |
| Murf | Murf AI | https://murf.ai | 已有 | murf | C6-2 落地 · 直连 200 · 工作室+API+语音agent 三线（官网招牌已转向 agent 平台）· 克隆 FAQ 只给法律提示 |
| CosyVoice | 阿里 FunAudioLLM（开源） | https://github.com/FunAudioLLM/CosyVoice | 已有 | cosyvoice | C6-2 落地 · 仓迁 QwenAudio org（301 当日核验）· Apache-2.0（GitHub API）· 三代线 · L5 只转述官方 |
| F5-TTS | SWivid 等（开源） | https://github.com/SWivid/F5-TTS | 已有 | f5-tts | P3 · C6-3 落地（MIT ★15,487 当日核验；ModelScope 直连 200=大陆获取路径） |
| Play.ht | PlayAI（2025-07 被 Meta 收购） | https://play.ht | 不收 | | 停运坐实（C6-10 复核，2026-10-31）：DoH 解析 play.ht/www.play.ht 均无 A 记录=域名停止解析；playht.com 解析到 162.4.84.240（冒名站嫌疑，第三方多源点名 playhtai.com 等冒名）；docs.play.ht（readme.io 托管）仍在线=文档残骸非产品。停运线：Meta 2025-07 收购 PlayAI（TechCrunch 2025-07-13 确认报道）、API 2025-07-26 下线、2025-12-31 永久停服无迁移路径。nav 条目已 retired=true。L6 停运不收 |
| AIVA | AIVA | https://www.aiva.ai | 已有 | aiva | P3 · C6-3 落地（版权按档位分层：免费档归平台限四平台变现/Pro 永久完整版权） |
| Soundraw | Soundraw | https://soundraw.io | 已有 | soundraw | P3 · C6-3 落地（in-house 训练自述叙事；无独立 changelog 页） |
| Resemble AI | Resemble AI | https://www.resemble.ai | 已有 | resemble | P3 · C6-3 落地（**定位已整体转向深伪检测/水印**——生成语音线转 Research Archive 不再商用售卖；permissions 维=身份注册涉生物特征） |
| Cartesia | Cartesia | https://cartesia.ai | 已有 | cartesia | P3 · C6-3 落地（Sonic TTS+Ink STT+Managed Agents 三线；44 语言） |
| Speak | Speak | https://www.speak.com | 只进nav | | 官方定位开发者语音平台（SDK/API 向）——categories.md 边界「音频 SDK 看官方定位」→nav |
| Boomy | Boomy | https://boomy.com | 只进nav | | 直抓 000 未能核验（2026-10-21）；轻量玩具向音乐生成——先只进nav |
| VALL-E（VALL-E-X） | 微软 | https://github.com/microsoft/VALL-E-X | 不收 | | 官方仓 URL 已 404（2026-10-21 直抓核验：仓库不存在或已删）——官方入口消失，不收（同 GPT-Frontend 先例） |

## 备注

- 本类 17 已有——T28（audio +8）已落地 P1（4）+ P2（4）；C6-2 落地 murf/cosyvoice；C6-3 落地 f5-tts/aiva/soundraw/resemble/cartesia；P3 唯一余项 playht 已于 C6-10（2026-10-31）裁决**不收**（停运坐实：域名停解析+Meta 收购后 2025-12-31 永久停服）——**audio 大类 inventory 全部销账**。
- **厂商修正**：魔音工坊厂商是出门问问（原候选名单误写标贝科技——算法备案清单主语「出门问问语音合成类算法（魔音工坊）」纠正了它）。
- **声音克隆授权线**（收录标准 3）：fish audio/Resemble/ElevenLabs 克隆声音涉人格权——permissions 维要写官方条款原文，「官方未声明」要写明查过哪些页面（L4）。
- 会议软件实时字幕（Teams/Zoom 字幕等）不收——categories.md 边界点名，不单列行。
- 开源模型（Whisper/CosyVoice/F5-TTS）入口=官方 GitHub 仓；「模型名+托管产品」双身份时收产品入口（如 MiniMax Audio），纯开源仓按 runner 类同款口径收仓。
