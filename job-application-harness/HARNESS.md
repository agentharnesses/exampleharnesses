---
name: job-application
description: Assists a job seeker through the full application workflow — from researching roles and companies through tailoring materials, tracking applications, and maintaining the harness.
---

This harness supports a job seeker managing an active job search. It covers researching target companies and roles, crafting and tailoring application materials, tracking the application pipeline, and maintaining the harness itself as the search evolves.

## Upon loading the Harness

No immediate action is required upon loading the harness. This document is a reference and entry point for future queries.

# How to Find Information for Claude.

Use the `agent-harnesses` skill to explore the harness, just in time, based on prompts from the user. Run `disclose.py` with `python3` against this harness directory to progressively explore its contents — select only what is relevant and repeat until the session is complete, then read the returned resources.

When **maintaining the harness** (adding, moving, or renaming files), consult the maintenance information in the agent-harnesses skill.

## Skills

- **explore/** — Fetch or accept job descriptions and other external information before working on an application
- **lead-management/** — Research target companies and roles, log applications, and track status across the pipeline
- **materials/** — Draft and tailor resumes, cover letters, open-ended question responses, and other application documents
- **maintenance/** — Update harness structure, references, and skills as the search evolves
## References

- **leads.csv** — Application pipeline tracker (company, role, posting, status, applied date, resume, compensation, location). **When an application is submitted, the `status` and `applied_date` columns must be filled in immediately** — blank status means pending, so an un-updated row will be re-recommended as a lead.
- **job-descriptions/** — Saved job postings in markdown, used as input for tailoring materials and fit assessment
- **resumes/** — Tailored resumes, one per target role or application
- **answers/** — Saved responses to application questions, including standard fields (name, email, phone, location, LinkedIn) and open-ended responses. Used as source material for future applications.
- **target-roles.md** — Profile of target roles, industries, and criteria for a good fit
