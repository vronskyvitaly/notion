import { z } from 'zod'

export const taskSchema = z.object({
  input: z.string().min(1, 'Название задачи обязательно'),
  inputDesc: z.string().optional()
})

export type TaskFormValues = z.infer<typeof taskSchema>
