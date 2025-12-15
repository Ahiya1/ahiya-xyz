"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import { Search, RefreshCw, FileText } from "lucide-react";
import { TimeRangeSelector, TimeRange } from "@/app/admin/components/TimeRangeSelector";
import { DataTable, Column } from "@/app/admin/components/DataTable";

interface PageMetrics {
  path: string;
  views: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgTimeOnPage: number;
  entryRate: number;
  exitRate: number;
}

interface ApiResponse {
  data: PageMetrics[];
  meta: {
    range: string;
    sort: string;
    order: string;
    count: number;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Pages Analytics Dashboard
 * Shows per-page metrics with sorting, filtering, and time range selection
 */
export default function PagesAnalyticsPage() {
  const [range, setRange] = useState<TimeRange>("7d");
  const [sortKey, setSortKey] = useState<string>("views");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Build the API URL with query params
  const apiUrl = `/api/analytics/pages?range=${range}&sort=${sortKey}&order=${sortOrder}`;

  // Fetch data with SWR
  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(
    apiUrl,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  // Handle column sorting
  const handleSort = (key: string) => {
    if (sortKey === key) {
      // Toggle order if same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // New column, default to descending
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  // Filter data by search query
  const filteredData = useMemo(() => {
    if (!data?.data) return [];
    if (!searchQuery.trim()) return data.data;

    const query = searchQuery.toLowerCase();
    return data.data.filter((page) =>
      page.path.toLowerCase().includes(query)
    );
  }, [data?.data, searchQuery]);

  // Define table columns
  const columns: Column<PageMetrics>[] = [
    {
      key: "path",
      label: "Page",
      sortable: false,
      render: (value) => (
        <div className="flex items-center gap-2 max-w-xs">
          <FileText className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span className="truncate font-medium" title={String(value)}>
            {String(value)}
          </span>
        </div>
      ),
    },
    {
      key: "views",
      label: "Views",
      sortable: true,
      align: "right",
      render: (value) => (
        <span className="tabular-nums">{Number(value).toLocaleString()}</span>
      ),
    },
    {
      key: "uniqueVisitors",
      label: "Unique Visitors",
      sortable: true,
      align: "right",
      render: (value) => (
        <span className="tabular-nums">{Number(value).toLocaleString()}</span>
      ),
    },
    {
      key: "bounceRate",
      label: "Bounce Rate",
      sortable: true,
      align: "right",
      render: (value) => {
        const rate = Number(value);
        const colorClass =
          rate > 70
            ? "text-red-400"
            : rate > 50
            ? "text-amber-400"
            : "text-green-400";
        return <span className={`tabular-nums ${colorClass}`}>{rate.toFixed(1)}%</span>;
      },
    },
    {
      key: "avgTimeOnPage",
      label: "Avg Time",
      sortable: false,
      align: "right",
      render: (value) => {
        const seconds = Number(value);
        if (seconds === 0) return <span className="text-slate-500">--</span>;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return (
          <span className="tabular-nums">
            {mins > 0 ? `${mins}m ` : ""}{secs}s
          </span>
        );
      },
    },
    {
      key: "entryRate",
      label: "Entry %",
      sortable: false,
      align: "right",
      render: (value) => (
        <span className="tabular-nums">{Number(value).toFixed(1)}%</span>
      ),
    },
    {
      key: "exitRate",
      label: "Exit %",
      sortable: false,
      align: "right",
      render: (value) => (
        <span className="tabular-nums">{Number(value).toFixed(1)}%</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-xl text-white mb-1">Pages</h1>
          <p className="text-slate-400 text-sm">
            Analyze performance metrics for each page on your site
          </p>
        </div>
        <TimeRangeSelector value={range} onRangeChange={setRange} />
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50 transition-colors text-sm"
          />
        </div>

        {/* Refresh button */}
        <button
          onClick={() => mutate()}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          <span className="text-sm font-medium">Refresh</span>
        </button>
      </div>

      {/* Results summary */}
      {!isLoading && data && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>
            Showing {filteredData.length} of {data.data.length} pages
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Clear filter
            </button>
          )}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-red-400">!</span>
          </div>
          <div>
            <p className="text-red-300 font-medium">Failed to load pages data</p>
            <p className="text-sm text-red-400/70">
              Please try refreshing the page or check your connection.
            </p>
          </div>
        </div>
      )}

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSort={handleSort}
        isLoading={isLoading}
        emptyMessage="No page views recorded yet. Once visitors start browsing your site, their activity will appear here."
      />

      {/* Footer info */}
      {!isLoading && data && data.data.length > 0 && (
        <p className="text-xs text-slate-500 text-center">
          Data refreshes automatically every 30 seconds. Avg Time is calculated from engagement events.
        </p>
      )}
    </div>
  );
}
