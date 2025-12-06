"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Target,
  Search,
  FileText,
  Hammer,
  GitMerge,
  Shield,
  RefreshCw,
} from "lucide-react";

// Phase configuration for the 7-phase 2L pipeline
const phases = [
  {
    name: "Vision",
    icon: Target,
    description: "Describe what you need",
    color: "#a78bfa",
  },
  {
    name: "Exploration",
    icon: Search,
    description: "Analyze the landscape",
    color: "#22d3d8",
  },
  {
    name: "Planning",
    icon: FileText,
    description: "Architect the solution",
    color: "#a78bfa",
  },
  {
    name: "Building",
    icon: Hammer,
    description: "Execute in parallel",
    color: "#22c55e",
  },
  {
    name: "Integration",
    icon: GitMerge,
    description: "Merge with precision",
    color: "#60a5fa",
  },
  {
    name: "Validation",
    icon: Shield,
    description: "Verify quality gates",
    color: "#fbbf24",
  },
  {
    name: "Healing",
    icon: RefreshCw,
    description: "Self-correct if needed",
    color: "#f97316",
  },
];

interface PhaseNodeProps {
  phase: (typeof phases)[number];
  index: number;
  isActive: boolean;
  isLast: boolean;
  isMobile: boolean;
}

function PhaseNode({ phase, index, isActive, isLast, isMobile }: PhaseNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex ${isMobile ? "flex-row items-start" : "flex-col items-center"} group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node container */}
      <div className="relative">
        {/* Outer glow ring for active state */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-full pipeline-node-active"
            style={{
              background: `radial-gradient(circle, ${phase.color}60, transparent 70%)`,
              filter: "blur(12px)",
              transform: "scale(1.5)",
            }}
          />
        )}

        {/* Main node circle */}
        <div
          className={`pipeline-node relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full cursor-pointer transition-all duration-300 ${
            isActive ? "pipeline-node-active" : ""
          } ${isHovered ? "scale-110" : ""}`}
          style={{
            background: `radial-gradient(circle at 30% 30%, ${phase.color}30, ${phase.color}10)`,
            border: `2px solid ${isActive ? phase.color : `${phase.color}50`}`,
            boxShadow: isActive
              ? `0 0 30px ${phase.color}60, 0 0 60px ${phase.color}30, inset 0 0 20px ${phase.color}20`
              : `0 0 20px ${phase.color}20, inset 0 0 10px ${phase.color}10`,
          }}
        >
          {/* Phase icon */}
          <phase.icon
            className="relative z-10 w-6 h-6 md:w-7 md:h-7 transition-colors duration-300"
            style={{
              color: isActive || isHovered ? "#ffffff" : phase.color,
            }}
          />
        </div>

        {/* Phase number badge */}
        <div
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{
            background: phase.color,
            color: "#0a0f1a",
          }}
        >
          {index + 1}
        </div>
      </div>

      {/* Phase info */}
      <div
        className={`${
          isMobile
            ? "ml-4 flex-1"
            : "mt-4 text-center"
        }`}
      >
        <div
          className="text-sm md:text-base font-semibold transition-colors duration-300"
          style={{
            color: isActive || isHovered ? phase.color : "#e2e8f0",
          }}
        >
          {phase.name}
        </div>
        <div className="text-xs text-slate-500 mt-0.5">{phase.description}</div>
      </div>

      {/* Connection line to next phase (not for last phase) */}
      {!isLast && !isMobile && (
        <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-2">
          <div className="relative w-8 lg:w-12 xl:w-16 h-0.5">
            {/* Base line */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${phase.color}40, ${phases[index + 1]?.color || phase.color}40)`,
              }}
            />
            {/* Animated gradient flow */}
            <div className="pipeline-line pipeline-line-animated absolute inset-0 rounded-full" />
          </div>
        </div>
      )}

      {/* Vertical connection line for mobile */}
      {!isLast && isMobile && (
        <div className="absolute left-7 top-full mt-1 w-0.5 h-6">
          {/* Base line */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(180deg, ${phase.color}40, ${phases[index + 1]?.color || phase.color}40)`,
            }}
          />
          {/* Animated gradient flow */}
          <div
            className="pipeline-line-vertical absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(180deg, transparent, ${phase.color}60, transparent)`,
              backgroundSize: "100% 200%",
              animation: "line-flow-vertical 2s linear infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}

// Self-healing loop indicator component
function SelfHealingLoop({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <div className="ml-7 mt-2 mb-4 flex items-center gap-2 text-xs text-slate-500">
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center"
          style={{ background: "#f9731620", border: "1px solid #f9731640" }}
        >
          <RefreshCw className="w-2.5 h-2.5" style={{ color: "#f97316" }} />
        </div>
        <span>Self-correcting loop: Validation - Healing</span>
      </div>
    );
  }

  return (
    <div className="hidden md:flex justify-center mt-4 mb-2">
      <div className="relative flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/5 border border-orange-500/20">
        {/* Arrow from Validation to Healing */}
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: "#fbbf24" }}
        >
          <path
            d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
            fill="currentColor"
          />
        </svg>

        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "#fbbf2420", border: "1px solid #fbbf2440" }}
          >
            <Shield className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} />
          </div>
          <span className="text-xs text-slate-400">Self-correcting loop</span>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "#f9731620", border: "1px solid #f9731640" }}
          >
            <RefreshCw className="w-3.5 h-3.5" style={{ color: "#f97316" }} />
          </div>
        </div>

        {/* Arrow from Healing back to Validation */}
        <svg
          className="w-5 h-5 rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: "#f97316" }}
        >
          <path
            d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export interface PipelineVisualizationProps {
  className?: string;
}

export function PipelineVisualization({
  className = "",
}: PipelineVisualizationProps) {
  const [activePhase, setActivePhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Cycle through active phases every 2 seconds
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % phases.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-full h-48 md:h-32 rounded-full blur-3xl opacity-10"
          style={{
            background: `linear-gradient(90deg, #a78bfa, #22d3d8, #22c55e, #60a5fa, #fbbf24, #f97316)`,
          }}
        />
      </div>

      {/* Section header */}
      <div className="text-center mb-8 md:mb-12">
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
          The 2L Pipeline
        </h3>
        <p className="text-sm md:text-base text-slate-400">
          Seven phases of autonomous software creation
        </p>
      </div>

      {/* Pipeline phases */}
      <div
        className={`relative transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Desktop: Horizontal layout */}
        <div className="hidden md:flex items-start justify-center gap-4 lg:gap-6 xl:gap-8 px-4">
          {phases.map((phase, index) => (
            <PhaseNode
              key={phase.name}
              phase={phase}
              index={index}
              isActive={activePhase === index}
              isLast={index === phases.length - 1}
              isMobile={false}
            />
          ))}
        </div>

        {/* Mobile: Vertical layout */}
        <div className="md:hidden flex flex-col gap-8 px-4">
          {phases.map((phase, index) => (
            <React.Fragment key={phase.name}>
              <PhaseNode
                phase={phase}
                index={index}
                isActive={activePhase === index}
                isLast={index === phases.length - 1}
                isMobile={true}
              />
              {/* Insert self-healing loop indicator after Healing phase */}
              {index === phases.length - 1 && <SelfHealingLoop isMobile={true} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Self-healing loop visual (desktop) */}
      <SelfHealingLoop isMobile={isMobile} />

      {/* Mission control status bar */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ background: phases[activePhase].color }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: phases[activePhase].color }}
            />
          </span>
          <span className="text-xs md:text-sm text-slate-300">
            Phase {activePhase + 1}:
          </span>
          <span
            className="text-xs md:text-sm font-medium"
            style={{ color: phases[activePhase].color }}
          >
            {phases[activePhase].name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PipelineVisualization;
