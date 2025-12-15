/**
 * Tests for Engagement Analytics API
 * Plan-17 Iteration-20
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock cookies
const mockCookieGet = vi.fn();
vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    get: mockCookieGet,
  })),
}));

// Mock auth
vi.mock("@/lib/auth", () => ({
  verifyAdminToken: vi.fn().mockResolvedValue({ valid: true }),
}));

// Mock database
vi.mock("@vercel/postgres", () => ({
  sql: vi.fn(),
}));

import { GET } from "./route";
import { verifyAdminToken } from "@/lib/auth";
import { sql } from "@vercel/postgres";

describe("GET /api/admin/engagement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default authenticated state
    mockCookieGet.mockReturnValue({ value: "valid-token" });
    vi.mocked(verifyAdminToken).mockResolvedValue({ valid: true });
  });

  describe("authentication", () => {
    it("should return 401 when no auth cookie present", async () => {
      mockCookieGet.mockReturnValue(undefined);

      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=7d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe("Unauthorized");
    });

    it("should return 401 when token is invalid", async () => {
      mockCookieGet.mockReturnValue({ value: "invalid-token" });
      vi.mocked(verifyAdminToken).mockResolvedValue({ valid: false });

      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=7d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe("Unauthorized");
    });
  });

  describe("happy path", () => {
    beforeEach(() => {
      // Setup mock SQL responses
      const mockSqlResponse = {
        rows: [
          { avg_scroll: 65 },
        ],
      };

      const mockTimeResponse = {
        rows: [{ avg_seconds: 45, sessions: 100 }],
      };

      const mockFunnelResponse = {
        rows: [
          { page_views: 1000, scroll_50: 600, cta_clicks: 150, cal_opens: 30 },
        ],
      };

      const mockScrollDistResponse = {
        rows: [
          { milestone: "25%", sessions: 200, percentage: 20 },
          { milestone: "50%", sessions: 300, percentage: 30 },
          { milestone: "75%", sessions: 300, percentage: 30 },
          { milestone: "100%", sessions: 200, percentage: 20 },
        ],
      };

      const mockTopClicksResponse = {
        rows: [
          { label: "hero_cta", category: "CTA", count: 100, page_path: "/" },
          {
            label: "pricing_starter",
            category: "CTA",
            count: 50,
            page_path: "/pricing",
          },
        ],
      };

      const mockSparklineResponse = {
        rows: [
          { date: "2024-01-01", scroll: 60, sessions: 50 },
          { date: "2024-01-02", scroll: 65, sessions: 55 },
        ],
      };

      // Mock sql to return different results for different queries
      let callCount = 0;
      vi.mocked(sql).mockImplementation(() => {
        const responses = [
          mockSqlResponse, // scroll depth
          mockTimeResponse, // time on page
          mockFunnelResponse, // funnel
          mockScrollDistResponse, // scroll distribution
          mockTopClicksResponse, // top clicks
          mockSqlResponse, // prev scroll depth
          mockTimeResponse, // prev time on page
          { rows: [{ sessions: 80 }] }, // prev sessions
          mockSparklineResponse, // sparkline
        ];
        return Promise.resolve(responses[callCount++] || { rows: [] });
      });
    });

    it("should return engagement data with default 7d range", async () => {
      const request = new NextRequest(
        "http://localhost/api/admin/engagement"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("metrics");
      expect(data).toHaveProperty("funnel");
      expect(data).toHaveProperty("scrollDistribution");
      expect(data).toHaveProperty("topClicks");
    });

    it("should return engagement data with today range", async () => {
      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=today"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("metrics");
    });

    it("should return engagement data with 30d range", async () => {
      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=30d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("metrics");
    });

    it("should return engagement data with 90d range", async () => {
      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=90d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("metrics");
    });

    it("should use 7d as default for invalid range", async () => {
      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=invalid"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("metrics");
    });

    it("should return metrics structure correctly", async () => {
      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=7d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(data.metrics).toHaveProperty("avgScrollDepth");
      expect(data.metrics).toHaveProperty("avgTimeOnPage");
      expect(data.metrics).toHaveProperty("engagementScore");
      expect(data.metrics).toHaveProperty("totalSessions");

      // Each metric should have value, change, trend, sparkline
      expect(data.metrics.avgScrollDepth).toHaveProperty("value");
      expect(data.metrics.avgScrollDepth).toHaveProperty("change");
      expect(data.metrics.avgScrollDepth).toHaveProperty("trend");
      expect(data.metrics.avgScrollDepth).toHaveProperty("sparkline");
    });

    it("should return funnel structure correctly", async () => {
      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=7d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(data.funnel).toHaveProperty("pageViews");
      expect(data.funnel).toHaveProperty("scroll50");
      expect(data.funnel).toHaveProperty("ctaClicks");
      expect(data.funnel).toHaveProperty("calOpens");
    });

    it("should return scroll distribution as array", async () => {
      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=7d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(Array.isArray(data.scrollDistribution)).toBe(true);
    });

    it("should return top clicks as array", async () => {
      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=7d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(Array.isArray(data.topClicks)).toBe(true);
    });
  });

  describe("error handling", () => {
    it("should return 500 on database error", async () => {
      vi.mocked(sql).mockRejectedValueOnce(new Error("Database error"));

      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=7d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Internal server error");
    });
  });

  describe("edge cases", () => {
    it("should handle empty data gracefully", async () => {
      // Mock empty responses
      vi.mocked(sql).mockResolvedValue({ rows: [] });

      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=7d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.metrics.avgScrollDepth.value).toBe(0);
      expect(data.metrics.avgTimeOnPage.value).toBe(0);
      expect(data.funnel.pageViews).toBe(0);
    });

    it("should handle null values in database response", async () => {
      vi.mocked(sql).mockResolvedValue({
        rows: [{ avg_scroll: null, avg_seconds: null, sessions: null }],
      });

      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=7d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.metrics.avgScrollDepth.value).toBe(0);
    });
  });

  describe("trend calculation", () => {
    it("should calculate positive trend when current > previous", async () => {
      let callCount = 0;
      vi.mocked(sql).mockImplementation(() => {
        const responses = [
          { rows: [{ avg_scroll: 70 }] }, // current scroll
          { rows: [{ avg_seconds: 50, sessions: 100 }] }, // current time
          { rows: [{ page_views: 1000, scroll_50: 600, cta_clicks: 150, cal_opens: 30 }] },
          { rows: [] }, // scroll dist
          { rows: [] }, // top clicks
          { rows: [{ avg_scroll: 50 }] }, // prev scroll (lower)
          { rows: [{ avg_seconds: 30, sessions: 60 }] }, // prev time (lower)
          { rows: [{ sessions: 60 }] }, // prev sessions (lower)
          { rows: [] }, // sparkline
        ];
        return Promise.resolve(responses[callCount++] || { rows: [] });
      });

      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=7d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.metrics.avgScrollDepth.trend).toBe("up");
    });

    it("should calculate negative trend when current < previous", async () => {
      let callCount = 0;
      vi.mocked(sql).mockImplementation(() => {
        const responses = [
          { rows: [{ avg_scroll: 40 }] }, // current scroll (lower)
          { rows: [{ avg_seconds: 30, sessions: 50 }] }, // current time
          { rows: [{ page_views: 500, scroll_50: 300, cta_clicks: 75, cal_opens: 15 }] },
          { rows: [] }, // scroll dist
          { rows: [] }, // top clicks
          { rows: [{ avg_scroll: 70 }] }, // prev scroll (higher)
          { rows: [{ avg_seconds: 60, sessions: 100 }] }, // prev time (higher)
          { rows: [{ sessions: 100 }] }, // prev sessions (higher)
          { rows: [] }, // sparkline
        ];
        return Promise.resolve(responses[callCount++] || { rows: [] });
      });

      const request = new NextRequest(
        "http://localhost/api/admin/engagement?range=7d"
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.metrics.avgScrollDepth.trend).toBe("down");
    });
  });
});
