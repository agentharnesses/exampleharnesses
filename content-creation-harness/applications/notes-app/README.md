# Notes App

A browser-based rich text notes editor for the content-creation harness. Notes are stored as Markdown files on disk and organized into projects (folders).

## Features

- Rich text editing via TipTap (bold, italic, headings, lists, links, code blocks)
- Notes auto-save as Markdown 1 second after you stop typing
- Drag-and-drop or paste images directly into a note; images are stored in `notes/assets/`
- Click an image to select it, then drag the corner handle to resize
- Organize notes into projects (folders) via the sidebar
- Drag notes between projects to move them
- Double-click a project name to rename it
- Notes are stored in `notes/` (gitignored — personal to your machine)

## Running

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. The Express API runs on `:3001`.

## Testing

```bash
npm test
```

## Stack

- **Frontend:** React 18, TipTap v2, Vite
- **Backend:** Express, Multer (image uploads)
- **Storage:** Markdown files on disk (`notes/`)
