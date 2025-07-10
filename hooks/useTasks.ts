import { useMultiTodoStore } from '@/app/store'
import { useTodoLists } from '@/hooks/useTodoLists'

export function useTasks() {
  const { selectedListId } = useTodoLists()
  const { addTask, toggleTask, deleteTask, updateTask, lists } = useMultiTodoStore()

  const selectedList = selectedListId ? lists[selectedListId] : undefined

  return {
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    selectedList
  }
}
