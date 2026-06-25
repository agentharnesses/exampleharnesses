---
name: recommended-apply
description: "Use this skill when the user wants to apply to a job but hasn't specified which one. Triggers include: 'apply to a job', 'what should I apply to next', 'let's apply somewhere', or any apply request without a named target. Ranks pending leads by fit and confirms the choice with the user before handing off to tailor."
---

# Recommended Apply

When the user wants to apply but hasn't named a specific role, recommend the best pending lead based on the current target profile, confirm the choice, and hand off to the tailor skill.

## Step 1: Load Context

Read both files in parallel:
- `references/leads.csv` — the full pipeline
- `references/target-roles.md` — fit criteria and priorities

## Step 2: Filter to Pending Leads

A lead is pending if its `status` field is blank, or contains a soft note like "Verify Austin availability" or "Verify remote availability". Exclude any lead where status is one of:

- `Applied` (any variant, including "Applied - ...")
- `No Interview`
- `Not Qualified`
- `Not Interested`
- `Deprioritized` (any variant)

## Step 3: Rank by Fit

Score each pending lead against the criteria in `target-roles.md`. In priority order:

1. **Role type** — ML/AI Engineer scores highest; FDE/Solutions Architect is acceptable; SA/PM are lower
2. **Location** — Austin TX (on-site or hybrid) > Fully Remote > Out-of-state on-site
3. **Company quality** — Large established company or well-known funded startup > smaller/earlier stage
4. **Technical fit** — Agentic AI, production ML, LLMs, end-to-end ownership match the background best
5. **Interest signal** — Robotics, frontier AI labs, and novel problem spaces rank up

## Step 4: Present Recommendation

Present the **top 3 leads** in ranked order. For each, include:
- Company, role, location, compensation (if known)
- One sentence on why it ranks where it does

Then ask the user to confirm which one to proceed with, or whether to skip all three and name a different lead.

Example format:

```
My recommendation:

1. **Cognite — ML Engineer, Atlas AI** (Austin TX)
   Best available Austin ML engineer role — LLM agents + RAG, strong company fit.

2. **Avride — Machine Learning Engineer** (Austin TX)
   Autonomous driving perception + LLMs, well-funded, Austin.

3. **Cohere — Applied AI Engineer, Agentic Workflows** (Remote)
   Top-tier AI lab, pure ML engineering, agentic pipelines — best remote option.

Which would you like to apply to? Or name a different one.
```

## Step 5: After Confirmation

Once the user confirms a lead:

1. **Check if a job description is already loaded** — look at the `job_description_file` column for that row in `leads.csv`. If it's populated, skip to step 2. If not, load it now using the `explore/job-description` skill before proceeding.

2. **Hand off to the tailor skill** (`skills/materials/tailor/SKILL.md`) — pass the confirmed company and role as context so tailoring can begin immediately without re-asking.
