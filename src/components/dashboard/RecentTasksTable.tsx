import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTasks } from '@/data/mock-data';

const priorityStyles: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-slate-100 text-slate-700',
};

const statusStyles: Record<string, string> = {
  'Todo': 'bg-slate-100 text-slate-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Completed': 'bg-green-100 text-green-700',
};

export function RecentTasksTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {mockTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between border-b pb-2 last:border-0">
            <span className="text-sm text-slate-700">{task.title}</span>
            <div className="flex gap-2">
              <Badge className={priorityStyles[task.priority]}>{task.priority}</Badge>
              <Badge className={statusStyles[task.status]}>{task.status}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}