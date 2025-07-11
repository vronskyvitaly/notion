export type Task = {
  id: string
  text: string
  description?: string
  done: boolean
  dueDate?: string | null
  createdAt: string
  listId: string
}

export type TodoList = {
  id: string
  name: string
  userId: string
  tasks: { [id: string]: Task }
  taskOrder: string[]
}

// Тип формы задачи (TaskFormValues) импортируется из hooks/schemas, но если потребуется общий тип, можно добавить сюда.
