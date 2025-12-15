/**
 * TrackingProvider Integration Tests
 * Verifies that TrackingProvider properly initializes all tracking hooks
 * Plan-17 Iteration-19
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { TrackingProvider } from "./TrackingProvider";

// Mock the tracking library
vi.mock("@/lib/tracking", () => ({
  initTracking: vi.fn(),
  teardownTracking: vi.fn(),
  trackScroll: vi.fn(),
  trackEngagement: vi.fn(),
  trackClick: vi.fn(),
  trackConversion: vi.fn(),
}));

// Mock the hooks
vi.mock("@/app/hooks/useScrollDepthTracker", () => ({
  useScrollDepthTracker: vi.fn(),
}));

vi.mock("@/app/hooks/useTimeOnPage", () => ({
  useTimeOnPage: vi.fn(),
}));

vi.mock("@/app/hooks/useClickTracker", () => ({
  useClickTracker: vi.fn(),
}));

import { initTracking, teardownTracking } from "@/lib/tracking";
import { useScrollDepthTracker } from "@/app/hooks/useScrollDepthTracker";
import { useTimeOnPage } from "@/app/hooks/useTimeOnPage";
import { useClickTracker } from "@/app/hooks/useClickTracker";

describe("TrackingProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("initialization", () => {
    it("should initialize tracking on mount when enabled", () => {
      render(
        <TrackingProvider enabled={true}>
          <div>Test Child</div>
        </TrackingProvider>
      );

      expect(initTracking).toHaveBeenCalledTimes(1);
    });

    it("should not initialize tracking when disabled", () => {
      render(
        <TrackingProvider enabled={false}>
          <div>Test Child</div>
        </TrackingProvider>
      );

      expect(initTracking).not.toHaveBeenCalled();
    });

    it("should call all tracking hooks with enabled prop", () => {
      render(
        <TrackingProvider enabled={true}>
          <div>Test Child</div>
        </TrackingProvider>
      );

      expect(useScrollDepthTracker).toHaveBeenCalledWith({ enabled: true });
      expect(useTimeOnPage).toHaveBeenCalledWith({ enabled: true });
      expect(useClickTracker).toHaveBeenCalledWith({ enabled: true });
    });

    it("should call all tracking hooks with disabled prop", () => {
      render(
        <TrackingProvider enabled={false}>
          <div>Test Child</div>
        </TrackingProvider>
      );

      expect(useScrollDepthTracker).toHaveBeenCalledWith({ enabled: false });
      expect(useTimeOnPage).toHaveBeenCalledWith({ enabled: false });
      expect(useClickTracker).toHaveBeenCalledWith({ enabled: false });
    });
  });

  describe("teardown", () => {
    it("should call teardownTracking on unmount", () => {
      const { unmount } = render(
        <TrackingProvider enabled={true}>
          <div>Test Child</div>
        </TrackingProvider>
      );

      unmount();

      expect(teardownTracking).toHaveBeenCalledTimes(1);
    });

    it("should not call teardownTracking on unmount when disabled", () => {
      const { unmount } = render(
        <TrackingProvider enabled={false}>
          <div>Test Child</div>
        </TrackingProvider>
      );

      unmount();

      expect(teardownTracking).not.toHaveBeenCalled();
    });
  });

  describe("rendering", () => {
    it("should render children correctly", () => {
      const { getByText } = render(
        <TrackingProvider enabled={true}>
          <div>Test Child Content</div>
        </TrackingProvider>
      );

      expect(getByText("Test Child Content")).toBeDefined();
    });

    it("should default enabled to true", () => {
      render(
        <TrackingProvider>
          <div>Test Child</div>
        </TrackingProvider>
      );

      expect(initTracking).toHaveBeenCalledTimes(1);
      expect(useScrollDepthTracker).toHaveBeenCalledWith({ enabled: true });
      expect(useTimeOnPage).toHaveBeenCalledWith({ enabled: true });
      expect(useClickTracker).toHaveBeenCalledWith({ enabled: true });
    });
  });
});
