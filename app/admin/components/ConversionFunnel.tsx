"use client";

import React from "react";
import {
  FunnelChart,
  Funnel,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// ============================================================================
// Types
// ============================================================================

interface FunnelData {
  pageViews: number;
  scroll50: number;
  ctaClicks: number;
  calOpens: number;
}

interface ConversionFunnelProps {
  data: FunnelData;
}

interface FunnelStage {
  name: string;
  value: number;
  fill: string;
}

// ============================================================================
// Constants
// ============================================================================

const COLORS = ["#a855f7", "#8b5cf6", "#6366f1", "#4f46e5"];

const STAGE_CONFIG = [
  { key: "pageViews", name: "Page Views" },
  { key: "scroll50", name: "Scrolled 50%" },
  { key: "ctaClicks", name: "CTA Clicks" },
  { key: "calOpens", name: "Cal.com Opens" },
] as const;

// ============================================================================
// Component
// ============================================================================

/**
 * ConversionFunnel visualizes the conversion pipeline from page views to conversions.
 * Shows conversion rates between each stage of the funnel.
 */
export function ConversionFunnel({ data }: ConversionFunnelProps) {
  // Transform data for Recharts FunnelChart
  const funnelData: FunnelStage[] = STAGE_CONFIG.map((stage, index) => ({
    name: stage.name,
    value: data[stage.key as keyof FunnelData] || 0,
    fill: COLORS[index],
  }));

  // Calculate conversion rates between stages
  const conversionRates = funnelData.map((stage, index) => {
    if (index === 0) return 100;
    const prevValue = funnelData[index - 1].value;
    if (prevValue === 0) return 0;
    return Math.round((stage.value / prevValue) * 100);
  });

  // Calculate overall conversion rate
  const overallRate =
    data.pageViews > 0
      ? Math.round((data.calOpens / data.pageViews) * 100 * 100) / 100
      : 0;

  return (
    <div className="space-y-4">
      {/* Funnel Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
              formatter={(value: number) => [
                value.toLocaleString(),
                "Sessions",
              ]}
            />
            <Funnel
              data={funnelData}
              dataKey="value"
              isAnimationActive={true}
              animationDuration={500}
            >
              {funnelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList
                position="right"
                fill="#fff"
                stroke="none"
                dataKey="name"
                style={{ fontSize: "12px" }}
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion Rates */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
        {STAGE_CONFIG.slice(1).map((stage, index) => {
          const rate = conversionRates[index + 1];
          const fromStage = STAGE_CONFIG[index].name;
          return (
            <div key={stage.key} className="text-center">
              <div className="text-xs text-slate-400 mb-1 truncate">
                {fromStage} to
              </div>
              <div className="text-lg font-semibold text-white">{rate}%</div>
              <div className="text-xs text-slate-500 truncate">{stage.name}</div>
            </div>
          );
        })}
      </div>

      {/* Overall Conversion */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-sm text-slate-400">Overall Conversion</span>
        <span
          className={`text-lg font-semibold ${
            overallRate > 0 ? "text-green-400" : "text-slate-400"
          }`}
        >
          {overallRate}%
        </span>
      </div>
    </div>
  );
}

export default ConversionFunnel;
