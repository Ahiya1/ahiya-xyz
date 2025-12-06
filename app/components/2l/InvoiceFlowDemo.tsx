"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Terminal, CheckCircle2, Zap, Shield, Clock } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Types and Interfaces
// ═══════════════════════════════════════════════════════════════════════════

type Phase = "vision" | "planning" | "building" | "reveal";

interface TerminalLine {
  type: "command" | "output" | "phase" | "explorer" | "builder" | "success" | "progress";
  text: string;
}

interface BuilderProgress {
  name: string;
  progress: number;
  targetProgress: number;
  speed: number; // ms per percent
}

// ═══════════════════════════════════════════════════════════════════════════
// Terminal Content for Each Phase
// ═══════════════════════════════════════════════════════════════════════════

const visionLines: TerminalLine[] = [
  { type: "command", text: "$ /2l-vision" },
  { type: "output", text: "" },
  { type: "phase", text: "[Vision] InvoiceFlow - Modern invoicing for freelancers" },
  { type: "builder", text: "  \u2022 Hero section with value prop" },
  { type: "builder", text: "  \u2022 Features grid (3 benefits)" },
  { type: "builder", text: "  \u2022 Pricing table (3 tiers)" },
  { type: "builder", text: "  \u2022 Testimonials section" },
  { type: "builder", text: "  \u2022 Call-to-action footer" },
  { type: "output", text: "" },
  { type: "success", text: "Vision created: .2L/plan-1/vision.md" },
];

const planningLines: TerminalLine[] = [
  { type: "command", text: "$ /2l-plan" },
  { type: "output", text: "" },
  { type: "progress", text: "[Exploring] 3 master explorers analyzing..." },
  { type: "explorer", text: "  \u2192 Explorer-1: Component architecture" },
  { type: "explorer", text: "  \u2192 Explorer-2: Design system" },
  { type: "explorer", text: "  \u2192 Explorer-3: Content structure" },
  { type: "output", text: "" },
  { type: "phase", text: "[Planning] Master plan created" },
  { type: "builder", text: "  \u2192 5 parallel builders assigned" },
  { type: "builder", text: "  \u2192 47 components identified" },
];

const buildingStartLines: TerminalLine[] = [
  { type: "command", text: "$ /2l-mvp" },
  { type: "output", text: "" },
  { type: "progress", text: "[Building] 5 builders in parallel..." },
  { type: "output", text: "" },
];

const buildingEndLines: TerminalLine[] = [
  { type: "output", text: "" },
  { type: "progress", text: "[Validating] TypeScript \u2713 ESLint \u2713 Build \u2713" },
  { type: "success", text: "[Complete] InvoiceFlow ready \u2022 47 components \u2022 0 errors" },
];

// Builder configuration with varied speeds for realistic parallel work
const initialBuilders: BuilderProgress[] = [
  { name: "Builder-1: Hero section", progress: 0, targetProgress: 100, speed: 50 },
  { name: "Builder-2: Features grid", progress: 0, targetProgress: 100, speed: 55 },
  { name: "Builder-3: Pricing table", progress: 0, targetProgress: 100, speed: 45 },
  { name: "Builder-4: Testimonials", progress: 0, targetProgress: 100, speed: 60 },
  { name: "Builder-5: Footer + CTA", progress: 0, targetProgress: 100, speed: 52 },
];

// Color mapping based on line type
const lineTypeColors: Record<TerminalLine["type"], string> = {
  command: "text-blue-400",
  output: "text-slate-300",
  phase: "text-purple-400",
  explorer: "text-indigo-400",
  builder: "text-slate-400",
  success: "text-green-400",
  progress: "text-slate-400",
};

// ═══════════════════════════════════════════════════════════════════════════
// Animation Constants
// ═══════════════════════════════════════════════════════════════════════════

const TYPING_SPEED_COMMAND = 45;
const TYPING_SPEED_OUTPUT = 25;
const LINE_DELAY = 150;
const CURSOR_BLINK_INTERVAL = 530;
const PHASE_TRANSITION_DELAY = 800;
const REVEAL_DURATION = 1000;
const LOOP_DELAY = 5000;

// Phase durations in milliseconds
const VISION_DURATION = 5000;
const PLANNING_DURATION = 4000;
const BUILDING_DURATION = 6000;

// ═══════════════════════════════════════════════════════════════════════════
// Progress Bar Component
// ═══════════════════════════════════════════════════════════════════════════

interface ProgressBarProps {
  builder: BuilderProgress;
}

function ProgressBar({ builder }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-3 text-xs font-mono">
      <span className="text-slate-400 w-44 truncate">{builder.name}</span>
      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-100"
          style={{ width: `${builder.progress}%` }}
        />
      </div>
      <span className="text-green-400 w-10 text-right tabular-nums">
        {Math.round(builder.progress)}%
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// InvoiceFlow Preview Component (the beautiful output)
// ═══════════════════════════════════════════════════════════════════════════

function InvoiceFlowPreview() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Browser Chrome - macOS style */}
      <div className="bg-[#1a1f2e] px-4 py-2 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center">
          <div className="inline-flex items-center bg-slate-800/50 rounded-full px-4 py-1">
            <span className="text-xs text-slate-400 font-mono">invoiceflow.app</span>
          </div>
        </div>
      </div>

      {/* Website Preview Content */}
      <div className="bg-gradient-to-br from-[#0f1629] via-[#0d1220] to-[#0a0f1a] p-6 md:p-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs mb-4">
            <Zap className="w-3 h-3" />
            <span>Modern Invoicing</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-3">
            Get Paid Faster with Beautiful Invoices
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Professional invoices in seconds. Track payments, automate reminders.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Clock, label: "Auto-Reminders", color: "text-blue-400" },
            { icon: Shield, label: "Secure Payments", color: "text-green-400" },
            { icon: Zap, label: "Instant Send", color: "text-purple-400" },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5"
            >
              <feature.icon className={`w-5 h-5 mx-auto mb-2 ${feature.color}`} />
              <span className="text-xs text-slate-400">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { name: "Starter", price: "$0", highlight: false },
            { name: "Pro", price: "$19", highlight: true },
            { name: "Team", price: "$49", highlight: false },
          ].map((tier, i) => (
            <div
              key={i}
              className={`rounded-lg p-3 text-center ${
                tier.highlight
                  ? "bg-purple-500/10 border border-purple-400/30"
                  : "bg-white/[0.02] border border-white/5"
              }`}
            >
              <div className="text-xs text-slate-500 mb-1">{tier.name}</div>
              <div
                className={`text-lg font-bold ${
                  tier.highlight ? "text-purple-300" : "text-slate-300"
                }`}
              >
                {tier.price}
              </div>
              <div className="text-[10px] text-slate-600">/month</div>
            </div>
          ))}
        </div>

        {/* Success Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/30">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">
              Built by 2L in 4m 23s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════════════

export interface InvoiceFlowDemoProps {
  className?: string;
}

export function InvoiceFlowDemo({ className = "" }: InvoiceFlowDemoProps) {
  // State management
  const [phase, setPhase] = useState<Phase>("vision");
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [builders, setBuilders] = useState<BuilderProgress[]>(initialBuilders);
  const [showPreview, setShowPreview] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Refs for animation control
  const currentLineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const lastCharTimeRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get current phase lines
  const getCurrentLines = useCallback((): TerminalLine[] => {
    switch (phase) {
      case "vision":
        return visionLines;
      case "planning":
        return planningLines;
      case "building":
        return buildingStartLines;
      default:
        return [];
    }
  }, [phase]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      // Show final state immediately
      setDisplayedLines([...visionLines, ...planningLines, ...buildingStartLines, ...buildingEndLines]);
      setBuilders(initialBuilders.map((b) => ({ ...b, progress: 100 })));
      setShowPreview(true);
    }

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, CURSOR_BLINK_INTERVAL);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Reset everything for loop
  const resetAnimation = useCallback(() => {
    setPhase("vision");
    setDisplayedLines([]);
    setCurrentText("");
    setIsTyping(false);
    setBuilders(initialBuilders.map((b) => ({ ...b, progress: 0 })));
    setShowPreview(false);
    currentLineIndexRef.current = 0;
    charIndexRef.current = 0;
  }, []);

  // Phase transitions
  useEffect(() => {
    if (reducedMotion) return;

    const currentLines = getCurrentLines();

    // Check if current phase typing is complete
    if (currentLineIndexRef.current >= currentLines.length && !isTyping) {
      if (phaseTimeoutRef.current) {
        clearTimeout(phaseTimeoutRef.current);
      }

      phaseTimeoutRef.current = setTimeout(() => {
        switch (phase) {
          case "vision":
            setPhase("planning");
            currentLineIndexRef.current = 0;
            charIndexRef.current = 0;
            break;
          case "planning":
            setPhase("building");
            currentLineIndexRef.current = 0;
            charIndexRef.current = 0;
            break;
          case "building":
            // Building phase complete, transition to reveal
            // This is handled by the builder progress animation
            break;
          case "reveal":
            // Wait then loop
            setTimeout(resetAnimation, LOOP_DELAY);
            break;
        }
      }, PHASE_TRANSITION_DELAY);
    }

    return () => {
      if (phaseTimeoutRef.current) {
        clearTimeout(phaseTimeoutRef.current);
      }
    };
  }, [phase, isTyping, reducedMotion, getCurrentLines, resetAnimation]);

  // Main typing animation
  useEffect(() => {
    if (reducedMotion || phase === "reveal") return;

    const currentLines = getCurrentLines();

    if (currentLineIndexRef.current >= currentLines.length) {
      return;
    }

    const currentLine = currentLines[currentLineIndexRef.current];

    // Start typing after delay
    if (!isTyping && charIndexRef.current === 0) {
      const timeout = setTimeout(() => {
        setIsTyping(true);
      }, LINE_DELAY);
      return () => clearTimeout(timeout);
    }

    if (!isTyping) return;

    const typingSpeed =
      currentLine.type === "command" ? TYPING_SPEED_COMMAND : TYPING_SPEED_OUTPUT;

    const animate = (timestamp: number) => {
      if (timestamp - lastCharTimeRef.current >= typingSpeed) {
        lastCharTimeRef.current = timestamp;

        if (charIndexRef.current < currentLine.text.length) {
          charIndexRef.current++;
          setCurrentText(currentLine.text.slice(0, charIndexRef.current));
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Line complete
          setDisplayedLines((prev) => [...prev, currentLine]);
          currentLineIndexRef.current++;
          charIndexRef.current = 0;
          setCurrentText("");
          setIsTyping(false);
        }
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    lastCharTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase, isTyping, reducedMotion, getCurrentLines]);

  // Builder progress animation during building phase
  useEffect(() => {
    if (reducedMotion || phase !== "building") return;

    // Wait for initial building lines to be typed
    const currentLines = buildingStartLines;
    if (currentLineIndexRef.current < currentLines.length) return;

    const interval = setInterval(() => {
      setBuilders((prev) => {
        const updated = prev.map((builder) => ({
          ...builder,
          progress: Math.min(builder.progress + 2, builder.targetProgress),
        }));

        // Check if all builders are complete
        const allComplete = updated.every((b) => b.progress >= 100);
        if (allComplete) {
          clearInterval(interval);

          // Add completion lines and transition to reveal
          setTimeout(() => {
            setDisplayedLines((prev) => [...prev, ...buildingEndLines]);
            setTimeout(() => {
              setShowPreview(true);
              setPhase("reveal");
            }, REVEAL_DURATION);
          }, 300);
        }

        return updated;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [phase, reducedMotion, displayedLines.length]);

  // Auto-scroll terminal
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, currentText, builders]);

  // Get current line type for cursor
  const getCurrentLineType = (): TerminalLine["type"] => {
    const currentLines = getCurrentLines();
    if (currentLineIndexRef.current < currentLines.length) {
      return currentLines[currentLineIndexRef.current].type;
    }
    return "output";
  };

  return (
    <div className={`relative ${className}`}>
      {/* Terminal View */}
      <div
        className={`transition-all duration-700 ${
          showPreview ? "opacity-0 scale-95 absolute inset-0" : "opacity-100 scale-100"
        }`}
      >
        <div className="w-full max-w-3xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Terminal title bar */}
            <div className="bg-[#1a1f2e] px-4 py-2 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-slate-500 font-mono">2L Terminal</span>
              </div>
              <Terminal className="w-4 h-4 text-slate-500" />
            </div>

            {/* Terminal content */}
            <div
              ref={containerRef}
              className="bg-[#0d1220] p-4 font-mono text-sm h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
            >
              {/* Displayed lines */}
              {displayedLines.map((line, index) => (
                <div
                  key={index}
                  className={`${lineTypeColors[line.type]} leading-relaxed`}
                >
                  {line.text || "\u00A0"}
                </div>
              ))}

              {/* Currently typing line */}
              {isTyping && phase !== "reveal" && (
                <div
                  className={`${lineTypeColors[getCurrentLineType()]} leading-relaxed`}
                >
                  {currentText}
                  <span
                    className={`inline-block w-2 h-4 ml-0.5 bg-purple-400 align-middle transition-opacity duration-100 ${
                      showCursor ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Waiting cursor */}
              {!isTyping && phase !== "reveal" && !reducedMotion && (
                <div className="leading-relaxed">
                  <span
                    className={`inline-block w-2 h-4 bg-purple-400 align-middle transition-opacity duration-100 ${
                      showCursor ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Builder progress bars (during building phase) */}
              {phase === "building" &&
                currentLineIndexRef.current >= buildingStartLines.length && (
                  <div className="mt-2 space-y-2">
                    {builders.map((builder, index) => (
                      <ProgressBar key={index} builder={builder} />
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview View */}
      <div
        className={`transition-all duration-700 ${
          showPreview
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-8 absolute inset-0 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-3xl mx-auto">
          <InvoiceFlowPreview />
        </div>
      </div>

      {/* Phase indicator - subtle dots */}
      {!reducedMotion && (
        <div className="flex justify-center gap-2 mt-6">
          {(["vision", "planning", "building", "reveal"] as Phase[]).map((p) => (
            <div
              key={p}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                phase === p
                  ? "bg-purple-400 scale-125"
                  : displayedLines.length > 0 &&
                    (["vision", "planning", "building", "reveal"].indexOf(p) <
                      ["vision", "planning", "building", "reveal"].indexOf(phase))
                  ? "bg-green-400"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default InvoiceFlowDemo;
