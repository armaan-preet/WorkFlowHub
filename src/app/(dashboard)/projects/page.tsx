'use client';

import { useState, useEffect } from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectCardSkeleton } from '@/components/projects/ProjectCardSkeleton';
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useData } from '@/providers/data-provider';
import { Project } from '@/types';

export default function ProjectsPage() {
  const { projects, addProject, deleteProject, searchQuery } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  function handleCreate(newProject: Project) {
    addProject(newProject);
  }

  const query = searchQuery.trim().toLowerCase();
  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
  );

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

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="text-sm text-slate-500">No projects yet — create your first one.</p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-sm text-slate-500">No projects match &quot;{searchQuery}&quot;.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={deleteProject} />
          ))}
        </div>
      )}

      <CreateProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} onCreate={handleCreate} />
    </div>
  );
}