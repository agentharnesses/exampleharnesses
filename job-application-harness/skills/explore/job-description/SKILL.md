---
name: job-description
description: "Use this skill when the user wants to load a job description before tailoring materials or assessing fit. Triggers include: 'load the job description', 'scrape this posting', 'save this job description', 'pull the JD for X', or any request to bring a job posting into the harness."
---

# Job Description Management

Fetch or accept a job description and store it in `references/job-descriptions/` so it is available to other skills (tailor, materials, lead-management).

## Step 1: Fetch the Posting with Playwright

Use Playwright (not WebFetch) as the primary fetch method — it renders JavaScript and works on ATS boards that WebFetch cannot reach.

```
browser_navigate <url>
browser_snapshot
```

Read the snapshot and determine which of these cases applies:

**A — Full content rendered:** The job title, responsibilities, and qualifications are visible in the snapshot. Proceed to Step 2.

**B — Thin or empty content (page loaded but no JD text):** The ATS shell rendered but the content pane is empty or shows a spinner. Try waiting and re-snapshotting once:
```
browser_wait_for selector="[class*='job'], [class*='description'], main" timeout=5000
browser_snapshot
```
If content appears, proceed to Step 2. If still empty, treat as Case C.

**C — Login wall or hard block:** The page shows a sign-in prompt, CAPTCHA, or "apply to see details" gate (common on LinkedIn, Glassdoor). Playwright cannot bypass these. Proceed to Step 1b.

**D — 404 / posting expired:** The page explicitly shows "job not found", "this position has been filled", or equivalent. Stop. Update the lead status to `Deprioritized - posting expired` and report to the user. Do not ask them to paste a JD for an expired role.

## Step 1b: Find an Accessible Link (login-wall case only)

When Playwright hits a login wall, search for a mirror or the company's own careers page.

1. **WebSearch** for the role by company + title + job ID (if visible in the URL):
   - `remoterocketship.com` — reliable mirror for many remote/hybrid roles
   - `indeed.com`, `jobleads.com`, `diversityjobs.com` — useful fallbacks
   - The company's own careers domain (e.g., `careers.acme.com`) — sometimes a separate URL from the ATS
   - `linkedin.com/jobs` search snippets sometimes contain full text without requiring login

2. For each promising result, **validate with Playwright before using it:**
   ```
   browser_navigate <candidate_url>
   browser_snapshot
   ```
   Confirm the snapshot matches the expected company, role title, and job ID. A similar-looking posting with a different title or ID is a different role — discard it.

3. Check for expiry signals in the rendered page: "no longer accepting applications", a closed application deadline, or a posting date many months old.

4. If no accessible link yields the full JD text → tell the user the listing could not be verified, provide the original URL for manual review, and ask them to confirm it's still open or paste the JD. Update the lead to `Deprioritized - posting expired` if the user confirms it's gone.

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

<full job description text, cleaned of nav/footer/cookie-banner boilerplate>
```

Extract text from the Playwright snapshot rather than the raw HTML — the accessibility tree gives clean, readable content without the surrounding chrome.

## Step 3: Confirm and Link

After saving, report:
- The file path where the description was saved
- A 2-3 sentence summary of the role (what the company wants, key qualifications)

If the role is already in `references/leads.csv`, update the `job_description_file` column with the relative path to the saved file (e.g., `job-descriptions/Writer_product-analyst_2026-06-19.md`). Ask the user before making any other changes to the lead entry.
