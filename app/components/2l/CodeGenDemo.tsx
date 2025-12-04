"use client";

import React, { useState, useEffect, useRef } from "react";
import { Code } from "lucide-react";

// Code to display - showing actual component code
const codeLines = [
  "// Building the AgentVisualization component",
  'import React from "react";',
  "",
  "const agentTypes = [",
  '  { id: "explorer", color: "#a78bfa" },',
  '  { id: "builder", color: "#c084fc" },',
  '  { id: "validator", color: "#22c55e" },',
  "];",
  "",
  "export function AgentVisualization() {",
  "  return (",
  '    <div className="flex gap-8">',
  "      {agentTypes.map((agent) => (",
  "        <AgentOrb key={agent.id} {...agent} />",
  "      ))}",
  "    </div>",
  "  );",
  "}",
];

// Simple syntax highlighting - returns JSX directly
function highlightLine(line: string): React.ReactNode {
  if (!line) return "\u00A0";

  // Track parts to render
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  // Comments
  const commentMatch = remaining.match(/^(.*?)(\/\/.*)$/);
  if (commentMatch) {
    remaining = commentMatch[1];
    parts.push(
      <span key={`comment-${key++}`} className="text-slate-500">
        {commentMatch[2]}
      </span>
    );
  }

  // Process remaining text
  let pos = 0;
  const result: React.ReactNode[] = [];

  while (pos < remaining.length) {
    // Check for keywords
    const keywordMatch = remaining.slice(pos).match(/^(import|from|export|function|return|const)\b/);
    if (keywordMatch) {
      result.push(
        <span key={`kw-${key++}`} className="text-purple-400">
          {keywordMatch[1]}
        </span>
      );
      pos += keywordMatch[1].length;
      continue;
    }

    // Check for strings (double quotes)
    if (remaining[pos] === '"') {
      const endQuote = remaining.indexOf('"', pos + 1);
      if (endQuote !== -1) {
        const str = remaining.slice(pos, endQuote + 1);
        result.push(
          <span key={`str-${key++}`} className="text-green-300">
            {str}
          </span>
        );
        pos = endQuote + 1;
        continue;
      }
    }

    // Check for punctuation
    if (/[{}()\[\];,:.=<>]/.test(remaining[pos])) {
      result.push(
        <span key={`punc-${key++}`} className="text-slate-400">
          {remaining[pos]}
        </span>
      );
      pos++;
      continue;
    }

    // Regular text
    result.push(
      <span key={`txt-${key++}`} className="text-slate-200">
        {remaining[pos]}
      </span>
    );
    pos++;
  }

  return (
    <>
      {result}
      {parts}
    </>
  );
}

export function CodeGenDemo() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [currentLineChars, setCurrentLineChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const charIndexRef = useRef(0);
  const lastCharTimeRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      setDisplayedLines(codeLines.length);
    }
  }, []);

  // Cursor blink
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Typing animation
  useEffect(() => {
    if (reducedMotion) return;

    if (displayedLines >= codeLines.length) {
      // Loop after delay
      const timeout = setTimeout(() => {
        setDisplayedLines(0);
        setCurrentLineChars(0);
        charIndexRef.current = 0;
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const currentLine = codeLines[displayedLines];
    const typingSpeed = currentLine === "" ? 100 : 40; // Faster for code

    const animate = (timestamp: number) => {
      if (timestamp - lastCharTimeRef.current >= typingSpeed) {
        lastCharTimeRef.current = timestamp;

        if (charIndexRef.current < currentLine.length) {
          charIndexRef.current++;
          setCurrentLineChars(charIndexRef.current);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Line complete
          setDisplayedLines((prev) => prev + 1);
          charIndexRef.current = 0;
          setCurrentLineChars(0);
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
  }, [displayedLines, reducedMotion]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Editor window */}
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Title bar - macOS style chrome */}
        <div className="bg-[#1a1f2e] px-4 py-2 flex items-center gap-2 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-slate-500 font-mono">
              AgentVisualization.tsx
            </span>
          </div>
          <Code className="w-4 h-4 text-slate-500" />
        </div>

        {/* Code content - dark background */}
        <div className="bg-[#0d1220] p-4 font-mono text-xs md:text-sm overflow-x-auto">
          {/* Line numbers + code */}
          <div className="flex">
            {/* Line numbers */}
            <div
              className="pr-4 text-slate-600 select-none text-right"
              style={{ minWidth: "2rem" }}
            >
              {codeLines
                .slice(0, Math.min(displayedLines + 1, codeLines.length))
                .map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
            </div>

            {/* Code */}
            <div className="flex-1">
              {/* Fully displayed lines */}
              {codeLines.slice(0, displayedLines).map((line, i) => (
                <div key={i} className="whitespace-pre">
                  {highlightLine(line)}
                </div>
              ))}

              {/* Currently typing line */}
              {displayedLines < codeLines.length && (
                <div className="whitespace-pre">
                  {highlightLine(
                    codeLines[displayedLines].slice(0, currentLineChars)
                  )}
                  {!reducedMotion && (
                    <span
                      className={`inline-block w-2 h-4 ml-0.5 bg-purple-400 align-middle transition-opacity duration-100 ${
                        showCursor ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-slate-500 text-xs mt-4">
        AI agent writing component code in real-time
      </p>
    </div>
  );
}

export default CodeGenDemo;
