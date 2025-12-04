# Builder Task Breakdown - Iteration 11

**Plan:** plan-9
**Iteration:** 11
**Created:** 2025-12-04
**Strategy:** 5 parallel builders

---

## Overview

5 primary builders will work in parallel on distinct files with clear boundaries. All builders can start immediately except Builder-5 which should wait for the component files to be created.

---

## Builder-1: Critical Fixes & Metrics

### Priority
**P0** (Must complete)

### Scope

Fix critical bugs and update metrics to real values:
1. Fix Navigation.tsx logo bug (line 60: `href="#"` must become `<Link href="/">`)
2. Fix false "works without internet" claim in page.tsx (lines 167-169)
3. Update metrics to real values (8 plans, 10 iterations, 206+ agents)

### Complexity Estimate
**LOW** - Simple content changes, no new logic

### Success Criteria

- [ ] Clicking "Ahiya" logo on /2l page navigates to homepage
- [ ] "Graceful Degradation" accordion content is truthful (no internet claim removed)
- [ ] Plans metric shows 8
- [ ] Iterations metric shows 10
- [ ] No TypeScript errors
- [ ] `npm run lint` passes

### Files to Modify

**1. `/app/components/Navigation.tsx`**
- Line 60: Change logo link

**Current (line 60):**
```tsx
<a href="#" className="flex items-center space-x-3 group" aria-label="Go to homepage">
```

**Change to:**
```tsx
<Link href="/" className="flex items-center space-x-3 group" aria-label="Go to homepage">
```

Note: `Link` is already imported on line 4, so just change `<a href="#">` to `<Link href="/">` and update the closing tag from `</a>` to `</Link>`.

**2. `/app/2l/page.tsx`**

**Fix 1 - Lines 167-169 (false claim):**

Current:
```tsx
{
  name: "Graceful Degradation",
  content:
    "2L works without internet. Works without external dependencies. Core functionality runs entirely local. Optional features fail safely without blocking progress.",
},
```

Change to:
```tsx
{
  name: "Graceful Degradation",
  content:
    "Optional features like the event dashboard fail safely without blocking builds. Core pipeline continues even if observability tools are unavailable. Non-blocking event logging ensures builds are never slowed.",
},
```

**Fix 2 - Line 180 (plans metric):**

Current:
```tsx
{ label: "Plans Completed", value: 7, isNumeric: true },
```

Change to:
```tsx
{ label: "Plans Completed", value: 8, isNumeric: true },
```

**Fix 3 - Line 194 (useCountUp target):**

Current:
```tsx
const plansCount = useCountUp(7, 1500);
```

Change to:
```tsx
const plansCount = useCountUp(8, 1500);
```

### Dependencies

- **Depends on:** Nothing
- **Blocks:** Nothing (Builder-5 will integrate, but no code dependencies)

### Testing Requirements

After changes:
1. Navigate to `/2l` page
2. Click the "Ahiya" logo
3. Verify it navigates to homepage
4. Scroll to "Under the Hood" section
5. Expand "Graceful Degradation" accordion
6. Verify no mention of "without internet"
7. Scroll to "Built with 2L" section
8. Verify "Plans Completed" shows 8

---

## Builder-2: Terminal Animation Component

### Priority
**P1** (Core feature)

### Scope

Create a terminal animation component that shows 2L commands running with typing effect, spawning agents, and validation:
- Real 2L command sequences from explorer reports
- Character-by-character typing effect (50-80ms per character)
- Color-coded output (commands blue, spawns green, phases purple)
- Progress indicators
- Looping behavior

### Complexity Estimate
**MEDIUM** - Custom animation hook, multi-line state management

### Success Criteria

- [ ] Component renders terminal window with dark background
- [ ] Commands type character by character
- [ ] Output appears with appropriate delays
- [ ] Different line types have different colors
- [ ] Animation loops after completion
- [ ] Cursor blinks during typing
- [ ] Mobile responsive (scrollable on small screens)
- [ ] Respects `prefers-reduced-motion`

### Files to Create

**1. `/app/components/2l/TerminalAnimation.tsx`**

```tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

// Terminal line types
interface TerminalLine {
  type: 'command' | 'output' | 'spawn' | 'success' | 'phase' | 'progress';
  text: string;
  delay: number;
}

// Real 2L command sequence from exploration
const terminalSequence: TerminalLine[] = [
  { type: 'command', text: '$ /2l-mvp', delay: 0 },
  { type: 'output', text: '', delay: 300 },
  { type: 'output', text: 'Plan plan-9: 2L Command Center Experience', delay: 400 },
  { type: 'output', text: 'Complexity: COMPLEX', delay: 300 },
  { type: 'output', text: 'Spawning 4 master explorers...', delay: 500 },
  { type: 'output', text: '', delay: 200 },
  { type: 'spawn', text: '[SPAWN] Master-Explorer-1: Architecture', delay: 200 },
  { type: 'spawn', text: '[SPAWN] Master-Explorer-2: Dependencies', delay: 150 },
  { type: 'spawn', text: '[SPAWN] Master-Explorer-3: Integration', delay: 150 },
  { type: 'spawn', text: '[SPAWN] Master-Explorer-4: Performance', delay: 150 },
  { type: 'output', text: '', delay: 800 },
  { type: 'success', text: '[COMPLETE] 4/4 explorers done', delay: 400 },
  { type: 'output', text: '', delay: 300 },
  { type: 'phase', text: 'Phase: Building', delay: 500 },
  { type: 'spawn', text: '[SPAWN] Builder-1: Critical Fixes', delay: 200 },
  { type: 'spawn', text: '[SPAWN] Builder-2: Terminal Animation', delay: 150 },
  { type: 'spawn', text: '[SPAWN] Builder-3: Agent Visualization', delay: 150 },
  { type: 'spawn', text: '[SPAWN] Builder-4: Code Gen Demo', delay: 150 },
  { type: 'spawn', text: '[SPAWN] Builder-5: Integration', delay: 150 },
  { type: 'output', text: '', delay: 1000 },
  { type: 'success', text: '[COMPLETE] 5/5 builders done', delay: 400 },
  { type: 'output', text: '', delay: 300 },
  { type: 'phase', text: 'Phase: Validation', delay: 500 },
  { type: 'progress', text: 'TypeScript: npx tsc --noEmit...', delay: 300 },
  { type: 'success', text: 'TypeScript: OK', delay: 400 },
  { type: 'progress', text: 'Build: npm run build...', delay: 300 },
  { type: 'success', text: 'Build: OK', delay: 400 },
  { type: 'progress', text: 'Lint: npm run lint...', delay: 300 },
  { type: 'success', text: 'Lint: OK', delay: 400 },
  { type: 'output', text: '', delay: 300 },
  { type: 'success', text: 'Validation: PASS (95% confidence)', delay: 500 },
  { type: 'output', text: 'Auto-committing: 2l-plan-9-iter-11', delay: 400 },
  { type: 'success', text: 'Iteration complete!', delay: 500 },
];

// Line type to color class mapping
const lineTypeColors: Record<string, string> = {
  command: 'text-blue-400',
  output: 'text-slate-300',
  spawn: 'text-green-400',
  success: 'text-green-400',
  phase: 'text-purple-400',
  progress: 'text-slate-400',
};

export function TerminalAnimation() {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const animationRef = useRef<number | null>(null);
  const charIndexRef = useRef(0);
  const lastCharTimeRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Main typing animation
  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show all lines immediately for reduced motion
      setDisplayedLines(terminalSequence);
      return;
    }

    if (currentLineIndex >= terminalSequence.length) {
      // Loop back after delay
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentText('');
        charIndexRef.current = 0;
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const currentLine = terminalSequence[currentLineIndex];

    // Wait for line delay before starting to type
    if (!isTyping && charIndexRef.current === 0) {
      const timeout = setTimeout(() => {
        setIsTyping(true);
      }, currentLine.delay);
      return () => clearTimeout(timeout);
    }

    if (!isTyping) return;

    // Typing animation
    const typingSpeed = currentLine.type === 'command' ? 60 : 30; // Slower for commands

    const animate = (timestamp: number) => {
      if (timestamp - lastCharTimeRef.current >= typingSpeed) {
        lastCharTimeRef.current = timestamp;

        if (charIndexRef.current < currentLine.text.length) {
          charIndexRef.current++;
          setCurrentText(currentLine.text.slice(0, charIndexRef.current));
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Line complete
          setDisplayedLines(prev => [...prev, currentLine]);
          setCurrentLineIndex(prev => prev + 1);
          setCurrentText('');
          charIndexRef.current = 0;
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
  }, [currentLineIndex, isTyping]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, currentText]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Terminal window chrome */}
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Title bar */}
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
          className="bg-[#0d1220] p-4 font-mono text-sm h-80 overflow-y-auto"
        >
          {/* Displayed lines */}
          {displayedLines.map((line, index) => (
            <div key={index} className={`${lineTypeColors[line.type]} leading-relaxed`}>
              {line.text || '\u00A0'}
            </div>
          ))}

          {/* Currently typing line */}
          {isTyping && currentLineIndex < terminalSequence.length && (
            <div className={`${lineTypeColors[terminalSequence[currentLineIndex].type]} leading-relaxed`}>
              {currentText}
              <span
                className={`inline-block w-2 h-4 ml-0.5 bg-purple-400 align-middle ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          )}

          {/* Cursor when not typing */}
          {!isTyping && currentLineIndex < terminalSequence.length && (
            <div className="leading-relaxed">
              <span
                className={`inline-block w-2 h-4 bg-purple-400 align-middle ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalAnimation;
```

### Dependencies

- **Depends on:** Nothing
- **Blocks:** Builder-5 (needs component for integration)

### Implementation Notes

- Uses `requestAnimationFrame` for smooth typing
- Line delays create realistic pacing
- Auto-scrolls to keep latest content visible
- Loops after 3 second pause at end
- Respects `prefers-reduced-motion` by showing all content immediately
- Terminal window has macOS-style chrome

### Testing Requirements

- View component in isolation (can add temporary import to page.tsx)
- Verify typing speed feels natural (not too fast/slow)
- Check colors are distinguishable
- Test loop behavior
- Test on mobile (should be scrollable)

---

## Builder-3: Agent Visualization & Dashboard

### Priority
**P1** (Core feature)

### Scope

Create two components:
1. **AgentVisualization.tsx** - Floating orbs representing agent types
2. **LiveDashboard.tsx** - Real metrics with count-up animation

### Complexity Estimate
**MEDIUM** - CSS animations, multiple state values

### Success Criteria

- [ ] Agent orbs float with smooth animation
- [ ] Each agent type has distinct color
- [ ] Labels show on hover/focus
- [ ] Dashboard metrics count up on scroll into view
- [ ] Real values displayed (8 plans, 10 iterations, 206+ agents)
- [ ] Mobile responsive
- [ ] Respects `prefers-reduced-motion`

### Files to Create

**1. `/app/components/2l/AgentVisualization.tsx`**

```tsx
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

interface AgentOrb {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
  delay: number;
}

const agentOrbs: AgentOrb[] = [
  {
    id: 'explorer',
    label: 'Explorer',
    icon: Search,
    color: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.5)',
    delay: 0,
  },
  {
    id: 'planner',
    label: 'Planner',
    icon: FileText,
    color: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.5)',
    delay: 0.5,
  },
  {
    id: 'builder',
    label: 'Builder',
    icon: Hammer,
    color: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.5)',
    delay: 1,
  },
  {
    id: 'integrator',
    label: 'Integrator',
    icon: GitMerge,
    color: '#60a5fa',
    glowColor: 'rgba(96, 165, 250, 0.5)',
    delay: 1.5,
  },
  {
    id: 'validator',
    label: 'Validator',
    icon: Shield,
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.5)',
    delay: 2,
  },
  {
    id: 'healer',
    label: 'Healer',
    icon: RefreshCw,
    color: '#f472b6',
    glowColor: 'rgba(244, 114, 182, 0.5)',
    delay: 2.5,
  },
];

export function AgentVisualization() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="py-8">
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {agentOrbs.map((agent) => {
          const Icon = agent.icon;
          const isHovered = hoveredId === agent.id;

          return (
            <div
              key={agent.id}
              className="relative group"
              onMouseEnter={() => setHoveredId(agent.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(agent.id)}
              onBlur={() => setHoveredId(null)}
              tabIndex={0}
              role="button"
              aria-label={`${agent.label} agent`}
            >
              {/* Orb */}
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-transform duration-300 agent-orb-float"
                style={{
                  backgroundColor: `${agent.color}20`,
                  border: `2px solid ${agent.color}60`,
                  boxShadow: `0 0 ${isHovered ? '40px' : '20px'} ${agent.glowColor}`,
                  animationDelay: `${agent.delay}s`,
                }}
              >
                <Icon
                  className="w-7 h-7 md:w-8 md:h-8"
                  style={{ color: agent.color }}
                />
              </div>

              {/* Label */}
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
              >
                <span className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2 py-1 rounded">
                  {agent.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend text */}
      <p className="text-center text-slate-500 text-sm mt-12">
        Specialized AI agents working in parallel
      </p>
    </div>
  );
}

export default AgentVisualization;
```

**2. `/app/components/2l/LiveDashboard.tsx`**

```tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FileText, GitBranch, Users, CheckCircle } from "lucide-react";

interface DashboardMetric {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: number;
}

const dashboardMetrics: DashboardMetric[] = [
  { label: 'Plans Completed', value: 8, icon: FileText, duration: 1500 },
  { label: 'Iterations Shipped', value: 10, icon: GitBranch, duration: 1800 },
  { label: 'Agents Spawned', value: 206, suffix: '+', icon: Users, duration: 2200 },
  { label: 'Validation Passes', value: 10, suffix: '/10', icon: CheckCircle, duration: 1600 },
];

// Inline count-up hook
function useCountUp(target: number, duration: number) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const startRef = useRef(false);

  const start = useCallback(() => {
    if (startRef.current) return;
    startRef.current = true;
    setHasStarted(true);

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return { count, start, hasStarted };
}

export function LiveDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Individual count-up hooks for each metric
  const metric1 = useCountUp(dashboardMetrics[0].value, dashboardMetrics[0].duration);
  const metric2 = useCountUp(dashboardMetrics[1].value, dashboardMetrics[1].duration);
  const metric3 = useCountUp(dashboardMetrics[2].value, dashboardMetrics[2].duration);
  const metric4 = useCountUp(dashboardMetrics[3].value, dashboardMetrics[3].duration);

  const metricCounts = [metric1, metric2, metric3, metric4];

  // Intersection observer to trigger count-up
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          metricCounts.forEach(m => m.start());
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isVisible, metricCounts]);

  return (
    <div ref={containerRef} className="py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-400/30 mb-4">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-purple-300">This site was built with 2L</span>
        </div>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Real metrics from the actual build process. Every number represents
          actual agent work on this portfolio.
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {dashboardMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const countData = metricCounts[index];

          return (
            <div
              key={metric.label}
              className="contemplative-card card-lift-premium p-4 text-center"
            >
              <Icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-purple-300 mb-1 tabular-nums">
                {countData.count}
                {metric.suffix && (
                  <span className="text-lg text-purple-400">{metric.suffix}</span>
                )}
              </div>
              <div className="text-xs text-slate-500">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Sub-note */}
      <p className="text-center text-slate-600 text-xs mt-6">
        Updated with each new plan completion
      </p>
    </div>
  );
}

export default LiveDashboard;
```

**3. Add to `/app/globals.css` (at end, before final closing comments):**

```css
/* ========== BUILDER-3: Agent Orb Animations ========== */

@keyframes agent-orb-float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-12px) scale(1.05);
  }
}

.agent-orb-float {
  animation: agent-orb-float 4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .agent-orb-float {
    animation: none;
  }
}

/* ========== END BUILDER-3 ========== */
```

### Dependencies

- **Depends on:** Nothing
- **Blocks:** Builder-5 (needs components for integration)

### Implementation Notes

- AgentVisualization uses CSS animation for floating
- LiveDashboard includes its own `useCountUp` implementation (or can import from shared hook)
- Both components are self-contained
- Uses existing `contemplative-card` and `card-lift-premium` classes

### Testing Requirements

- Verify orbs float smoothly
- Verify hover shows label
- Verify count-up triggers on scroll
- Test on mobile

---

## Builder-4: Code Gen Demo & Pipeline

### Priority
**P2** (Enhancement feature)

### Scope

Create two components:
1. **CodeGenDemo.tsx** - Shows code being "typed" by AI
2. **SlashCommands.tsx** - Showcase of 2L slash commands

### Complexity Estimate
**MEDIUM** - Typing animation, syntax highlighting

### Success Criteria

- [ ] Code appears character by character with syntax highlighting
- [ ] Cursor blinks during typing
- [ ] Code editor has proper styling (dark background, line numbers)
- [ ] Slash commands display in grid
- [ ] Command descriptions visible
- [ ] Mobile responsive
- [ ] Loops after completion

### Files to Create

**1. `/app/components/2l/CodeGenDemo.tsx`**

```tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Code } from "lucide-react";

// Code to display - showing actual component code
const codeLines = [
  '// Building the AgentVisualization component',
  'import React from "react";',
  '',
  'const agentTypes = [',
  '  { id: "explorer", color: "#a78bfa" },',
  '  { id: "builder", color: "#c084fc" },',
  '  { id: "validator", color: "#22c55e" },',
  '];',
  '',
  'export function AgentVisualization() {',
  '  return (',
  '    <div className="flex gap-8">',
  '      {agentTypes.map((agent) => (',
  '        <AgentOrb key={agent.id} {...agent} />',
  '      ))}',
  '    </div>',
  '  );',
  '}',
];

// Simple syntax highlighting
function highlightLine(line: string): React.ReactNode {
  // Keywords
  let result = line
    .replace(/(import|from|export|function|return|const)/g, '<span class="text-purple-400">$1</span>')
    .replace(/(".*?")/g, '<span class="text-green-300">$1</span>')
    .replace(/(\/\/.*$)/g, '<span class="text-slate-500">$1</span>')
    .replace(/(\{|\}|\(|\)|\[|\]|;|,|:)/g, '<span class="text-slate-400">$1</span>');

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

export function CodeGenDemo() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [currentLineChars, setCurrentLineChars] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const charIndexRef = useRef(0);
  const lastCharTimeRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedLines(codeLines.length);
      setIsTyping(false);
      return;
    }

    if (displayedLines >= codeLines.length) {
      // Loop after delay
      const timeout = setTimeout(() => {
        setDisplayedLines(0);
        setCurrentLineChars(0);
        charIndexRef.current = 0;
        setIsTyping(true);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const currentLine = codeLines[displayedLines];
    const typingSpeed = currentLine === '' ? 100 : 40; // Faster for code

    const animate = (timestamp: number) => {
      if (timestamp - lastCharTimeRef.current >= typingSpeed) {
        lastCharTimeRef.current = timestamp;

        if (charIndexRef.current < currentLine.length) {
          charIndexRef.current++;
          setCurrentLineChars(charIndexRef.current);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Line complete
          setDisplayedLines(prev => prev + 1);
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
  }, [displayedLines]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Editor window */}
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Title bar */}
        <div className="bg-[#1a1f2e] px-4 py-2 flex items-center gap-2 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-slate-500 font-mono">AgentVisualization.tsx</span>
          </div>
          <Code className="w-4 h-4 text-slate-500" />
        </div>

        {/* Code content */}
        <div className="bg-[#0d1220] p-4 font-mono text-xs md:text-sm overflow-x-auto">
          {/* Line numbers + code */}
          <div className="flex">
            {/* Line numbers */}
            <div className="pr-4 text-slate-600 select-none text-right" style={{ minWidth: '2rem' }}>
              {codeLines.slice(0, displayedLines + 1).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code */}
            <div className="flex-1">
              {/* Fully displayed lines */}
              {codeLines.slice(0, displayedLines).map((line, i) => (
                <div key={i} className="text-slate-200 whitespace-pre">
                  {line ? highlightLine(line) : '\u00A0'}
                </div>
              ))}

              {/* Currently typing line */}
              {displayedLines < codeLines.length && (
                <div className="text-slate-200 whitespace-pre">
                  {highlightLine(codeLines[displayedLines].slice(0, currentLineChars))}
                  <span
                    className={`inline-block w-2 h-4 ml-0.5 bg-purple-400 align-middle ${
                      showCursor ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
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
```

**2. `/app/components/2l/SlashCommands.tsx`**

```tsx
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
  Terminal,
} from "lucide-react";

interface SlashCommand {
  command: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const slashCommands: SlashCommand[] = [
  {
    command: '/2l-mvp',
    description: 'Full autonomous execution from vision to deployment',
    icon: Rocket,
  },
  {
    command: '/2l-vision',
    description: 'Create detailed requirements document',
    icon: Target,
  },
  {
    command: '/2l-plan',
    description: 'Design iteration strategy and builder assignments',
    icon: FileText,
  },
  {
    command: '/2l-build',
    description: 'Execute single iteration with parallel builders',
    icon: Hammer,
  },
  {
    command: '/2l-validate',
    description: 'Run comprehensive quality gates',
    icon: Shield,
  },
  {
    command: '/2l-heal',
    description: 'Auto-fix validation failures',
    icon: RefreshCw,
  },
  {
    command: '/2l-continue',
    description: 'Resume interrupted session',
    icon: Play,
  },
  {
    command: '/2l-status',
    description: 'Check current plan state',
    icon: Activity,
  },
  {
    command: '/2l-dashboard',
    description: 'Launch real-time observability',
    icon: Terminal,
  },
];

export function SlashCommands() {
  return (
    <div className="py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Simple slash commands in Claude Code. Type a command, describe your vision,
          and watch agents build.
        </p>
      </div>

      {/* Commands grid */}
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
                <code className="text-purple-300 font-mono text-sm">{cmd.command}</code>
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
```

### Dependencies

- **Depends on:** Nothing
- **Blocks:** Builder-5 (needs components for integration)

### Implementation Notes

- CodeGenDemo has simplified syntax highlighting using string replacement
- SlashCommands is static display, no animation needed
- Both use existing card styling classes

### Testing Requirements

- Verify code typing animation runs
- Check syntax highlighting colors are visible
- Test slash commands grid on mobile
- Verify reduced motion shows static content

---

## Builder-5: Page Integration & Polish

### Priority
**P1** (Integration)

### Scope

Integrate all new components into page.tsx:
1. Import all new components
2. Add new sections in correct order
3. Add Recursive Showcase section
4. Update section reveal numbering
5. Verify mobile responsiveness
6. Add any missing reduced motion support

### Complexity Estimate
**MEDIUM** - Coordination of multiple components, section ordering

### Success Criteria

- [ ] All new components imported and rendered
- [ ] Sections in correct order (see patterns.md)
- [ ] Recursive Showcase section present
- [ ] Section reveal animations work
- [ ] Mobile layout correct
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes

### Files to Modify

**`/app/2l/page.tsx`**

### Implementation Steps

**Step 1: Add imports after line 21 (after lucide imports):**

```tsx
// 2L Components
import { TerminalAnimation } from "@/app/components/2l/TerminalAnimation";
import { AgentVisualization } from "@/app/components/2l/AgentVisualization";
import { LiveDashboard } from "@/app/components/2l/LiveDashboard";
import { CodeGenDemo } from "@/app/components/2l/CodeGenDemo";
import { SlashCommands } from "@/app/components/2l/SlashCommands";
```

**Step 2: Add Terminal section after Hero (after line 285):**

```tsx
{/* Terminal Animation Section - NEW */}
<section className="section-breathing section-reveal section-reveal-1">
  <div className="container-wide">
    <div className="text-center mb-12">
      <h2 className="display-lg text-white mb-4">Watch 2L in Action</h2>
      <p className="body-lg text-slate-400 max-w-2xl mx-auto">
        A real 2L session building this very page. Multiple agents working in parallel,
        validating, and shipping.
      </p>
    </div>
    <TerminalAnimation />
  </div>
</section>
```

**Step 3: Add Recursive Showcase / Dashboard section (before Pipeline):**

```tsx
{/* Recursive Showcase - Built with 2L */}
<section className="section-breathing section-reveal section-reveal-2">
  <div className="container-wide">
    <div className="text-center mb-8">
      <h2 className="display-lg text-white mb-4">
        You're Looking at 2L's Work Right Now
      </h2>
      <p className="body-lg text-slate-400 max-w-2xl mx-auto">
        This entire portfolio was built using 2L. Not a demo. Actual proof.
      </p>
    </div>
    <LiveDashboard />
  </div>
</section>
```

**Step 4: Update Pipeline section (now section-reveal-3):**

Change `section-reveal-1` to `section-reveal-3` on line 288.

**Step 5: Add Agent Visualization section (after Pipeline, before Agents list):**

```tsx
{/* Agent Visualization */}
<section className="section-breathing section-reveal section-reveal-4">
  <div className="container-wide">
    <div className="text-center mb-8">
      <h2 className="display-lg text-white mb-4">
        Agents Working in Parallel
      </h2>
    </div>
    <AgentVisualization />
  </div>
</section>
```

**Step 6: Update remaining section-reveal numbers:**

- Agents section: `section-reveal-5` (was 2)
- Benefits section: `section-reveal-6` (was 3)
- Case Study section: `section-reveal-7` (was 4)

**Step 7: Add Slash Commands section (before Technical Depth):**

```tsx
{/* Slash Commands Showcase */}
<section className="section-breathing section-reveal section-reveal-8">
  <div className="container-wide">
    <div className="text-center mb-8">
      <h2 className="display-lg text-white mb-4">
        The Developer Interface
      </h2>
      <p className="body-lg text-slate-400 max-w-2xl mx-auto">
        Simple commands, powerful orchestration.
      </p>
    </div>
    <SlashCommands />
  </div>
</section>
```

**Step 8: Add Code Gen Demo section (before Technical Depth):**

```tsx
{/* Code Generation Demo */}
<section className="section-breathing section-reveal section-reveal-9">
  <div className="container-wide">
    <div className="text-center mb-8">
      <h2 className="display-lg text-white mb-4">
        AI Writing Code
      </h2>
      <p className="body-lg text-slate-400 max-w-2xl mx-auto">
        Watch a builder agent write component code in real-time.
      </p>
    </div>
    <CodeGenDemo />
  </div>
</section>
```

**Step 9: Update Technical Depth and CTA sections:**

- Technical Depth: `section-reveal-10` (was 5)
- CTA: `section-reveal-11` (was 6)

**Step 10: Remove duplicate Case Study metrics section**

The LiveDashboard component now handles the "Built with 2L" metrics, so the old Case Study section at lines 409-456 can be simplified or removed. Keep it for the narrative text, but remove the metrics grid since LiveDashboard handles that.

### Dependencies

- **Depends on:** Builders 1-4 (needs all component files to exist)
- **Blocks:** Nothing

### Final Section Order

1. Hero (existing)
2. Terminal Animation (NEW)
3. Recursive Showcase / Dashboard (NEW)
4. Pipeline (existing)
5. Agent Visualization (NEW)
6. Agents List (existing)
7. Benefits (existing)
8. Case Study text (simplified)
9. Slash Commands (NEW)
10. Code Generation Demo (NEW)
11. Technical Depth (existing)
12. CTA (existing)

### Testing Requirements

1. `npm run build` must succeed
2. `npm run lint` must pass
3. All sections visible on page
4. Scroll through page - verify section reveals work
5. Test on mobile (320px, 768px)
6. Verify no console errors

---

## Summary: Builder Execution Matrix

| Builder | Files Created | Files Modified | Depends On | Estimated Time |
|---------|--------------|----------------|------------|----------------|
| Builder-1 | 0 | 2 | - | 15 min |
| Builder-2 | 1 | 0 | - | 30 min |
| Builder-3 | 2 | 1 | - | 35 min |
| Builder-4 | 2 | 0 | - | 30 min |
| Builder-5 | 0 | 1 | B1-B4 | 25 min |

### Parallel Execution

```
Time 0 ──────────────────────────────────> 35 min
   │
   ├── Builder-1 (P0): ████████ 15 min
   │
   ├── Builder-2 (P1): ████████████████ 30 min
   │
   ├── Builder-3 (P1): ██████████████████ 35 min
   │
   ├── Builder-4 (P2): ████████████████ 30 min
   │
   │                              ↓
   └── Builder-5 (P1): ──────────████████████ 25 min
                       (waits for B1-B4)
```

### Integration Points

- Builder-1 modifies Navigation.tsx and page.tsx (content only)
- Builders 2-4 create new files in `/app/components/2l/`
- Builder-5 imports components and adds sections to page.tsx
- Builder-3 adds CSS to globals.css (animation keyframes)

No conflicts expected as each builder works on distinct files.

---

**Plan Status:** READY FOR BUILDING
