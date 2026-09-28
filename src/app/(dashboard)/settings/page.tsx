'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { mockUsers } from '@/data/mock-data';

export default function SettingsPage() {
  const user = mockUsers[0];
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Manage your account preferences.</p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <p className="text-sm font-medium text-slate-900">Account</p>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user.name} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue={user.email} disabled />
            <p className="text-xs text-slate-400">Email cannot be changed yet.</p>
          </div>

          <Button className="w-fit">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <p className="text-sm font-medium text-slate-900">Notifications</p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-700">Email notifications</p>
              <p className="text-xs text-slate-400">Receive updates about your tasks via email</p>
            </div>
            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-700">Task due date reminders</p>
              <p className="text-xs text-slate-400">Get reminded before a task is due</p>
            </div>
            <Switch checked={taskReminders} onCheckedChange={setTaskReminders} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-2 p-6">
          <p className="text-sm font-medium text-red-600">Danger Zone</p>
          <p className="text-xs text-slate-400">Deleting your account is permanent and cannot be undone.</p>
          <Button variant="outline" className="w-fit border-red-300 text-red-600 hover:bg-red-50">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}