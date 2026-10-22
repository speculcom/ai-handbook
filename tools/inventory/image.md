# image 大类收录清单（inventory）

> 去向枚举：`已有` / `待建`（P1>P2>P3）/ `只进nav` / `不收`（必须带理由）。
> 收录标准见 [categories.md §3](../categories.md)：图像生成/编辑是**主功能**（通用软件里的 AI 滤镜不收）；3D 生成不收；图像 API 平台归本类 `form: cloud`。
> 候选来源交叉（≥2）：nav cat=gen 图像向约 15 条 + 计划候选名单 + 2026-10-21 官方核验补漏（20 个 URL 直抓：200 或 CF-403 拦截，无 404 死链）。
> 本类现有档案 13 份（T6 升八维批 3 + T26 建档批 10）。

| 工具 | 厂商 | 官方 URL | 去向 | 档案 id | 理由/备注 |
|---|---|---|---|---|---|
| Midjourney | Midjourney | https://www.midjourney.com | 已有 | midjourney | 直抓 403（CF 拦截非死链） |
| Stable Diffusion / Stability AI | Stability AI | https://stability.ai | 已有 | stability-ai | |
| FLUX（BFL 平台） | Black Forest Labs | https://bfl.ai | 已有 | flux | |
| 即梦 | 字节跳动（剪映团队） | https://jimeng.jianying.com | 已有 | jimeng | T26 落地 · 直抓 200 · L5 只转述官方 · AI 服务备案号未核验到（只核到 ICP）→filing: unknown |
| 通义万相 | 阿里巴巴 | https://tongyi.aliyun.com/wanxiang | 已有 | tongyi-wanxiang | T26 落地 · Wan 权重 Apache-2.0（GitHub API 核验）· filing_no: Shanghai-TongYiWanXiang-202410090024 |
| Ideogram | Ideogram（多伦多/旧金山） | https://ideogram.ai | 已有 | ideogram | T26 落地 · 4.0 开放量化权重（非商用免费）+4.5 闭源 · 直连 000 |
| Recraft | Recraft | https://www.recraft.ai | 已有 | recraft | T26 落地 · 矢量原生（SVG）· 免费档不可商用硬线 |
| Adobe Firefly | Adobe | https://firefly.adobe.com | 已有 | adobe-firefly | T26 落地 · 独立产品线（≠Photoshop 里的生成填充——后者按边界不收）· 企业赔偿+授权训练叙事 |
| Microsoft Designer | 微软 | https://designer.microsoft.com | 已有 | microsoft-designer | T26 落地 · 模型微软路由 · 免费轻量 |
| Leonardo AI | Leonardo（Canva 旗下） | https://leonardo.ai | 已有 | leonardo-ai | T26 落地 · 2024-07 Canva 收购 · 游戏资产向 · 直连 000 |
| Krea AI | Krea | https://www.krea.ai | 已有 | krea | T26 落地 · 实时生成+64+ 模型聚合 · 「Do not train」是营销口径 |
| SeaArt | 海艺（成都海艺互娱） | https://www.seaart.ai | 已有 | seaart | T26 落地 · 中国团队出海 · 社区模型库许可逐模型标注 · origin: domestic |
| Clipdrop | Jasper（原 InitML→Stability→Jasper） | https://clipdrop.co | 已有 | clipdrop | T26 落地 · 图像编辑工具集（编辑是主功能，满足标准 1）· 归属三跳 2024-02 售予 Jasper |
| Tensor.art | Tensor.Art | https://tensor.art | 待建 | tensor-art | P3 · 直抓 403（CF）· 社区模型托管+生成 |
| 文心一格 | 百度 | https://yige.baidu.com | 待建 | wenxin-yige | P3 · 直抓 200 · L5 |
| Playground | Playground（原 Mighty Computing） | https://playground.com | 待建 | playground | P3 · 直抓 000（网络受限未能核验）· 第三方资料称旧免费板 2026-01 关停、公司 2026-06 已售出（YC 列 inactive）但站点仍在运营——建档时状态要按直抓所见写 |
| Canva | Canva | https://www.canva.com | 不收 | | 通用设计套件，AI 是次要功能——categories.md 边界点名「通用创意套件的 AI 功能不收」 |
| DALL·E | OpenAI | https://openai.com/dall-e-3 | 不收 | | 官方 deprecations 页：DALL·E 2/3 已弃用、2026-05-12 停止支持（官方模型页标 deprecated and removed）——停运不收（L6）；OpenAI 现行图像生成在 ChatGPT/GPT Image，对话入口归 chat（chatgpt 档案） |
| hello.pics | Hello Pictures | https://hello.pics | 只进nav | | 直抓 000 未能核验（2026-10-21）；新锐产品、信息不足——先只进nav，待可核验再裁 |
| ComfyUI | comfyanonymous（社区） | https://github.com/comfyanonymous/ComfyUI | 只进nav | | T12 automation 表已裁「只进nav（产物是媒体）」——本类同样不单列（工作流壳，生成靠装载的模型） |

## 备注

- 本类 13 已有——T26（image +10）已落地 P1（6）+ P2（4）；P3（tensor-art/wenxin-yige/playground）留后续批次。
- **不归本大类**：Sora/可灵/Runway/Vidu/Pixverse 等视频向 → `video`（T16）；Suno/Udio 等音频向 → `audio`（T17）；3D 生成（Meshy/Tripo 等）→ categories.md 点名不收（本类只管 2D）。
- Nano Banana / Seedream 是**模型名**（经 Gemini/第三方平台提供），不是独立产品——不单列，出现在宿主产品档案的 model_access 维里。
- Playground 行是诚实标注样板：curl 000=网络受限≠站点死亡；公司状态（已售/inactive）来自第三方资料，建档时须再核官方口径。
