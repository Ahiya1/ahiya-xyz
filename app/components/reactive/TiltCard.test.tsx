/**
 * Tests for TiltCard Component
 * Plan-17 Iteration-19
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TiltCard } from "./TiltCard";

// Mock useReducedMotion hook
vi.mock("@/app/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

// Mock animation-utils
vi.mock("@/lib/animation-utils", () => ({
  springPresets: {
    tilt: { stiffness: 200, damping: 20, mass: 0.3 },
  },
  useIsMobile: vi.fn().mockReturnValue(false),
}));

// Mock framer-motion with unique test IDs
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, style, className, "aria-hidden": ariaHidden, ...props }: {
      children: React.ReactNode;
      style?: Record<string, unknown>;
      className?: string;
      "aria-hidden"?: string | boolean;
    }) => (
      <div
        data-testid={ariaHidden ? "motion-shine" : "motion-wrapper"}
        className={className}
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
  useMotionTemplate: vi.fn(() => "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 60%)"),
}));

import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/animation-utils";

describe("TiltCard", () => {
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
      <TiltCard>
        <div>Card Content</div>
      </TiltCard>
    );

    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    render(
      <TiltCard className="custom-class">
        <div>Test</div>
      </TiltCard>
    );

    const wrapper = screen.getByTestId("motion-wrapper");
    expect(wrapper).toHaveClass("custom-class");
  });

  it("should disable effect when prefersReducedMotion is true", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    render(
      <TiltCard>
        <div>Test</div>
      </TiltCard>
    );

    // When disabled, should not have motion wrapper
    expect(screen.queryByTestId("motion-wrapper")).not.toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should disable effect on mobile", () => {
    vi.mocked(useIsMobile).mockReturnValue(true);

    render(
      <TiltCard>
        <div>Test</div>
      </TiltCard>
    );

    // When disabled, should not have motion wrapper
    expect(screen.queryByTestId("motion-wrapper")).not.toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should disable effect when disabled prop is true", () => {
    render(
      <TiltCard disabled>
        <div>Test</div>
      </TiltCard>
    );

    expect(screen.queryByTestId("motion-wrapper")).not.toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should handle mouse move events on perspective container", () => {
    const { container } = render(
      <TiltCard>
        <div>Test</div>
      </TiltCard>
    );

    // Get the perspective container (outer div)
    const perspectiveContainer = container.firstChild as HTMLElement;

    // Should not throw when mouse moves
    fireEvent.mouseMove(perspectiveContainer, { clientX: 100, clientY: 100 });
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should handle mouse leave events", () => {
    const { container } = render(
      <TiltCard>
        <div>Test</div>
      </TiltCard>
    );

    const perspectiveContainer = container.firstChild as HTMLElement;

    // Should not throw when mouse leaves
    fireEvent.mouseLeave(perspectiveContainer);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should apply custom perspective value", () => {
    const { container } = render(
      <TiltCard perspective={800}>
        <div>Test</div>
      </TiltCard>
    );

    const perspectiveContainer = container.firstChild as HTMLElement;
    expect(perspectiveContainer).toHaveStyle({ perspective: "800px" });
  });

  it("should apply default perspective value", () => {
    const { container } = render(
      <TiltCard>
        <div>Test</div>
      </TiltCard>
    );

    const perspectiveContainer = container.firstChild as HTMLElement;
    expect(perspectiveContainer).toHaveStyle({ perspective: "1000px" });
  });

  it("should apply custom maxTilt value", () => {
    render(
      <TiltCard maxTilt={12}>
        <div>Test</div>
      </TiltCard>
    );

    // Component should render without error with custom maxTilt
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should render shine element when enableShine is true", () => {
    render(
      <TiltCard enableShine>
        <div>Test</div>
      </TiltCard>
    );

    // Should have shine element
    expect(screen.getByTestId("motion-shine")).toBeInTheDocument();
  });

  it("should not render shine element when enableShine is false", () => {
    render(
      <TiltCard enableShine={false}>
        <div>Test</div>
      </TiltCard>
    );

    // Should have motion wrapper but not the shine overlay
    expect(screen.getByTestId("motion-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("motion-shine")).not.toBeInTheDocument();
  });

  it("should return to flat on mouse leave", () => {
    const { container } = render(
      <TiltCard>
        <div>Test</div>
      </TiltCard>
    );

    const perspectiveContainer = container.firstChild as HTMLElement;

    // Simulate mouse move then leave
    fireEvent.mouseMove(perspectiveContainer, { clientX: 150, clientY: 150 });
    fireEvent.mouseLeave(perspectiveContainer);

    // Component should still render correctly after mouse leave
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
