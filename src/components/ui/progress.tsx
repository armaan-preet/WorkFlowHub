"use client"

import { cn } from "cn"

interface ProgressProps {
  value?: number | null
  className?: string
}

function Progress({ value, className }: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value ?? 0))

  return (
    <div
      data-slot="progress"
      className={cn("relative h-1 w-full overflow-hidden rounded-full bg-slate-200", className)}
    >
      <div
        data-slot="progress-indicator"
        className="h-full rounded-full bg-blue-600 transition-all"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  )
}

export { Progress }