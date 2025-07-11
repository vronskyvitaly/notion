'use client'
import { useMultiTodoStore } from '@/app/store'
import Button from '@/components/ui/Button'
import CreateListModal from '@/components/ui/CreateListModal'
import EditListName from '@/components/ui/EditListName'
import Loader from '@/components/ui/Loader'
import Sidebar from '@/components/ui/Sidebar'
import TaskList from '@/components/ui/TaskList'
import { TaskFormValues, taskSchema } from '@/hooks/schemas'
import { useTasks } from '@/hooks/useTasks'
import { useTodoLists } from '@/hooks/useTodoLists'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Home() {
  const { user } = useUser()
  const { lists, listOrder, selectedListId, selectedList, addList, selectList, updateListName, deleteList } =
    useTodoLists()
  const { addTask: addTaskLocal } = useTasks()
  const setLists = useMultiTodoStore(state => state.setLists)
  const setTasksForList = useMultiTodoStore(state => state.setTasksForList)
  const [loading, setLoading] = useState(true)

  const [newListName, setNewListName] = useState('')
  const [showListInput, setShowListInput] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingList, setEditingList] = useState(false)
  const [editListName, setEditListName] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema)
  })

  const onSubmit = async (data: TaskFormValues) => {
    if (!selectedListId || !user?.id) return
    await addTaskLocal(data.input.trim(), data.inputDesc?.trim() || '', user.id)
    reset()
  }

  const handleAddList = async (name?: string) => {
    const listName = typeof name === 'string' ? name : newListName
    if (!user?.id) return
    await addList(listName.trim(), user.id)
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

  const sidebarRef = useRef<HTMLDivElement>(null)

  // Закрывать сайдбар по клику вне его
  useEffect(() => {
    if (!showSidebar) return
    const handleClick = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setShowSidebar(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showSidebar])

  // Обёртка для selectList, чтобы закрывать сайдбар при выборе списка
  const handleSelectList = (id: string) => {
    selectList(id)
    setShowSidebar(false)
  }

  // Фильтруем тудулисты и порядок только для текущего пользователя
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userLists = Object.fromEntries(Object.entries(lists).filter(([_, list]) => list.userId === user?.id))
  const userListOrder = listOrder.filter(id => userLists[id])
  const userSelectedList = selectedList && selectedList.userId === user?.id ? selectedList : null

  // Sync lists from server on login
  useEffect(() => {
    if (!user?.id) return
    setLoading(true)
    axios.get(`/api/lists?userId=${user.id}`).then(async res => {
      setLists(res.data)
      // Для каждого списка загружаем задачи
      for (const list of res.data) {
        const tasksRes = await axios.get(`/api/lists/${list.id}/tasks`)
        setTasksForList(list.id, tasksRes.data)
      }
      setLoading(false)
    })
  }, [user?.id, setLists, setTasksForList])

  // Sync tasks for selected list
  useEffect(() => {
    if (!selectedListId) return
    axios.get(`/api/lists/${selectedListId}/tasks`).then(res => {
      setTasksForList(selectedListId, res.data)
    })
  }, [selectedListId, setTasksForList])

  return (
    <div className='min-h-screen bg-neutral-50 font-sans'>
      {/* Loader */}
      {user && loading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80'>
          <Loader />
        </div>
      )}
      {/* Header */}
      <SignedIn>
        <header className='flex justify-between items-center p-4 gap-4 h-16 w-full'>
          <div className='flex items-center gap-2'>
            <button
              className='p-2 rounded bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-xl mr-2 text-black'
              onClick={() => setShowSidebar(v => !v)}
              title='Открыть меню'
            >
              <span className='text-black'>☰</span>
            </button>
            <button
              className='p-2 rounded bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold border border-yellow-300 text-sm'
              onClick={() => setShowCreateModal(true)}
            >
              + Новый список
            </button>
          </div>
          <div className='flex items-center gap-2'>
            <UserButton />
          </div>
        </header>
      </SignedIn>
      <div className='flex flex-col md:flex-row'>
        {/* Sidebar */}
        <Sidebar
          ref={sidebarRef}
          lists={userLists}
          listOrder={userListOrder}
          selectedListId={selectedListId && userLists[selectedListId] ? selectedListId : null}
          selectList={handleSelectList}
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
          <SignedOut>
            <div className='flex flex-col items-center justify-center '>
              <span className='block text-5xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg mb-6 text-center'>
                Notion Vibe
              </span>
              <SignInButton>
                <button className='mt-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-full px-8 py-3 text-lg sm:text-xl shadow-lg transition'>
                  Войти
                </button>
              </SignInButton>
              <div className='mt-8 text-base text-neutral-500 font-medium text-center max-w-xl'>
                Notion Vibe — твой стильный веб-органайзер!
                <br />
                Создавай списки, задачи, управляй заметками и дедлайнами. Всё просто, быстро и удобно. Входи и начни
                пользоваться!
              </div>
            </div>
          </SignedOut>
          <SignedIn>
            {userSelectedList ? (
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
                      <span className='flex-1 text-[18px] md:text-2xl'>{userSelectedList.name}</span>
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
          </SignedIn>
        </main>
      </div>
    </div>
  )
}
