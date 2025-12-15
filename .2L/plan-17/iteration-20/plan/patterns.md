# Code Patterns & Conventions

## File Structure

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/
├── app/
│   ├── components/
│   │   ├── ambient/          # Iteration-18 ambient layer
│   │   ├── reactive/         # Iteration-19 reactive layer
│   │   ├── choreography/     # NEW - Iteration-20 choreography layer
│   │   │   ├── index.ts
│   │   │   ├── TextShimmer.tsx
│   │   │   ├── HeroBreathing.tsx
│   │   │   ├── SectionReveal.tsx
│   │   │   ├── ConnectedAnimations.tsx
│   │   │   └── ScrollProgressBar.tsx
│   │   ├── Navigation.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useScrollReveal.ts
│   │   ├── useReducedMotion.ts
│   │   ├── useScrollProgress.ts        # NEW
│   │   └── usePeriodicAnimation.ts     # NEW
│   ├── admin/
│   │   ├── components/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── ConversionFunnel.tsx    # NEW
│   │   │   ├── ScrollDepthChart.tsx    # NEW
│   │   │   └── AdminSidebar.tsx        # MODIFY
│   │   └── (dashboard)/
│   │       └── engagement/
│   │           └── page.tsx            # NEW
│   ├── api/
│   │   └── admin/
│   │       └── engagement/
│   │           └── route.ts            # NEW
│   ├── template.tsx                    # NEW
│   ├── page.tsx                        # MODIFY
│   └── globals.css                     # MODIFY
└── lib/
    ├── animation-utils.ts              # MODIFY
    └── types/
        └── events.ts
```

## Naming Conventions

- Components: PascalCase (`TextShimmer.tsx`, `SectionReveal.tsx`)
- Hooks: camelCase with "use" prefix (`useScrollProgress.ts`)
- Test files: Adjacent with `.test.ts` or `.test.tsx` suffix
- CSS keyframes: kebab-case (`text-shimmer`, `hero-breathe`)
- Spring presets: camelCase (`reveal`, `cascade`)
- Types/Interfaces: PascalCase (`EngagementApiResponse`)

## Import Order Convention

```typescript
// 1. React imports
import { useState, useEffect, useRef } from "react";

// 2. Next.js imports
import { usePathname } from "next/navigation";
import Link from "next/link";

// 3. Third-party libraries
import { motion, AnimatePresence, useSpring } from "framer-motion";
import useSWR from "swr";

// 4. Internal lib imports
import { springPresets, useIsMobile } from "@/lib/animation-utils";
import type { EventCategory } from "@/lib/types/events";

// 5. Internal app imports - hooks
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useScrollProgress } from "@/app/hooks/useScrollProgress";

// 6. Internal app imports - components
import { MetricCard } from "@/app/admin/components/MetricCard";

// 7. Types (if separate)
import type { SectionRevealVariant } from "./types";
```

---

## Choreography Component Patterns

### Pattern: useScrollProgress Hook

**When to use:** Track continuous scroll position as percentage for progress bar

**Code example:**
```typescript
// /app/hooks/useScrollProgress.ts
"use client";

import { useState, useEffect } from "react";

/**
 * Hook to track scroll progress as percentage (0-100)
 * Uses passive scroll listener for performance
 *
 * @returns Current scroll progress percentage
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;

      // Avoid division by zero
      const scrollable = scrollHeight - clientHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const percent = (scrollTop / scrollable) * 100;
      setProgress(Math.min(100, Math.max(0, percent)));
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
```

**Key points:**
- Uses `{ passive: true }` for performance
- Guards against SSR with `typeof window` check
- Returns 0-100 range, clamped

---

### Pattern: usePeriodicAnimation Hook

**When to use:** Trigger animations on a timer (shimmer every 8-10 seconds)

**Code example:**
```typescript
// /app/hooks/usePeriodicAnimation.ts
"use client";

import { useState, useEffect, useCallback } from "react";

interface UsePeriodicAnimationOptions {
  /** Interval between triggers in ms (default: 9000) */
  intervalMs?: number;
  /** Duration of animation in ms (default: 1500) */
  durationMs?: number;
  /** Initial delay before first trigger in ms (default: intervalMs) */
  initialDelayMs?: number;
  /** Whether the animation is enabled (default: true) */
  enabled?: boolean;
}

/**
 * Hook to trigger periodic animations
 * Returns isAnimating state that goes true for durationMs every intervalMs
 *
 * @returns Object with isAnimating state and manual trigger function
 */
export function usePeriodicAnimation({
  intervalMs = 9000,
  durationMs = 1500,
  initialDelayMs,
  enabled = true,
}: UsePeriodicAnimationOptions = {}): {
  isAnimating: boolean;
  trigger: () => void;
} {
  const [isAnimating, setIsAnimating] = useState(false);

  const trigger = useCallback(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, durationMs);
    return () => clearTimeout(timeout);
  }, [durationMs]);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    // Initial delay (defaults to intervalMs)
    const delay = initialDelayMs ?? intervalMs;

    const initialTimeout = setTimeout(() => {
      trigger();
    }, delay);

    // Regular interval
    const interval = setInterval(() => {
      trigger();
    }, intervalMs);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [intervalMs, initialDelayMs, enabled, trigger]);

  return { isAnimating, trigger };
}
```

**Key points:**
- Configurable interval, duration, and initial delay
- Returns manual trigger function for testing
- Respects enabled flag (for reduced motion)

---

### Pattern: TextShimmer Component

**When to use:** Apply periodic shimmer effect to headline text

**Code example:**
```typescript
// /app/components/choreography/TextShimmer.tsx
"use client";

import { type ReactNode } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { usePeriodicAnimation } from "@/app/hooks/usePeriodicAnimation";

interface TextShimmerProps {
  children: ReactNode;
  /** Interval between shimmers in ms (default: 9000) */
  intervalMs?: number;
  /** Duration of shimmer animation in ms (default: 1500) */
  durationMs?: number;
  /** Additional className */
  className?: string;
}

/**
 * TextShimmer wraps text content and applies periodic shimmer effect.
 * Uses CSS gradient mask animation triggered by state change.
 *
 * Usage:
 * ```tsx
 * <TextShimmer intervalMs={9000}>
 *   <h1>Intention. Clarity. Results.</h1>
 * </TextShimmer>
 * ```
 */
export function TextShimmer({
  children,
  intervalMs = 9000,
  durationMs = 1500,
  className = "",
}: TextShimmerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { isAnimating } = usePeriodicAnimation({
    intervalMs,
    durationMs,
    enabled: !prefersReducedMotion,
  });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      {children}
      {/* Shimmer overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isAnimating ? "animate-text-shimmer" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export default TextShimmer;
```

**CSS keyframe to add to globals.css:**
```css
@keyframes text-shimmer {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}

.animate-text-shimmer {
  animation: text-shimmer 1.5s ease-in-out;
}
```

---

### Pattern: HeroBreathing Component

**When to use:** Apply continuous subtle scale animation to hero content

**Code example:**
```typescript
// /app/components/choreography/HeroBreathing.tsx
"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface HeroBreathingProps {
  children: ReactNode;
  /** Scale amplitude (default: 1.005 means 1.0 to 1.005) */
  scaleAmplitude?: number;
  /** Animation duration in seconds (default: 6) */
  durationSeconds?: number;
  /** Additional className */
  className?: string;
}

/**
 * HeroBreathing wraps content with continuous subtle scale animation.
 * Creates "breathing" effect that makes hero feel alive.
 *
 * Usage:
 * ```tsx
 * <HeroBreathing>
 *   <h1 className="display-xl">Intention. Clarity. Results.</h1>
 * </HeroBreathing>
 * ```
 */
export function HeroBreathing({
  children,
  scaleAmplitude = 1.005,
  durationSeconds = 6,
  className = "",
}: HeroBreathingProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scaleAmplitude, 1],
      }}
      transition={{
        duration: durationSeconds,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

export default HeroBreathing;
```

---

### Pattern: SectionReveal Component with Variants

**When to use:** Orchestrate scroll-triggered reveals with different animation styles

**Code example:**
```typescript
// /app/components/choreography/SectionReveal.tsx
"use client";

import { motion, type Variants, useInView } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { springPresets } from "@/lib/animation-utils";

export type SectionRevealVariant = "fade" | "fan-in" | "cascade" | "scale-glow";

interface SectionRevealProps {
  children: ReactNode;
  /** Animation variant (default: "fade") */
  variant?: SectionRevealVariant;
  /** Custom index for child animations */
  index?: number;
  /** Total count of items (for fan-in variant) */
  totalItems?: number;
  /** Additional className */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
}

// Container variants for orchestration
const containerVariants: Record<SectionRevealVariant, Variants> = {
  fade: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  },
  "fan-in": {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
  cascade: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.05 },
    },
  },
  "scale-glow": {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  },
};

// Item variants factory
function getItemVariants(variant: SectionRevealVariant, index: number, totalItems: number): Variants {
  switch (variant) {
    case "fan-in":
      // Top row comes from above, bottom row from below
      const isTopRow = totalItems > 2 ? index < Math.ceil(totalItems / 2) : index === 0;
      return {
        hidden: {
          opacity: 0,
          y: isTopRow ? -30 : 30,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", ...springPresets.gentle },
        },
      };

    case "cascade":
      return {
        hidden: { opacity: 0, y: 20, x: -10 },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { type: "spring", ...springPresets.gentle },
        },
      };

    case "scale-glow":
      return {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { type: "spring", ...springPresets.snappy },
        },
      };

    case "fade":
    default:
      return {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      };
  }
}

/**
 * SectionReveal orchestrates scroll-triggered animations for section content.
 *
 * Usage:
 * ```tsx
 * <SectionReveal variant="fan-in" totalItems={4}>
 *   {cards.map((card, index) => (
 *     <SectionReveal.Item key={card.id} index={index}>
 *       <Card />
 *     </SectionReveal.Item>
 *   ))}
 * </SectionReveal>
 * ```
 */
export function SectionReveal({
  children,
  variant = "fade",
  className = "",
  style,
}: Omit<SectionRevealProps, "index" | "totalItems"> & { totalItems?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={containerVariants[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// Sub-component for individual items
interface SectionRevealItemProps {
  children: ReactNode;
  index?: number;
  totalItems?: number;
  variant?: SectionRevealVariant;
  className?: string;
}

function SectionRevealItem({
  children,
  index = 0,
  totalItems = 1,
  variant = "fade",
  className = "",
}: SectionRevealItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={getItemVariants(variant, index, totalItems)}
    >
      {children}
    </motion.div>
  );
}

SectionReveal.Item = SectionRevealItem;

export default SectionReveal;
```

---

### Pattern: ConnectedAnimations (Group Awareness)

**When to use:** Make portfolio cards respond to each other's hover state

**Code example:**
```typescript
// /app/components/choreography/ConnectedAnimations.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from "react";

interface ConnectedAnimationsContextValue {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const ConnectedAnimationsContext = createContext<ConnectedAnimationsContextValue | null>(null);

interface ConnectedAnimationsProviderProps {
  children: ReactNode;
}

/**
 * ConnectedAnimationsProvider enables group awareness for sibling elements.
 * When one element is hovered, siblings can respond.
 *
 * Usage:
 * ```tsx
 * <ConnectedAnimationsProvider>
 *   {cards.map((card, index) => (
 *     <ConnectedCard key={card.id} index={index}>
 *       <Card />
 *     </ConnectedCard>
 *   ))}
 * </ConnectedAnimationsProvider>
 * ```
 */
export function ConnectedAnimationsProvider({ children }: ConnectedAnimationsProviderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ConnectedAnimationsContext.Provider value={{ hoveredIndex, setHoveredIndex }}>
      {children}
    </ConnectedAnimationsContext.Provider>
  );
}

/**
 * Hook to access connected animations context
 */
export function useConnectedAnimations() {
  const context = useContext(ConnectedAnimationsContext);
  if (!context) {
    throw new Error("useConnectedAnimations must be used within ConnectedAnimationsProvider");
  }
  return context;
}

interface ConnectedCardProps {
  children: ReactNode;
  index: number;
  className?: string;
  /** Opacity when another card is hovered (default: 0.7) */
  recededOpacity?: number;
  /** Scale when another card is hovered (default: 0.98) */
  recededScale?: number;
}

/**
 * ConnectedCard responds to sibling hover states.
 * When a sibling is hovered, this card recedes (opacity + scale).
 */
export function ConnectedCard({
  children,
  index,
  className = "",
  recededOpacity = 0.7,
  recededScale = 0.98,
}: ConnectedCardProps) {
  const { hoveredIndex, setHoveredIndex } = useConnectedAnimations();

  const isHovered = hoveredIndex === index;
  const isReceded = hoveredIndex !== null && !isHovered;

  const handleMouseEnter = useCallback(() => {
    setHoveredIndex(index);
  }, [index, setHoveredIndex]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, [setHoveredIndex]);

  return (
    <div
      className={`transition-all duration-300 ${className}`}
      style={{
        opacity: isReceded ? recededOpacity : 1,
        transform: isReceded ? `scale(${recededScale})` : "scale(1)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default ConnectedAnimationsProvider;
```

---

### Pattern: ScrollProgressBar Component

**When to use:** Show scroll progress indicator in navigation

**Code example:**
```typescript
// /app/components/choreography/ScrollProgressBar.tsx
"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/app/hooks/useScrollProgress";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface ScrollProgressBarProps {
  /** Height in pixels (default: 2) */
  height?: number;
  /** Background color (default: transparent) */
  bgColor?: string;
  /** Progress bar color (default: purple gradient) */
  barColor?: string;
  /** Additional className */
  className?: string;
}

/**
 * ScrollProgressBar shows scroll position as a horizontal progress bar.
 * Designed to be placed at the top of the navigation.
 *
 * Usage:
 * ```tsx
 * <nav className="fixed top-0 ...">
 *   <ScrollProgressBar />
 *   {/* rest of nav *\/}
 * </nav>
 * ```
 */
export function ScrollProgressBar({
  height = 2,
  bgColor = "transparent",
  barColor = "linear-gradient(90deg, #a855f7, #6366f1)",
  className = "",
}: ScrollProgressBarProps) {
  const progress = useScrollProgress();
  const prefersReducedMotion = useReducedMotion();

  // Hide when at top of page
  if (progress < 1) {
    return null;
  }

  return (
    <div
      className={`absolute top-0 left-0 right-0 ${className}`}
      style={{ height: `${height}px`, backgroundColor: bgColor }}
    >
      <motion.div
        className="h-full"
        style={{
          background: barColor,
          width: `${progress}%`,
        }}
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.1 }}
      />
    </div>
  );
}

export default ScrollProgressBar;
```

---

### Pattern: Page Transitions with template.tsx

**When to use:** Smooth transitions between pages

**Code example:**
```typescript
// /app/template.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
}

/**
 * Template wraps page content for transitions.
 * Uses AnimatePresence to animate between routes.
 */
export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  // Skip transitions for admin routes
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Key points:**
- Uses `mode="wait"` to complete exit before enter
- Simple opacity fade (0.2s) for performance
- Skips admin routes to avoid dashboard disruption

---

### Pattern: Barrel Export for Choreography

**When to use:** Clean imports from choreography module

**Code example:**
```typescript
// /app/components/choreography/index.ts
export { TextShimmer } from "./TextShimmer";
export { HeroBreathing } from "./HeroBreathing";
export { SectionReveal } from "./SectionReveal";
export type { SectionRevealVariant } from "./SectionReveal";
export {
  ConnectedAnimationsProvider,
  ConnectedCard,
  useConnectedAnimations,
} from "./ConnectedAnimations";
export { ScrollProgressBar } from "./ScrollProgressBar";
```

---

## Admin Dashboard Patterns

### Pattern: Admin Page Structure

**When to use:** Creating new admin dashboard pages

**Code example:**
```typescript
// /app/admin/(dashboard)/engagement/page.tsx
"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { BarChart2 } from "lucide-react";

import {
  TimeRangeSelector,
  TimeRange,
} from "@/app/admin/components/TimeRangeSelector";
import { MetricCard } from "@/app/admin/components/MetricCard";
import { EmptyState } from "@/app/admin/components/EmptyState";
import { ConversionFunnel } from "@/app/admin/components/ConversionFunnel";
import { ScrollDepthChart } from "@/app/admin/components/ScrollDepthChart";

// Types
interface EngagementData {
  metrics: {
    avgScrollDepth: MetricData;
    avgTimeOnPage: MetricData;
    engagementScore: MetricData;
    totalSessions: MetricData;
  };
  funnel: FunnelData;
  scrollDistribution: ScrollDistributionData[];
  topClicks: ClickData[];
}

interface MetricData {
  value: number;
  change: number;
  trend: "up" | "down" | "neutral";
  sparkline: { value: number }[];
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function EngagementPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");

  const { data, error, isLoading } = useSWR<EngagementData>(
    `/api/admin/engagement?range=${timeRange}`,
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
    }
  );

  const hasData = data && data.metrics.totalSessions.value > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-xl text-white mb-2">Engagement</h1>
          <p className="text-slate-400">
            Understand how visitors interact with your site
          </p>
        </div>
        <TimeRangeSelector value={timeRange} onRangeChange={setTimeRange} />
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
          Failed to load engagement data. Please try again.
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Avg Scroll Depth"
          value={data?.metrics.avgScrollDepth.value ? `${data.metrics.avgScrollDepth.value}%` : "-"}
          change={data?.metrics.avgScrollDepth.change ?? 0}
          trend={data?.metrics.avgScrollDepth.trend ?? "neutral"}
          data={data?.metrics.avgScrollDepth.sparkline ?? []}
          isLoading={isLoading}
        />
        {/* ... more MetricCards */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Conversion Funnel</h3>
          </div>
          {!hasData ? (
            <EmptyState
              icon={BarChart2}
              title="No engagement data"
              description="Funnel data will appear as visitors interact with your site."
            />
          ) : (
            <ConversionFunnel data={data.funnel} />
          )}
        </div>

        {/* Scroll Depth Distribution */}
        {/* Similar structure */}
      </div>
    </div>
  );
}
```

---

### Pattern: ConversionFunnel Component

**When to use:** Visualize conversion funnel stages

**Code example:**
```typescript
// /app/admin/components/ConversionFunnel.tsx
"use client";

import React from "react";
import {
  FunnelChart,
  Funnel,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface FunnelData {
  pageViews: number;
  scroll50: number;
  ctaClicks: number;
  calOpens: number;
}

interface ConversionFunnelProps {
  data: FunnelData;
}

const COLORS = ["#a855f7", "#8b5cf6", "#6366f1", "#4f46e5"];

const STAGE_LABELS: Record<string, string> = {
  pageViews: "Page Views",
  scroll50: "Scrolled 50%",
  ctaClicks: "CTA Clicks",
  calOpens: "Cal.com Opens",
};

/**
 * ConversionFunnel visualizes the conversion pipeline.
 */
export function ConversionFunnel({ data }: ConversionFunnelProps) {
  const funnelData = [
    { name: "Page Views", value: data.pageViews, fill: COLORS[0] },
    { name: "Scrolled 50%", value: data.scroll50, fill: COLORS[1] },
    { name: "CTA Clicks", value: data.ctaClicks, fill: COLORS[2] },
    { name: "Cal.com Opens", value: data.calOpens, fill: COLORS[3] },
  ];

  // Calculate conversion rates
  const rates = funnelData.map((item, index) => {
    if (index === 0) return 100;
    const prev = funnelData[index - 1].value;
    return prev > 0 ? Math.round((item.value / prev) * 100) : 0;
  });

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Funnel
            data={funnelData}
            dataKey="value"
            isAnimationActive={true}
          >
            {funnelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList
              position="right"
              fill="#fff"
              stroke="none"
              dataKey="name"
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>

      {/* Conversion rates below */}
      <div className="flex justify-between mt-4 text-sm">
        {rates.slice(1).map((rate, index) => (
          <div key={index} className="text-center">
            <div className="text-slate-400">{funnelData[index].name} to</div>
            <div className="text-white font-medium">{rate}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConversionFunnel;
```

---

### Pattern: API Route for Engagement Data

**When to use:** Backend endpoint for engagement metrics

**Code example:**
```typescript
// /app/api/admin/engagement/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

// Auth check (reuse existing pattern)
async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === process.env.ADMIN_SESSION_SECRET;
}

// Get date range from query param
function getDateRange(range: string): Date {
  const now = new Date();
  switch (range) {
    case "today":
      return new Date(now.setHours(0, 0, 0, 0));
    case "7d":
      return new Date(now.setDate(now.getDate() - 7));
    case "30d":
      return new Date(now.setDate(now.getDate() - 30));
    case "90d":
      return new Date(now.setDate(now.getDate() - 90));
    default:
      return new Date(now.setDate(now.getDate() - 7));
  }
}

export async function GET(request: NextRequest) {
  // Auth check
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const range = searchParams.get("range") || "7d";
  const startDate = getDateRange(range);
  const startDateStr = startDate.toISOString();

  try {
    // Parallel queries for performance
    const [scrollDepth, timeOnPage, funnel, scrollDist, topClicks] = await Promise.all([
      // Average scroll depth
      sql`
        SELECT
          COALESCE(AVG(max_scroll), 0) as avg_scroll
        FROM (
          SELECT session_id, MAX(event_value) as max_scroll
          FROM events
          WHERE event_category = 'scroll'
            AND created_at >= ${startDateStr}::timestamptz
          GROUP BY session_id
        ) per_session
      `,

      // Average time on page (in seconds)
      sql`
        SELECT
          COALESCE(AVG(event_value) / 1000, 0) as avg_seconds,
          COUNT(DISTINCT session_id) as sessions
        FROM events
        WHERE event_category = 'engagement'
          AND event_action = 'time_on_page'
          AND created_at >= ${startDateStr}::timestamptz
      `,

      // Conversion funnel
      sql`
        WITH pageview_sessions AS (
          SELECT COUNT(DISTINCT session_id) as count FROM page_views
          WHERE created_at >= ${startDateStr}::timestamptz
        ),
        scroll_sessions AS (
          SELECT COUNT(DISTINCT session_id) as count FROM events
          WHERE event_category = 'scroll' AND event_value >= 50
            AND created_at >= ${startDateStr}::timestamptz
        ),
        click_sessions AS (
          SELECT COUNT(DISTINCT session_id) as count FROM events
          WHERE event_category = 'click' AND event_action LIKE 'cta_%'
            AND created_at >= ${startDateStr}::timestamptz
        ),
        cal_sessions AS (
          SELECT COUNT(DISTINCT session_id) as count FROM events
          WHERE event_category = 'conversion'
            AND created_at >= ${startDateStr}::timestamptz
        )
        SELECT
          pv.count as page_views,
          s.count as scroll_50,
          c.count as cta_clicks,
          cal.count as cal_opens
        FROM pageview_sessions pv
        CROSS JOIN scroll_sessions s
        CROSS JOIN click_sessions c
        CROSS JOIN cal_sessions cal
      `,

      // Scroll distribution
      sql`
        SELECT
          CASE
            WHEN event_value <= 25 THEN '25%'
            WHEN event_value <= 50 THEN '50%'
            WHEN event_value <= 75 THEN '75%'
            ELSE '100%'
          END as milestone,
          COUNT(DISTINCT session_id) as sessions
        FROM events
        WHERE event_category = 'scroll'
          AND created_at >= ${startDateStr}::timestamptz
        GROUP BY milestone
        ORDER BY milestone
      `,

      // Top clicked elements
      sql`
        SELECT
          event_label as label,
          SPLIT_PART(event_action, '_', 1) as category,
          COUNT(*) as count,
          page_path
        FROM events
        WHERE event_category = 'click'
          AND event_label IS NOT NULL
          AND created_at >= ${startDateStr}::timestamptz
        GROUP BY event_label, event_action, page_path
        ORDER BY count DESC
        LIMIT 10
      `,
    ]);

    // Calculate engagement score
    const avgScroll = Number(scrollDepth.rows[0]?.avg_scroll || 0);
    const avgTime = Number(timeOnPage.rows[0]?.avg_seconds || 0);
    const sessions = Number(timeOnPage.rows[0]?.sessions || 0);

    // Normalize: scroll 0-100, time capped at 300s, interactions placeholder
    const scrollScore = avgScroll * 0.3;
    const timeScore = Math.min(100, (avgTime / 300) * 100) * 0.4;
    const interactionScore = 50 * 0.3; // Placeholder
    const engagementScore = Math.round(scrollScore + timeScore + interactionScore);

    return NextResponse.json({
      metrics: {
        avgScrollDepth: {
          value: Math.round(avgScroll),
          change: 0,
          trend: "neutral" as const,
          sparkline: [],
        },
        avgTimeOnPage: {
          value: Math.round(avgTime),
          change: 0,
          trend: "neutral" as const,
          sparkline: [],
        },
        engagementScore: {
          value: engagementScore,
          change: 0,
          trend: "neutral" as const,
          sparkline: [],
        },
        totalSessions: {
          value: sessions,
          change: 0,
          trend: "neutral" as const,
          sparkline: [],
        },
      },
      funnel: funnel.rows[0] || { page_views: 0, scroll_50: 0, cta_clicks: 0, cal_opens: 0 },
      scrollDistribution: scrollDist.rows,
      topClicks: topClicks.rows,
    });
  } catch (error) {
    console.error("Engagement API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Testing Patterns

### Test File Naming Conventions

- Unit tests: `{module}.test.ts` or `{component}.test.tsx` (same directory)
- Integration tests: `{feature}.integration.test.ts` (in `__tests__/` directory if needed)

### Test File Structure

```typescript
// app/hooks/useScrollProgress.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollProgress } from "./useScrollProgress";

describe("useScrollProgress", () => {
  let scrollListeners: Array<(e: Event) => void> = [];

  beforeEach(() => {
    scrollListeners = [];

    // Mock window.addEventListener
    vi.spyOn(window, "addEventListener").mockImplementation((event, handler) => {
      if (event === "scroll") {
        scrollListeners.push(handler as (e: Event) => void);
      }
    });

    // Mock document properties
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
      value: 800,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return 0 initially", () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  it("should update progress on scroll", () => {
    const { result } = renderHook(() => useScrollProgress());

    // Simulate scroll to 50%
    Object.defineProperty(window, "scrollY", { value: 600, configurable: true });
    act(() => {
      scrollListeners.forEach((listener) => listener(new Event("scroll")));
    });

    expect(result.current).toBe(50);
  });

  it("should clamp progress between 0 and 100", () => {
    const { result } = renderHook(() => useScrollProgress());

    // Simulate over-scroll
    Object.defineProperty(window, "scrollY", { value: 2000, configurable: true });
    act(() => {
      scrollListeners.forEach((listener) => listener(new Event("scroll")));
    });

    expect(result.current).toBeLessThanOrEqual(100);
  });
});
```

### Mocking Strategies

```typescript
// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useSpring: vi.fn().mockReturnValue({ set: vi.fn(), get: vi.fn() }),
  useInView: vi.fn().mockReturnValue(true),
}));

// Mock useReducedMotion
vi.mock("@/app/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

// Mock fetch for API tests
vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ data: "mocked" }),
}));
```

### Coverage Expectations by Module Type

| Module Type | Minimum Coverage | Target Coverage |
|-------------|------------------|-----------------|
| Hooks | 80% | 90% |
| API Routes | 75% | 85% |
| Utility functions | 90% | 95% |
| Components | 70% | 80% |

### Test Data Factories

```typescript
// lib/test-utils/factories.ts
import type { FunnelData, MetricData } from "@/app/admin/(dashboard)/engagement/page";

export const createMockMetricData = (overrides: Partial<MetricData> = {}): MetricData => ({
  value: 50,
  change: 5.2,
  trend: "up",
  sparkline: [{ value: 40 }, { value: 45 }, { value: 50 }],
  ...overrides,
});

export const createMockFunnelData = (overrides: Partial<FunnelData> = {}): FunnelData => ({
  pageViews: 1000,
  scroll50: 600,
  ctaClicks: 150,
  calOpens: 30,
  ...overrides,
});

export const createMockEngagementResponse = () => ({
  metrics: {
    avgScrollDepth: createMockMetricData({ value: 65 }),
    avgTimeOnPage: createMockMetricData({ value: 45 }),
    engagementScore: createMockMetricData({ value: 72 }),
    totalSessions: createMockMetricData({ value: 1234 }),
  },
  funnel: createMockFunnelData(),
  scrollDistribution: [
    { milestone: "25%", sessions: 1000, percentage: 100 },
    { milestone: "50%", sessions: 750, percentage: 75 },
    { milestone: "75%", sessions: 500, percentage: 50 },
    { milestone: "100%", sessions: 300, percentage: 30 },
  ],
  topClicks: [
    { label: "hero_see_work", category: "cta", count: 150, pagePath: "/" },
    { label: "pricing_starter", category: "cta", count: 80, pagePath: "/pricing" },
  ],
});
```

---

## Security Patterns

### Input Validation (Query Parameters)

```typescript
// Validate time range parameter
function validateTimeRange(range: string | null): TimeRange {
  const validRanges = ["today", "7d", "30d", "90d"];
  if (range && validRanges.includes(range)) {
    return range as TimeRange;
  }
  return "7d"; // Default
}

// Usage in API route
const range = validateTimeRange(searchParams.get("range"));
```

### Auth Middleware Pattern

```typescript
// lib/auth.ts (existing pattern)
import { cookies } from "next/headers";

export class UnauthorizedError extends Error {
  statusCode = 401;
  constructor(message = "Authentication required") {
    super(message);
  }
}

export async function requireAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session?.value || session.value !== process.env.ADMIN_SESSION_SECRET) {
    throw new UnauthorizedError();
  }
}

// Usage in API route
export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth();
    // ... rest of handler
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    throw error;
  }
}
```

### Secure API Response Pattern

```typescript
// Never expose internal errors
export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth();
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    // Log full error for debugging
    console.error("API error:", error);

    // Return sanitized error to client
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Error Handling Patterns

### Component Error Boundary

```typescript
// components/ErrorBoundary.tsx (if not exists)
"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400">Something went wrong.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 text-sm text-slate-400 hover:text-white"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### API Error Response Format

```typescript
// Standard error response
interface ApiErrorResponse {
  error: string;
  code?: string;
}

// Usage
return NextResponse.json(
  { error: "Failed to load engagement data", code: "ENGAGEMENT_LOAD_FAILED" },
  { status: 500 }
);
```

### Hook Error Handling

```typescript
// Hooks should fail gracefully
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Guard against SSR
    if (typeof window === "undefined") return;

    try {
      const handleScroll = () => {
        // ... calculation
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    } catch (error) {
      // Log but don't crash
      console.error("useScrollProgress error:", error);
      return undefined;
    }
  }, []);

  return progress;
}
```

---

## CSS Keyframes to Add

Add to `/app/globals.css`:

```css
/* ═══════════════════════════════════════════════════════════════════════════
   CHOREOGRAPHY ANIMATIONS - Iteration 20
   ═══════════════════════════════════════════════════════════════════════════ */

/* Text shimmer effect */
@keyframes text-shimmer {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}

.animate-text-shimmer {
  animation: text-shimmer 1.5s ease-in-out;
}

/* Hero breathing (CSS fallback if Framer Motion unavailable) */
@keyframes hero-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.005); }
}

.animate-hero-breathe {
  animation: hero-breathe 6s ease-in-out infinite;
}

/* Reduced motion override */
@media (prefers-reduced-motion: reduce) {
  .animate-text-shimmer,
  .animate-hero-breathe {
    animation: none;
  }
}
```

---

## Spring Presets to Add

Add to `/lib/animation-utils.ts`:

```typescript
export const springPresets = {
  // ... existing presets

  /** Reveal - for scroll-triggered section reveals */
  reveal: { stiffness: 100, damping: 20, mass: 0.8 } as SpringOptions,

  /** Cascade - for sequential item animations */
  cascade: { stiffness: 80, damping: 15, mass: 0.5 } as SpringOptions,
} as const;
```
