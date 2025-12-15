"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

type HoverEffect = "glow" | "lift" | "color" | "scale" | "blur-reveal";

interface HoverWordsProps {
  children: string;
  /** Effects to cycle through for each word */
  effects?: HoverEffect[];
  /** Base className for all words */
  className?: string;
}

interface EffectVariant {
  initial: TargetAndTransition;
  hover: TargetAndTransition;
}

const effectVariants: Record<HoverEffect, EffectVariant> = {
  glow: {
    initial: { textShadow: "0 0 0px rgba(168, 85, 247, 0)" },
    hover: {
      textShadow: "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)",
    },
  },
  lift: {
    initial: { y: 0 },
    hover: { y: -4 },
  },
  color: {
    initial: { color: "inherit" },
    hover: { color: "#a855f7" },
  },
  scale: {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  },
  "blur-reveal": {
    initial: { filter: "blur(0px)", opacity: 1 },
    hover: { filter: "blur(0px)", opacity: 1, scale: 1.02 },
  },
};

/**
 * HoverWords splits text into individual words with unique hover effects.
 * Each word gets a different effect from the effects array (cycles through).
 *
 * Usage:
 * ```tsx
 * <HoverWords effects={["glow", "lift", "color"]}>
 *   Intention. Clarity. Results.
 * </HoverWords>
 * ```
 */
export function HoverWords({
  children,
  effects = ["glow", "lift", "color"],
  className = "",
}: HoverWordsProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = children.split(/\s+/).filter(Boolean);

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, index) => {
        const effect = effects[index % effects.length];
        const variants = effectVariants[effect];

        return (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block cursor-default"
            initial={variants.initial}
            whileHover={variants.hover}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {word}
            {index < words.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </span>
  );
}

export default HoverWords;
