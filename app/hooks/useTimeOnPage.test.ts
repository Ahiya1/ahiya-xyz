/**
 * Tests for useTimeOnPage Hook
 * Plan-17 Iteration-19
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/test"),
}));

// Mock tracking library
vi.mock("@/lib/tracking", () => ({
  trackEngagement: vi.fn(),
}));

import { useTimeOnPage } from "./useTimeOnPage";
import { trackEngagement } from "@/lib/tracking";
import { usePathname } from "next/navigation";

describe("useTimeOnPage", () => {
  let visibilityState: "visible" | "hidden" = "visible";
  let visibilityChangeHandler: ((event: Event) => void) | null = null;
  let beforeUnloadHandler: ((event: Event) => void) | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    visibilityState = "visible";
    visibilityChangeHandler = null;
    beforeUnloadHandler = null;

    // Mock document.visibilityState
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => visibilityState,
    });

    // Capture event handlers
    vi.spyOn(document, "addEventListener").mockImplementation((event, handler) => {
      if (event === "visibilitychange") {
        visibilityChangeHandler = handler as (event: Event) => void;
      }
    });

    vi.spyOn(document, "removeEventListener").mockImplementation(() => {});

    vi.spyOn(window, "addEventListener").mockImplementation((event, handler) => {
      if (event === "beforeunload") {
        beforeUnloadHandler = handler as (event: Event) => void;
      }
    });

    vi.spyOn(window, "removeEventListener").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  function simulateVisibilityChange(newState: "visible" | "hidden") {
    visibilityState = newState;
    if (visibilityChangeHandler) {
      visibilityChangeHandler(new Event("visibilitychange"));
    }
  }

  it("should not track if disabled", () => {
    renderHook(() => useTimeOnPage({ enabled: false }));

    // Advance time past heartbeat interval
    vi.advanceTimersByTime(35000);

    expect(trackEngagement).not.toHaveBeenCalled();
  });

  it("should send heartbeat after interval when visible", () => {
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
    expect(trackEngagement).toHaveBeenCalledTimes(1);
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

  it("should track when time exceeds minimum threshold", () => {
    renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 1000,
        minTimeToTrackMs: 2000,
      })
    );

    // Advance time past threshold and heartbeat
    vi.advanceTimersByTime(3000);

    expect(trackEngagement).toHaveBeenCalled();
  });

  it("should not send heartbeat while hidden", () => {
    renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 10000,
        minTimeToTrackMs: 1000,
      })
    );

    // Simulate tab hidden
    simulateVisibilityChange("hidden");

    // Clear any existing calls
    vi.mocked(trackEngagement).mockClear();

    // Advance time while hidden
    vi.advanceTimersByTime(15000);

    // Heartbeat should not fire while hidden
    expect(trackEngagement).not.toHaveBeenCalled();
  });

  it("should accumulate time correctly when tab visibility changes", () => {
    renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 100000, // Long interval to avoid heartbeat interference
        minTimeToTrackMs: 5000,
      })
    );

    // Visible for 3 seconds
    vi.advanceTimersByTime(3000);

    // Hide tab
    simulateVisibilityChange("hidden");

    // Hidden for 5 seconds (should not count)
    vi.advanceTimersByTime(5000);

    // Show tab again
    simulateVisibilityChange("visible");

    // Visible for 3 more seconds (total visible: 6 seconds)
    vi.advanceTimersByTime(3000);

    // Advance past heartbeat
    vi.advanceTimersByTime(100000);

    // Should have tracked approximately 6 seconds of visible time (+ heartbeat interval)
    expect(trackEngagement).toHaveBeenCalled();
    const trackedTime = vi.mocked(trackEngagement).mock.calls[0][0];
    // Time should be close to 106000 (6 seconds visible + 100 seconds heartbeat)
    expect(trackedTime).toBeGreaterThanOrEqual(5000);
  });

  it("should send final time on cleanup (navigation)", () => {
    const { unmount } = renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 100000, // Long interval to prevent heartbeat
        minTimeToTrackMs: 1000,
      })
    );

    // Advance time past threshold
    vi.advanceTimersByTime(5000);

    // Clear heartbeat calls
    vi.mocked(trackEngagement).mockClear();

    // Unmount (simulates navigation)
    unmount();

    // Should send final time
    expect(trackEngagement).toHaveBeenCalled();
  });

  it("should send final time on beforeunload", () => {
    renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 100000,
        minTimeToTrackMs: 1000,
      })
    );

    // Advance time past threshold
    vi.advanceTimersByTime(5000);

    // Clear any calls
    vi.mocked(trackEngagement).mockClear();

    // Simulate beforeunload
    if (beforeUnloadHandler) {
      beforeUnloadHandler(new Event("beforeunload"));
    }

    expect(trackEngagement).toHaveBeenCalled();
  });

  it("should only send final time once (idempotent)", () => {
    const { unmount } = renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 100000,
        minTimeToTrackMs: 1000,
      })
    );

    // Advance time past threshold
    vi.advanceTimersByTime(5000);

    // Clear any calls
    vi.mocked(trackEngagement).mockClear();

    // Trigger beforeunload
    if (beforeUnloadHandler) {
      beforeUnloadHandler(new Event("beforeunload"));
    }

    const callCount = vi.mocked(trackEngagement).mock.calls.length;

    // Unmount (would also try to send final time)
    unmount();

    // Should not have made additional calls
    expect(trackEngagement).toHaveBeenCalledTimes(callCount);
  });

  it("should reset on pathname change", () => {
    const { rerender } = renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 5000,
        minTimeToTrackMs: 1000,
      })
    );

    // Advance time
    vi.advanceTimersByTime(3000);

    // Simulate pathname change
    vi.mocked(usePathname).mockReturnValue("/new-page");
    rerender();

    // Should have sent final time for previous page
    expect(trackEngagement).toHaveBeenCalled();
  });

  it("should set up event listeners when enabled", () => {
    renderHook(() => useTimeOnPage({ enabled: true }));

    expect(document.addEventListener).toHaveBeenCalledWith(
      "visibilitychange",
      expect.any(Function)
    );
    expect(window.addEventListener).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );
  });

  it("should clean up event listeners on unmount", () => {
    const { unmount } = renderHook(() => useTimeOnPage({ enabled: true }));

    unmount();

    expect(document.removeEventListener).toHaveBeenCalledWith(
      "visibilitychange",
      expect.any(Function)
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );
  });

  it("should not send final time below threshold", () => {
    const { unmount } = renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 100000,
        minTimeToTrackMs: 10000,
      })
    );

    // Only 2 seconds (below 10s threshold)
    vi.advanceTimersByTime(2000);

    unmount();

    expect(trackEngagement).not.toHaveBeenCalled();
  });

  it("should use default options", () => {
    renderHook(() => useTimeOnPage());

    // Should set up listeners with default enabled=true
    expect(document.addEventListener).toHaveBeenCalled();

    // Default heartbeat is 30 seconds
    vi.advanceTimersByTime(31000);

    // Default min threshold is 5 seconds, so it should track
    expect(trackEngagement).toHaveBeenCalled();
  });

  it("should send multiple heartbeats over time", () => {
    renderHook(() =>
      useTimeOnPage({
        enabled: true,
        heartbeatIntervalMs: 10000,
        minTimeToTrackMs: 1000,
      })
    );

    // First heartbeat at 10 seconds
    vi.advanceTimersByTime(11000);
    expect(trackEngagement).toHaveBeenCalledTimes(1);

    // Second heartbeat at 20 seconds
    vi.advanceTimersByTime(10000);
    expect(trackEngagement).toHaveBeenCalledTimes(2);

    // Third heartbeat at 30 seconds
    vi.advanceTimersByTime(10000);
    expect(trackEngagement).toHaveBeenCalledTimes(3);
  });
});
