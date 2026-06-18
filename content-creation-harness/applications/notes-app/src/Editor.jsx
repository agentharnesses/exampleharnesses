import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Markdown } from 'tiptap-markdown'
import * as api from './api.js'

function titleToFilename(title) {
  return (title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'untitled') + '.md'
}

export default function Editor({ notePath, onRename }) {
  const dir = notePath.includes('/') ? notePath.split('/').slice(0, -1).join('/') : ''
  const initialTitle = notePath.split('/').pop().replace(/\.md$/, '').replace(/-/g, ' ')

  const [title, setTitle] = useState(initialTitle)
  const [unsaved, setUnsaved] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const saveTimer = useRef(null)
  const currentPath = useRef(notePath)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
      }),
      Markdown,
    ],
    content: '',
    onUpdate({ editor }) {
      setUnsaved(true)
      clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(async () => {
        const md = editor.storage.markdown.getMarkdown()
        await api.saveNote(currentPath.current, md)
        setUnsaved(false)
      }, 1000)
    },
  })

  useEffect(() => {
    if (!editor) return
    api.fetchNote(notePath).then(content => {
      editor.commands.setContent(content)
      setUnsaved(false)
    })
    return () => clearTimeout(saveTimer.current)
  }, [notePath, editor])

  useEffect(() => {
    if (!editor) return
    function onPaste(e) {
      const items = Array.from(e.clipboardData?.items ?? [])
      const imageItem = items.find(i => i.type.startsWith('image/'))
      if (!imageItem) return
      e.preventDefault()
      api.uploadImage(imageItem.getAsFile()).then(url => {
        editor.chain().focus().setImage({ src: url }).run()
      })
    }
    const el = editor.view.dom
    el.addEventListener('paste', onPaste)
    return () => el.removeEventListener('paste', onPaste)
  }, [editor])

  const handleTitleBlur = useCallback(async () => {
    clearTimeout(saveTimer.current)
    const filename = titleToFilename(title)
    const newPath = dir ? `${dir}/${filename}` : filename
    if (newPath === currentPath.current) return
    const content = editor?.storage.markdown.getMarkdown() ?? ''
    await api.saveNote(newPath, content)
    await api.deleteNote(currentPath.current)
    const oldPath = currentPath.current
    currentPath.current = newPath
    onRename(oldPath, newPath)
  }, [title, dir, editor, onRename])

  function applyLink() {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
    } else {
      editor.chain().focus().unsetLink().run()
    }
    setLinkUrl('')
  }

  return (
    <div className="editor-panel">
      <input
        className="note-title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onBlur={handleTitleBlur}
        onKeyDown={e => e.key === 'Enter' && e.target.blur()}
        placeholder="Untitled"
      />
      {unsaved && <div className="unsaved-indicator">Unsaved</div>}
      {editor && (
        <BubbleMenu
          editor={editor}
          shouldShow={({ editor, state }) =>
            !state.selection.empty || editor.isActive('link')
          }
        >
          <div className="link-toolbar">
            <input
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              placeholder="https://..."
              onKeyDown={e => e.key === 'Enter' && applyLink()}
            />
            <button onClick={applyLink}>Set</button>
            <button onClick={() => editor.chain().focus().unsetLink().run()}>Clear</button>
          </div>
        </BubbleMenu>
      )}
      <div className="tiptap-wrapper">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
