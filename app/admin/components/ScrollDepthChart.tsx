"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ============================================================================
// Types
// ============================================================================

interface ScrollDistributionData {
  milestone: string;
  sessions: number;
  percentage: number;
}

interface ScrollDepthChartProps {
  data: ScrollDistributionData[];
}

// ============================================================================
// Constants
// ============================================================================

// Colors from red (low engagement) to green (high engagement)
const MILESTONE_COLORS: Record<string, string> = {
  "<25%": "#ef4444", // red
  "25%": "#f97316", // orange
  "50%": "#eab308", // yellow
  "75%": "#22c55e", // light green
  "100%": "#10b981", // green
};

// Ensure consistent ordering of milestones
const MILESTONE_ORDER = ["<25%", "25%", "50%", "75%", "100%"];

// ============================================================================
// Component
// ============================================================================

/**
 * ScrollDepthChart displays the distribution of scroll depth across sessions.
 * Shows how many visitors reached each scroll milestone.
 */
export function ScrollDepthChart({ data }: ScrollDepthChartProps) {
  // Sort and format data for display
  const formattedData = MILESTONE_ORDER.map((milestone) => {
    const item = data.find((d) => d.milestone === milestone);
    return {
      name: milestone,
      sessions: item?.sessions || 0,
      percentage: item?.percentage || 0,
    };
  });

  // Calculate total sessions for context
  const totalSessions = formattedData.reduce(
    (sum, item) => sum + item.sessions,
    0
  );

  return (
    <div className="space-y-4">
      {/* Bar Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              width={40}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
              formatter={(value: number, name: string) => {
                if (name === "sessions") {
                  return [value.toLocaleString(), "Sessions"];
                }
                return [value, name];
              }}
            />
            <Bar
              dataKey="sessions"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={500}
            >
              {formattedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={MILESTONE_COLORS[entry.name] || "#6366f1"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-5 gap-2 pt-4 border-t border-white/10">
        {formattedData.map((item) => (
          <div key={item.name} className="text-center">
            <div
              className="text-lg font-semibold"
              style={{ color: MILESTONE_COLORS[item.name] || "#6366f1" }}
            >
              {item.percentage}%
            </div>
            <div className="text-xs text-slate-500">{item.name}</div>
          </div>
        ))}
      </div>

      {/* Total Sessions */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-500">Total tracked sessions</span>
        <span className="text-sm font-medium text-slate-400">
          {totalSessions.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default ScrollDepthChart;
