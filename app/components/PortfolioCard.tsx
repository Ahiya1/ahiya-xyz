"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, BarChart3, FlaskConical, Terminal } from "lucide-react";

// Custom hook for scroll-triggered fade-in
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Project visual configs - refined color palette
const projectVisuals: Record<string, {
  accent: string;
  accentLight: string;
  glow: string;
  icon: React.ReactNode;
}> = {
  "mirror-of-dreams": {
    accent: "rgb(168, 85, 247)",
    accentLight: "rgb(196, 141, 255)",
    glow: "rgba(168, 85, 247, 0.4)",
    icon: <Sparkles className="w-7 h-7" />,
  },
  "selahreach": {
    accent: "rgb(139, 92, 246)",
    accentLight: "rgb(167, 139, 250)",
    glow: "rgba(139, 92, 246, 0.4)",
    icon: <Terminal className="w-7 h-7" />,
  },
  "statviz": {
    accent: "rgb(59, 130, 246)",
    accentLight: "rgb(96, 165, 250)",
    glow: "rgba(59, 130, 246, 0.4)",
    icon: <BarChart3 className="w-7 h-7" />,
  },
  "ai-research-pipeline": {
    accent: "rgb(251, 146, 60)",
    accentLight: "rgb(253, 186, 116)",
    glow: "rgba(251, 146, 60, 0.4)",
    icon: <FlaskConical className="w-7 h-7" />,
  },
};

const defaultVisuals = {
  accent: "rgb(148, 163, 184)",
  accentLight: "rgb(203, 213, 225)",
  glow: "rgba(148, 163, 184, 0.4)",
  icon: <Sparkles className="w-7 h-7" />,
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
  index?: number;
}

export function PortfolioCard({ project, index = 0 }: PortfolioCardProps) {
  const visuals = projectVisuals[project.id] || defaultVisuals;
  const { ref, isVisible } = useScrollReveal();
  const delay = index * 100; // 100ms stagger between cards

  return (
    <Link href={project.detailUrl}>
      <div
        ref={ref}
        style={{ transitionDelay: `${delay}ms` }}
        className={`group relative h-full transition-all duration-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: visuals.glow }}
        />

        {/* Card */}
        <div className="relative h-full bg-[#0d1220] border border-white/[0.08] rounded-3xl overflow-hidden group-hover:border-white/[0.15] transition-all duration-500">

          {/* Visual Header */}
          <div className="relative h-44 overflow-hidden">
            {/* Background gradient */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${visuals.accent}, transparent)`,
              }}
            />

            {/* Floating orbs */}
            <div
              className="absolute w-32 h-32 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"
              style={{
                background: visuals.accent,
                top: "-20%",
                right: "10%",
              }}
            />
            <div
              className="absolute w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"
              style={{
                background: visuals.accentLight,
                bottom: "10%",
                left: "5%",
              }}
            />

            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(${visuals.accent} 1px, transparent 1px),
                  linear-gradient(90deg, ${visuals.accent} 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Icon container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative p-5 rounded-2xl transition-all duration-500 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${visuals.accent}15, ${visuals.accent}05)`,
                  border: `1px solid ${visuals.accent}30`,
                  boxShadow: `0 0 40px ${visuals.glow}`,
                }}
              >
                <div style={{ color: visuals.accentLight }}>
                  {visuals.icon}
                </div>
              </div>
            </div>

            {/* Status pill */}
            <div className="absolute top-4 right-4">
              <div
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md
                  ${project.status === "live"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }
                `}
              >
                {project.status === "live" ? "Live" : "In Dev"}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-5">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  {project.subtitle}
                </p>
              </div>
              <div
                className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{
                  background: `${visuals.accent}15`,
                  color: visuals.accentLight,
                }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-2">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs text-slate-500 bg-white/[0.03] border border-white/[0.05]"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2.5 py-1 rounded-md text-xs text-slate-600">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PortfolioCard;
