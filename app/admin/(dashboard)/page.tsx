"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { BarChart3, Globe, Clock } from "lucide-react";

import { MetricCard } from "@/app/admin/components/MetricCard";
import { MetricGrid } from "@/app/admin/components/MetricGrid";
import {
  TimeRangeSelector,
  type TimeRange,
} from "@/app/admin/components/TimeRangeSelector";

interface SparklineDataPoint {
  value: number;
}

interface MetricData {
  value: number;
  change: number;
  trend: "up" | "down" | "neutral";
  sparkline: SparklineDataPoint[];
}

interface OverviewData {
  totalViews: MetricData;
  uniqueVisitors: MetricData;
  bounceRate: MetricData;
  avgDuration: MetricData;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");

  const { data, isLoading, error } = useSWR<OverviewData>(
    `/api/analytics/overview?range=${timeRange}`,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-xl text-white mb-1">Dashboard Overview</h1>
          <p className="text-slate-400 text-sm">
            Real-time analytics for ahiya.xyz
          </p>
        </div>
        <TimeRangeSelector value={timeRange} onRangeChange={setTimeRange} />
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
          Failed to load analytics data. Please try again.
        </div>
      )}

      {/* Metrics Grid */}
      <MetricGrid>
        <MetricCard
          title="Total Views"
          value={data ? formatNumber(data.totalViews.value) : "-"}
          change={data?.totalViews.change ?? 0}
          trend={data?.totalViews.trend ?? "neutral"}
          data={data?.totalViews.sparkline ?? []}
          isLoading={isLoading}
        />
        <MetricCard
          title="Unique Visitors"
          value={data ? formatNumber(data.uniqueVisitors.value) : "-"}
          change={data?.uniqueVisitors.change ?? 0}
          trend={data?.uniqueVisitors.trend ?? "neutral"}
          data={data?.uniqueVisitors.sparkline ?? []}
          isLoading={isLoading}
        />
        <MetricCard
          title="Bounce Rate"
          value={data ? `${data.bounceRate.value}%` : "-"}
          change={data?.bounceRate.change ?? 0}
          trend={data?.bounceRate.trend ?? "neutral"}
          data={data?.bounceRate.sparkline ?? []}
          isLoading={isLoading}
        />
        <MetricCard
          title="Avg. Duration"
          value={data ? formatDuration(data.avgDuration.value) : "-"}
          change={data?.avgDuration.change ?? 0}
          trend={data?.avgDuration.trend ?? "neutral"}
          data={data?.avgDuration.sparkline ?? []}
          isLoading={isLoading}
        />
      </MetricGrid>

      {/* Coming Soon Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart Placeholder */}
        <div className="contemplative-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Traffic Over Time</h2>
              <p className="text-sm text-slate-500">Page views and visitors</p>
            </div>
          </div>
          <div className="h-48 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
            <div className="text-center">
              <p className="text-slate-400">Coming Soon</p>
              <p className="text-sm text-slate-500 mt-1">
                Interactive traffic charts
              </p>
            </div>
          </div>
        </div>

        {/* Geographic Distribution Placeholder */}
        <div className="contemplative-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Geographic Distribution</h2>
              <p className="text-sm text-slate-500">Visitors by location</p>
            </div>
          </div>
          <div className="h-48 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
            <div className="text-center">
              <p className="text-slate-400">Coming Soon</p>
              <p className="text-sm text-slate-500 mt-1">
                World map visualization
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Pages Placeholder */}
      <div className="contemplative-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Top Pages</h2>
            <p className="text-sm text-slate-500">Most visited pages</p>
          </div>
        </div>
        <div className="h-48 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
          <div className="text-center">
            <p className="text-slate-400">Coming Soon</p>
            <p className="text-sm text-slate-500 mt-1">
              Page performance breakdown
            </p>
          </div>
        </div>
      </div>

      {/* Data freshness indicator */}
      <div className="text-center">
        <p className="text-xs text-slate-500">
          Data refreshes automatically every 30 seconds
        </p>
      </div>
    </div>
  );
}
