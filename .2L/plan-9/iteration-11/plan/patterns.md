# Code Patterns & Conventions - Iteration 11

**Plan:** plan-9
**Iteration:** 11
**Created:** 2025-12-04

---

## File Structure

```
/app/
├── 2l/
│   └── page.tsx              # Main 2L page
├── components/
│   ├── Navigation.tsx        # Site navigation
│   ├── Footer.tsx            # Site footer
│   └── 2l/                   # 2L-specific components
│       ├── TerminalAnimation.tsx
│       ├── AgentVisualization.tsx
│       ├── LiveDashboard.tsx
│       ├── CodeGenDemo.tsx
│       └── SlashCommands.tsx
├── globals.css               # Global styles + animations
└── hooks/
    └── useCountUp.ts         # Shared animation hook
```

---

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `TerminalAnimation.tsx` |
| Hooks | camelCase with `use` prefix | `useTerminalTyping` |
| CSS classes | kebab-case | `terminal-cursor-blink` |
| Constants | SCREAMING_SNAKE_CASE | `TYPING_SPEED_MS` |
| Interfaces | PascalCase | `TerminalLine` |
| Event handlers | camelCase with `handle` prefix | `handleAnimationEnd` |

---

## Component Structure Pattern

All new components should follow this structure:

```typescript
"use client";

import React, { useState, useEffect, useRef } from "react";
// External imports (lucide-react, etc.)
import { Terminal } from "lucide-react";

// Type definitions
interface ComponentProps {
  // Props interface
}

interface InternalState {
  // Internal state types
}

// Constants
const ANIMATION_DURATION = 2000;

// Component
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // State
  const [state, setState] = useState<InternalState>(initialValue);

  // Refs
  const animationRef = useRef<number | null>(null);

  // Effects
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  // Render
  return (
    <div className="component-container">
      {/* Content */}
    </div>
  );
}

export default ComponentName;
```

---

## Terminal Animation Pattern

### Data Structure

```typescript
interface TerminalLine {
  type: 'command' | 'output' | 'spawn' | 'success' | 'phase' | 'progress';
  text: string;
  delay: number;  // ms after previous line
}

const terminalSequence: TerminalLine[] = [
  { type: 'command', text: '$ /2l-mvp', delay: 0 },
  { type: 'output', text: 'Plan plan-9: 2L Command Center Experience', delay: 500 },
  { type: 'spawn', text: '[SPAWN] Master-Explorer-1: Architecture', delay: 300 },
  { type: 'success', text: '[COMPLETE] 4/4 explorers done', delay: 1000 },
  { type: 'phase', text: 'Phase: Building', delay: 500 },
  // ... more lines
];
```

### Typing Effect Hook

```typescript
function useTerminalTyping(
  lines: TerminalLine[],
  typingSpeed: number = 50
) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastCharTimeRef = useRef<number>(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      // Loop back to start after delay
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const currentLine = lines[currentLineIndex];

    // Wait for line delay before starting
    if (currentCharIndex === 0 && !isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(true);
      }, currentLine.delay);
      return () => clearTimeout(timeout);
    }

    if (!isTyping) return;

    const animate = (timestamp: number) => {
      if (timestamp - lastCharTimeRef.current >= typingSpeed) {
        lastCharTimeRef.current = timestamp;

        if (currentCharIndex < currentLine.text.length) {
          setCurrentCharIndex(prev => prev + 1);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Line complete, move to next
          setDisplayedLines(prev => [...prev, currentLine.text]);
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
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
  }, [currentLineIndex, currentCharIndex, isTyping, lines, typingSpeed]);

  const currentText = isTyping && currentLineIndex < lines.length
    ? lines[currentLineIndex].text.slice(0, currentCharIndex)
    : '';

  return {
    displayedLines,
    currentText,
    isTyping,
    currentLineType: lines[currentLineIndex]?.type || 'output',
  };
}
```

### Terminal Color Classes

```css
/* Add to globals.css */
.terminal-command { color: #58a6ff; }   /* Blue - user commands */
.terminal-spawn { color: #3fb950; }      /* Green - agent spawn */
.terminal-success { color: #3fb950; }    /* Green - success */
.terminal-phase { color: #a371f7; }      /* Purple - phase change */
.terminal-output { color: #c9d1d9; }     /* Light gray - output */
.terminal-progress { color: #8b949e; }   /* Gray - progress */
```

---

## Agent Orb Pattern

### Component Structure

```typescript
interface AgentOrb {
  id: string;
  type: 'explorer' | 'builder' | 'validator' | 'healer' | 'planner' | 'integrator';
  label: string;
}

const agentOrbs: AgentOrb[] = [
  { id: 'explorer', type: 'explorer', label: 'Explorer' },
  { id: 'planner', type: 'planner', label: 'Planner' },
  { id: 'builder', type: 'builder', label: 'Builder' },
  { id: 'integrator', type: 'integrator', label: 'Integrator' },
  { id: 'validator', type: 'validator', label: 'Validator' },
  { id: 'healer', type: 'healer', label: 'Healer' },
];
```

### Color Configuration

```typescript
const orbColors: Record<string, string> = {
  explorer: '#a78bfa',    // purple-400
  planner: '#818cf8',     // indigo-400
  builder: '#c084fc',     // purple-400 lighter
  integrator: '#60a5fa',  // blue-400
  validator: '#22c55e',   // green-500
  healer: '#f472b6',      // pink-400
};
```

### CSS Animation

```css
/* Agent orb floating animation */
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
```

---

## Dashboard Metrics Pattern

### Data Structure

```typescript
interface DashboardMetric {
  label: string;
  value: number;
  suffix?: string;
  duration?: number;
}

const dashboardMetrics: DashboardMetric[] = [
  { label: 'Plans Completed', value: 8, duration: 1500 },
  { label: 'Iterations Shipped', value: 10, duration: 1800 },
  { label: 'Agents Spawned', value: 206, suffix: '+', duration: 2000 },
  { label: 'Validation Passes', value: 10, suffix: '/10', duration: 1500 },
];
```

### Count-Up Hook Usage

```typescript
// In component
const metric1 = useCountUp(8, { duration: 1500, startOnMount: false });
const metric2 = useCountUp(10, { duration: 1800, startOnMount: false });
const metric3 = useCountUp(206, { duration: 2000, startOnMount: false });

// IntersectionObserver to trigger
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        metric1.start();
        metric2.start();
        metric3.start();
      }
    },
    { threshold: 0.3 }
  );

  if (containerRef.current) {
    observer.observe(containerRef.current);
  }

  return () => observer.disconnect();
}, [metric1, metric2, metric3]);
```

---

## Code Generation Demo Pattern

### Syntax Highlighting Colors

```typescript
const syntaxColors = {
  keyword: '#c084fc',      // purple-400 - import, const, function, return
  string: '#86efac',       // green-300 - "strings"
  comment: '#6b7280',      // gray-500 - // comments
  type: '#818cf8',         // indigo-400 - types, interfaces
  function: '#f472b6',     // pink-400 - function names
  variable: '#f8fafc',     // slate-50 - variables
  punctuation: '#94a3b8',  // slate-400 - brackets, commas
  number: '#fbbf24',       // amber-400 - numbers
};
```

### Code Tokenization

```typescript
interface CodeToken {
  text: string;
  type: 'keyword' | 'string' | 'comment' | 'type' | 'function' | 'variable' | 'punctuation' | 'number';
}

function tokenizeLine(line: string): CodeToken[] {
  const tokens: CodeToken[] = [];

  // Simple regex-based tokenization
  const patterns = [
    { regex: /\/\/.*$/g, type: 'comment' as const },
    { regex: /"[^"]*"/g, type: 'string' as const },
    { regex: /'[^']*'/g, type: 'string' as const },
    { regex: /\b(import|from|export|const|let|function|return|if|else)\b/g, type: 'keyword' as const },
    { regex: /\b(string|number|boolean|void|interface|type)\b/g, type: 'type' as const },
    { regex: /\b\d+\b/g, type: 'number' as const },
    { regex: /[{}()\[\];,.:]/g, type: 'punctuation' as const },
  ];

  // ... tokenization logic
  return tokens;
}
```

---

## Slash Commands Pattern

### Data Structure

```typescript
interface SlashCommand {
  command: string;
  description: string;
  category: 'core' | 'workflow' | 'utility';
}

const slashCommands: SlashCommand[] = [
  { command: '/2l-mvp', description: 'Full autonomous execution', category: 'core' },
  { command: '/2l-vision', description: 'Create detailed requirements', category: 'core' },
  { command: '/2l-plan', description: 'Design iteration strategy', category: 'core' },
  { command: '/2l-build', description: 'Single iteration build', category: 'core' },
  { command: '/2l-validate', description: 'Run all quality gates', category: 'workflow' },
  { command: '/2l-heal', description: 'Fix validation failures', category: 'workflow' },
  { command: '/2l-continue', description: 'Resume interrupted session', category: 'utility' },
  { command: '/2l-status', description: 'Check current state', category: 'utility' },
  { command: '/2l-dashboard', description: 'Start live dashboard', category: 'utility' },
];
```

### Render Pattern

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {slashCommands.map((cmd) => (
    <div key={cmd.command} className="contemplative-card p-4">
      <code className="text-purple-400 font-mono text-sm">{cmd.command}</code>
      <p className="text-slate-400 text-xs mt-1">{cmd.description}</p>
    </div>
  ))}
</div>
```

---

## Section Integration Pattern

### New Section Template

```tsx
{/* Section Name */}
<section className="section-breathing section-reveal section-reveal-X">
  <div className="container-wide">
    <div className="text-center mb-12">
      <h2 className="display-lg text-white mb-4">Section Title</h2>
      <p className="body-lg text-slate-400 max-w-2xl mx-auto">
        Section description.
      </p>
    </div>

    {/* Section content */}
    <ComponentName />
  </div>
</section>
```

### Section Order (Updated)

```tsx
<main>
  <Navigation />

  {/* 1. Hero Section (existing) */}
  <section>...</section>

  {/* 2. Terminal Animation (NEW - hero feature) */}
  <section>
    <TerminalAnimation />
  </section>

  {/* 3. Recursive Showcase (NEW - meta-reference) */}
  <section>
    <LiveDashboard />
  </section>

  {/* 4. Pipeline Section (existing, enhanced) */}
  <section>...</section>

  {/* 5. Agent Visualization (NEW) */}
  <section>
    <AgentVisualization />
  </section>

  {/* 6. Benefits Section (existing) */}
  <section>...</section>

  {/* 7. Slash Commands (NEW) */}
  <section>
    <SlashCommands />
  </section>

  {/* 8. Code Generation Demo (NEW) */}
  <section>
    <CodeGenDemo />
  </section>

  {/* 9. Technical Depth Section (existing, fixed) */}
  <section>...</section>

  {/* 10. Final CTA (existing) */}
  <section>...</section>

  <Footer />
</main>
```

---

## Import Order Convention

```typescript
// 1. React and core libraries
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

// 2. Next.js imports
import Link from "next/link";
import Image from "next/image";

// 3. Local components (absolute imports)
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { TerminalAnimation } from "@/app/components/2l/TerminalAnimation";

// 4. External libraries (icons, etc.)
import {
  Target,
  Search,
  Terminal,
  // ... more icons
} from "lucide-react";

// 5. Types and interfaces (if separate file)
import type { TerminalLine } from "@/types/terminal";

// 6. Constants and data
const ANIMATION_DURATION = 2000;
```

---

## CSS Animation Pattern

### Add New Animations to globals.css

```css
/* ========== BUILDER-X: Feature Name ========== */

@keyframes animation-name {
  0% { /* start state */ }
  50% { /* mid state (optional) */ }
  100% { /* end state */ }
}

.animation-class {
  animation: animation-name duration timing-function iteration-count;
}

/* ========== END BUILDER-X ========== */
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .animation-class {
    animation: none;
  }

  /* Provide static fallback if needed */
  .animation-class {
    opacity: 1;
    transform: none;
  }
}
```

---

## Error Handling Pattern

### Animation Error Boundary

```typescript
// In component with animations
useEffect(() => {
  try {
    // Animation setup
    animationRef.current = requestAnimationFrame(animate);
  } catch (error) {
    console.error('Animation error:', error);
    // Fallback to static state
    setIsAnimating(false);
  }

  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
}, []);
```

---

## Performance Patterns

### Intersection Observer for Lazy Animation

```typescript
const [isVisible, setIsVisible] = useState(false);
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
    { threshold: 0.1 }
  );

  if (containerRef.current) {
    observer.observe(containerRef.current);
  }

  return () => observer.disconnect();
}, []);

// Only run animation when visible
useEffect(() => {
  if (!isVisible) return;
  // Start animation
}, [isVisible]);
```

### CSS will-change Hint

```tsx
// Apply sparingly to animated elements
<div
  className="agent-orb"
  style={{ willChange: 'transform, box-shadow' }}
>
```

---

## Mobile Responsiveness Pattern

### Responsive Grid

```tsx
// Terminal - full width on mobile
<div className="w-full max-w-3xl mx-auto">

// Agent orbs - adjust for mobile
<div className="grid grid-cols-3 md:grid-cols-6 gap-4">

// Dashboard metrics - 2 cols mobile, 4 cols desktop
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
```

### Font Size Adjustments

```tsx
// Terminal text
<span className="text-xs md:text-sm font-mono">

// Dashboard numbers
<span className="text-xl md:text-2xl font-bold">
```

---

## Testing Patterns

### Visual Test Checklist

```markdown
- [ ] Logo navigates to homepage from /2l
- [ ] Terminal animation plays on page load
- [ ] Terminal loops after completion
- [ ] Agent orbs float smoothly
- [ ] Dashboard metrics count up on scroll
- [ ] All text readable on mobile (320px)
- [ ] Reduced motion users see static content
- [ ] No console errors
```

### Build Verification

```bash
# Run before committing
npm run lint
npm run build

# Verify no TypeScript errors
npx tsc --noEmit
```

---

## Summary: Key Patterns for Builders

| Pattern | When to Use | File Reference |
|---------|-------------|----------------|
| useTerminalTyping | Character-by-character text | TerminalAnimation.tsx |
| useCountUp | Animated numbers | useCountUp.ts (existing) |
| IntersectionObserver | Scroll-triggered animations | Any component |
| CSS @keyframes | Floating, pulsing, glowing | globals.css |
| requestAnimationFrame | Precise timing animations | Custom hooks |
| section-reveal-X | Staggered section reveals | page.tsx |
| contemplative-card | Glassmorphic card style | Any card component |
| card-lift-premium | Card hover effects | Any interactive card |
