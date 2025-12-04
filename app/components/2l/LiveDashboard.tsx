"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

// Inline count-up hook for metrics animation
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const startRef = useRef(false);

  const start = useCallback(() => {
    if (startRef.current) return;
    startRef.current = true;
    setHasStarted(true);

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic for natural feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target); // Ensure exact final value
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return { count, start, hasStarted };
}

// Dashboard metrics - real values from this project
const dashboardMetrics = [
  {
    label: "Plans Completed",
    value: 8,
    suffix: "",
    color: "#a78bfa", // purple
  },
  {
    label: "Iterations Shipped",
    value: 10,
    suffix: "",
    color: "#818cf8", // indigo
  },
  {
    label: "Agents Spawned",
    value: 206,
    suffix: "+",
    color: "#60a5fa", // blue
  },
  {
    label: "Validation Passes",
    value: 10,
    suffix: "/10",
    isRatio: true,
    color: "#22c55e", // green
  },
];

export interface LiveDashboardProps {
  className?: string;
}

export function LiveDashboard({ className = "" }: LiveDashboardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Count-up hooks for each metric
  const plansCount = useCountUp(8, 1500);
  const iterationsCount = useCountUp(10, 1800);
  const agentsCount = useCountUp(206, 2200);
  const validationCount = useCountUp(10, 1600);

  const counts = [plansCount, iterationsCount, agentsCount, validationCount];

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Start all count-up animations
          counts.forEach((c) => c.start());
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Header badge with green pulse */}
      <div className="flex justify-center mb-8">
        <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
          {/* Pulsing dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span className="text-sm font-medium text-green-400">
            This site was built with 2L
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dashboardMetrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`contemplative-card card-lift-premium p-6 text-center transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {/* Subtle glow based on metric color */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${metric.color}15, transparent 70%)`,
              }}
            />

            {/* Value with count-up animation */}
            <div
              className="text-3xl md:text-4xl font-bold mb-2 tabular-nums"
              style={{ color: metric.color }}
            >
              {counts[index].count}
              {metric.suffix}
            </div>

            {/* Label */}
            <div className="text-sm text-slate-400">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Optional: Stats summary line */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">
          Real metrics from building this portfolio site
        </p>
      </div>
    </div>
  );
}

export default LiveDashboard;
