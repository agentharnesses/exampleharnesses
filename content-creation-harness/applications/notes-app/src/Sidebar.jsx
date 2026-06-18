import React, { useState, useRef } from 'react'

export default function Sidebar({ tree, selectedPath, onSelectNote, onNewNote, onNewProject, onMove, onRenameProject }) {
  const [collapsed, setCollapsed] = useState({})
  const [dragOver, setDragOver] = useState(null)
  const [editingProject, setEditingProject] = useState(null)
  const [editName, setEditName] = useState('')

  function toggleProject(name) {
    setCollapsed(c => ({ ...c, [name]: !c[name] }))
  }

  function startRename(e, project) {
    e.stopPropagation()
    setEditingProject(project.name)
    setEditName(project.name)
  }

  function submitRename(project) {
    const trimmed = editName.trim()
    if (trimmed && trimmed !== project.name) {
      onRenameProject(project.name, trimmed)
    }
    setEditingProject(null)
  }

  function handleDragStart(e, notePath) {
    e.dataTransfer.setData('text/plain', notePath)
  }

  function handleDrop(e, targetProject) {
    e.preventDefault()
    setDragOver(null)
    const from = e.dataTransfer.getData('text/plain')
    const filename = from.split('/').pop()
    const to = targetProject ? `${targetProject}/${filename}` : filename
    if (from !== to) onMove(from, to)
  }

  function handleDragOver(e, key) {
    e.preventDefault()
    setDragOver(key)
  }

  return (
    <div className="sidebar">
      <div className="sidebar-buttons">
        <button className="sidebar-btn" onClick={onNewNote}>+ Note</button>
        <button className="sidebar-btn" onClick={onNewProject}>+ Project</button>
      </div>

      <div
        onDragOver={e => handleDragOver(e, 'root')}
        onDragLeave={() => setDragOver(null)}
        onDrop={e => handleDrop(e, '')}
        style={dragOver === 'root' ? { background: '#313244' } : {}}
      >
        {tree.filter(n => n.type === 'note').map(note => (
          <div
            key={note.path}
            className={`sidebar-note${selectedPath === note.path ? ' active' : ''}`}
            draggable
            onDragStart={e => handleDragStart(e, note.path)}
            onClick={() => onSelectNote(note.path)}
          >
            {note.name.replace(/\.md$/, '')}
          </div>
        ))}
      </div>

      {tree.filter(n => n.type === 'project').map(project => (
        <div key={project.path}>
          <div
            className="sidebar-project-header"
            onClick={() => editingProject !== project.name && toggleProject(project.name)}
            onDragOver={e => handleDragOver(e, project.path)}
            onDragLeave={() => setDragOver(null)}
            onDrop={e => handleDrop(e, project.path)}
            style={dragOver === project.path ? { background: '#313244' } : {}}
          >
            <span style={{ marginRight: 4 }}>{collapsed[project.name] ? '▶' : '▼'}</span>
            {editingProject === project.name ? (
              <input
                value={editName}
                onChange={e => setEditName(e.target.value)}
                onBlur={() => submitRename(project)}
                onKeyDown={e => {
                  if (e.key === 'Enter') submitRename(project)
                  if (e.key === 'Escape') setEditingProject(null)
                }}
                onClick={e => e.stopPropagation()}
                autoFocus
                style={{
                  background: '#1e1e2e',
                  border: '1px solid #89b4fa',
                  borderRadius: 3,
                  color: '#cdd6f4',
                  fontSize: 12,
                  padding: '1px 4px',
                  width: '80%',
                  outline: 'none',
                }}
              />
            ) : (
              <span onDoubleClick={e => startRename(e, project)}>{project.name}</span>
            )}
          </div>
          {!collapsed[project.name] && (project.children ?? []).map(note => (
            <div
              key={note.path}
              className={`sidebar-note${selectedPath === note.path ? ' active' : ''}`}
              style={{ paddingLeft: '24px' }}
              draggable
              onDragStart={e => handleDragStart(e, note.path)}
              onClick={() => onSelectNote(note.path)}
            >
              {note.name.replace(/\.md$/, '')}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
