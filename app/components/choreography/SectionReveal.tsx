"use client";

import { motion, type Variants, useInView } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { springPresets } from "@/lib/animation-utils";

export type SectionRevealVariant = "fade" | "fan-in" | "cascade" | "scale-glow";

interface SectionRevealProps {
  children: ReactNode;
  /** Animation variant (default: "fade") */
  variant?: SectionRevealVariant;
  /** Additional className */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
}

// Container variants for orchestration
const containerVariants: Record<SectionRevealVariant, Variants> = {
  fade: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  },
  "fan-in": {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
  cascade: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.05 },
    },
  },
  "scale-glow": {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  },
};

// Item variants factory
function getItemVariants(
  variant: SectionRevealVariant,
  index: number,
  totalItems: number
): Variants {
  switch (variant) {
    case "fan-in":
      // Top row comes from above, bottom row from below
      const isTopRow =
        totalItems > 2 ? index < Math.ceil(totalItems / 2) : index === 0;
      return {
        hidden: {
          opacity: 0,
          y: isTopRow ? -30 : 30,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", ...springPresets.gentle },
        },
      };

    case "cascade":
      return {
        hidden: { opacity: 0, y: 20, x: -10 },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { type: "spring", ...springPresets.gentle },
        },
      };

    case "scale-glow":
      return {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { type: "spring", ...springPresets.snappy },
        },
      };

    case "fade":
    default:
      return {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      };
  }
}

/**
 * SectionReveal orchestrates scroll-triggered animations for section content.
 *
 * Usage:
 * ```tsx
 * <SectionReveal variant="fan-in">
 *   {cards.map((card, index) => (
 *     <SectionReveal.Item key={card.id} index={index} totalItems={4}>
 *       <Card />
 *     </SectionReveal.Item>
 *   ))}
 * </SectionReveal>
 * ```
 */
export function SectionReveal({
  children,
  variant = "fade",
  className = "",
  style,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion is preferred, render without animation
  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={containerVariants[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// Sub-component for individual items
interface SectionRevealItemProps {
  children: ReactNode;
  /** Item index for animation calculation */
  index?: number;
  /** Total count of items (for fan-in variant) */
  totalItems?: number;
  /** Animation variant (should match parent) */
  variant?: SectionRevealVariant;
  /** Additional className */
  className?: string;
}

function SectionRevealItem({
  children,
  index = 0,
  totalItems = 1,
  variant = "fade",
  className = "",
}: SectionRevealItemProps) {
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion is preferred, render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={getItemVariants(variant, index, totalItems)}
    >
      {children}
    </motion.div>
  );
}

SectionReveal.Item = SectionRevealItem;

export default SectionReveal;
