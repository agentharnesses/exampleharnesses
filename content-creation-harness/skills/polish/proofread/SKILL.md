---
name: proofread
description: Run spelling, grammar, and readability passes on a finished draft without altering the author's voice.
---

## Role

Catch errors and flag readability issues in a finished draft. The goal is correctness, not rewriting.

## Inputs

- `references/brand-voice.md` — tone and style reference, to preserve the author's voice while flagging errors

## What to do

1. Run a spelling and grammar pass — flag errors with line references, do not silently fix
2. Run a readability pass — flag sentences that are hard to parse, overly long, or ambiguous
3. Return a list of suggested changes with locations
4. Do not alter tone, voice, or structure unless explicitly asked
