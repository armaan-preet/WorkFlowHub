import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  startDate: z.string().min(1, 'Start date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High'], { message: 'Priority is required' }),
  dueDate: z.string().min(1, 'Due date is required'),
});

export type TaskFormValues = z.infer<typeof taskSchema>;