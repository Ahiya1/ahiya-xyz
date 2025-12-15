/**
 * Tests for Client-Side Event Tracking Library
 * Plan-17 Iteration-18
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("tracking library", () => {
  let mockSendBeacon: ReturnType<typeof vi.fn>;
  let mockFetch: ReturnType<typeof vi.fn>;
  let mockLocalStorage: Record<string, string>;
  let mockSessionStorage: Record<string, string>;
  let trackingModule: typeof import("./tracking");

  beforeEach(async () => {
    vi.resetModules();

    mockSendBeacon = vi.fn().mockReturnValue(true);
    mockFetch = vi.fn().mockResolvedValue({ ok: true });
    mockLocalStorage = {};
    mockSessionStorage = {};

    // Setup mocks before importing module
    const localStorageMock = {
      getItem: vi.fn((key: string) => mockLocalStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => { mockLocalStorage[key] = value; }),
      removeItem: vi.fn((key: string) => { delete mockLocalStorage[key]; }),
      clear: vi.fn(() => { mockLocalStorage = {}; }),
    };

    const sessionStorageMock = {
      getItem: vi.fn((key: string) => mockSessionStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => { mockSessionStorage[key] = value; }),
      removeItem: vi.fn((key: string) => { delete mockSessionStorage[key]; }),
      clear: vi.fn(() => { mockSessionStorage = {}; }),
    };

    vi.stubGlobal("localStorage", localStorageMock);
    vi.stubGlobal("sessionStorage", sessionStorageMock);
    vi.stubGlobal("crypto", { randomUUID: vi.fn(() => "test-uuid-1234") });
    vi.stubGlobal("fetch", mockFetch);

    // Default navigator with DNT off
    vi.stubGlobal("navigator", { doNotTrack: "0", sendBeacon: mockSendBeacon });

    // Mock window properties
    vi.stubGlobal("window", {
      ...window,
      location: { pathname: "/test-page" },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      doNotTrack: undefined,
    });

    vi.stubGlobal("document", {
      ...document,
      addEventListener: vi.fn(),
      visibilityState: "visible",
    });

    // Import module fresh
    trackingModule = await import("./tracking");
  });

  afterEach(() => {
    if (trackingModule) {
      trackingModule._testing.resetState();
    }
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  describe("shouldTrack", () => {
    it("should return true when DNT is disabled", () => {
      expect(trackingModule.shouldTrack()).toBe(true);
    });

    it("should return false when DNT is enabled via navigator.doNotTrack", async () => {
      vi.resetModules();
      vi.stubGlobal("navigator", { doNotTrack: "1", sendBeacon: mockSendBeacon });

      const module = await import("./tracking");
      expect(module.shouldTrack()).toBe(false);
    });

    it("should return true when DNT is not set", async () => {
      vi.resetModules();
      vi.stubGlobal("navigator", { sendBeacon: mockSendBeacon });

      const module = await import("./tracking");
      expect(module.shouldTrack()).toBe(true);
    });

    it("should return false when window.doNotTrack is 1 (Firefox)", async () => {
      vi.resetModules();
      vi.stubGlobal("navigator", { sendBeacon: mockSendBeacon });
      vi.stubGlobal("window", {
        ...window,
        doNotTrack: "1",
        location: { pathname: "/test" },
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const module = await import("./tracking");
      expect(module.shouldTrack()).toBe(false);
    });
  });

  describe("getSessionId", () => {
    it("should create a new session ID if none exists", () => {
      const sessionId = trackingModule.getSessionId();
      expect(sessionId).toBe("test-uuid-1234");
      expect(localStorage.setItem).toHaveBeenCalledWith("ahiya_client_session", "test-uuid-1234");
    });

    it("should return existing session ID if valid", async () => {
      vi.resetModules();

      mockLocalStorage["ahiya_client_session"] = "existing-session-id";
      mockSessionStorage["ahiya_session_start"] = Date.now().toString();

      const localStorageMock = {
        getItem: vi.fn((key: string) => mockLocalStorage[key] || null),
        setItem: vi.fn((key: string, value: string) => { mockLocalStorage[key] = value; }),
        removeItem: vi.fn(),
        clear: vi.fn(),
      };
      const sessionStorageMock = {
        getItem: vi.fn((key: string) => mockSessionStorage[key] || null),
        setItem: vi.fn((key: string, value: string) => { mockSessionStorage[key] = value; }),
        removeItem: vi.fn(),
        clear: vi.fn(),
      };

      vi.stubGlobal("localStorage", localStorageMock);
      vi.stubGlobal("sessionStorage", sessionStorageMock);
      vi.stubGlobal("navigator", { doNotTrack: "0", sendBeacon: mockSendBeacon });

      const module = await import("./tracking");
      const sessionId = module.getSessionId();

      expect(sessionId).toBe("existing-session-id");
    });

    it("should create new session ID if session expired", async () => {
      vi.resetModules();

      mockLocalStorage["ahiya_client_session"] = "old-session-id";
      mockSessionStorage["ahiya_session_start"] = (Date.now() - 31 * 60 * 1000).toString();

      const localStorageMock = {
        getItem: vi.fn((key: string) => mockLocalStorage[key] || null),
        setItem: vi.fn((key: string, value: string) => { mockLocalStorage[key] = value; }),
        removeItem: vi.fn(),
        clear: vi.fn(),
      };
      const sessionStorageMock = {
        getItem: vi.fn((key: string) => mockSessionStorage[key] || null),
        setItem: vi.fn((key: string, value: string) => { mockSessionStorage[key] = value; }),
        removeItem: vi.fn(),
        clear: vi.fn(),
      };

      vi.stubGlobal("localStorage", localStorageMock);
      vi.stubGlobal("sessionStorage", sessionStorageMock);
      vi.stubGlobal("navigator", { doNotTrack: "0", sendBeacon: mockSendBeacon });
      vi.stubGlobal("crypto", { randomUUID: vi.fn(() => "new-uuid-5678") });

      const module = await import("./tracking");
      const sessionId = module.getSessionId();

      expect(sessionId).toBe("new-uuid-5678");
    });
  });

  describe("trackScroll", () => {
    it("should queue scroll events with correct structure", () => {
      trackingModule.trackScroll(50);

      const queue = trackingModule._testing.getEventQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0]).toMatchObject({
        eventCategory: "scroll",
        eventAction: "scroll_50",
        eventValue: 50,
        pagePath: "/test-page",
      });
    });

    it("should not track when DNT is enabled", async () => {
      vi.resetModules();
      vi.stubGlobal("navigator", { doNotTrack: "1", sendBeacon: mockSendBeacon });

      const module = await import("./tracking");
      module.trackScroll(25);

      expect(module._testing.getEventQueue()).toHaveLength(0);
    });
  });

  describe("trackClick", () => {
    it("should queue click events correctly", () => {
      trackingModule.trackClick("cta", "hero_button");

      const queue = trackingModule._testing.getEventQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0]).toMatchObject({
        eventCategory: "click",
        eventAction: "cta_click",
        eventLabel: "hero_button",
      });
    });
  });

  describe("trackConversion", () => {
    it("should queue conversion events with metadata", () => {
      trackingModule.trackConversion("signup", { source: "pricing" });

      const queue = trackingModule._testing.getEventQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0]).toMatchObject({
        eventCategory: "conversion",
        eventAction: "signup",
        metadata: { source: "pricing" },
      });
    });
  });

  describe("flushEvents", () => {
    it("should send events using sendBeacon when available", () => {
      trackingModule.trackScroll(25);
      trackingModule.trackScroll(50);

      expect(trackingModule._testing.getEventQueue()).toHaveLength(2);

      trackingModule.flushEvents();

      expect(mockSendBeacon).toHaveBeenCalledTimes(1);
      expect(mockSendBeacon).toHaveBeenCalledWith(
        "/api/analytics/event",
        expect.stringContaining('"events"')
      );
      expect(trackingModule._testing.getEventQueue()).toHaveLength(0);
    });

    it("should do nothing when queue is empty", () => {
      trackingModule.flushEvents();
      expect(mockSendBeacon).not.toHaveBeenCalled();
    });

    it("should fall back to fetch when sendBeacon is not available", async () => {
      vi.resetModules();

      const localFetch = vi.fn().mockResolvedValue({ ok: true });
      vi.stubGlobal("navigator", { doNotTrack: "0" }); // No sendBeacon
      vi.stubGlobal("fetch", localFetch);
      vi.stubGlobal("localStorage", {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      });
      vi.stubGlobal("sessionStorage", {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      });
      vi.stubGlobal("window", {
        ...window,
        location: { pathname: "/test" },
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });
      vi.stubGlobal("crypto", { randomUUID: vi.fn(() => "test-uuid") });

      const module = await import("./tracking");
      module.trackScroll(25);
      module.flushEvents();

      expect(localFetch).toHaveBeenCalledWith(
        "/api/analytics/event",
        expect.objectContaining({
          method: "POST",
          keepalive: true,
        })
      );
    });
  });

  describe("event batching", () => {
    it("should batch multiple events into single request", () => {
      trackingModule.trackScroll(25);
      trackingModule.trackScroll(50);
      trackingModule.trackClick("nav", "about");

      trackingModule.flushEvents();

      expect(mockSendBeacon).toHaveBeenCalledTimes(1);

      const payload = JSON.parse(mockSendBeacon.mock.calls[0][1]);
      expect(payload.events).toHaveLength(3);
    });

    it("should auto-flush when batch reaches max size", () => {
      // Queue 50 events (max batch size)
      for (let i = 0; i < 50; i++) {
        trackingModule.trackScroll(25);
      }

      // Should have auto-flushed
      expect(mockSendBeacon).toHaveBeenCalledTimes(1);
      expect(trackingModule._testing.getEventQueue()).toHaveLength(0);
    });
  });

  describe("initTracking", () => {
    it("should start flush timer and set up event listeners", () => {
      vi.useFakeTimers();

      trackingModule.initTracking();
      trackingModule.trackScroll(25);

      // Advance timer past flush interval (3 seconds)
      vi.advanceTimersByTime(3500);

      expect(mockSendBeacon).toHaveBeenCalled();
    });

    it("should not initialize twice", () => {
      trackingModule.initTracking();
      trackingModule.initTracking();

      expect(trackingModule._testing.getIsInitialized()).toBe(true);
    });

    it("should not initialize when DNT is enabled", async () => {
      vi.resetModules();
      vi.stubGlobal("navigator", { doNotTrack: "1", sendBeacon: mockSendBeacon });

      const module = await import("./tracking");
      module.initTracking();

      expect(module._testing.getIsInitialized()).toBe(false);
    });
  });

  describe("teardownTracking", () => {
    it("should flush remaining events and reset state", () => {
      trackingModule.initTracking();
      trackingModule.trackScroll(25);

      trackingModule.teardownTracking();

      expect(mockSendBeacon).toHaveBeenCalled();
      expect(trackingModule._testing.getIsInitialized()).toBe(false);
      expect(trackingModule._testing.getEventQueue()).toHaveLength(0);
    });
  });

  describe("trackEvent", () => {
    it("should accept all valid event categories", () => {
      trackingModule.trackEvent("scroll", "test_scroll");
      trackingModule.trackEvent("click", "test_click");
      trackingModule.trackEvent("engagement", "test_engagement");
      trackingModule.trackEvent("conversion", "test_conversion");

      const queue = trackingModule._testing.getEventQueue();
      expect(queue).toHaveLength(4);
      expect(queue[0].eventCategory).toBe("scroll");
      expect(queue[1].eventCategory).toBe("click");
      expect(queue[2].eventCategory).toBe("engagement");
      expect(queue[3].eventCategory).toBe("conversion");
    });
  });

  describe("trackEngagement", () => {
    it("should track engagement time correctly", () => {
      trackingModule.trackEngagement(5000);

      const queue = trackingModule._testing.getEventQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0]).toMatchObject({
        eventCategory: "engagement",
        eventAction: "time_on_page",
        eventValue: 5000,
      });
    });
  });
});
