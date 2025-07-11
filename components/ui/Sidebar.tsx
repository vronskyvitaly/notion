import Button from '@/components/ui/Button'
import { TodoList as List } from '@/types'
import React from 'react'

interface SidebarProps {
  lists: { [id: string]: List }
  listOrder: string[]
  selectedListId: string | null
  selectList: (id: string) => void
  isMobile?: boolean
  showSidebar: boolean
  showSidebarDesktop?: boolean
  setShowSidebar?: (v: boolean) => void
  setShowSidebarDesktop?: (v: boolean) => void
  showListInput: boolean
  setShowListInput: (v: boolean) => void
  newListName: string
  setNewListName: (v: string) => void
  handleAddList: (name?: string) => void
  onDeleteList: (id: string) => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
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
    },
    ref
  ) => {
    // Sidebar
    const sidebar = (
      <aside
        id='sidebar'
        ref={ref}
        className='fixed left-0 top-16 h-[calc(100vh-64px)] w-[260px] bg-gradient-to-b from-yellow-50 to-white border-r border-yellow-200 shadow-lg rounded-tr-3xl flex flex-col z-20 transition-transform duration-200'
      >
        <div className='font-extrabold text-xl tracking-tight text-yellow-700 px-8 pt-8 pb-4'>Мои списки</div>
        <div className='flex-1 min-h-0 overflow-y-auto'>
          {listOrder.length === 0 && <span className='text-neutral-400 px-8'>Нет списков</span>}
          <ul className='list-none p-0 m-0'>
            {listOrder.map(id => {
              const list = lists[id]
              if (!list) return null
              return (
                <li
                  key={id}
                  className={`group w-full text-left px-8 py-3 text-base font-medium transition rounded-xl mb-2 flex items-center justify-between
                    ${
                      selectedListId === id
                        ? 'bg-yellow-100 text-yellow-900 shadow font-bold'
                        : 'hover:bg-yellow-50 text-neutral-800'
                    }
                  `}
                  tabIndex={0}
                  role='option'
                  aria-selected={selectedListId === id}
                  onClick={() => selectList(id)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className='flex-1 truncate flex items-center gap-2'>
                    <span>📋</span>
                    {list.name}
                  </span>
                  <button
                    onClick={() => onDeleteList(id)}
                    className='ml-2 text-neutral-400 hover:text-red-500 p-1 rounded transition-opacity opacity-0 group-hover:opacity-100'
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
        <div className='px-8 pt-4 pb-6'>
          {showListInput ? (
            <div className='flex gap-2'>
              <input
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddList())}
                placeholder='Новый список...'
                autoFocus
                className='flex-1 px-3 py-2 rounded border border-neutral-200 bg-neutral-50 text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-yellow-300'
              />
              <Button onClick={() => handleAddList()}>✓</Button>
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
)

Sidebar.displayName = 'Sidebar'

export default Sidebar
