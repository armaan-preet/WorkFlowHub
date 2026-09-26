import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { mockUsers } from '@/data/mock-data';

export default function ProfilePage() {
  // Hardcoded for now — later this comes from logged-in user session
  const user = mockUsers[0];
  const initials = user.name.split(' ').map((n) => n[0]).join('');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Profile</h1>
        <p className="text-sm text-slate-500">Manage your personal information.</p>
      </div>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-600 text-xl text-white">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-medium text-slate-900">{user.name}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
              <p className="text-sm text-slate-500">{user.role}</p>
            </div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="mb-4 text-sm font-medium text-slate-900">Personal Information</p>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-xs text-slate-400">Full Name</p>
              <p className="text-slate-700">{user.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Email</p>
              <p className="text-slate-700">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Role</p>
              <p className="text-slate-700">{user.role}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Joined On</p>
              <p className="text-slate-700">{user.joinedDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}