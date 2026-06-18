import React, { useState, useEffect, useCallback } from 'react'
import Sidebar from './Sidebar.jsx'
import Editor from './Editor.jsx'
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

  async function handleNewProject() {
    const name = prompt('Project name:')
    if (!name) return
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    await api.createProject(slug)
    await refreshTree()
  }

  async function handleRenameProject(oldName, newName) {
    const slug = newName.toLowerCase().replace(/\s+/g, '-')
    await api.renameProject(oldName, slug)
    if (selectedPath?.startsWith(oldName + '/')) {
      setSelectedPath(selectedPath.replace(oldName + '/', slug + '/'))
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
        onNewProject={handleNewProject}
        onMove={handleMove}
        onRenameProject={handleRenameProject}
      />
      {selectedPath
        ? <Editor
            key={selectedPath}
            notePath={selectedPath}
            onRename={handleRename}
          />
        : <div className="empty-state">Select or create a note</div>
      }
    </div>
  )
}
