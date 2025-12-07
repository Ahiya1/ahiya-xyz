"use client";

import React from "react";

/**
 * Skeleton card for metric cards loading state
 */
export function SkeletonCard() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-4 w-24 bg-white/10 rounded" />
        <div className="h-5 w-5 bg-white/10 rounded" />
      </div>
      <div className="h-8 w-20 bg-white/10 rounded mb-2" />
      <div className="h-3 w-32 bg-white/10 rounded" />
    </div>
  );
}

/**
 * Skeleton row for table rows loading state
 */
export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-4 px-4 border-b border-white/5 animate-pulse">
      <div className="h-4 w-1/4 bg-white/10 rounded" />
      <div className="h-4 w-1/6 bg-white/10 rounded" />
      <div className="h-4 w-1/6 bg-white/10 rounded" />
      <div className="h-4 w-1/6 bg-white/10 rounded" />
      <div className="h-4 w-1/6 bg-white/10 rounded" />
    </div>
  );
}

/**
 * Skeleton chart for chart areas loading state
 */
export function SkeletonChart() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
      <div className="h-5 w-32 bg-white/10 rounded mb-6" />
      <div className="h-64 w-full bg-white/10 rounded-xl flex items-end justify-center gap-2 p-4">
        {/* Fake bar chart skeleton */}
        <div className="h-1/4 w-8 bg-white/5 rounded-t" />
        <div className="h-2/4 w-8 bg-white/5 rounded-t" />
        <div className="h-3/4 w-8 bg-white/5 rounded-t" />
        <div className="h-1/3 w-8 bg-white/5 rounded-t" />
        <div className="h-2/3 w-8 bg-white/5 rounded-t" />
        <div className="h-1/2 w-8 bg-white/5 rounded-t" />
        <div className="h-3/5 w-8 bg-white/5 rounded-t" />
      </div>
    </div>
  );
}

/**
 * Collection of skeleton loaders for convenience
 */
export const Skeleton = {
  Card: SkeletonCard,
  Row: SkeletonRow,
  Chart: SkeletonChart,
};
