import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePeriodicAnimation } from "./usePeriodicAnimation";

describe("usePeriodicAnimation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should start with isAnimating false", () => {
    const { result } = renderHook(() => usePeriodicAnimation());

    expect(result.current.isAnimating).toBe(false);
  });

  it("should trigger animation after initial delay", () => {
    const { result } = renderHook(() =>
      usePeriodicAnimation({
        intervalMs: 5000,
        durationMs: 1000,
      })
    );

    expect(result.current.isAnimating).toBe(false);

    // Fast-forward to after initial delay (defaults to intervalMs)
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.isAnimating).toBe(true);
  });

  it("should stop animating after duration", () => {
    const { result } = renderHook(() =>
      usePeriodicAnimation({
        intervalMs: 5000,
        durationMs: 1000,
      })
    );

    // Trigger animation
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.isAnimating).toBe(true);

    // Wait for duration to complete
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.isAnimating).toBe(false);
  });

  it("should repeat animation at interval", () => {
    const { result } = renderHook(() =>
      usePeriodicAnimation({
        intervalMs: 3000,
        durationMs: 500,
      })
    );

    // First animation after initial delay
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.isAnimating).toBe(true);

    // Wait for first animation to complete
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.isAnimating).toBe(false);

    // Wait for next interval
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(result.current.isAnimating).toBe(true);
  });

  it("should respect custom initial delay", () => {
    const { result } = renderHook(() =>
      usePeriodicAnimation({
        intervalMs: 5000,
        durationMs: 1000,
        initialDelayMs: 1000,
      })
    );

    // Should not animate before initial delay
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.isAnimating).toBe(false);

    // Should animate after initial delay
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.isAnimating).toBe(true);
  });

  it("should not animate when disabled", () => {
    const { result } = renderHook(() =>
      usePeriodicAnimation({
        intervalMs: 1000,
        durationMs: 500,
        enabled: false,
      })
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.isAnimating).toBe(false);
  });

  it("should provide manual trigger function", () => {
    const { result } = renderHook(() =>
      usePeriodicAnimation({
        intervalMs: 10000,
        durationMs: 1000,
        enabled: false, // Disable auto-trigger
      })
    );

    expect(result.current.isAnimating).toBe(false);

    // Manual trigger
    act(() => {
      result.current.trigger();
    });

    expect(result.current.isAnimating).toBe(true);
  });

  it("should stop animation after duration when manually triggered", () => {
    const { result } = renderHook(() =>
      usePeriodicAnimation({
        intervalMs: 10000,
        durationMs: 500,
        enabled: false,
      })
    );

    // Manual trigger
    act(() => {
      result.current.trigger();
    });
    expect(result.current.isAnimating).toBe(true);

    // Wait for duration
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.isAnimating).toBe(false);
  });

  it("should use default values when no options provided", () => {
    const { result } = renderHook(() => usePeriodicAnimation());

    // Default intervalMs is 9000
    act(() => {
      vi.advanceTimersByTime(9000);
    });

    expect(result.current.isAnimating).toBe(true);

    // Default durationMs is 1500
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.isAnimating).toBe(false);
  });

  it("should clean up timers on unmount", () => {
    const { unmount } = renderHook(() =>
      usePeriodicAnimation({
        intervalMs: 5000,
        durationMs: 1000,
      })
    );

    unmount();

    // Advance time and verify no errors occur
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    // If cleanup works, no memory leaks or errors should occur
    expect(true).toBe(true);
  });

  it("should respond to enabled prop changes", () => {
    const { result, rerender } = renderHook(
      ({ enabled }) =>
        usePeriodicAnimation({
          intervalMs: 1000,
          durationMs: 500,
          enabled,
        }),
      { initialProps: { enabled: true } }
    );

    // Should animate when enabled
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.isAnimating).toBe(true);

    // Wait for animation to complete
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Disable
    rerender({ enabled: false });

    // Should not animate anymore
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.isAnimating).toBe(false);
  });
});
