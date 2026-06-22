import { useEffect, useRef, useState } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'

export default function TerminalPanel() {
  const [open, setOpen] = useState(true)
  const [initializing, setInitializing] = useState(true)
  const initializingRef = useRef(true)
  const containerRef = useRef(null)
  const termRef = useRef(null)
  const fitRef  = useRef(null)
  const wsRef   = useRef(null)

  function setInit(v) {
    initializingRef.current = v
    setInitializing(v)
  }

  function connect() {
    if (wsRef.current) wsRef.current.close()
    setInit(true)
    termRef.current?.clear()
    const term = termRef.current
    const { cols, rows } = term
    const ws = new WebSocket(`ws://${window.location.hostname}:3002?cols=${cols}&rows=${rows}`)
    ws.binaryType = 'arraybuffer'
    wsRef.current = ws
    ws.onmessage = e => {
      if (typeof e.data === 'string') {
        try {
          const msg = JSON.parse(e.data)
          if (msg.type === 'ready') setInit(false)
        } catch {}
      } else {
        term.write(new Uint8Array(e.data))
      }
    }
    ws.onclose = () => term.write('\r\n\x1b[2m[session ended]\x1b[0m\r\n')
  }

  // Mount terminal once, never tear it down
  useEffect(() => {
    const term = new Terminal({
      fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
      fontSize: 13,
      theme: {
        background: '#1e1e2e', foreground: '#cdd6f4', cursor: '#f5e0dc',
        black: '#45475a',   red:     '#f38ba8', green:   '#a6e3a1', yellow:  '#f9e2af',
        blue:  '#89b4fa',   magenta: '#f5c2e7', cyan:    '#94e2d5', white:   '#bac2de',
        brightBlack: '#585b70', brightRed: '#f38ba8', brightGreen: '#a6e3a1',
        brightYellow: '#f9e2af', brightBlue: '#89b4fa', brightMagenta: '#f5c2e7',
        brightCyan: '#94e2d5', brightWhite: '#a6adc8',
      },
      cursorBlink: true,
      scrollback: 5000,
    })

    const fit = new FitAddon()
    term.loadAddon(fit)
    term.open(containerRef.current)
    fit.fit()
    termRef.current = term
    fitRef.current  = fit

    // Block keystrokes while initializing
    term.onData(data => {
      if (initializingRef.current) return
      if (wsRef.current?.readyState === 1)
        wsRef.current.send(new TextEncoder().encode(data))
    })
    term.onResize(({ cols, rows }) => {
      if (wsRef.current?.readyState === 1)
        wsRef.current.send(JSON.stringify({ type: 'resize', cols, rows }))
    })

    const observer = new ResizeObserver(() => fit.fit())
    observer.observe(containerRef.current)

    connect()

    return () => {
      observer.disconnect()
      wsRef.current?.close()
      term.dispose()
    }
  }, [])

  // Re-fit when panel opens
  useEffect(() => {
    if (open) requestAnimationFrame(() => fitRef.current?.fit())
  }, [open])

  return (
    <div className={`terminal-panel${open ? '' : ' terminal-collapsed'}`}>
      <div className="terminal-header">
        <span className="terminal-toggle" onClick={() => setOpen(o => !o)}>
          {open ? '▼' : '▲'}&nbsp;&nbsp;Claude
        </span>
        <button className="terminal-new-btn" onClick={connect}>New chat</button>
      </div>
      {/* Wrapper keeps xterm in DOM at all times so session survives collapse */}
      <div className="terminal-body" style={{ display: open ? '' : 'none' }}>
        <div ref={containerRef} className="terminal-container" />
        {initializing && (
          <div className="terminal-init-overlay">
            <span className="terminal-init-spinner" />
            Initializing…
          </div>
        )}
      </div>
    </div>
  )
}
