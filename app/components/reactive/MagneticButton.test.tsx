/**
 * Tests for MagneticButton Component
 * Plan-17 Iteration-19
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MagneticButton } from "./MagneticButton";

// Mock useReducedMotion hook
vi.mock("@/app/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

// Mock animation-utils
vi.mock("@/lib/animation-utils", () => ({
  springPresets: {
    magnetic: { stiffness: 150, damping: 15, mass: 0.1 },
  },
  useIsMobile: vi.fn().mockReturnValue(false),
  clamp: (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value)),
}));

// Mock framer-motion with unique test IDs
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, style, onMouseMove, onMouseLeave, className, "aria-hidden": ariaHidden, ...props }: {
      children: React.ReactNode;
      style?: Record<string, unknown>;
      onMouseMove?: (e: React.MouseEvent) => void;
      onMouseLeave?: () => void;
      className?: string;
      "aria-hidden"?: boolean;
    }) => (
      <div
        data-testid={ariaHidden ? "motion-glow" : "motion-wrapper"}
        className={className}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        aria-hidden={ariaHidden}
        {...props}
      >
        {children}
      </div>
    ),
  },
  useSpring: vi.fn((initialValue: number) => ({
    set: vi.fn(),
    get: () => initialValue,
  })),
}));

import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/animation-utils";

describe("MagneticButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);
    vi.mocked(useIsMobile).mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render children correctly", () => {
    render(
      <MagneticButton>
        <button>Click me</button>
      </MagneticButton>
    );

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    render(
      <MagneticButton className="custom-class">
        <button>Test</button>
      </MagneticButton>
    );

    const wrapper = screen.getByTestId("motion-wrapper");
    expect(wrapper).toHaveClass("custom-class");
  });

  it("should disable effect when prefersReducedMotion is true", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    render(
      <MagneticButton>
        <button>Test</button>
      </MagneticButton>
    );

    // When disabled, should render a regular div (no motion wrapper)
    expect(screen.queryByTestId("motion-wrapper")).not.toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should disable effect on mobile", () => {
    vi.mocked(useIsMobile).mockReturnValue(true);

    render(
      <MagneticButton>
        <button>Test</button>
      </MagneticButton>
    );

    // When disabled, should render a regular div (no motion wrapper)
    expect(screen.queryByTestId("motion-wrapper")).not.toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should disable effect when disabled prop is true", () => {
    render(
      <MagneticButton disabled>
        <button>Test</button>
      </MagneticButton>
    );

    expect(screen.queryByTestId("motion-wrapper")).not.toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should handle mouse move events", () => {
    render(
      <MagneticButton>
        <button>Test</button>
      </MagneticButton>
    );

    const wrapper = screen.getByTestId("motion-wrapper");

    // Should not throw when mouse moves
    fireEvent.mouseMove(wrapper, { clientX: 100, clientY: 100 });
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should handle mouse leave events", () => {
    render(
      <MagneticButton>
        <button>Test</button>
      </MagneticButton>
    );

    const wrapper = screen.getByTestId("motion-wrapper");

    // Should not throw when mouse leaves
    fireEvent.mouseLeave(wrapper);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should render glow element when enableGlow is true", () => {
    render(
      <MagneticButton enableGlow>
        <button>Test</button>
      </MagneticButton>
    );

    // Should have glow element
    expect(screen.getByTestId("motion-glow")).toBeInTheDocument();
  });

  it("should not render glow element when enableGlow is false", () => {
    render(
      <MagneticButton enableGlow={false}>
        <button>Test</button>
      </MagneticButton>
    );

    // Should not have glow element
    expect(screen.queryByTestId("motion-glow")).not.toBeInTheDocument();
  });

  it("should apply custom pullDistance and pullStrength", () => {
    render(
      <MagneticButton pullDistance={16} pullStrength={0.6}>
        <button>Test</button>
      </MagneticButton>
    );

    // Component should render without error with custom props
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should apply inline-block class by default", () => {
    render(
      <MagneticButton>
        <button>Test</button>
      </MagneticButton>
    );

    const wrapper = screen.getByTestId("motion-wrapper");
    expect(wrapper).toHaveClass("inline-block");
  });
});
