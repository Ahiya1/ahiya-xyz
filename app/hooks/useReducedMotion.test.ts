import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useReducedMotion } from "./useReducedMotion";

describe("useReducedMotion", () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let mockAddEventListener: ReturnType<typeof vi.fn>;
  let mockRemoveEventListener: ReturnType<typeof vi.fn>;
  let eventHandler: ((event: MediaQueryListEvent) => void) | null = null;

  beforeEach(() => {
    mockAddEventListener = vi.fn((event, handler) => {
      if (event === "change") {
        eventHandler = handler;
      }
    });
    mockRemoveEventListener = vi.fn();

    mockMatchMedia = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: vi.fn(),
    }));

    vi.stubGlobal("window", {
      matchMedia: mockMatchMedia,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    eventHandler = null;
  });

  it("should return false by default (no reduced motion preference)", () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });

  it("should return true when prefers-reduced-motion matches", () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    const { result } = renderHook(() => useReducedMotion());

    // After useEffect runs, the state should be true
    expect(result.current).toBe(true);
  });

  it("should respond to preference changes", async () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    const { result } = renderHook(() => useReducedMotion());

    // Initially false
    expect(result.current).toBe(false);

    // Simulate user changing preference to reduced motion
    act(() => {
      if (eventHandler) {
        eventHandler({ matches: true } as MediaQueryListEvent);
      }
    });

    // Should update to true
    expect(result.current).toBe(true);

    // Simulate user changing preference back to no preference
    act(() => {
      if (eventHandler) {
        eventHandler({ matches: false } as MediaQueryListEvent);
      }
    });

    // Should update to false
    expect(result.current).toBe(false);
  });

  it("should add event listener on mount", () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    renderHook(() => useReducedMotion());

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("should remove event listener on unmount", () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    const { unmount } = renderHook(() => useReducedMotion());

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("should call matchMedia with correct query", () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    renderHook(() => useReducedMotion());

    expect(mockMatchMedia).toHaveBeenCalledWith(
      "(prefers-reduced-motion: reduce)"
    );
  });
});
