import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollProgressBar } from "./ScrollProgressBar";

// Mock the hooks
vi.mock("@/app/hooks/useScrollProgress", () => ({
  useScrollProgress: vi.fn().mockReturnValue(50),
}));

vi.mock("@/app/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      style,
      animate,
      transition,
      ...props
    }: {
      children?: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
      animate?: object;
      transition?: object;
    }) => (
      <div
        className={className}
        style={style}
        data-testid="motion-progress-bar"
        data-animate={JSON.stringify(animate)}
        data-transition={JSON.stringify(transition)}
      >
        {children}
      </div>
    ),
  },
}));

import { useScrollProgress } from "@/app/hooks/useScrollProgress";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

describe("ScrollProgressBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useScrollProgress).mockReturnValue(50);
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render when scroll progress is greater than 1", () => {
    vi.mocked(useScrollProgress).mockReturnValue(50);

    render(<ScrollProgressBar />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should not render when scroll progress is less than 1", () => {
    vi.mocked(useScrollProgress).mockReturnValue(0);

    const { container } = render(<ScrollProgressBar />);

    expect(container.firstChild).toBeNull();
  });

  it("should not render when scroll progress is exactly 0", () => {
    vi.mocked(useScrollProgress).mockReturnValue(0);

    const { container } = render(<ScrollProgressBar />);

    expect(container.firstChild).toBeNull();
  });

  it("should have correct aria attributes", () => {
    vi.mocked(useScrollProgress).mockReturnValue(75);

    render(<ScrollProgressBar />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "75");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    expect(progressbar).toHaveAttribute("aria-label", "Page scroll progress");
  });

  it("should use custom height", () => {
    vi.mocked(useScrollProgress).mockReturnValue(50);

    const { container } = render(<ScrollProgressBar height={4} />);

    const progressbar = container.firstChild as HTMLElement;
    expect(progressbar.style.height).toBe("4px");
  });

  it("should use default height of 2px", () => {
    vi.mocked(useScrollProgress).mockReturnValue(50);

    const { container } = render(<ScrollProgressBar />);

    const progressbar = container.firstChild as HTMLElement;
    expect(progressbar.style.height).toBe("2px");
  });

  it("should use custom background color", () => {
    vi.mocked(useScrollProgress).mockReturnValue(50);

    const { container } = render(<ScrollProgressBar bgColor="blue" />);

    const progressbar = container.firstChild as HTMLElement;
    expect(progressbar.style.backgroundColor).toBe("blue");
  });

  it("should use custom bar color", () => {
    vi.mocked(useScrollProgress).mockReturnValue(50);

    render(<ScrollProgressBar barColor="red" />);

    const motionDiv = screen.getByTestId("motion-progress-bar");
    expect(motionDiv.style.background).toBe("red");
  });

  it("should apply custom className", () => {
    vi.mocked(useScrollProgress).mockReturnValue(50);

    const { container } = render(
      <ScrollProgressBar className="custom-class" />
    );

    const progressbar = container.firstChild as HTMLElement;
    expect(progressbar.className).toContain("custom-class");
  });

  it("should have absolute positioning", () => {
    vi.mocked(useScrollProgress).mockReturnValue(50);

    const { container } = render(<ScrollProgressBar />);

    const progressbar = container.firstChild as HTMLElement;
    expect(progressbar.className).toContain("absolute");
    expect(progressbar.className).toContain("top-0");
    expect(progressbar.className).toContain("left-0");
    expect(progressbar.className).toContain("right-0");
  });

  it("should show progress bar at correct width", () => {
    vi.mocked(useScrollProgress).mockReturnValue(75);

    render(<ScrollProgressBar />);

    const motionDiv = screen.getByTestId("motion-progress-bar");
    expect(motionDiv.style.width).toBe("75%");
  });

  it("should use default gradient bar color", () => {
    vi.mocked(useScrollProgress).mockReturnValue(50);

    render(<ScrollProgressBar />);

    const motionDiv = screen.getByTestId("motion-progress-bar");
    expect(motionDiv.style.background).toContain("linear-gradient");
  });

  it("should use instant transition when reduced motion is preferred", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    vi.mocked(useScrollProgress).mockReturnValue(50);

    render(<ScrollProgressBar />);

    const motionDiv = screen.getByTestId("motion-progress-bar");
    const transition = JSON.parse(
      motionDiv.getAttribute("data-transition") || "{}"
    );
    expect(transition.duration).toBe(0);
  });

  it("should use smooth transition when reduced motion is not preferred", () => {
    vi.mocked(useReducedMotion).mockReturnValue(false);
    vi.mocked(useScrollProgress).mockReturnValue(50);

    render(<ScrollProgressBar />);

    const motionDiv = screen.getByTestId("motion-progress-bar");
    const transition = JSON.parse(
      motionDiv.getAttribute("data-transition") || "{}"
    );
    expect(transition.duration).toBe(0.1);
  });

  it("should render at edge case progress of exactly 1", () => {
    vi.mocked(useScrollProgress).mockReturnValue(1);

    render(<ScrollProgressBar />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should round aria-valuenow to nearest integer", () => {
    vi.mocked(useScrollProgress).mockReturnValue(33.333);

    render(<ScrollProgressBar />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "33");
  });
});
