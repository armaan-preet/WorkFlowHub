export type Priority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Todo' | 'In Progress' | 'Completed';
export type ProjectStatus = 'Planning' | 'In Progress' | 'On Hold' | 'Completed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  joinedDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number; // 0-100
  startDate: string;
  dueDate: string;
  memberIds: string[];
  taskCount: number;
  completedTaskCount: number;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  assigneeId: string;
  dueDate: string;
}

export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  text: string;
  createdAt: string;
}

export type NotificationType = 'deadline_soon' | 'overdue' | 'task_assigned' | 'comment';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timeLabel: string;
  read: boolean;
  link: string;
}