import { createServer } from 'http'
import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import { spawn } from 'child_process'
import { WebSocketServer } from 'ws'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const NOTES_DIR = path.join(__dirname, 'notes')
const HARNESS_DIR = path.resolve(__dirname, '..', '..')
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
        type: 'folder',
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

// --- File watch SSE ---

const watchClients = new Set()

app.get('/api/notes/watch', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.write('data: connected\n\n')
  watchClients.add(res)
  res.on('close', () => watchClients.delete(res))
})

let watchDebounce = null
fs.watch(NOTES_DIR, { recursive: true }, (_, filename) => {
  if (filename?.includes('assets')) return
  clearTimeout(watchDebounce)
  watchDebounce = setTimeout(() => {
    for (const client of watchClients) client.write('data: change\n\n')
  }, 150)
})

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

// --- Chat ---

let harnessContent = ''
try {
  harnessContent = fs.readFileSync(path.join(HARNESS_DIR, 'HARNESS.md'), 'utf8')
} catch (e) {
  console.warn('Could not read HARNESS.md:', e.message)
}

const systemPrompt = `You are a content creation assistant embedded in a notes app. The user is a technical content creator (IAEE — Intuitively and Exhaustively Explained). Here is the project context:\n\n${harnessContent}`

let conversationStarted = false

app.post('/api/chat', (req, res) => {
  const { message } = req.body

  const args = [
    '--print', message,
    '--append-system-prompt', systemPrompt,
    '--ax-screen-reader',
  ]
  if (conversationStarted) args.push('--continue')
  conversationStarted = true

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const proc = spawn('/Users/danielwarfield/.local/bin/claude', args, {
    cwd: HARNESS_DIR,
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  let stdoutBytes = 0
  proc.stdout.on('data', chunk => {
    stdoutBytes += chunk.length
    res.write(`data: ${JSON.stringify({ text: chunk.toString() })}\n\n`)
  })

  let stderrBuf = ''
  proc.stderr.on('data', chunk => { stderrBuf += chunk.toString() })

  proc.on('close', code => {
    console.log(`[chat] exit=${code} stdout=${stdoutBytes}b stderr=${stderrBuf.slice(0,300)}`)
    res.write('data: [DONE]\n\n')
    res.end()
  })

  res.on('close', () => proc.kill())
})

app.delete('/api/chat', (_req, res) => {
  conversationStarted = false
  res.json({ ok: true })
})

// ---

// --- Terminal (WebSocket + Python PTY bridge) ---

const RESIZE_FILE = '/tmp/claude_pty_size'
const PTY_BRIDGE  = path.join(__dirname, 'pty_bridge.py')
const CLAUDE_BIN  = '/Users/danielwarfield/.local/bin/claude'

const httpServer = createServer(app)
const wss = new WebSocketServer({ server: httpServer })

wss.on('connection', (ws, req) => {
  const params = new URL(req.url, 'http://x').searchParams
  const cols = params.get('cols') || '220'
  const rows = params.get('rows') || '50'

  // Read HARNESS.md fresh on each connection so edits are picked up
  let harnessContent = ''
  try {
    harnessContent = fs.readFileSync(path.join(HARNESS_DIR, 'HARNESS.md'), 'utf8')
  } catch (e) {
    console.warn('Could not read HARNESS.md:', e.message)
  }

  const systemPrompt = `The user is currently working inside the notes-app — an embedded notes application within the content creation harness. They may ask you to help with note-taking, research, content planning, or editing notes directly. When editing files, use paths relative to the harness root.\n\n${harnessContent}`

  // Tell client we're starting up (blocks input on their end)
  ws.send(JSON.stringify({ type: 'init' }))

  const proc = spawn('python3', [PTY_BRIDGE, CLAUDE_BIN, '--append-system-prompt', systemPrompt], {
    cwd: HARNESS_DIR,
    env: { ...process.env, PTY_COLS: cols, PTY_ROWS: rows },
    stdio: ['pipe', 'pipe', 'pipe'],
  })

  let ready = false

  proc.stdout.on('data', data => {
    if (ws.readyState === 1) ws.send(data)
    // Unblock input on first output from Claude — it's live
    if (!ready) {
      ready = true
      if (ws.readyState === 1) ws.send(JSON.stringify({ type: 'ready' }))
    }
  })

  proc.stderr.on('data', data => {
    console.error('[pty_bridge]', data.toString())
  })

  proc.on('close', () => {
    if (ws.readyState === 1) ws.close()
  })

  ws.on('message', (data, isBinary) => {
    if (!ready) return  // still starting, ignore input
    if (isBinary) {
      proc.stdin.write(data)
    } else {
      try {
        const msg = JSON.parse(data.toString())
        if (msg.type === 'resize') {
          fs.writeFileSync(RESIZE_FILE, `${msg.cols}:${msg.rows}`)
          proc.kill('SIGUSR1')
        }
      } catch {
        proc.stdin.write(data)
      }
    }
  })

  ws.on('close', () => {
    try { proc.kill() } catch {}
  })
})

const PORT = 3002
if (import.meta.url === `file://${process.argv[1]}`) {
  httpServer.listen(PORT, () => console.log(`notes-app server on :${PORT}`))
}
