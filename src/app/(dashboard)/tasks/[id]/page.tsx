'use client';

import { useParams, notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/providers/data-provider';
import { mockUsers, mockComments } from '@/data/mock-data';

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

export default function TaskDetailsPage() {
  const params = useParams<{ id: string }>();
  const { tasks, projects } = useData();
  const task = tasks.find((t) => t.id === params.id);

  if (!task) return notFound();

  const project = projects.find((p) => p.id === task.projectId);
  const assignee = mockUsers.find((u) => u.id === task.assigneeId);
  const comments = mockComments.filter((c) => c.taskId === task.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{task.title}</h1>
          <p className="text-sm text-slate-500">Project: {project?.name ?? 'None'}</p>
        </div>
        <div className="flex gap-2">
          <Badge className={priorityStyles[task.priority]}>{task.priority}</Badge>
          <Badge className={statusStyles[task.status]}>{task.status}</Badge>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="flex flex-col gap-4 pt-4">
            <Card>
              <CardContent className="p-5">
                <p className="mb-2 text-sm font-medium text-slate-900">Description</p>
                <p className="text-sm text-slate-600">{task.description || 'No description provided.'}</p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs text-slate-400">Assignee</p>
                  <p className="text-sm text-slate-700">{assignee?.name ?? 'Unassigned'}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs text-slate-400">Due Date</p>
                  <p className="text-sm text-slate-700">{task.dueDate}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="comments">
          <div className="flex flex-col gap-3 pt-4">
            {comments.length === 0 && <p className="text-sm text-slate-500">No comments yet.</p>}
            {comments.map((comment) => {
              const author = mockUsers.find((u) => u.id === comment.authorId);
              const initials = author?.name.split(' ').map((n) => n[0]).join('') ?? '?';
              return (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-600 text-xs text-white">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{author?.name}</p>
                    <p className="text-sm text-slate-600">{comment.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <p className="pt-4 text-sm text-slate-500">No activity yet.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}