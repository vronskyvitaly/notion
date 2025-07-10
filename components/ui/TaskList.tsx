import { useTasks } from '@/hooks/useTasks'
import React, { useState } from 'react'
import TaskItem from '@/components/ui/TaskItem'
import { Task } from '@/types'

const TaskList = () => {
  const { selectedList, toggleTask, deleteTask, updateTask } = useTasks()
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [editDesc, setEditDesc] = useState('')

  const startEdit = (task: Task) => {
    setEditingTaskId(task.id)
    setEditText(task.text)
    setEditDesc(task.description || '')
  }
  const cancelEdit = () => {
    setEditingTaskId(null)
    setEditText('')
    setEditDesc('')
  }
  const saveEdit = (id: number) => {
    updateTask(id, editText.trim(), editDesc.trim())
    setEditingTaskId(null)
    setEditText('')
    setEditDesc('')
  }

  if (!selectedList || !selectedList.taskOrder.length) {
    return <li className='text-neutral-400 text-center py-8'>Нет задач</li>
  }
  return (
    <ul className='list-none p-0 m-0'>
      {selectedList.taskOrder.map((tid: number) => {
        const task = selectedList.tasks[tid]
        if (!task) return null
        return (
          <TaskItem
            key={task.id}
            task={task}
            editingTaskId={editingTaskId}
            editText={editText}
            setEditText={setEditText}
            editDesc={editDesc}
            setEditDesc={setEditDesc}
            startEdit={startEdit}
            cancelEdit={cancelEdit}
            saveEdit={saveEdit}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        )
      })}
    </ul>
  )
}

export default TaskList
