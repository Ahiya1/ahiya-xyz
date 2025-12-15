/**
 * Tests for useClickTracker Hook
 * Plan-17 Iteration-19
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";

// Mock tracking library
vi.mock("@/lib/tracking", () => ({
  trackClick: vi.fn(),
  trackConversion: vi.fn(),
}));

import { useClickTracker } from "./useClickTracker";
import { trackClick, trackConversion } from "@/lib/tracking";

describe("useClickTracker", () => {
  let clickHandler: ((event: MouseEvent) => void) | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    document.body.innerHTML = "";
    clickHandler = null;

    // Capture the click handler
    vi.spyOn(document, "addEventListener").mockImplementation(
      (event, handler, options) => {
        if (event === "click") {
          clickHandler = handler as (event: MouseEvent) => void;
        }
      }
    );

    vi.spyOn(document, "removeEventListener").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  function simulateClick(element: HTMLElement) {
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(event, "target", { value: element, writable: false });
    if (clickHandler) {
      clickHandler(event);
    }
  }

  it("should track clicks on elements with data-track-click", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    // Create a trackable element
    const button = document.createElement("button");
    button.setAttribute("data-track-click", "test_button");
    document.body.appendChild(button);

    // Simulate click
    simulateClick(button);

    expect(trackClick).toHaveBeenCalledWith("cta", "test_button");
  });

  it("should parse category:label format", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    const link = document.createElement("a");
    link.setAttribute("data-track-click", "navigation:pricing");
    document.body.appendChild(link);

    simulateClick(link);

    expect(trackClick).toHaveBeenCalledWith("navigation", "pricing");
  });

  it("should track conversions when data-track-conversion is present", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    button.setAttribute("data-track-click", "calcom_button");
    button.setAttribute("data-track-conversion", "booking_intent");
    document.body.appendChild(button);

    simulateClick(button);

    expect(trackClick).toHaveBeenCalledWith("cta", "calcom_button");
    expect(trackConversion).toHaveBeenCalledWith("booking_intent");
  });

  it("should not track when disabled", () => {
    renderHook(() => useClickTracker({ enabled: false }));

    const button = document.createElement("button");
    button.setAttribute("data-track-click", "test_button");
    document.body.appendChild(button);

    simulateClick(button);

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
    simulateClick(icon);

    expect(trackClick).toHaveBeenCalledWith("cta", "parent_button");
  });

  it("should not track elements without data-track-click", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    document.body.appendChild(button);

    simulateClick(button);

    expect(trackClick).not.toHaveBeenCalled();
  });

  it("should sanitize tracking labels", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    // Include potentially dangerous characters
    button.setAttribute("data-track-click", "test<script>alert(1)</script>");
    document.body.appendChild(button);

    simulateClick(button);

    // Should have sanitized the label
    expect(trackClick).toHaveBeenCalledWith("cta", "testscriptalert1script");
  });

  it("should set up click listener on document with capture phase", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    expect(document.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      { capture: true }
    );
  });

  it("should clean up click listener on unmount", () => {
    const { unmount } = renderHook(() => useClickTracker({ enabled: true }));

    unmount();

    expect(document.removeEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      { capture: true }
    );
  });

  it("should not track empty attribute values", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    button.setAttribute("data-track-click", "");
    document.body.appendChild(button);

    simulateClick(button);

    expect(trackClick).not.toHaveBeenCalled();
  });

  it("should debounce rapid clicks", () => {
    renderHook(() => useClickTracker({ enabled: true, debounceMs: 300 }));

    const button = document.createElement("button");
    button.setAttribute("data-track-click", "rapid_click_test");
    document.body.appendChild(button);

    // First click
    simulateClick(button);
    expect(trackClick).toHaveBeenCalledTimes(1);

    // Rapid second click (within debounce window)
    vi.advanceTimersByTime(100);
    simulateClick(button);
    expect(trackClick).toHaveBeenCalledTimes(1);

    // Click after debounce window
    vi.advanceTimersByTime(300);
    simulateClick(button);
    expect(trackClick).toHaveBeenCalledTimes(2);
  });

  it("should use custom attribute name", () => {
    renderHook(() =>
      useClickTracker({ enabled: true, attribute: "data-custom-track" })
    );

    // Element with default attribute should not be tracked
    const button1 = document.createElement("button");
    button1.setAttribute("data-track-click", "default_attr");
    document.body.appendChild(button1);

    simulateClick(button1);
    expect(trackClick).not.toHaveBeenCalled();

    // Element with custom attribute should be tracked
    const button2 = document.createElement("button");
    button2.setAttribute("data-custom-track", "custom_attr");
    document.body.appendChild(button2);

    simulateClick(button2);
    expect(trackClick).toHaveBeenCalledWith("cta", "custom_attr");
  });

  it("should handle deeply nested elements", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    button.setAttribute("data-track-click", "deep_nested");
    const span = document.createElement("span");
    const icon = document.createElement("i");
    span.appendChild(icon);
    button.appendChild(span);
    document.body.appendChild(button);

    // Click on deeply nested icon
    simulateClick(icon);

    expect(trackClick).toHaveBeenCalledWith("cta", "deep_nested");
  });

  it("should handle multiple colons in category:label format", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    // category:label:extra should use first part as category, second as label
    button.setAttribute("data-track-click", "nav:pricing:extra");
    document.body.appendChild(button);

    simulateClick(button);

    // Only first colon separates, second part is label (extra is ignored)
    expect(trackClick).toHaveBeenCalledWith("nav", "pricing");
  });

  it("should truncate very long labels", () => {
    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    // Create a label longer than 100 chars
    const longLabel = "a".repeat(150);
    button.setAttribute("data-track-click", longLabel);
    document.body.appendChild(button);

    simulateClick(button);

    // Label should be truncated to 100 chars
    const calledLabel = vi.mocked(trackClick).mock.calls[0][1];
    expect(calledLabel.length).toBe(100);
  });

  it("should handle tracking errors gracefully", () => {
    // Make trackClick throw
    vi.mocked(trackClick).mockImplementationOnce(() => {
      throw new Error("Tracking error");
    });

    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    button.setAttribute("data-track-click", "error_test");
    document.body.appendChild(button);

    // Should not throw
    expect(() => simulateClick(button)).not.toThrow();
  });

  it("should handle conversion tracking errors gracefully", () => {
    // Make trackConversion throw
    vi.mocked(trackConversion).mockImplementationOnce(() => {
      throw new Error("Conversion tracking error");
    });

    renderHook(() => useClickTracker({ enabled: true }));

    const button = document.createElement("button");
    button.setAttribute("data-track-click", "conversion_error_test");
    button.setAttribute("data-track-conversion", "test_conversion");
    document.body.appendChild(button);

    // Should not throw and should still have tried trackClick
    expect(() => simulateClick(button)).not.toThrow();
    expect(trackClick).toHaveBeenCalled();
  });

  it("should allow different elements to be clicked rapidly", () => {
    renderHook(() => useClickTracker({ enabled: true, debounceMs: 300 }));

    const button1 = document.createElement("button");
    button1.setAttribute("data-track-click", "button_1");
    document.body.appendChild(button1);

    const button2 = document.createElement("button");
    button2.setAttribute("data-track-click", "button_2");
    document.body.appendChild(button2);

    // Click both buttons rapidly
    simulateClick(button1);
    simulateClick(button2);

    // Both should be tracked since they're different elements
    expect(trackClick).toHaveBeenCalledTimes(2);
    expect(trackClick).toHaveBeenCalledWith("cta", "button_1");
    expect(trackClick).toHaveBeenCalledWith("cta", "button_2");
  });

  it("should use default options", () => {
    renderHook(() => useClickTracker());

    // Should set up listener with default enabled=true
    expect(document.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      { capture: true }
    );
  });
});
