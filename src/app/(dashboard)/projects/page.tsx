'use client';

import { useState } from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useData } from '@/providers/data-provider';
import { Project } from '@/types';

export default function ProjectsPage() {
  const { projects, addProject } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCreate(newProject: Project) {
    addProject(newProject);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500">Manage your projects and track progress.</p>
        </div>
        <Button className="gap-2" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-slate-500">No projects yet — create your first one.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <CreateProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} onCreate={handleCreate} />
    </div>
  );
}