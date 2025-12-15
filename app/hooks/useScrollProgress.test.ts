import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollProgress } from "./useScrollProgress";

describe("useScrollProgress", () => {
  let scrollListeners: Array<(e: Event) => void> = [];

  beforeEach(() => {
    scrollListeners = [];

    // Mock window.addEventListener
    vi.spyOn(window, "addEventListener").mockImplementation(
      (event, handler) => {
        if (event === "scroll") {
          scrollListeners.push(handler as (e: Event) => void);
        }
      }
    );

    vi.spyOn(window, "removeEventListener").mockImplementation(() => {});

    // Mock document properties
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
      value: 800,
      configurable: true,
    });
    Object.defineProperty(window, "scrollY", {
      value: 0,
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    scrollListeners = [];
  });

  it("should return 0 initially when at top of page", () => {
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });

    const { result } = renderHook(() => useScrollProgress());

    expect(result.current).toBe(0);
  });

  it("should update progress on scroll", () => {
    const { result } = renderHook(() => useScrollProgress());

    // Simulate scroll to 50% (600 / 1200 scrollable pixels)
    Object.defineProperty(window, "scrollY", {
      value: 600,
      configurable: true,
    });

    act(() => {
      scrollListeners.forEach((listener) => listener(new Event("scroll")));
    });

    expect(result.current).toBe(50);
  });

  it("should return 100 when scrolled to bottom", () => {
    const { result } = renderHook(() => useScrollProgress());

    // Scrollable height = 2000 - 800 = 1200
    Object.defineProperty(window, "scrollY", {
      value: 1200,
      configurable: true,
    });

    act(() => {
      scrollListeners.forEach((listener) => listener(new Event("scroll")));
    });

    expect(result.current).toBe(100);
  });

  it("should clamp progress to 100 when over-scrolled", () => {
    const { result } = renderHook(() => useScrollProgress());

    // Simulate over-scroll
    Object.defineProperty(window, "scrollY", {
      value: 2000,
      configurable: true,
    });

    act(() => {
      scrollListeners.forEach((listener) => listener(new Event("scroll")));
    });

    expect(result.current).toBeLessThanOrEqual(100);
  });

  it("should clamp progress to 0 for negative scroll values", () => {
    const { result } = renderHook(() => useScrollProgress());

    // Simulate negative scroll (edge case)
    Object.defineProperty(window, "scrollY", {
      value: -100,
      configurable: true,
    });

    act(() => {
      scrollListeners.forEach((listener) => listener(new Event("scroll")));
    });

    expect(result.current).toBeGreaterThanOrEqual(0);
  });

  it("should return 0 when page is not scrollable", () => {
    // Make page non-scrollable (scrollHeight equals clientHeight)
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 800,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
      value: 800,
      configurable: true,
    });

    const { result } = renderHook(() => useScrollProgress());

    expect(result.current).toBe(0);
  });

  it("should add passive scroll listener on mount", () => {
    renderHook(() => useScrollProgress());

    expect(window.addEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      { passive: true }
    );
  });

  it("should remove scroll listener on unmount", () => {
    const { unmount } = renderHook(() => useScrollProgress());

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  it("should calculate correct percentage for various scroll positions", () => {
    const { result } = renderHook(() => useScrollProgress());

    // Test 25%
    Object.defineProperty(window, "scrollY", {
      value: 300,
      configurable: true,
    });
    act(() => {
      scrollListeners.forEach((listener) => listener(new Event("scroll")));
    });
    expect(result.current).toBe(25);

    // Test 75%
    Object.defineProperty(window, "scrollY", {
      value: 900,
      configurable: true,
    });
    act(() => {
      scrollListeners.forEach((listener) => listener(new Event("scroll")));
    });
    expect(result.current).toBe(75);
  });
});
