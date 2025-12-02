"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Sparkles, Wallet, BarChart3, FlaskConical } from "lucide-react";

// Project visual configs
const projectVisuals: Record<string, { gradient: string; icon: React.ReactNode; pattern: string }> = {
  "mirror-of-dreams": {
    gradient: "from-purple-600/40 via-violet-500/30 to-indigo-600/20",
    icon: <Sparkles className="w-10 h-10 text-purple-300" />,
    pattern: "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
  },
  "wealth": {
    gradient: "from-emerald-600/40 via-teal-500/30 to-cyan-600/20",
    icon: <Wallet className="w-10 h-10 text-emerald-300" />,
    pattern: "radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
  },
  "statviz": {
    gradient: "from-blue-600/40 via-sky-500/30 to-cyan-600/20",
    icon: <BarChart3 className="w-10 h-10 text-blue-300" />,
    pattern: "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
  },
  "ai-research-pipeline": {
    gradient: "from-amber-600/40 via-orange-500/30 to-rose-600/20",
    icon: <FlaskConical className="w-10 h-10 text-amber-300" />,
    pattern: "radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)",
  },
};

// Type definitions
export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "development";
  liveUrl?: string;
  detailUrl: string;
  techStack: string[];
}

export interface PortfolioCardProps {
  project: PortfolioProject;
}

/**
 * PortfolioCard Component
 *
 * A glass-morphism card component for displaying portfolio projects.
 * Features smooth hover transitions, status badges, and tech stack display.
 */
export function PortfolioCard({ project }: PortfolioCardProps) {
  const visuals = projectVisuals[project.id] || {
    gradient: "from-slate-600/40 via-slate-500/30 to-slate-600/20",
    icon: <Sparkles className="w-10 h-10 text-slate-300" />,
    pattern: "radial-gradient(circle at 50% 50%, rgba(148, 163, 184, 0.15) 0%, transparent 50%)",
  };

  return (
    <Link href={project.detailUrl}>
      <div
        className="
          bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden
          hover:bg-white/[0.06] hover:border-purple-400/20 hover:-translate-y-1
          transition-all duration-300
          group cursor-pointer
        "
      >
        {/* Visual Header */}
        <div
          className={`relative h-32 bg-gradient-to-br ${visuals.gradient} flex items-center justify-center`}
          style={{ backgroundImage: visuals.pattern }}
        >
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }} />

          {/* Icon */}
          <div className="relative z-10 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
            {visuals.icon}
          </div>

          {/* Status Badge - positioned in header */}
          <div className="absolute top-3 right-3 px-3 py-1 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full text-xs">
            <span
              className={`font-medium ${
                project.status === "live"
                  ? "text-emerald-300"
                  : "text-amber-300"
              }`}
            >
              {project.status === "live" ? "Live" : "In Dev"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header with title and subtitle */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-300 leading-relaxed mb-6 text-sm">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/[0.02] border border-white/[0.06] rounded-md text-xs text-slate-400 hover:text-slate-300 hover:bg-white/[0.04] transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* External Link - prevent propagation to allow card link */}
          {project.liveUrl && (
            <div className="flex justify-end">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="
                  inline-flex items-center space-x-2
                  px-4 py-2 bg-emerald-500/12 border border-emerald-400/20 rounded-lg
                  text-xs text-emerald-300 font-medium
                  hover:bg-emerald-500/20 hover:scale-105
                  transition-all duration-300
                "
              >
                <span>Visit Site</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default PortfolioCard;
