import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  ConnectedAnimationsProvider,
  ConnectedCard,
  useConnectedAnimations,
} from "./ConnectedAnimations";

// Mock useReducedMotion
vi.mock("@/app/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn().mockReturnValue(false),
}));

import { useReducedMotion } from "@/app/hooks/useReducedMotion";

// Test component to access context
function TestConsumer() {
  const { hoveredIndex, setHoveredIndex } = useConnectedAnimations();
  return (
    <div>
      <span data-testid="hovered-index">
        {hoveredIndex === null ? "null" : hoveredIndex}
      </span>
      <button onClick={() => setHoveredIndex(5)}>Set to 5</button>
      <button onClick={() => setHoveredIndex(null)}>Clear</button>
    </div>
  );
}

describe("ConnectedAnimations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("ConnectedAnimationsProvider", () => {
    it("should render children", () => {
      render(
        <ConnectedAnimationsProvider>
          <div>Test Content</div>
        </ConnectedAnimationsProvider>
      );

      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should provide context with null hovered index initially", () => {
      render(
        <ConnectedAnimationsProvider>
          <TestConsumer />
        </ConnectedAnimationsProvider>
      );

      expect(screen.getByTestId("hovered-index")).toHaveTextContent("null");
    });

    it("should allow setting hovered index", () => {
      render(
        <ConnectedAnimationsProvider>
          <TestConsumer />
        </ConnectedAnimationsProvider>
      );

      fireEvent.click(screen.getByText("Set to 5"));

      expect(screen.getByTestId("hovered-index")).toHaveTextContent("5");
    });

    it("should allow clearing hovered index", () => {
      render(
        <ConnectedAnimationsProvider>
          <TestConsumer />
        </ConnectedAnimationsProvider>
      );

      fireEvent.click(screen.getByText("Set to 5"));
      expect(screen.getByTestId("hovered-index")).toHaveTextContent("5");

      fireEvent.click(screen.getByText("Clear"));
      expect(screen.getByTestId("hovered-index")).toHaveTextContent("null");
    });
  });

  describe("useConnectedAnimations", () => {
    it("should throw error when used outside provider", () => {
      // Suppress console.error for this test
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        render(<TestConsumer />);
      }).toThrow(
        "useConnectedAnimations must be used within ConnectedAnimationsProvider"
      );

      consoleSpy.mockRestore();
    });
  });

  describe("ConnectedCard", () => {
    it("should render children", () => {
      render(
        <ConnectedAnimationsProvider>
          <ConnectedCard index={0}>
            <div>Card Content</div>
          </ConnectedCard>
        </ConnectedAnimationsProvider>
      );

      expect(screen.getByText("Card Content")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <ConnectedAnimationsProvider>
          <ConnectedCard index={0} className="custom-card">
            <div>Card Content</div>
          </ConnectedCard>
        </ConnectedAnimationsProvider>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("custom-card");
    });

    it("should set hovered index on mouse enter", () => {
      render(
        <ConnectedAnimationsProvider>
          <ConnectedCard index={2}>
            <div>Card 2</div>
          </ConnectedCard>
          <TestConsumer />
        </ConnectedAnimationsProvider>
      );

      fireEvent.mouseEnter(screen.getByText("Card 2").parentElement!);

      expect(screen.getByTestId("hovered-index")).toHaveTextContent("2");
    });

    it("should clear hovered index on mouse leave", () => {
      render(
        <ConnectedAnimationsProvider>
          <ConnectedCard index={2}>
            <div>Card 2</div>
          </ConnectedCard>
          <TestConsumer />
        </ConnectedAnimationsProvider>
      );

      const card = screen.getByText("Card 2").parentElement!;

      fireEvent.mouseEnter(card);
      expect(screen.getByTestId("hovered-index")).toHaveTextContent("2");

      fireEvent.mouseLeave(card);
      expect(screen.getByTestId("hovered-index")).toHaveTextContent("null");
    });

    it("should apply receded styles when sibling is hovered", () => {
      const { container } = render(
        <ConnectedAnimationsProvider>
          <ConnectedCard index={0}>
            <div>Card 0</div>
          </ConnectedCard>
          <ConnectedCard index={1}>
            <div>Card 1</div>
          </ConnectedCard>
        </ConnectedAnimationsProvider>
      );

      const cards = container.querySelectorAll(".transition-all");
      const card0 = cards[0] as HTMLElement;
      const card1 = cards[1] as HTMLElement;

      // Hover over card 1
      fireEvent.mouseEnter(card1);

      // Card 0 should have receded styles
      expect(card0.style.opacity).toBe("0.7");
      expect(card0.style.transform).toBe("scale(0.98)");

      // Card 1 (hovered) should not have receded styles
      expect(card1.style.opacity).toBe("1");
      expect(card1.style.transform).toBe("scale(1)");
    });

    it("should use custom receded opacity and scale", () => {
      const { container } = render(
        <ConnectedAnimationsProvider>
          <ConnectedCard index={0} recededOpacity={0.5} recededScale={0.95}>
            <div>Card 0</div>
          </ConnectedCard>
          <ConnectedCard index={1}>
            <div>Card 1</div>
          </ConnectedCard>
        </ConnectedAnimationsProvider>
      );

      const cards = container.querySelectorAll(".transition-all");
      const card0 = cards[0] as HTMLElement;
      const card1 = cards[1] as HTMLElement;

      // Hover over card 1
      fireEvent.mouseEnter(card1);

      // Card 0 should have custom receded styles
      expect(card0.style.opacity).toBe("0.5");
      expect(card0.style.transform).toBe("scale(0.95)");
    });

    it("should disable receded animation when reduced motion is preferred", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      const { container } = render(
        <ConnectedAnimationsProvider>
          <ConnectedCard index={0}>
            <div>Card 0</div>
          </ConnectedCard>
          <ConnectedCard index={1}>
            <div>Card 1</div>
          </ConnectedCard>
        </ConnectedAnimationsProvider>
      );

      const cards = container.querySelectorAll(".transition-all");
      const card0 = cards[0] as HTMLElement;
      const card1 = cards[1] as HTMLElement;

      // Hover over card 1
      fireEvent.mouseEnter(card1);

      // Card 0 should NOT have receded styles when reduced motion is on
      expect(card0.style.opacity).toBe("");
      expect(card0.style.transform).toBe("");
    });

    it("should have transition class for smooth animation", () => {
      const { container } = render(
        <ConnectedAnimationsProvider>
          <ConnectedCard index={0}>
            <div>Card Content</div>
          </ConnectedCard>
        </ConnectedAnimationsProvider>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("transition-all");
      expect(card.className).toContain("duration-300");
    });
  });

  describe("multiple cards interaction", () => {
    it("should only have one card hovered at a time", () => {
      const { container } = render(
        <ConnectedAnimationsProvider>
          <ConnectedCard index={0}>
            <div>Card 0</div>
          </ConnectedCard>
          <ConnectedCard index={1}>
            <div>Card 1</div>
          </ConnectedCard>
          <ConnectedCard index={2}>
            <div>Card 2</div>
          </ConnectedCard>
          <TestConsumer />
        </ConnectedAnimationsProvider>
      );

      const cards = container.querySelectorAll(".transition-all");

      fireEvent.mouseEnter(cards[0]);
      expect(screen.getByTestId("hovered-index")).toHaveTextContent("0");

      fireEvent.mouseEnter(cards[2]);
      expect(screen.getByTestId("hovered-index")).toHaveTextContent("2");

      fireEvent.mouseLeave(cards[2]);
      expect(screen.getByTestId("hovered-index")).toHaveTextContent("null");
    });
  });
});
