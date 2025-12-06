"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  FileText,
  Hammer,
  GitMerge,
  Shield,
  RefreshCw,
  Telescope,
  ChevronDown,
} from "lucide-react";

// Agent type definitions with complete metadata
interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  glow: string;
  role: string;
  detail: string;
  why: string;
}

const agents: Agent[] = [
  {
    id: "master-explorers",
    name: "Master Explorers",
    icon: Telescope,
    glow: "#22d3d8", // cyan
    role: "Strategic analysis before any code",
    detail:
      "Spawn 2-4 based on project complexity. Focus areas: Architecture, Dependencies, UX, Performance. Output: Exploration reports that shape the master plan.",
    why: "Measure twice, cut once",
  },
  {
    id: "explorers",
    name: "Explorers",
    icon: Search,
    glow: "#67e8f9", // lighter cyan
    role: "Deep codebase analysis per iteration",
    detail:
      "2-3 per iteration. Map existing patterns, file structures, dependencies, integration points. Builders don't guess - they know.",
    why: "Knowledge before action",
  },
  {
    id: "planners",
    name: "Planners",
    icon: FileText,
    glow: "#a78bfa", // purple
    role: "Architect the solution with precision",
    detail:
      "Creates 4 artifacts: overview.md, tech-stack.md, patterns.md, builder-tasks.md. Assigns parallel work with conflict awareness.",
    why: "Coordination prevents merge hell",
  },
  {
    id: "builders",
    name: "Builders",
    icon: Hammer,
    glow: "#22c55e", // green
    role: "Parallel feature development",
    detail:
      "2-5 builders execute simultaneously. Can SPLIT if task is too complex. Follow patterns.md for consistency across all outputs.",
    why: "Speed without style drift",
  },
  {
    id: "integrators",
    name: "Integrators",
    icon: GitMerge,
    glow: "#60a5fa", // blue
    role: "Systematic merge of parallel work",
    detail:
      "Zone-based integration strategy. Up to 3 rounds if conflicts detected. Output: Cohesive codebase, not Frankenstein code.",
    why: "Parallel work needs systematic merging",
  },
  {
    id: "validators",
    name: "Validators",
    icon: Shield,
    glow: "#fbbf24", // gold
    role: "Honest quality assessment",
    detail:
      "5-tier system: PASS, UNCERTAIN, PARTIAL, INCOMPLETE, FAIL. Runs TypeScript, ESLint, Build, Tests. 80% confidence rule.",
    why: "Ship confidence, not hope",
  },
  {
    id: "healers",
    name: "Healers",
    icon: RefreshCw,
    glow: "#f97316", // orange
    role: "Self-correcting when things fail",
    detail:
      "Healing Explorers analyze root causes first. Fix by category in parallel. Up to 2 rounds before escalation to humans.",
    why: "Most failures are fixable without humans",
  },
];

interface AgentCardProps {
  agent: Agent;
  index: number;
  isVisible: boolean;
}

function AgentCard({ agent, index, isVisible }: AgentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = agent.icon;

  // Staggered animation delay
  const animationDelay = `${index * 100}ms`;

  return (
    <div
      className={`group relative transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: animationDelay }}
    >
      {/* Card container */}
      <div
        className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-400 ${
          isExpanded ? "agent-card-expanded" : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(20px)",
          border: `1px solid rgba(255, 255, 255, 0.08)`,
          boxShadow: isExpanded
            ? `0 0 40px ${agent.glow}30, 0 8px 32px rgba(0, 0, 0, 0.3)`
            : "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
        onMouseEnter={(e) => {
          if (!isExpanded) {
            e.currentTarget.style.boxShadow = `0 0 30px ${agent.glow}25, 0 12px 40px rgba(0, 0, 0, 0.4)`;
            e.currentTarget.style.borderColor = `${agent.glow}40`;
          }
        }}
        onMouseLeave={(e) => {
          if (!isExpanded) {
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
          }
        }}
      >
        {/* Subtle breathing animation overlay */}
        <div
          className="absolute inset-0 pointer-events-none agent-card-breathe"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${agent.glow}08, transparent 70%)`,
          }}
        />

        {/* Card content */}
        <div className="relative p-6">
          {/* Icon with glow */}
          <div className="mb-4 relative">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: `${agent.glow}15`,
                border: `1px solid ${agent.glow}30`,
                boxShadow: `0 0 20px ${agent.glow}20`,
              }}
            >
              <Icon
                className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
                style={{ color: agent.glow }}
              />
            </div>
            {/* Icon ambient glow */}
            <div
              className="absolute inset-0 rounded-xl blur-xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
              style={{ background: agent.glow }}
            />
          </div>

          {/* Agent name */}
          <h3
            className="text-lg font-semibold mb-2 transition-colors duration-300"
            style={{ color: "#f8fafc" }}
          >
            {agent.name}
          </h3>

          {/* Role description */}
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            {agent.role}
          </p>

          {/* Expand indicator */}
          <div
            className={`flex items-center gap-1 text-xs transition-all duration-300 ${
              isExpanded ? "opacity-0" : "opacity-60"
            }`}
            style={{ color: agent.glow }}
          >
            <span>Details</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Expanded content */}
          <div
            className={`overflow-hidden transition-all duration-400 ease-out ${
              isExpanded ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            {/* Divider */}
            <div
              className="w-full h-px mb-4"
              style={{
                background: `linear-gradient(90deg, transparent, ${agent.glow}30, transparent)`,
              }}
            />

            {/* Detail text */}
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {agent.detail}
            </p>

            {/* Philosophy quote */}
            <div
              className="px-4 py-3 rounded-lg"
              style={{
                background: `${agent.glow}08`,
                borderLeft: `3px solid ${agent.glow}50`,
              }}
            >
              <p className="text-sm font-medium" style={{ color: agent.glow }}>
                Why:{" "}
                <span className="font-normal text-slate-300 italic">
                  "{agent.why}"
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface AgentCardsProps {
  className?: string;
}

export function AgentCards({ className = "" }: AgentCardsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="heading-xl text-white mb-4">The Agent Command Center</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Seven specialized agent types work in concert. Each has a distinct
          role, purpose, and philosophy. Click any card to explore.
        </p>
      </div>

      {/* Background command center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[400px] rounded-full blur-3xl opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, rgba(168, 85, 247, 0.4), rgba(96, 165, 250, 0.2), transparent)",
          }}
        />
      </div>

      {/* Agent cards grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-slate-600 text-xs mt-10">
        Each agent spawns as needed. Coordination happens automatically.
      </p>
    </div>
  );
}

export default AgentCards;
