import type { TodoList } from '@/types'
import axios from 'axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MultiTodoState {
  lists: { [id: string]: TodoList }
  listOrder: string[]
  selectedListId: string | null
  addList: (name: string, userId?: string) => Promise<void>
  selectList: (id: string) => void
  addTask: (text: string, description?: string, userId?: string) => Promise<void>
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  updateTask: (id: string, text: string, description: string) => void
  updateListName: (id: string, name: string) => void
  deleteList: (id: string) => void
  setLists: (listsArr: TodoList[]) => void
  setTasksForList: (listId: string, tasks: any[]) => void
}

export const useMultiTodoStore = create<MultiTodoState>()(
  persist(
    set => {
      return {
        lists: {},
        listOrder: [],
        selectedListId: null,

        addList: async (name: string, userId?: string) => {
          if (!userId) return
          const res = await axios.post('/api/lists', { name, userId })
          const list = res.data
          set(state => ({
            lists: {
              ...state.lists,
              [list.id]: { ...list, tasks: {}, taskOrder: [] }
            },
            listOrder: [...state.listOrder, list.id],
            selectedListId: list.id
          }))
        },

        selectList: id => set({ selectedListId: id }),

        addTask: async (text: string, description = '', userId?: string) => {
          if (!userId) return
          let listId: string | null = null
          set(state => {
            listId = state.selectedListId
            return state
          })
          if (!listId) return
          const res = await axios.post('/api/tasks', { text, description, listId, userId })
          const task = res.data
          set(state => {
            const list = state.lists[listId!]
            if (!list) return state
            return {
              lists: {
                ...state.lists,
                [listId!]: {
                  ...list,
                  tasks: { ...list.tasks, [task.id]: task },
                  taskOrder: [...list.taskOrder, task.id]
                }
              }
            }
          })
        },

        toggleTask: async (id: string) => {
          let currentDone = false
          let listId: string | null = null
          set(state => {
            listId = state.selectedListId
            if (listId && state.lists[listId] && state.lists[listId].tasks[id]) {
              currentDone = state.lists[listId].tasks[id].done
            }
            return state
          })
          if (!listId) return
          const newDone = !currentDone
          try {
            await axios.patch(`/api/tasks/${id}`, { done: newDone })
          } catch (e) {
            console.log('Error server in PATCH toggle task', e)
            return
          }
          set(state => {
            const list = state.lists[listId!]
            if (!list) return state
            if (!list.tasks[id]) return state
            const newList: TodoList = {
              ...list,
              tasks: {
                ...list.tasks,
                [id]: { ...list.tasks[id], done: newDone }
              }
            }
            return {
              lists: {
                ...state.lists,
                [list.id]: newList
              }
            }
          })
        },

        deleteTask: async (id: string) => {
          try {
            await axios.delete(`/api/tasks/${id}`)
          } catch (e) {
            console.log('Error server in DELETE task', e)
            return
          }
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
          })
        },

        updateTask: async (id: string, text: string, description: string) => {
          try {
            await axios.patch(`/api/tasks/${id}`, { text, description })
          } catch (e) {
            console.log('Error server in PATCH update task', e)
            return
          }
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
          })
        },

        updateListName: async (id: string, name: string) => {
          try {
            await axios.patch(`/api/lists/${id}`, { name })
          } catch (e) {
            console.log('Error server in PATCH update list name', e)
            return
          }
          set(state => {
            if (!state.lists[id]) return state
            const newList: TodoList = { ...state.lists[id], name }
            return {
              lists: {
                ...state.lists,
                [id]: newList
              }
            }
          })
        },

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
          }),

        setLists: (listsArr: TodoList[]) =>
          set(state => {
            const lists: { [id: string]: TodoList } = {}
            const listOrder: string[] = []
            for (const list of listsArr) {
              lists[list.id] = { ...list, tasks: {}, taskOrder: [] }
              listOrder.push(list.id)
            }
            // Если выбранный список отсутствует — выбрать первый из новых
            let selectedListId = state.selectedListId
            if (!selectedListId || !lists[selectedListId]) {
              selectedListId = listOrder.length > 0 ? listOrder[0] : null
            }
            return { lists, listOrder, selectedListId }
          }),

        setTasksForList: (listId: string, tasks: any[]) =>
          set(state => {
            if (!state.lists[listId]) return state
            const taskMap: { [id: string]: any } = {}
            const taskOrder: string[] = []
            for (const t of tasks) {
              taskMap[t.id] = t
              taskOrder.push(t.id)
            }
            return {
              lists: {
                ...state.lists,
                [listId]: {
                  ...state.lists[listId],
                  tasks: taskMap,
                  taskOrder
                }
              }
            }
          })
      }
    },
    { name: 'multi-todo-store' }
  )
)
