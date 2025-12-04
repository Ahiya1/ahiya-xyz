# Explorer 2 Report: Animation Patterns Deep Dive

## Executive Summary

The codebase contains four reusable animation patterns that handle timing-based effects (typewriter, breathing, glitch, count-up) and scroll-based effects (intersection observer). These patterns use `requestAnimationFrame` for performance-optimized animations and `IntersectionObserver` for scroll-triggered behavior. Key patterns identified: custom hooks for state management, performance-aware easing functions, and hardware-accelerated transforms.

---

## Discoveries

### Pattern 1: useTypewriter Hook - Character-by-Character Text Animation

**Location:** `/app/soul/building/page.tsx` (lines 251-348)

**Full Implementation:**
```typescript
const useTypewriter = (
  text: string,
  isActive: boolean,
  baseSpeed: number = 60
): TypewriterState => {
  const [state, setState] = useState<TypewriterState>({
    displayText: text,
    currentIndex: text.length,
    isTyping: false,
    showCursor: true,
    completionPercentage: 100,
  });

  const animationFrameRef = useRef<number | null>(null);
  const lastCharTime = useRef<number>(0);
  const cursorBlinkInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      setState({
        displayText: text,
        currentIndex: text.length,
        isTyping: false,
        showCursor: true,
        completionPercentage: 100,
      });
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (cursorBlinkInterval.current)
        clearInterval(cursorBlinkInterval.current);
      return;
    }

    // Reset for typing
    setState((prev) => ({
      ...prev,
      displayText: "",
      currentIndex: 0,
      isTyping: true,
      completionPercentage: 0,
    }));

    lastCharTime.current = performance.now();
    let currentIndex = 0;

    // Natural typing variation
    const getCharDelay = (char: string, position: number): number => {
      let delay = baseSpeed;

      // Slower for punctuation and capitals
      if (char === " ") delay = baseSpeed * 1.8;
      else if (/[.,!?;:]/.test(char)) delay = baseSpeed * 2.5;
      else if (/[A-Z]/.test(char) && position > 0) delay = baseSpeed * 1.3;

      // Add human variation
      return delay + (Math.random() - 0.5) * (baseSpeed * 0.4);
    };

    const animate = (currentTime: number) => {
      const timeSinceLastChar = currentTime - lastCharTime.current;

      if (currentIndex < text.length) {
        const currentChar = text[currentIndex];
        const charDelay = getCharDelay(currentChar, currentIndex);

        if (timeSinceLastChar >= charDelay) {
          currentIndex++;
          setState((prev) => ({
            ...prev,
            displayText: text.slice(0, currentIndex),
            currentIndex,
            isTyping: currentIndex < text.length,
            completionPercentage: (currentIndex / text.length) * 100,
          }));
          lastCharTime.current = currentTime;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Cursor blinking
    cursorBlinkInterval.current = setInterval(() => {
      setState((prev) => ({ ...prev, showCursor: !prev.showCursor }));
    }, 530);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (cursorBlinkInterval.current)
        clearInterval(cursorBlinkInterval.current);
    };
  }, [text, isActive, baseSpeed]);

  return state;
};
```

**Key Features:**
- Human-like typing: Spaces (1.8x slower), punctuation (2.5x slower), capitals (1.3x slower)
- Random variation: ±0.2x baseSpeed adds natural irregularity
- Cursor blinking: Separate 530ms interval for visual feedback
- Performance: Uses `performance.now()` for frame-accurate timing
- Complete cleanup: Cancels both requestAnimationFrame and setInterval

**Return State:**
```typescript
interface TypewriterState {
  displayText: string;        // Currently typed text
  currentIndex: number;       // Position in full text
  isTyping: boolean;          // Animation in progress
  showCursor: boolean;        // Cursor visibility
  completionPercentage: number; // 0-100 progress
}
```

---

### Pattern 2: useCountUp Hook - Animated Number Progression

**Location:** `/app/hooks/useCountUp.ts` (standalone file)

**Full Implementation:**
```typescript
"use client";

import { useEffect, useState, useCallback } from "react";

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

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = Date.now();

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
  }, [hasStarted, target, duration, delay]);

  useEffect(() => {
    if (startOnMount) {
      start();
    }
  }, [startOnMount, start]);

  return { count, start, hasStarted };
}
```

**Key Features:**
- Ease-out cubic easing: `1 - (1-progress)^3` for natural deceleration
- Manual trigger support: Can start immediately or via `.start()` callback
- Exact final value: Ensures target is reached exactly (no rounding errors)
- Configurable timing: Duration, delay, and startOnMount options
- Guard against double-start: `hasStarted` flag prevents re-animation

**Return Object:**
```typescript
{
  count: number,           // Current animated count
  start: () => void,       // Manual trigger function
  hasStarted: boolean      // Animation status
}
```

**Usage in `/app/2l/page.tsx` (lines 194-220):**
```typescript
// Hook setup
const plansCount = useCountUp(7, 1500);
const iterationsCount = useCountUp(10, 1800);

// Intersection observer triggers count-up
useEffect(() => {
  if (!mounted || !metricsRef.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !metricsVisible) {
        setMetricsVisible(true);
        plansCount.start();
        iterationsCount.start();
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(metricsRef.current);
  return () => observer.disconnect();
}, [mounted, metricsVisible, plansCount, iterationsCount]);
```

---

### Pattern 3: useSimpleBreathing Hook - Cyclical Phase Animation

**Location:** `/app/soul/building/page.tsx` (lines 66-148)

**Full Implementation:**
```typescript
const useSimpleBreathing = (isActive: boolean): BreathingState => {
  const [breathingState, setBreathingState] = useState<BreathingState>({
    phase: "inhale",
    progress: 0,
    intensity: 0,
    scale: 1,
    glowIntensity: 0,
    cycleTime: 8, // 4 seconds inhale + 4 seconds exhale
  });

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) {
      setBreathingState((prev) => ({
        ...prev,
        scale: 1,
        glowIntensity: 0,
        intensity: 0,
      }));
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const cycleProgress = (elapsed % 8) / 8; // 8 second total cycle

      // Simple binary phase - inhale or exhale
      const phase: "inhale" | "exhale" =
        cycleProgress < 0.5 ? "inhale" : "exhale";
      const phaseProgress =
        phase === "inhale" ? cycleProgress * 2 : (cycleProgress - 0.5) * 2;

      // Ultra-smooth easing - critical for meditation feel
      const easeInOutSine = (t: number): number => {
        return -(Math.cos(Math.PI * t) - 1) / 2;
      };

      const easedProgress = easeInOutSine(phaseProgress);

      let intensity: number;
      let scale: number;
      let glowIntensity: number;

      if (phase === "inhale") {
        intensity = easedProgress;
        scale = 1 + easedProgress * 0.04; // Very subtle scale increase
        glowIntensity = easedProgress * 0.6;
      } else {
        intensity = 1 - easedProgress;
        scale = 1.04 - easedProgress * 0.04;
        glowIntensity = 0.6 - easedProgress * 0.6;
      }

      setBreathingState({
        phase,
        progress: phaseProgress,
        intensity,
        scale,
        glowIntensity,
        cycleTime: 8,
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  return breathingState;
};
```

**Easing Function - easeInOutSine:**
```typescript
const easeInOutSine = (t: number): number => {
  return -(Math.cos(Math.PI * t) - 1) / 2;
};
```

**Key Features:**
- 8-second cycle: 4s inhale + 4s exhale (meditation standard)
- Phase-aware easing: Single easing function applied to normalized phase progress
- Subtle scale: 0.04 (4%) max scale for visual "breathing" without distortion
- Glow correlation: Intensity and glow synchronized with phase
- Cycling behavior: `(elapsed % 8) / 8` creates infinite loop

**Return State:**
```typescript
interface BreathingState {
  phase: "inhale" | "exhale";
  progress: number;          // 0-1 normalized to current phase
  intensity: number;         // 0-1 breath strength
  scale: number;            // 1.0 to 1.04
  glowIntensity: number;    // 0 to 0.6
  cycleTime: number;        // Always 8
}
```

---

### Pattern 4: useScrollReveal Hook - Intersection Observer Pattern

**Location:** `/app/page.tsx` (lines 8-31) and `/app/components/PortfolioCard.tsx` (lines 7-31)

**Full Implementation:**
```typescript
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

**IntersectionObserver Options Analysis:**
- **threshold: 0.1**: Element triggers when 10% visible (fast entry)
- **rootMargin: "0px 0px -50px 0px"**: 50px margin below viewport (early trigger for scroll effect)

**Usage Pattern - Staggered Reveal:**
```typescript
// Component applies reveal with staggered delays
const step1 = useScrollReveal();
const step2 = useScrollReveal();
const step3 = useScrollReveal();

// In JSX:
<div
  ref={step1.ref}
  className={`transition-all duration-700 ${
    step1.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
>
  Content
</div>

// Delay classes for cascade effect
// delay-150 and delay-300 CSS classes apply
```

**Key Features:**
- Single observation: Triggers once and disconnects (no memory leaks)
- Early trigger zone: 50px below viewport for smooth reveal timing
- Smooth transition: 700ms transition classes on reveal
- Stagger effect: Multiple hooks with CSS delay classes create cascade
- Reference cleanup: Auto-disconnect prevents observer accumulation

---

### Pattern 5: useTextGlitch Hook - Corruption Wave Animation

**Location:** `/app/soul/building/page.tsx` (lines 151-248)

**Full Implementation:**
```typescript
const useTextGlitch = (
  originalText: string,
  isActive: boolean
): GlitchState => {
  const [glitchState, setGlitchState] = useState<GlitchState>({
    displayText: originalText,
    corruptionLevel: 0,
    isGlitching: false,
    glitchIntensity: 0,
    offsetX: 0,
    offsetY: 0,
    colorShift: 0,
  });

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const corruptionWords = useMemo(
    () => [
      "HUMAN",
      "AI",
      "REAL",
      "FAKE",
      "ERROR",
      "NULL",
      "VOID",
      "01001000",
      "UNKNOWN",
      "SYSTEM",
      "???",
      originalText,
    ],
    [originalText]
  );

  useEffect(() => {
    if (!isActive) {
      setGlitchState({
        displayText: originalText,
        corruptionLevel: 0,
        isGlitching: false,
        glitchIntensity: 0,
        offsetX: 0,
        offsetY: 0,
        colorShift: 0,
      });
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;

      // Corruption wave with random spikes
      const baseCorruption = (Math.sin(elapsed * 2) + 1) / 2;
      const randomSpike = Math.random() < 0.08 ? Math.random() * 0.5 : 0;
      const corruptionLevel = Math.min(baseCorruption * 0.7 + randomSpike, 1);

      // Text corruption
      const shouldCorrupt = Math.random() < corruptionLevel * 0.4;
      const displayText = shouldCorrupt
        ? corruptionWords[Math.floor(Math.random() * corruptionWords.length)]
        : originalText;

      // Visual distortion
      const glitchIntensity = corruptionLevel;
      const offsetX = (Math.random() - 0.5) * glitchIntensity * 4;
      const offsetY = (Math.random() - 0.5) * glitchIntensity * 2;
      const colorShift = glitchIntensity * 90;

      setGlitchState({
        displayText,
        corruptionLevel,
        isGlitching: shouldCorrupt,
        glitchIntensity,
        offsetX,
        offsetY,
        colorShift,
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, originalText, corruptionWords]);

  return glitchState;
};
```

**Key Features:**
- Corruption waves: Sinusoidal base `(Math.sin(elapsed * 2) + 1) / 2` for smooth cycling
- Random spikes: 8% chance of random spike up to 0.5 intensity
- Word pool: Thematic corruption words + original text
- Visual distortion: Offset (±2px Y, ±4px X) + hue rotation (0-90deg)
- Probability-based: 40% chance to corrupt when corruption level high

**Rendering with Glitch Effects:**
```typescript
<h3
  className={baseClasses}
  style={{
    transform: `translate(${glitchState.offsetX}px, ${glitchState.offsetY}px)`,
    filter: `hue-rotate(${glitchState.colorShift}deg)`,
    textShadow: glitchState.isGlitching
      ? `1px 0 #ef4444, -1px 0 #3b82f6`  // Red/blue chromatic aberration
      : "none",
    color: glitchState.isGlitching ? "#ffffff" : undefined,
  }}
>
  {glitchState.displayText}
</h3>
```

---

### Pattern 6: useMirrorReflection Hook - Cyclical Surface Effects

**Location:** `/app/soul/building/page.tsx` (lines 351-413)

**Full Implementation:**
```typescript
const useMirrorReflection = (isActive: boolean): MirrorState => {
  const [mirrorState, setMirrorState] = useState<MirrorState>({
    shimmerPosition: 0,
    reflectionIntensity: 0,
    fragmentOpacity: 0,
    surfaceDistortion: 0,
  });

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) {
      setMirrorState({
        shimmerPosition: 0,
        reflectionIntensity: 0,
        fragmentOpacity: 0,
        surfaceDistortion: 0,
      });
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;

      // Gentle shimmer sweep
      const shimmerPosition = (Math.sin(elapsed * 1.2) + 1) / 2;

      // Pulsing reflection
      const reflectionIntensity = (Math.sin(elapsed * 0.8) + 1) / 2;

      // Fragment opacity variation
      const fragmentOpacity = 0.3 + ((Math.sin(elapsed * 1.5) + 1) / 2) * 0.4;

      // Subtle surface distortion
      const surfaceDistortion = Math.sin(elapsed * 2.1) * 0.02;

      setMirrorState({
        shimmerPosition,
        reflectionIntensity,
        fragmentOpacity,
        surfaceDistortion,
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  return mirrorState;
};
```

**Timing Frequencies:**
- shimmerPosition: 1.2 Hz (0.83s cycle) - fast sweep
- reflectionIntensity: 0.8 Hz (1.25s cycle) - medium pulse
- fragmentOpacity: 1.5 Hz (0.67s cycle) - fast variation
- surfaceDistortion: 2.1 Hz (0.48s cycle) - ultra-fast micro-movement

**Return State:**
```typescript
interface MirrorState {
  shimmerPosition: number;     // 0-1 sweep position
  reflectionIntensity: number; // 0-1 intensity
  fragmentOpacity: number;     // 0.3-0.7 range
  surfaceDistortion: number;   // ±0.02 range
}
```

---

## Patterns Identified

### Pattern A: requestAnimationFrame Performance Pattern

**Description:** All timing-based animations use `requestAnimationFrame` (RAF) instead of `setInterval` for 60fps performance.

**Use Case:** When you need sub-second precision, smooth transitions, or need to sync with browser paint cycles.

**Code Structure:**
```typescript
const animate = (timestamp: number) => {
  // Calculate progress
  const elapsed = timestamp - startTime;
  const progress = Math.min(elapsed / duration, 1);
  
  // Apply easing
  const eased = easingFunction(progress);
  
  // Update state
  setState(computeNewState(eased));
  
  // Continue animation if not complete
  if (progress < 1) {
    requestAnimationFrame(animate);
  }
};

animationFrameRef.current = requestAnimationFrame(animate);
```

**Why Use RAF:**
- Syncs with browser refresh rate (60fps standard)
- Browser optimizes memory and CPU usage
- Automatically pauses when tab is inactive
- Higher precision than `setInterval` (16.67ms vs typical timer resolution)

**Recommendation:** YES - Use for all animations targeting smooth visual effects.

---

### Pattern B: Easing Function Selection

**Description:** Different easing functions create psychological effects.

**Identified Easing Functions:**

1. **easeInOutSine** (Breathing, Meditation)
   ```typescript
   const easeInOutSine = (t: number): number => {
     return -(Math.cos(Math.PI * t) - 1) / 2;
   };
   ```
   - Smooth, organic feel
   - Mimics natural breathing rhythms
   - Use case: Contemplative animations

2. **easeOutCubic** (Count-up, Number Progression)
   ```typescript
   const eased = 1 - Math.pow(1 - progress, 3);
   ```
   - Decelerating effect (fast start, slow finish)
   - Natural for counting/scrolling
   - Use case: Metric displays, progress indicators

3. **Linear** (Scroll-based Reveals)
   - No easing applied in transition classes
   - Pure duration timing: `transition-all duration-700`
   - Use case: Standard fade-in/slide effects

**Recommendation:** Match easing to psychological goal:
- Breathing/meditation → easeInOutSine
- Metrics/counts → easeOutCubic
- Simple reveals → linear or easeOut

---

### Pattern C: Reference-Based State Cleanup

**Description:** All animation hooks maintain refs for cleanup to prevent memory leaks.

**Pattern:**
```typescript
const animationFrameRef = useRef<number | null>(null);
const startTimeRef = useRef<number>(0);
const cursorBlinkInterval = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  if (!isActive) {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (cursorBlinkInterval.current) clearInterval(cursorBlinkInterval.current);
    return;
  }
  
  // Set up animation...
  
  return () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (cursorBlinkInterval.current) clearInterval(cursorBlinkInterval.current);
  };
}, [isActive]);
```

**Recommendation:** YES - Always use ref-based cleanup for requestAnimationFrame and setInterval.

---

### Pattern D: Intersection Observer + Manual Trigger

**Description:** useCountUp separates scroll-trigger from animation execution.

**Pattern:**
```typescript
// Hook returns start() callback
const { count, start, hasStarted } = useCountUp(target);

// Parent component triggers on intersection
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        start(); // Manually trigger animation
      }
    }
  );
  observer.observe(ref.current);
}, []);
```

**Advantages:**
- Animation is reusable (can trigger programmatically)
- IntersectionObserver is reusable (can trigger multiple animations)
- Separation of concerns: scroll detection != animation

**Recommendation:** YES - Use this pattern for scroll-triggered animations.

---

### Pattern E: Phase-Based Animation Cycling

**Description:** Breathing and mirror effects use cyclical phases instead of linear progression.

**Pattern:**
```typescript
const cycleProgress = (elapsed % cycleDuration) / cycleDuration;
const phase = cycleProgress < 0.5 ? "phase1" : "phase2";
const phaseProgress = phase === "phase1" 
  ? cycleProgress * 2 
  : (cycleProgress - 0.5) * 2;
```

**Advantages:**
- Natural looping (no reset point)
- Phase awareness enables different behavior per cycle portion
- Modulo prevents performance issues from unbounded elapsed time

**Recommendation:** YES - Use for infinite looping effects (breathing, pulsing, orbiting).

---

## Complexity Assessment

### High Complexity Areas

- **useTypewriter Hook**: Character-by-character timing with human variation
  - Multiple timing calculations per frame
  - Complexity: 2-3 sub-builder splits if extracting to library
  - Estimated effort: 2-3 hours for first implementation, then reusable

- **useGlitch Hook**: Wave-based corruption with text swapping
  - Requires word pool management and probability calculations
  - Multiple simultaneous animations (offset, hue, shadow)
  - Complexity: 2-3 sub-builder splits for full feature set
  - Estimated effort: 3-4 hours

### Medium Complexity Areas

- **useCountUp Hook**: Number animation with easing
  - Easing function selection requires understanding
  - Duration and delay parameters add configurability
  - Complexity: Single builder, 1-2 hours

- **useSimpleBreathing Hook**: Sinusoidal phase cycling
  - Phase calculation is straightforward
  - Easing function is standard
  - Complexity: Single builder, 1-2 hours

- **useMirrorReflection Hook**: Multi-frequency layered animation
  - Four independent sine waves at different frequencies
  - No complex logic, just visual composition
  - Complexity: Single builder, 1 hour

### Low Complexity Areas

- **useScrollReveal Hook**: IntersectionObserver wrapper
  - Simple threshold-based trigger
  - Straightforward CSS class application
  - Complexity: Single builder, 30 minutes

---

## Technology Recommendations

### Animation Framework Choices

#### 1. requestAnimationFrame (Current Pattern - RECOMMENDED)
**Rationale:**
- Already used throughout codebase
- Syncs with browser paint cycles
- No external dependencies
- Best performance for React apps

**When to use:** All timing-based effects (typing, counting, breathing)

#### 2. CSS Animations (Complementary)
**Current usage:** Fade-in/slide transitions with duration classes
**Rationale:**
- Offload to GPU for reduced JS load
- 60fps on low-end devices
- Works without JavaScript

**When to use:** Simple, repeating animations (pulse, bounce, fade)

#### 3. Framer Motion (Future consideration)
**Potential benefits:**
- Higher-level API
- Built-in gesture detection
- Shared layout animations
- Spring physics

**Recommendation:** NOT needed yet - current patterns are performant and lightweight.

---

## Integration Points

### Internal Integrations

**useTypewriter + ProjectCard:**
- Located in `/app/soul/building/page.tsx`
- Triggered on hover: `isActive={project.cardType === "writing" && isHovered}`
- Renders with cursor: `{typewriterState.showCursor && <span>|</span>}`

**useCountUp + IntersectionObserver:**
- Located in `/app/2l/page.tsx`
- Triggered on scroll: When metrics section enters viewport
- Displays as tabular numbers: `<div className="tabular-nums">{count}</div>`

**useScrollReveal + Multiple Pages:**
- Used in `/app/page.tsx` (homepage steps)
- Used in `/app/components/PortfolioCard.tsx` (card reveals)
- Enables consistent stagger pattern across pages

**useSimpleBreathing + ProjectCard:**
- Breathing card type: `cardType: "breathing"`
- Scale applied to card: `scale3d(${breathingState.scale}, ...)`
- Glow effect: `rgba(52, 211, 153, ${glowIntensity * 0.08})`

---

## Recommendations for Builders

### 1. Extract Animation Hooks to Shared Library
**Why:** All pages use animation hooks - centralize for consistency
**Location:** Create `/app/hooks/` directory with:
- `useTypewriter.ts`
- `useCountUp.ts` (already exists)
- `useScrollReveal.ts`
- `useSimpleBreathing.ts`
- `useTextGlitch.ts`
- `useMirrorReflection.ts`

**Impact:** Enables pattern reuse across new pages

### 2. Create Easing Functions Utility
**Why:** Easing selection determines psychological effect
**File:** `/app/utils/easingFunctions.ts`
```typescript
export const easing = {
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
};
```

**Impact:** Standardizes easing across all animations

### 3. Document Animation Parameters as Design System
**Why:** Multiple animations need tuning (speeds, scales, colors)
**Create:** `/app/constants/animationConfig.ts`
```typescript
export const ANIMATION_CONFIG = {
  TYPEWRITER: {
    baseSpeed: 60,
    punctuationMultiplier: 2.5,
    spaceMultiplier: 1.8,
    cursorBlinkMs: 530,
  },
  BREATHING: {
    cycleSeconds: 8,
    scaleMax: 1.04,
    glowMaxIntensity: 0.6,
  },
  COUNTUP: {
    defaultDuration: 1500,
    easing: 'easeOutCubic',
  },
  SCROLL_REVEAL: {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    transitionDuration: 700,
  },
};
```

**Impact:** Single source of truth for animation tuning

### 4. Create Higher-Order Component for Card Animations
**Why:** ProjectCard uses multiple animation hooks
**Create:** `/app/components/AnimatedCard.tsx`
```typescript
interface AnimatedCardProps {
  cardType: 'breathing' | 'mirror' | 'deceptive' | 'writing';
  isHovered: boolean;
  children: React.ReactNode;
}

export function AnimatedCard({ cardType, isHovered, children }: AnimatedCardProps) {
  const breathing = useSimpleBreathing(cardType === 'breathing' && isHovered);
  const glitch = useTextGlitch(title, cardType === 'deceptive' && isHovered);
  const typewriter = useTypewriter(title, cardType === 'writing' && isHovered);
  const mirror = useMirrorReflection(cardType === 'mirror' && isHovered);
  
  // Return composed animated card
}
```

**Impact:** Simplifies component logic, enables reuse

### 5. Add Performance Monitoring
**Why:** Animations are performance-critical
**Create:** `/app/hooks/useAnimationPerformance.ts`
```typescript
export function useAnimationPerformance(name: string) {
  useEffect(() => {
    const startTime = performance.now();
    return () => {
      const duration = performance.now() - startTime;
      console.debug(`[Animation] ${name}: ${duration.toFixed(2)}ms`);
    };
  }, [name]);
}
```

**Impact:** Enables builder debugging and optimization

---

## Code Snippets for Builders

### Adding Typewriter to New Component
```typescript
import { useTypewriter } from "@/app/hooks/useTypewriter";

export function TypewriterDemo() {
  const [isActive, setIsActive] = useState(false);
  const typewriter = useTypewriter("Your text here", isActive, 60);
  
  return (
    <div onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
      <span>{typewriter.displayText}</span>
      {typewriter.showCursor && <span className="text-amber-400">|</span>}
    </div>
  );
}
```

### Adding Scroll-Triggered Count-Up
```typescript
import { useCountUp } from "@/app/hooks/useCountUp";

export function MetricsCard() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const count = useCountUp(42, { duration: 1500, startOnMount: false });
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          count.start();
        }
      },
      { threshold: 0.3 }
    );
    
    observer.observe(metricsRef.current!);
    return () => observer.disconnect();
  }, [count]);
  
  return <div ref={metricsRef} className="text-2xl font-bold">{count.count}</div>;
}
```

### Creating Custom Cyclical Animation
```typescript
export function useCustomCycle(
  cycleDuration: number,
  frequencies: number[]
) {
  const [values, setValues] = useState<number[]>(frequencies.map(() => 0));
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  
  useEffect(() => {
    startTimeRef.current = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const cycleProgress = (elapsed % cycleDuration) / cycleDuration;
      
      const newValues = frequencies.map(freq => {
        return (Math.sin(cycleProgress * Math.PI * 2 * freq) + 1) / 2;
      });
      
      setValues(newValues);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cycleDuration, frequencies]);
  
  return values;
}
```

---

## Resource Map

### Critical Files

- `/app/soul/building/page.tsx` - Main animation hooks (useTypewriter, useSimpleBreathing, useTextGlitch, useMirrorReflection, ProjectCard component)
- `/app/hooks/useCountUp.ts` - Standalone count-up hook
- `/app/2l/page.tsx` - useCountUp usage with IntersectionObserver pattern
- `/app/page.tsx` - useScrollReveal pattern on homepage
- `/app/components/PortfolioCard.tsx` - useScrollReveal with stagger effect

### Supporting Patterns

- TypewriterState, BreathingState, GlitchState, MirrorState interfaces in `/app/soul/building/page.tsx`
- CSS transition classes in global styles (duration-300, duration-600, duration-700)
- Easing timing functions inline in hooks

### Key Dependencies

- React hooks: useEffect, useState, useRef, useCallback, useMemo
- Native APIs: requestAnimationFrame, IntersectionObserver, setTimeout, setInterval

---

## Questions for Planner

1. **Animation Library Decision**: Should we introduce Framer Motion for more complex interactions, or stick with native requestAnimationFrame pattern?

2. **Performance Budget**: Are there specific Core Web Vitals targets? Animation hook overhead should be <1ms per frame.

3. **Accessibility**: Should animations respect prefers-reduced-motion? (Currently only CSS animations do this)

4. **Mobile Optimization**: Should animation complexity reduce on mobile devices?

5. **Animation Configuration**: Should animation timings and intensities be configurable via theme/config, or hardcoded per component?

6. **Testing Strategy**: Should animation hooks have unit tests? (Currently no animation tests visible)

---

## Conclusion

The codebase demonstrates sophisticated animation patterns suitable for a contemplative design system. The requestAnimationFrame approach is performant and appropriate. Key recommendations:

1. Extract all hooks to `/app/hooks/` for reusability
2. Create animation configuration constants
3. Document easing function selection strategy
4. Implement performance monitoring
5. Consider higher-order components for complex card animations

These patterns are production-ready and can be extended to new features with confidence.
