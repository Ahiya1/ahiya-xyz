# Code Patterns & Conventions - Iteration 10

## File Structure

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/
├── app/
│   ├── components/          # Shared React components
│   │   └── Navigation.tsx   # Site navigation
│   ├── hooks/               # NEW - Shared React hooks
│   │   ├── useScrollReveal.ts
│   │   └── useCountUp.ts
│   ├── projects/            # Project detail pages
│   │   ├── statviz/
│   │   ├── wealth/
│   │   ├── mirror-of-dreams/
│   │   └── ai-research-pipeline/
│   ├── 2l/                  # 2L methodology page
│   ├── capabilities/        # Capabilities landing page
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── scripts/                 # Build-time scripts
│   └── generate-capabilities-pdf.tsx
├── public/                  # Static assets
│   ├── logo-text.png
│   └── ahiya-capabilities.pdf  # Generated
└── package.json
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `StatVizDemo.tsx`, `Navigation.tsx` |
| Hooks | camelCase with "use" prefix | `useScrollReveal.ts`, `useCountUp.ts` |
| Pages | `page.tsx` (Next.js convention) | `app/2l/page.tsx` |
| CSS Classes | kebab-case | `.section-reveal`, `.demo-bar` |
| CSS Keyframes | kebab-case | `@keyframes phase-pulse` |
| TypeScript Interfaces | PascalCase | `NavItem`, `MockupScreen` |
| Functions | camelCase | `handleTabChange()`, `generatePDF()` |
| Constants | SCREAMING_SNAKE_CASE | `TARGET_BALANCE`, `ANIMATION_DURATION` |

---

## Navigation Link Pattern

### When to use
For navigation items that mix internal routes (`/2l`) with anchor links (`#portfolio`).

### Code Example

```typescript
// /app/components/Navigation.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";  // CRITICAL: Import Link from next/link
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

// PATTERN: Hash links must include homepage path for cross-page navigation
const navItems: NavItem[] = [
  { label: "Work", href: "/#portfolio" },           // NOT "#portfolio"
  { label: "Process", href: "/#how-i-work" },       // NOT "#how-we-work"
  { label: "2L", href: "/2l" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/#contact" },          // NOT "#contact"
];

export function Navigation() {
  // ... component state ...

  return (
    <nav>
      {/* PATTERN: Conditional rendering based on href type */}
      {navItems.map((item) =>
        item.href.startsWith("/#") || item.href.startsWith("/") && !item.href.includes("#") ? (
          // Internal route or homepage hash - use Link
          <Link
            key={item.href}
            href={item.href}
            className="text-slate-300 hover:text-white transition-colors"
          >
            {item.label}
          </Link>
        ) : (
          // Pure anchor on same page - use <a>
          <a
            key={item.href}
            href={item.href}
            className="text-slate-300 hover:text-white transition-colors"
          >
            {item.label}
          </a>
        )
      )}
    </nav>
  );
}
```

### Key Points
- Always use `Link` from `next/link` for internal routes
- Hash links to homepage sections must be `/#section`, not `#section`
- This ensures navigation works from ANY page (e.g., `/projects/statviz`)

---

## PDF Generation Pattern

### When to use
For creating static PDF documents at build time.

### Setup Pattern

```typescript
// /scripts/generate-capabilities-pdf.tsx

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
  renderToFile
} from '@react-pdf/renderer';
import path from 'path';

// PATTERN: Define styles separately for maintainability
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottom: '2px solid #7c3aed',
    paddingBottom: 20,
  },
  logo: {
    width: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  text: {
    fontSize: 11,
    color: '#334155',
    lineHeight: 1.6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '50%',
    paddingRight: 10,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 10,
    color: '#334155',
    marginBottom: 4,
    paddingLeft: 8,
  },
});

// PATTERN: Document as React component
const CapabilitiesDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image
          src={path.join(process.cwd(), 'public', 'logo-text.png')}
          style={styles.logo}
        />
        <View>
          <Text style={styles.title}>Ahiya Butman</Text>
          <Text style={styles.subtitle}>Systems Developer & AI Architect</Text>
        </View>
      </View>

      {/* Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What I Build</Text>
        <Text style={styles.text}>
          Custom research systems, business tools, and AI pipelines.
        </Text>
      </View>

      {/* Two-column grid pattern */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Capabilities</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Full-Stack Development</Text>
            <Text style={styles.listItem}>Next.js, React, TypeScript</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>AI Integration</Text>
            <Text style={styles.listItem}>Claude, GPT, Custom Pipelines</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={{ position: 'absolute', bottom: 40, left: 40, right: 40 }}>
        <Text style={{ fontSize: 9, color: '#94a3b8', textAlign: 'center' }}>
          ahiya.xyz | ahiya.butman@gmail.com
        </Text>
      </View>
    </Page>
  </Document>
);

// PATTERN: Async generation function
async function generatePDF() {
  const outputPath = path.join(process.cwd(), 'public', 'ahiya-capabilities.pdf');

  await renderToFile(<CapabilitiesDocument />, outputPath);

  console.log(`PDF generated: ${outputPath}`);
}

generatePDF().catch(console.error);
```

### package.json Scripts Pattern

```json
{
  "scripts": {
    "generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx",
    "prebuild": "npm run generate:pdf",
    "build": "next build"
  }
}
```

### Key Points
- Use `renderToFile` for Node.js build-time generation
- Path resolution uses `process.cwd()` for project root
- Output to `/public/` for static serving
- `prebuild` script ensures PDF exists before Next.js build

---

## Intersection Observer Hook Pattern

### When to use
For scroll-triggered animations and visibility detection.

### Code Example

```typescript
// /app/hooks/useScrollReveal.ts

"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
```

### Usage Pattern

```tsx
// In any component
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

function MySection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      <h2>Content appears on scroll</h2>
    </section>
  );
}
```

### Key Points
- Hook returns `ref` to attach and `isVisible` boolean
- `triggerOnce: true` (default) = animation plays once
- `triggerOnce: false` = animation reverses when out of view
- Use Tailwind transitions for smooth effects

---

## Count-Up Animation Hook Pattern

### When to use
For animating numbers from 0 to target value.

### Code Example

```typescript
// /app/hooks/useCountUp.ts

"use client";

import { useEffect, useState } from "react";

interface UseCountUpOptions {
  duration?: number;
  delay?: number;
  startOnMount?: boolean;
}

export function useCountUp(
  target: number,
  options: UseCountUpOptions = {}
) {
  const { duration = 1500, delay = 0, startOnMount = true } = options;
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const start = () => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = Date.now();
    const endTime = startTime + duration;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target); // Ensure exact final value
      }
    };

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);
  };

  useEffect(() => {
    if (startOnMount) {
      start();
    }
  }, [startOnMount]);

  return { count, start, hasStarted };
}
```

### Usage Pattern

```tsx
// Combined with scroll reveal
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { useCountUp } from "@/app/hooks/useCountUp";
import { useEffect } from "react";

function MetricDisplay({ value, label }: { value: number; label: string }) {
  const { ref, isVisible } = useScrollReveal();
  const { count, start } = useCountUp(value, { startOnMount: false });

  useEffect(() => {
    if (isVisible) {
      start();
    }
  }, [isVisible, start]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-white tabular-nums">
        {count}
      </div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
}
```

### Key Points
- `tabular-nums` CSS class prevents layout shift during counting
- Combine with `useScrollReveal` to trigger on visibility
- Ease-out cubic provides natural deceleration

---

## Demo Component Pattern

### When to use
For creating interactive project demonstrations.

### Base Structure

```typescript
// /app/projects/[project]/Demo.tsx

"use client";

import { useState, useEffect } from "react";

interface DemoProps {
  className?: string;
}

export function ProjectDemo({ className = "" }: DemoProps) {
  const [mounted, setMounted] = useState(false);
  const [animationState, setAnimationState] = useState(false);

  // Hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger animation after mount
  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => setAnimationState(true), 300);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  // Loading skeleton for SSR
  if (!mounted) {
    return (
      <div className={`contemplative-card p-6 ${className}`}>
        <div className="h-48 bg-white/5 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`contemplative-card p-6 overflow-hidden ${className}`}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-400/60" />
        </div>
        <span className="text-xs text-slate-500 ml-2">Demo Title</span>
      </div>

      {/* Demo content */}
      <div className="space-y-4">
        {/* Animated content here */}
      </div>
    </div>
  );
}
```

### Key Points
- Always include hydration safety (`mounted` state)
- Use `contemplative-card` class for consistent styling
- Include window chrome (traffic lights) for mockup feel
- Delay animation start for smooth entrance

---

## StatViz Demo Pattern

### Code Example

```tsx
// Inline in /app/projects/statviz/page.tsx or separate component

function StatVizDemo() {
  const [activeView, setActiveView] = useState<'distribution' | 'correlation' | 'significance'>('distribution');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const barHeights = [40, 65, 45, 80, 55, 70, 60];

  return (
    <div className="contemplative-card p-6">
      {/* View toggles */}
      <div className="flex gap-2 mb-6">
        {(['distribution', 'correlation', 'significance'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeView === view
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      {/* Animated bar chart */}
      <div className="h-32 flex items-end justify-center gap-2 mb-4">
        {barHeights.map((height, i) => (
          <div
            key={i}
            className="w-6 bg-purple-400/40 rounded-t transition-all duration-700"
            style={{
              height: animate ? `${height}%` : '0%',
              transitionDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-white">72.4</div>
          <div className="text-xs text-slate-500">Mean</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-white">12.3</div>
          <div className="text-xs text-slate-500">Std Dev</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-white">156</div>
          <div className="text-xs text-slate-500">N</div>
        </div>
      </div>
    </div>
  );
}
```

---

## Wealth Demo Pattern

### Code Example

```tsx
function WealthDemo() {
  const [balance, setBalance] = useState(0);
  const [animate, setAnimate] = useState(false);
  const targetBalance = 47832.50;

  useEffect(() => {
    setAnimate(true);

    // Animate balance counting
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setBalance(targetBalance * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const categories = [
    { name: 'Food & Dining', percent: 45, color: 'bg-orange-400' },
    { name: 'Transportation', percent: 28, color: 'bg-blue-400' },
    { name: 'Shopping', percent: 16, color: 'bg-pink-400' },
    { name: 'Entertainment', percent: 11, color: 'bg-purple-400' },
  ];

  const transactions = [
    { name: 'Coffee Shop', amount: -12.50, time: 'Just now' },
    { name: 'Supermarket', amount: -156.30, time: '2 min ago' },
    { name: 'Salary', amount: 8500.00, time: 'Yesterday' },
  ];

  return (
    <div className="contemplative-card p-6 space-y-6">
      {/* Balance header */}
      <div className="text-center">
        <div className="text-xs text-slate-500 mb-1">TOTAL BALANCE</div>
        <div className="text-2xl font-bold text-white tabular-nums">
          {formatCurrency(balance)}
        </div>
        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded">
          +2.3%
        </span>
      </div>

      {/* Category bars */}
      <div className="space-y-3">
        {categories.map((cat, i) => (
          <div key={cat.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">{cat.name}</span>
              <span className="text-slate-300">{cat.percent}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full ${cat.color} rounded-full transition-all duration-700`}
                style={{
                  width: animate ? `${cat.percent}%` : '0%',
                  transitionDelay: `${i * 150}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div>
        <div className="text-xs text-slate-500 mb-2">RECENT</div>
        <div className="space-y-2">
          {transactions.map((tx, i) => (
            <div
              key={tx.name}
              className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateX(0)' : 'translateX(20px)',
                transition: 'all 0.5s ease',
                transitionDelay: `${600 + i * 150}ms`,
              }}
            >
              <span className="text-sm text-slate-300">{tx.name}</span>
              <div className="text-right">
                <div className={`text-sm font-medium ${tx.amount > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                </div>
                <div className="text-xs text-slate-500">{tx.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Mirror of Dreams Demo Pattern

### Code Example

```tsx
function MirrorDemo() {
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  const dreamEntry = "Last night I dreamed I was flying over a city made of glass...";
  const aiReflection = "The glass city represents your desire for clarity and transparency in your relationships. Flying suggests a sense of freedom and transcendence over everyday concerns.";

  useEffect(() => {
    // Typing effect
    let index = 0;
    const timer = setInterval(() => {
      if (index < aiReflection.length) {
        setDisplayedText(aiReflection.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="contemplative-card p-6 relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-star ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Dream entry */}
      <div className="relative mb-6">
        <div className="text-xs text-purple-400/60 mb-2">DREAM ENTRY</div>
        <p className="text-slate-300 italic" style={{ fontFamily: 'Georgia, serif' }}>
          "{dreamEntry}"
        </p>
      </div>

      {/* AI Reflection */}
      <div className="relative">
        <div className="text-xs text-purple-400/60 mb-2">AI REFLECTION</div>
        <div className="p-4 bg-purple-500/5 border border-purple-400/10 rounded-lg">
          <p className="text-slate-400 text-sm min-h-[4rem]">
            {displayedText}
            <span
              className={`inline-block w-0.5 h-4 bg-purple-400 ml-0.5 align-middle ${
                cursorVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## Premium CSS Animations Pattern

### Add to globals.css

```css
/* ═══════════════════════════════════════════════════════════════════════════
   PREMIUM MICRO-ANIMATIONS
   ═══════════════════════════════════════════════════════════════════════════ */

/* Pipeline phase pulse */
@keyframes phase-pulse {
  0%, 100% {
    box-shadow: 0 0 0 rgba(168, 85, 247, 0);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
    transform: scale(1.05);
  }
}

/* Connection line flow */
@keyframes line-flow {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Floating star for cosmic backgrounds */
@keyframes float-star {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

/* Subtle breathing animation */
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* Count-up number transition */
@keyframes count-tick {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY CLASSES
   ═══════════════════════════════════════════════════════════════════════════ */

/* Pipeline phase active state */
.pipeline-phase-active {
  animation: phase-pulse 1.5s ease-in-out infinite;
}

/* Animated connection line */
.pipeline-line-animated {
  background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent);
  background-size: 200% 100%;
  animation: line-flow 3s linear infinite;
}

/* Floating icon animation with offset */
.icon-float {
  animation: soft-float 6s ease-in-out infinite;
}
.icon-float-delay-1 { animation-delay: -2s; }
.icon-float-delay-2 { animation-delay: -4s; }

/* Breathing animation */
.animate-breathe {
  animation: breathe 4s ease-in-out infinite;
}

/* Tabular numbers for counting animations */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}

/* Enhanced card hover */
.card-lift-premium {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-lift-premium:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(168, 85, 247, 0.15),
    0 0 60px -10px rgba(168, 85, 247, 0.2);
}

/* Scroll reveal base (JS-controlled) */
.reveal-on-scroll {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-on-scroll:not(.visible) {
  opacity: 0;
  transform: translateY(20px);
}

.reveal-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered reveal children */
.reveal-stagger > *:nth-child(1) { transition-delay: 0s; }
.reveal-stagger > *:nth-child(2) { transition-delay: 0.1s; }
.reveal-stagger > *:nth-child(3) { transition-delay: 0.2s; }
.reveal-stagger > *:nth-child(4) { transition-delay: 0.3s; }
.reveal-stagger > *:nth-child(5) { transition-delay: 0.4s; }
.reveal-stagger > *:nth-child(6) { transition-delay: 0.5s; }

/* Active/press state for buttons */
.gentle-button:active,
.cta-magnetic:active {
  transform: translateY(1px) scale(0.98);
  transition: transform 0.1s ease;
}

/* Focus ring enhancement */
.gentle-button:focus-visible,
.cta-magnetic:focus-visible {
  outline: 2px solid rgba(168, 85, 247, 0.6);
  outline-offset: 3px;
}
```

---

## Import Order Convention

```typescript
// 1. React and Next.js imports
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// 2. Third-party libraries
import { ArrowRight, Menu, X } from "lucide-react";

// 3. Internal hooks
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { useCountUp } from "@/app/hooks/useCountUp";

// 4. Internal components
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";

// 5. Types/interfaces (inline or imported)
interface Props {
  // ...
}
```

---

## Error Handling Pattern

### API/Async Errors (Not applicable this iteration)

### User-Facing Errors

```tsx
// For animation failures - graceful degradation
function SafeDemo({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // Fallback to static content
    return (
      <div className="contemplative-card p-6">
        <p className="text-slate-400">Interactive demo</p>
      </div>
    );
  }

  return <>{children}</>;
}
```

---

## Performance Patterns

### CSS Animation Performance

```css
/* GOOD: Use transform and opacity (GPU-accelerated) */
.animate-good {
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.6s ease, opacity 0.6s ease;
}

/* AVOID: Animating layout properties */
.animate-avoid {
  /* Don't animate: width, height, top, left, margin, padding */
}
```

### Reduced Motion Support

```css
/* Already in globals.css - respect user preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Code Quality Standards

| Standard | Description |
|----------|-------------|
| TypeScript | All new code uses TypeScript with proper types |
| Client Directive | Interactive components use `"use client"` |
| Hydration Safety | Components check `mounted` state before animations |
| Cleanup | useEffect hooks return cleanup functions |
| Accessibility | Animations respect `prefers-reduced-motion` |

---

*Patterns defined: 2025-12-04*
*Iteration: 10 (Plan-8)*
