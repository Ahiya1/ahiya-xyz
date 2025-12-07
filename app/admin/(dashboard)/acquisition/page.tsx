"use client";

import React, { useState } from "react";
import useSWR from "swr";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { TrendingUp, ExternalLink, Target, Inbox } from "lucide-react";

import {
  TimeRangeSelector,
  TimeRange,
} from "@/app/admin/components/TimeRangeSelector";
import { EmptyState } from "@/app/admin/components/EmptyState";
import { SkeletonChart, SkeletonRow } from "@/app/admin/components/SkeletonLoader";

// Types from API
interface TrafficSource {
  source: string;
  views: number;
  visitors: number;
  percentage: number;
}

interface TopReferrer {
  domain: string;
  count: number;
}

interface TopCampaign {
  campaign: string;
  source: string | null;
  medium: string | null;
  views: number;
}

interface AcquisitionData {
  sources: TrafficSource[];
  topReferrers: TopReferrer[];
  topCampaigns: TopCampaign[];
}

// Chart colors for traffic sources
const SOURCE_COLORS: Record<string, string> = {
  direct: "#a855f7", // purple
  organic: "#22c55e", // green
  social: "#3b82f6", // blue
  referral: "#f59e0b", // amber
  campaign: "#ec4899", // pink
};

const SOURCE_LABELS: Record<string, string> = {
  direct: "Direct",
  organic: "Organic Search",
  social: "Social Media",
  referral: "Referral",
  campaign: "Campaign",
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// Custom tooltip for pie chart
function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: TrafficSource }>;
}) {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-white font-medium">
          {SOURCE_LABELS[data.source] || data.source}
        </p>
        <p className="text-slate-400 text-sm">
          {data.views.toLocaleString()} views ({data.percentage.toFixed(1)}%)
        </p>
        <p className="text-slate-500 text-xs">
          {data.visitors.toLocaleString()} unique visitors
        </p>
      </div>
    );
  }
  return null;
}

// Custom legend
function CustomLegend({
  payload,
}: {
  payload?: Array<{ value: string; color: string }>;
}) {
  if (!payload) return null;
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-slate-400">
            {SOURCE_LABELS[entry.value] || entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AcquisitionPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");

  const { data, error, isLoading } = useSWR<AcquisitionData>(
    `/api/analytics/acquisition?range=${timeRange}`,
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
    }
  );

  const hasData =
    data &&
    (data.sources.length > 0 ||
      data.topReferrers.length > 0 ||
      data.topCampaigns.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-xl text-white mb-2">Acquisition</h1>
          <p className="text-slate-400">
            Understand where your visitors come from
          </p>
        </div>
        <TimeRangeSelector value={timeRange} onRangeChange={setTimeRange} />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
          Failed to load acquisition data. Please try again.
        </div>
      )}

      {/* Traffic Sources Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Traffic Sources</h3>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-pulse text-slate-500">Loading...</div>
            </div>
          ) : !hasData || data?.sources.length === 0 ? (
            <EmptyState
              icon={TrendingUp}
              title="No traffic data"
              description="Traffic source data will appear once visitors start coming to your site."
            />
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.sources as unknown as Record<string, unknown>[]}
                    dataKey="views"
                    nameKey="source"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {data?.sources.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={SOURCE_COLORS[entry.source] || "#6b7280"}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Source Breakdown Table */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Source Breakdown
          </h3>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : !hasData || data?.sources.length === 0 ? (
            <EmptyState
              icon={TrendingUp}
              title="No data yet"
              description="Source breakdown will appear here."
            />
          ) : (
            <div className="space-y-3">
              {data?.sources.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white">
                      {SOURCE_LABELS[source.source] || source.source}
                    </span>
                    <span className="text-slate-400 tabular-nums">
                      {source.views.toLocaleString()} (
                      {source.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${source.percentage}%`,
                        backgroundColor:
                          SOURCE_COLORS[source.source] || "#6b7280",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Referrers and Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Referrers */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <ExternalLink className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Top Referrers</h3>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : !hasData || data?.topReferrers.length === 0 ? (
            <EmptyState
              icon={ExternalLink}
              title="No referrers yet"
              description="External sites linking to your content will appear here."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-sm font-medium text-slate-400">
                      Domain
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-slate-400">
                      Views
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.topReferrers.map((referrer, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </div>
                          <span className="text-white truncate max-w-[200px]">
                            {referrer.domain}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-slate-300 tabular-nums">
                        {referrer.count.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top Campaigns */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">UTM Campaigns</h3>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : !hasData || data?.topCampaigns.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No campaigns tracked"
              description="Add UTM parameters to your marketing links to track campaign performance."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-sm font-medium text-slate-400">
                      Campaign
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-slate-400">
                      Source
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-slate-400">
                      Views
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.topCampaigns.map((campaign, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3">
                        <span className="text-white truncate block max-w-[150px]">
                          {campaign.campaign}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          {campaign.source && (
                            <span className="text-slate-400 text-sm">
                              {campaign.source}
                            </span>
                          )}
                          {campaign.medium && (
                            <span className="text-slate-500 text-sm">
                              / {campaign.medium}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 text-right text-slate-300 tabular-nums">
                        {campaign.views.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
