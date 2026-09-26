'use client';

import { Search, Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarContent } from './Sidebar';
import { mockUsers } from '@/data/mock-data';

export function Topbar() {
  const currentUser = mockUsers[0];
  const initials = currentUser.name.split(' ').map((n) => n[0]).join('');

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <Sheet>
          <SheetTrigger className="rounded-md p-2 hover:bg-slate-100 md:hidden">
             <Menu className="h-5 w-5 text-slate-600" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        <div className="relative w-48 sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search..." className="pl-9" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 hover:bg-slate-100">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-600 text-xs text-white">{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-slate-700">{currentUser.name}</span>
        </div>
      </div>
    </header>
  );
}