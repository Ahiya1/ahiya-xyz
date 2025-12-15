/**
 * Event Types
 * TypeScript types for the behavioral event tracking system
 * Plan-17 Iteration-18
 */

/**
 * Valid event categories for tracking
 */
export type EventCategory = "scroll" | "click" | "engagement" | "conversion";

/**
 * Event payload for tracking
 * Sent from client to API
 */
export interface EventPayload {
  sessionId: string;
  visitorHash?: string;
  pagePath: string;
  eventCategory: EventCategory;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Batch request to event API
 */
export interface EventBatchRequest {
  events: EventPayload[];
}

/**
 * Event API success response
 */
export interface EventSuccessResponse {
  success: true;
  count: number;
}

/**
 * Event API error response
 */
export interface EventErrorResponse {
  error: string;
}

/**
 * Combined API response type
 */
export type EventApiResponse = EventSuccessResponse | EventErrorResponse;
