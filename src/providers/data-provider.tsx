'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Task } from '@/types';
import { mockProjects, mockTasks } from '@/data/mock-data';

interface DataContextValue {
  projects: Project[];
  tasks: Task[];
  addProject: (project: Project) => void;
  addTask: (task: Task) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  function addProject(project: Project) {
    setProjects((prev) => [project, ...prev]);
  }

  function addTask(task: Task) {
    setTasks((prev) => [task, ...prev]);
  }

  return (
    <DataContext.Provider value={{ projects, tasks, addProject, addTask }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}