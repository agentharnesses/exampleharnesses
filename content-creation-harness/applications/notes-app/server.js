import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const NOTES_DIR = path.join(__dirname, '../references/notes')
fs.mkdirSync(NOTES_DIR, { recursive: true })

const ASSETS_DIR = path.join(NOTES_DIR, 'assets')
fs.mkdirSync(ASSETS_DIR, { recursive: true })

const upload = multer({
  storage: multer.diskStorage({
    destination: ASSETS_DIR,
    filename: (_req, _file, cb) => cb(null, `${Date.now()}.png`),
  }),
})

export const app = express()
app.use(express.json())
app.use('/assets', express.static(ASSETS_DIR))

function buildTree(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const result = []
  for (const entry of entries) {
    if (entry.name === 'assets' || entry.name.startsWith('.')) continue
    const relPath = base ? `${base}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      result.push({
        name: entry.name,
        path: relPath,
        type: 'project',
        children: buildTree(path.join(dir, entry.name), relPath),
      })
    } else if (entry.name.endsWith('.md')) {
      result.push({ name: entry.name, path: relPath, type: 'note' })
    }
  }
  return result
}

function safePath(rel) {
  const abs = path.resolve(NOTES_DIR, rel)
  if (!abs.startsWith(NOTES_DIR + path.sep) && abs !== NOTES_DIR) {
    throw new Error('path traversal')
  }
  return abs
}

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.get('/api/notes', (_req, res) => {
  res.json({ tree: buildTree(NOTES_DIR) })
})

// POST /api/notes/move must be registered before the wildcard GET/PUT/DELETE
app.post('/api/notes/move', (req, res) => {
  try {
    const from = safePath(req.body.from)
    const to = safePath(req.body.to)
    fs.mkdirSync(path.dirname(to), { recursive: true })
    fs.renameSync(from, to)
    res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.get('/api/notes/*', (req, res) => {
  try {
    const abs = safePath(req.params[0])
    const content = fs.readFileSync(abs, 'utf8')
    res.json({ content })
  } catch {
    res.status(404).json({ error: 'not found' })
  }
})

app.put('/api/notes/*', (req, res) => {
  try {
    const abs = safePath(req.params[0])
    fs.mkdirSync(path.dirname(abs), { recursive: true })
    fs.writeFileSync(abs, req.body.content ?? '')
    res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.delete('/api/notes/*', (req, res) => {
  try {
    const abs = safePath(req.params[0])
    fs.unlinkSync(abs)
    res.json({ ok: true })
  } catch {
    res.status(404).json({ error: 'not found' })
  }
})

app.post('/api/projects', (req, res) => {
  try {
    const abs = safePath(req.body.name)
    fs.mkdirSync(abs, { recursive: true })
    res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.post('/api/images', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no file' })
  res.json({ url: `/assets/${req.file.filename}` })
})

const PORT = 3001
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => console.log(`notes-app server on :${PORT}`))
}
