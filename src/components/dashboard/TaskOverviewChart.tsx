'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const chartData = [
  { day: 'Mon', todo: 4, inProgress: 3, completed: 2 },
  { day: 'Tue', todo: 3, inProgress: 4, completed: 3 },
  { day: 'Wed', todo: 2, inProgress: 5, completed: 4 },
  { day: 'Thu', todo: 5, inProgress: 2, completed: 3 },
  { day: 'Fri', todo: 3, inProgress: 3, completed: 5 },
];

export function TaskOverviewChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-base">Task Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="todo" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="inProgress" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}