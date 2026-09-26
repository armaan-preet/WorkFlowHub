'use client';

import { useParams, notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/providers/data-provider';

const statusStyles: Record<string, string> = {
  Planning: 'bg-slate-100 text-slate-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'On Hold': 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-green-100 text-green-700',
};

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();
  const { projects, tasks } = useData();
  const project = projects.find((p) => p.id === params.id);

  if (!project) return notFound();

  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{project.name}</h1>
          <p className="text-sm text-slate-500">{project.description}</p>
        </div>
        <Badge className={statusStyles[project.status]}>{project.status}</Badge>
      </div>

      <div>
        <div className="mb-1 flex justify-between text-xs text-slate-500">
          <span>{project.startDate} — {project.dueDate}</span>
          <span>{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Card>
              <CardContent className="p-5">
                <p className="mb-2 text-sm font-medium text-slate-900">Project Details</p>
                <p className="text-sm text-slate-500">{project.description}</p>
                <div className="mt-4 flex justify-between text-sm">
                  <div>
                    <p className="text-xs text-slate-400">Start Date</p>
                    <p>{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Due Date</p>
                    <p>{project.dueDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="mb-2 text-sm font-medium text-slate-900">Quick Stats</p>
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-xs text-slate-400">Total Tasks</p>
                    <p>{project.taskCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Completed</p>
                    <p>{project.completedTaskCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <div className="flex flex-col gap-2 pt-4">
            {projectTasks.length === 0 && (
              <p className="text-sm text-slate-500">No tasks yet for this project.</p>
            )}
            {projectTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <span className="text-sm text-slate-700">{task.title}</span>
                  <Badge>{task.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members">
          <p className="pt-4 text-sm text-slate-500">{project.memberIds.length} members on this project.</p>
        </TabsContent>

        <TabsContent value="activity">
          <p className="pt-4 text-sm text-slate-500">No activity yet.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}