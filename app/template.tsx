"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
}

/**
 * Template wraps page content for transitions.
 * Uses AnimatePresence to animate between routes.
 *
 * Note: template.tsx re-renders on every route change,
 * unlike layout.tsx which persists.
 */
export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  // Skip transitions for admin routes to avoid dashboard disruption
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
