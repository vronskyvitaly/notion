export type Task = {
  id: number
  text: string
  description?: string
  done: boolean
  dueDate?: string | null
  createdAt: string
}

export type TodoList = {
  id: number
  name: string
  tasks: { [id: number]: Task }
  taskOrder: number[]
}

// Тип формы задачи (TaskFormValues) импортируется из hooks/schemas, но если потребуется общий тип, можно добавить сюда.
