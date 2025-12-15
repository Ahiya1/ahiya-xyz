"use client";

import { availability } from "@/app/data/availability";

/**
 * UrgencyBadge Component
 *
 * Displays an amber-colored badge with a pulsing dot to indicate
 * limited availability. Returns null when showBadge is false.
 *
 * Usage:
 * ```tsx
 * <UrgencyBadge />
 * ```
 *
 * To customize the message, update `/app/data/availability.ts`
 */
export function UrgencyBadge() {
  if (!availability.showBadge) return null;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-400/30 rounded-full text-amber-400 text-sm font-medium">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
      </span>
      {availability.message}
    </div>
  );
}

export default UrgencyBadge;
