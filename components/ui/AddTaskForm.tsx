import React, { ChangeEvent, KeyboardEvent } from 'react'
import Button from '@/components/ui/Button'

type AddTaskFormProps = {
  input: string
  setInput: (v: string) => void
  inputDesc: string
  setInputDesc: (v: string) => void
  handleAddTask: () => void
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ input, setInput, inputDesc, setInputDesc, handleAddTask }) => (
  <div className='flex flex-col md:flex-row md:flex-wrap gap-4 mb-8 w-full items-end bg-neutral-50/80 rounded-xl shadow-sm p-4 border border-neutral-200'>
    <div className='flex flex-col w-full'>
      <label className='mb-1 text-sm font-medium text-neutral-700 flex items-center gap-1' htmlFor='task-input'>
        <svg width='18' height='18' fill='none' viewBox='0 0 24 24'>
          <rect x='3' y='11' width='18' height='2' rx='1' fill='#eab308' />
        </svg>
        Название задачи
      </label>
      <input
        id='task-input'
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAddTask()}
        placeholder='Добавить задачу...'
        className='w-full px-4 py-2 rounded-full border border-neutral-200 bg-white text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-sm transition'
      />
    </div>
    <div className='flex flex-col w-full flex-shrink-0'>
      <label className='mb-1 text-sm font-medium text-neutral-700 flex items-center gap-1' htmlFor='desc-input'>
        Описание
      </label>
      <textarea
        id='desc-input'
        value={inputDesc}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputDesc(e.target.value)}
        placeholder='Описание (необязательно)'
        rows={2}
        className='w-full px-4 py-2 rounded-2xl border border-neutral-200 bg-white text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-sm transition resize-y'
      />
    </div>
    <Button
      onClick={handleAddTask}
      className='w-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white  rounded-full px-6 py-3 font-bold text-base shadow-md transition mt-2 md:mt-0 flex items-center gap-2 justify-center flex-shrink-0'
    >
      Добавить
    </Button>
  </div>
)

export default AddTaskForm
