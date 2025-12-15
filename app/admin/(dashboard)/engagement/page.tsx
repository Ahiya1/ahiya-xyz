"use client";

import React, { useState } from "react";
import useSWR from "swr";
import {
  BarChart2,
  TrendingUp,
  Clock,
  MousePointerClick,
  Activity,
  RefreshCw,
} from "lucide-react";

import {
  TimeRangeSelector,
  TimeRange,
} from "@/app/admin/components/TimeRangeSelector";
import { MetricCard } from "@/app/admin/components/MetricCard";
import { EmptyState } from "@/app/admin/components/EmptyState";
import { ConversionFunnel } from "@/app/admin/components/ConversionFunnel";
import { ScrollDepthChart } from "@/app/admin/components/ScrollDepthChart";

// ============================================================================
// Types
// ============================================================================

interface MetricData {
  value: number;
  change: number;
  trend: "up" | "down" | "neutral";
  sparkline: { value: number }[];
}

interface FunnelData {
  pageViews: number;
  scroll50: number;
  ctaClicks: number;
  calOpens: number;
}

interface ScrollDistributionData {
  milestone: string;
  sessions: number;
  percentage: number;
}

interface TopClickData {
  label: string;
  category: string;
  count: number;
  pagePath: string;
}

interface EngagementData {
  metrics: {
    avgScrollDepth: MetricData;
    avgTimeOnPage: MetricData;
    engagementScore: MetricData;
    totalSessions: MetricData;
  };
  funnel: FunnelData;
  scrollDistribution: ScrollDistributionData[];
  topClicks: TopClickData[];
}

// ============================================================================
// Fetcher
// ============================================================================

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch engagement data");
    }
    return res.json();
  });

// ============================================================================
// Helpers
// ============================================================================

/**
 * Format seconds into a human-readable time string
 */
function formatTime(seconds: number): string {
  if (seconds === 0) return "0s";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Engagement Analytics Dashboard Page
 * Displays engagement metrics, conversion funnel, scroll depth distribution,
 * and top clicked elements.
 */
export default function EngagementPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");

  const { data, error, isLoading, mutate } = useSWR<EngagementData>(
    `/api/admin/engagement?range=${timeRange}`,
    fetcher,
    {
      refreshInterval: 60000, // Refresh every 60 seconds
      revalidateOnFocus: true,
    }
  );

  const hasData = data && data.metrics.totalSessions.value > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-xl text-white mb-1">Engagement</h1>
          <p className="text-slate-400 text-sm">
            Understand how visitors interact with your site
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => mutate()}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
          <TimeRangeSelector value={timeRange} onRangeChange={setTimeRange} />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-red-400">!</span>
          </div>
          <div>
            <p className="text-red-300 font-medium">
              Failed to load engagement data
            </p>
            <p className="text-sm text-red-400/70">
              Please try refreshing the page or check your connection.
            </p>
          </div>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Engagement Score"
          value={
            data?.metrics.engagementScore.value
              ? `${data.metrics.engagementScore.value}/100`
              : "-"
          }
          change={data?.metrics.engagementScore.change ?? 0}
          trend={data?.metrics.engagementScore.trend ?? "neutral"}
          data={data?.metrics.engagementScore.sparkline ?? []}
          isLoading={isLoading}
        />
        <MetricCard
          title="Avg Scroll Depth"
          value={
            data?.metrics.avgScrollDepth.value
              ? `${data.metrics.avgScrollDepth.value}%`
              : "-"
          }
          change={data?.metrics.avgScrollDepth.change ?? 0}
          trend={data?.metrics.avgScrollDepth.trend ?? "neutral"}
          data={data?.metrics.avgScrollDepth.sparkline ?? []}
          isLoading={isLoading}
        />
        <MetricCard
          title="Avg Time on Page"
          value={
            data?.metrics.avgTimeOnPage.value !== undefined
              ? formatTime(data.metrics.avgTimeOnPage.value)
              : "-"
          }
          change={data?.metrics.avgTimeOnPage.change ?? 0}
          trend={data?.metrics.avgTimeOnPage.trend ?? "neutral"}
          data={data?.metrics.avgTimeOnPage.sparkline ?? []}
          isLoading={isLoading}
        />
        <MetricCard
          title="Tracked Sessions"
          value={
            data?.metrics.totalSessions.value !== undefined
              ? data.metrics.totalSessions.value.toLocaleString()
              : "-"
          }
          change={data?.metrics.totalSessions.change ?? 0}
          trend={data?.metrics.totalSessions.trend ?? "neutral"}
          data={data?.metrics.totalSessions.sparkline ?? []}
          isLoading={isLoading}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Conversion Funnel</h3>
          </div>
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-32 h-32 bg-white/5 rounded-full mb-4" />
                <div className="h-4 w-24 bg-white/10 rounded" />
              </div>
            </div>
          ) : !hasData ? (
            <EmptyState
              icon={TrendingUp}
              title="No funnel data yet"
              description="Funnel data will appear as visitors interact with your site."
            />
          ) : (
            <ConversionFunnel data={data.funnel} />
          )}
        </div>

        {/* Scroll Depth Distribution */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">
              Scroll Depth Distribution
            </h3>
          </div>
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="flex gap-2 mb-4">
                  {[40, 60, 80, 50, 70].map((h, i) => (
                    <div
                      key={i}
                      className="w-12 bg-white/5 rounded-t"
                      style={{ height: h }}
                    />
                  ))}
                </div>
                <div className="h-4 w-32 bg-white/10 rounded" />
              </div>
            </div>
          ) : !hasData ? (
            <EmptyState
              icon={BarChart2}
              title="No scroll data yet"
              description="Scroll depth data will appear as visitors scroll through your pages."
            />
          ) : (
            <ScrollDepthChart data={data.scrollDistribution} />
          )}
        </div>
      </div>

      {/* Top Clicked Elements Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MousePointerClick className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">
              Top Clicked Elements
            </h3>
          </div>
          {data?.topClicks && data.topClicks.length > 0 && (
            <span className="text-xs text-slate-500">
              Top {data.topClicks.length} elements
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-white/5 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : !hasData || !data.topClicks || data.topClicks.length === 0 ? (
          <EmptyState
            icon={MousePointerClick}
            title="No click data yet"
            description="Click tracking data will appear as visitors interact with your CTAs and links."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-3 px-4">
                    Element
                  </th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-3 px-4">
                    Category
                  </th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider py-3 px-4">
                    Page
                  </th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider py-3 px-4">
                    Clicks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.topClicks.map((click, index) => (
                  <tr
                    key={`${click.label}-${click.pagePath}-${index}`}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-white truncate max-w-[200px]">
                          {click.label}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          click.category === "CTA"
                            ? "bg-purple-500/20 text-purple-400"
                            : click.category === "Navigation"
                            ? "bg-blue-500/20 text-blue-400"
                            : click.category === "Link"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-slate-500/20 text-slate-400"
                        }`}
                      >
                        {click.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-400 truncate max-w-[150px] block">
                        {click.pagePath}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-medium text-white tabular-nums">
                        {click.count.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Engagement Score Explanation */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-medium text-white">
            How Engagement Score is Calculated
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Scroll Depth</span>
              <span className="text-sm font-medium text-purple-400">30%</span>
            </div>
            <p className="text-xs text-slate-500">
              How far visitors scroll down your pages. Higher scroll depth
              indicates more engaged readers.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Time on Page</span>
              <span className="text-sm font-medium text-purple-400">40%</span>
            </div>
            <p className="text-xs text-slate-500">
              How long visitors spend reading your content. Capped at 5 minutes
              for a perfect score.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Interactions</span>
              <span className="text-sm font-medium text-purple-400">30%</span>
            </div>
            <p className="text-xs text-slate-500">
              CTA clicks, link clicks, and other interactions that show active
              engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Footer info */}
      {!isLoading && hasData && (
        <p className="text-xs text-slate-500 text-center">
          Data refreshes automatically every 60 seconds. Last update includes
          data from the selected time range.
        </p>
      )}
    </div>
  );
}
