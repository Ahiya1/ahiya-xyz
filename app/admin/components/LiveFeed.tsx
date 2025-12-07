"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Clock,
  Link as LinkIcon,
  Search,
  Share2,
  ExternalLink,
} from "lucide-react";
import { EmptyState } from "./EmptyState";

export interface LiveVisit {
  id: number;
  path: string;
  deviceType: string;
  browser: string | null;
  country: string | null;
  city: string | null;
  referrer: string | null;
  createdAt: string;
}

interface LiveFeedProps {
  visits: LiveVisit[];
}

/**
 * Determines the referrer type and returns color scheme
 */
function getReferrerInfo(referrer: string | null): {
  type: "direct" | "search" | "social" | "referral";
  label: string;
  className: string;
  icon: typeof Globe;
} {
  if (!referrer || referrer === "") {
    return {
      type: "direct",
      label: "Direct",
      className: "bg-slate-500/20 text-slate-300 border-slate-500/30",
      icon: Globe,
    };
  }

  const lowerRef = referrer.toLowerCase();

  // Search engines
  if (
    lowerRef.includes("google.") ||
    lowerRef.includes("bing.") ||
    lowerRef.includes("yahoo.") ||
    lowerRef.includes("duckduckgo.") ||
    lowerRef.includes("baidu.")
  ) {
    return {
      type: "search",
      label: "Search",
      className: "bg-green-500/20 text-green-300 border-green-500/30",
      icon: Search,
    };
  }

  // Social media
  if (
    lowerRef.includes("linkedin.") ||
    lowerRef.includes("twitter.") ||
    lowerRef.includes("x.com") ||
    lowerRef.includes("facebook.") ||
    lowerRef.includes("instagram.") ||
    lowerRef.includes("youtube.") ||
    lowerRef.includes("tiktok.") ||
    lowerRef.includes("reddit.")
  ) {
    return {
      type: "social",
      label: "Social",
      className: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      icon: Share2,
    };
  }

  // Referral (any other external link)
  return {
    type: "referral",
    label: "Referral",
    className: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    icon: ExternalLink,
  };
}

/**
 * Returns the appropriate device icon
 */
function getDeviceIcon(deviceType: string) {
  switch (deviceType.toLowerCase()) {
    case "mobile":
      return Smartphone;
    case "tablet":
      return Tablet;
    default:
      return Monitor;
  }
}

/**
 * Formats the timestamp to a human-readable relative time
 */
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);

  if (diffSeconds < 60) {
    return "Just now";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }
}

/**
 * Formats location string from country and city
 */
function formatLocation(country: string | null, city: string | null): string {
  if (city && country) {
    return `${city}, ${country}`;
  } else if (country) {
    return country;
  } else if (city) {
    return city;
  }
  return "Unknown";
}

/**
 * LiveFeed component showing real-time visitor activity
 * Displays last 30 minutes of activity with animated entries
 */
export function LiveFeed({ visits }: LiveFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevVisitsCountRef = useRef(visits.length);

  // Auto-scroll to top when new visits arrive
  useEffect(() => {
    if (visits.length > prevVisitsCountRef.current && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    prevVisitsCountRef.current = visits.length;
  }, [visits.length]);

  if (visits.length === 0) {
    return (
      <div className="contemplative-card">
        <EmptyState
          icon={Clock}
          title="No recent activity"
          description="No visits recorded in the last 30 minutes. Activity will appear here as visitors browse your site."
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="contemplative-card overflow-hidden max-h-[calc(100vh-280px)] overflow-y-auto"
    >
      <div className="divide-y divide-white/5">
        <AnimatePresence initial={false}>
          {visits.map((visit, index) => {
            const DeviceIcon = getDeviceIcon(visit.deviceType);
            const referrerInfo = getReferrerInfo(visit.referrer);
            const ReferrerIcon = referrerInfo.icon;
            const location = formatLocation(visit.country, visit.city);
            const timeAgo = formatRelativeTime(visit.createdAt);

            return (
              <motion.div
                key={visit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: 0.3,
                  delay: index === 0 ? 0 : 0,
                }}
                className="p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left section: Path and details */}
                  <div className="flex-1 min-w-0">
                    {/* Path */}
                    <div className="flex items-center gap-2 mb-2">
                      <LinkIcon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span className="text-white font-medium truncate">
                        {visit.path}
                      </span>
                    </div>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      {/* Device */}
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <DeviceIcon className="w-4 h-4" />
                        <span className="capitalize">{visit.deviceType}</span>
                        {visit.browser && (
                          <span className="text-slate-500">
                            ({visit.browser})
                          </span>
                        )}
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Globe className="w-4 h-4" />
                        <span>{location}</span>
                      </div>

                      {/* Referrer badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs border ${referrerInfo.className}`}
                      >
                        <ReferrerIcon className="w-3 h-3" />
                        <span>{referrerInfo.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right section: Timestamp */}
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm flex-shrink-0">
                    <Clock className="w-4 h-4" />
                    <span>{timeAgo}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
