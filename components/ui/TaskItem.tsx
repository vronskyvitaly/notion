import Button from '@/components/ui/Button'
import { Task } from '@/types'
import React from 'react'

interface TaskItemProps {
  task: Task
  editingTaskId: string | null
  editText: string
  setEditText: (v: string) => void
  editDesc: string
  setEditDesc: (v: string) => void
  startEdit: (task: Task) => void
  cancelEdit: () => void
  saveEdit: (id: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  editingTaskId,
  editText,
  setEditText,
  editDesc,
  setEditDesc,
  startEdit,
  cancelEdit,
  saveEdit,
  toggleTask,
  deleteTask
}) => {
  return (
    <li
      className={`flex flex-col gap-1 mb-3 rounded-lg p-4 shadow-sm border ${
        task.done ? 'bg-green-50 border-green-200' : 'bg-neutral-50 border-neutral-200'
      }`}
    >
      {editingTaskId === task.id ? (
        <>
          <input
            value={editText}
            onChange={e => setEditText(e.target.value)}
            placeholder='Название задачи'
            className='mb-2 px-3 py-2 rounded border border-neutral-200 bg-white text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-yellow-300'
          />
          <textarea
            value={editDesc}
            onChange={e => setEditDesc(e.target.value)}
            placeholder='Описание (необязательно)'
            rows={2}
            className='mb-2 px-3 py-2 rounded border border-neutral-200 bg-white text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-y'
          />
          <div className='flex gap-2'>
            <Button
              onClick={() => saveEdit(task.id)}
              disabled={!editText.trim()}
              className='px-0.5 py-0 text-[9px] bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-medium border border-yellow-300 min-w-0 rounded-md'
            >
              Сохранить
            </Button>
            <Button
              onClick={cancelEdit}
              className='px-0.5 py-0 text-[9px] bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-medium border border-neutral-300 min-w-0 rounded-md'
            >
              Отмена
            </Button>
          </div>
        </>
      ) : (
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            checked={task.done}
            onChange={() => toggleTask(task.id)}
            className='w-5 h-5 accent-green-400 cursor-pointer'
          />
          <div className='flex-1'>
            <div
              className={`text-[10px] md:text-[12px]  font-semibold  ${task.done ? 'line-through text-neutral-400' : 'text-neutral-900'}`}
            >
              {task.text}
            </div>
            {task.description && (
              <div className='text-[8px] md:text-[10px] text-neutral-500 mt-1'>{task.description}</div>
            )}

            <div className='text-[8px] md:text-[10px] text-neutral-400 mt-1'>
              Добавлено:{' '}
              {new Date(task.createdAt).toLocaleString(undefined, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              })}
            </div>
          </div>
          <Button
            onClick={() => startEdit(task)}
            className='text-yellow-700 ml-0.5 hover:text-yellow-600 transition px-0.5 py-0 border border-yellow-200 min-w-0 rounded-md'
            title='Редактировать'
          >
            <span className='text-[11px]'>✏️</span>
          </Button>
          <Button
            onClick={() => deleteTask(task.id)}
            className='px-0.5 py-0 text-[9px] bg-red-100 hover:bg-red-200 text-red-700 font-medium border border-red-200 ml-0.5 min-w-0 rounded-md'
          >
            Удалить
          </Button>
        </div>
      )}
    </li>
  )
}

export default TaskItem
