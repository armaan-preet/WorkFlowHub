'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarContent } from './Sidebar';
import { mockUsers } from '@/data/mock-data';
import { useData } from '@/providers/data-provider';
import { NotificationBell } from '@/components/notifications/NotificationBell';

export function Topbar() {
  const currentUser = mockUsers[0];
  const initials = currentUser.name.split(' ').map((n) => n[0]).join('');
  const pathname = usePathname();
  const { searchQuery, setSearchQuery } = useData();

  // Clear the search whenever you move to a different page
  useEffect(() => {
    setSearchQuery('');
  }, [pathname, setSearchQuery]);

  const placeholder = pathname.startsWith('/projects')
    ? 'Search projects...'
    : pathname.startsWith('/tasks')
    ? 'Search tasks...'
    : 'Search...';

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
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
          <Input
            placeholder={placeholder}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <NotificationBell />

        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-md p-1 hover:bg-slate-100"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-600 text-xs text-white">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-slate-700 sm:inline">{currentUser.name}</span>
        </Link>
      </div>
    </header>
  );
}