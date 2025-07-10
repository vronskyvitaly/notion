import Button from '@/components/ui/Button'
import React from 'react'

type EditListNameProps = {
  editListName: string
  setEditListName: (v: string) => void
  saveEditList: () => void
  cancelEditList: () => void
  disabled?: boolean
}

const EditListName: React.FC<EditListNameProps> = ({
  editListName,
  setEditListName,
  saveEditList,
  cancelEditList,
  disabled
}) => (
  <>
    <input
      value={editListName}
      onChange={e => setEditListName(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && saveEditList()}
      className='text-2xl md:text-3xl font-bold border border-neutral-200 rounded px-2 py-1 min-w-[60px] text-neutral-900 focus:outline-none focus:ring-2 focus:ring-yellow-300'
      autoFocus
    />
    <div className='flex gap-2'>
      <Button onClick={saveEditList} disabled={disabled || !editListName.trim()}>
        Сохранить
      </Button>
      <Button onClick={cancelEditList}>Отмена</Button>
    </div>
  </>
)

export default EditListName
