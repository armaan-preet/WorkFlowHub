import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { DataProvider } from '@/providers/data-provider';
import { RouteGuard } from '@/components/auth/RouteGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <DataProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
              {children}
            </main>
          </div>
        </div>
      </DataProvider>
    </RouteGuard>
  );
}