import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TextShimmer } from "./TextShimmer";

// Mock the hooks
vi.mock("@/app/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

vi.mock("@/app/hooks/usePeriodicAnimation", () => ({
  usePeriodicAnimation: vi.fn().mockReturnValue({
    isAnimating: false,
    trigger: vi.fn(),
  }),
}));

import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { usePeriodicAnimation } from "@/app/hooks/usePeriodicAnimation";

describe("TextShimmer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);
    vi.mocked(usePeriodicAnimation).mockReturnValue({
      isAnimating: false,
      trigger: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render children", () => {
    render(
      <TextShimmer>
        <span>Test Content</span>
      </TextShimmer>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render without animation wrapper when reduced motion is preferred", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    const { container } = render(
      <TextShimmer>
        <span>Test Content</span>
      </TextShimmer>
    );

    // Should not have the shimmer overlay div when reduced motion is on
    const shimmerOverlay = container.querySelector('[aria-hidden="true"]');
    expect(shimmerOverlay).not.toBeInTheDocument();
  });

  it("should pass correct options to usePeriodicAnimation", () => {
    render(
      <TextShimmer intervalMs={5000} durationMs={1000}>
        <span>Test Content</span>
      </TextShimmer>
    );

    expect(usePeriodicAnimation).toHaveBeenCalledWith({
      intervalMs: 5000,
      durationMs: 1000,
      enabled: true,
    });
  });

  it("should disable periodic animation when reduced motion is preferred", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    render(
      <TextShimmer>
        <span>Test Content</span>
      </TextShimmer>
    );

    expect(usePeriodicAnimation).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      })
    );
  });

  it("should apply custom className", () => {
    const { container } = render(
      <TextShimmer className="custom-class">
        <span>Test Content</span>
      </TextShimmer>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("custom-class");
  });

  it("should show shimmer overlay when animating", () => {
    vi.mocked(usePeriodicAnimation).mockReturnValue({
      isAnimating: true,
      trigger: vi.fn(),
    });

    const { container } = render(
      <TextShimmer>
        <span>Test Content</span>
      </TextShimmer>
    );

    const shimmerOverlay = container.querySelector('[aria-hidden="true"]');
    expect(shimmerOverlay).toBeInTheDocument();
    expect(shimmerOverlay?.className).toContain("animate-text-shimmer");
  });

  it("should hide shimmer overlay when not animating", () => {
    vi.mocked(usePeriodicAnimation).mockReturnValue({
      isAnimating: false,
      trigger: vi.fn(),
    });

    const { container } = render(
      <TextShimmer>
        <span>Test Content</span>
      </TextShimmer>
    );

    const shimmerOverlay = container.querySelector('[aria-hidden="true"]');
    expect(shimmerOverlay).toBeInTheDocument();
    expect(shimmerOverlay?.className).toContain("opacity-0");
  });

  it("should use default interval and duration", () => {
    render(
      <TextShimmer>
        <span>Test Content</span>
      </TextShimmer>
    );

    expect(usePeriodicAnimation).toHaveBeenCalledWith({
      intervalMs: 9000,
      durationMs: 1500,
      enabled: true,
    });
  });

  it("should have shimmer overlay with correct styles", () => {
    vi.mocked(usePeriodicAnimation).mockReturnValue({
      isAnimating: true,
      trigger: vi.fn(),
    });

    const { container } = render(
      <TextShimmer>
        <span>Test Content</span>
      </TextShimmer>
    );

    const shimmerOverlay = container.querySelector(
      '[aria-hidden="true"]'
    ) as HTMLElement;
    expect(shimmerOverlay.style.mixBlendMode).toBe("overlay");
    expect(shimmerOverlay.className).toContain("pointer-events-none");
  });
});
