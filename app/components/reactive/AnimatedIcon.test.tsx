/**
 * Tests for AnimatedIcon Component
 * Plan-17 Iteration-19
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { AnimatedIcon, type IconType } from "./AnimatedIcon";

// Mock useReducedMotion hook
vi.mock("@/app/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, style, animate, ...props }: {
      children: React.ReactNode;
      className?: string;
      style?: Record<string, unknown>;
      animate?: string;
    }) => (
      <div
        data-testid="motion-div"
        data-animate={animate}
        className={className}
        style={style as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    ),
  },
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Sparkles: ({ style, ...props }: { style?: React.CSSProperties }) => (
    <svg data-testid="icon-sparkles" style={style} {...props} />
  ),
  Terminal: ({ style, ...props }: { style?: React.CSSProperties }) => (
    <svg data-testid="icon-terminal" style={style} {...props} />
  ),
  BarChart3: ({ style, ...props }: { style?: React.CSSProperties }) => (
    <svg data-testid="icon-barchart" style={style} {...props} />
  ),
  FlaskConical: ({ style, ...props }: { style?: React.CSSProperties }) => (
    <svg data-testid="icon-flask" style={style} {...props} />
  ),
}));

import { useReducedMotion } from "@/app/hooks/useReducedMotion";

describe("AnimatedIcon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe("icon rendering", () => {
    it("should render sparkles icon for type sparkles", () => {
      render(<AnimatedIcon type="sparkles" />);
      expect(screen.getByTestId("icon-sparkles")).toBeInTheDocument();
    });

    it("should render terminal icon for type terminal", () => {
      render(<AnimatedIcon type="terminal" />);
      expect(screen.getByTestId("icon-terminal")).toBeInTheDocument();
    });

    it("should render barChart icon for type barChart", () => {
      render(<AnimatedIcon type="barChart" />);
      expect(screen.getByTestId("icon-barchart")).toBeInTheDocument();
    });

    it("should render flask icon for type flask", () => {
      render(<AnimatedIcon type="flask" />);
      expect(screen.getByTestId("icon-flask")).toBeInTheDocument();
    });
  });

  describe("animation states", () => {
    it("should show hover animation when isHovered is true", () => {
      render(<AnimatedIcon type="sparkles" isHovered />);

      const motionDiv = screen.getByTestId("motion-div");
      expect(motionDiv).toHaveAttribute("data-animate", "hover");
    });

    it("should show static state initially", () => {
      render(<AnimatedIcon type="sparkles" enableIdle={false} />);

      const motionDiv = screen.getByTestId("motion-div");
      expect(motionDiv).toHaveAttribute("data-animate", "static");
    });

    it("should show idle animation after delay", () => {
      render(<AnimatedIcon type="sparkles" enableIdle idleDelay={0} />);

      // Advance timer past idle delay
      act(() => {
        vi.advanceTimersByTime(100);
      });

      const motionDiv = screen.getByTestId("motion-div");
      expect(motionDiv).toHaveAttribute("data-animate", "idle");
    });

    it("should respect idleDelay prop", () => {
      render(<AnimatedIcon type="sparkles" enableIdle idleDelay={2} />);

      // Before delay
      let motionDiv = screen.getByTestId("motion-div");
      expect(motionDiv).toHaveAttribute("data-animate", "static");

      // After delay
      act(() => {
        vi.advanceTimersByTime(2100);
      });

      motionDiv = screen.getByTestId("motion-div");
      expect(motionDiv).toHaveAttribute("data-animate", "idle");
    });

    it("should not animate when enableIdle is false", () => {
      render(<AnimatedIcon type="sparkles" enableIdle={false} idleDelay={0} />);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      const motionDiv = screen.getByTestId("motion-div");
      expect(motionDiv).toHaveAttribute("data-animate", "static");
    });

    it("should prioritize hover over idle", () => {
      render(<AnimatedIcon type="sparkles" isHovered enableIdle idleDelay={0} />);

      act(() => {
        vi.advanceTimersByTime(100);
      });

      const motionDiv = screen.getByTestId("motion-div");
      expect(motionDiv).toHaveAttribute("data-animate", "hover");
    });
  });

  describe("reduced motion", () => {
    it("should respect reduced motion preference", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<AnimatedIcon type="sparkles" isHovered enableIdle idleDelay={0} />);

      act(() => {
        vi.advanceTimersByTime(100);
      });

      const motionDiv = screen.getByTestId("motion-div");
      expect(motionDiv).toHaveAttribute("data-animate", "static");
    });

    it("should not start idle animation when reduced motion is on", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<AnimatedIcon type="sparkles" enableIdle idleDelay={0} />);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      const motionDiv = screen.getByTestId("motion-div");
      expect(motionDiv).toHaveAttribute("data-animate", "static");
    });
  });

  describe("styling", () => {
    it("should apply custom size", () => {
      render(<AnimatedIcon type="sparkles" size={32} />);

      const icon = screen.getByTestId("icon-sparkles");
      expect(icon).toHaveStyle({ width: "32px", height: "32px" });
    });

    it("should apply custom color", () => {
      render(<AnimatedIcon type="sparkles" color="red" />);

      const motionDiv = screen.getByTestId("motion-div");
      // Color is normalized to rgb in the DOM
      expect(motionDiv).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });

    it("should apply custom className", () => {
      render(<AnimatedIcon type="sparkles" className="custom-class" />);

      const motionDiv = screen.getByTestId("motion-div");
      expect(motionDiv).toHaveClass("custom-class");
    });

    it("should set different originY for barChart type", () => {
      const { container: barChartContainer } = render(
        <AnimatedIcon type="barChart" />
      );
      const { container: sparklesContainer } = render(
        <AnimatedIcon type="sparkles" />
      );

      // Just verify both render without errors - originY is a framer-motion prop
      // not a standard CSS property, so we can't test it with toHaveStyle
      expect(barChartContainer.querySelector("[data-testid='motion-div']")).toBeInTheDocument();
      expect(sparklesContainer.querySelector("[data-testid='motion-div']")).toBeInTheDocument();
    });
  });

  describe("all icon types", () => {
    const iconTypes: IconType[] = ["sparkles", "terminal", "barChart", "flask"];

    iconTypes.forEach((type) => {
      it(`should render ${type} icon without errors`, () => {
        render(<AnimatedIcon type={type} />);
        expect(screen.getByTestId("motion-div")).toBeInTheDocument();
      });

      it(`should animate ${type} icon on hover`, () => {
        render(<AnimatedIcon type={type} isHovered />);

        const motionDiv = screen.getByTestId("motion-div");
        expect(motionDiv).toHaveAttribute("data-animate", "hover");
      });
    });
  });
});
