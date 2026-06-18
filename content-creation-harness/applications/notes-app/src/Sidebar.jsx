import React, { useState } from 'react'

export default function Sidebar({ tree, selectedPath, onSelectNote, onNewNote, onNewProject, onMove }) {
  const [collapsed, setCollapsed] = useState({})
  const [dragOver, setDragOver] = useState(null)

  function toggleProject(name) {
    setCollapsed(c => ({ ...c, [name]: !c[name] }))
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
            onClick={() => toggleProject(project.name)}
            onDragOver={e => handleDragOver(e, project.path)}
            onDragLeave={() => setDragOver(null)}
            onDrop={e => handleDrop(e, project.path)}
            style={dragOver === project.path ? { background: '#313244' } : {}}
          >
            {collapsed[project.name] ? '▶' : '▼'} {project.name}
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
