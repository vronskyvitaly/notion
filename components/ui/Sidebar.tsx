import Button from '@/components/ui/Button'
import React from 'react'
import { TodoList as List } from '@/types'

type SidebarProps = {
  lists: Record<number, List>
  listOrder: number[]
  selectedListId: number | null
  selectList: (id: number) => void
  showSidebar: boolean
  showListInput: boolean
  setShowListInput: (v: boolean) => void
  newListName: string
  setNewListName: (v: string) => void
  handleAddList: () => void
  onDeleteList: (id: number) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  lists,
  listOrder,
  selectedListId,
  selectList,
  showSidebar,
  showListInput,
  setShowListInput,
  newListName,
  setNewListName,
  handleAddList,
  onDeleteList
}) => {
  // Sidebar
  const sidebar = (
    <aside
      id='sidebar'
      className='fixed left-0 top-14 h-[calc(100vh-56px)] w-[260px] min-w-[200px] bg-white border-r border-neutral-200 shadow-md flex flex-col z-20 transition-transform duration-200'
    >
      <div className='font-bold text-lg tracking-tight text-neutral-900 px-8 pt-6 pb-4'>Мои списки</div>
      <div className='flex-1 min-h-0 overflow-y-auto'>
        {listOrder.length === 0 && <span className='text-neutral-400 px-8'>Нет списков</span>}
        <ul className='list-none p-0 m-0'>
          {listOrder.map(id => {
            const list = lists[id]
            if (!list) return null
            return (
              <li
                key={list.id}
                className={`group w-full text-left px-8 py-3 text-base font-medium transition border-l-4 cursor-pointer select-none flex items-center justify-between
                  ${
                    list.id === selectedListId
                      ? 'bg-yellow-50 border-yellow-400 text-yellow-900 font-bold'
                      : 'border-transparent text-neutral-800 hover:bg-neutral-100'
                  }
                `}
                tabIndex={0}
                role='option'
                aria-selected={list.id === selectedListId}
              >
                <span
                  onClick={() => {
                    selectList(list.id)
                  }}
                  className='flex-1 truncate'
                >
                  {list.name}
                </span>
                <button
                  onClick={() => onDeleteList(list.id)}
                  className='ml-2 text-neutral-400 hover:text-red-500 p-1 rounded cursor-pointer'
                  title='Удалить список'
                  tabIndex={-1}
                >
                  🗑️
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='px-8 pt-4'>
        {showListInput ? (
          <div className='flex gap-2'>
            <input
              value={newListName}
              onChange={e => setNewListName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddList()}
              placeholder='Новый список...'
              autoFocus
              className='flex-1 px-3 py-2 rounded border border-neutral-200 bg-neutral-50 text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-yellow-300'
            />
            <Button onClick={handleAddList}>✓</Button>
            <Button
              onClick={() => {
                setShowListInput(false)
                setNewListName('')
              }}
            >
              ✕
            </Button>
          </div>
        ) : null}
      </div>
    </aside>
  )

  return <>{showSidebar && sidebar}</>
}

export default Sidebar
