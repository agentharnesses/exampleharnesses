import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '../server.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const NOTES_DIR = path.join(__dirname, '../../references/notes')
const TEST_NOTE = path.join(NOTES_DIR, '__test-note.md')
const TEST_PROJECT = path.join(NOTES_DIR, '__test-project')

beforeEach(() => {
  if (fs.existsSync(TEST_NOTE)) fs.unlinkSync(TEST_NOTE)
  if (fs.existsSync(TEST_PROJECT)) fs.rmSync(TEST_PROJECT, { recursive: true })
})

afterEach(() => {
  if (fs.existsSync(TEST_NOTE)) fs.unlinkSync(TEST_NOTE)
  if (fs.existsSync(TEST_PROJECT)) fs.rmSync(TEST_PROJECT, { recursive: true })
})

describe('health', () => {
  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
  })
})

describe('notes API', () => {
  it('GET /api/notes returns tree array', async () => {
    const res = await request(app).get('/api/notes')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.tree)).toBe(true)
  })

  it('PUT /api/notes creates a note', async () => {
    const res = await request(app)
      .put('/api/notes/__test-note.md')
      .send({ content: '# Test' })
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(fs.existsSync(TEST_NOTE)).toBe(true)
    expect(fs.readFileSync(TEST_NOTE, 'utf8')).toBe('# Test')
  })

  it('GET /api/notes/* reads note content', async () => {
    fs.writeFileSync(TEST_NOTE, '# Hello')
    const res = await request(app).get('/api/notes/__test-note.md')
    expect(res.status).toBe(200)
    expect(res.body.content).toBe('# Hello')
  })

  it('DELETE /api/notes/* removes note', async () => {
    fs.writeFileSync(TEST_NOTE, '# Hello')
    const res = await request(app).delete('/api/notes/__test-note.md')
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(fs.existsSync(TEST_NOTE)).toBe(false)
  })

  it('POST /api/projects creates a subfolder', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({ name: '__test-project' })
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(fs.existsSync(TEST_PROJECT)).toBe(true)
  })

  it('POST /api/notes/move moves a note', async () => {
    fs.writeFileSync(TEST_NOTE, '# Hello')
    fs.mkdirSync(TEST_PROJECT, { recursive: true })
    const res = await request(app)
      .post('/api/notes/move')
      .send({ from: '__test-note.md', to: '__test-project/__test-note.md' })
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(fs.existsSync(TEST_NOTE)).toBe(false)
    expect(fs.existsSync(path.join(TEST_PROJECT, '__test-note.md'))).toBe(true)
  })
})
