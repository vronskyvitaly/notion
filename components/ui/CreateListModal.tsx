import React, { useEffect, useRef, useState } from 'react'
import Button from '@/components/ui/Button'

type CreateListModalProps = {
  open: boolean
  onClose: () => void
  onCreate: (name: string) => void
}

const CreateListModal: React.FC<CreateListModalProps> = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setName('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  if (!open) return null
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#0006',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 32px #0002',
          padding: 28,
          minWidth: 260,
          maxWidth: 90,
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          alignItems: 'stretch'
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Новый список</div>
        <input
          ref={inputRef}
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && name.trim() && (onCreate(name.trim()), setName(''))}
          placeholder='Название списка...'
          style={{
            padding: 10,
            borderRadius: 7,
            border: '1px solid #ececec',
            color: '#111',
            background: '#faf9f6',
            fontSize: 16,
            outline: 'none'
          }}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <Button
            onClick={() => {
              if (name.trim()) {
                onCreate(name.trim())
                setName('')
              }
            }}
            disabled={!name.trim()}
          >
            Создать
          </Button>
          <Button onClick={onClose}>Отмена</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateListModal
