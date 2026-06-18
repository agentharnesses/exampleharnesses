# Content Creation Harness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build out the full content-creation-harness directory per the agentharnesses.io spec, with all skill and reference files populated with working content (no stubs except the user-facing reference templates).

**Architecture:** Five skill buckets (discovery, learning, creation, polish, maintenance) each with their own SKILLS.md index for intra-bucket routing. A top-level SKILLS.md routes between buckets. References are persistent context files the skills read from.

**Tech Stack:** Markdown, YAML frontmatter, agentharnesses.io spec conventions.

## Global Constraints

- All `SKILL.md`, `SKILLS.md`, and `REFERENCES.md` files must have YAML frontmatter with a `description` field.
- `HARNESS.md` frontmatter must include both `name` and `description`.
- Frontmatter uses triple-dash delimiters (`---`).
- File names: `HARNESS.md`, `SKILL.md`, `SKILLS.md`, `REFERENCES.md` — uppercase exactly as written.
- All files are Markdown (`.md`).
- No content should be TBD or placeholder in skill files. Reference templates are intentionally left for the user to fill in.

---

### Task 1: Scaffold directories and write HARNESS.md

**Files:**
- Create: `content-creation-harness/HARNESS.md`
- Create dirs: `skills/discovery/research/`, `skills/learning/`, `skills/creation/`, `skills/polish/`, `skills/maintenance/`, `references/`

- [ ] **Step 1: Create directory structure**

```bash
cd content-creation-harness
mkdir -p skills/discovery/research
mkdir -p skills/discovery/ideation
mkdir -p skills/discovery/research/planning
mkdir -p skills/discovery/research/online-search
mkdir -p skills/discovery/research/introspection
mkdir -p skills/learning/note-management
mkdir -p skills/creation/write
mkdir -p skills/creation/produce
mkdir -p skills/polish/proofread
mkdir -p skills/polish/publish
mkdir -p skills/maintenance/modify-harness
mkdir -p skills/maintenance/create-skill
mkdir -p references
```

- [ ] **Step 2: Write HARNESS.md**

Create `content-creation-harness/HARNESS.md`:

```markdown
---
name: content-creation
description: Assists a technical content creator through the full workflow — from finding ideas through research, learning, writing, and publishing to Medium and YouTube.
---

This harness supports a technical content creator working on a personal blog published to Medium and YouTube. It covers the full workflow: finding and evaluating ideas, researching topics, managing working notes, drafting articles and video scripts, proofreading, and preparing platform-specific publication assets.

## Skills

- **discovery/** — Ideation and research: evaluate new ideas, plan research, search online, scan prior content
- **learning/** — Note management: organize and recall working notes across the research and learning phase
- **creation/** — Content production: draft Medium articles and YouTube video scripts from notes
- **polish/** — Final passes: proofread drafts, format and prepare content for Medium and YouTube
- **maintenance/** — Harness upkeep: modify existing harness files, scaffold new skills

## References

- **brand-voice.md** — Writing tone, style, and audience profile
- **prior-content.md** — Index of published articles and videos for continuity
- **medium-format.md** — Medium-specific formatting and publishing conventions
- **youtube-format.md** — YouTube description format, chapter markers, and tags
```

- [ ] **Step 3: Verify**

```bash
ls content-creation-harness/HARNESS.md
python3 -c "
import re, sys
text = open('content-creation-harness/HARNESS.md').read()
match = re.match(r'---\n(.*?)\n---', text, re.DOTALL)
assert match, 'no frontmatter'
fm = match.group(1)
assert 'name:' in fm, 'missing name'
assert 'description:' in fm, 'missing description'
print('HARNESS.md OK')
"
```

Expected: `HARNESS.md OK`

- [ ] **Step 4: Commit**

```bash
git add content-creation-harness/HARNESS.md
git commit -m "feat: scaffold harness directories and add HARNESS.md"
```

---

### Task 2: Top-level SKILLS.md

**Files:**
- Create: `content-creation-harness/skills/SKILLS.md`

- [ ] **Step 1: Write skills/SKILLS.md**

```markdown
---
description: Five workflow buckets covering the full content creation pipeline from ideation through publication, plus harness maintenance.
---

- **discovery/** — Use when finding new ideas, evaluating whether a topic is worth pursuing, planning research, searching for sources, or checking what has already been covered in prior content.
- **learning/** — Use when managing working notes: creating note files, organizing existing ones, or surfacing relevant prior notes before starting new research.
- **creation/** — Use when drafting content: Medium articles or YouTube video scripts from existing notes and understanding.
- **polish/** — Use when a draft is ready for final passes: proofreading for correctness or preparing platform-specific publication assets.
- **maintenance/** — Use when modifying harness structure, updating routing indexes, or scaffolding new skills.
```

- [ ] **Step 2: Verify**

```bash
python3 -c "
import re
text = open('content-creation-harness/skills/SKILLS.md').read()
match = re.match(r'---\n(.*?)\n---', text, re.DOTALL)
assert match and 'description:' in match.group(1)
print('skills/SKILLS.md OK')
"
```

Expected: `skills/SKILLS.md OK`

- [ ] **Step 3: Commit**

```bash
git add content-creation-harness/skills/SKILLS.md
git commit -m "feat: add top-level skills SKILLS.md"
```

---

### Task 3: Discovery bucket

**Files:**
- Create: `skills/discovery/SKILLS.md`
- Create: `skills/discovery/ideation/SKILL.md`
- Create: `skills/discovery/research/SKILLS.md`
- Create: `skills/discovery/research/planning/SKILL.md`
- Create: `skills/discovery/research/online-search/SKILL.md`
- Create: `skills/discovery/research/introspection/SKILL.md`

- [ ] **Step 1: Write skills/discovery/SKILLS.md**

```markdown
---
description: Ideation and research skills for finding topics and sourcing material. Use when deciding what to cover or finding information about a chosen topic.
---

- **ideation/** — Use when evaluating whether a new idea is worth pursuing, or generating derivative topic ideas from prior content.
- **research/** — Use when ready to find information on a chosen topic. Contains three sub-skills: planning (scope the research), online-search (find new sources), and introspection (scan prior covered content).
```

- [ ] **Step 2: Write skills/discovery/ideation/SKILL.md**

```markdown
---
name: ideation
description: Evaluate new content ideas for novelty and substance, or generate derivative ideas from prior work.
---

## Role

Help evaluate whether a topic idea is worth pursuing, or surface new directions based on previously covered content.

## Inputs

- A candidate idea (from the user), or a request to generate derivative ideas
- `references/prior-content.md` — to assess overlap with prior work and identify derivative opportunities

## Evaluating an idea

1. Read `references/prior-content.md` to check for prior coverage
2. Assess novelty: has this been covered? Is there a fresh angle?
3. Assess substance: is there enough depth for a full article or video?
4. Return a recommendation: pursue, refine, or pass — with reasoning

## Generating derivative ideas

1. Read `references/prior-content.md`
2. Identify natural extensions, follow-up topics, or applications of prior work
3. Return a prioritized list of 3-5 ideas with brief rationale for each
```

- [ ] **Step 3: Write skills/discovery/research/SKILLS.md**

```markdown
---
description: Three sub-skills for finding information on a chosen topic. Start with planning before searching.
---

- **planning/** — Use first. Interactive: scopes what to look for, what types of sources are needed, and whether to search online, introspect prior content, or both.
- **online-search/** — Use to find new sources: papers, blog posts, and senior/academic references on the topic.
- **introspection/** — Use to check prior covered content for relevant existing coverage, connections, or material to build on.
```

- [ ] **Step 4: Write skills/discovery/research/planning/SKILL.md**

```markdown
---
name: research-planning
description: Interactively scope a research effort before searching begins — what to look for, what types of sources, and which search skills to use.
---

## Role

Work with the user to define the research scope before any searching happens. This prevents unfocused searching and ensures the right sub-skills are used.

## What to do

1. Ask the user what they're trying to understand about the topic
2. Clarify: is this new ground, or building on prior work?
3. Identify what types of sources are most relevant (academic papers, blog posts, documentation, etc.)
4. Recommend which sub-skills to run next: `online-search/`, `introspection/`, or both
5. Output a brief research brief: the core questions to answer and the source types to target
```

- [ ] **Step 5: Write skills/discovery/research/online-search/SKILL.md**

```markdown
---
name: online-search
description: Find new sources — papers, blog posts, and senior/academic references — for a chosen topic.
---

## Role

Surface relevant external sources based on the research brief from `planning/`.

## Inputs

- Research brief from `planning/` (core questions, source types)
- The topic being researched

## What to do

1. Formulate search queries targeting academic and senior-developer sources
2. Search for: papers (arXiv, Google Scholar), authoritative blog posts, documentation
3. Return an organized list of sources with:
   - Title and link
   - One-line description of relevance
   - Suggested priority (high / medium / low)
```

- [ ] **Step 6: Write skills/discovery/research/introspection/SKILL.md**

```markdown
---
name: introspection
description: Scan prior published content for coverage relevant to the current topic — to avoid redundancy and surface connections.
---

## Role

Check what has already been covered before investing in new research.

## Inputs

- `references/prior-content.md` — index of published articles and videos
- The current topic or research questions

## What to do

1. Read `references/prior-content.md`
2. Identify prior content that overlaps with or relates to the current topic
3. Return:
   - Directly relevant prior content (may reduce research needed)
   - Adjacent content (potential links or extensions)
   - Confirmation if the topic is genuinely new ground
```

- [ ] **Step 7: Verify**

```bash
python3 -c "
import re, os
files = [
    'content-creation-harness/skills/discovery/SKILLS.md',
    'content-creation-harness/skills/discovery/ideation/SKILL.md',
    'content-creation-harness/skills/discovery/research/SKILLS.md',
    'content-creation-harness/skills/discovery/research/planning/SKILL.md',
    'content-creation-harness/skills/discovery/research/online-search/SKILL.md',
    'content-creation-harness/skills/discovery/research/introspection/SKILL.md',
]
for f in files:
    text = open(f).read()
    match = re.match(r'---\n(.*?)\n---', text, re.DOTALL)
    assert match and 'description:' in match.group(1), f'{f} missing description'
    print(f'OK: {f}')
"
```

Expected: six `OK:` lines.

- [ ] **Step 8: Commit**

```bash
git add content-creation-harness/skills/discovery/
git commit -m "feat: add discovery bucket — ideation and research skills"
```

---

### Task 4: Learning bucket

**Files:**
- Create: `skills/learning/SKILLS.md`
- Create: `skills/learning/note-management/SKILL.md`

- [ ] **Step 1: Write skills/learning/SKILLS.md**

```markdown
---
description: Skills for managing working notes during the research and learning phase.
---

- **note-management/** — Use when creating, organizing, or searching working note files. Also use when starting a new topic to surface relevant prior notes.
```

- [ ] **Step 2: Write skills/learning/note-management/SKILL.md**

```markdown
---
name: note-management
description: Create, organize, and search working note files — text documents with annotations and screenshot references.
---

## Role

Keep the working notes system organized and searchable. Notes are text files with annotations and screenshot references, created during research and learning. Distinct from `discovery/research/introspection/`, which scans published content — this skill scans and manages working notes.

## Creating a new note file

1. Scaffold with the template below
2. Pre-populate topic, date, and source being annotated

## Organizing existing notes

1. Review note files for the current topic or session
2. Identify redundancy, missing sections, or unresolved open questions
3. Suggest consolidation or restructuring as needed

## Surfacing prior notes

1. Given a new topic, scan existing note files for relevant prior content
2. Return a summary of what's already been noted and any open questions

## Note File Template

    # [Topic]
    Date: YYYY-MM-DD
    Source: [title, URL, or filename]

    ## Summary
    [High-level understanding in own words]

    ## Key Concepts
    [Bullet list of important ideas]

    ## Open Questions
    [Things that need following up]

    ## Annotations
    [Section-by-section or timestamp-by-timestamp notes]
```

- [ ] **Step 3: Verify**

```bash
python3 -c "
import re
files = [
    'content-creation-harness/skills/learning/SKILLS.md',
    'content-creation-harness/skills/learning/note-management/SKILL.md',
]
for f in files:
    text = open(f).read()
    match = re.match(r'---\n(.*?)\n---', text, re.DOTALL)
    assert match and 'description:' in match.group(1), f'{f} missing description'
    print(f'OK: {f}')
"
```

Expected: two `OK:` lines.

- [ ] **Step 4: Commit**

```bash
git add content-creation-harness/skills/learning/
git commit -m "feat: add learning bucket — note-management skill"
```

---

### Task 5: Creation bucket

**Files:**
- Create: `skills/creation/SKILLS.md`
- Create: `skills/creation/write/SKILL.md`
- Create: `skills/creation/produce/SKILL.md`

- [ ] **Step 1: Write skills/creation/SKILLS.md**

```markdown
---
description: Skills for drafting publishable content from notes. Use when ready to turn research and understanding into an article or video.
---

- **write/** — Use to draft a Medium article from notes and learning documents.
- **produce/** — Use to write a YouTube video script, description, or chapter structure.
```

- [ ] **Step 2: Write skills/creation/write/SKILL.md**

```markdown
---
name: write
description: Draft and structure Medium articles from working notes and learning documents.
---

## Role

Turn research notes and understanding into a structured Medium article draft.

## Inputs

- Working note files for the topic (from `learning/note-management/`)
- `references/brand-voice.md` — tone, style, audience

## What to do

1. Read the working notes for the topic
2. Read `references/brand-voice.md`
3. Identify the core argument or insight the article should communicate
4. Propose an outline for user approval before drafting
5. Draft the article section by section, in the user's voice
6. Flag any sections that need more supporting detail or examples
```

- [ ] **Step 3: Write skills/creation/produce/SKILL.md**

```markdown
---
name: produce
description: Write YouTube video scripts, descriptions, and chapter markers from working notes.
---

## Role

Turn research notes and understanding into YouTube video content: scripts, descriptions, and chapter structure.

## Inputs

- Working note files for the topic (from `learning/note-management/`)
- `references/brand-voice.md` — tone and style
- `references/youtube-format.md` — YouTube-specific conventions

## What to do

1. Read the working notes for the topic
2. Read `references/brand-voice.md` and `references/youtube-format.md`
3. Identify the narrative arc: what does the viewer learn, in what order?
4. Propose a chapter structure for user approval before drafting
5. Draft the script section by section
6. Write the video description and chapter markers per `youtube-format.md`
```

- [ ] **Step 4: Verify**

```bash
python3 -c "
import re
files = [
    'content-creation-harness/skills/creation/SKILLS.md',
    'content-creation-harness/skills/creation/write/SKILL.md',
    'content-creation-harness/skills/creation/produce/SKILL.md',
]
for f in files:
    text = open(f).read()
    match = re.match(r'---\n(.*?)\n---', text, re.DOTALL)
    assert match and 'description:' in match.group(1), f'{f} missing description'
    print(f'OK: {f}')
"
```

Expected: three `OK:` lines.

- [ ] **Step 5: Commit**

```bash
git add content-creation-harness/skills/creation/
git commit -m "feat: add creation bucket — write and produce skills"
```

---

### Task 6: Polish bucket

**Files:**
- Create: `skills/polish/SKILLS.md`
- Create: `skills/polish/proofread/SKILL.md`
- Create: `skills/polish/publish/SKILL.md`

- [ ] **Step 1: Write skills/polish/SKILLS.md**

```markdown
---
description: Skills for finalizing content before publication. Use when a draft is complete and ready for review or platform-specific preparation.
---

- **proofread/** — Use for spelling, grammar, and readability passes on a finished draft.
- **publish/** — Use to prepare platform-specific assets: Medium formatting and tags, YouTube descriptions and metadata.
```

- [ ] **Step 2: Write skills/polish/proofread/SKILL.md**

```markdown
---
name: proofread
description: Run spelling, grammar, and readability passes on a finished draft without altering the author's voice.
---

## Role

Catch errors and flag readability issues in a finished draft. The goal is correctness, not rewriting.

## What to do

1. Run a spelling and grammar pass — flag errors with line references, do not silently fix
2. Run a readability pass — flag sentences that are hard to parse, overly long, or ambiguous
3. Return a list of suggested changes with locations
4. Do not alter tone, voice, or structure unless explicitly asked
```

- [ ] **Step 3: Write skills/polish/publish/SKILL.md**

```markdown
---
name: publish
description: Prepare platform-specific publication assets for Medium and YouTube.
---

## Role

Format finished content for publication on the target platform. Pulls conventions from references.

## For Medium

1. Read `references/medium-format.md`
2. Apply formatting conventions (headers, code blocks, alt text)
3. Suggest tags
4. Return the formatted article ready for Medium import

## For YouTube

1. Read `references/youtube-format.md`
2. Write the video description in the standard format
3. Generate chapter markers from the script
4. Suggest tags
5. Write a thumbnail brief if needed
```

- [ ] **Step 4: Verify**

```bash
python3 -c "
import re
files = [
    'content-creation-harness/skills/polish/SKILLS.md',
    'content-creation-harness/skills/polish/proofread/SKILL.md',
    'content-creation-harness/skills/polish/publish/SKILL.md',
]
for f in files:
    text = open(f).read()
    match = re.match(r'---\n(.*?)\n---', text, re.DOTALL)
    assert match and 'description:' in match.group(1), f'{f} missing description'
    print(f'OK: {f}')
"
```

Expected: three `OK:` lines.

- [ ] **Step 5: Commit**

```bash
git add content-creation-harness/skills/polish/
git commit -m "feat: add polish bucket — proofread and publish skills"
```

---

### Task 7: Maintenance bucket

**Files:**
- Create: `skills/maintenance/SKILLS.md`
- Create: `skills/maintenance/modify-harness/SKILL.md`
- Create: `skills/maintenance/create-skill/SKILL.md`

- [ ] **Step 1: Write skills/maintenance/SKILLS.md**

```markdown
---
description: Skills for maintaining and extending the harness — updating existing files or adding new skills.
---

- **modify-harness/** — Use when updating HARNESS.md, SKILLS.md indexes, REFERENCES.md, or reference files to keep the harness consistent as it grows.
- **create-skill/** — Use when a new granular skill is needed. Scaffolds the correct directory structure and file format per the agentharnesses.io spec.
```

- [ ] **Step 2: Write skills/maintenance/modify-harness/SKILL.md**

```markdown
---
name: modify-harness
description: Update harness structure files — HARNESS.md, SKILLS.md indexes, REFERENCES.md — to keep routing and descriptions accurate as the harness evolves.
---

## Role

Keep the harness self-consistent when skills or references are added, renamed, or removed.

## What to do

1. Identify which index files need updating (HARNESS.md, a SKILLS.md, REFERENCES.md)
2. Read the current file
3. Apply the change: add, update, or remove the relevant entry
4. Ensure descriptions remain accurate and routing summaries reflect actual contents
5. Commit the change
```

- [ ] **Step 3: Write skills/maintenance/create-skill/SKILL.md**

```markdown
---
name: create-skill
description: Scaffold a new skill directory with correct structure and frontmatter per the agentharnesses.io spec.
---

## Role

Add new skills to the harness following spec conventions. Always update the relevant SKILLS.md after creating a skill.

## What to do

1. Confirm the bucket the skill belongs to and its name
2. Create the directory: `skills/<bucket>/<skill-name>/`
3. Create `SKILL.md` with:
   - Frontmatter: `name` and `description` fields (required)
   - Body: role summary, inputs, and step-by-step instructions
4. Update the parent `SKILLS.md` to include the new skill with a one-line description
5. If this is the first skill in a new bucket, also update the top-level `skills/SKILLS.md` and `HARNESS.md`
6. Commit
```

- [ ] **Step 4: Verify**

```bash
python3 -c "
import re
files = [
    'content-creation-harness/skills/maintenance/SKILLS.md',
    'content-creation-harness/skills/maintenance/modify-harness/SKILL.md',
    'content-creation-harness/skills/maintenance/create-skill/SKILL.md',
]
for f in files:
    text = open(f).read()
    match = re.match(r'---\n(.*?)\n---', text, re.DOTALL)
    assert match and 'description:' in match.group(1), f'{f} missing description'
    print(f'OK: {f}')
"
```

Expected: three `OK:` lines.

- [ ] **Step 5: Commit**

```bash
git add content-creation-harness/skills/maintenance/
git commit -m "feat: add maintenance bucket — modify-harness and create-skill"
```

---

### Task 8: References

**Files:**
- Create: `references/REFERENCES.md`
- Create: `references/brand-voice.md` (user-fill template)
- Create: `references/prior-content.md` (user-fill template)
- Create: `references/medium-format.md` (user-fill template)
- Create: `references/youtube-format.md` (user-fill template)

- [ ] **Step 1: Write references/REFERENCES.md**

```markdown
---
description: Persistent context for the content creation workflow — brand voice, prior content index, and platform-specific formatting conventions.
---

- **brand-voice.md** — Writing tone, style, and intended audience. Read by `creation/write/` and `polish/proofread/`. Fill this in before using the creation or polish skills.
- **prior-content.md** — Index of published articles and videos. Read by `discovery/ideation/` and `discovery/research/introspection/`. Keep this current as new content is published.
- **medium-format.md** — Medium formatting and publishing conventions. Read by `polish/publish/`.
- **youtube-format.md** — YouTube description format, chapters, and tags. Read by `creation/produce/` and `polish/publish/`.
```

- [ ] **Step 2: Write references/brand-voice.md**

```markdown
---
description: Writing tone, style, and intended audience for IAEE technical content.
---

## Audience

[Describe your intended reader — technical level, background, what they're hoping to learn]

## Tone

[Describe your voice — formal/informal, direct/narrative, etc.]

## Style Notes

[Any specific patterns you use — how you open articles, how you handle code examples, how you close]

## What to Avoid

[Writing patterns or approaches you want to steer clear of]
```

- [ ] **Step 3: Write references/prior-content.md**

```markdown
---
description: Index of published articles and videos. Keep current — used by ideation and introspection skills to track coverage and suggest derivatives.
---

## Articles (Medium)

| Title | Topic | Published | URL |
|---|---|---|---|

## Videos (YouTube)

| Title | Topic | Published | URL |
|---|---|---|---|
```

- [ ] **Step 4: Write references/medium-format.md**

```markdown
---
description: Medium-specific formatting conventions for published articles.
---

## Structure

[Describe your standard article structure — intro, sections, conclusion]

## Formatting

- Headers: [which levels you use]
- Code blocks: [language tags, inline vs. block conventions]
- Images: [alt text conventions, caption style]

## Tags

[Your standard tag strategy — how many, how specific]

## Publication Checklist

- [ ] Title and subtitle set
- [ ] Cover image with alt text
- [ ] Tags added (max 5)
- [ ] Canonical URL set if cross-posting
```

- [ ] **Step 5: Write references/youtube-format.md**

```markdown
---
description: YouTube description format, chapter marker conventions, and tag strategy.
---

## Description Format

[Your standard description template — opening hook, body, links, subscribe CTA]

## Chapter Markers

Format: `MM:SS Title`

[Your conventions for when to add chapters, how granular to split]

## Tags

[Your tag strategy — how many, mix of broad and specific]

## Thumbnail Brief Format

[What information you need to brief a thumbnail — title text, visual concept, style notes]
```

- [ ] **Step 6: Verify**

```bash
python3 -c "
import re
files = [
    'content-creation-harness/references/REFERENCES.md',
    'content-creation-harness/references/brand-voice.md',
    'content-creation-harness/references/prior-content.md',
    'content-creation-harness/references/medium-format.md',
    'content-creation-harness/references/youtube-format.md',
]
for f in files:
    text = open(f).read()
    match = re.match(r'---\n(.*?)\n---', text, re.DOTALL)
    assert match and 'description:' in match.group(1), f'{f} missing description'
    print(f'OK: {f}')
"
```

Expected: five `OK:` lines.

- [ ] **Step 7: Commit**

```bash
git add content-creation-harness/references/
git commit -m "feat: add references — brand voice, prior content, and platform format templates"
```
