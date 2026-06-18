# Content Creation Harness — Design Spec
**Date:** 2026-06-18

## Context

Daniel produces technical content for a personal blog (IAEE), publishing written articles on Medium and video content on YouTube. The workflow spans ideation through publication and involves significant research, active learning through annotated notes, and multi-format production.

The goal of this harness is to make that workflow faster and more consistent — not to automate it, but to assist at each stage. The content remains human-driven; the harness handles the organizational and mechanical overhead.

---

## Overall Structure

```
content-creation-harness/
├── HARNESS.md
├── skills/
│   ├── SKILLS.md
│   ├── discovery/
│   │   ├── SKILLS.md
│   │   ├── ideation/
│   │   └── research/
│   │       ├── SKILLS.md
│   │       ├── planning/
│   │       ├── online-search/
│   │       └── introspection/
│   ├── learning/
│   │   ├── SKILLS.md
│   │   └── note-management/
│   ├── creation/
│   │   ├── SKILLS.md
│   │   ├── write/
│   │   └── produce/
│   ├── polish/
│   │   ├── SKILLS.md
│   │   ├── proofread/
│   │   └── publish/
│   └── maintenance/
│       ├── SKILLS.md
│       ├── modify-harness/
│       └── create-skill/
└── references/
    ├── REFERENCES.md
    ├── brand-voice.md
    ├── prior-content.md
    ├── medium-format.md
    └── youtube-format.md
```

Five top-level skill buckets, each with a `SKILLS.md` for intra-bucket routing. The top-level `SKILLS.md` routes between buckets. Each bucket starts lean and is designed to grow as more granular needs emerge.

---

## Skill Buckets

### Discovery
Covers ideation and research as a unified phase — finding what to cover and what's already been said about it.

**`ideation/`**
Evaluates whether a new idea has enough novelty and substance to be worth pursuing. Draws on `references/prior-content.md` to suggest derivative directions from past work. Ideas typically originate from academic/senior sources online or as natural extensions of previously covered topics.

**`research/`**
Three sub-skills with their own `SKILLS.md`:

- **`planning/`** — Interactive skill. Decides what to look for before any searching begins. Works with the user to scope the research: what questions need answering, what types of sources are most relevant, whether the topic is new ground or building on prior work.
- **`online-search/`** — Finds new sources: papers, blog posts, academic references. Prioritizes senior/academic sources consistent with the content's technical depth.
- **`introspection/`** — Scans published content (via `references/prior-content.md`) for relevant prior coverage. Prevents redundancy and surfaces opportunities to link or extend past work.

---

### Learning
Supports the active note-taking process: annotating videos and papers in text files, interlaced with screenshots, following rabbit holes as they emerge.

**`note-management/`**
Two core responsibilities:
1. **Organization** — Scaffold new note documents with consistent structure, read and update existing ones, keep the format coherent across files.
2. **Memory** — Surface relevant prior notes when starting something new, so previously encountered concepts and open questions aren't lost or re-tread.

Distinct from `introspection/` in discovery: that skill scans *published* content; this one scans *working notes*.

---

### Creation
Turns notes and understanding into publishable content. Split by output format because articles and videos have meaningfully different structure, voice, and pacing.

**`write/`**
Drafts and structures Medium articles from notes and learning documents. Pulls from `references/brand-voice.md` for tone and style.

**`produce/`**
Writes YouTube video scripts, descriptions, and chapter markers. Also output-format-aware — video pacing and structure differ from written articles.

Natural future additions: `make-example/` for code examples, `image-brief/` for illustration or thumbnail direction.

---

### Polish
Gets finished drafts ready to ship.

**`proofread/`**
Runs spelling, grammar, and readability passes. Focused on correctness — preserves voice, flags errors and awkward phrasing.

**`publish/`**
Handles platform-specific preparation. For Medium: structure, tags, formatting. For YouTube: descriptions, chapter markers, tags, thumbnail briefs. Pulls from `references/medium-format.md` and `references/youtube-format.md`.

---

### Maintenance
Meta-skills for evolving the harness itself.

**`modify-harness/`**
Updates existing harness files — `HARNESS.md`, `SKILLS.md` indexes, `REFERENCES.md`, and reference documents — keeping the structure consistent as it grows.

**`create-skill/`**
Scaffolds new skills per the agentharnesses.io spec: correct directory structure, frontmatter, and routing summaries. The entry point when a new granular need is identified.

---

## References

| File | Purpose |
|---|---|
| `brand-voice.md` | Tone, style, and intended audience — pulled by `write/` and `proofread/` |
| `prior-content.md` | Index of published articles and videos — pulled by `ideation/` and `introspection/` |
| `medium-format.md` | Medium-specific formatting conventions — pulled by `publish/` |
| `youtube-format.md` | YouTube description format, chapter structure, tags — pulled by `publish/` |

All references start as stubs to be filled in over time. `prior-content.md` is the most critical to keep current — several skills depend on it for continuity across the body of work.

---

## What This Harness Does Not Do

- Teach or explain concepts (the learning phase is note-assisted, not tutored)
- Generate content autonomously — all output is assistant-to-human, not agent-to-publish
- Replace the exploratory, depth-first process — it organizes and assists, not directs
