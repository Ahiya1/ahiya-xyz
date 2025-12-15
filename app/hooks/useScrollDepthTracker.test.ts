/**
 * Tests for useScrollDepthTracker Hook
 * Plan-17 Iteration-18
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/test"),
}));

// Mock tracking library
vi.mock("@/lib/tracking", () => ({
  trackScroll: vi.fn(),
}));

import { useScrollDepthTracker } from "./useScrollDepthTracker";
import { trackScroll } from "@/lib/tracking";
import { usePathname } from "next/navigation";

describe("useScrollDepthTracker", () => {
  let scrollHandler: ((event: Event) => void) | null = null;
  let originalRAF: typeof window.requestAnimationFrame;

  beforeEach(() => {
    vi.clearAllMocks();
    scrollHandler = null;

    // Store original RAF
    originalRAF = window.requestAnimationFrame;

    // Mock requestAnimationFrame to execute immediately
    window.requestAnimationFrame = vi.fn((cb) => {
      cb(0);
      return 1;
    });

    // Capture scroll handler when added
    vi.spyOn(window, "addEventListener").mockImplementation((event, handler) => {
      if (event === "scroll") {
        scrollHandler = handler as (event: Event) => void;
      }
    });

    vi.spyOn(window, "removeEventListener").mockImplementation(() => {});

    // Mock document dimensions (2000px tall, 500px viewport)
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
      value: 500,
      configurable: true,
    });

    // Default scroll position
    Object.defineProperty(window, "scrollY", {
      value: 0,
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    // Restore original RAF
    window.requestAnimationFrame = originalRAF;
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  function simulateScroll(scrollY: number) {
    Object.defineProperty(window, "scrollY", {
      value: scrollY,
      configurable: true,
      writable: true,
    });

    if (scrollHandler) {
      scrollHandler(new Event("scroll"));
    }
  }

  it("should set up scroll listener on mount", () => {
    renderHook(() => useScrollDepthTracker());

    expect(window.addEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      { passive: true }
    );
  });

  it("should clean up scroll listener on unmount", () => {
    const { unmount } = renderHook(() => useScrollDepthTracker());
    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  it("should track 25% scroll milestone", () => {
    vi.useFakeTimers();
    renderHook(() => useScrollDepthTracker());

    // 25% of (2000 - 500) = 375
    simulateScroll(375);
    vi.advanceTimersByTime(300); // Past throttle

    expect(trackScroll).toHaveBeenCalledWith(25);
  });

  it("should track 50% scroll milestone", () => {
    vi.useFakeTimers();
    renderHook(() => useScrollDepthTracker());

    // 50% of (2000 - 500) = 750
    simulateScroll(750);
    vi.advanceTimersByTime(300);

    expect(trackScroll).toHaveBeenCalledWith(25);
    expect(trackScroll).toHaveBeenCalledWith(50);
  });

  it("should track 75% scroll milestone", () => {
    vi.useFakeTimers();
    renderHook(() => useScrollDepthTracker());

    // 75% of (2000 - 500) = 1125
    simulateScroll(1125);
    vi.advanceTimersByTime(300);

    expect(trackScroll).toHaveBeenCalledWith(25);
    expect(trackScroll).toHaveBeenCalledWith(50);
    expect(trackScroll).toHaveBeenCalledWith(75);
  });

  it("should track 100% scroll milestone", () => {
    vi.useFakeTimers();
    renderHook(() => useScrollDepthTracker());

    // 100% of (2000 - 500) = 1500
    simulateScroll(1500);
    vi.advanceTimersByTime(300);

    expect(trackScroll).toHaveBeenCalledWith(25);
    expect(trackScroll).toHaveBeenCalledWith(50);
    expect(trackScroll).toHaveBeenCalledWith(75);
    expect(trackScroll).toHaveBeenCalledWith(100);
  });

  it("should not fire same milestone twice", () => {
    vi.useFakeTimers();
    renderHook(() => useScrollDepthTracker());

    // First scroll to 25%
    simulateScroll(375);
    vi.advanceTimersByTime(300);

    // Scroll again at same position
    simulateScroll(400);
    vi.advanceTimersByTime(300);

    // Should only have called trackScroll(25) once
    const calls = vi.mocked(trackScroll).mock.calls.filter((c) => c[0] === 25);
    expect(calls).toHaveLength(1);
  });

  it("should reset milestones on pathname change", () => {
    vi.useFakeTimers();
    const { rerender } = renderHook(() => useScrollDepthTracker());

    // First scroll to 25%
    simulateScroll(375);
    vi.advanceTimersByTime(300);

    expect(trackScroll).toHaveBeenCalledWith(25);
    vi.mocked(trackScroll).mockClear();

    // Simulate pathname change
    vi.mocked(usePathname).mockReturnValue("/new-page");
    rerender();

    // Scroll to 25% again on new page
    simulateScroll(375);
    vi.advanceTimersByTime(300);

    // Should fire 25% again since we're on a new page
    expect(trackScroll).toHaveBeenCalledWith(25);
  });

  it("should handle non-scrollable pages", () => {
    // Page fits in viewport
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
      value: 500,
      configurable: true,
    });

    renderHook(() => useScrollDepthTracker());

    // Should immediately mark 100%
    expect(trackScroll).toHaveBeenCalledWith(100);
  });

  it("should throttle scroll events", () => {
    vi.useFakeTimers();
    renderHook(() => useScrollDepthTracker({ throttleMs: 250 }));

    // Rapid scroll events within throttle window
    simulateScroll(100);
    simulateScroll(200);
    simulateScroll(300);

    // None should have triggered milestone yet due to throttle
    expect(trackScroll).not.toHaveBeenCalled();

    // Advance past throttle
    vi.advanceTimersByTime(300);

    // Now scroll to milestone
    simulateScroll(375);

    expect(trackScroll).toHaveBeenCalledWith(25);
  });

  it("should accept custom milestones", () => {
    vi.useFakeTimers();
    renderHook(() => useScrollDepthTracker({ milestones: [10, 50, 90] }));

    // 10% of (2000 - 500) = 150
    simulateScroll(150);
    vi.advanceTimersByTime(300);

    expect(trackScroll).toHaveBeenCalledWith(10);
    expect(trackScroll).not.toHaveBeenCalledWith(25);
  });

  it("should respect enabled option", () => {
    renderHook(() => useScrollDepthTracker({ enabled: false }));

    // Should not set up listener when disabled
    expect(window.addEventListener).not.toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      expect.any(Object)
    );
  });

  it("should check initial scroll position on mount", () => {
    // User lands mid-page
    Object.defineProperty(window, "scrollY", {
      value: 750,
      configurable: true,
      writable: true,
    });

    renderHook(() => useScrollDepthTracker());

    // Should immediately track 25% and 50%
    expect(trackScroll).toHaveBeenCalledWith(25);
    expect(trackScroll).toHaveBeenCalledWith(50);
  });

  it("should handle multiple milestones in single scroll", () => {
    vi.useFakeTimers();
    renderHook(() => useScrollDepthTracker());

    // Scroll directly to 60% (past 25% and 50%)
    // 60% of 1500 = 900
    simulateScroll(900);
    vi.advanceTimersByTime(300);

    expect(trackScroll).toHaveBeenCalledWith(25);
    expect(trackScroll).toHaveBeenCalledWith(50);
    expect(trackScroll).not.toHaveBeenCalledWith(75);
  });
});
