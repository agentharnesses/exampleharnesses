---
name: find-listings
description: "Use this skill when the user wants to find new job listings to add to the pipeline. Triggers include: 'find new jobs', 'search for listings', 'what's out there', 'look for roles', 'explore', or any request to discover and source new leads rather than work on an existing one."
---

# Find New Listings

Search the web for new job postings that match the target profile and surface them as candidate leads for review.

## Step 1: Load Context

Read all three in parallel:
- `references/target-roles.md` — fit criteria, role types, location preferences; use this as the source of truth for all filtering and ranking
- `references/leads.csv` — existing pipeline; used only for deduplication
- `skills/explore/find-listings/references/currently-working-sources.md` — observed signal quality per source; use this to prioritize queries and surfaces

## Step 2: Search for Listings

Run 4–6 WebSearch queries in parallel, derived from the role types and location preferences in `target-roles.md`. Prioritize sources in the order described in `currently-working-sources.md`. Default query shapes:

```
<primary role type> <target location> AI 2025
"<role type>" <location> site:greenhouse.io OR site:lever.co OR site:ashbyhq.com
site:builtinaustin.com "<role keyword>" OR "<role keyword>"
"<role type>" remote AI site:linkedin.com/jobs
```

Don't paginate — varied queries yield more diversity than deeper pages of one query.

## Step 3: Filter Results

**Hard excludes:**
- Already in `leads.csv` (match on company + role title, fuzzy)
- `leads.csv` status for that entry is `Deprioritized`, `Not Interested`, or `Not Qualified`
- Fails location criteria from `target-roles.md`
- Fails role-type criteria from `target-roles.md`
- Clear expiry signals ("no longer accepting", posting date > 3 months old)

**Everything else** passes to Step 4. Flag soft concerns (early-stage, below-market comp, lower-priority role type) inline rather than excluding.

## Step 4: Present Candidates

Present up to **8 candidates**, ranked by fit against `target-roles.md` criteria. Group by role type. For each:

```
1. Company — Role Title (Location) [$comp if known]
   One sentence: fit rationale or flag.
   URL
```

Ask: "Which of these would you like to add to the pipeline?" Accept a list of numbers or names.

## Step 5: Add Confirmed Leads

For each confirmed listing:

1. Add a row to `references/leads.csv`: company, job title, URL, location, compensation if found. Leave `status`, `applied_date`, `resume_file`, and `job_description_file` blank.
2. Hand off to `explore/job-description` to fetch and save the full posting for each new lead.

## Step 6: Update Source Intelligence

After the session, review what you observed and propose any updates to `skills/explore/find-listings/references/currently-working-sources.md`. Specifically:

- If a source produced notably better or worse results than documented, update its rating or notes
- If a new source or query pattern worked well, add it
- If a previously untapped source was tried for the first time, move it from "Untapped" to the appropriate tier
- If the expiration rate for a source has changed meaningfully, note it

Present the proposed changes to the user and ask for confirmation before writing them.
