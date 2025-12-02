"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

// Type definitions
export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "development";
  liveUrl?: string;
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
  return (
    <div
      className="
        bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 md:p-8
        hover:bg-white/[0.06] hover:border-purple-400/10 hover:-translate-y-1
        transition-all duration-300
        group
      "
    >
      {/* Header with title, subtitle, and status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex-shrink-0 px-3 py-1 bg-white/[0.02] border border-white/[0.06] rounded-full text-xs">
          <span
            className={`font-medium ${
              project.status === "live"
                ? "text-emerald-300"
                : "text-amber-300"
            }`}
          >
            {project.status === "live" ? "Live" : "Development"}
          </span>
        </div>
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

      {/* External Link */}
      {project.liveUrl && (
        <div className="flex justify-end">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
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
  );
}

export default PortfolioCard;
