'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trash2 } from 'lucide-react';
import { Task, User } from '@/types';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';

const priorityStyles: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-slate-100 text-slate-700',
};

const statusStyles: Record<string, string> = {
  Todo: 'bg-slate-100 text-slate-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
};

interface TaskRowProps {
  task: Task;
  assignee?: User;
  onDelete: (id: string) => void;
}

export function TaskRow({ task, assignee, onDelete }: TaskRowProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const initials = assignee
    ? assignee.name.split(' ').map((n) => n[0]).join('')
    : '?';

  return (
    <>
      <Link
        href={`/tasks/${task.id}`}
        className="flex items-center justify-between rounded-md border bg-white p-3 text-sm hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={task.status === 'Completed'} readOnly className="h-4 w-4" />
          <span className="text-slate-700">{task.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={priorityStyles[task.priority]}>{task.priority}</Badge>
          {assignee && (
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-blue-600 text-[10px] text-white">{initials}</AvatarFallback>
            </Avatar>
          )}
          <Badge className={statusStyles[task.status]}>{task.status}</Badge>
          <span className="w-20 text-xs text-slate-400">{task.dueDate}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setConfirmOpen(true);
            }}
            className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </Link>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Task"
        description={`Are you sure you want to delete "${task.title}"? This cannot be undone.`}
        onConfirm={() => onDelete(task.id)}
      />
    </>
  );
}