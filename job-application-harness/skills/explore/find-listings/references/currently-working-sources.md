# Currently Working Sources

Observations drawn from 68 leads collected as of 2026-06-24. Update this file after any find-listings session that produces notably better or worse signal from a source.

## High Signal

**builtinaustin.com**
- Best discovery surface for Austin-specific and Austin-remote roles
- Reliable location filtering — rarely surfaces SF-only or NYC-only postings labeled as Austin
- Two search waves (16 candidates total) had ~87% signal rate (14/16 active, 2 expired)
- Use queries like: `site:builtinaustin.com "AI engineer" OR "ML engineer"`, `site:builtinaustin.com "solutions architect" AI`
- Compensations are usually present and accurate

**Direct company career pages**
- Highest quality per lead when the company is already known
- No noise, no expired-mirror risk, full JD, direct ATS URL
- Best for: Databricks, AMD, Apple, Google, NVIDIA, Salesforce, CrowdStrike, Microsoft, Meta, Amazon/AWS
- Approach: check career pages of companies on the target list that haven't been sourced yet

## Medium Signal

**Greenhouse (greenhouse.io / job-boards.greenhouse.io)**
- Reliable for mid-size and larger startups (Anthropic, Hightouch, LaunchDarkly, Avride, Apptronik)
- Direct ATS URLs don't expire as fast as aggregator mirrors
- Use: `site:job-boards.greenhouse.io "machine learning" OR "AI engineer" Austin OR remote`

**Ashby (ashbyhq.com / jobs.ashbyhq.com)**
- Strong coverage of frontier AI and well-funded startups (Baseten, Cognition, H Company, webAI, Writer, Cohere, Eigen Labs)
- Use: `site:ashbyhq.com "forward deployed" OR "AI engineer"` 

**Workday (myworkdayjobs.com)**
- Covers larger enterprises (NVIDIA, Guidewire, CrowdStrike, Zoom)
- Postings tend to stay live longer than aggregators
- Hard to search directly; best reached via Google: `site:myworkdayjobs.com "AI" Austin OR remote`

## Low Signal — Use Sparingly

**Indeed**
- Only 2 leads collected; both low quality (MeritFirst below-target comp, Dell not qualified)
- Aggregates heavily from other sources with added staleness
- Avoid unless testing a very specific query

**Lever (lever.co / jobs.lever.co)**
- 4 leads collected; 2 expired before application, 1 non-Austin, 1 applied (Palantir)
- Higher expiration rate than Greenhouse or Ashby
- Still worth including in parallel searches but don't over-index

## Untapped — Try Next

**LinkedIn Jobs**
- Not yet used; likely largest volume for established companies
- Austin + Remote filter is reliable
- Best for: Microsoft, Meta, Snowflake, Confluent, Anyscale, and other large-company ML/AI roles
- Query shape: search LinkedIn Jobs for "machine learning engineer" or "solutions architect AI" in Austin TX or Remote

**Wellfound (wellfound.com, formerly AngelList)**
- Not yet used; strong coverage of funded AI startups
- Many frontier AI companies appear here before BuiltIn or Greenhouse
- Good complement to BuiltIn Austin for startup-tier leads

**Direct pages not yet checked**
Companies in the target profile tier that haven't been sourced yet:
- Microsoft (Azure AI, Copilot engineering, AI platform teams)
- Meta (FAIR, applied ML, Llama team)
- Amazon / AWS (Bedrock, SageMaker, Nova)
- Snowflake (ML/AI engineering)
- Confluent, Anyscale, Modal, Hugging Face

## Operational Notes

- **~30% expiration rate** across all leads encountered. Apply within 1–2 days of adding a lead; don't let them age.
- Expiration signals: greenhouse.io `?error=true` redirect, lever.co 404, Workday "no longer accepting", posting date > 3 months.
- When a BuiltIn page is thin (collapsed content), use `browser_snapshot` with `target=main` to focus rendering on the job content area.
- Direct ATS URLs (Greenhouse, Ashby, Workday) found embedded in BuiltIn pages are preferable for application — they skip the aggregator and go straight to the employer.
