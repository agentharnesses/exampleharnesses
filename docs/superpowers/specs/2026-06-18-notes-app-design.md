# Notes App — Design Spec
**Date:** 2026-06-18

## Goal

A local browser-based rich text notes editor tied to the content creation harness. An agent spools it up on demand. Notes are stored as `.md` files in `references/notes/` so the harness can read them natively.

---

## Location

```
content-creation-harness/
└── applications/
    └── notes-app/
        ├── server.js        # Express: REST API + static serving
        ├── package.json
        └── src/             # Vite + React frontend
            ├── main.jsx
            ├── App.jsx
            ├── Sidebar.jsx
            └── Editor.jsx
```

The `applications/` folder is a top-level container for any future apps attached to the harness.

---

## Architecture

**Backend:** Express.js. Reads from and writes to `../references/notes/` (relative to the app directory). Serves the Vite frontend in development via proxy, and `dist/` in production. No database — the filesystem is the source of truth.

**Frontend:** React + Vite. Two-panel layout: sidebar (navigation) + editor (TipTap). Communicates with the backend via the REST API.

**Notes format:** Markdown files on disk. TipTap parses markdown to its internal JSON on load, and serializes back to markdown on save. Images are stored in `references/notes/assets/` and referenced by relative path in the markdown.

**Launch:** `npm run dev` from `notes-app/` — opens the app in the browser.

---

## Backend API

All note paths under `/api/notes/*` map directly to the filesystem under `references/notes/`. No path translation needed beyond prepending the base directory.

| Method | Path | Description |
|---|---|---|
| GET | `/api/notes` | List all notes and projects as a tree |
| GET | `/api/notes/*` | Read a note's markdown content |
| PUT | `/api/notes/*` | Create or update a note |
| DELETE | `/api/notes/*` | Delete a note |
| POST | `/api/notes/move` | Move a note to a different project or root |
| POST | `/api/projects` | Create a new project (subfolder) |
| POST | `/api/images` | Receive image blob, save to assets/, return URL |
| GET | `/assets/*` | Serve images statically |

---

## Frontend

### Sidebar

- **New Note** button — creates an untitled note at root (unorganized)
- **New Project** button — prompts for a name, creates a subfolder
- Root-level notes listed directly (unorganized)
- Projects listed as collapsible sections with their notes inside
- Clicking a note opens it in the editor
- Notes can be dragged into a project or back to root to move them

### Editor

- Editable note title above the editor (maps to the filename — title "My Note" saves as `my-note.md`; spaces to hyphens, lowercase)
- TipTap rich text editor fills the remaining space
- Auto-saves on a 1-second debounce after the last keystroke
- Unsaved indicator shown while debounce is pending

---

## TipTap Extensions

| Extension | Purpose |
|---|---|
| StarterKit | Headings, bold, italic, lists, blockquotes, code blocks |
| Image | Inline image rendering |
| Link | Clickable links, opens in new tab; floating toolbar on selection |
| Markdown | Serialize to `.md` on save, deserialize `.md` on load |

### Image paste flow

1. User pastes an image
2. Browser intercepts the clipboard event
3. Sends the blob to `POST /api/images`
4. Backend saves to `references/notes/assets/{timestamp}.png`
5. Returns the asset URL
6. TipTap inserts an image node at the cursor position

### Link flow

1. User selects text
2. Floating toolbar appears with a link input
3. User types or pastes a URL
4. TipTap wraps the selection in a link node
5. Serializes to `[text](url)` in markdown

---

## note-management skill update

The `learning/note-management/SKILL.md` will be updated to include instructions for spooling up the notes app:

- When the user asks to view or edit notes in the browser, run `npm run dev` from `content-creation-harness/applications/notes-app/`
- The app opens at `http://localhost:5173` (Vite default)
- The agent should confirm the server is running before reporting back
