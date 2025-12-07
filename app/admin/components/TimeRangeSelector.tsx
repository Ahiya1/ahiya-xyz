"use client";

import React from "react";

export type TimeRange = "today" | "7d" | "30d" | "90d";

interface TimeRangeSelectorProps {
  value: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

const ranges: { value: TimeRange; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
  { value: "90d", label: "90d" },
];

export function TimeRangeSelector({
  value,
  onRangeChange,
}: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
      {ranges.map((range) => {
        const isActive = value === range.value;
        return (
          <button
            key={range.value}
            onClick={() => onRangeChange(range.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isActive
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
}
