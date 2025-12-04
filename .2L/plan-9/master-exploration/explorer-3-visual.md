# Master Exploration Report: Visual & Animation Strategy

## Explorer ID
master-explorer-3

## Focus Area
Visual & Animation Strategy - How to make the 2L page visually spectacular and ALIVE

## Vision Summary
Transform the 2L page from an informational page into a command center experience where visitors FEEL AI agents building software through animated terminals, agent visualizations, live dashboards, and code generation demos.

---

## Animation Tools Available

### Current Stack Analysis

**NO Framer Motion installed** - The codebase uses pure CSS animations and vanilla React state management.

**Available tools:**
1. **CSS @keyframes** - 13 keyframe animations already defined in `/app/globals.css`
2. **requestAnimationFrame** - Used extensively for smooth JS-driven animations
3. **IntersectionObserver** - Already implemented for scroll-triggered reveals
4. **React useState/useEffect** - For interactive state management
5. **Tailwind CSS** - For transition utilities

### Existing Keyframe Animations (in `/app/globals.css`)

| Animation Name | Purpose | Duration | Reusable? |
|---------------|---------|----------|-----------|
| `word-reveal` | Hero text fade-up | 0.6s | YES |
| `gentle-drift` | Body texture movement | 40s | YES |
| `soft-float` | Floating elements | 8s | YES |
| `fade-in-up` | Standard fade entrance | 0.8s | YES |
| `gradient-shift` | Hero background | 25s | YES |
| `slide-in-right` | Slide entrance | - | YES |
| `pulse-green` | Success indicator | 2s | YES |
| `float-star` | Floating decorations | 6s | YES |
| `cursor-blink` | Typing cursor | 1s | CRITICAL |
| `cosmic-glow` | Purple glow pulse | 3s | YES |
| `phase-pulse` | Pipeline phase glow | 1.5s | CRITICAL |
| `line-flow` | Connection line flow | 3s | CRITICAL |
| `icon-float` | Agent icon float | 3s | CRITICAL |

### Advanced Animation Patterns from `/app/soul/building/page.tsx`

This file contains sophisticated animation hooks we can adapt:

1. **`useTypewriter`** - Natural typing effect with:
   - Variable character delays (slower for punctuation, capitals)
   - Human-like variation (random timing adjustments)
   - Cursor blink integration
   - Performance-optimized with requestAnimationFrame

2. **`useSimpleBreathing`** - Smooth pulse animation:
   - 8-second cycle (4s inhale, 4s exhale)
   - Scale and glow intensity transitions
   - Ultra-smooth easeInOutSine curve

3. **`useMirrorReflection`** - Shimmer effects:
   - Position-based shimmer sweep
   - Pulsing intensity
   - Surface distortion

4. **`useTextGlitch`** - Text corruption effect:
   - Random text replacement
   - Color shift and position offset
   - Corruption wave patterns

---

## Recommended Approach for Each Visual Feature

### 1. Terminal Animation

**Recommended approach:** Custom React component with requestAnimationFrame

**Why:** The existing `useTypewriter` hook from `/app/soul/building/page.tsx` provides an excellent foundation. Adapt it for multi-line terminal output.

**Component structure:**
```
TerminalAnimation/
  - TerminalAnimation.tsx (main component)
  - useTerminalTyping.ts (custom hook)
  - terminalData.ts (command sequences)
```

**Key specifications:**
- **Typing speed:** 50-80ms per character (configurable)
- **Command delay:** 800ms pause between commands
- **Output delay:** 200ms delay before output appears
- **Progress bars:** CSS-only animation with `transform: scaleX()`

**CSS needed (add to globals.css):**
```css
@keyframes terminal-cursor {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes progress-fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.terminal-cursor {
  animation: terminal-cursor 1s step-end infinite;
}
```

**Terminal content sequence:**
```typescript
const terminalSequence = [
  { type: 'command', text: '$ /2l-mvp', delay: 0 },
  { type: 'output', text: '', delay: 400 },
  { type: 'output', text: 'Using existing vision from plan-8', prefix: 'icon', delay: 600 },
  { type: 'output', text: 'Analyzing vision complexity...', prefix: 'icon', delay: 800 },
  { type: 'output', text: '   Vision complexity: COMPLEX', delay: 400 },
  { type: 'output', text: '   Spawning 4 master explorers...', delay: 600 },
  // ... continue sequence
];
```

---

### 2. Agent Visualization

**Recommended approach:** Option A - Floating Agent Orbs

**Why:**
- Matches existing design language (purple glow aesthetic)
- Leverages existing `soft-float` and `phase-pulse` animations
- Less complexity than network graphs while being more visually striking than code windows
- Better performance than SVG network animations

**Component structure:**
```
AgentVisualization/
  - AgentOrb.tsx (individual orb)
  - AgentOrbit.tsx (circular arrangement)
  - agentConfig.ts (positions, colors, labels)
```

**Visual specifications:**

| Agent Type | Color | Size | Float Delay |
|-----------|-------|------|-------------|
| Explorer | `#a78bfa` (purple-400) | 48px | 0s |
| Planner | `#818cf8` (indigo-400) | 44px | 0.5s |
| Builder | `#c084fc` (purple-400) | 52px | 1s |
| Validator | `#22c55e` (green-500) | 40px | 1.5s |
| Healer | `#f472b6` (pink-400) | 36px | 2s |

**CSS needed:**
```css
@keyframes orb-pulse {
  0%, 100% {
    box-shadow: 0 0 20px currentColor;
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 40px currentColor;
    transform: scale(1.1);
  }
}

@keyframes orb-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(2deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(-5px) rotate(-2deg); }
}

.agent-orb {
  animation: orb-float 6s ease-in-out infinite, orb-pulse 3s ease-in-out infinite;
}

.agent-orb-active {
  animation: orb-pulse 0.8s ease-in-out infinite;
}
```

**Layout approach:**
- Center-positioned orbit container
- Orbs positioned using `transform: rotate(Xdeg) translateX(radius)` for circular arrangement
- Trail effect using CSS `::after` with blur

---

### 3. Live Dashboard Preview

**Recommended approach:** Count-up animation with real data from `.2L/config.yaml`

**Why:**
- Existing `useCountUp` hook in `/app/2l/page.tsx` already works well
- Data is available at build time from config.yaml
- Simple enhancement of existing metrics section

**Data sources:**
- Plans completed: 8 (from config.yaml)
- Iterations shipped: 10 (from global_iteration_counter)
- Agents spawned: Calculate from events.jsonl (count agent_start events)

**Real metrics to display:**

| Metric | Value | Source |
|--------|-------|--------|
| Plans Completed | 8 | `.2L/config.yaml` plans array length |
| Iterations Shipped | 10 | `.2L/config.yaml` global_iteration_counter |
| Agents Spawned | 40+ | Count from events.jsonl |
| Validation Passes | 10/10 | Count validation events |

**Enhancement: Animated mini-chart**
```css
@keyframes bar-grow {
  from { height: 0; }
  to { height: var(--bar-height); }
}

.dashboard-bar {
  animation: bar-grow 1s ease-out forwards;
  animation-delay: var(--bar-delay);
}
```

---

### 4. Code Generation Demo

**Recommended approach:** Adapt `useTypewriter` hook with syntax highlighting

**Component structure:**
```
CodeGenDemo/
  - CodeGenDemo.tsx (container with editor chrome)
  - useCodeTyping.ts (extended typewriter with line handling)
  - codeContent.ts (TypeScript/React code samples)
```

**Visual specifications:**
- **Editor chrome:** Dark background (#1e1e2e), rounded corners, mock title bar
- **Syntax highlighting:** Use inline styles (no external library needed)
- **Cursor:** Blinking block cursor (white, 2px width)
- **Line numbers:** Gray, incrementing as lines are typed

**Color scheme for syntax (matching existing purple theme):**
```typescript
const syntaxColors = {
  keyword: '#c084fc',     // purple-400 - import, const, function
  string: '#86efac',      // green-300 - strings
  comment: '#6b7280',     // gray-500 - comments
  type: '#818cf8',        // indigo-400 - types
  function: '#f472b6',    // pink-400 - function names
  variable: '#f8fafc',    // slate-50 - variables
  punctuation: '#94a3b8', // slate-400 - brackets, commas
};
```

**Sample code content:**
```typescript
const codeToType = `// Building the TerminalAnimation component
import React, { useState, useEffect } from "react";

export function TerminalAnimation() {
  const [lines, setLines] = useState<string[]>([]);

  // Typing effect hook
  useEffect(() => {
    // AI agent writing code...
  }, []);

  return <div className="terminal-window">...</div>;
}`;
```

---

### 5. Pipeline Interactive Journey

**Recommended approach:** Enhanced existing pipeline with stage animations

**Current state:** Basic cycling with `activePhase` state and pulse animation

**Enhancements:**
1. Larger icons (56px -> 64px)
2. Progress indicator traveling between phases
3. Agent orbs appearing at each stage
4. Validation checkmarks animating in

**CSS additions:**
```css
@keyframes traveling-pulse {
  0% {
    left: 0%;
    opacity: 0;
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% {
    left: 100%;
    opacity: 0;
  }
}

.pipeline-traveler {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a78bfa, #c084fc);
  animation: traveling-pulse 3s ease-in-out infinite;
}

@keyframes checkmark-pop {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

.validation-check {
  animation: checkmark-pop 0.4s ease-out forwards;
}
```

---

## Component Hierarchy

```
/app/2l/page.tsx (main page - modify existing)
  |
  +-- /app/components/2l/
        |
        +-- TerminalAnimation.tsx
        |     +-- useTerminalTyping.ts (custom hook)
        |     +-- terminalSequence.ts (data)
        |
        +-- AgentVisualization.tsx
        |     +-- AgentOrb.tsx (sub-component)
        |
        +-- LiveDashboard.tsx
        |     +-- DashboardMetric.tsx (sub-component)
        |     +-- MiniChart.tsx (sub-component)
        |
        +-- CodeGenDemo.tsx
        |     +-- useCodeTyping.ts (custom hook)
        |     +-- codeContent.ts (data)
        |
        +-- EnhancedPipeline.tsx (if replacing existing)
```

---

## CSS/Animation Code Snippets (Add to globals.css)

```css
/* ========== 2L COMMAND CENTER ANIMATIONS ========== */

/* Terminal cursor blink */
@keyframes terminal-cursor-blink {
  0%, 49% { background-color: #a78bfa; }
  50%, 100% { background-color: transparent; }
}

.terminal-cursor {
  width: 8px;
  height: 18px;
  display: inline-block;
  animation: terminal-cursor-blink 1s step-end infinite;
}

/* Terminal text typing */
@keyframes terminal-type {
  from { width: 0; }
  to { width: 100%; }
}

/* Progress bar fill */
@keyframes progress-fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(var(--progress, 1)); }
}

.progress-bar {
  transform-origin: left;
  animation: progress-fill var(--duration, 2s) ease-out forwards;
}

/* Agent orb floating */
@keyframes agent-float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-12px) scale(1.05);
  }
}

@keyframes agent-glow {
  0%, 100% {
    box-shadow: 0 0 20px var(--glow-color, rgba(168, 85, 247, 0.5));
  }
  50% {
    box-shadow: 0 0 40px var(--glow-color, rgba(168, 85, 247, 0.8));
  }
}

.agent-orb {
  animation:
    agent-float 4s ease-in-out infinite,
    agent-glow 2s ease-in-out infinite;
}

/* Agent working state - faster pulse */
.agent-orb.working {
  animation:
    agent-float 2s ease-in-out infinite,
    agent-glow 0.8s ease-in-out infinite;
}

/* Dashboard counter tick */
@keyframes count-tick {
  0% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
}

/* Dashboard bar grow */
@keyframes dashboard-bar-grow {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--bar-height);
    opacity: 1;
  }
}

/* Code editor cursor */
@keyframes code-cursor {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.code-cursor {
  animation: code-cursor 0.6s step-end infinite;
}

/* Pipeline traveling indicator */
@keyframes pipeline-travel {
  0% {
    left: 0%;
    transform: scale(0.5);
    opacity: 0;
  }
  10% {
    transform: scale(1);
    opacity: 1;
  }
  90% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    left: 100%;
    transform: scale(0.5);
    opacity: 0;
  }
}

/* Staggered reveal for dashboard metrics */
.dashboard-metric {
  opacity: 0;
  transform: translateY(20px);
  animation: fade-in-up 0.6s ease forwards;
}

.dashboard-metric:nth-child(1) { animation-delay: 0.1s; }
.dashboard-metric:nth-child(2) { animation-delay: 0.2s; }
.dashboard-metric:nth-child(3) { animation-delay: 0.3s; }
.dashboard-metric:nth-child(4) { animation-delay: 0.4s; }

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .terminal-cursor,
  .agent-orb,
  .code-cursor,
  .progress-bar,
  .dashboard-metric {
    animation: none;
  }

  .terminal-cursor {
    background-color: #a78bfa;
  }

  .dashboard-metric {
    opacity: 1;
    transform: none;
  }
}

/* ========== END 2L COMMAND CENTER ========== */
```

---

## Performance Strategy

### Critical Considerations

1. **Multiple animations running simultaneously** - The page will have:
   - Terminal typing
   - Agent orbs floating
   - Dashboard counters
   - Pipeline phases cycling
   - Code generation typing

2. **Performance budget:** Max 3 JS-driven animations active at once

### Optimization Strategies

| Strategy | Implementation | Impact |
|----------|----------------|--------|
| **CSS-first animations** | Use CSS @keyframes for all floating/pulsing | GPU-accelerated, low CPU |
| **IntersectionObserver** | Start animations only when in viewport | Reduces idle animations |
| **requestAnimationFrame pooling** | Single RAF loop for all typing animations | Reduces RAF calls |
| **will-change hints** | Add `will-change: transform` to animated elements | Hints browser to optimize |
| **transform-only animations** | Avoid animating layout properties | No layout recalculation |

### Specific Optimizations

**Terminal Animation:**
- Use CSS `overflow: hidden` + `width` animation instead of per-character rendering
- Or: Batch character updates every 2-3 frames

**Agent Orbs:**
- Pure CSS animations (no JS state changes)
- Use `transform` only (no `left/top`)

**Dashboard:**
- Trigger count-up only once with IntersectionObserver
- Use `font-variant-numeric: tabular-nums` to prevent layout shift

**Code Generation:**
- Share RAF loop with terminal if both visible
- Pause when scrolled out of view

### Memory Considerations

```typescript
// Cleanup pattern for all animation hooks
useEffect(() => {
  const animationId = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(animationId);
  };
}, []);
```

---

## Specific Visual Specifications

### Color Palette (consistent with existing theme)

| Element | Color | Hex |
|---------|-------|-----|
| Terminal background | Darker than page | `#0d1220` |
| Terminal text | Light gray | `#e2e8f0` |
| Terminal cursor | Purple | `#a78bfa` |
| Success text | Green | `#22c55e` |
| Command prefix | Dim gray | `#64748b` |
| Agent Explorer | Purple | `#a78bfa` |
| Agent Builder | Light purple | `#c084fc` |
| Agent Validator | Green | `#22c55e` |
| Dashboard highlight | Purple gradient | `#a78bfa -> #c084fc` |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Terminal text | Mono (system) | 14px | 400 |
| Terminal command | Mono | 14px | 500 |
| Dashboard number | Inter | 32px | 700 |
| Dashboard label | Inter | 14px | 400 |
| Code editor | Mono | 13px | 400 |

### Spacing

| Container | Padding | Gap |
|-----------|---------|-----|
| Terminal window | 24px | 8px between lines |
| Dashboard | 32px | 16px between metrics |
| Agent orbit | 48px | - |
| Code editor | 20px | 4px between lines |

---

## Risk Assessment

### Low Risk
- CSS animations (well-tested, existing patterns)
- Count-up animation (already implemented)

### Medium Risk
- Terminal typing effect (needs careful RAF management)
- Multiple animations simultaneously (needs performance testing)

### Mitigation
- Test on low-end devices
- Implement IntersectionObserver pause/resume
- Add `prefers-reduced-motion` support

---

## Implementation Priority

1. **Terminal Animation** (Hero feature, highest impact)
2. **Agent Visualization** (Supports the "alive" feeling)
3. **Live Dashboard** (Quick win, extends existing)
4. **Code Generation Demo** (Nice to have)
5. **Enhanced Pipeline** (Incremental improvement)

---

## Summary: Visual Transformation

| Current State | New State |
|--------------|-----------|
| Static text descriptions | Animated terminal demo |
| Icon cycling | Floating agent orbs |
| Static numbers | Count-up with charts |
| No code visualization | Typing code editor |
| Simple pipeline | Interactive journey |

**Overall Impression Goal:** "I'm watching AI agents build software. I want this."

---

*Exploration completed: 2025-12-04*
*This report informs the visual implementation strategy for Plan-9*
