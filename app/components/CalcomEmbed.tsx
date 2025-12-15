"use client";

/**
 * CalcomEmbed Component
 *
 * Wraps the Cal.com embed with dark theme configuration,
 * purple brand color (#a855f7), and conversion tracking.
 *
 * Tracks the following conversion funnel events:
 * 1. calcom_embed_ready - Embed loaded (user saw booking widget)
 * 2. calcom_date_selected - User selected a date (mid-funnel)
 * 3. calcom_time_selected - User selected a time (mid-funnel)
 * 4. calcom_booking_complete - Booking completed (final conversion)
 *
 * Plan-17 Iteration-19
 *
 * Usage:
 * ```tsx
 * <CalcomEmbed />
 * <CalcomEmbed calLink="your-link/event-type" onBookingComplete={() => {}} />
 * ```
 *
 * Default calLink: "ahiya-butman-tigupi/discovery-call"
 */

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useCallback, useRef } from "react";

import { trackEvent, trackConversion } from "@/lib/tracking";

export interface CalcomEmbedProps {
  calLink?: string;
  /** Callback fired when booking is completed */
  onBookingComplete?: () => void;
}

export function CalcomEmbed({
  calLink = "ahiya-butman-tigupi/discovery-call",
  onBookingComplete,
}: CalcomEmbedProps) {
  const handleBookingComplete = useCallback(() => {
    onBookingComplete?.();
  }, [onBookingComplete]);

  // Track if we've already set up listeners (avoid duplicates)
  const listenersSetupRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate listener setup
    if (listenersSetupRef.current) return;

    (async function () {
      try {
        const cal = await getCalApi();

        // Configure UI
        cal("ui", {
          theme: "dark",
          styles: {
            branding: { brandColor: "#a855f7" },
          },
          hideEventTypeDetails: false,
        });

        // Only set up listeners once
        if (listenersSetupRef.current) return;
        listenersSetupRef.current = true;

        // Track embed ready (funnel step: saw booking widget)
        cal("on", {
          action: "linkReady",
          callback: () => {
            try {
              trackEvent("conversion", "calcom_embed_ready", "pricing_page");
            } catch {
              // Silently fail tracking
            }
          },
        });

        // Track booking success (final conversion)
        cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            try {
              trackConversion("calcom_booking_complete", {
                eventType: calLink,
              });
              handleBookingComplete();
            } catch {
              // Silently fail tracking, but still call callback
              handleBookingComplete();
            }
          },
        });

        // Track date selection (mid-funnel) - undocumented but stable
        // Use type assertion since this is an internal Cal.com event
        try {
          (cal as (method: string, config: { action: string; callback: () => void }) => void)("on", {
            action: "__dateSelected",
            callback: () => {
              try {
                trackEvent("conversion", "calcom_date_selected", "pricing_page");
              } catch {
                // Silently fail tracking
              }
            },
          });
        } catch {
          // Silently fail if undocumented event not available
        }

        // Track time selection (mid-funnel) - undocumented but stable
        // Use type assertion since this is an internal Cal.com event
        try {
          (cal as (method: string, config: { action: string; callback: () => void }) => void)("on", {
            action: "__timeSelected",
            callback: () => {
              try {
                trackEvent("conversion", "calcom_time_selected", "pricing_page");
              } catch {
                // Silently fail tracking
              }
            },
          });
        } catch {
          // Silently fail if undocumented event not available
        }
      } catch (error) {
        // Don't break the embed if tracking setup fails
        console.error("Failed to initialize Cal.com tracking:", error);
      }
    })();

    // Cleanup: reset ref on unmount so listeners can be set up again if remounted
    return () => {
      listenersSetupRef.current = false;
    };
  }, [calLink, handleBookingComplete]);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        theme: "dark",
      }}
    />
  );
}

export default CalcomEmbed;
