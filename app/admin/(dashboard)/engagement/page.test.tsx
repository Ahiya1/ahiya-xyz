/**
 * Tests for Engagement Dashboard Page
 * Plan-17 Iteration-20
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock SWR
const mockUseSWR = vi.fn();
vi.mock("swr", () => ({
  default: () => mockUseSWR(),
}));

// Mock child components
vi.mock("@/app/admin/components/TimeRangeSelector", () => ({
  TimeRangeSelector: ({
    value,
    onRangeChange,
  }: {
    value: string;
    onRangeChange: (range: string) => void;
  }) => (
    <div data-testid="time-range-selector">
      <button onClick={() => onRangeChange("today")}>Today</button>
      <button onClick={() => onRangeChange("7d")}>7d</button>
      <button onClick={() => onRangeChange("30d")}>30d</button>
      <span data-testid="current-range">{value}</span>
    </div>
  ),
}));

vi.mock("@/app/admin/components/MetricCard", () => ({
  MetricCard: ({
    title,
    value,
    isLoading,
  }: {
    title: string;
    value: string | number;
    isLoading?: boolean;
  }) => (
    <div data-testid={`metric-card-${title.toLowerCase().replace(/\s/g, "-")}`}>
      {isLoading ? (
        <span data-testid="loading">Loading...</span>
      ) : (
        <>
          <span data-testid="metric-title">{title}</span>
          <span data-testid="metric-value">{value}</span>
        </>
      )}
    </div>
  ),
}));

vi.mock("@/app/admin/components/EmptyState", () => ({
  EmptyState: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

vi.mock("@/app/admin/components/ConversionFunnel", () => ({
  ConversionFunnel: ({ data }: { data: unknown }) => (
    <div data-testid="conversion-funnel">
      Funnel: {JSON.stringify(data)}
    </div>
  ),
}));

vi.mock("@/app/admin/components/ScrollDepthChart", () => ({
  ScrollDepthChart: ({ data }: { data: unknown }) => (
    <div data-testid="scroll-depth-chart">
      Chart: {JSON.stringify(data)}
    </div>
  ),
}));

import EngagementPage from "./page";

describe("EngagementPage", () => {
  const mockEngagementData = {
    metrics: {
      avgScrollDepth: { value: 65, change: 5.2, trend: "up" as const, sparkline: [] },
      avgTimeOnPage: { value: 45, change: -2.1, trend: "down" as const, sparkline: [] },
      engagementScore: { value: 72, change: 8.3, trend: "up" as const, sparkline: [] },
      totalSessions: { value: 1234, change: 15.0, trend: "up" as const, sparkline: [] },
    },
    funnel: {
      pageViews: 1000,
      scroll50: 600,
      ctaClicks: 150,
      calOpens: 30,
    },
    scrollDistribution: [
      { milestone: "25%", sessions: 200, percentage: 20 },
      { milestone: "50%", sessions: 300, percentage: 30 },
    ],
    topClicks: [
      { label: "hero_cta", category: "CTA", count: 100, pagePath: "/" },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("loading state", () => {
    it("should show loading state when data is loading", () => {
      mockUseSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: true,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      // Check for loading indicators in metric cards
      expect(screen.getAllByTestId("loading")).toHaveLength(4);
    });
  });

  describe("error state", () => {
    it("should show error message when fetch fails", () => {
      mockUseSWR.mockReturnValue({
        data: undefined,
        error: new Error("Failed to fetch"),
        isLoading: false,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      expect(screen.getByText("Failed to load engagement data")).toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    it("should show empty states when no data", () => {
      mockUseSWR.mockReturnValue({
        data: {
          metrics: {
            avgScrollDepth: { value: 0, change: 0, trend: "neutral", sparkline: [] },
            avgTimeOnPage: { value: 0, change: 0, trend: "neutral", sparkline: [] },
            engagementScore: { value: 0, change: 0, trend: "neutral", sparkline: [] },
            totalSessions: { value: 0, change: 0, trend: "neutral", sparkline: [] },
          },
          funnel: { pageViews: 0, scroll50: 0, ctaClicks: 0, calOpens: 0 },
          scrollDistribution: [],
          topClicks: [],
        },
        error: undefined,
        isLoading: false,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      // Should show empty states for charts and tables
      expect(screen.getAllByTestId("empty-state")).toHaveLength(3);
    });
  });

  describe("happy path", () => {
    beforeEach(() => {
      mockUseSWR.mockReturnValue({
        data: mockEngagementData,
        error: undefined,
        isLoading: false,
        mutate: vi.fn(),
      });
    });

    it("should render page title and description", () => {
      render(<EngagementPage />);

      expect(screen.getByText("Engagement")).toBeInTheDocument();
      expect(
        screen.getByText("Understand how visitors interact with your site")
      ).toBeInTheDocument();
    });

    it("should render all metric cards", () => {
      render(<EngagementPage />);

      expect(
        screen.getByTestId("metric-card-engagement-score")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("metric-card-avg-scroll-depth")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("metric-card-avg-time-on-page")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("metric-card-tracked-sessions")
      ).toBeInTheDocument();
    });

    it("should display metric values correctly", () => {
      render(<EngagementPage />);

      expect(screen.getByText("72/100")).toBeInTheDocument(); // Engagement score
      expect(screen.getByText("65%")).toBeInTheDocument(); // Avg scroll depth
      expect(screen.getByText("45s")).toBeInTheDocument(); // Avg time on page
      expect(screen.getByText("1,234")).toBeInTheDocument(); // Total sessions
    });

    it("should render conversion funnel with data", () => {
      render(<EngagementPage />);

      expect(screen.getByTestId("conversion-funnel")).toBeInTheDocument();
    });

    it("should render scroll depth chart with data", () => {
      render(<EngagementPage />);

      expect(screen.getByTestId("scroll-depth-chart")).toBeInTheDocument();
    });

    it("should render top clicked elements table", () => {
      render(<EngagementPage />);

      expect(screen.getByText("Top Clicked Elements")).toBeInTheDocument();
      expect(screen.getByText("hero_cta")).toBeInTheDocument();
    });

    it("should render engagement score explanation section", () => {
      render(<EngagementPage />);

      expect(
        screen.getByText("How Engagement Score is Calculated")
      ).toBeInTheDocument();
      expect(screen.getByText("Scroll Depth")).toBeInTheDocument();
      expect(screen.getByText("Time on Page")).toBeInTheDocument();
      expect(screen.getByText("Interactions")).toBeInTheDocument();
    });
  });

  describe("time range selection", () => {
    it("should default to 7d time range", () => {
      mockUseSWR.mockReturnValue({
        data: mockEngagementData,
        error: undefined,
        isLoading: false,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      expect(screen.getByTestId("current-range")).toHaveTextContent("7d");
    });

    it("should update time range when selector changes", async () => {
      const user = userEvent.setup();
      mockUseSWR.mockReturnValue({
        data: mockEngagementData,
        error: undefined,
        isLoading: false,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      await user.click(screen.getByText("30d"));

      await waitFor(() => {
        expect(screen.getByTestId("current-range")).toHaveTextContent("30d");
      });
    });
  });

  describe("refresh functionality", () => {
    it("should call mutate when refresh button is clicked", async () => {
      const user = userEvent.setup();
      const mockMutate = vi.fn();
      mockUseSWR.mockReturnValue({
        data: mockEngagementData,
        error: undefined,
        isLoading: false,
        mutate: mockMutate,
      });

      render(<EngagementPage />);

      const refreshButton = screen.getByTitle("Refresh data");
      await user.click(refreshButton);

      expect(mockMutate).toHaveBeenCalled();
    });

    it("should disable refresh button while loading", () => {
      mockUseSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: true,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      const refreshButton = screen.getByTitle("Refresh data");
      expect(refreshButton).toBeDisabled();
    });
  });

  describe("time formatting", () => {
    it("should format time < 60s correctly", () => {
      mockUseSWR.mockReturnValue({
        data: {
          ...mockEngagementData,
          metrics: {
            ...mockEngagementData.metrics,
            avgTimeOnPage: { value: 45, change: 0, trend: "neutral", sparkline: [] },
          },
        },
        error: undefined,
        isLoading: false,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      expect(screen.getByText("45s")).toBeInTheDocument();
    });

    it("should format time >= 60s with minutes", () => {
      mockUseSWR.mockReturnValue({
        data: {
          ...mockEngagementData,
          metrics: {
            ...mockEngagementData.metrics,
            avgTimeOnPage: { value: 125, change: 0, trend: "neutral", sparkline: [] },
          },
        },
        error: undefined,
        isLoading: false,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      expect(screen.getByText("2m 5s")).toBeInTheDocument();
    });

    it("should format exact minutes without seconds", () => {
      mockUseSWR.mockReturnValue({
        data: {
          ...mockEngagementData,
          metrics: {
            ...mockEngagementData.metrics,
            avgTimeOnPage: { value: 120, change: 0, trend: "neutral", sparkline: [] },
          },
        },
        error: undefined,
        isLoading: false,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      expect(screen.getByText("2m")).toBeInTheDocument();
    });
  });

  describe("top clicks table", () => {
    it("should display click category badges with correct colors", () => {
      mockUseSWR.mockReturnValue({
        data: {
          ...mockEngagementData,
          topClicks: [
            { label: "hero_cta", category: "CTA", count: 100, pagePath: "/" },
            { label: "nav_about", category: "Navigation", count: 50, pagePath: "/" },
            { label: "footer_link", category: "Link", count: 25, pagePath: "/" },
            { label: "other_element", category: "Other", count: 10, pagePath: "/" },
          ],
        },
        error: undefined,
        isLoading: false,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      expect(screen.getByText("CTA")).toBeInTheDocument();
      expect(screen.getByText("Navigation")).toBeInTheDocument();
      expect(screen.getByText("Link")).toBeInTheDocument();
      expect(screen.getByText("Other")).toBeInTheDocument();
    });

    it("should display click counts formatted with locale", () => {
      mockUseSWR.mockReturnValue({
        data: {
          ...mockEngagementData,
          topClicks: [
            { label: "popular_cta", category: "CTA", count: 1000, pagePath: "/" },
          ],
        },
        error: undefined,
        isLoading: false,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      expect(screen.getByText("1,000")).toBeInTheDocument();
    });

    it("should display page paths", () => {
      mockUseSWR.mockReturnValue({
        data: {
          ...mockEngagementData,
          topClicks: [
            { label: "pricing_cta", category: "CTA", count: 50, pagePath: "/pricing" },
          ],
        },
        error: undefined,
        isLoading: false,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      expect(screen.getByText("/pricing")).toBeInTheDocument();
    });
  });

  describe("footer info", () => {
    it("should show footer info when data is loaded", () => {
      mockUseSWR.mockReturnValue({
        data: mockEngagementData,
        error: undefined,
        isLoading: false,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      expect(
        screen.getByText(/Data refreshes automatically every 60 seconds/)
      ).toBeInTheDocument();
    });

    it("should not show footer info when loading", () => {
      mockUseSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: true,
        mutate: vi.fn(),
      });

      render(<EngagementPage />);

      expect(
        screen.queryByText(/Data refreshes automatically every 60 seconds/)
      ).not.toBeInTheDocument();
    });
  });
});
