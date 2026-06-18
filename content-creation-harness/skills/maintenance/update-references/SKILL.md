---
name: update-references
description: Fetch the latest IAEE articles from iaee.substack.com, compare to the existing prior-content.md index, and add any new entries. Run automatically the first time prior-content.md is referenced in a session.
---

## Role

Keep `references/prior-content.md` current by checking the live IAEE archive against the existing index and adding any articles that aren't yet listed. This runs once per session, the first time any skill reads prior-content.md.

## When to run

Run this skill before loading prior-content.md for the first time in a session. Do not run it again in the same session.

## What to do

1. Fetch the archive page at `https://iaee.substack.com/archive`
2. Extract all article titles and URLs from the page
3. Read `references/prior-content.md`
4. Compare the live article list to the entries already in the index
5. For each article not yet in the index:
   a. Fetch the article page
   b. Write a 2-3 sentence plain-text description covering the core topic and key concepts
   c. Add a new entry to the Articles section of prior-content.md in the format:

```
**[Title]**
[URL]
[2-3 sentence plain-text description]
```

6. If no new articles are found, make no changes
7. If changes were made, commit prior-content.md with the message: `chore: update prior-content index with new IAEE articles`

## Format rules

- Entries are plain text — no tables, no bullet points within the entry
- Description is 2-3 sentences: what the article covers, core concepts explained, any notable depth or angle
- Preserve existing entries exactly as written — only append new ones
- New entries go at the top of the Articles section (most recent first)
