# Job Application Harness

An example agent harness for managing a job search — researching roles, tailoring application materials, and tracking the pipeline from first lead to submitted application.

## Structure

```
job-application-harness/
├── HARNESS.md        # Agent role definition and context
├── skills/           # Atomic capabilities (sourcing, tailoring, applying)
└── references/       # Job descriptions, resumes, saved answers, pipeline tracker
```

## Usage

Point your agent at this harness to give it a job search assistant role. The agent loads `HARNESS.md` on startup and pulls in individual skills and references progressively as tasks require them.

### Workflow

1. **Source** — Find job listings and save postings as references
2. **Prepare** — Tailor a resume and cover letter; draft open-ended question responses
3. **Apply** — Open the listing in a browser with the tailored resume ready; track submission in `leads.csv`

### Setup

The following files are gitignored and must be created before first use:

- `references/leads.csv` — pipeline tracker (see `references/setup.md` for the header row)
- `references/target-roles.md` — your role profile, used to rank and recommend leads
- `references/resumes/TEMPLATE_*.docx` — your base resume template

See `references/setup.md` for full setup instructions.

## Privacy

Personal materials (resumes, answers, job descriptions, leads) are gitignored by default. Only harness structure and skills are tracked.

See the [repo README](../README.md) for more examples and the [agentharnesses.io](https://agentharnesses.io) spec for full documentation.
