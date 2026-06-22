import React, { useRef, useState } from 'react'

export default function Chat() {
  const [open, setOpen] = useState(true)
  const [output, setOutput] = useState('')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  function append(text) {
    setOutput(o => o + text)
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setLoading(true)
    append(`> ${text}\n`)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    })

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buf = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buf += decoder.decode(value, { stream: true })
      const lines = buf.split('\n')
      buf = lines.pop()
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6)
        if (data === '[DONE]') break
        try {
          const { text: t } = JSON.parse(data)
          if (t) append(t)
        } catch {}
      }
    }

    append('\n')
    setLoading(false)
    inputRef.current?.focus()
  }

  async function clearChat() {
    await fetch('/api/chat', { method: 'DELETE' })
    setOutput('')
  }

  return (
    <div className={`chat-panel${open ? '' : ' chat-collapsed'}`}>
      <div className="chat-header" onClick={() => setOpen(o => !o)}>
        <span>{open ? '▼' : '▲'}&nbsp;&nbsp;Claude</span>
        {open && (
          <button
            className="chat-clear-btn"
            onClick={e => { e.stopPropagation(); clearChat() }}
          >New conversation</button>
        )}
      </div>

      {open && (
        <>
          <pre className="chat-output">
            {output}
            {loading && <span className="chat-cursor">▋</span>}
            <span ref={bottomRef} />
          </pre>

          <div className="chat-input-row">
            <span className="chat-prompt">&gt;</span>
            <input
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); send() } }}
              placeholder={loading ? '' : 'Message Claude…'}
              disabled={loading}
              autoFocus
            />
          </div>
        </>
      )}
    </div>
  )
}
