---
name: answer
description: "Use this skill when the user has an open-ended application question to answer. Triggers include: 'answer this question', 'give me a response to this', 'write a response for this application question', or any time a user pastes a free-text question from a job application form. Builds answers by adapting existing answers from references/answers/ rather than inventing new content — same minimal-modification principle as the tailor skill."
---

# Application Question Answering

Generate a response to an open-ended application question by adapting existing answers. The goal is minimal modification — find the closest existing answer(s), pull language from them directly, and adapt only what's necessary to fit the new question.

## Step 1: Load Existing Answers

Read all files in `references/answers/`. Each file has:
- Frontmatter with `question`, `themes`, `company`, `role`, and `date`
- Body containing the answer text

Scan the themes and question text to identify the most relevant existing answers for the new question.

## Step 2: Identify Fit

Select the 1–3 most relevant existing answers based on:
- **Theme overlap** — does the existing answer address the same underlying capability (e.g., data pipelines, safety-critical deployment, evaluation systems, stakeholder communication)?
- **Language reuse potential** — are there sentences or phrases that can be carried over with minimal change?

If no existing answers are relevant, fall back to the resume content in `references/resumes/` using the same approach as the tailor skill.

## Step 3: Draft the Answer

Construct the answer by:
1. Pulling the most relevant sentences or paragraphs from existing answers verbatim or near-verbatim
2. Modifying only what is needed to fit the specific framing of the new question
3. Keeping the same voice, register, and style as existing answers — do not introduce new prose

**Style constraints** (same as tailor):
- No em dashes. Use commas, periods, or rewrite.
- Do not invent new framings, metaphors, or aphorisms not present in existing answers or resumes.
- State what was done and how it connects, directly.
- Keep answers concise — 2–4 short paragraphs unless the question clearly calls for more.

## Step 4: Present and Save

Present the answer to the user as plain text, ready to copy.

After presenting, save the answer to `references/answers/` regardless of whether the user requests changes — save the version that was presented, as it represents the current best answer for this question type.

**Filename convention:** `<YYYY-MM-DD>_<CompanySlug>_<theme-slug>.md`

**File format:**
```markdown
---
question: "<exact question text>"
themes: [theme1, theme2, theme3]
company: <Company>
role: <Job Title>
date: <YYYY-MM-DD>
---

<answer text>
```

**Choosing themes** — use short, reusable slugs that describe the underlying capability being demonstrated, not the specific company or role. Examples:
- `data-pipelines`, `auto-labeling`, `active-learning`
- `safety-critical-deployment`, `real-world-robustness`
- `llm-evaluation`, `observability`
- `agentic-systems`, `production-ml`
- `stakeholder-communication`, `technical-writing`
- `startup-execution`, `end-to-end-ownership`
