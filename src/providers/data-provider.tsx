'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Task, AppNotification } from '@/types';
import { mockProjects, mockTasks, mockNotifications } from '@/data/mock-data';

interface DataContextValue {
  projects: Project[];
  tasks: Task[];
  notifications: AppNotification[];
  unreadCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addProject: (project: Project) => void;
  addTask: (task: Task) => void;
  deleteProject: (id: string) => void;
  deleteTask: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  function addProject(project: Project) {
    setProjects((prev) => [project, ...prev]);
  }

  function addTask(task: Task) {
    setTasks((prev) => [task, ...prev]);
  }

  function deleteProject(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function markAsRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <DataContext.Provider
      value={{
        projects,
        tasks,
        notifications,
        unreadCount,
        searchQuery,
        setSearchQuery,
        addProject,
        addTask,
        deleteProject,
        deleteTask,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}