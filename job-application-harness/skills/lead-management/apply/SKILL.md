---
name: apply
description: "Use this skill when the user is ready to submit a job application. Opens the job listing in the browser and reveals the tailored resume in Finder, then stays observing the browser so the user can ask questions about the application form. Triggers include: 'apply', 'open the listing', 'let's submit this', 'open the application', or any indication the user is ready to fill out and submit a form."
---

# Apply

Open the job listing in a browser and reveal the tailored resume in Finder so the user can submit the application. Stay observing the browser to answer questions about the form.

## Step 1: Identify the Lead

If the current conversation already has a confirmed company and role (e.g., handed off from `recommended-apply` or `tailor`), use that. Otherwise, ask the user which role they are applying to.

## Step 2: Look Up the Lead in leads.csv

Read `references/leads.csv` and find the matching row. Extract:
- `posting_url` — the job listing URL to open
- `resume_file` — relative path to the tailored resume (e.g., `resumes/19_webAI_FDE_DanielWarfield_Resume_cover.docx`)

If `resume_file` is blank, warn the user that no resume is on file for this role and ask whether to proceed without one or run the tailor skill first.

## Step 3: Open the Listing in a Browser

Navigate to the posting URL using Playwright:

```
mcp__playwright__browser_navigate(url=<posting_url>)
```

Then take a screenshot to confirm the page loaded and report what you see.

## Step 4: Reveal the Resume in Finder

Reveal the tailored resume in Finder so the user can locate and upload it:

```bash
open -R "/Users/danielwarfield/Documents/GitHub/exampleharnesses/job-application-harness/references/<resume_file>"
```

## Step 5: Confirm and Stay Observing

Tell the user:
- What page opened (company, role, any notable state — logged in, form visible, paywall, etc.)
- Which resume was revealed in Finder

Then stay in observation mode. As the user works through the form, take screenshots or snapshots on request to answer questions about field requirements, instructions, or specific questions on the application form.
