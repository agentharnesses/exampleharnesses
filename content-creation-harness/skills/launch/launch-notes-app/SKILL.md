---
name: launch-notes-app
description: Start the notes-app dev server (Express + Vite) and open it in the browser.
---

## Role

Launch the notes-app so it is usable in a browser during the current session.

## What to do

1. `cd` into `applications/notes-app/`
2. Run `npm install` if `node_modules/` is missing
3. Start the app in the background:
   ```
   npm run dev
   ```
   This runs `node server.js` (Express + WebSocket on port 3002) and `vite` (React frontend, default port 5173) concurrently.
4. Wait for Vite to print its `Local:` URL (e.g. `http://localhost:5173/`). If port 5173 is taken, Vite picks the next free port — read the actual URL from its output.
5. Open that URL in the browser.

## Notes

- The backend API and `/assets` are proxied through Vite to `http://localhost:3002` — both processes must be running for the app to work.
- If port 3002 is already in use, kill the existing process (`lsof -ti:3002 | xargs kill`) before starting.
- Notes are stored in `applications/notes-app/notes/`.
