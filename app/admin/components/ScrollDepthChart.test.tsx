/**
 * Tests for ScrollDepthChart Component
 * Plan-17 Iteration-20
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollDepthChart } from "./ScrollDepthChart";

// Mock Recharts components
vi.mock("recharts", () => ({
  BarChart: ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="bar-chart" data-length={data.length}>
      {children}
    </div>
  ),
  Bar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar">{children}</div>
  ),
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  Cell: ({ fill }: { fill: string }) => <div data-testid="cell" data-fill={fill} />,
}));

describe("ScrollDepthChart", () => {
  const mockData = [
    { milestone: "25%", sessions: 200, percentage: 20 },
    { milestone: "50%", sessions: 300, percentage: 30 },
    { milestone: "75%", sessions: 300, percentage: 30 },
    { milestone: "100%", sessions: 200, percentage: 20 },
  ];

  describe("rendering", () => {
    it("should render the bar chart", () => {
      render(<ScrollDepthChart data={mockData} />);

      expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
      expect(screen.getByTestId("bar")).toBeInTheDocument();
    });

    it("should render responsive container", () => {
      render(<ScrollDepthChart data={mockData} />);

      expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    });

    it("should render 5 data points for milestones", () => {
      render(<ScrollDepthChart data={mockData} />);

      const barChart = screen.getByTestId("bar-chart");
      // Always renders 5 milestones: <25%, 25%, 50%, 75%, 100%
      expect(barChart).toHaveAttribute("data-length", "5");
    });

    it("should render X and Y axes", () => {
      render(<ScrollDepthChart data={mockData} />);

      expect(screen.getByTestId("x-axis")).toBeInTheDocument();
      expect(screen.getByTestId("y-axis")).toBeInTheDocument();
    });

    it("should render tooltip", () => {
      render(<ScrollDepthChart data={mockData} />);

      expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    });

    it("should render cells with milestone colors", () => {
      render(<ScrollDepthChart data={mockData} />);

      const cells = screen.getAllByTestId("cell");
      expect(cells).toHaveLength(5);

      // Check color mapping
      expect(cells[0]).toHaveAttribute("data-fill", "#ef4444"); // <25% - red
      expect(cells[1]).toHaveAttribute("data-fill", "#f97316"); // 25% - orange
      expect(cells[2]).toHaveAttribute("data-fill", "#eab308"); // 50% - yellow
      expect(cells[3]).toHaveAttribute("data-fill", "#22c55e"); // 75% - light green
      expect(cells[4]).toHaveAttribute("data-fill", "#10b981"); // 100% - green
    });
  });

  describe("summary stats", () => {
    it("should display percentage values for each milestone", () => {
      render(<ScrollDepthChart data={mockData} />);

      // Check percentages are displayed
      expect(screen.getAllByText("20%")).toHaveLength(2); // 25% and 100% milestones
      expect(screen.getAllByText("30%")).toHaveLength(2); // 50% and 75% milestones
    });

    it("should display milestone labels in summary", () => {
      render(<ScrollDepthChart data={mockData} />);

      // Check milestone labels
      expect(screen.getByText("<25%")).toBeInTheDocument();
      expect(screen.getByText("25%")).toBeInTheDocument();
      expect(screen.getByText("50%")).toBeInTheDocument();
      expect(screen.getByText("75%")).toBeInTheDocument();
      expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("should display total sessions count", () => {
      render(<ScrollDepthChart data={mockData} />);

      expect(screen.getByText("Total tracked sessions")).toBeInTheDocument();
      // Total: 200 + 300 + 300 + 200 = 1000
      expect(screen.getByText("1,000")).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("should handle empty data gracefully", () => {
      render(<ScrollDepthChart data={[]} />);

      // Should still render chart structure
      expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    });

    it("should handle missing milestones", () => {
      const partialData = [
        { milestone: "50%", sessions: 100, percentage: 100 },
      ];

      render(<ScrollDepthChart data={partialData} />);

      // Should still render all 5 milestone labels - use getAllByText for duplicates
      expect(screen.getByText("<25%")).toBeInTheDocument();
      // These may appear multiple times in chart and summary, use getAllByText
      expect(screen.getAllByText("25%").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("50%").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("75%").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("100%").length).toBeGreaterThanOrEqual(1);
    });

    it("should handle zero sessions", () => {
      const zeroData = [
        { milestone: "25%", sessions: 0, percentage: 0 },
        { milestone: "50%", sessions: 0, percentage: 0 },
        { milestone: "75%", sessions: 0, percentage: 0 },
        { milestone: "100%", sessions: 0, percentage: 0 },
      ];

      render(<ScrollDepthChart data={zeroData} />);

      expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
      expect(screen.getByText("0")).toBeInTheDocument(); // Total sessions
    });

    it("should format large session numbers with locale", () => {
      const largeData = [
        { milestone: "25%", sessions: 10000, percentage: 25 },
        { milestone: "50%", sessions: 20000, percentage: 50 },
        { milestone: "75%", sessions: 5000, percentage: 12.5 },
        { milestone: "100%", sessions: 5000, percentage: 12.5 },
      ];

      render(<ScrollDepthChart data={largeData} />);

      // Total: 40000
      expect(screen.getByText("40,000")).toBeInTheDocument();
    });
  });

  describe("ordering", () => {
    it("should always display milestones in correct order", () => {
      // Even if data comes in wrong order
      const unorderedData = [
        { milestone: "100%", sessions: 100, percentage: 10 },
        { milestone: "25%", sessions: 400, percentage: 40 },
        { milestone: "75%", sessions: 200, percentage: 20 },
        { milestone: "50%", sessions: 300, percentage: 30 },
      ];

      render(<ScrollDepthChart data={unorderedData} />);

      // Find all summary labels using text-slate-500 class for milestone names
      const milestoneLabels = document.querySelectorAll(".text-slate-500");

      // Filter to get only milestone percentage labels
      const milestones = Array.from(milestoneLabels)
        .map(el => el.textContent)
        .filter(text => text && (text.includes('%') || text === '<25%'));

      // Verify order includes our milestones
      expect(milestones).toContain("<25%");
      expect(milestones.indexOf("<25%")).toBeLessThan(milestones.indexOf("25%"));
    });
  });

  describe("accessibility", () => {
    it("should have meaningful text for screen readers", () => {
      render(<ScrollDepthChart data={mockData} />);

      expect(screen.getByText("Total tracked sessions")).toBeInTheDocument();
    });
  });
});
