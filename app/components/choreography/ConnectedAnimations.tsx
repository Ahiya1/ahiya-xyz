"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface ConnectedAnimationsContextValue {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const ConnectedAnimationsContext =
  createContext<ConnectedAnimationsContextValue | null>(null);

interface ConnectedAnimationsProviderProps {
  children: ReactNode;
}

/**
 * ConnectedAnimationsProvider enables group awareness for sibling elements.
 * When one element is hovered, siblings can respond.
 *
 * Usage:
 * ```tsx
 * <ConnectedAnimationsProvider>
 *   {cards.map((card, index) => (
 *     <ConnectedCard key={card.id} index={index}>
 *       <Card />
 *     </ConnectedCard>
 *   ))}
 * </ConnectedAnimationsProvider>
 * ```
 */
export function ConnectedAnimationsProvider({
  children,
}: ConnectedAnimationsProviderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ConnectedAnimationsContext.Provider value={{ hoveredIndex, setHoveredIndex }}>
      {children}
    </ConnectedAnimationsContext.Provider>
  );
}

/**
 * Hook to access connected animations context
 * @throws Error if used outside ConnectedAnimationsProvider
 */
export function useConnectedAnimations() {
  const context = useContext(ConnectedAnimationsContext);
  if (!context) {
    throw new Error(
      "useConnectedAnimations must be used within ConnectedAnimationsProvider"
    );
  }
  return context;
}

interface ConnectedCardProps {
  children: ReactNode;
  /** Index of this card in the group */
  index: number;
  /** Additional className */
  className?: string;
  /** Opacity when another card is hovered (default: 0.7) */
  recededOpacity?: number;
  /** Scale when another card is hovered (default: 0.98) */
  recededScale?: number;
}

/**
 * ConnectedCard responds to sibling hover states.
 * When a sibling is hovered, this card recedes (opacity + scale).
 */
export function ConnectedCard({
  children,
  index,
  className = "",
  recededOpacity = 0.7,
  recededScale = 0.98,
}: ConnectedCardProps) {
  const { hoveredIndex, setHoveredIndex } = useConnectedAnimations();
  const prefersReducedMotion = useReducedMotion();

  const isHovered = hoveredIndex === index;
  const isReceded = hoveredIndex !== null && !isHovered;

  const handleMouseEnter = useCallback(() => {
    setHoveredIndex(index);
  }, [index, setHoveredIndex]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, [setHoveredIndex]);

  // If reduced motion is preferred, disable the receding animation
  const recededStyles = prefersReducedMotion
    ? {}
    : {
        opacity: isReceded ? recededOpacity : 1,
        transform: isReceded ? `scale(${recededScale})` : "scale(1)",
      };

  return (
    <div
      className={`transition-all duration-300 ${className}`}
      style={recededStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default ConnectedAnimationsProvider;
