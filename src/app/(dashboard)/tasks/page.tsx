'use client';

import { useState, useEffect } from 'react';
import { TaskRow } from '@/components/tasks/TaskRow';
import { TaskRowSkeleton } from '@/components/tasks/TaskRowSkeleton';
import { CreateTaskDialog } from '@/components/tasks/CreateTaskDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useData } from '@/providers/data-provider';
import { mockUsers } from '@/data/mock-data';
import { Task } from '@/types';

export default function TasksPage() {
  const { tasks, addTask, deleteTask, searchQuery } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const findAssignee = (assigneeId: string) => mockUsers.find((u) => u.id === assigneeId);

  function handleCreate(newTask: Task) {
    addTask(newTask);
  }

  const query = searchQuery.trim().toLowerCase();
  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">My Tasks</h1>
          <p className="text-sm text-slate-500">Tasks assigned to you.</p>
        </div>
        <Button className="gap-2" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <TaskRowSkeleton key={i} />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-sm text-slate-500">No tasks yet — add your first one.</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-sm text-slate-500">No tasks match &quot;{searchQuery}&quot;.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredTasks.map((task) => (
            <TaskRow key={task.id} task={task} assignee={findAssignee(task.assigneeId)} onDelete={deleteTask} />
          ))}
        </div>
      )}

      <CreateTaskDialog open={dialogOpen} onOpenChange={setDialogOpen} onCreate={handleCreate} />
    </div>
  );
}