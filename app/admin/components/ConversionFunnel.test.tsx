/**
 * Tests for ConversionFunnel Component
 * Plan-17 Iteration-20
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConversionFunnel } from "./ConversionFunnel";

// Mock Recharts components
vi.mock("recharts", () => ({
  FunnelChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="funnel-chart">{children}</div>
  ),
  Funnel: ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="funnel" data-length={data.length}>
      {children}
    </div>
  ),
  Cell: ({ fill }: { fill: string }) => <div data-testid="cell" data-fill={fill} />,
  LabelList: () => <div data-testid="label-list" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  Tooltip: () => <div data-testid="tooltip" />,
}));

describe("ConversionFunnel", () => {
  const mockData = {
    pageViews: 1000,
    scroll50: 600,
    ctaClicks: 150,
    calOpens: 30,
  };

  describe("rendering", () => {
    it("should render the funnel chart", () => {
      render(<ConversionFunnel data={mockData} />);

      expect(screen.getByTestId("funnel-chart")).toBeInTheDocument();
      expect(screen.getByTestId("funnel")).toBeInTheDocument();
    });

    it("should render responsive container", () => {
      render(<ConversionFunnel data={mockData} />);

      expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    });

    it("should render 4 funnel stages", () => {
      render(<ConversionFunnel data={mockData} />);

      const funnel = screen.getByTestId("funnel");
      expect(funnel).toHaveAttribute("data-length", "4");
    });

    it("should render cells with correct colors", () => {
      render(<ConversionFunnel data={mockData} />);

      const cells = screen.getAllByTestId("cell");
      expect(cells).toHaveLength(4);

      // Check colors are applied
      expect(cells[0]).toHaveAttribute("data-fill", "#a855f7");
      expect(cells[1]).toHaveAttribute("data-fill", "#8b5cf6");
      expect(cells[2]).toHaveAttribute("data-fill", "#6366f1");
      expect(cells[3]).toHaveAttribute("data-fill", "#4f46e5");
    });
  });

  describe("conversion rates", () => {
    it("should display conversion rates between stages", () => {
      render(<ConversionFunnel data={mockData} />);

      // Check for stage names in conversion rate section
      expect(screen.getByText("Page Views to")).toBeInTheDocument();
      expect(screen.getByText("Scrolled 50%")).toBeInTheDocument();
      expect(screen.getByText("CTA Clicks")).toBeInTheDocument();
      expect(screen.getByText("Cal.com Opens")).toBeInTheDocument();
    });

    it("should calculate correct conversion rate percentages", () => {
      render(<ConversionFunnel data={mockData} />);

      // Page Views (1000) -> Scroll 50% (600) = 60%
      expect(screen.getByText("60%")).toBeInTheDocument();

      // Scroll 50% (600) -> CTA Clicks (150) = 25%
      expect(screen.getByText("25%")).toBeInTheDocument();

      // CTA Clicks (150) -> Cal Opens (30) = 20%
      expect(screen.getByText("20%")).toBeInTheDocument();
    });

    it("should display overall conversion rate", () => {
      render(<ConversionFunnel data={mockData} />);

      expect(screen.getByText("Overall Conversion")).toBeInTheDocument();
      // Overall: 30 / 1000 * 100 = 3%
      expect(screen.getByText("3%")).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("should handle zero values gracefully", () => {
      const emptyData = {
        pageViews: 0,
        scroll50: 0,
        ctaClicks: 0,
        calOpens: 0,
      };

      render(<ConversionFunnel data={emptyData} />);

      // Should still render without errors
      expect(screen.getByTestId("funnel-chart")).toBeInTheDocument();

      // Overall conversion should be 0% - multiple 0% elements exist, so use getAllBy
      const zeroPercentElements = screen.getAllByText("0%");
      expect(zeroPercentElements.length).toBeGreaterThan(0);
    });

    it("should handle partial funnel data", () => {
      const partialData = {
        pageViews: 100,
        scroll50: 50,
        ctaClicks: 0,
        calOpens: 0,
      };

      render(<ConversionFunnel data={partialData} />);

      // Should render without errors
      expect(screen.getByTestId("funnel-chart")).toBeInTheDocument();
    });

    it("should handle when middle stages have higher values than top", () => {
      // This shouldn't happen in reality but should handle gracefully
      const anomalyData = {
        pageViews: 100,
        scroll50: 150, // Higher than page views
        ctaClicks: 50,
        calOpens: 10,
      };

      render(<ConversionFunnel data={anomalyData} />);

      // Should still render without crashing
      expect(screen.getByTestId("funnel-chart")).toBeInTheDocument();
    });

    it("should display green color when overall conversion > 0", () => {
      render(<ConversionFunnel data={mockData} />);

      // Find the overall conversion rate text (3%)
      const overallRate = screen.getByText("3%");
      expect(overallRate).toHaveClass("text-green-400");
    });

    it("should display gray color when overall conversion is 0", () => {
      const zeroConversionData = {
        pageViews: 100,
        scroll50: 50,
        ctaClicks: 25,
        calOpens: 0,
      };

      render(<ConversionFunnel data={zeroConversionData} />);

      // Find the overall conversion rate text (0%)
      const overallRate = screen.getByText("0%");
      expect(overallRate).toHaveClass("text-slate-400");
    });
  });

  describe("labels", () => {
    it("should display correct stage names", () => {
      render(<ConversionFunnel data={mockData} />);

      // These are the "to" targets in conversion rates
      expect(screen.getByText("Scrolled 50%")).toBeInTheDocument();
      expect(screen.getByText("CTA Clicks")).toBeInTheDocument();
      expect(screen.getByText("Cal.com Opens")).toBeInTheDocument();
    });
  });
});
