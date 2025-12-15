"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import type { AnimationState, CanvasConfig, PerformanceMetrics } from "./types";
import { TIMING, MOBILE_BREAKPOINT } from "./constants";
import { createInitialState, updateState as updateAnimationState } from "./state";
import { render as renderCanvas } from "./canvas-renderer";

interface EternalConstructionProps {
  className?: string;
}

/**
 * Development-only performance monitor class
 */
class PerformanceMonitor {
  private frameTimes: number[] = [];
  private lastTime = 0;
  private readonly maxSamples = 60;
  private readonly isDev = process.env.NODE_ENV === "development";

  startFrame(): void {
    if (!this.isDev) return;
    this.lastTime = performance.now();
  }

  endFrame(): void {
    if (!this.isDev) return;
    const frameTime = performance.now() - this.lastTime;
    this.frameTimes.push(frameTime);
    if (this.frameTimes.length > this.maxSamples) {
      this.frameTimes.shift();
    }
  }

  getFPS(): number {
    if (this.frameTimes.length === 0) return 0;
    const avg =
      this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    return avg > 0 ? 1000 / avg : 0;
  }

  getAverageFrameTime(): number {
    if (this.frameTimes.length === 0) return 0;
    return this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
  }

  getMetrics(state: AnimationState): PerformanceMetrics {
    return {
      fps: this.getFPS(),
      frameTime: this.getAverageFrameTime(),
      nodeCount: state.nodes.size,
      lineCount: state.lines.size,
      structureCount: state.structures.size,
    };
  }

  logWarningIfSlow(): void {
    if (!this.isDev) return;
    const fps = this.getFPS();
    if (fps > 0 && fps < 45 && this.frameTimes.length >= this.maxSamples) {
      console.warn(
        `[EternalConstruction] Performance warning: ${fps.toFixed(1)} FPS`
      );
    }
  }
}

/**
 * EternalConstruction - Canvas background animation component
 *
 * Renders an animated canvas visualization featuring:
 * - Glowing nodes that spawn, drift, and fade
 * - Lines extending between nodes
 * - Connection pulses when lines reach targets
 * - Geometric structures from connected nodes
 *
 * Performance optimized with:
 * - Object pooling for entities
 * - Visibility-based throttling
 * - Delta-time normalized animation
 * - Proper DPR handling for crisp rendering
 */
export function EternalConstruction({ className }: EternalConstructionProps) {
  // Refs for canvas and animation
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Animation state (in ref to avoid re-renders)
  const stateRef = useRef<AnimationState | null>(null);
  const configRef = useRef<CanvasConfig | null>(null);
  const frameIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Visibility tracking
  const isDocumentVisibleRef = useRef(true);
  const isInViewportRef = useRef(true);

  // Performance monitoring (dev only)
  const performanceMonitorRef = useRef<PerformanceMonitor>(
    new PerformanceMonitor()
  );

  // React state for mount lifecycle only
  const [mounted, setMounted] = useState(false);

  // Setup canvas with DPR handling
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[EternalConstruction] Canvas or container not available");
      }
      return null;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const isMobile = rect.width < MOBILE_BREAKPOINT;

    // Set canvas internal resolution
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set CSS display size
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Get and scale context
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      if (process.env.NODE_ENV === "development") {
        console.error("[EternalConstruction] Failed to get 2D context");
      }
      return null;
    }

    ctx.scale(dpr, dpr);
    ctxRef.current = ctx;

    const config: CanvasConfig = {
      width: rect.width,
      height: rect.height,
      dpr,
      isMobile,
    };

    configRef.current = config;
    return config;
  }, []);

  // State update wrapper - integrates all animation systems
  const updateState = useCallback(
    (
      state: AnimationState,
      config: CanvasConfig,
      deltaTime: number,
      timestamp: number
    ): AnimationState => {
      return updateAnimationState(state, config, deltaTime, timestamp);
    },
    []
  );

  // Render wrapper - draws all visual elements
  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      state: AnimationState,
      config: CanvasConfig
    ): void => {
      renderCanvas(ctx, state, config);
    },
    []
  );

  // Animation loop
  const animate = useCallback(
    (timestamp: DOMHighResTimeStamp) => {
      // Always schedule next frame first
      frameIdRef.current = requestAnimationFrame(animate);

      // Skip if not visible (CPU savings)
      if (!isDocumentVisibleRef.current || !isInViewportRef.current) {
        lastTimeRef.current = timestamp;
        return;
      }

      const ctx = ctxRef.current;
      const state = stateRef.current;
      const config = configRef.current;
      if (!ctx || !state || !config) return;

      const monitor = performanceMonitorRef.current;
      monitor.startFrame();

      // Calculate delta time with cap
      const deltaTime = Math.min(
        timestamp - lastTimeRef.current,
        TIMING.MAX_DELTA
      );
      lastTimeRef.current = timestamp;

      try {
        // Update state
        stateRef.current = updateState(state, config, deltaTime, timestamp);

        // Render frame
        render(ctx, stateRef.current, config);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("[EternalConstruction] Animation error:", error);
        }
        // Don't rethrow - let animation continue
      }

      monitor.endFrame();
      monitor.logWarningIfSlow();
    },
    [updateState, render]
  );

  // Initialize on mount (hydration-safe)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Setup canvas and start animation
  useEffect(() => {
    if (!mounted) return;

    const config = setupCanvas();
    if (!config) return;

    const timestamp = performance.now();
    stateRef.current = createInitialState(config, timestamp);
    lastTimeRef.current = timestamp;
    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [mounted, setupCanvas, animate]);

  // Document visibility handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = document.visibilityState === "visible";
      if (isDocumentVisibleRef.current) {
        lastTimeRef.current = performance.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Viewport visibility via IntersectionObserver
  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        isInViewportRef.current = entries[0]?.isIntersecting ?? false;
        if (isInViewportRef.current) {
          lastTimeRef.current = performance.now();
        }
      },
      { threshold: 0.01, rootMargin: "50px" }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [mounted]);

  // Resize handling with debounce
  useEffect(() => {
    if (!mounted) return;

    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const prevState = stateRef.current;
        setupCanvas();
        // Preserve animation state across resize
        if (prevState) {
          stateRef.current = prevState;
        }
      }, TIMING.RESIZE_DEBOUNCE);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, setupCanvas]);

  // Don't render until mounted (SSR safety)
  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${className || ""}`}
      aria-hidden="true"
      role="presentation"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default EternalConstruction;
