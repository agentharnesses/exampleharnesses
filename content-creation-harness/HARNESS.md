---
name: content-creation
description: Assists a technical content creator through the full workflow — from finding ideas through research, learning, writing, and publishing to Medium and YouTube.
---

This harness supports a technical content creator working on a personal blog published to Medium and YouTube. It covers the full workflow: finding and evaluating ideas, researching topics, managing working notes, drafting articles and video scripts, proofreading, and preparing platform-specific publication assets.

## Upon loading the Harness
no immediate action is required upon loading the harness. This document is meant to be a reference and entry point for future queries.

## How to Find Information for Claude.

Use the `agent-harnesses` skill to explore the harness, just in time, based on prompts from the user. Run `disclose.py` with `python3` against this harness directory to progressively explore its contents — select only what is relevant and repeat until the session is complete, then read the returned resources.

Do not load skills or references speculatively. Use `disclose.py` to find resources when necessary. Any time you need to find anything in the harness, and you don't already know where it exists, use `disclose.py`.

When **maintaining the harness** (adding, moving, or renaming files), use `reverse_disclose.py` to find every `.md` file above the target that links to it — so you can update all references that would break:

```
python3 .claude/skills/agent-harnesses/scripts/reverse_disclose.py <target_path>
```

Run this before and after any structural change. The output lists each ancestor `.md` file that references the target, with line numbers and link text, so nothing is left pointing to a stale path.

## Skills

- **discovery/** — Ideation and research: evaluate new ideas, plan research, search online, scan prior content
- **learning/** — Note management: organize and recall working notes across the research and learning phase
- **creation/** — Content production: draft Medium articles and YouTube video scripts from notes
- **polish/** — Final passes: proofread drafts, format and prepare content for Medium and YouTube
- **launch/** — Application launching: start local apps like the notes app. Refer to this any time an application is launched.
- **maintenance/** — Harness upkeep: modify existing harness files, scaffold new skills
- **test/** — Harness verification: test skills for confirming routing and setup work end-to-end

## References

- **brand-voice.md** — Writing tone, style, and audience profile
- **prior-content.md** — Index of published articles and videos for continuity
- **medium-format.md** — Medium-specific formatting and publishing conventions
- **youtube-format.md** — YouTube description format, chapter markers, and tags

## Applications
Read `APPLICATIONS.md` for more information.
- there's a **notes-app** for editing and storing notes.