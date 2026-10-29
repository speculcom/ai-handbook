# Learn AI · Terminology Map (ai-handbook / terms)

> 中文版：[README.md](./README.md)

AI jargon has a way of going over your head — you hear a term ten times in a day and
still can't say what anyone just said. This repo takes 200 of the most common ones
apart: **what it is, why you'd need it, and where the claim comes from.**

**Who it's for**: people meeting AI for the first time, who'd rather not start with a paper.
**Who it's not for**: people looking for "which model is the best" — there are no
rankings here, and there won't be.

Live version: <https://learn.specul.com/>

---

## How to read this

Pick one, based on where you are right now:

| Where you are | Which path |
|---|---|
| I know nothing, I want a start | Read the **six stations** in order. Don't skip — if a station-four term makes no sense, it's usually station three you skipped |
| I only care about one kind of thing | Browse by the **8 domains** (concept / model / development / agent / data / media / infrastructure / choice) |
| I came here with a specific problem | Browse by the **4 purposes**: Learn · Build · Avoid · Choose |

All three routes lead to the same terms. Only the entrance differs.

---

## How the six stations are ordered

One rule decides the order: **later terms lean on earlier ones.**

| Station | What you can do after | Terms |
|---|---|---|
| 1 · Getting In | Explain to a human what AI is doing | 30 |
| 2 · Hands On | Know when it fails, so a demo cannot fool you | 35 |
| 3 · Going Deeper | Judge whether a plan holds up instead of trusting the vendor | 35 |
| 4 · Under the Hood | Understand why it behaves that way, rather than memorising | 30 |
| 5 · Running It | Know how much VRAM running it locally will take | 25 |
| 6 · Choosing Right | Turn what you learned into a decision you can sign off on | 30 |

A concrete case: "context window" sits in station one, "Transformer" in station four.
Start at station four with the Transformer paper and you will stall — not because you
are slow, because the groundwork isn't there.

---

## What this repo does not do

Saying it up front so you don't go hunting for something that isn't here:

- **No rankings.** One total score flattens every trade-off into a single number —
  and trade-offs are exactly what your decision depends on.
- **No invented numbers.** If we couldn't find it, we write "unknown" and say why.
- **No terms without sources.** Every entry carries at least one reference, so you
  can always go back and check us.

---

## What's in these files

```
terms/ (ai-handbook subtree)
├── terms/              200 terms, one file each (frontmatter + a fixed body skeleton)
│   └── INDEX.md        build output · station-grouped index, do not edit by hand
├── terms.en.json       English text (keyed by the Chinese term name)
├── paths/              learning-path source of truth (ordered slugs + checkpoints, bilingual)
├── guides/             short-guide source of truth (frontmatter discipline as terms; SCHEMA.md §8)
├── guides.en.json      English guide bodies (keyed by file name)
├── meta.js             the three classification schemes: station / domain / purpose
├── dims.js             three observation dimensions (model access / runtime / transport)
├── SCHEMA.md           term format spec (§8 covers short guides)
└── scripts/build.mjs   the build script (includes a field-by-field equivalence gate)
```

To change content: edit `terms/*.md`, then run `node scripts/build.mjs`.
To add a term: follow `SCHEMA.md` rather than copying one and nudging it — an
inconsistent skeleton gets caught by the validator.

---

## Content index

<!-- INDEX:BEGIN generated, do not edit -->

## Content index

### Read in order — the six stations

| Station | What you can do after | Terms |
|---|---|---|
| **1 · Getting In** | Explain what AI is doing to another person | 35 |
| **2 · Hands On** | Know when it fails, so a demo cannot fool you | 35 |
| **3 · Going Deeper** | Judge whether a plan holds up instead of trusting the vendor | 35 |
| **4 · Under the Hood** | Understand why it behaves that way, rather than memorising | 35 |
| **5 · Running It** | Know how much VRAM running it locally will take | 30 |
| **6 · Choosing Right** | Turn what you learned into a decision you can sign off on | 30 |

<details><summary><b>Station 1 · Getting In · 35 terms</b> — Explain what AI is doing to another person (click to expand)</summary>

| Term | In one line | Domain | Use |
|---|---|---|---|
| [Artificial Intelligence, AI](terms/%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD.md) | Let machines do what used to need human intelligence — see … | Concept | Learn |
| [Machine Learning, ML](terms/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0.md) | Instead of writing rules by hand, let the machine find patt… | Concept | Learn |
| [Deep Learning](terms/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0.md) | Stack many layers so the network learns its own features in… | Concept | Learn |
| [Neural Network](terms/%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C.md) | A network of simple units whose combined output can approxi… | Concept | Learn |
| [Large Language Model, LLM](terms/%E5%A4%A7%E6%A8%A1%E5%9E%8B%20-%20%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B.md) | After training, the learned parameters that let a system ge… | Concept | Learn |
| [Parameter](terms/%E5%8F%82%E6%95%B0.md) | The numbers the training process adjusts; everything the mo… | Concept | Learn |
| [Training](terms/%E8%AE%AD%E7%BB%83.md) | Let the system learn its parameters from data by repeated e… | Concept | Learn |
| [Inference](terms/%E6%8E%A8%E7%90%86.md) | The model you trained is now answering real queries — a dif… | Concept | Learn |
| [Prompt](terms/%E6%8F%90%E7%A4%BA%E8%AF%8D.md) | The instructions you give the model, and often the main lev… | Model | Build |
| [Token](terms/Token.md) | The smallest unit a model processes text in. Both billing a… | Concept | Build |
| [Context Window](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3.md) | How much the model can see at once — the page of text it ca… | Model | Build |
| [Vocabulary](terms/%E8%AF%8D%E8%A1%A8.md) | The full set of characters a model knows. Its size decides … | Concept | Learn |
| [Product vs Model](terms/AI%20%E4%BA%A7%E5%93%81%20vs%20AI%20%E6%A8%A1%E5%9E%8B.md) | Separate the model itself from the piece of software you ac… | Concept | Learn |
| [Generative AI](terms/%E7%94%9F%E6%88%90%E5%BC%8F%20AI.md) | AI that produces new content from nothing — text, images, a… | Concept | Learn |
| [Agent vs Chatbot](terms/AI%20Agent%20%E4%B8%8E%E8%81%8A%E5%A4%A9%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%9A%84%E5%8C%BA%E5%88%AB.md) | A chatbot's job ends with an answer; an agent's ends with t… | Concept | Choose |
| [Open-source Ecosystem](terms/%E5%BC%80%E6%BA%90%E7%94%9F%E6%80%81.md) | Models, tools, data and documentation all maintained by the… | Concept | Learn |
| [Capability Boundary](terms/%E8%83%BD%E5%8A%9B%E8%BE%B9%E7%95%8C.md) | Knowing precisely what a model cannot do prevents more mist… | Concept | Avoid |
| [Permission](terms/%E6%9D%83%E9%99%90.md) | The set of operations a tool is allowed to perform. Wider i… | Agent | Avoid |
| [AGI (Artificial General Intelligence)](terms/AGI.md) | The hypothetical 'capable of anything a human can' AI: a wo… | Concept | Learn |
| [Reinforcement Learning (RL)](terms/%E5%BC%BA%E5%8C%96%E5%AD%A6%E4%B9%A0.md) | Learning by trial and error against rewards: one of the thr… | Concept | Learn |
| [Foundation Model](terms/%E5%9F%BA%E7%A1%80%E6%A8%A1%E5%9E%8B.md) | The academic name for 'large models': pre-trained on massiv… | Concept | Learn |
| [Training Corpus](terms/%E8%AE%AD%E7%BB%83%E8%AF%AD%E6%96%99.md) | The massive text compilation a model has 'read': its source… | Data | Learn |
| [Open Weights](terms/%E5%BC%80%E6%94%BE%E6%9D%83%E9%87%8D.md) | Weights you can download, but a license that may not qualif… | Choice | Choose |
| [Small Language Model (SLM)](terms/%E5%B0%8F%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B.md) | The 1B–8B parameter class: cheap, fast, runnable locally — … | Model | Choose |
| [Model Card](terms/%E6%A8%A1%E5%9E%8B%E5%8D%A1.md) | A model's 'spec sheet': intended use, measured performance,… | Choice | Choose |
| [Synthetic Data](terms/%E5%90%88%E6%88%90%E6%95%B0%E6%8D%AE.md) | Data generated by programs or models to train on: saves lab… | Data | Learn |
| [Text-to-Image Generation](terms/%E6%96%87%E7%94%9F%E5%9B%BE.md) | Typing turns into pictures: diffusion's most visible applic… | Media | Learn |
| [Jailbreak](terms/%E8%B6%8A%E7%8B%B1.md) | Prompting tricks that bypass a model's safety guardrails: a… | Agent | Avoid |
| [AI Safety](terms/AI%20%E5%AE%89%E5%85%A8.md) | The field studying what general-purpose AI can do, what ris… | Concept | Avoid |
| [Turing Test](terms/%E5%9B%BE%E7%81%B5%E6%B5%8B%E8%AF%95.md) | Turing's 1950 classic: if conversation can't tell machine f… | Concept | Learn |
| [Supervised Learning](terms/%E7%9B%91%E7%9D%A3%E5%AD%A6%E4%B9%A0.md) | Give the machine practice questions with answers, so it lea… | Concept | Learn |
| [Unsupervised Learning](terms/%E6%97%A0%E7%9B%91%E7%9D%A3%E5%AD%A6%E4%B9%A0.md) | No answers given — the machine finds structure in the data … | Concept | Learn |
| [Generalization](terms/%E6%B3%9B%E5%8C%96.md) | A model has truly learned only when it performs well on dat… | Concept | Choose |
| [Overfitting](terms/%E8%BF%87%E6%8B%9F%E5%90%88.md) | Memorized the practice questions, then fails a different se… | Concept | Choose |
| [Training Set, Test Set](terms/%E8%AE%AD%E7%BB%83%E9%9B%86%E4%B8%8E%E6%B5%8B%E8%AF%95%E9%9B%86.md) | Split the data into two piles: one to practice with, one ke… | Data | Choose |

</details>

<details><summary><b>Station 2 · Hands On · 35 terms</b> — Know when it fails, so a demo cannot fool you (click to expand)</summary>

| Term | In one line | Domain | Use |
|---|---|---|---|
| [Hallucination](terms/%E5%B9%BB%E8%A7%89.md) | The model states something plausible and confident that is … | Model | Avoid |
| [Multimodal](terms/%E5%A4%9A%E6%A8%A1%E6%80%81.md) | Handle text, images, audio and video in one system rather t… | Model | Learn |
| [Reasoning Model](terms/%E6%8E%A8%E7%90%86%E6%A8%A1%E5%9E%8B.md) | Works through a chain of internal steps before answering, w… | Model | Choose |
| [Temperature](terms/%E6%B8%A9%E5%BA%A6.md) | Controls how random the output is. Lower is steadier; highe… | Model | Build |
| [Sampling](terms/%E9%87%87%E6%A0%B7%20-%20%E9%87%87%E6%A0%B7%E5%8F%82%E6%95%B0.md) | How the model picks among candidate tokens — this determine… | Model | Build |
| [System Prompt](terms/%E7%B3%BB%E7%BB%9F%E6%8F%90%E7%A4%BA.md) | The role and rules set for a model, which determine the ton… | Model | Build |
| [Fine-tuning](terms/%E5%BE%AE%E8%B0%83.md) | Teach an existing model a specific task or style, rather th… | Model | Build |
| [RLHF / Alignment](terms/%E5%81%8F%E5%A5%BD%E5%AF%B9%E9%BD%90.md) | Makes a model's output match human preference, rather than … | Concept | Learn |
| [Knowledge Cutoff](terms/%E7%9F%A5%E8%AF%86%E6%88%AA%E6%AD%A2.md) | The date boundary of a model's training data. Anything afte… | Model | Avoid |
| [Retrieval-Augmented Generation, RAG](terms/%E8%81%94%E7%BD%91%20-%20%E6%A3%80%E7%B4%A2%E5%A2%9E%E5%BC%BA.md) | Let the model look things up before answering, instead of a… | Data | Build |
| [Embedding / Vector](terms/%E5%90%91%E9%87%8F%20-%20%E5%B5%8C%E5%85%A5.md) | Represent text as coordinates, so meaning can be compared b… | Data | Learn |
| [Vector Database](terms/%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93.md) | A database built to store and search those numeric arrays, … | Data | Build |
| [Chunking](terms/%E5%88%86%E5%9D%97.md) | Cut a long document into pieces before feeding it to the mo… | Data | Build |
| [Diffusion Model](terms/%E6%89%A9%E6%95%A3%E6%A8%A1%E5%9E%8B.md) | The dominant method for image generation: "wipe" an image o… | Media | Learn |
| [Latent Space](terms/%E6%BD%9C%E7%A9%BA%E9%97%B4.md) | The key mechanism in image generation — the model works in … | Media | Learn |
| [Contrastive Language-Image Pre-training](terms/CLIP.md) | Lets a model relate text descriptions to image content — th… | Media | Learn |
| [ControlNet](terms/ControlNet.md) | Gives precise control over the result using line art, depth… | Media | Build |
| [ASR, Automatic Speech Recognition](terms/%E8%AF%AD%E9%9F%B3%E8%AF%86%E5%88%AB.md) | Turn what was said into text. | Media | Learn |
| [TTS, Text-to-Speech](terms/%E8%AF%AD%E9%9F%B3%E5%90%88%E6%88%90.md) | Read text out loud. | Media | Learn |
| [Digital Avatar](terms/%E6%95%B0%E5%AD%97%E4%BA%BA.md) | A virtual person with an appearance and a voice, used for c… | Media | Learn |
| [AI Search](terms/AI%20%E6%90%9C%E7%B4%A2.md) | Describe what you want in a sentence instead of keywords, a… | Model | Build |
| [Video Generation](terms/%E8%A7%86%E9%A2%91%E7%94%9F%E6%88%90.md) | Generating short video clips from text or images. | Media | Learn |
| [Embodied AI](terms/%E5%85%B7%E8%BA%AB%E6%99%BA%E8%83%BD.md) | Giving AI a body so it can sense its surroundings and act —… | Media | Learn |
| [Computer Vision](terms/%E6%9C%BA%E5%99%A8%E8%A7%86%E8%A7%89.md) | Lets a camera "see" — recognise people, objects, text and a… | Media | Learn |
| [Autonomous Driving](terms/%E8%87%AA%E5%8A%A8%E9%A9%BE%E9%A9%B6.md) | The vehicle senses its surroundings, plans a route and cont… | Media | Learn |
| [AI Accelerator](terms/AI%20%E8%8A%AF%E7%89%87.md) | Chips built specifically for AI computation — more efficien… | Infrastructure | Learn |
| [Calibration](terms/%E6%A0%A1%E5%87%86.md) | A model's stated confidence often exceeds its actual accura… | Concept | Choose |
| [LoRA (Low-Rank Adaptation)](terms/LoRA.md) | Budget fine-tuning: freeze the original weights, train only… | Model | Build |
| [Streaming Output](terms/%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA.md) | Answers stream out as they are generated: you read word by … | Infrastructure | Learn |
| [Refusal](terms/%E6%8B%92%E7%AD%94.md) | The model flatly declines certain requests: a direct produc… | Concept | Avoid |
| [Red Teaming](terms/%E7%BA%A2%E9%98%9F%E6%B5%8B%E8%AF%95.md) | Hiring people to attack a model before release to find hole… | Concept | Avoid |
| [Watermarks and Content Credentials](terms/%E6%B0%B4%E5%8D%B0%E4%B8%8E%E5%86%85%E5%AE%B9%E5%87%AD%E8%AF%81.md) | Two routes to identify AI-generated content: watermarks emb… | Media | Avoid |
| [Deepfake](terms/%E6%B7%B1%E5%BA%A6%E4%BC%AA%E9%80%A0.md) | Generative models producing indistinguishable fake video an… | Media | Avoid |
| [Bias](terms/%E5%81%8F%E8%A7%81.md) | Uneven model performance across groups, languages, and cult… | Concept | Avoid |
| [Automation Bias](terms/%E8%87%AA%E5%8A%A8%E5%8C%96%E5%81%8F%E8%A7%81.md) | The human-side flaw: smooth AI output makes people skip che… | Concept | Avoid |

</details>

<details><summary><b>Station 3 · Going Deeper · 35 terms</b> — Judge whether a plan holds up instead of trusting the vendor (click to expand)</summary>

| Term | In one line | Domain | Use |
|---|---|---|---|
| [Agent](terms/%E6%99%BA%E8%83%BD%E4%BD%93%20-%20Agent.md) | Stop answering and start acting: let the model take multi-s… | Agent | Build |
| [Tool Calling / Function Calling](terms/%E5%B7%A5%E5%85%B7%E8%B0%83%E7%94%A8.md) | Let the model actually do things — search, run code, edit f… | Agent | Build |
| [Model Context Protocol](terms/MCP.md) | A standard interface for connecting AI to external tools an… | Agent | Build |
| [Multi-Agent](terms/%E5%A4%9A%20Agent%20%E5%8D%8F%E4%BD%9C.md) | Split a complex job across several roles, each strong at so… | Agent | Build |
| [Orchestration / Pipeline](terms/%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%BC%96%E6%8E%92.md) | Fix a repeated pattern: the AI does a step, a human confirm… | Agent | Build |
| [Memory](terms/%E8%AE%B0%E5%BF%86.md) | Let an agent remember things across conversations instead o… | Agent | Build |
| [Long-running Task](terms/%E9%95%BF%E6%97%B6%E4%BB%BB%E5%8A%A1.md) | Work running for hours or days across many contexts. | Agent | Build |
| [Human-in-the-Loop](terms/%E4%BA%BA%E6%9C%BA%E5%8D%8F%E4%BD%9C.md) | A human confirms the key steps instead of the system runnin… | Agent | Avoid |
| [Guardrails](terms/%E6%8A%A4%E6%A0%8F.md) | Constrain what the model may and may not do, so it does not… | Agent | Avoid |
| [Sandbox](terms/%E6%B2%99%E7%AE%B1.md) | Confine what the AI does to a controlled environment so a m… | Agent | Avoid |
| [Evaluation, Evals](terms/%E8%AF%84%E4%BC%B0.md) | Decide whether an approach is actually good, rather than me… | Choice | Choose |
| [Observability](terms/%E5%8F%AF%E8%A7%82%E6%B5%8B%E6%80%A7.md) | See what the model actually did this run, what it cost, and… | Choice | Choose |
| [Code Completion](terms/%E4%BB%A3%E7%A0%81%E8%A1%A5%E5%85%A8.md) | Complete the following code automatically in the editor, ba… | Development | Build |
| [Repository-level Understanding](terms/%E4%BB%93%E5%BA%93%E7%BA%A7%E7%90%86%E8%A7%A3.md) | Let the AI read the whole project, not just the file that h… | Development | Build |
| [CLI Agent](terms/%E7%BB%88%E7%AB%AF%20Agent.md) | Run tasks autonomously in the command line: edit files, run… | Development | Build |
| [Diff](terms/%E5%B7%AE%E5%BC%82%E5%AF%B9%E6%AF%94.md) | See exactly what the AI changed — the most important step w… | Development | Avoid |
| [App Server](terms/App%20Server.md) | Let one AI session hand off between terminal, editor and we… | Development | Learn |
| [Agent Client Protocol](terms/ACP.md) | Let AI coding tools from different vendors plug into the sa… | Development | Build |
| [Pair Programming](terms/%E9%85%8D%E5%AF%B9%E7%BC%96%E7%A8%8B.md) | AI as a programming partner taking part in development in r… | Development | Learn |
| [Browser Automation](terms/%E6%B5%8F%E8%A7%88%20-%20%E7%BD%91%E9%A1%B5%E6%93%8D%E4%BD%9C.md) | Let the AI click pages, fill forms and take screenshots to … | Agent | Build |
| [Reference Server](terms/%E5%8F%82%E8%80%83%E6%9C%8D%E5%8A%A1%E5%99%A8.md) | Official "reference" implementations showing how the protoc… | Agent | Learn |
| [Version Control](terms/%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6.md) | Record every change and roll back at will — the safety foun… | Development | Avoid |
| [Continuous Integration, CI](terms/%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90.md) | Tests and checks run automatically as soon as code is commi… | Development | Avoid |
| [Prompt Injection](terms/%E6%8F%90%E7%A4%BA%E6%B3%A8%E5%85%A5.md) | The main security risk in agent systems: content that talks… | Agent | Avoid |
| [Remote Execution](terms/%E8%BF%9C%E7%A8%8B%E6%89%A7%E8%A1%8C.md) | A cloud agent runs tasks on your machine, so closing the la… | Agent | Build |
| [Skills](terms/%E6%8A%80%E8%83%BD%20-%20Skills.md) | Package a repetitive workflow into a reusable capability. | Agent | Build |
| [Structured Output](terms/%E7%BB%93%E6%9E%84%E5%8C%96%E8%BE%93%E5%87%BA.md) | Make the model's answer a strict format (JSON and the like)… | Agent | Build |
| [Context Engineering](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md) | Deciding what goes into the model's limited window is itsel… | Agent | Build |
| [Compaction](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%8E%8B%E7%BC%A9.md) | When a conversation nearly fills the window, summarize it a… | Agent | Build |
| [Prompt Chaining](terms/%E6%8F%90%E7%A4%BA%E9%93%BE.md) | Split a job into fixed steps, feeding each output into the … | Agent | Build |
| [Workflow vs Agent](terms/Workflow%20%E8%BF%98%E6%98%AF%20Agent.md) | First decide whether the job should be agentic at all. | Agent | Choose |
| [Agentic Workflow Patterns](terms/%E7%BC%96%E6%8E%92%E6%A8%A1%E5%BC%8F.md) | A few officially named collaboration structures you can reu… | Agent | Build |
| [Tool Definition](terms/%E5%B7%A5%E5%85%B7%E5%AE%9A%E4%B9%89.md) | The instructions you write for the model about what a tool … | Agent | Build |
| [Rate Limiting](terms/%E9%80%9F%E7%8E%87%E9%99%90%E5%88%B6.md) | The quota on how many requests you may send in a time windo… | Development | Learn |
| [Sub-agent Isolation](terms/%E5%AD%90%E4%BB%A3%E7%90%86%E9%9A%94%E7%A6%BB.md) | Let sub-agents do the searching so the main conversation ke… | Agent | Build |

</details>

<details><summary><b>Station 4 · Under the Hood · 35 terms</b> — Understand why it behaves that way, rather than memorising (click to expand)</summary>

| Term | In one line | Domain | Use |
|---|---|---|---|
| [Transformer](terms/Transformer.md) | The architecture underneath every mainstream large model to… | Concept | Learn |
| [Attention](terms/%E6%B3%A8%E6%84%8F%E5%8A%9B%E6%9C%BA%E5%88%B6.md) | When processing one word, the model automatically looks at … | Concept | Learn |
| [Positional Encoding](terms/%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81.md) | Lets the model know the order of words in a sentence. | Concept | Learn |
| [Embedding Layer](terms/%E5%B5%8C%E5%85%A5%E5%B1%82.md) | The first step of turning words into numeric vectors — mode… | Concept | Learn |
| [KV Cache](terms/KV%20%E7%BC%93%E5%AD%98.md) | Stops the model recomputing the whole passage on every toke… | Infrastructure | Learn |
| [Context Cost](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3%E7%9A%84%E4%BB%A3%E4%BB%B7.md) | A larger context window is slower and more expensive — it i… | Model | Avoid |
| [Pre-training](terms/%E9%A2%84%E8%AE%AD%E7%BB%83.md) | Predicting the next token over vast text — the stage where … | Concept | Learn |
| [Compute](terms/%E8%AE%AD%E7%BB%83%E7%AE%97%E5%8A%9B.md) | Both training and inference burn compute. This is AI's hard… | Infrastructure | Learn |
| [Inference Cost](terms/%E6%8E%A8%E7%90%86%E6%88%90%E6%9C%AC.md) | What a model costs per answer, determined by how many token… | Choice | Choose |
| [Multi-Head Attention](terms/%E5%A4%9A%E5%A4%B4%E6%B3%A8%E6%84%8F%E5%8A%9B.md) | Lets a model look at a sentence from several angles at once… | Concept | Learn |
| [Feed-Forward Network](terms/%E5%89%8D%E9%A6%88%E7%BD%91%E7%BB%9C.md) | The digestion step inside every Transformer layer: attentio… | Concept | Learn |
| [Residual Connection](terms/%E6%AE%8B%E5%B7%AE%E8%BF%9E%E6%8E%A5.md) | Gives the network a "pass-through lane" so the signal survi… | Concept | Learn |
| [Layer Normalization](terms/%E5%B1%82%E5%BD%92%E4%B8%80%E5%8C%96.md) | Levels out each layer's output so deep training doesn't spi… | Concept | Learn |
| [Encoder & Decoder](terms/%E7%BC%96%E7%A0%81%E5%99%A8%E4%B8%8E%E8%A7%A3%E7%A0%81%E5%99%A8.md) | The two halves of a Transformer: one reads, one generates. | Concept | Learn |
| [Subword Tokenization](terms/%E5%AD%90%E8%AF%8D%E5%88%86%E8%AF%8D.md) | Cuts words into smaller fragments so a model can still asse… | Concept | Learn |
| [SFT → Reward Model → RL](terms/%E8%AE%AD%E7%BB%83%E4%B8%89%E9%98%B6%E6%AE%B5.md) | How chat models are trained: first they learn to continue t… | Concept | Learn |
| [Knowledge Distillation](terms/%E7%9F%A5%E8%AF%86%E8%92%B8%E9%A6%8F.md) | Train a small model on a big model's soft outputs: keep mos… | Concept | Learn |
| [Mixture of Experts (MoE)](terms/MoE%20-%20%E6%B7%B7%E5%90%88%E4%B8%93%E5%AE%B6.md) | A model architecture: each layer holds many "experts," but … | Concept | Learn |
| [In-context Learning](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%AD%A6%E4%B9%A0.md) | Learning on the spot inside a conversation: give a few exam… | Concept | Learn |
| [Long Context](terms/%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87.md) | The technology behind reading hundreds of thousands of word… | Concept | Learn |
| [Autoregressive Generation](terms/%E8%87%AA%E5%9B%9E%E5%BD%92%E7%94%9F%E6%88%90.md) | How large models emit text one token at a time — the root o… | Concept | Learn |
| [Logits and Probability Distribution](terms/logits%20%E4%B8%8E%E6%A6%82%E7%8E%87%E5%88%86%E5%B8%83.md) | What the model outputs at each step is not a word but a sco… | Concept | Learn |
| [Greedy Decoding and Beam Search](terms/%E8%B4%AA%E5%BF%83%E8%A7%A3%E7%A0%81%E4%B8%8E%E6%9D%9F%E6%90%9C%E7%B4%A2.md) | Decoding that always picks the most likely token — and why … | Concept | Learn |
| [Why Hallucination Happens](terms/%E5%B9%BB%E8%A7%89%E7%9A%84%E6%88%90%E5%9B%A0.md) | Why models fabricate with a straight face: not deception, b… | Concept | Avoid |
| [Perplexity (PPL)](terms/%E5%9B%B0%E6%83%91%E5%BA%A6.md) | The most common intrinsic metric for language models: how s… | Concept | Choose |
| [Scaling Laws](terms/%E7%BC%A9%E6%94%BE%E5%AE%9A%E5%BE%8B.md) | The empirical power-law by which loss falls with parameters… | Concept | Learn |
| [Emergent Abilities](terms/%E6%B6%8C%E7%8E%B0%E8%83%BD%E5%8A%9B.md) | Abilities small models lack that large models suddenly have… | Concept | Choose |
| [Chain of Thought (CoT)](terms/%E6%80%9D%E7%BB%B4%E9%93%BE.md) | Prompting the model to lay out reasoning steps before answe… | Concept | Build |
| [Data Contamination](terms/%E6%95%B0%E6%8D%AE%E6%B1%A1%E6%9F%93.md) | Eval questions leaking into training data — models have 'se… | Concept | Choose |
| [Benchmark Saturation](terms/%E8%AF%84%E6%B5%8B%E9%A5%B1%E5%92%8C.md) | Benchmarks approach perfect scores and lose discriminating … | Concept | Choose |
| [How Diffusion Models Generate](terms/%E6%89%A9%E6%95%A3%E6%A8%A1%E5%9E%8B%E6%80%8E%E4%B9%88%E7%94%9F%E6%88%90.md) | What the mainstream image-generation method looks like at t… | Media | Learn |
| [How Video Generation Works](terms/%E8%A7%86%E9%A2%91%E7%94%9F%E6%88%90%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E7%9A%84.md) | Video generation is not simply 'generate one frame at a tim… | Media | Learn |
| [How Voice Cloning Works](terms/%E8%AF%AD%E9%9F%B3%E5%85%8B%E9%9A%86%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E7%9A%84.md) | A few seconds of recording is enough to synthesise someone'… | Media | Avoid |
| [How Speech Recognition Works](terms/%E8%AF%AD%E9%9F%B3%E8%AF%86%E5%88%AB%E6%98%AF%E6%80%8E%E4%B9%88%E5%90%AC%E7%9A%84.md) | The mainstream way to turn speech into text: large-scale we… | Media | Learn |
| [How Text Becomes Speech](terms/%E6%96%87%E5%AD%97%E6%80%8E%E4%B9%88%E5%8F%98%E6%88%90%E5%A3%B0%E9%9F%B3.md) | How modern TTS works end to end: one model outputs the wave… | Media | Learn |

</details>

<details><summary><b>Station 5 · Running It · 30 terms</b> — Know how much VRAM running it locally will take (click to expand)</summary>

| Term | In one line | Domain | Use |
|---|---|---|---|
| [Graphics Processing Unit](terms/GPU.md) | The chip that actually does the matrix arithmetic. Large mo… | Infrastructure | Learn |
| [VRAM](terms/%E6%98%BE%E5%AD%98.md) | Memory on the graphics card. If the model does not fit, it … | Infrastructure | Choose |
| [Quantization](terms/%E9%87%8F%E5%8C%96.md) | Compress model weights from high to low precision, saving V… | Infrastructure | Build |
| [Bits Per Weight](terms/bpw.md) | The numeric form of a quantisation level: how many bits eac… | Infrastructure | Choose |
| [GGUF](terms/GGUF.md) | The de facto standard file format for running models locall… | Infrastructure | Build |
| [llama.cpp](terms/llama.cpp.md) | The mainstream open-source engine for running large models … | Infrastructure | Build |
| [vLLM](terms/vLLM.md) | A serving engine for running models at high concurrency on … | Infrastructure | Learn |
| [-ngl / Offload](terms/GPU%20%E5%B1%82%E5%8D%B8%E8%BD%BD.md) | Give part of the model to the GPU and keep the rest on the … | Infrastructure | Build |
| [Tensor Parallelism](terms/%E5%BC%A0%E9%87%8F%E5%B9%B6%E8%A1%8C.md) | Split one model across several GPUs when it does not fit on… | Infrastructure | Learn |
| [MoE Offload / ncmoe](terms/%E4%B8%93%E5%AE%B6%E5%8D%B8%E8%BD%BD.md) | For sparse models with many experts where only a few activa… | Infrastructure | Learn |
| [Time To First Token, TTFT](terms/%E9%A6%96%E5%AD%97%E5%BB%B6%E8%BF%9F.md) | How long from sending a question to seeing the first word. … | Infrastructure | Choose |
| [Throughput, TPS](terms/%E5%90%9E%E5%90%90.md) | How many tokens per second come out. It determines how long… | Infrastructure | Choose |
| [Prefill](terms/%E9%A2%84%E5%A1%AB%E5%85%85.md) | The step where your whole input is read through before gene… | Infrastructure | Learn |
| [Prompt Cache](terms/Prompt%20Cache.md) | Cache repeated system prompts and documents, saving time an… | Infrastructure | Build |
| [Continuous Batching](terms/%E8%BF%9E%E7%BB%AD%E6%89%B9%E5%A4%84%E7%90%86.md) | The server batches requests that arrived at different momen… | Infrastructure | Learn |
| [Chunked Prefill](terms/%E5%88%86%E5%9D%97%E9%A2%84%E5%A1%AB%E5%85%85.md) | Process a long input in smaller chunks, mixing it with requ… | Infrastructure | Learn |
| [Pipeline Parallelism](terms/%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%B9%B6%E8%A1%8C.md) | Cut the model into layer ranges and run them on different G… | Infrastructure | Learn |
| [Context Parallelism](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B9%B6%E8%A1%8C.md) | Split a very long context across several cards for processi… | Infrastructure | Learn |
| [Speculative Decoding](terms/%E6%8A%95%E6%9C%BA%E8%A7%A3%E7%A0%81.md) | Guess several tokens cheaply, then have the big model verif… | Infrastructure | Learn |
| [FlashAttention](terms/FlashAttention.md) | A more memory-efficient, faster attention algorithm; the ba… | Infrastructure | Learn |
| [PagedAttention](terms/PagedAttention.md) | Manage the KV cache with OS paging ideas so memory is barel… | Infrastructure | Learn |
| [safetensors](terms/safetensors.md) | A safer file format for model weights. | Data | Avoid |
| [MLX](terms/MLX.md) | A machine learning framework for Apple silicon, open-source… | Infrastructure | Learn |
| [OpenAI-compatible API](terms/OpenAI%20%E5%85%BC%E5%AE%B9%E6%8E%A5%E5%8F%A3.md) | Serve a local model so existing OpenAI clients can connect … | Infrastructure | Build |
| [CPU Inference](terms/CPU%20%E6%8E%A8%E7%90%86.md) | You can run models without a GPU; the cost is speed. | Infrastructure | Choose |
| [Ollama](terms/Ollama.md) | A tool that runs an open model on your own computer with a … | Infrastructure | Build |
| [LM Studio](terms/LM%20Studio.md) | A local-model desktop app with a graphical interface — no c… | Infrastructure | Build |
| [Quantization Methods (GPTQ, AWQ)](terms/%E9%87%8F%E5%8C%96%E6%96%B9%E6%B3%95.md) | Shrinking a model has more than one method, and the methods… | Infrastructure | Build |
| [Pruning](terms/%E5%89%AA%E6%9E%9D.md) | Delete the unimportant connections in a model to make it sm… | Infrastructure | Build |
| [QLoRA](terms/QLoRA.md) | Quantise the model to 4-bit first, then fine-tune — one con… | Infrastructure | Build |

</details>

<details><summary><b>Station 6 · Choosing Right · 30 terms</b> — Turn what you learned into a decision you can sign off on (click to expand)</summary>

| Term | In one line | Domain | Use |
|---|---|---|---|
| [Open-weight Model](terms/%E5%BC%80%E6%BA%90%E6%A8%A1%E5%9E%8B.md) | The weights are public: you can download them, run them on … | Choice | Choose |
| [Closed / Proprietary Model](terms/%E9%97%AD%E6%BA%90%E6%A8%A1%E5%9E%8B.md) | You do not get the weights; you can only call it through th… | Choice | Choose |
| [License](terms/%E8%AE%B8%E5%8F%AF%E8%AF%81.md) | What you may do with it: use, modify, or commercialise. The… | Choice | Avoid |
| [API](terms/API%20-%20%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8.md) | Do not run a model yourself — pay per use for someone else'… | Choice | Choose |
| [Local Deployment](terms/%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2.md) | Download the model and run it on your own machine, so data … | Infrastructure | Choose |
| [Data Sovereignty](terms/%E6%95%B0%E6%8D%AE%E4%B8%8D%E5%87%BA%E7%BD%91.md) | Your material never passes through a third party. This is a… | Choice | Avoid |
| [Benchmark](terms/%E5%9F%BA%E5%87%86%E6%B5%8B%E8%AF%95.md) | Compare models head to head using a shared question set. | Choice | Choose |
| [Aggregate Score](terms/%E6%80%BB%E5%88%86%20-%20%E7%BB%BC%E5%90%88%E8%AF%84%E6%B5%8B.md) | Collapse several benchmark scores into one number for quick… | Choice | Choose |
| [Vendor Lock-in](terms/%E4%BE%9B%E5%BA%94%E5%95%86%E9%94%81%E5%AE%9A.md) | The deeper you go, the harder it is to switch models or pro… | Choice | Avoid |
| [Evaluation Limits](terms/%E6%A8%A1%E5%9E%8B%E8%AF%84%E6%B5%8B%E7%9A%84%E5%B1%80%E9%99%90.md) | A leaderboard score is not the same as your actual result —… | Choice | Choose |
| [Privacy & Compliance](terms/%E9%9A%90%E7%A7%81%E4%B8%8E%E5%90%88%E8%A7%84.md) | Which machines data passes through, how long it is retained… | Choice | Avoid |
| [Cost per Call](terms/%E5%8D%95%E6%AC%A1%E8%B0%83%E7%94%A8%E6%88%90%E6%9C%AC.md) | What a task actually costs to run, not just the unit price. | Choice | Choose |
| [Caching Strategy](terms/%E7%BC%93%E5%AD%98%E7%AD%96%E7%95%A5.md) | Do not recompute repeated content; reuse it directly. The f… | Choice | Build |
| [Routing](terms/%E8%B7%AF%E7%94%B1.md) | Send easy questions to a cheap fast model and hard ones to … | Choice | Build |
| [Self-hosting Cost](terms/%E8%87%AA%E6%89%98%E7%AE%A1%E6%88%90%E6%9C%AC.md) | Running locally costs no per-token fee, but hardware, elect… | Choice | Choose |
| [Vendor Dependency](terms/%E6%9C%8D%E5%8A%A1%E4%B8%AD%E6%96%AD%E9%A3%8E%E9%99%A9.md) | Depending on someone else's service means it may raise pric… | Choice | Avoid |
| [Portability](terms/%E5%8F%AF%E6%9B%BF%E6%8D%A2%E6%80%A7.md) | How much has to change if you swap models or providers. | Choice | Avoid |
| [Community & Docs](terms/%E7%A4%BE%E5%8C%BA%E4%B8%8E%E6%96%87%E6%A1%A3.md) | When something breaks, can you find someone to ask, and is … | Choice | Choose |
| [Release Cadence](terms/%E8%BF%AD%E4%BB%A3%E9%80%9F%E5%BA%A6.md) | How fast the project moves and how stable its versions are. | Choice | Choose |
| [Exit Cost](terms/%E9%80%80%E5%87%BA%E6%88%90%E6%9C%AC.md) | What it costs to migrate away when you stop using it. | Choice | Avoid |
| [Cost](terms/%E6%88%90%E6%9C%AC.md) | What an AI approach actually costs. Beyond unit price there… | Choice | Choose |
| [Transport](terms/%E4%BC%A0%E8%BE%93%E6%96%B9%E5%BC%8F.md) | How your data actually reaches the model or tool: staying o… | Data | Learn |
| [Model Retirement](terms/%E6%A8%A1%E5%9E%8B%E9%80%80%E5%BD%B9.md) | Cloud models get retired; treat it as a selection risk. | Choice | Avoid |
| [Preview vs GA](terms/%E9%A2%84%E8%A7%88%E7%89%88%E4%B8%8E%E6%AD%A3%E5%BC%8F%E7%89%88.md) | Two maturity levels of a model API, deciding whether it bel… | Choice | Choose |
| [Model Family, Version, Variant](terms/%E6%A8%A1%E5%9E%8B%E7%89%88%E6%9C%AC%E4%B8%8E%E5%8F%98%E4%BD%93.md) | The date and the mini/nano suffix in a model name mean diff… | Choice | Avoid |
| [Regional Availability](terms/%E5%8C%BA%E5%9F%9F%E5%8F%AF%E7%94%A8%E6%80%A7.md) | A model may simply not exist in the region you are in. | Choice | Avoid |
| [Data Residency](terms/%E6%95%B0%E6%8D%AE%E9%A9%BB%E7%95%99.md) | Which region your data sits in, and who decides. | Choice | Avoid |
| [Training Content Summary](terms/%E8%AE%AD%E7%BB%83%E5%86%85%E5%AE%B9%E6%91%98%E8%A6%81.md) | The EU requires general-purpose model providers to publish … | Choice | Avoid |
| [Generative AI Compliance Duties](terms/%E7%94%9F%E6%88%90%E5%BC%8F%20AI%20%E5%90%88%E8%A7%84%E4%B9%89%E5%8A%A1.md) | The specific duties when serving generative AI to the publi… | Choice | Avoid |
| [Migration Evaluation](terms/%E8%BF%81%E7%A7%BB%E8%AF%84%E4%BC%B0.md) | How to decide on a new model instead of waiting for the ven… | Choice | Build |

</details>

### Browse by domain — "I only care about one kind of thing"

- **Concept** (56): [AGI (Artificial General Intelligence)](terms/AGI.md) · [Agent vs Chatbot](terms/AI%20Agent%20%E4%B8%8E%E8%81%8A%E5%A4%A9%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%9A%84%E5%8C%BA%E5%88%AB.md) · [Product vs Model](terms/AI%20%E4%BA%A7%E5%93%81%20vs%20AI%20%E6%A8%A1%E5%9E%8B.md) · [AI Safety](terms/AI%20%E5%AE%89%E5%85%A8.md) · [Logits and Probability Distribution](terms/logits%20%E4%B8%8E%E6%A6%82%E7%8E%87%E5%88%86%E5%B8%83.md) · [Mixture of Experts (MoE)](terms/MoE%20-%20%E6%B7%B7%E5%90%88%E4%B8%93%E5%AE%B6.md) · [Token](terms/Token.md) · [Transformer](terms/Transformer.md) · [In-context Learning](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%AD%A6%E4%B9%A0.md) · [Artificial Intelligence, AI](terms/%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD.md) · [Positional Encoding](terms/%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81.md) · [RLHF / Alignment](terms/%E5%81%8F%E5%A5%BD%E5%AF%B9%E9%BD%90.md) · [Bias](terms/%E5%81%8F%E8%A7%81.md) · [Feed-Forward Network](terms/%E5%89%8D%E9%A6%88%E7%BD%91%E7%BB%9C.md) · [Parameter](terms/%E5%8F%82%E6%95%B0.md) · [Perplexity (PPL)](terms/%E5%9B%B0%E6%83%91%E5%BA%A6.md) · [Turing Test](terms/%E5%9B%BE%E7%81%B5%E6%B5%8B%E8%AF%95.md) · [Foundation Model](terms/%E5%9F%BA%E7%A1%80%E6%A8%A1%E5%9E%8B.md) · [Multi-Head Attention](terms/%E5%A4%9A%E5%A4%B4%E6%B3%A8%E6%84%8F%E5%8A%9B.md) · [Large Language Model, LLM](terms/%E5%A4%A7%E6%A8%A1%E5%9E%8B%20-%20%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B.md) · [Subword Tokenization](terms/%E5%AD%90%E8%AF%8D%E5%88%86%E8%AF%8D.md) · [Layer Normalization](terms/%E5%B1%82%E5%BD%92%E4%B8%80%E5%8C%96.md) · [Embedding Layer](terms/%E5%B5%8C%E5%85%A5%E5%B1%82.md) · [Why Hallucination Happens](terms/%E5%B9%BB%E8%A7%89%E7%9A%84%E6%88%90%E5%9B%A0.md) · [Open-source Ecosystem](terms/%E5%BC%80%E6%BA%90%E7%94%9F%E6%80%81.md) · [Reinforcement Learning (RL)](terms/%E5%BC%BA%E5%8C%96%E5%AD%A6%E4%B9%A0.md) · [Chain of Thought (CoT)](terms/%E6%80%9D%E7%BB%B4%E9%93%BE.md) · [Refusal](terms/%E6%8B%92%E7%AD%94.md) · [Inference](terms/%E6%8E%A8%E7%90%86.md) · [Data Contamination](terms/%E6%95%B0%E6%8D%AE%E6%B1%A1%E6%9F%93.md) · [Unsupervised Learning](terms/%E6%97%A0%E7%9B%91%E7%9D%A3%E5%AD%A6%E4%B9%A0.md) · [Machine Learning, ML](terms/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0.md) · [Calibration](terms/%E6%A0%A1%E5%87%86.md) · [Residual Connection](terms/%E6%AE%8B%E5%B7%AE%E8%BF%9E%E6%8E%A5.md) · [Generalization](terms/%E6%B3%9B%E5%8C%96.md) · [Attention](terms/%E6%B3%A8%E6%84%8F%E5%8A%9B%E6%9C%BA%E5%88%B6.md) · [Emergent Abilities](terms/%E6%B6%8C%E7%8E%B0%E8%83%BD%E5%8A%9B.md) · [Deep Learning](terms/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0.md) · [Generative AI](terms/%E7%94%9F%E6%88%90%E5%BC%8F%20AI.md) · [Supervised Learning](terms/%E7%9B%91%E7%9D%A3%E5%AD%A6%E4%B9%A0.md) · [Knowledge Distillation](terms/%E7%9F%A5%E8%AF%86%E8%92%B8%E9%A6%8F.md) · [Neural Network](terms/%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C.md) · [Red Teaming](terms/%E7%BA%A2%E9%98%9F%E6%B5%8B%E8%AF%95.md) · [Encoder & Decoder](terms/%E7%BC%96%E7%A0%81%E5%99%A8%E4%B8%8E%E8%A7%A3%E7%A0%81%E5%99%A8.md) · [Scaling Laws](terms/%E7%BC%A9%E6%94%BE%E5%AE%9A%E5%BE%8B.md) · [Capability Boundary](terms/%E8%83%BD%E5%8A%9B%E8%BE%B9%E7%95%8C.md) · [Automation Bias](terms/%E8%87%AA%E5%8A%A8%E5%8C%96%E5%81%8F%E8%A7%81.md) · [Autoregressive Generation](terms/%E8%87%AA%E5%9B%9E%E5%BD%92%E7%94%9F%E6%88%90.md) · [Training](terms/%E8%AE%AD%E7%BB%83.md) · [SFT → Reward Model → RL](terms/%E8%AE%AD%E7%BB%83%E4%B8%89%E9%98%B6%E6%AE%B5.md) · [Benchmark Saturation](terms/%E8%AF%84%E6%B5%8B%E9%A5%B1%E5%92%8C.md) · [Vocabulary](terms/%E8%AF%8D%E8%A1%A8.md) · [Greedy Decoding and Beam Search](terms/%E8%B4%AA%E5%BF%83%E8%A7%A3%E7%A0%81%E4%B8%8E%E6%9D%9F%E6%90%9C%E7%B4%A2.md) · [Overfitting](terms/%E8%BF%87%E6%8B%9F%E5%90%88.md) · [Long Context](terms/%E9%95%BF%E4%B8%8A%E4%B8%8B%E6%96%87.md) · [Pre-training](terms/%E9%A2%84%E8%AE%AD%E7%BB%83.md)
- **Infrastructure** (34): [AI Accelerator](terms/AI%20%E8%8A%AF%E7%89%87.md) · [Bits Per Weight](terms/bpw.md) · [CPU Inference](terms/CPU%20%E6%8E%A8%E7%90%86.md) · [FlashAttention](terms/FlashAttention.md) · [GGUF](terms/GGUF.md) · [-ngl / Offload](terms/GPU%20%E5%B1%82%E5%8D%B8%E8%BD%BD.md) · [Graphics Processing Unit](terms/GPU.md) · [KV Cache](terms/KV%20%E7%BC%93%E5%AD%98.md) · [llama.cpp](terms/llama.cpp.md) · [LM Studio](terms/LM%20Studio.md) · [MLX](terms/MLX.md) · [Ollama](terms/Ollama.md) · [OpenAI-compatible API](terms/OpenAI%20%E5%85%BC%E5%AE%B9%E6%8E%A5%E5%8F%A3.md) · [PagedAttention](terms/PagedAttention.md) · [Prompt Cache](terms/Prompt%20Cache.md) · [QLoRA](terms/QLoRA.md) · [vLLM](terms/vLLM.md) · [Context Parallelism](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B9%B6%E8%A1%8C.md) · [MoE Offload / ncmoe](terms/%E4%B8%93%E5%AE%B6%E5%8D%B8%E8%BD%BD.md) · [Chunked Prefill](terms/%E5%88%86%E5%9D%97%E9%A2%84%E5%A1%AB%E5%85%85.md) · [Pruning](terms/%E5%89%AA%E6%9E%9D.md) · [Throughput, TPS](terms/%E5%90%9E%E5%90%90.md) · [Tensor Parallelism](terms/%E5%BC%A0%E9%87%8F%E5%B9%B6%E8%A1%8C.md) · [Speculative Decoding](terms/%E6%8A%95%E6%9C%BA%E8%A7%A3%E7%A0%81.md) · [VRAM](terms/%E6%98%BE%E5%AD%98.md) · [Local Deployment](terms/%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2.md) · [Streaming Output](terms/%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA.md) · [Pipeline Parallelism](terms/%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%B9%B6%E8%A1%8C.md) · [Compute](terms/%E8%AE%AD%E7%BB%83%E7%AE%97%E5%8A%9B.md) · [Continuous Batching](terms/%E8%BF%9E%E7%BB%AD%E6%89%B9%E5%A4%84%E7%90%86.md) · [Quantization](terms/%E9%87%8F%E5%8C%96.md) · [Quantization Methods (GPTQ, AWQ)](terms/%E9%87%8F%E5%8C%96%E6%96%B9%E6%B3%95.md) · [Prefill](terms/%E9%A2%84%E5%A1%AB%E5%85%85.md) · [Time To First Token, TTFT](terms/%E9%A6%96%E5%AD%97%E5%BB%B6%E8%BF%9F.md)
- **Choice** (33): [API](terms/API%20-%20%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8.md) · [Vendor Lock-in](terms/%E4%BE%9B%E5%BA%94%E5%95%86%E9%94%81%E5%AE%9A.md) · [Regional Availability](terms/%E5%8C%BA%E5%9F%9F%E5%8F%AF%E7%94%A8%E6%80%A7.md) · [Cost per Call](terms/%E5%8D%95%E6%AC%A1%E8%B0%83%E7%94%A8%E6%88%90%E6%9C%AC.md) · [Portability](terms/%E5%8F%AF%E6%9B%BF%E6%8D%A2%E6%80%A7.md) · [Observability](terms/%E5%8F%AF%E8%A7%82%E6%B5%8B%E6%80%A7.md) · [Benchmark](terms/%E5%9F%BA%E5%87%86%E6%B5%8B%E8%AF%95.md) · [Open Weights](terms/%E5%BC%80%E6%94%BE%E6%9D%83%E9%87%8D.md) · [Open-weight Model](terms/%E5%BC%80%E6%BA%90%E6%A8%A1%E5%9E%8B.md) · [Aggregate Score](terms/%E6%80%BB%E5%88%86%20-%20%E7%BB%BC%E5%90%88%E8%AF%84%E6%B5%8B.md) · [Cost](terms/%E6%88%90%E6%9C%AC.md) · [Inference Cost](terms/%E6%8E%A8%E7%90%86%E6%88%90%E6%9C%AC.md) · [Data Sovereignty](terms/%E6%95%B0%E6%8D%AE%E4%B8%8D%E5%87%BA%E7%BD%91.md) · [Data Residency](terms/%E6%95%B0%E6%8D%AE%E9%A9%BB%E7%95%99.md) · [Vendor Dependency](terms/%E6%9C%8D%E5%8A%A1%E4%B8%AD%E6%96%AD%E9%A3%8E%E9%99%A9.md) · [Model Card](terms/%E6%A8%A1%E5%9E%8B%E5%8D%A1.md) · [Model Family, Version, Variant](terms/%E6%A8%A1%E5%9E%8B%E7%89%88%E6%9C%AC%E4%B8%8E%E5%8F%98%E4%BD%93.md) · [Evaluation Limits](terms/%E6%A8%A1%E5%9E%8B%E8%AF%84%E6%B5%8B%E7%9A%84%E5%B1%80%E9%99%90.md) · [Model Retirement](terms/%E6%A8%A1%E5%9E%8B%E9%80%80%E5%BD%B9.md) · [Generative AI Compliance Duties](terms/%E7%94%9F%E6%88%90%E5%BC%8F%20AI%20%E5%90%88%E8%A7%84%E4%B9%89%E5%8A%A1.md) · [Community & Docs](terms/%E7%A4%BE%E5%8C%BA%E4%B8%8E%E6%96%87%E6%A1%A3.md) · [Caching Strategy](terms/%E7%BC%93%E5%AD%98%E7%AD%96%E7%95%A5.md) · [Self-hosting Cost](terms/%E8%87%AA%E6%89%98%E7%AE%A1%E6%88%90%E6%9C%AC.md) · [Training Content Summary](terms/%E8%AE%AD%E7%BB%83%E5%86%85%E5%AE%B9%E6%91%98%E8%A6%81.md) · [License](terms/%E8%AE%B8%E5%8F%AF%E8%AF%81.md) · [Evaluation, Evals](terms/%E8%AF%84%E4%BC%B0.md) · [Routing](terms/%E8%B7%AF%E7%94%B1.md) · [Migration Evaluation](terms/%E8%BF%81%E7%A7%BB%E8%AF%84%E4%BC%B0.md) · [Release Cadence](terms/%E8%BF%AD%E4%BB%A3%E9%80%9F%E5%BA%A6.md) · [Exit Cost](terms/%E9%80%80%E5%87%BA%E6%88%90%E6%9C%AC.md) · [Closed / Proprietary Model](terms/%E9%97%AD%E6%BA%90%E6%A8%A1%E5%9E%8B.md) · [Privacy & Compliance](terms/%E9%9A%90%E7%A7%81%E4%B8%8E%E5%90%88%E8%A7%84.md) · [Preview vs GA](terms/%E9%A2%84%E8%A7%88%E7%89%88%E4%B8%8E%E6%AD%A3%E5%BC%8F%E7%89%88.md)
- **Agent** (25): [Model Context Protocol](terms/MCP.md) · [Workflow vs Agent](terms/Workflow%20%E8%BF%98%E6%98%AF%20Agent.md) · [Compaction](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%8E%8B%E7%BC%A9.md) · [Context Engineering](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md) · [Human-in-the-Loop](terms/%E4%BA%BA%E6%9C%BA%E5%8D%8F%E4%BD%9C.md) · [Reference Server](terms/%E5%8F%82%E8%80%83%E6%9C%8D%E5%8A%A1%E5%99%A8.md) · [Multi-Agent](terms/%E5%A4%9A%20Agent%20%E5%8D%8F%E4%BD%9C.md) · [Sub-agent Isolation](terms/%E5%AD%90%E4%BB%A3%E7%90%86%E9%9A%94%E7%A6%BB.md) · [Orchestration / Pipeline](terms/%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%BC%96%E6%8E%92.md) · [Tool Definition](terms/%E5%B7%A5%E5%85%B7%E5%AE%9A%E4%B9%89.md) · [Tool Calling / Function Calling](terms/%E5%B7%A5%E5%85%B7%E8%B0%83%E7%94%A8.md) · [Skills](terms/%E6%8A%80%E8%83%BD%20-%20Skills.md) · [Guardrails](terms/%E6%8A%A4%E6%A0%8F.md) · [Prompt Injection](terms/%E6%8F%90%E7%A4%BA%E6%B3%A8%E5%85%A5.md) · [Prompt Chaining](terms/%E6%8F%90%E7%A4%BA%E9%93%BE.md) · [Agent](terms/%E6%99%BA%E8%83%BD%E4%BD%93%20-%20Agent.md) · [Permission](terms/%E6%9D%83%E9%99%90.md) · [Sandbox](terms/%E6%B2%99%E7%AE%B1.md) · [Browser Automation](terms/%E6%B5%8F%E8%A7%88%20-%20%E7%BD%91%E9%A1%B5%E6%93%8D%E4%BD%9C.md) · [Structured Output](terms/%E7%BB%93%E6%9E%84%E5%8C%96%E8%BE%93%E5%87%BA.md) · [Agentic Workflow Patterns](terms/%E7%BC%96%E6%8E%92%E6%A8%A1%E5%BC%8F.md) · [Memory](terms/%E8%AE%B0%E5%BF%86.md) · [Jailbreak](terms/%E8%B6%8A%E7%8B%B1.md) · [Remote Execution](terms/%E8%BF%9C%E7%A8%8B%E6%89%A7%E8%A1%8C.md) · [Long-running Task](terms/%E9%95%BF%E6%97%B6%E4%BB%BB%E5%8A%A1.md)
- **Media** (19): [Contrastive Language-Image Pre-training](terms/CLIP.md) · [ControlNet](terms/ControlNet.md) · [Embodied AI](terms/%E5%85%B7%E8%BA%AB%E6%99%BA%E8%83%BD.md) · [Diffusion Model](terms/%E6%89%A9%E6%95%A3%E6%A8%A1%E5%9E%8B.md) · [How Diffusion Models Generate](terms/%E6%89%A9%E6%95%A3%E6%A8%A1%E5%9E%8B%E6%80%8E%E4%B9%88%E7%94%9F%E6%88%90.md) · [Digital Avatar](terms/%E6%95%B0%E5%AD%97%E4%BA%BA.md) · [How Text Becomes Speech](terms/%E6%96%87%E5%AD%97%E6%80%8E%E4%B9%88%E5%8F%98%E6%88%90%E5%A3%B0%E9%9F%B3.md) · [Text-to-Image Generation](terms/%E6%96%87%E7%94%9F%E5%9B%BE.md) · [Computer Vision](terms/%E6%9C%BA%E5%99%A8%E8%A7%86%E8%A7%89.md) · [Watermarks and Content Credentials](terms/%E6%B0%B4%E5%8D%B0%E4%B8%8E%E5%86%85%E5%AE%B9%E5%87%AD%E8%AF%81.md) · [Deepfake](terms/%E6%B7%B1%E5%BA%A6%E4%BC%AA%E9%80%A0.md) · [Latent Space](terms/%E6%BD%9C%E7%A9%BA%E9%97%B4.md) · [Autonomous Driving](terms/%E8%87%AA%E5%8A%A8%E9%A9%BE%E9%A9%B6.md) · [Video Generation](terms/%E8%A7%86%E9%A2%91%E7%94%9F%E6%88%90.md) · [How Video Generation Works](terms/%E8%A7%86%E9%A2%91%E7%94%9F%E6%88%90%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E7%9A%84.md) · [How Voice Cloning Works](terms/%E8%AF%AD%E9%9F%B3%E5%85%8B%E9%9A%86%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E7%9A%84.md) · [TTS, Text-to-Speech](terms/%E8%AF%AD%E9%9F%B3%E5%90%88%E6%88%90.md) · [ASR, Automatic Speech Recognition](terms/%E8%AF%AD%E9%9F%B3%E8%AF%86%E5%88%AB.md) · [How Speech Recognition Works](terms/%E8%AF%AD%E9%9F%B3%E8%AF%86%E5%88%AB%E6%98%AF%E6%80%8E%E4%B9%88%E5%90%AC%E7%9A%84.md)
- **Model** (14): [AI Search](terms/AI%20%E6%90%9C%E7%B4%A2.md) · [LoRA (Low-Rank Adaptation)](terms/LoRA.md) · [Context Window](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3.md) · [Context Cost](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3%E7%9A%84%E4%BB%A3%E4%BB%B7.md) · [Multimodal](terms/%E5%A4%9A%E6%A8%A1%E6%80%81.md) · [Small Language Model (SLM)](terms/%E5%B0%8F%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B.md) · [Hallucination](terms/%E5%B9%BB%E8%A7%89.md) · [Fine-tuning](terms/%E5%BE%AE%E8%B0%83.md) · [Reasoning Model](terms/%E6%8E%A8%E7%90%86%E6%A8%A1%E5%9E%8B.md) · [Prompt](terms/%E6%8F%90%E7%A4%BA%E8%AF%8D.md) · [Temperature](terms/%E6%B8%A9%E5%BA%A6.md) · [Knowledge Cutoff](terms/%E7%9F%A5%E8%AF%86%E6%88%AA%E6%AD%A2.md) · [System Prompt](terms/%E7%B3%BB%E7%BB%9F%E6%8F%90%E7%A4%BA.md) · [Sampling](terms/%E9%87%87%E6%A0%B7%20-%20%E9%87%87%E6%A0%B7%E5%8F%82%E6%95%B0.md)
- **Development** (10): [Agent Client Protocol](terms/ACP.md) · [App Server](terms/App%20Server.md) · [Repository-level Understanding](terms/%E4%BB%93%E5%BA%93%E7%BA%A7%E7%90%86%E8%A7%A3.md) · [Code Completion](terms/%E4%BB%A3%E7%A0%81%E8%A1%A5%E5%85%A8.md) · [Diff](terms/%E5%B7%AE%E5%BC%82%E5%AF%B9%E6%AF%94.md) · [Continuous Integration, CI](terms/%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90.md) · [Version Control](terms/%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6.md) · [CLI Agent](terms/%E7%BB%88%E7%AB%AF%20Agent.md) · [Rate Limiting](terms/%E9%80%9F%E7%8E%87%E9%99%90%E5%88%B6.md) · [Pair Programming](terms/%E9%85%8D%E5%AF%B9%E7%BC%96%E7%A8%8B.md)
- **Data** (9): [safetensors](terms/safetensors.md) · [Transport](terms/%E4%BC%A0%E8%BE%93%E6%96%B9%E5%BC%8F.md) · [Chunking](terms/%E5%88%86%E5%9D%97.md) · [Synthetic Data](terms/%E5%90%88%E6%88%90%E6%95%B0%E6%8D%AE.md) · [Embedding / Vector](terms/%E5%90%91%E9%87%8F%20-%20%E5%B5%8C%E5%85%A5.md) · [Vector Database](terms/%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93.md) · [Retrieval-Augmented Generation, RAG](terms/%E8%81%94%E7%BD%91%20-%20%E6%A3%80%E7%B4%A2%E5%A2%9E%E5%BC%BA.md) · [Training Corpus](terms/%E8%AE%AD%E7%BB%83%E8%AF%AD%E6%96%99.md) · [Training Set, Test Set](terms/%E8%AE%AD%E7%BB%83%E9%9B%86%E4%B8%8E%E6%B5%8B%E8%AF%95%E9%9B%86.md)

### Browse by purpose — "I came here with a problem"

- **Learn** (80): [AGI (Artificial General Intelligence)](terms/AGI.md) · [Product vs Model](terms/AI%20%E4%BA%A7%E5%93%81%20vs%20AI%20%E6%A8%A1%E5%9E%8B.md) · [AI Accelerator](terms/AI%20%E8%8A%AF%E7%89%87.md) · [App Server](terms/App%20Server.md) · [Contrastive Language-Image Pre-training](terms/CLIP.md) · [FlashAttention](terms/FlashAttention.md) · [Graphics Processing Unit](terms/GPU.md) · [KV Cache](terms/KV%20%E7%BC%93%E5%AD%98.md) · [Logits and Probability Distribution](terms/logits%20%E4%B8%8E%E6%A6%82%E7%8E%87%E5%88%86%E5%B8%83.md) · [MLX](terms/MLX.md) · [Mixture of Experts (MoE)](terms/MoE%20-%20%E6%B7%B7%E5%90%88%E4%B8%93%E5%AE%B6.md) · [PagedAttention](terms/PagedAttention.md) · [Transformer](terms/Transformer.md) · [vLLM](terms/vLLM.md) · [In-context Learning](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%AD%A6%E4%B9%A0.md) · [Context Parallelism](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B9%B6%E8%A1%8C.md) · [MoE Offload / ncmoe](terms/%E4%B8%93%E5%AE%B6%E5%8D%B8%E8%BD%BD.md) · [Artificial Intelligence, AI](terms/%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD.md) · [Transport](terms/%E4%BC%A0%E8%BE%93%E6%96%B9%E5%BC%8F.md) · [Positional Encoding](terms/%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81.md) · [RLHF / Alignment](terms/%E5%81%8F%E5%A5%BD%E5%AF%B9%E9%BD%90.md) · [Embodied AI](terms/%E5%85%B7%E8%BA%AB%E6%99%BA%E8%83%BD.md) · [Chunked Prefill](terms/%E5%88%86%E5%9D%97%E9%A2%84%E5%A1%AB%E5%85%85.md) · [Feed-Forward Network](terms/%E5%89%8D%E9%A6%88%E7%BD%91%E7%BB%9C.md) · [Parameter](terms/%E5%8F%82%E6%95%B0.md) · [Reference Server](terms/%E5%8F%82%E8%80%83%E6%9C%8D%E5%8A%A1%E5%99%A8.md) · [Synthetic Data](terms/%E5%90%88%E6%88%90%E6%95%B0%E6%8D%AE.md) · [Embedding / Vector](terms/%E5%90%91%E9%87%8F%20-%20%E5%B5%8C%E5%85%A5.md) · [Turing Test](terms/%E5%9B%BE%E7%81%B5%E6%B5%8B%E8%AF%95.md) · [Foundation Model](terms/%E5%9F%BA%E7%A1%80%E6%A8%A1%E5%9E%8B.md) · [Multi-Head Attention](terms/%E5%A4%9A%E5%A4%B4%E6%B3%A8%E6%84%8F%E5%8A%9B.md) · [Multimodal](terms/%E5%A4%9A%E6%A8%A1%E6%80%81.md) · [Large Language Model, LLM](terms/%E5%A4%A7%E6%A8%A1%E5%9E%8B%20-%20%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B.md) · [Subword Tokenization](terms/%E5%AD%90%E8%AF%8D%E5%88%86%E8%AF%8D.md) · [Layer Normalization](terms/%E5%B1%82%E5%BD%92%E4%B8%80%E5%8C%96.md) · [Embedding Layer](terms/%E5%B5%8C%E5%85%A5%E5%B1%82.md) · [Open-source Ecosystem](terms/%E5%BC%80%E6%BA%90%E7%94%9F%E6%80%81.md) · [Tensor Parallelism](terms/%E5%BC%A0%E9%87%8F%E5%B9%B6%E8%A1%8C.md) · [Reinforcement Learning (RL)](terms/%E5%BC%BA%E5%8C%96%E5%AD%A6%E4%B9%A0.md) · [Diffusion Model](terms/%E6%89%A9%E6%95%A3%E6%A8%A1%E5%9E%8B.md) …and 40 more
- **Build** (49): [Agent Client Protocol](terms/ACP.md) · [AI Search](terms/AI%20%E6%90%9C%E7%B4%A2.md) · [ControlNet](terms/ControlNet.md) · [GGUF](terms/GGUF.md) · [-ngl / Offload](terms/GPU%20%E5%B1%82%E5%8D%B8%E8%BD%BD.md) · [llama.cpp](terms/llama.cpp.md) · [LM Studio](terms/LM%20Studio.md) · [LoRA (Low-Rank Adaptation)](terms/LoRA.md) · [Model Context Protocol](terms/MCP.md) · [Ollama](terms/Ollama.md) · [OpenAI-compatible API](terms/OpenAI%20%E5%85%BC%E5%AE%B9%E6%8E%A5%E5%8F%A3.md) · [Prompt Cache](terms/Prompt%20Cache.md) · [QLoRA](terms/QLoRA.md) · [Token](terms/Token.md) · [Compaction](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%8E%8B%E7%BC%A9.md) · [Context Engineering](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md) · [Context Window](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3.md) · [Repository-level Understanding](terms/%E4%BB%93%E5%BA%93%E7%BA%A7%E7%90%86%E8%A7%A3.md) · [Code Completion](terms/%E4%BB%A3%E7%A0%81%E8%A1%A5%E5%85%A8.md) · [Chunking](terms/%E5%88%86%E5%9D%97.md) · [Pruning](terms/%E5%89%AA%E6%9E%9D.md) · [Vector Database](terms/%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93.md) · [Multi-Agent](terms/%E5%A4%9A%20Agent%20%E5%8D%8F%E4%BD%9C.md) · [Sub-agent Isolation](terms/%E5%AD%90%E4%BB%A3%E7%90%86%E9%9A%94%E7%A6%BB.md) · [Orchestration / Pipeline](terms/%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%BC%96%E6%8E%92.md) · [Tool Definition](terms/%E5%B7%A5%E5%85%B7%E5%AE%9A%E4%B9%89.md) · [Tool Calling / Function Calling](terms/%E5%B7%A5%E5%85%B7%E8%B0%83%E7%94%A8.md) · [Fine-tuning](terms/%E5%BE%AE%E8%B0%83.md) · [Chain of Thought (CoT)](terms/%E6%80%9D%E7%BB%B4%E9%93%BE.md) · [Skills](terms/%E6%8A%80%E8%83%BD%20-%20Skills.md) · [Prompt](terms/%E6%8F%90%E7%A4%BA%E8%AF%8D.md) · [Prompt Chaining](terms/%E6%8F%90%E7%A4%BA%E9%93%BE.md) · [Agent](terms/%E6%99%BA%E8%83%BD%E4%BD%93%20-%20Agent.md) · [Browser Automation](terms/%E6%B5%8F%E8%A7%88%20-%20%E7%BD%91%E9%A1%B5%E6%93%8D%E4%BD%9C.md) · [Temperature](terms/%E6%B8%A9%E5%BA%A6.md) · [System Prompt](terms/%E7%B3%BB%E7%BB%9F%E6%8F%90%E7%A4%BA.md) · [CLI Agent](terms/%E7%BB%88%E7%AB%AF%20Agent.md) · [Structured Output](terms/%E7%BB%93%E6%9E%84%E5%8C%96%E8%BE%93%E5%87%BA.md) · [Caching Strategy](terms/%E7%BC%93%E5%AD%98%E7%AD%96%E7%95%A5.md) · [Agentic Workflow Patterns](terms/%E7%BC%96%E6%8E%92%E6%A8%A1%E5%BC%8F.md) …and 9 more
- **Avoid** (36): [AI Safety](terms/AI%20%E5%AE%89%E5%85%A8.md) · [safetensors](terms/safetensors.md) · [Context Cost](terms/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AA%97%E5%8F%A3%E7%9A%84%E4%BB%A3%E4%BB%B7.md) · [Human-in-the-Loop](terms/%E4%BA%BA%E6%9C%BA%E5%8D%8F%E4%BD%9C.md) · [Vendor Lock-in](terms/%E4%BE%9B%E5%BA%94%E5%95%86%E9%94%81%E5%AE%9A.md) · [Bias](terms/%E5%81%8F%E8%A7%81.md) · [Regional Availability](terms/%E5%8C%BA%E5%9F%9F%E5%8F%AF%E7%94%A8%E6%80%A7.md) · [Portability](terms/%E5%8F%AF%E6%9B%BF%E6%8D%A2%E6%80%A7.md) · [Diff](terms/%E5%B7%AE%E5%BC%82%E5%AF%B9%E6%AF%94.md) · [Hallucination](terms/%E5%B9%BB%E8%A7%89.md) · [Why Hallucination Happens](terms/%E5%B9%BB%E8%A7%89%E7%9A%84%E6%88%90%E5%9B%A0.md) · [Guardrails](terms/%E6%8A%A4%E6%A0%8F.md) · [Refusal](terms/%E6%8B%92%E7%AD%94.md) · [Continuous Integration, CI](terms/%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90.md) · [Prompt Injection](terms/%E6%8F%90%E7%A4%BA%E6%B3%A8%E5%85%A5.md) · [Data Sovereignty](terms/%E6%95%B0%E6%8D%AE%E4%B8%8D%E5%87%BA%E7%BD%91.md) · [Data Residency](terms/%E6%95%B0%E6%8D%AE%E9%A9%BB%E7%95%99.md) · [Vendor Dependency](terms/%E6%9C%8D%E5%8A%A1%E4%B8%AD%E6%96%AD%E9%A3%8E%E9%99%A9.md) · [Permission](terms/%E6%9D%83%E9%99%90.md) · [Model Family, Version, Variant](terms/%E6%A8%A1%E5%9E%8B%E7%89%88%E6%9C%AC%E4%B8%8E%E5%8F%98%E4%BD%93.md) · [Model Retirement](terms/%E6%A8%A1%E5%9E%8B%E9%80%80%E5%BD%B9.md) · [Watermarks and Content Credentials](terms/%E6%B0%B4%E5%8D%B0%E4%B8%8E%E5%86%85%E5%AE%B9%E5%87%AD%E8%AF%81.md) · [Sandbox](terms/%E6%B2%99%E7%AE%B1.md) · [Deepfake](terms/%E6%B7%B1%E5%BA%A6%E4%BC%AA%E9%80%A0.md) · [Version Control](terms/%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6.md) · [Generative AI Compliance Duties](terms/%E7%94%9F%E6%88%90%E5%BC%8F%20AI%20%E5%90%88%E8%A7%84%E4%B9%89%E5%8A%A1.md) · [Knowledge Cutoff](terms/%E7%9F%A5%E8%AF%86%E6%88%AA%E6%AD%A2.md) · [Red Teaming](terms/%E7%BA%A2%E9%98%9F%E6%B5%8B%E8%AF%95.md) · [Capability Boundary](terms/%E8%83%BD%E5%8A%9B%E8%BE%B9%E7%95%8C.md) · [Automation Bias](terms/%E8%87%AA%E5%8A%A8%E5%8C%96%E5%81%8F%E8%A7%81.md) · [Training Content Summary](terms/%E8%AE%AD%E7%BB%83%E5%86%85%E5%AE%B9%E6%91%98%E8%A6%81.md) · [License](terms/%E8%AE%B8%E5%8F%AF%E8%AF%81.md) · [How Voice Cloning Works](terms/%E8%AF%AD%E9%9F%B3%E5%85%8B%E9%9A%86%E6%98%AF%E6%80%8E%E4%B9%88%E5%81%9A%E7%9A%84.md) · [Jailbreak](terms/%E8%B6%8A%E7%8B%B1.md) · [Exit Cost](terms/%E9%80%80%E5%87%BA%E6%88%90%E6%9C%AC.md) · [Privacy & Compliance](terms/%E9%9A%90%E7%A7%81%E4%B8%8E%E5%90%88%E8%A7%84.md)
- **Choose** (35): [Agent vs Chatbot](terms/AI%20Agent%20%E4%B8%8E%E8%81%8A%E5%A4%A9%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%9A%84%E5%8C%BA%E5%88%AB.md) · [API](terms/API%20-%20%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8.md) · [Bits Per Weight](terms/bpw.md) · [CPU Inference](terms/CPU%20%E6%8E%A8%E7%90%86.md) · [Workflow vs Agent](terms/Workflow%20%E8%BF%98%E6%98%AF%20Agent.md) · [Cost per Call](terms/%E5%8D%95%E6%AC%A1%E8%B0%83%E7%94%A8%E6%88%90%E6%9C%AC.md) · [Observability](terms/%E5%8F%AF%E8%A7%82%E6%B5%8B%E6%80%A7.md) · [Throughput, TPS](terms/%E5%90%9E%E5%90%90.md) · [Perplexity (PPL)](terms/%E5%9B%B0%E6%83%91%E5%BA%A6.md) · [Benchmark](terms/%E5%9F%BA%E5%87%86%E6%B5%8B%E8%AF%95.md) · [Small Language Model (SLM)](terms/%E5%B0%8F%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B.md) · [Open Weights](terms/%E5%BC%80%E6%94%BE%E6%9D%83%E9%87%8D.md) · [Open-weight Model](terms/%E5%BC%80%E6%BA%90%E6%A8%A1%E5%9E%8B.md) · [Aggregate Score](terms/%E6%80%BB%E5%88%86%20-%20%E7%BB%BC%E5%90%88%E8%AF%84%E6%B5%8B.md) · [Cost](terms/%E6%88%90%E6%9C%AC.md) · [Inference Cost](terms/%E6%8E%A8%E7%90%86%E6%88%90%E6%9C%AC.md) · [Reasoning Model](terms/%E6%8E%A8%E7%90%86%E6%A8%A1%E5%9E%8B.md) · [Data Contamination](terms/%E6%95%B0%E6%8D%AE%E6%B1%A1%E6%9F%93.md) · [VRAM](terms/%E6%98%BE%E5%AD%98.md) · [Local Deployment](terms/%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2.md) · [Calibration](terms/%E6%A0%A1%E5%87%86.md) · [Model Card](terms/%E6%A8%A1%E5%9E%8B%E5%8D%A1.md) · [Evaluation Limits](terms/%E6%A8%A1%E5%9E%8B%E8%AF%84%E6%B5%8B%E7%9A%84%E5%B1%80%E9%99%90.md) · [Generalization](terms/%E6%B3%9B%E5%8C%96.md) · [Emergent Abilities](terms/%E6%B6%8C%E7%8E%B0%E8%83%BD%E5%8A%9B.md) · [Community & Docs](terms/%E7%A4%BE%E5%8C%BA%E4%B8%8E%E6%96%87%E6%A1%A3.md) · [Self-hosting Cost](terms/%E8%87%AA%E6%89%98%E7%AE%A1%E6%88%90%E6%9C%AC.md) · [Training Set, Test Set](terms/%E8%AE%AD%E7%BB%83%E9%9B%86%E4%B8%8E%E6%B5%8B%E8%AF%95%E9%9B%86.md) · [Evaluation, Evals](terms/%E8%AF%84%E4%BC%B0.md) · [Benchmark Saturation](terms/%E8%AF%84%E6%B5%8B%E9%A5%B1%E5%92%8C.md) · [Overfitting](terms/%E8%BF%87%E6%8B%9F%E5%90%88.md) · [Release Cadence](terms/%E8%BF%AD%E4%BB%A3%E9%80%9F%E5%BA%A6.md) · [Closed / Proprietary Model](terms/%E9%97%AD%E6%BA%90%E6%A8%A1%E5%9E%8B.md) · [Preview vs GA](terms/%E9%A2%84%E8%A7%88%E7%89%88%E4%B8%8E%E6%AD%A3%E5%BC%8F%E7%89%88.md) · [Time To First Token, TTFT](terms/%E9%A6%96%E5%AD%97%E5%BB%B6%E8%BF%9F.md)

<!-- INDEX:END -->

## Measured size (A8)

<!-- STATS:BEGIN generated, do not edit -->
| Item | Measured value |
|---|---|
| Terms | 200 |
| Stations | Getting In 35 · Hands On 35 · Going Deeper 35 · Under the Hood 35 · Running It 30 · Choosing Right 30 |
| Learning paths | 8 curated ordered routes, each with a checkpoint |
| Short guides | 50 guides of 5-10 minutes each (English coverage 50/50) |
| Chronicle and atlas | 18 timeline entries · 12 companies · 5 vocabulary shifts |
| Domain | concept 56 · infra 34 · choice 33 · agent 25 · media 19 · model 14 · dev 10 · data 9 |
| Purpose (purposeTag) | learn 80 · apply 49 · guard 36 · judge 35 |
| Source entries (refs) | 458 |
| English coverage | 200 / 200 |
<!-- STATS:END -->