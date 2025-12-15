"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface HoverWordsProps {
  children: string;
  className?: string;
}

/**
 * HoverWords - Each word has a unique hover effect matching its meaning.
 *
 * - Intention: Glows brighter (focusing energy)
 * - Clarity: Slight lift (rising above)
 * - Results: Underline appears (completion)
 */
export function HoverWords({ children, className = "" }: HoverWordsProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = children.split(/\s+/).filter(Boolean);

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={index} className="inline-block">
          {index === 0 && (
            // Intention - scale up on hover
            <motion.span
              className="inline-block cursor-default"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2 }}
            >
              {word}
            </motion.span>
          )}
          {index === 1 && (
            // Clarity - lift up on hover
            <motion.span
              className="inline-block cursor-default"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {word}
            </motion.span>
          )}
          {index === 2 && (
            // Results - underline on hover
            <span className="inline-block cursor-default relative group">
              <span>{word}</span>
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-purple-400 to-pink-400 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </span>
          )}
          {index < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

export default HoverWords;
