"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Terminal } from "lucide-react";

// Terminal line types with semantic coloring
interface TerminalLine {
  type: "command" | "output" | "spawn" | "success" | "phase" | "progress";
  text: string;
  delay: number; // ms before this line starts typing
}

// Customer portal B2B demo sequence
const terminalSequence: TerminalLine[] = [
  { type: "command", text: "$ /2l-mvp customer-portal", delay: 0 },
  { type: "output", text: "", delay: 500 },
  { type: "phase", text: "[Vision] Customer portal with auth, dashboard, API", delay: 400 },
  { type: "progress", text: "[Exploring] Analyzing requirements...", delay: 600 },
  { type: "output", text: "", delay: 500 },
  { type: "phase", text: "[Planning] 3 parallel builders assigned", delay: 400 },
  { type: "spawn", text: "  -> Builder-1: Authentication system", delay: 200 },
  { type: "spawn", text: "  -> Builder-2: Dashboard components", delay: 150 },
  { type: "spawn", text: "  -> Builder-3: REST API endpoints", delay: 150 },
  { type: "output", text: "", delay: 600 },
  { type: "progress", text: "[Building] Executing in parallel...", delay: 800 },
  { type: "output", text: "", delay: 500 },
  { type: "progress", text: "[Validating] Running 47 tests...", delay: 600 },
  { type: "output", text: "", delay: 400 },
  { type: "success", text: "[Complete] All tests passing. Ready to deploy.", delay: 500 },
];

// Color mapping based on line type - follows patterns.md
const lineTypeColors: Record<TerminalLine["type"], string> = {
  command: "text-blue-400",     // #60a5fa - user commands
  output: "text-slate-300",     // #cbd5e1 - regular output
  spawn: "text-green-400",      // #22c55e - agent spawn events
  success: "text-green-400",    // #22c55e - success messages
  phase: "text-purple-400",     // #a78bfa - phase changes
  progress: "text-slate-400",   // #94a3b8 - progress indicators
};

// Constants for animation timing
const TYPING_SPEED_COMMAND = 60; // ms per char for commands (slower for emphasis)
const TYPING_SPEED_OUTPUT = 30;  // ms per char for output (faster)
const CURSOR_BLINK_INTERVAL = 530; // ms for cursor blink
const LOOP_DELAY = 3000; // ms pause before looping

export function TerminalAnimation() {
  // State for displayed content
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Refs for animation control
  const animationRef = useRef<number | null>(null);
  const charIndexRef = useRef(0);
  const lastCharTimeRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTypingRef = useRef(false);

  // Check for reduced motion preference on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    // If reduced motion, show all lines immediately
    if (mediaQuery.matches) {
      setDisplayedLines(terminalSequence);
      setCurrentLineIndex(terminalSequence.length);
    }

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        // Cancel any ongoing animation
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        setDisplayedLines(terminalSequence);
        setCurrentLineIndex(terminalSequence.length);
      }
    };

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

  // Reset animation helper
  const resetAnimation = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentText("");
    charIndexRef.current = 0;
    isTypingRef.current = false;
    setIsTyping(false);
  }, []);

  // Main typing animation
  useEffect(() => {
    if (reducedMotion) return;

    // All lines completed - wait then loop
    if (currentLineIndex >= terminalSequence.length) {
      const timeout = setTimeout(resetAnimation, LOOP_DELAY);
      return () => clearTimeout(timeout);
    }

    const currentLine = terminalSequence[currentLineIndex];

    // Wait for line delay before starting to type
    if (!isTypingRef.current && charIndexRef.current === 0) {
      const timeout = setTimeout(() => {
        isTypingRef.current = true;
        setIsTyping(true);
      }, currentLine.delay);
      return () => clearTimeout(timeout);
    }

    if (!isTypingRef.current) return;

    // Typing animation using requestAnimationFrame
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
          // Line complete - add to displayed lines and move to next
          setDisplayedLines((prev) => [...prev, currentLine]);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentText("");
          charIndexRef.current = 0;
          isTypingRef.current = false;
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
  }, [currentLineIndex, isTyping, reducedMotion, resetAnimation]);

  // Auto-scroll to keep latest content visible
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, currentText]);

  // Get current line type for cursor coloring
  const currentLineType =
    currentLineIndex < terminalSequence.length
      ? terminalSequence[currentLineIndex].type
      : "output";

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Terminal window with macOS-style chrome */}
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Title bar with traffic lights */}
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

        {/* Terminal content area */}
        <div
          ref={containerRef}
          className="bg-[#0d1220] p-4 font-mono text-sm h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
        >
          {/* Previously completed lines */}
          {displayedLines.map((line, index) => (
            <div
              key={index}
              className={`${lineTypeColors[line.type]} leading-relaxed`}
            >
              {line.text || "\u00A0"}
            </div>
          ))}

          {/* Currently typing line with cursor */}
          {isTyping && currentLineIndex < terminalSequence.length && (
            <div
              className={`${lineTypeColors[currentLineType]} leading-relaxed`}
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

          {/* Blinking cursor when waiting for next line */}
          {!isTyping && currentLineIndex < terminalSequence.length && !reducedMotion && (
            <div className="leading-relaxed">
              <span
                className={`inline-block w-2 h-4 bg-purple-400 align-middle transition-opacity duration-100 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalAnimation;
