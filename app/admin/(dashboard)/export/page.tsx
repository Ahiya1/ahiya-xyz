"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  FileSpreadsheet,
  Calendar,
  Loader2,
  Info,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface ExportState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

interface CountState {
  isLoading: boolean;
  count: number | null;
  error: string | null;
}

export default function ExportPage() {
  // Date range state
  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  // Format state (CSV only for now)
  const [format] = useState("csv");

  // Export state
  const [exportState, setExportState] = useState<ExportState>({
    isLoading: false,
    error: null,
    success: false,
  });

  // Row count preview state
  const [countState, setCountState] = useState<CountState>({
    isLoading: false,
    count: null,
    error: null,
  });

  // Fetch row count when dates change
  useEffect(() => {
    const fetchCount = async () => {
      setCountState({ isLoading: true, count: null, error: null });

      try {
        const response = await fetch(
          `/api/analytics/export/count?from=${fromDate}&to=${toDate}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch count");
        }

        const data = await response.json();
        setCountState({ isLoading: false, count: data.count, error: null });
      } catch {
        // Silently fail for count - it's just a preview
        setCountState({ isLoading: false, count: null, error: "Could not fetch count" });
      }
    };

    fetchCount();
  }, [fromDate, toDate]);

  // Handle export download
  const handleExport = async () => {
    setExportState({ isLoading: true, error: null, success: false });

    try {
      const response = await fetch(
        `/api/analytics/export?from=${fromDate}&to=${toDate}&format=${format}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Export failed");
      }

      // Get the blob and download it
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      // Get filename from Content-Disposition header or generate one
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `analytics-export-${new Date().toISOString().split("T")[0]}.csv`;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) {
          filename = match[1];
        }
      }

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setExportState({ isLoading: false, error: null, success: true });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setExportState((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setExportState({
        isLoading: false,
        error: error instanceof Error ? error.message : "Export failed",
        success: false,
      });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white mb-2">Export Data</h1>
        <p className="text-slate-400">
          Download your analytics data for external analysis or backup.
        </p>
      </div>

      {/* Export Form Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
        {/* Date Range Selection */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">From</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">To</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <FileSpreadsheet className="w-4 h-4 inline mr-2" />
            Export Format
          </label>
          <div className="flex gap-3">
            <button
              className={`flex-1 px-4 py-3 rounded-xl border transition-colors ${
                format === "csv"
                  ? "bg-purple-500/20 border-purple-500/50 text-purple-400"
                  : "bg-white/5 border-white/10 text-slate-400 opacity-50 cursor-not-allowed"
              }`}
            >
              CSV
            </button>
            <button
              disabled
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-500 opacity-50 cursor-not-allowed"
            >
              JSON (Coming Soon)
            </button>
            <button
              disabled
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-500 opacity-50 cursor-not-allowed"
            >
              Excel (Coming Soon)
            </button>
          </div>
        </div>

        {/* Row Count Preview */}
        <div className="py-4 px-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Rows to export:</span>
            <span className="text-white font-medium">
              {countState.isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin inline" />
              ) : countState.count !== null ? (
                countState.count.toLocaleString()
              ) : (
                "---"
              )}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {exportState.error && (
          <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{exportState.error}</span>
          </div>
        )}

        {/* Success Message */}
        {exportState.success && (
          <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">Export downloaded successfully!</span>
          </div>
        )}

        {/* Download Button */}
        <button
          onClick={handleExport}
          disabled={exportState.isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {exportState.isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Download Export</span>
            </>
          )}
        </button>
      </div>

      {/* Instructions Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-purple-400" />
          Export Notes
        </h2>
        <ul className="space-y-3 text-sm text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">-</span>
            <span>
              The CSV export includes all page view data: paths, referrers, UTM
              parameters, device info, location data, and timestamps.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">-</span>
            <span>
              Data is exported in descending order by timestamp (newest first).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">-</span>
            <span>
              Visitor hashes are anonymized and cannot be used to identify
              individual users.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">-</span>
            <span>
              Large exports may take a moment to generate. Please be patient.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">-</span>
            <span>
              Import into spreadsheet software like Excel or Google Sheets for
              further analysis.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
