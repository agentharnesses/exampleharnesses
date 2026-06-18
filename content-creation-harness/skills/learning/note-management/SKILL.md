---
name: note-management
description: Create, organize, and search working note files — text documents with annotations and screenshot references.
---

## Role

Keep the working notes system organized and searchable. Notes are text files with annotations and screenshot references, created during research and learning. Distinct from `discovery/introspection/`, which scans published content — this skill scans and manages working notes.

## Creating a new note file

1. Scaffold with the template below
2. Pre-populate topic, date, and source being annotated

## Organizing existing notes

1. Review note files for the current topic or session
2. Identify redundancy, missing sections, or unresolved open questions
3. Suggest consolidation or restructuring as needed

## Surfacing prior notes

1. Given a new topic, scan existing note files for relevant prior content
2. Return a summary of what's already been noted and any open questions

## Launching the notes browser

When the user asks to view or edit notes in the browser:

1. Run `npm run dev` from `content-creation-harness/applications/notes-app/`
2. The app opens at `http://localhost:5173`
3. Confirm the server is running by checking for the Vite startup message before reporting back to the user
4. To stop the server: `pkill -f "vite"` or Ctrl+C in the terminal where it was started

## Note File Template

    # [Topic]
    Date: YYYY-MM-DD
    Source: [title, URL, or filename]

    ## Summary
    [High-level understanding in own words]

    ## Key Concepts
    [Bullet list of important ideas]

    ## Open Questions
    [Things that need following up]

    ## Annotations
    [Section-by-section or timestamp-by-timestamp notes]
