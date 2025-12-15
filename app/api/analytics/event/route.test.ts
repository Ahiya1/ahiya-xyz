/**
 * Tests for Analytics Event API
 * Plan-17 Iteration-18
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock the database module
vi.mock("@/lib/db", () => ({
  insertEvents: vi.fn().mockResolvedValue(undefined),
}));

import { POST } from "./route";
import { insertEvents } from "@/lib/db";

describe("POST /api/analytics/event", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("happy path", () => {
    it("should accept valid single event", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          pagePath: "/",
          eventCategory: "scroll",
          eventAction: "scroll_25",
          eventValue: 25,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true, count: 1 });
      expect(insertEvents).toHaveBeenCalledTimes(1);
    });

    it("should accept valid event batch", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          events: [
            {
              sessionId: "test-session-1234567890abcdef",
              pagePath: "/",
              eventCategory: "scroll",
              eventAction: "scroll_25",
              eventValue: 25,
            },
            {
              sessionId: "test-session-1234567890abcdef",
              pagePath: "/pricing",
              eventCategory: "click",
              eventAction: "cta_click",
              eventLabel: "hero_button",
            },
          ],
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true, count: 2 });
      expect(insertEvents).toHaveBeenCalledTimes(1);
      expect(insertEvents).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ eventCategory: "scroll" }),
          expect.objectContaining({ eventCategory: "click" }),
        ])
      );
    });

    it("should accept events with optional fields", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          pagePath: "/",
          eventCategory: "conversion",
          eventAction: "form_submit",
          eventLabel: "contact_form",
          eventValue: 100,
          visitorHash: "abc123def456",
          metadata: { source: "homepage" },
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true, count: 1 });
    });

    it("should accept all valid event categories", async () => {
      const categories = ["scroll", "click", "engagement", "conversion"];

      for (const category of categories) {
        vi.clearAllMocks();

        const request = new NextRequest("http://localhost/api/analytics/event", {
          method: "POST",
          body: JSON.stringify({
            sessionId: "test-session-1234567890abcdef",
            pagePath: "/",
            eventCategory: category,
            eventAction: "test_action",
          }),
        });

        const response = await POST(request);
        expect(response.status).toBe(200);
      }
    });
  });

  describe("validation errors", () => {
    it("should reject missing sessionId", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          pagePath: "/",
          eventCategory: "scroll",
          eventAction: "scroll_25",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("sessionId");
    });

    it("should reject missing pagePath", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          eventCategory: "scroll",
          eventAction: "scroll_25",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("pagePath");
    });

    it("should reject missing eventCategory", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          pagePath: "/",
          eventAction: "scroll_25",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("eventCategory");
    });

    it("should reject invalid event category", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          pagePath: "/",
          eventCategory: "invalid_category",
          eventAction: "test_action",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid event category");
    });

    it("should reject missing eventAction", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          pagePath: "/",
          eventCategory: "scroll",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("eventAction");
    });

    it("should reject eventAction longer than 100 chars", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          pagePath: "/",
          eventCategory: "scroll",
          eventAction: "a".repeat(101),
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("eventAction too long (max 100)");
    });

    it("should reject eventLabel longer than 200 chars", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          pagePath: "/",
          eventCategory: "click",
          eventAction: "test_click",
          eventLabel: "a".repeat(201),
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("eventLabel too long (max 200)");
    });

    it("should reject eventLabel containing PII (email)", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          pagePath: "/",
          eventCategory: "click",
          eventAction: "test_click",
          eventLabel: "user_test@example.com clicked button",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("eventLabel must not contain PII");
    });

    it("should reject batch larger than 50 events", async () => {
      const events = Array.from({ length: 51 }, () => ({
        sessionId: "test-session-1234567890abcdef",
        pagePath: "/",
        eventCategory: "scroll",
        eventAction: "scroll_25",
      }));

      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({ events }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Batch too large (max 50)");
    });

    it("should reject empty events array", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({ events: [] }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("No events provided");
    });

    it("should reject invalid JSON", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: "not valid json",
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid JSON");
    });

    it("should reject non-integer eventValue", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          pagePath: "/",
          eventCategory: "scroll",
          eventAction: "scroll_25",
          eventValue: 25.5,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("eventValue must be an integer");
    });

    it("should reject pagePath longer than 500 chars", async () => {
      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          pagePath: "/" + "a".repeat(500),
          eventCategory: "scroll",
          eventAction: "scroll_25",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain("pagePath");
    });
  });

  describe("error handling", () => {
    it("should return 500 on database error", async () => {
      vi.mocked(insertEvents).mockRejectedValueOnce(new Error("Database error"));

      const request = new NextRequest("http://localhost/api/analytics/event", {
        method: "POST",
        body: JSON.stringify({
          sessionId: "test-session-1234567890abcdef",
          pagePath: "/",
          eventCategory: "scroll",
          eventAction: "scroll_25",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Internal server error");
    });
  });

  describe("rate limiting", () => {
    it("should return 429 when rate limit exceeded", async () => {
      // Send more than 100 requests to trigger rate limit
      const sessionId = "rate-limit-test-session-id-12";

      for (let i = 0; i < 101; i++) {
        const request = new NextRequest("http://localhost/api/analytics/event", {
          method: "POST",
          body: JSON.stringify({
            sessionId,
            pagePath: "/",
            eventCategory: "scroll",
            eventAction: "scroll_25",
          }),
        });

        const response = await POST(request);

        if (i === 100) {
          const data = await response.json();
          expect(response.status).toBe(429);
          expect(data.error).toBe("Rate limit exceeded");
        }
      }
    });
  });
});
