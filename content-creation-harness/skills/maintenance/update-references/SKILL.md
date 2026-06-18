---
name: update-references
description: Fetch the latest IAEE articles and YouTube videos, compare to the existing prior-content.md index, and add any new entries. Run automatically the first time prior-content.md is referenced in a session.
---

## Role

Keep `references/prior-content.md` current by checking both the live Substack archive and the YouTube channel RSS feed against the existing index. This runs once per session, the first time any skill reads prior-content.md.

## When to run

Run this skill before loading prior-content.md for the first time in a session. Do not run it again in the same session.

## What to do

### Articles (Substack)

1. Fetch the sitemap at `https://iaee.substack.com/sitemap.xml`
2. Extract all URLs containing `/p/` — these are article pages
3. Read `references/prior-content.md`
4. Compare the live article list to existing entries in the Articles section
5. For each article URL not yet in the index:
   a. Fetch the article page
   b. Write a 2-3 sentence plain-text description covering the core topic and key concepts
   c. Add a new entry at the top of the Articles section (most recent first) in the format:

```
**[Title]**
[URL]
[2-3 sentence plain-text description]
```

### Videos (YouTube)

6. Fetch the YouTube RSS feed at `https://www.youtube.com/feeds/videos.xml?channel_id=UCdR2zVrR0BdOx8xdNkA-WJA`
7. Extract all video titles and URLs (`https://www.youtube.com/watch?v=[videoId]`)
8. Compare to existing entries in the Videos section of prior-content.md
9. For each video not yet in the index:
   a. Fetch the video page
   b. Write a 2-3 sentence plain-text description covering the core topic and key concepts
   c. Add a new entry at the top of the Videos section (most recent first) using the same format

### Commit

10. If no new content was found in either source, make no changes
11. If changes were made, commit prior-content.md with the message: `chore: update prior-content index with new IAEE content`

## Format rules

- Entries are plain text — no tables, no bullet points within the entry
- Description is 2-3 sentences: what the article or video covers, core concepts explained, any notable depth or angle
- Preserve existing entries exactly as written — only append new ones
