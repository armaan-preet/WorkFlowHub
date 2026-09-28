'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { useData } from '@/providers/data-provider';
import { AppNotification } from '@/types';

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useData();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const visible = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  function handleClick(notification: AppNotification) {
    markAsRead(notification.id);
    router.push(notification.link);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500">Deadlines, assignments and updates on your work.</p>
        </div>
        <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
          Mark all as read
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>
          All
        </Button>
        <Button variant={filter === 'unread' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('unread')}>
          Unread ({unreadCount})
        </Button>
      </div>

      <Card className="overflow-hidden">
        {visible.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500">
            {filter === 'unread' ? 'No unread notifications.' : 'No notifications yet.'}
          </p>
        ) : (
          <div className="divide-y">
            {visible.map((n) => (
              <NotificationItem key={n.id} notification={n} onClick={handleClick} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}