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
