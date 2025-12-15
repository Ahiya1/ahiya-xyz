"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

/**
 * CalcomEmbed Component
 *
 * Wraps the Cal.com embed with dark theme configuration and
 * purple brand color (#a855f7) to match the site aesthetic.
 *
 * Usage:
 * ```tsx
 * <CalcomEmbed />
 * <CalcomEmbed calLink="your-link/event-type" />
 * ```
 *
 * Default calLink: "ahiya-butman-tigupi/discovery-call"
 */
interface CalcomEmbedProps {
  calLink?: string;
}

export function CalcomEmbed({
  calLink = "ahiya-butman-tigupi/discovery-call",
}: CalcomEmbedProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#a855f7" },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

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
