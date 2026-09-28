'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderKanban, CheckSquare, User, Settings, LogOut, CheckCircle2 } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'My Tasks', href: '/tasks', icon: CheckSquare },
];

const bottomItems = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarContentProps {
  onNavigate?: () => void;
}

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
    onNavigate?.();
  }

  return (
    <div className="flex h-full flex-col justify-between bg-slate-900 text-slate-300">
      <div>
        <div className="flex items-center gap-2 px-6 py-5">
          <CheckCircle2 className="h-6 w-6 text-blue-500" />
          <span className="text-lg font-semibold text-white">WorkFlowHub</span>
        </div>

        <nav className="mt-4 flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-1 px-3 pb-5">
        {bottomItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
        <button
  onClick={handleLogout}
  className="flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
>
  <LogOut className="h-4 w-4" />
  Logout
</button>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 md:flex">
      <SidebarContent />
    </aside>
  );
}