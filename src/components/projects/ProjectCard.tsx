'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FolderKanban, Users, CheckSquare, Trash2 } from 'lucide-react';
import { Project } from '@/types';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';

const statusStyles: Record<string, string> = {
  Planning: 'bg-slate-100 text-slate-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'On Hold': 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-green-100 text-green-700',
};

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Link href={`/projects/${project.id}`}>
        <Card className="cursor-pointer transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <FolderKanban className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{project.name}</p>
                  <p className="text-xs text-slate-500">{project.description}</p>
                </div>
              </div>
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

            <div>
              <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {project.memberIds.length} members
                </span>
                <span className="flex items-center gap-1">
                  <CheckSquare className="h-3.5 w-3.5" /> {project.taskCount} tasks
                </span>
              </div>
              <Badge className={statusStyles[project.status]}>{project.status}</Badge>
            </div>
          </CardContent>
        </Card>
      </Link>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Project"
        description={`Are you sure you want to delete "${project.name}"? This cannot be undone.`}
        onConfirm={() => onDelete(project.id)}
      />
    </>
  );
}