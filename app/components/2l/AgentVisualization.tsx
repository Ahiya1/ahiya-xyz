"use client";

import React, { useState } from "react";
import {
  Search,
  FileText,
  Hammer,
  GitMerge,
  Shield,
  RefreshCw,
} from "lucide-react";

// Agent type configuration with distinct colors and icons
const agentTypes = [
  {
    name: "Explorer",
    icon: Search,
    color: "#a78bfa", // purple
    description: "Deep codebase analysis",
  },
  {
    name: "Planner",
    icon: FileText,
    color: "#818cf8", // indigo
    description: "Implementation specs",
  },
  {
    name: "Builder",
    icon: Hammer,
    color: "#c084fc", // light purple
    description: "Parallel development",
  },
  {
    name: "Integrator",
    icon: GitMerge,
    color: "#60a5fa", // blue
    description: "Systematic merging",
  },
  {
    name: "Validator",
    icon: Shield,
    color: "#22c55e", // green
    description: "Quality gates",
  },
  {
    name: "Healer",
    icon: RefreshCw,
    color: "#f472b6", // pink
    description: "Self-correction",
  },
];

interface AgentOrbProps {
  agent: (typeof agentTypes)[number];
  index: number;
}

function AgentOrb({ agent, index }: AgentOrbProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate animation delay based on index for staggered effect
  const animationDelay = `${index * 0.5}s`;

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Orb container with float animation */}
      <div
        className="agent-orb-float relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
        style={{
          animationDelay,
          background: `radial-gradient(circle at 30% 30%, ${agent.color}40, ${agent.color}15)`,
          border: `2px solid ${agent.color}50`,
          boxShadow: `0 0 30px ${agent.color}40, inset 0 0 20px ${agent.color}20`,
        }}
      >
        {/* Glow effect that intensifies on hover */}
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.8 : 0.3,
            background: `radial-gradient(circle, ${agent.color}60, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />

        {/* Icon */}
        <agent.icon
          className="relative z-10 w-6 h-6 md:w-8 md:h-8 transition-colors duration-300"
          style={{ color: isHovered ? "#ffffff" : agent.color }}
        />
      </div>

      {/* Label tooltip on hover */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 -bottom-12 md:-bottom-14 transition-all duration-300 pointer-events-none ${
          isHovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
      >
        <div
          className="px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap backdrop-blur-md"
          style={{
            background: `${agent.color}20`,
            border: `1px solid ${agent.color}40`,
            color: agent.color,
          }}
        >
          {agent.name}
        </div>
        {/* Description on second line */}
        <div className="text-center text-[10px] md:text-xs text-slate-500 mt-1">
          {agent.description}
        </div>
      </div>
    </div>
  );
}

export interface AgentVisualizationProps {
  className?: string;
}

export function AgentVisualization({ className = "" }: AgentVisualizationProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.4), rgba(96, 165, 250, 0.2), transparent)",
          }}
        />
      </div>

      {/* Agent orbs in a circular/hexagonal arrangement */}
      <div className="relative flex flex-wrap justify-center items-center gap-6 md:gap-8 py-8">
        {/* Top row - 3 orbs */}
        <div className="w-full flex justify-center gap-8 md:gap-12">
          {agentTypes.slice(0, 3).map((agent, index) => (
            <AgentOrb key={agent.name} agent={agent} index={index} />
          ))}
        </div>

        {/* Bottom row - 3 orbs */}
        <div className="w-full flex justify-center gap-8 md:gap-12 mt-4 md:mt-8">
          {agentTypes.slice(3, 6).map((agent, index) => (
            <AgentOrb key={agent.name} agent={agent} index={index + 3} />
          ))}
        </div>
      </div>

      {/* Connection lines between orbs (decorative) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default AgentVisualization;
