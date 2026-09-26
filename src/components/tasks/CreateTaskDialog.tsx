'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { taskSchema, TaskFormValues } from '@/lib/validations';
import { Task } from '@/types';

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (task: Task) => void;
}

export function CreateTaskDialog({ open, onOpenChange, onCreate }: CreateTaskDialogProps) {
  const {
  register,
  handleSubmit,
  control,
  reset,
  formState: { errors, isValid },
} = useForm<TaskFormValues>({
  resolver: zodResolver(taskSchema),
  mode: 'onChange',
  defaultValues: {
    title: '',
    description: '',
    priority: undefined,
    dueDate: '',
  },
});

  function onSubmit(values: TaskFormValues) {
    const newTask: Task = {
      id: `t${Date.now()}`,
      projectId: '',
      title: values.title,
      description: values.description ?? '',
      priority: values.priority,
      status: 'Todo',
      assigneeId: 'u1',
      dueDate: values.dueDate,
    };
    onCreate(newTask);
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input id="title" placeholder="Enter task title" {...register('title')} />
            {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter task description" {...register('description')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Priority *</Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select value={field.value ?? ''} onValueChange={(value) => field.onChange(value ?? '')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && <p className="text-xs text-red-600">{errors.priority.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input id="dueDate" type="date" {...register('dueDate')} />
              {errors.dueDate && <p className="text-xs text-red-600">{errors.dueDate.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={!isValid}>Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}