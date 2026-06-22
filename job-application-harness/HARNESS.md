---
name: job-application
description: Assists a job seeker through the full application workflow — from researching roles and companies through tailoring materials, tracking applications, and maintaining the harness.
---

This harness supports a job seeker managing an active job search. It covers researching target companies and roles, crafting and tailoring application materials, tracking the application pipeline, and maintaining the harness itself as the search evolves.

## Upon loading the Harness

No immediate action is required upon loading the harness. This document is a reference and entry point for future queries.

# How to Find Information for Claude.

Use the `agent-harnesses` skill to explore the harness, just in time, based on prompts from the user. Run `disclose.py` with `python3` against this harness directory to progressively explore its contents — select only what is relevant and repeat until the session is complete, then read the returned resources.

When **maintaining the harness** (adding, moving, or renaming files), use `reverse_disclose.py` to find every `.md` file above the target that links to it — so you can update all references that would break:

```
python3 .claude/skills/agent-harnesses/scripts/reverse_disclose.py <target_path>
```

Run this before and after any structural change. The output lists each ancestor `.md` file that references the target, with line numbers and link text, so nothing is left pointing to a stale path.

## Skills

- **explore/** — Fetch or accept job descriptions and other external information before working on an application
- **lead-management/** — Research target companies and roles, log applications, and track status across the pipeline
- **materials/** — Draft and tailor resumes, cover letters, and other application documents
- **maintenance/** — Update harness structure, references, and skills as the search evolves

## References

- **leads.csv** — Application pipeline tracker (company, role, posting, status, applied date, resume, compensation, location)
- **job-descriptions/** — Saved job postings in markdown, used as input for tailoring materials and fit assessment
- **resumes/** — Tailored resumes, one per target role or application
- **target-roles.md** — Profile of target roles, industries, and criteria for a good fit
