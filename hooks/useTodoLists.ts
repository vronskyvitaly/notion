import { useMultiTodoStore } from '@/app/store'

export function useTodoLists() {
  const {
    lists,
    listOrder,
    selectedListId,
    addList,
    selectList,
    updateListName,
    deleteTask,
    deleteList
    // ...etc
  } = useMultiTodoStore()
  const selectedList = selectedListId ? lists[selectedListId] : undefined

  return {
    lists,
    listOrder,
    selectedListId,
    selectedList,
    addList,
    selectList,
    updateListName,
    deleteTask,
    deleteList
    // ...etc
  }
}
