---
name: job-description
description: "Use this skill when the user wants to load a job description before tailoring materials or assessing fit. Triggers include: 'load the job description', 'scrape this posting', 'save this job description', 'pull the JD for X', or any request to bring a job posting into the harness."
---

# Job Description Management

Fetch or accept a job description and store it in `references/job-descriptions/` so it is available to other skills (tailor, materials, lead-management).

## Step 1: Obtain the Job Description

Try fetching first. If the URL is known, use WebFetch:

```
url: <posting URL>
prompt: Extract the complete job description — title, company, location, compensation, responsibilities, qualifications, and any other details present.
```

**Known-broken board types** (JavaScript-rendered; WebFetch returns near-empty content):
- Ashby (`jobs.ashbyhq.com`)
- Lever (`jobs.lever.co`)
- Greenhouse (`boards.greenhouse.io`) — sometimes works, often doesn't
- Workday, iCIMS, Taleo

If the fetch returns only the job title or clearly incomplete content, stop and ask the user to paste the job description directly. Don't try to work from partial content.

## Step 2: Store the Job Description

Save the description as a markdown file in `references/job-descriptions/`.

**Filename convention:** `<Company>_<RoleSlug>_<YYYY-MM-DD>.md`
- Company: CamelCase, no spaces (e.g., `Writer`, `Databricks`, `AppliedIntuition`)
- RoleSlug: kebab-case abbreviation of the title (e.g., `product-analyst`, `sr-solutions-architect`)
- Date: today's date

**File format:**

```markdown
---
company: <Company>
role: <Full Job Title>
url: <posting URL or "pasted">
fetched: <YYYY-MM-DD>
---

<full job description text, cleaned of nav/footer boilerplate>
```

## Step 3: Confirm and Link

After saving, report:
- The file path where the description was saved
- A 2-3 sentence summary of the role (what the company wants, key qualifications)

If the role is already in `references/leads.csv`, update the `job_description_file` column with the relative path to the saved file (e.g., `job-descriptions/Writer_product-analyst_2026-06-19.md`). Ask the user before making any other changes to the lead entry.
