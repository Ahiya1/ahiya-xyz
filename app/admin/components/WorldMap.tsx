"use client";

import React, { useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

// ISO 3166-1 alpha-2 to approximate lat/lng centroids
// This provides rough center coordinates for country markers
const COUNTRY_COORDS: Record<string, [number, number]> = {
  US: [-95.7, 37.1],
  GB: [-1.2, 52.5],
  DE: [10.4, 51.2],
  FR: [2.2, 46.2],
  ES: [-3.7, 40.4],
  IT: [12.6, 41.9],
  NL: [5.3, 52.1],
  BE: [4.5, 50.5],
  CH: [8.2, 46.8],
  AT: [14.6, 47.5],
  SE: [18.6, 60.1],
  NO: [8.5, 60.5],
  DK: [9.5, 56.3],
  FI: [26.0, 64.0],
  PL: [20.0, 52.0],
  CZ: [15.5, 49.8],
  RU: [100.0, 60.0],
  UA: [32.0, 49.0],
  CA: [-106.3, 56.1],
  MX: [-102.5, 23.6],
  BR: [-51.9, -14.2],
  AR: [-63.6, -38.4],
  CL: [-71.5, -35.7],
  CO: [-74.3, 4.6],
  AU: [133.8, -25.3],
  NZ: [174.9, -41.0],
  JP: [138.3, 36.2],
  KR: [127.8, 35.9],
  CN: [104.2, 35.9],
  IN: [78.9, 20.6],
  ID: [113.9, -0.8],
  SG: [103.8, 1.4],
  TH: [100.5, 15.9],
  VN: [108.3, 14.1],
  MY: [101.9, 4.2],
  PH: [121.8, 12.9],
  IL: [35.0, 31.5],
  AE: [54.0, 24.0],
  SA: [45.1, 23.9],
  EG: [30.8, 26.8],
  ZA: [22.9, -30.6],
  NG: [8.7, 9.1],
  KE: [38.0, -0.0],
  TR: [32.9, 39.0],
  GR: [22.0, 39.1],
  PT: [-8.2, 39.4],
  IE: [-8.2, 53.4],
  HK: [114.1, 22.4],
  TW: [121.0, 23.7],
};

// World map TopoJSON URL - using a CDN-hosted natural earth dataset
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export interface GeoDataPoint {
  country: string;
  count: number;
  visitors: number;
}

interface WorldMapProps {
  data: GeoDataPoint[];
  isLoading?: boolean;
}

interface TooltipState {
  country: string;
  count: number;
  x: number;
  y: number;
}

function WorldMapComponent({ data, isLoading = false }: WorldMapProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Calculate max count for sizing markers
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  // Calculate marker size based on count (min 4px, max 24px)
  const getMarkerSize = (count: number) => {
    const normalized = count / maxCount;
    return 4 + normalized * 20;
  };

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="h-5 w-32 bg-white/10 rounded mb-4 animate-pulse" />
        <div className="h-80 w-full bg-white/5 rounded-xl animate-pulse flex items-center justify-center">
          <div className="text-slate-500 text-sm">Loading map...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative">
      <h3 className="text-lg font-medium text-white mb-4">Visitor Locations</h3>

      <div className="h-80 w-full relative">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [0, 30],
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup zoom={1} minZoom={1} maxZoom={4}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#334155" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Visitor markers */}
            {data.map((point) => {
              const coords = COUNTRY_COORDS[point.country];
              if (!coords) return null;

              const size = getMarkerSize(point.count);

              return (
                <Marker
                  key={point.country}
                  coordinates={coords}
                  onMouseEnter={(evt) => {
                    const rect = (
                      evt.target as SVGElement
                    ).getBoundingClientRect();
                    setTooltip({
                      country: point.country,
                      count: point.count,
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <circle
                    r={size / 2}
                    fill="rgba(168, 85, 247, 0.6)"
                    stroke="#a855f7"
                    strokeWidth={1}
                    className="cursor-pointer transition-all hover:fill-purple-400"
                  />
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 bg-slate-900/95 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-sm pointer-events-none shadow-xl"
            style={{
              left: tooltip.x,
              top: tooltip.y - 50,
              transform: "translateX(-50%)",
            }}
          >
            <div className="text-white font-medium">{tooltip.country}</div>
            <div className="text-slate-400">
              {tooltip.count.toLocaleString()} views
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500/60" />
          <span>Low traffic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-500/60" />
          <span>High traffic</span>
        </div>
      </div>
    </div>
  );
}

export const WorldMap = memo(WorldMapComponent);
