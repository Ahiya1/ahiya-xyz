"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

type HoverEffect = "intention" | "clarity" | "results";

interface HoverWordsProps {
  children: string;
  /** Effects to apply to each word (in order) */
  effects?: HoverEffect[];
  /** Base className for all words */
  className?: string;
}

/**
 * Intention: Focused, intensifying glow - like concentrating energy
 */
function IntentionWord({ word }: { word: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className="inline-block cursor-default relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        textShadow: isHovered
          ? "0 0 30px rgba(168, 85, 247, 0.9), 0 0 60px rgba(168, 85, 247, 0.5), 0 0 90px rgba(168, 85, 247, 0.3)"
          : "0 0 0px rgba(168, 85, 247, 0)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {word}
    </motion.span>
  );
}

/**
 * Clarity: Blur-to-sharp effect - like a lens focusing
 */
function ClarityWord({ word }: { word: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className="inline-block cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        filter: isHovered ? "blur(0px)" : "blur(0px)",
        textShadow: isHovered
          ? "0 0 1px rgba(255, 255, 255, 0.9), 0 0 2px rgba(255, 255, 255, 0.5)"
          : "0 0 0px rgba(255, 255, 255, 0)",
        letterSpacing: isHovered ? "0.02em" : "0em",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {word}
    </motion.span>
  );
}

/**
 * Results: Underline draws in - like achievement/completion
 */
function ResultsWord({ word }: { word: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="inline-block cursor-default relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {word}
      <motion.span
        className="absolute bottom-[0.1em] left-0 right-0 h-[0.08em] bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </span>
  );
}

const wordComponents: Record<HoverEffect, React.FC<{ word: string }>> = {
  intention: IntentionWord,
  clarity: ClarityWord,
  results: ResultsWord,
};

/**
 * HoverWords splits text into individual words with semantic hover effects.
 * Each effect is designed to match the meaning of the word.
 *
 * Usage:
 * ```tsx
 * <HoverWords effects={["intention", "clarity", "results"]}>
 *   Intention. Clarity. Results.
 * </HoverWords>
 * ```
 */
export function HoverWords({
  children,
  effects = ["intention", "clarity", "results"],
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
        const WordComponent = wordComponents[effect];

        return (
          <span key={`${word}-${index}`}>
            <WordComponent word={word} />
            {index < words.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </span>
  );
}

export default HoverWords;
