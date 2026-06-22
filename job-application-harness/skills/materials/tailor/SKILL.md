---
name: tailor
description: "Use this skill when the user wants to create a tailored resume and cover letter for a specific job listing by deriving new materials from existing resumes. Triggers include: 'tailor my resume', 'create materials for this role', 'make a resume for this job', 'derivative resume', or any request to adapt existing resumes to a new job posting."
---

# Derivative Resume and Cover Letter

Generate a tailored cover letter and resume by combining content from existing resumes with a job listing. The goal is minimal modification — sample and recombine existing language rather than inventing new content.

## Inputs Required

Before starting, confirm you have:
- The job listing (pasted text or URL)
- Access to existing resumes in `references/resumes/`

If the job listing needs to be fetched and the page is JavaScript-rendered (WebFetch returns only the title), do not ask the user to paste it. Instead, provide the posting URL from `leads.csv` so the user can open it themselves and paste the text.

Read all available resumes with `pandoc`:
```bash
pandoc --track-changes=all references/resumes/<filename>.docx -o /tmp/<filename>.md
```

When producing a new docx, always use `references/resumes/TEMPLATE_DanielWarfield_Resume_cover.docx` as the base. It has the correct formatting, page break, and structure. Replace only the `<w:t>` text nodes — do not rebuild runs or paragraphs. The paraIds for variable sections are:

| Section | ParaIds |
|---|---|
| Cover letter opening | `00000004` |
| JD quote 1–3 | `00000005`, `00000007`, `00000009` |
| Response 1–3 | `00000006`, `00000008`, `0000000A` |
| Closing line | `0000000B` |
| Sign-off + page break | `0000000C` (do not modify) |
| Competencies 1–9 | `00000016`–`0000001E` |
| Skills lines 1–4 | `00000022`–`00000025` |

## Step 1: Analyze the Job Listing

Before writing anything, answer these two questions internally:

1. **What three high-level things is this job asking for?** Identify the core pillars of the role — the big-picture themes that recur across the listing.
2. **What specific qualifications do I have that the listing wants?** Pull concrete items to weave into the cover letter — tools, domains, outcomes.

## Step 2: Write the Cover Letter

**Structure:**
- Open with a brief statement of genuine enthusiasm and alignment with the core problem the company is solving. Keep it short — one or two sentences.
- Body: Address the three high-level themes identified in Step 1, grounding each with specific qualifications from the existing resumes. Pull direct quotes or near-quotes from existing materials where possible.
- Close naturally; no need for elaborate sign-off.

**Drafting approach:**
- Define several exact quotes from the job listing that capture what the role values.
- Find matching language in existing resumes that addresses those points.
- Construct paragraphs by stitching those existing quotes together, modifying as little as possible to make them flow.

**Style constraints:**
- No em dashes. Use commas, periods, or rewrite the sentence.
- Follow the writing style and register of the existing resumes closely — do not introduce new voice.
- Do not use constructions like "These are not X; they are Y." State what was done and how it connects, directly.
- Sprinkle in the specific qualifications from Step 1 naturally throughout.

## Step 3: Build the Resume

**Core content:** Keep the work history, project descriptions, and accomplishments the same. Do not invent new bullets.

**What to vary across versions:**
- **Core competencies** — select and reorder from across all existing resumes to match what the listing emphasizes. Keep each competency string to **30 characters or fewer** — the resume renders them in a 3-column layout and longer strings wrap, adding height that pushes content to a third page.
- **Skills / Tools** — pull from whichever existing resume frames the most relevant tools. Update the list to reflect both real experience and what the listing calls out.
- **Framing** — where multiple resumes describe the same role differently, choose the framing that best aligns with the listing's language.

## Output Format

Respond in plain text. Produce:

1. **Cover letter** — completely written out, ready to copy
2. **Core competencies** — bulleted list
3. **Skills** — bulleted list

Do not produce a full resume document in this step. The competencies and skills lists feed into the docx skill if a formatted document is needed afterward (see `../docx/SKILL.md`).

## Step 4: Verify Page Count (after docx is produced)

After the docx is created, confirm it is exactly 2 pages — cover letter on page 1, resume on page 2. Convert to PDF with LibreOffice, then count pages:

```bash
python3 <harness_root>/skills/materials/docx/scripts/office/soffice.py --headless --convert-to pdf <output.docx>
pdfinfo <output.pdf> | grep Pages
```

If `pdfinfo` is unavailable, render to images and count the output files:
```bash
pdftoppm -jpeg -r 72 <output.pdf> /tmp/pages
ls /tmp/pages*.jpg | wc -l
```

If the document is not exactly 2 pages, investigate: a 3rd page usually means the resume content overflows, which requires tightening bullets or reducing spacing. A 1-page result means the page break is missing or malformed.
