"use client";

import React from "react";
import {
  Rocket,
  Target,
  FileText,
  Hammer,
  Shield,
  RefreshCw,
  Play,
  Activity,
  LayoutDashboard,
} from "lucide-react";

interface SlashCommand {
  command: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const slashCommands: SlashCommand[] = [
  {
    command: "/2l-mvp",
    description: "Full autonomous execution from vision to deployment",
    icon: Rocket,
  },
  {
    command: "/2l-vision",
    description: "Create detailed requirements document",
    icon: Target,
  },
  {
    command: "/2l-plan",
    description: "Design iteration strategy and builder assignments",
    icon: FileText,
  },
  {
    command: "/2l-build",
    description: "Execute single iteration with parallel builders",
    icon: Hammer,
  },
  {
    command: "/2l-validate",
    description: "Run comprehensive quality gates",
    icon: Shield,
  },
  {
    command: "/2l-heal",
    description: "Auto-fix validation failures",
    icon: RefreshCw,
  },
  {
    command: "/2l-continue",
    description: "Resume interrupted session",
    icon: Play,
  },
  {
    command: "/2l-status",
    description: "Check current plan state",
    icon: Activity,
  },
  {
    command: "/2l-dashboard",
    description: "Launch real-time observability",
    icon: LayoutDashboard,
  },
];

export function SlashCommands() {
  return (
    <div className="py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Simple slash commands in Claude Code. Type a command, describe your
          vision, and watch agents build.
        </p>
      </div>

      {/* Commands grid - 2 columns on tablet, 3 on desktop */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {slashCommands.map((cmd) => {
          const Icon = cmd.icon;

          return (
            <div
              key={cmd.command}
              className="contemplative-card card-lift-premium p-4 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-400/30 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <code className="text-purple-300 font-mono text-sm">
                  {cmd.command}
                </code>
                <p className="text-slate-500 text-xs mt-1">{cmd.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage note */}
      <p className="text-center text-slate-600 text-xs mt-8">
        All commands run in Claude Code with full context awareness
      </p>
    </div>
  );
}

export default SlashCommands;
