import React, { useState, useEffect, useCallback } from 'react'
import Sidebar from './Sidebar.jsx'
import Editor from './Editor.jsx'
import Terminal from './Terminal.jsx'
import * as api from './api.js'
import './App.css'

export default function App() {
  const [tree, setTree] = useState([])
  const [selectedPath, setSelectedPath] = useState(null)

  const refreshTree = useCallback(async () => {
    setTree(await api.fetchTree())
  }, [])

  useEffect(() => { refreshTree() }, [refreshTree])

  useEffect(() => {
    const es = new EventSource('/api/notes/watch')
    es.onmessage = () => refreshTree()
    return () => es.close()
  }, [refreshTree])

  useEffect(() => {
    const prevent = e => {
      if (e.target?.closest?.('.ProseMirror')) return
      e.preventDefault()
    }
    document.addEventListener('dragover', prevent)
    document.addEventListener('drop', prevent)
    return () => {
      document.removeEventListener('dragover', prevent)
      document.removeEventListener('drop', prevent)
    }
  }, [])

  async function handleNewNote() {
    const name = `untitled-${Date.now()}.md`
    await api.saveNote(name, '')
    await refreshTree()
    setSelectedPath(name)
  }

  async function handleNewFolder(parentPath = '') {
    const name = prompt('Folder name:')
    if (!name) return
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    const fullPath = parentPath ? `${parentPath}/${slug}` : slug
    await api.createFolder(fullPath)
    await refreshTree()
  }

  async function handleRenameFolder(oldPath, newName) {
    const slug = newName.toLowerCase().replace(/\s+/g, '-')
    const parent = oldPath.includes('/') ? oldPath.substring(0, oldPath.lastIndexOf('/') + 1) : ''
    const newPath = parent + slug
    await api.renameFolder(oldPath, newPath)
    if (selectedPath?.startsWith(oldPath + '/')) {
      setSelectedPath(selectedPath.replace(oldPath + '/', newPath + '/'))
    }
    await refreshTree()
  }

  async function handleMove(from, to) {
    await api.moveNote(from, to)
    await refreshTree()
    if (selectedPath === from) setSelectedPath(to)
  }

  const handleRename = useCallback((oldPath, newPath) => {
    setSelectedPath(newPath)
    refreshTree()
  }, [refreshTree])

  return (
    <div className="app">
      <Sidebar
        tree={tree}
        selectedPath={selectedPath}
        onSelectNote={setSelectedPath}
        onNewNote={handleNewNote}
        onNewFolder={handleNewFolder}
        onMove={handleMove}
        onRenameFolder={handleRenameFolder}
      />
      <div className="main-panel">
        {selectedPath
          ? <Editor
              key={selectedPath}
              notePath={selectedPath}
              onRename={handleRename}
            />
          : <div className="empty-state">Select or create a note</div>
        }
        <Terminal />
      </div>
    </div>
  )
}
