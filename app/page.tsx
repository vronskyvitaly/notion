'use client'
import Button from '@/components/ui/Button'
import CreateListModal from '@/components/ui/CreateListModal'
import EditListName from '@/components/ui/EditListName'
import Header from '@/components/ui/Header'
import Sidebar from '@/components/ui/Sidebar'
import TaskList from '@/components/ui/TaskList'
import { TaskFormValues, taskSchema } from '@/hooks/schemas'
import { useTasks } from '@/hooks/useTasks'
import { useTodoLists } from '@/hooks/useTodoLists'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Home() {
  const { lists, listOrder, selectedListId, selectedList, addList, selectList, updateListName, deleteList } =
    useTodoLists()
  const { addTask } = useTasks()

  const [newListName, setNewListName] = useState('')
  const [showListInput, setShowListInput] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingList, setEditingList] = useState(false)
  const [editListName, setEditListName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema)
  })

  const onSubmit = (data: TaskFormValues) => {
    if (!selectedListId) return
    addTask(data.input.trim(), data.inputDesc?.trim() || '')
    reset()
  }

  const handleAddList = (name?: string) => {
    const listName = typeof name === 'string' ? name : newListName
    if (listName.trim() === '') return
    addList(listName.trim())
    setNewListName('')
    setShowListInput(false)
    setShowSidebar(false)
    setShowCreateModal(false)
  }

  const startEditList = () => {
    setEditListName(selectedList?.name || '')
    setEditingList(true)
  }
  const cancelEditList = () => {
    setEditingList(false)
    setEditListName('')
  }
  const saveEditList = () => {
    if (selectedList && editListName.trim()) {
      updateListName(selectedList.id, editListName.trim())
      setEditingList(false)
    }
  }

  return (
    <div className='min-h-screen bg-neutral-50 flex flex-col md:flex-row font-sans'>
      {/* Header */}
      <Header
        onToggleSidebar={() => setShowSidebar(v => !v)}
        onShowCreateList={() => setShowCreateModal(true)}
        onLoginToggle={() => setIsLoggedIn(v => !v)}
        isLoggedIn={isLoggedIn}
      />
      {/* Sidebar */}
      <Sidebar
        lists={lists}
        listOrder={listOrder}
        selectedListId={selectedListId}
        selectList={selectList}
        showSidebar={showSidebar}
        showListInput={showListInput}
        setShowListInput={setShowListInput}
        newListName={newListName}
        setNewListName={setNewListName}
        handleAddList={handleAddList}
        onDeleteList={deleteList}
      />
      {/* Create List Modal */}
      <CreateListModal open={showCreateModal} onClose={() => setShowCreateModal(false)} onCreate={handleAddList} />
      {/* Main content */}
      <main className='flex-1 min-h-screen flex flex-col justify-center items-center pt-20 pb-8 px-2'>
        {selectedList ? (
          <div className='w-full max-w-xl md:max-w-xl bg-white rounded-xl shadow p-2 sm:p-4 md:p-10 flex flex-col items-stretch overflow-x-auto'>
            <div className='text-2xl md:text-2xl font-bold mb-2 md:mb-4 text-neutral-900 flex items-center gap-2'>
              {editingList ? (
                <EditListName
                  editListName={editListName}
                  setEditListName={setEditListName}
                  saveEditList={saveEditList}
                  cancelEditList={cancelEditList}
                  disabled={!editListName.trim()}
                />
              ) : (
                <>
                  <span className='flex-1 text-[18px] md:text-2xl'>{selectedList.name}</span>
                  <Button
                    onClick={startEditList}
                    className='text-yellow-700 text-2xl ml-2 hover:text-yellow-600 transition'
                    title='Редактировать название списка'
                  >
                    ✏️
                  </Button>
                </>
              )}
            </div>
            <div className='mb-8 w-full bg-white rounded-lg shadow p-4 border border-neutral-200'>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full items-stretch'>
                <div className='flex flex-col'>
                  <input
                    {...register('input')}
                    placeholder='Название задачи'
                    className='text-neutral-900 bg-white border border-neutral-300 rounded-md px-3 py-2 text-base outline-none focus:border-yellow-400 focus:bg-yellow-50 transition'
                  />
                  {errors.input && <span className='text-red-500 text-xs mt-1'>{errors.input.message}</span>}
                </div>
                <div className='flex flex-col'>
                  <input
                    {...register('inputDesc')}
                    placeholder='Описание'
                    className='text-neutral-900 bg-white border border-neutral-300 rounded-md px-3 py-2 text-base outline-none focus:border-yellow-400 focus:bg-yellow-50 transition'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full md:w-auto mt-2 whitespace-nowrap bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded px-3 py-1.5 shadow-sm transition border border-yellow-400 text-sm'
                >
                  Добавить
                </button>
              </form>
            </div>
            <hr className='my-6 border-neutral-200' />
            <TaskList />
          </div>
        ) : (
          <div className='text-neutral-400 text-center mt-32 text-xl font-medium'>Выберите или создайте список</div>
        )}
      </main>
    </div>
  )
}
