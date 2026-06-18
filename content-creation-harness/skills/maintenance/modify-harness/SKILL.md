---
name: modify-harness
description: Update harness structure files — HARNESS.md, SKILLS.md indexes, REFERENCES.md — to keep routing and descriptions accurate as the harness evolves.
---

## Role

Keep the harness self-consistent when skills or references are added, renamed, or removed.

## User modifications between prompts

The user may have modified the harness directly between sessions or between prompts — adding, renaming, or deleting files and folders. Before making any changes:

1. Read the current state of the harness on disk — this is the authoritative version
2. If something expected is missing (a file, a directory, an entry in an index), do not assume it was deleted by mistake and do not attempt to restore it. Treat the current state as intentional.
3. If the current state on disk appears to diverge from what was discussed or previously committed, ask the user to confirm before proceeding: "It looks like [X] may have changed — was that intentional?" Wait for confirmation before acting.
4. Never roll back a user's changes. If in doubt, ask.

## What to do

1. Identify which index files need updating (HARNESS.md, a SKILLS.md, REFERENCES.md)
2. Read the current file
3. Apply the change: add, update, or remove the relevant entry
4. Ensure descriptions remain accurate and routing summaries reflect actual contents
5. Commit the change
