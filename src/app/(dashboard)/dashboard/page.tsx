import { StatCard } from '@/components/dashboard/StatCard';
import { TaskOverviewChart } from '@/components/dashboard/TaskOverviewChart';
import { RecentTasksTable } from '@/components/dashboard/RecentTasksTable';
import { FolderKanban, ListTodo, CheckCircle2 } from 'lucide-react';
import { mockProjects, mockTasks } from '@/data/mock-data';

export default function DashboardPage() {
  const totalProjects = mockProjects.length;
  const openTasks = mockTasks.filter((t) => t.status !== 'Completed').length;
  const completedTasks = mockTasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Good morning, Armaanpreet 👋</h1>
        <p className="text-sm text-slate-500">Here's what's happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Total Projects" value={totalProjects} delta="+2 this week" icon={FolderKanban} iconColor="text-blue-600" iconBg="bg-blue-100" />
        <StatCard title="Open Tasks" value={openTasks} delta="+5 this week" icon={ListTodo} iconColor="text-orange-600" iconBg="bg-orange-100" />
        <StatCard title="Completed Tasks" value={completedTasks} delta="+2 this week" icon={CheckCircle2} iconColor="text-green-600" iconBg="bg-green-100" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TaskOverviewChart />
        <RecentTasksTable />
      </div>
    </div>
  );
}