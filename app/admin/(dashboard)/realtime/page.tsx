"use client";

import React from "react";
import useSWR from "swr";
import { Activity, Users, Loader2 } from "lucide-react";
import { LiveFeed } from "@/app/admin/components/LiveFeed";
import type { RealtimeResponse } from "@/app/api/analytics/realtime/route";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

/**
 * Real-Time Analytics Page
 * Shows live visitor feed with auto-refresh every 5 seconds
 */
export default function RealtimePage() {
  const { data, error, isLoading } = useSWR<RealtimeResponse>(
    "/api/analytics/realtime",
    fetcher,
    {
      refreshInterval: 5000, // Poll every 5 seconds
      revalidateOnFocus: true,
      dedupingInterval: 2000,
    }
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="heading-xl text-white">Live Activity</h1>
          {/* Pulsing green dot indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="text-sm text-green-400 font-medium">Live</span>
          </div>
        </div>

        {/* Loading indicator for refresh */}
        {isLoading && !data && (
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
          <Activity className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">
            Failed to load real-time data. Will retry automatically.
          </span>
        </div>
      )}

      {/* Current visitors counter */}
      <div className="contemplative-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Visitors on site now</p>
              <p className="text-3xl font-bold text-white tabular-nums">
                {isLoading && !data ? (
                  <span className="text-slate-500">--</span>
                ) : (
                  data?.currentVisitors ?? 0
                )}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">Active in last 5 minutes</p>
        </div>
      </div>

      {/* Live feed section */}
      <div className="flex-1 min-h-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="heading-lg text-white">Recent Activity</h2>
          <p className="text-sm text-slate-500">Last 30 minutes</p>
        </div>
        <LiveFeed visits={data?.recentVisits ?? []} />
      </div>
    </div>
  );
}
