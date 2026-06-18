import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const NOTES_DIR = join(__dirname, '../references/notes')
fs.mkdirSync(NOTES_DIR, { recursive: true })

export const app = express()
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))

const PORT = 3001
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => console.log(`notes-app server on :${PORT}`))
}
