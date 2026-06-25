---
description: Skills for researching target companies and roles, and tracking application status across the pipeline.
---

- **recommended-apply/** — When the user wants to apply but hasn't named a specific role. Ranks pending leads by fit, confirms the choice, then hands off to the tailor skill.
- **apply/** — When the user is ready to submit an application. Opens the job listing in the browser and reveals the tailored resume in Finder, then stays observing the browser to answer questions about the form.

## Notes

**Linking job descriptions:** When a job description is loaded into `references/job-descriptions/`, update the matching row in `references/leads.csv` to populate the `job_description_file` column with the relative path (e.g., `job-descriptions/Writer_product-analyst_2026-06-19.md`). Do not update leads.csv automatically without user confirmation.
