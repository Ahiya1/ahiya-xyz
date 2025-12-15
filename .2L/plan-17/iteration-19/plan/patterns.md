# Code Patterns & Conventions

## File Structure

```
{project-root}/
├── app/
│   ├── components/
│   │   ├── reactive/                 # NEW: Reactive animation components
│   │   │   ├── index.ts              # Barrel export
│   │   │   ├── MagneticButton.tsx    # Magnetic cursor effect wrapper
│   │   │   ├── TiltCard.tsx          # 3D tilt card wrapper
│   │   │   └── AnimatedIcon.tsx      # Portfolio icon animations
│   │   ├── PortfolioCard.tsx         # MODIFY: Add TiltCard, AnimatedIcon
│   │   ├── Testimonials.tsx          # MODIFY: Add subtle tilt
│   │   ├── CalcomEmbed.tsx           # MODIFY: Add conversion tracking
│   │   └── TrackingProvider.tsx      # MODIFY: Add new hooks
│   ├── hooks/
│   │   ├── useReducedMotion.ts       # EXISTS
│   │   ├── useScrollDepthTracker.ts  # EXISTS
│   │   ├── useTimeOnPage.ts          # NEW: Time tracking hook
│   │   ├── useTimeOnPage.test.ts     # NEW: Tests
│   │   ├── useClickTracker.ts        # NEW: Click tracking hook
│   │   └── useClickTracker.test.ts   # NEW: Tests
│   ├── page.tsx                      # MODIFY: Add data-track-click
│   ├── pricing/page.tsx              # MODIFY: Add data-track-click
│   ├── cv/page.tsx                   # MODIFY: Add data-track-click
│   └── 2l/page.tsx                   # MODIFY: Add data-track-click
├── lib/
│   ├── tracking.ts                   # EXISTS: Event batching library
│   └── animation-utils.ts            # NEW: Spring presets, hooks
└── ...
```

## Naming Conventions

- Components: PascalCase (`MagneticButton.tsx`)
- Hooks: camelCase with `use` prefix (`useTimeOnPage.ts`)
- Tests: Same name with `.test.ts` suffix (`useTimeOnPage.test.ts`)
- Types: PascalCase (`MagneticButtonProps`)
- Spring presets: camelCase (`springPresets.magnetic`)
- Data attributes: kebab-case (`data-track-click`)
- Tracking labels: snake_case (`hero_see_work`)

## Framer Motion Spring Physics Patterns

### Pattern: useSpring for Smooth Tracking

**When to use:** Any value that should smoothly follow user input (cursor position, scroll position)

**Code example:**
```typescript
"use client";

import { useSpring, motion, type SpringOptions } from "framer-motion";
import { useCallback, useRef } from "react";

// Spring configuration presets
export const springPresets = {
  gentle: { stiffness: 100, damping: 15, mass: 0.5 },
  snappy: { stiffness: 300, damping: 20, mass: 0.5 },
  magnetic: { stiffness: 150, damping: 15, mass: 0.1 },
  tilt: { stiffness: 200, damping: 20, mass: 0.3 },
} satisfies Record<string, SpringOptions>;

// Using spring for magnetic effect
function MagneticDemo() {
  const x = useSpring(0, springPresets.magnetic);
  const y = useSpring(0, springPresets.magnetic);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center, capped at max pull distance
    const maxDistance = 50;
    const distX = Math.max(-maxDistance, Math.min(maxDistance, e.clientX - centerX));
    const distY = Math.max(-maxDistance, Math.min(maxDistance, e.clientY - centerY));

    // Apply magnetic pull (stronger when closer, capped)
    const pullStrength = 0.3; // 30% of distance
    x.set(distX * pullStrength);
    y.set(distY * pullStrength);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      Content here
    </motion.div>
  );
}
```

**Key points:**
- useSpring returns a MotionValue, not state - updates bypass React re-renders
- Set values with `.set()` method, not setState
- Spring config determines animation feel
- Always reset to 0 on mouse leave

### Pattern: MagneticButton Component

**When to use:** Any CTA button or link that should attract toward cursor

**Code example:**
```typescript
"use client";

import { motion, useSpring, type SpringOptions } from "framer-motion";
import { useCallback, useRef, type ReactNode, type CSSProperties } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

export interface MagneticButtonProps {
  children: ReactNode;
  /** Maximum pull distance in pixels (default: 8) */
  pullDistance?: number;
  /** Pull strength as fraction (default: 0.4) */
  pullStrength?: number;
  /** Spring configuration */
  springConfig?: SpringOptions;
  /** Enable glow effect on proximity (default: true) */
  enableGlow?: boolean;
  /** Additional className */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
  /** Whether the effect is disabled */
  disabled?: boolean;
}

const defaultSpring: SpringOptions = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

export function MagneticButton({
  children,
  pullDistance = 8,
  pullStrength = 0.4,
  springConfig = defaultSpring,
  enableGlow = true,
  className = "",
  style,
  disabled = false,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 25 });

  const isDisabled = disabled || prefersReducedMotion;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Cap the pull distance
      const cappedX = Math.max(-pullDistance, Math.min(pullDistance, distX * pullStrength));
      const cappedY = Math.max(-pullDistance, Math.min(pullDistance, distY * pullStrength));

      x.set(cappedX);
      y.set(cappedY);

      if (enableGlow) {
        // Calculate proximity (0-1, closer = higher)
        const distance = Math.sqrt(distX * distX + distY * distY);
        const maxGlowDistance = Math.max(rect.width, rect.height);
        const proximity = Math.max(0, 1 - distance / maxGlowDistance);
        glowOpacity.set(proximity * 0.5); // Max 50% opacity
      }
    },
    [isDisabled, pullDistance, pullStrength, x, y, enableGlow, glowOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
  }, [x, y, glowOpacity]);

  // If disabled, render children directly without wrapper
  if (isDisabled) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ x, y, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect layer */}
      {enableGlow && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-purple-500/30 blur-xl pointer-events-none"
          style={{ opacity: glowOpacity }}
        />
      )}
      {children}
    </motion.div>
  );
}
```

**Key points:**
- Wraps children without changing their styles
- Respects prefers-reduced-motion
- Glow effect based on proximity
- Inline-block preserves natural layout

## 3D Transform Patterns

### Pattern: TiltCard Component

**When to use:** Cards that should tilt in 3D following mouse position

**Code example:**
```typescript
"use client";

import { motion, useSpring, type SpringOptions } from "framer-motion";
import {
  useCallback,
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

export interface TiltCardProps {
  children: ReactNode;
  /** Maximum tilt angle in degrees (default: 8) */
  maxTilt?: number;
  /** Spring configuration */
  springConfig?: SpringOptions;
  /** Perspective distance in pixels (default: 1000) */
  perspective?: number;
  /** Enable shine effect following tilt (default: true) */
  enableShine?: boolean;
  /** Additional className */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
  /** Whether the effect is disabled */
  disabled?: boolean;
}

const defaultSpring: SpringOptions = {
  stiffness: 200,
  damping: 20,
  mass: 0.3,
};

export function TiltCard({
  children,
  maxTilt = 8,
  springConfig = defaultSpring,
  perspective = 1000,
  enableShine = true,
  className = "",
  style,
  disabled = false,
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile to disable tilt on touch devices
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const shineX = useSpring(50, springConfig);
  const shineY = useSpring(50, springConfig);

  const isDisabled = disabled || prefersReducedMotion || isMobile;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position relative to card center (-0.5 to 0.5)
      const xRatio = (e.clientX - rect.left) / width - 0.5;
      const yRatio = (e.clientY - rect.top) / height - 0.5;

      // Convert to rotation angles
      // Note: rotateX controls vertical tilt, rotateY controls horizontal
      // Invert Y for natural feel (mouse up = card tilts back)
      rotateX.set(-yRatio * maxTilt * 2);
      rotateY.set(xRatio * maxTilt * 2);

      // Update shine position (as percentage)
      if (enableShine) {
        shineX.set((xRatio + 0.5) * 100);
        shineY.set((yRatio + 0.5) * 100);
      }
    },
    [isDisabled, maxTilt, rotateX, rotateY, enableShine, shineX, shineY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    shineX.set(50);
    shineY.set(50);
  }, [rotateX, rotateY, shineX, shineY]);

  if (isDisabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={containerRef}
        className={`relative ${className}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          ...style,
        }}
      >
        {/* Shine overlay */}
        {enableShine && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at var(--shine-x) var(--shine-y), rgba(255,255,255,0.15), transparent 60%)`,
              // Use CSS custom properties updated via motion style
            }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}
```

**Key points:**
- Wrap parent in perspective container
- Use preserve-3d for true 3D transforms
- Invert Y axis for natural feel
- Disable on mobile (no hover on touch)
- Shine effect follows tilt direction

### Pattern: Animated Icon Component

**When to use:** Icons that have unique animations on hover and periodic idle state

**Code example:**
```typescript
"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Sparkles, Terminal, BarChart3, FlaskConical } from "lucide-react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

type IconType = "sparkles" | "terminal" | "barChart" | "flask";

export interface AnimatedIconProps {
  type: IconType;
  /** Whether the icon is in hover state */
  isHovered?: boolean;
  /** Enable idle animation (default: true) */
  enableIdle?: boolean;
  /** Idle animation delay in seconds (for staggering multiple icons) */
  idleDelay?: number;
  /** Icon size (default: 28) */
  size?: number;
  /** Additional className */
  className?: string;
  /** Color */
  color?: string;
}

// Unique animation variants for each icon type
const iconVariants: Record<IconType, Variants> = {
  sparkles: {
    idle: {
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
    hover: {
      rotate: [0, 15, -15, 10, -10, 0],
      scale: [1, 1.2, 1.1, 1.15, 1],
      transition: { duration: 0.6, ease: "easeOut" },
    },
    static: { rotate: 0, scale: 1 },
  },
  terminal: {
    idle: {
      // Cursor blink simulation via opacity
      opacity: [1, 1, 0.7, 1, 1, 0.7, 1],
      transition: {
        duration: 2,
        ease: "steps(1)",
        repeat: Infinity,
        repeatDelay: 4,
      },
    },
    hover: {
      scale: [1, 1.1, 1.05],
      x: [0, -2, 2, 0],
      transition: { duration: 0.3 },
    },
    static: { opacity: 1, scale: 1, x: 0 },
  },
  barChart: {
    idle: {
      scaleY: [1, 1.05, 0.98, 1.02, 1],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 6,
      },
    },
    hover: {
      scaleY: [1, 1.15, 1.1, 1.2, 1],
      transition: { duration: 0.4, ease: "easeOut" },
    },
    static: { scaleY: 1 },
  },
  flask: {
    idle: {
      rotate: [0, 3, -3, 2, -2, 0],
      y: [0, -2, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
    hover: {
      rotate: [0, -10, 10, -5, 5, 0],
      scale: [1, 1.1, 1.05],
      transition: { duration: 0.5 },
    },
    static: { rotate: 0, y: 0, scale: 1 },
  },
};

const iconComponents: Record<IconType, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  terminal: Terminal,
  barChart: BarChart3,
  flask: FlaskConical,
};

export function AnimatedIcon({
  type,
  isHovered = false,
  enableIdle = true,
  idleDelay = 0,
  size = 28,
  className = "",
  color,
}: AnimatedIconProps) {
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Delay idle animation start for staggered effect
  useEffect(() => {
    if (prefersReducedMotion || !enableIdle) return;

    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, idleDelay * 1000);

    return () => clearTimeout(timer);
  }, [idleDelay, enableIdle, prefersReducedMotion]);

  const IconComponent = iconComponents[type];
  const variants = iconVariants[type];

  // Determine animation state
  let animationState: "static" | "idle" | "hover" = "static";
  if (!prefersReducedMotion) {
    if (isHovered) {
      animationState = "hover";
    } else if (shouldAnimate && enableIdle) {
      animationState = "idle";
    }
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      animate={animationState}
      initial="static"
      style={{
        display: "inline-flex",
        originY: type === "barChart" ? 1 : 0.5, // Bars grow from bottom
        color,
      }}
    >
      <IconComponent className={`w-[${size}px] h-[${size}px]`} />
    </motion.div>
  );
}
```

**Key points:**
- Each icon type has unique animation variants
- Idle animations stagger via idleDelay prop
- Hover takes priority over idle
- Respects reduced motion preference

## Click Tracking Patterns

### Pattern: Data Attribute Click Tracking

**When to use:** Track clicks on any element without wrapper components

**Hook implementation:**
```typescript
"use client";

import { useEffect } from "react";
import { trackClick, trackConversion } from "@/lib/tracking";

export interface UseClickTrackerOptions {
  /** Data attribute to look for (default: data-track-click) */
  attribute?: string;
  /** Whether tracking is enabled */
  enabled?: boolean;
}

export function useClickTracker(options: UseClickTrackerOptions = {}): void {
  const {
    attribute = "data-track-click",
    enabled = true,
  } = options;

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Find the closest element with tracking attribute (handles nested elements)
      const trackable = target.closest(`[${attribute}]`) as HTMLElement | null;
      if (!trackable) return;

      const trackValue = trackable.getAttribute(attribute);
      if (!trackValue) return;

      // Parse: "category:label" or just "label" (defaults to "cta" category)
      const parts = trackValue.split(":");
      const category = parts.length > 1 ? parts[0] : "cta";
      const label = parts.length > 1 ? parts[1] : parts[0];

      trackClick(category, label);

      // Check for conversion attribute
      const conversionType = trackable.getAttribute("data-track-conversion");
      if (conversionType) {
        trackConversion(conversionType);
      }
    };

    // Use capture phase to ensure we catch clicks before any stopPropagation
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [attribute, enabled]);
}
```

**Usage in JSX:**
```tsx
{/* Simple CTA tracking */}
<a href="#portfolio" data-track-click="hero_see_work">
  See the Work
</a>

{/* With category */}
<a href="/pricing" data-track-click="navigation:pricing">
  Pricing
</a>

{/* With conversion */}
<button
  data-track-click="calcom_button"
  data-track-conversion="booking_intent"
>
  Book Discovery Call
</button>

{/* Portfolio card */}
<Link
  href={project.detailUrl}
  data-track-click={`portfolio:${project.id}`}
>
  {/* Card content */}
</Link>
```

**Key points:**
- Single document listener is efficient
- closest() handles nested elements (icon inside button)
- Capture phase catches clicks before stopPropagation
- Convention: `category:label` or just `label` (defaults to "cta")

### Pattern: Tracking Label Convention

**Naming structure:**
```
{location}_{element}_{action?}

Examples:
- hero_see_work              - Hero section "See the Work" button
- hero_lets_build            - Hero section "Let's Build" button
- footer_discovery_call      - Footer "Book Discovery Call" button
- portfolio_mirror_of_dreams - Portfolio card click
- pricing_tier_essentials    - Pricing tier click
- cv_pdf_download            - CV page PDF download
- calcom_embed_ready         - Cal.com embed loaded
- calcom_booking_complete    - Cal.com booking completed
```

**Query convenience:**
```sql
-- All hero CTA clicks
SELECT * FROM events WHERE event_label LIKE 'hero_%';

-- All portfolio interactions
SELECT * FROM events WHERE event_label LIKE 'portfolio_%';

-- Full Cal.com funnel
SELECT * FROM events WHERE event_label LIKE 'calcom_%';
```

## Time on Page Tracking Pattern

### Pattern: useTimeOnPage Hook

**When to use:** Track actual engagement time, excluding background tab time

**Code example:**
```typescript
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEngagement } from "@/lib/tracking";

export interface UseTimeOnPageOptions {
  /** How often to send heartbeat in ms (default: 30000) */
  heartbeatIntervalMs?: number;
  /** Minimum time before tracking in ms (default: 5000) */
  minTimeToTrackMs?: number;
  /** Whether tracking is enabled */
  enabled?: boolean;
}

export function useTimeOnPage(options: UseTimeOnPageOptions = {}): void {
  const {
    heartbeatIntervalMs = 30000,
    minTimeToTrackMs = 5000,
    enabled = true,
  } = options;

  const pathname = usePathname();
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const lastVisibleRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    // Reset on page change
    startTimeRef.current = Date.now();
    accumulatedTimeRef.current = 0;
    lastVisibleRef.current = Date.now();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Accumulate time when hiding
        accumulatedTimeRef.current += Date.now() - lastVisibleRef.current;
      } else {
        // Reset visibility timestamp when visible again
        lastVisibleRef.current = Date.now();
      }
    };

    // Heartbeat - send periodic updates
    const heartbeatInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        const currentTime =
          accumulatedTimeRef.current + (Date.now() - lastVisibleRef.current);
        if (currentTime >= minTimeToTrackMs) {
          trackEngagement(currentTime);
        }
      }
    }, heartbeatIntervalMs);

    // Send final time on unload/navigation
    const sendFinalTime = () => {
      const finalTime =
        accumulatedTimeRef.current +
        (document.visibilityState === "visible"
          ? Date.now() - lastVisibleRef.current
          : 0);
      if (finalTime >= minTimeToTrackMs) {
        trackEngagement(finalTime);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", sendFinalTime);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", sendFinalTime);
      clearInterval(heartbeatInterval);
      // Send final time on cleanup (navigation)
      sendFinalTime();
    };
  }, [pathname, heartbeatIntervalMs, minTimeToTrackMs, enabled]);
}
```

**Key points:**
- Uses Visibility API to pause when tab is hidden
- Heartbeat ensures data even on long sessions
- Sends final time on both unload and navigation
- Minimum threshold prevents micro-visits from cluttering data

## Cal.com Conversion Tracking Pattern

### Pattern: Enhanced CalcomEmbed

**When to use:** Track full conversion funnel through Cal.com booking flow

**Code example:**
```typescript
"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useCallback } from "react";
import { trackEvent, trackConversion } from "@/lib/tracking";

export interface CalcomEmbedProps {
  calLink?: string;
  onBookingComplete?: () => void;
}

export function CalcomEmbed({
  calLink = "ahiya-butman-tigupi/discovery-call",
  onBookingComplete,
}: CalcomEmbedProps) {
  const handleBookingComplete = useCallback(() => {
    onBookingComplete?.();
  }, [onBookingComplete]);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();

        // Configure UI
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#a855f7" } },
          hideEventTypeDetails: false,
        });

        // Track embed ready (funnel step: saw booking widget)
        cal("on", {
          action: "linkReady",
          callback: () => {
            trackEvent("conversion", "calcom_embed_ready", "pricing_page");
          },
        });

        // Track booking success (final conversion)
        cal("on", {
          action: "bookingSuccessful",
          callback: (e: { data: unknown }) => {
            trackConversion("calcom_booking_complete", {
              eventType: calLink,
            });
            handleBookingComplete();
          },
        });

        // Track date selection (mid-funnel) - undocumented but stable
        try {
          cal("on", {
            action: "__dateSelected",
            callback: () => {
              trackEvent("conversion", "calcom_date_selected", "pricing_page");
            },
          });
        } catch {
          // Silently fail if undocumented event not available
        }

        // Track time selection (mid-funnel) - undocumented but stable
        try {
          cal("on", {
            action: "__timeSelected",
            callback: () => {
              trackEvent("conversion", "calcom_time_selected", "pricing_page");
            },
          });
        } catch {
          // Silently fail if undocumented event not available
        }
      } catch (error) {
        console.error("Failed to initialize Cal.com tracking:", error);
      }
    })();
  }, [calLink, handleBookingComplete]);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ theme: "dark" }}
    />
  );
}
```

**Conversion Funnel Events:**
1. `calcom_embed_ready` - User saw booking widget
2. `calcom_date_selected` - User selected a date
3. `calcom_time_selected` - User selected a time
4. `calcom_booking_complete` - User completed booking

## Testing Patterns (REQUIRED)

### Test File Naming Conventions

- Unit tests: `{module}.test.ts` (same directory as module)
- Hook tests: `{hookName}.test.ts` in `/app/hooks/`

### Hook Test Pattern with renderHook

**Code example:**
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTimeOnPage } from "./useTimeOnPage";

// Mock the tracking module
vi.mock("@/lib/tracking", () => ({
  trackEngagement: vi.fn(),
}));

// Mock usePathname
vi.mock("next/navigation", () => ({
  usePathname: vi.fn().mockReturnValue("/"),
}));

import { trackEngagement } from "@/lib/tracking";

describe("useTimeOnPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    // Mock document.visibilityState
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "visible",
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetModules();
  });

  it("should not track if disabled", () => {
    renderHook(() => useTimeOnPage({ enabled: false }));

    // Advance time past heartbeat interval
    vi.advanceTimersByTime(35000);

    expect(trackEngagement).not.toHaveBeenCalled();
  });

  it("should send heartbeat after interval", () => {
    renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 30000,
        minTimeToTrackMs: 5000,
      })
    );

    // Advance time past heartbeat interval
    vi.advanceTimersByTime(31000);

    expect(trackEngagement).toHaveBeenCalledWith(expect.any(Number));
  });

  it("should not track time below minimum threshold", () => {
    renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 1000,
        minTimeToTrackMs: 5000,
      })
    );

    // Advance time but stay below threshold
    vi.advanceTimersByTime(2000);

    expect(trackEngagement).not.toHaveBeenCalled();
  });

  it("should pause tracking when tab is hidden", () => {
    const { unmount } = renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 10000,
        minTimeToTrackMs: 1000,
      })
    );

    // Simulate tab hidden
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));

    // Clear any existing calls
    vi.clearAllMocks();

    // Advance time while hidden
    vi.advanceTimersByTime(15000);

    // Heartbeat should not fire while hidden
    expect(trackEngagement).not.toHaveBeenCalled();
  });
});
```

### Click Tracker Test Pattern

**Code example:**
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useClickTracker } from "./useClickTracker";

vi.mock("@/lib/tracking", () => ({
  trackClick: vi.fn(),
  trackConversion: vi.fn(),
}));

import { trackClick, trackConversion } from "@/lib/tracking";

describe("useClickTracker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should track clicks on elements with data-track-click", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    // Create a trackable element
    const button = document.createElement("button");
    button.setAttribute("data-track-click", "test_button");
    document.body.appendChild(button);

    // Simulate click
    button.click();

    expect(trackClick).toHaveBeenCalledWith("cta", "test_button");
  });

  it("should parse category:label format", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    button.setAttribute("data-track-click", "navigation:pricing");
    document.body.appendChild(button);

    button.click();

    expect(trackClick).toHaveBeenCalledWith("navigation", "pricing");
  });

  it("should track conversions when data-track-conversion is present", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    button.setAttribute("data-track-click", "calcom_button");
    button.setAttribute("data-track-conversion", "booking_intent");
    document.body.appendChild(button);

    button.click();

    expect(trackClick).toHaveBeenCalledWith("cta", "calcom_button");
    expect(trackConversion).toHaveBeenCalledWith("booking_intent");
  });

  it("should not track when disabled", () => {
    renderHook(() => useClickTracker({ enabled: false }));

    const button = document.createElement("button");
    button.setAttribute("data-track-click", "test_button");
    document.body.appendChild(button);

    button.click();

    expect(trackClick).not.toHaveBeenCalled();
  });

  it("should find trackable element via closest() for nested elements", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    button.setAttribute("data-track-click", "parent_button");
    const icon = document.createElement("span");
    button.appendChild(icon);
    document.body.appendChild(button);

    // Click on nested icon
    icon.click();

    expect(trackClick).toHaveBeenCalledWith("cta", "parent_button");
  });
});
```

### Mocking Strategies

```typescript
// Mock external dependencies
vi.mock("@/lib/tracking", () => ({
  trackClick: vi.fn(),
  trackConversion: vi.fn(),
  trackEngagement: vi.fn(),
  trackEvent: vi.fn(),
}));

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn().mockReturnValue("/test"),
}));

// Mock useReducedMotion hook
vi.mock("@/app/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

// Mock matchMedia for mobile detection
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

### Coverage Expectations

| Module Type | Minimum Coverage | Target Coverage |
|-------------|------------------|-----------------|
| Tracking hooks | 80% | 90% |
| Animation components | 70% | 80% |
| Utility functions | 90% | 95% |

## Security Patterns

### Input Validation for Tracking

**Code example:**
```typescript
// Sanitize tracking labels to prevent injection
function sanitizeLabel(label: string): string {
  // Only allow alphanumeric, underscore, hyphen
  return label.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 100);
}

// Usage in click handler
const category = sanitizeLabel(parts[0]);
const label = sanitizeLabel(parts.length > 1 ? parts[1] : parts[0]);
```

### Environment Variable Safety

```typescript
// All tracking is client-side, no API keys exposed
// Database credentials are server-side only via /api/analytics/event
// No PII collected through tracking
```

## Error Handling Patterns

### Graceful Degradation

**Code example:**
```typescript
// Animation components degrade gracefully
if (prefersReducedMotion || isMobile) {
  return <div className={className}>{children}</div>;
}

// Tracking fails silently
try {
  trackClick(category, label);
} catch {
  // Don't break user interaction if tracking fails
}
```

### Cal.com Event Handler Safety

```typescript
// Wrap undocumented events in try/catch
try {
  cal("on", {
    action: "__dateSelected",
    callback: () => trackEvent("conversion", "calcom_date_selected"),
  });
} catch {
  // Silently fail if event not available
}
```

## Import Order Convention

```typescript
// 1. React/Next.js imports
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

// 2. External library imports
import { motion, useSpring, type SpringOptions } from "framer-motion";
import { Sparkles, Terminal, BarChart3, FlaskConical } from "lucide-react";

// 3. Internal absolute imports (@/)
import { trackClick, trackConversion } from "@/lib/tracking";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

// 4. Relative imports
import type { PortfolioProject } from "./PortfolioCard";

// 5. Type-only imports (if using TypeScript isolatedModules)
import type { ReactNode, CSSProperties } from "react";
```

## Performance Patterns

### Throttle Mouse Events

```typescript
// Throttle to 60fps for mouse tracking
const lastCallRef = useRef(0);
const throttleMs = 1000 / 60; // ~16.67ms

const handleMouseMove = useCallback((e: React.MouseEvent) => {
  const now = Date.now();
  if (now - lastCallRef.current < throttleMs) return;
  lastCallRef.current = now;

  // Handle mouse move...
}, []);
```

### Use will-change Hint

```css
.magnetic-button {
  will-change: transform;
}

.tilt-card {
  will-change: transform;
  transform-style: preserve-3d;
}
```

### Avoid React Re-renders with Motion Values

```typescript
// Good: Motion values update without re-render
const x = useSpring(0, springConfig);
x.set(newValue); // Does NOT cause re-render

// Bad: State causes re-render on every update
const [x, setX] = useState(0);
setX(newValue); // Causes re-render
```
