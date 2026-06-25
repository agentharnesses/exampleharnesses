---
description: Setup instructions for a freshly cloned repo — what to create before the harness is usable.
---

# Setup After Cloning

The following files and directories are gitignored and must be created manually after cloning.

## Directories

The three reference directories (`resumes/`, `job-descriptions/`, `answers/`) are preserved in git via `.gitkeep` files and will exist immediately after cloning. No action needed.

## Files to Create

### `references/leads.csv`

The application pipeline tracker. Create it with this header row:

```
company,job_title,posting_url,status,applied_date,resume_file,compensation,location,job_description_file
```

Add one row per lead as you source them. Leave fields blank when unknown.

### `references/target-roles.md`

Your personal role profile — what you're targeting and what makes a good fit. This is used by the `lead-management/recommended-apply` skill to rank and recommend leads.

Suggested sections:
- **What I'm Looking For** — the common thread across target roles
- **Role Types** — primary targets and acceptable alternatives, with priority ordering
- **Core Differentiators to Emphasize** — your strongest, most differentiated accomplishments
- **Industries / Companies** — preferred company types and names
- **What Makes a Strong Fit** — specific signals to look for
- **What to Avoid** — hard or soft exclusions

### `references/resumes/TEMPLATE_*.docx`

The tailor skill uses a template `.docx` file as the base for all new resumes. Copy your base resume template into `references/resumes/` before tailoring any materials. The template must match the paraId structure expected by the tailor skill — see `skills/materials/tailor/SKILL.md` for the required section IDs.
