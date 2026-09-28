'use client';

import { Clock, AlertCircle, UserPlus, MessageSquare, LucideIcon } from 'lucide-react';
import { AppNotification, NotificationType } from '@/types';

const iconConfig: Record<NotificationType, { icon: LucideIcon; color: string; bg: string }> = {
  deadline_soon: { icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
  overdue: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  task_assigned: { icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-100' },
  comment: { icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-100' },
};

interface NotificationItemProps {
  notification: AppNotification;
  onClick: (notification: AppNotification) => void;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const { icon: Icon, color, bg } = iconConfig[notification.type];

  return (
    <button
      onClick={() => onClick(notification)}
      className={`flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 ${
        notification.read ? '' : 'bg-blue-50/50'
      }`}
    >
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg}`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{notification.title}</p>
        <p className="text-xs text-slate-500">{notification.message}</p>
        <p className="mt-1 text-[11px] text-slate-400">{notification.timeLabel}</p>
      </div>
      {!notification.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />}
    </button>
  );
}