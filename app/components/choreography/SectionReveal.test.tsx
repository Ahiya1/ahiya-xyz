import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionReveal } from "./SectionReveal";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      style,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
    }) => (
      <div className={className} style={style} data-testid="motion-div">
        {children}
      </div>
    ),
  },
  useInView: vi.fn().mockReturnValue(true),
}));

// Mock useReducedMotion
vi.mock("@/app/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

// Mock animation-utils
vi.mock("@/lib/animation-utils", () => ({
  springPresets: {
    gentle: { stiffness: 100, damping: 15, mass: 0.5 },
    snappy: { stiffness: 300, damping: 20, mass: 0.5 },
  },
}));

import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useInView } from "framer-motion";

describe("SectionReveal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);
    vi.mocked(useInView).mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render children", () => {
    render(
      <SectionReveal>
        <div>Test Content</div>
      </SectionReveal>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render without animation when reduced motion is preferred", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    const { container } = render(
      <SectionReveal>
        <div>Test Content</div>
      </SectionReveal>
    );

    // Should not use motion.div when reduced motion is preferred
    const motionDiv = container.querySelector('[data-testid="motion-div"]');
    expect(motionDiv).not.toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <SectionReveal className="custom-class">
        <div>Test Content</div>
      </SectionReveal>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("custom-class");
  });

  it("should apply custom styles", () => {
    const customStyle = { backgroundColor: "red" };
    const { container } = render(
      <SectionReveal style={customStyle}>
        <div>Test Content</div>
      </SectionReveal>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.backgroundColor).toBe("red");
  });

  describe("SectionReveal.Item", () => {
    it("should render item children", () => {
      render(
        <SectionReveal>
          <SectionReveal.Item>
            <div>Item Content</div>
          </SectionReveal.Item>
        </SectionReveal>
      );

      expect(screen.getByText("Item Content")).toBeInTheDocument();
    });

    it("should render without animation when reduced motion is preferred", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(
        <SectionReveal.Item>
          <div>Item Content</div>
        </SectionReveal.Item>
      );

      expect(screen.getByText("Item Content")).toBeInTheDocument();
    });

    it("should apply custom className to item", () => {
      const { container } = render(
        <SectionReveal.Item className="item-class">
          <div>Item Content</div>
        </SectionReveal.Item>
      );

      const item = container.firstChild as HTMLElement;
      expect(item.className).toContain("item-class");
    });
  });

  describe("variants", () => {
    it("should accept fade variant", () => {
      render(
        <SectionReveal variant="fade">
          <div>Fade Content</div>
        </SectionReveal>
      );

      expect(screen.getByText("Fade Content")).toBeInTheDocument();
    });

    it("should accept fan-in variant", () => {
      render(
        <SectionReveal variant="fan-in">
          <div>Fan-in Content</div>
        </SectionReveal>
      );

      expect(screen.getByText("Fan-in Content")).toBeInTheDocument();
    });

    it("should accept cascade variant", () => {
      render(
        <SectionReveal variant="cascade">
          <div>Cascade Content</div>
        </SectionReveal>
      );

      expect(screen.getByText("Cascade Content")).toBeInTheDocument();
    });

    it("should accept scale-glow variant", () => {
      render(
        <SectionReveal variant="scale-glow">
          <div>Scale-glow Content</div>
        </SectionReveal>
      );

      expect(screen.getByText("Scale-glow Content")).toBeInTheDocument();
    });

    it("should default to fade variant", () => {
      render(
        <SectionReveal>
          <div>Default Content</div>
        </SectionReveal>
      );

      expect(screen.getByText("Default Content")).toBeInTheDocument();
    });
  });

  describe("fan-in variant logic", () => {
    it("should work with multiple items", () => {
      render(
        <SectionReveal variant="fan-in">
          <SectionReveal.Item index={0} totalItems={4} variant="fan-in">
            <div>Item 0</div>
          </SectionReveal.Item>
          <SectionReveal.Item index={1} totalItems={4} variant="fan-in">
            <div>Item 1</div>
          </SectionReveal.Item>
          <SectionReveal.Item index={2} totalItems={4} variant="fan-in">
            <div>Item 2</div>
          </SectionReveal.Item>
          <SectionReveal.Item index={3} totalItems={4} variant="fan-in">
            <div>Item 3</div>
          </SectionReveal.Item>
        </SectionReveal>
      );

      expect(screen.getByText("Item 0")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
    });
  });

  describe("cascade variant logic", () => {
    it("should work with sequentially indexed items", () => {
      render(
        <SectionReveal variant="cascade">
          <SectionReveal.Item index={0} variant="cascade">
            <div>Step 1</div>
          </SectionReveal.Item>
          <SectionReveal.Item index={1} variant="cascade">
            <div>Step 2</div>
          </SectionReveal.Item>
          <SectionReveal.Item index={2} variant="cascade">
            <div>Step 3</div>
          </SectionReveal.Item>
        </SectionReveal>
      );

      expect(screen.getByText("Step 1")).toBeInTheDocument();
      expect(screen.getByText("Step 2")).toBeInTheDocument();
      expect(screen.getByText("Step 3")).toBeInTheDocument();
    });
  });
});
