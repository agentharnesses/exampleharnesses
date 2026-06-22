import React, { useState } from 'react'

function NoteItem({ note, depth, selectedPath, onSelectNote }) {
  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', note.path)
  }

  return (
    <div
      className={`sidebar-note${selectedPath === note.path ? ' active' : ''}`}
      style={{ paddingLeft: `${12 + depth * 12}px` }}
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelectNote(note.path)}
    >
      {note.name.replace(/\.md$/, '')}
    </div>
  )
}

function FolderItem({ folder, depth, selectedPath, onSelectNote, onNewFolder, onMove, onRenameFolder }) {
  const [collapsed, setCollapsed] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [dragOver, setDragOver] = useState(false)

  function startRename(e) {
    e.stopPropagation()
    setEditing(true)
    setEditName(folder.name)
  }

  function submitRename() {
    const trimmed = editName.trim()
    if (trimmed && trimmed !== folder.name) onRenameFolder(folder.path, trimmed)
    setEditing(false)
  }

  function handleDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }

  function handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    const from = e.dataTransfer.getData('text/plain')
    const filename = from.split('/').pop()
    const to = `${folder.path}/${filename}`
    if (from !== to) onMove(from, to)
  }

  return (
    <div>
      <div
        className="sidebar-folder-header"
        style={{ paddingLeft: `${12 + depth * 12}px`, ...(dragOver ? { background: '#313244' } : {}) }}
        onClick={() => !editing && setCollapsed(c => !c)}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <span style={{ marginRight: 4 }}>{collapsed ? '▶' : '▼'}</span>
        {editing ? (
          <input
            value={editName}
            onChange={e => setEditName(e.target.value)}
            onBlur={submitRename}
            onKeyDown={e => {
              if (e.key === 'Enter') submitRename()
              if (e.key === 'Escape') setEditing(false)
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
              width: '60%',
              outline: 'none',
            }}
          />
        ) : (
          <span style={{ flex: 1 }} onDoubleClick={startRename}>{folder.name}</span>
        )}
        <span
          className="sidebar-new-folder-btn"
          title="New subfolder"
          onClick={e => { e.stopPropagation(); onNewFolder(folder.path) }}
        >+</span>
      </div>
      {!collapsed && (folder.children ?? []).map(child =>
        child.type === 'folder' ? (
          <FolderItem
            key={child.path}
            folder={child}
            depth={depth + 1}
            selectedPath={selectedPath}
            onSelectNote={onSelectNote}
            onNewFolder={onNewFolder}
            onMove={onMove}
            onRenameFolder={onRenameFolder}
          />
        ) : (
          <NoteItem
            key={child.path}
            note={child}
            depth={depth + 1}
            selectedPath={selectedPath}
            onSelectNote={onSelectNote}
          />
        )
      )}
    </div>
  )
}

export default function Sidebar({ tree, selectedPath, onSelectNote, onNewNote, onNewFolder, onMove, onRenameFolder }) {
  const [rootDragOver, setRootDragOver] = useState(false)

  function handleRootDrop(e) {
    e.preventDefault()
    setRootDragOver(false)
    const from = e.dataTransfer.getData('text/plain')
    const filename = from.split('/').pop()
    if (from !== filename) onMove(from, filename)
  }

  return (
    <div className="sidebar">
      <div className="sidebar-buttons">
        <button className="sidebar-btn" onClick={onNewNote}>+ Note</button>
        <button className="sidebar-btn" onClick={() => onNewFolder()}>+ Folder</button>
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setRootDragOver(true) }}
        onDragLeave={() => setRootDragOver(false)}
        onDrop={handleRootDrop}
        style={rootDragOver ? { background: '#313244' } : {}}
      >
        {tree.filter(n => n.type === 'note').map(note => (
          <NoteItem
            key={note.path}
            note={note}
            depth={0}
            selectedPath={selectedPath}
            onSelectNote={onSelectNote}
          />
        ))}
      </div>

      {tree.filter(n => n.type === 'folder').map(folder => (
        <FolderItem
          key={folder.path}
          folder={folder}
          depth={0}
          selectedPath={selectedPath}
          onSelectNote={onSelectNote}
          onNewFolder={onNewFolder}
          onMove={onMove}
          onRenameFolder={onRenameFolder}
        />
      ))}
    </div>
  )
}
