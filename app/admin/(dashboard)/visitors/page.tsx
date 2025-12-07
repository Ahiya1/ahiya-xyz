"use client";

import React, { useState } from "react";
import useSWR from "swr";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import {
  Users,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  MapPin,
} from "lucide-react";

import {
  TimeRangeSelector,
  TimeRange,
} from "@/app/admin/components/TimeRangeSelector";
import { WorldMap, GeoDataPoint } from "@/app/admin/components/WorldMap";
import { EmptyState } from "@/app/admin/components/EmptyState";
import { SkeletonRow, SkeletonChart } from "@/app/admin/components/SkeletonLoader";

// Types from API
interface DeviceBreakdown {
  device: string;
  count: number;
  percentage: number;
}

interface BrowserBreakdown {
  browser: string;
  count: number;
  percentage: number;
}

interface OSBreakdown {
  os: string;
  count: number;
  percentage: number;
}

interface CityData {
  city: string;
  country: string;
  count: number;
}

interface VisitorsData {
  deviceBreakdown: DeviceBreakdown[];
  browserBreakdown: BrowserBreakdown[];
  osBreakdown: OSBreakdown[];
  geoData: GeoDataPoint[];
  topCities: CityData[];
}

// Device icons mapping
const DEVICE_ICONS: Record<string, React.ElementType> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

// Colors for charts
const CHART_COLORS = {
  primary: "#a855f7",
  secondary: "#22c55e",
  tertiary: "#3b82f6",
  quaternary: "#f59e0b",
  quinary: "#ec4899",
};

const BAR_COLORS = [
  "#a855f7",
  "#c084fc",
  "#d8b4fe",
  "#e9d5ff",
  "#f3e8ff",
];

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// Custom bar chart tooltip
function BarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-white font-medium">{label}</p>
        <p className="text-slate-400 text-sm">
          {payload[0].value.toLocaleString()} views
        </p>
      </div>
    );
  }
  return null;
}

export default function VisitorsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");

  const { data, error, isLoading } = useSWR<VisitorsData>(
    `/api/analytics/visitors?range=${timeRange}`,
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
    }
  );

  const hasData =
    data &&
    (data.deviceBreakdown.length > 0 ||
      data.geoData.length > 0 ||
      data.browserBreakdown.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-xl text-white mb-2">Visitors</h1>
          <p className="text-slate-400">
            Demographics and device breakdown of your audience
          </p>
        </div>
        <TimeRangeSelector value={timeRange} onRangeChange={setTimeRange} />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
          Failed to load visitor data. Please try again.
        </div>
      )}

      {/* World Map */}
      <WorldMap data={data?.geoData || []} isLoading={isLoading} />

      {/* Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Cards */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Devices</h3>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-white/10 rounded-xl" />
                </div>
              ))}
            </div>
          ) : !hasData || data?.deviceBreakdown.length === 0 ? (
            <EmptyState
              icon={Monitor}
              title="No device data"
              description="Device breakdown will appear here."
            />
          ) : (
            <div className="space-y-3">
              {data?.deviceBreakdown.map((device) => {
                const Icon = DEVICE_ICONS[device.device] || Monitor;
                return (
                  <div
                    key={device.device}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white capitalize">{device.device}</p>
                        <p className="text-sm text-slate-500">
                          {device.count.toLocaleString()} views
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white tabular-nums">
                        {device.percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Browser Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Browsers</h3>
          </div>

          {isLoading ? (
            <SkeletonChart />
          ) : !hasData || data?.browserBreakdown.length === 0 ? (
            <EmptyState
              icon={Globe}
              title="No browser data"
              description="Browser usage will appear here."
            />
          ) : (
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data?.browserBreakdown}
                  layout="vertical"
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="browser"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip content={<BarTooltip />} cursor={false} />
                  <Bar
                    dataKey="count"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={20}
                  >
                    {data?.browserBreakdown.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={BAR_COLORS[index % BAR_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* OS Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Operating Systems</h3>
          </div>

          {isLoading ? (
            <SkeletonChart />
          ) : !hasData || data?.osBreakdown.length === 0 ? (
            <EmptyState
              icon={Monitor}
              title="No OS data"
              description="Operating system breakdown will appear here."
            />
          ) : (
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data?.osBreakdown}
                  layout="vertical"
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="os"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip content={<BarTooltip />} cursor={false} />
                  <Bar
                    dataKey="count"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={20}
                  >
                    {data?.osBreakdown.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={BAR_COLORS[index % BAR_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Geographic Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Top Countries</h3>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : !hasData || data?.geoData.length === 0 ? (
            <EmptyState
              icon={Globe}
              title="No country data"
              description="Country distribution will appear here once visitors arrive."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-sm font-medium text-slate-400">
                      Country
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-slate-400">
                      Views
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-slate-400">
                      Visitors
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.geoData.slice(0, 10).map((country, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {getCountryFlag(country.country)}
                          </span>
                          <span className="text-white">{country.country}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-slate-300 tabular-nums">
                        {country.count.toLocaleString()}
                      </td>
                      <td className="py-3 text-right text-slate-400 tabular-nums">
                        {country.visitors.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top Cities */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Top Cities</h3>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : !hasData || data?.topCities.length === 0 ? (
            <EmptyState
              icon={MapPin}
              title="No city data"
              description="City distribution will appear here once visitors arrive."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-sm font-medium text-slate-400">
                      City
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-slate-400">
                      Country
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-slate-400">
                      Views
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.topCities.map((city, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3">
                        <span className="text-white">{city.city}</span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {getCountryFlag(city.country)}
                          </span>
                          <span className="text-slate-400">{city.country}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-slate-300 tabular-nums">
                        {city.count.toLocaleString()}
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

// Helper to convert country code to flag emoji
function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
