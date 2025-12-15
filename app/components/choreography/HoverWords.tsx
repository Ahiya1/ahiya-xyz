"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface HoverWordsProps {
  children: string;
  className?: string;
}

/**
 * HoverWords - Sleek, sophisticated hover effects matching each word's meaning.
 * Premium motion design - subtle but undeniable.
 *
 * - Intention: Letter spacing expands (purpose spreading outward)
 * - Clarity: Lifts with refined precision (rising insight)
 * - Results: Confident settle with underline reveal (delivered)
 */
export function HoverWords({ children, className = "" }: HoverWordsProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = children.split(/\s+/).filter(Boolean);

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className="inline-flex items-baseline gap-[0.3em]">
      {words.map((word, index) => (
        <span key={index} className="inline-block relative">
          {index === 0 && (
            // Intention - letter spacing expands (purpose radiating outward)
            <motion.span
              className={`inline-block cursor-default ${className}`}
              initial={{ letterSpacing: "0em" }}
              whileHover={{ letterSpacing: "0.08em" }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {word}
            </motion.span>
          )}
          {index === 1 && (
            // Clarity - snaps into focus (precision, demands attention)
            <motion.span
              className={`inline-block cursor-default ${className}`}
              initial={{ letterSpacing: "0.02em" }}
              whileHover={{
                scale: 1.06,
                letterSpacing: "-0.02em",
              }}
              transition={{
                type: "spring",
                stiffness: 600,
                damping: 20,
              }}
            >
              {word}
            </motion.span>
          )}
          {index === 2 && (
            // Results - confident with underline reveal
            <motion.span
              className={`inline-block cursor-default relative ${className}`}
              whileHover="hover"
              initial="rest"
            >
              <motion.span
                className={`inline-block ${className}`}
                variants={{
                  rest: { y: 0 },
                  hover: { y: -2 },
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {word}
              </motion.span>
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-400 to-pink-400"
                variants={{
                  rest: { width: "0%" },
                  hover: { width: "100%" },
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}

export default HoverWords;
