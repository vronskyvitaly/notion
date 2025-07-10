import type { Task, TodoList } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MultiTodoState {
  lists: { [id: number]: TodoList }
  listOrder: number[]
  selectedListId: number | null
  addList: (name: string) => void
  selectList: (id: number) => void
  addTask: (text: string, description?: string, dueDate?: string | null) => void
  toggleTask: (id: number) => void
  deleteTask: (id: number) => void
  updateTask: (id: number, text: string, description: string) => void
  updateListName: (id: number, name: string) => void
  deleteList: (id: number) => void
}

export const useMultiTodoStore = create<MultiTodoState>()(
  persist(
    set => ({
      lists: {},
      listOrder: [],
      selectedListId: null,
      addList: name =>
        set(state => {
          const id = Date.now()
          return {
            lists: {
              ...state.lists,
              [id]: { id, name, tasks: {}, taskOrder: [] }
            },
            listOrder: [...state.listOrder, id],
            selectedListId: id
          }
        }),
      selectList: id => set({ selectedListId: id }),
      addTask: (text, description = '', dueDate = null) =>
        set(state => {
          if (!state.selectedListId) return state
          const list = state.lists[state.selectedListId]
          if (!list) return state
          const id = Date.now()
          const newTask: Task = {
            id,
            text,
            description,
            done: false,
            dueDate,
            createdAt: new Date().toISOString()
          }
          const newList: TodoList = {
            ...list,
            tasks: {
              ...list.tasks,
              [id]: newTask
            },
            taskOrder: [...list.taskOrder, id]
          }
          return {
            lists: {
              ...state.lists,
              [list.id]: newList
            }
          }
        }),
      toggleTask: id =>
        set(state => {
          if (!state.selectedListId) return state
          const list = state.lists[state.selectedListId]
          if (!list) return state
          if (!list.tasks[id]) return state
          const newList: TodoList = {
            ...list,
            tasks: {
              ...list.tasks,
              [id]: { ...list.tasks[id], done: !list.tasks[id].done }
            }
          }
          return {
            lists: {
              ...state.lists,
              [list.id]: newList
            }
          }
        }),
      deleteTask: id =>
        set(state => {
          if (!state.selectedListId) return state
          const list = state.lists[state.selectedListId]
          if (!list) return state
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: _, ...restTasks } = list.tasks
          const newList: TodoList = {
            ...list,
            tasks: restTasks,
            taskOrder: list.taskOrder.filter(tid => tid !== id)
          }
          return {
            lists: {
              ...state.lists,
              [list.id]: newList
            }
          }
        }),
      updateTask: (id, text, description) =>
        set(state => {
          if (!state.selectedListId) return state
          const list = state.lists[state.selectedListId]
          if (!list || !list.tasks[id]) return state
          const newList: TodoList = {
            ...list,
            tasks: {
              ...list.tasks,
              [id]: { ...list.tasks[id], text, description }
            }
          }
          return {
            lists: {
              ...state.lists,
              [list.id]: newList
            }
          }
        }),
      updateListName: (id, name) =>
        set(state => {
          if (!state.lists[id]) return state
          const newList: TodoList = { ...state.lists[id], name }
          return {
            lists: {
              ...state.lists,
              [id]: newList
            }
          }
        }),
      deleteList: id =>
        set(state => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: _, ...restLists } = state.lists
          const newOrder = state.listOrder.filter(lid => lid !== id)
          const newSelected = state.selectedListId === id ? null : state.selectedListId
          return {
            lists: restLists,
            listOrder: newOrder,
            selectedListId: newSelected
          }
        })
    }),
    { name: 'multi-todo-store' }
  )
)
