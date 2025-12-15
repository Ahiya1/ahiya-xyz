"use client";

import { motion } from "framer-motion";
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
 * Intention: Focused energy - subtle scale + brightness
 * Conveys concentration and deliberate focus
 */
function IntentionWord({ word }: { word: string }) {
  return (
    <motion.span
      className="inline-block cursor-default"
      style={{ filter: "brightness(1)" }}
      whileHover={{
        scale: 1.05,
        filter: "brightness(1.2)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {word}
    </motion.span>
  );
}

/**
 * Clarity: Sharp and clear - crisp scale with subtle lift
 * Conveys precision and sharpness
 */
function ClarityWord({ word }: { word: string }) {
  return (
    <motion.span
      className="inline-block cursor-default"
      whileHover={{
        scale: 1.03,
        y: -2,
        filter: "contrast(1.1) brightness(1.1)",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {word}
    </motion.span>
  );
}

/**
 * Results: Achievement - underline draws in from left
 * Conveys completion and accomplishment
 */
function ResultsWord({ word }: { word: string }) {
  return (
    <motion.span
      className="inline-block cursor-default relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {word}
      {/* Underline that draws in on hover */}
      <span
        className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-purple-400 to-pink-400 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
      />
    </motion.span>
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
 * - Intention: Brightens + scales (focusing energy)
 * - Clarity: Lifts + sharpens (precision)
 * - Results: Underline draws in (achievement)
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
