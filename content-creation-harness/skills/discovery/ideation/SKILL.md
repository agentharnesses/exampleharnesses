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

1. If this is the first time prior-content.md is being read this session, run `maintenance/update-references/` first
2. Read `references/prior-content.md` to check for prior coverage
2. Assess novelty: has this been covered? Is there a fresh angle?
3. Assess substance: is there enough depth for a full article or video?
4. Return a recommendation: pursue, refine, or pass — with reasoning

## Generating derivative ideas

1. If this is the first time prior-content.md is being read this session, run `maintenance/update-references/` first
2. Read `references/prior-content.md`
2. Identify natural extensions, follow-up topics, or applications of prior work
3. Return a prioritized list of 3-5 ideas with brief rationale for each
