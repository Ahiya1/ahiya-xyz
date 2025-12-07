"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

export interface SparklineDataPoint {
  value: number;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
  data: SparklineDataPoint[];
  isLoading?: boolean;
}

export function MetricCard({
  title,
  value,
  change,
  trend,
  data,
  isLoading = false,
}: MetricCardProps) {
  const trendConfig = {
    up: {
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      chartColor: "#4ade80",
    },
    down: {
      icon: TrendingDown,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      chartColor: "#f87171",
    },
    neutral: {
      icon: Minus,
      color: "text-slate-400",
      bgColor: "bg-slate-400/10",
      chartColor: "#94a3b8",
    },
  };

  const { icon: TrendIcon, color, bgColor, chartColor } = trendConfig[trend];

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-24 mb-4" />
        <div className="h-8 bg-white/10 rounded w-32 mb-3" />
        <div className="h-4 bg-white/10 rounded w-20 mb-4" />
        <div className="h-12 bg-white/5 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-colors">
      {/* Title */}
      <p className="text-sm text-slate-400 mb-2">{title}</p>

      {/* Value */}
      <p className="text-3xl font-semibold text-white tabular-nums mb-3">
        {value}
      </p>

      {/* Change indicator */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${bgColor} ${color}`}
        >
          <TrendIcon className="w-3 h-3" />
          {Math.abs(change).toFixed(1)}%
        </span>
        <span className="text-xs text-slate-500">vs previous period</span>
      </div>

      {/* Sparkline */}
      {data.length > 0 && (
        <div className="h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={`sparkline-gradient-${title.replace(/\s/g, "-")}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={2}
                fill={`url(#sparkline-gradient-${title.replace(/\s/g, "-")})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
