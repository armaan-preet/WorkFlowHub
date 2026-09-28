import { User, Project, Task, Comment, AppNotification } from '@/types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Armaanpreet Kaur', email: 'armaanpreet@example.com', role: 'Software Engineer', joinedDate: '2025-01-15' },
  { id: 'u2', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Frontend Developer', joinedDate: '2025-02-10' },
  { id: 'u3', name: 'Sarah Khan', email: 'sarah@example.com', role: 'Designer', joinedDate: '2025-03-01' },
];

export const mockProjects: Project[] = [
  { id: 'p1', name: 'Website Redesign', description: 'Redesign company website', status: 'In Progress', progress: 65, startDate: '2025-09-01', dueDate: '2025-10-31', memberIds: ['u1', 'u2'], taskCount: 12, completedTaskCount: 7 },
  { id: 'p2', name: 'Mobile Application', description: 'Build customer mobile app', status: 'Planning', progress: 20, startDate: '2025-09-15', dueDate: '2025-12-01', memberIds: ['u2', 'u3'], taskCount: 8, completedTaskCount: 1 },
  { id: 'p3', name: 'API Integration', description: 'Integrate third-party APIs', status: 'In Progress', progress: 40, startDate: '2025-08-20', dueDate: '2025-10-15', memberIds: ['u1'], taskCount: 8, completedTaskCount: 3 },
];

export const mockTasks: Task[] = [
  { id: 't1', projectId: 'p1', title: 'Fix authentication issue', description: 'Fix the authentication issue in the login flow. Users are unable to login with valid credentials.', priority: 'High', status: 'In Progress', assigneeId: 'u1', dueDate: '2025-09-25' },
  { id: 't2', projectId: 'p1', title: 'Design login page', description: 'Create the login page design.', priority: 'Medium', status: 'Todo', assigneeId: 'u3', dueDate: '2025-09-26' },
  { id: 't3', projectId: 'p3', title: 'Update dashboard UI', description: 'Refresh dashboard components.', priority: 'Medium', status: 'In Progress', assigneeId: 'u2', dueDate: '2025-09-28' },
];

export const mockComments: Comment[] = [
  { id: 'c1', taskId: 't1', authorId: 'u2', text: 'Can we get this fixed today?', createdAt: '2025-09-24T10:33:00' },
  { id: 'c2', taskId: 't1', authorId: 'u1', text: 'Working on it.', createdAt: '2025-09-24T11:20:00' },
];

export const mockNotifications: AppNotification[] = [
  { id: 'n1', type: 'deadline_soon', title: 'Task due tomorrow', message: '"Fix authentication issue" is due tomorrow.', timeLabel: '2 hours ago', read: false, link: '/tasks/t1' },
  { id: 'n2', type: 'overdue', title: 'Task overdue', message: '"Design login page" is past its due date.', timeLabel: '5 hours ago', read: false, link: '/tasks/t2' },
  { id: 'n3', type: 'deadline_soon', title: 'Project deadline approaching', message: '"API Integration" is due in 5 days.', timeLabel: 'Yesterday', read: false, link: '/projects/p3' },
  { id: 'n4', type: 'comment', title: 'New comment', message: 'Rahul commented on "Fix authentication issue".', timeLabel: 'Yesterday', read: true, link: '/tasks/t1' },
  { id: 'n5', type: 'task_assigned', title: 'New task assigned', message: 'You were assigned "Update dashboard UI".', timeLabel: '2 days ago', read: true, link: '/tasks/t3' },
];