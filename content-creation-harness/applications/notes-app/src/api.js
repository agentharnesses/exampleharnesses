const BASE = '/api'

export async function fetchTree() {
  const res = await fetch(`${BASE}/notes`)
  return (await res.json()).tree
}

export async function fetchNote(notePath) {
  const res = await fetch(`${BASE}/notes/${notePath}`)
  return (await res.json()).content
}

export async function saveNote(notePath, content) {
  await fetch(`${BASE}/notes/${notePath}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
}

export async function deleteNote(notePath) {
  await fetch(`${BASE}/notes/${notePath}`, { method: 'DELETE' })
}

export async function moveNote(from, to) {
  await fetch(`${BASE}/notes/move`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to }),
  })
}

export async function renameFolder(oldPath, newPath) {
  await fetch(`${BASE}/notes/move`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: oldPath, to: newPath }),
  })
}

export async function createFolder(path) {
  await fetch(`${BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: path }),
  })
}

export async function uploadImage(blob) {
  const form = new FormData()
  form.append('image', blob, `${Date.now()}.png`)
  const res = await fetch(`${BASE}/images`, { method: 'POST', body: form })
  return (await res.json()).url
}
