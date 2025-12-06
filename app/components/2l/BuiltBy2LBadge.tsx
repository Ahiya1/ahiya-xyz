import React from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";

// Metrics from 2L build history (hardcoded for now)
const BUILD_METRICS = {
  plans: 13,
  iterations: 14,
  agents: "200+",
} as const;

export interface BuiltBy2LBadgeProps {
  className?: string;
  showBuildHistory?: boolean;
}

/**
 * A subtle "proof" badge showing this site was built using 2L.
 * Displays key metrics: plans, iterations, and agents spawned.
 *
 * Can be used as a server component.
 */
export function BuiltBy2LBadge({
  className = "",
  showBuildHistory = true,
}: BuiltBy2LBadgeProps) {
  return (
    <div
      className={`
        max-w-md mx-auto p-4 rounded-xl
        bg-white/5 backdrop-blur-sm
        border border-purple-500/20
        text-center
        ${className}
      `}
    >
      {/* Main badge text */}
      <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span>This site was built using 2L</span>
      </div>

      {/* Metrics */}
      <div className="mt-2 text-xs text-slate-500">
        <span>{BUILD_METRICS.plans} plans</span>
        <span className="mx-2">•</span>
        <span>{BUILD_METRICS.iterations} iterations</span>
        <span className="mx-2">•</span>
        <span>{BUILD_METRICS.agents} agents spawned</span>
      </div>

      {/* Optional build history link */}
      {showBuildHistory && (
        <Link
          href="#under-the-hood"
          className="inline-block mt-3 text-xs text-purple-400/70 hover:text-purple-400 transition-colors"
        >
          View build history &rarr;
        </Link>
      )}
    </div>
  );
}

export default BuiltBy2LBadge;
