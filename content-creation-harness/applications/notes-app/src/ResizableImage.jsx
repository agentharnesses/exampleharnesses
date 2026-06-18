import React, { useRef, useCallback } from 'react'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { Image } from '@tiptap/extension-image'

function ResizableImageView({ node, updateAttributes, selected }) {
  const { src, alt, width } = node.attrs
  const imgRef = useRef(null)
  const startX = useRef(0)
  const startWidth = useRef(0)

  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    startX.current = e.clientX
    startWidth.current = imgRef.current?.offsetWidth ?? width ?? 300

    function onMove(e) {
      const newWidth = Math.max(50, startWidth.current + (e.clientX - startX.current))
      updateAttributes({ width: newWidth })
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [width, updateAttributes])

  return (
    <NodeViewWrapper style={{ display: 'inline-block', position: 'relative', lineHeight: 0 }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt || ''}
        draggable={false}
        style={{
          display: 'block',
          width: width ? `${width}px` : undefined,
          maxWidth: '100%',
          outline: selected ? '2px solid #89b4fa' : '2px solid transparent',
          outlineOffset: '2px',
        }}
      />
      {selected && (
        <div
          onMouseDown={onMouseDown}
          style={{
            position: 'absolute',
            right: -5,
            bottom: -5,
            width: 12,
            height: 12,
            background: '#89b4fa',
            border: '2px solid #1e1e2e',
            borderRadius: 2,
            cursor: 'nwse-resize',
            zIndex: 10,
          }}
        />
      )}
    </NodeViewWrapper>
  )
}

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: el => el.getAttribute('width') ? parseInt(el.getAttribute('width')) : null,
        renderHTML: attrs => attrs.width ? { width: attrs.width } : {},
      },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView)
  },
})
