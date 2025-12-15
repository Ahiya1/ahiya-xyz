import { describe, it, expect } from "vitest";
import {
  easeOutCubic,
  easeInOutSine,
  easeOutQuad,
  easeOutExpo,
  lerp,
  clamp,
  normalize,
} from "../easing";

describe("easing", () => {
  describe("easeOutCubic", () => {
    it("returns 0 at start (t=0)", () => {
      expect(easeOutCubic(0)).toBe(0);
    });

    it("returns 1 at end (t=1)", () => {
      expect(easeOutCubic(1)).toBe(1);
    });

    it("returns ~0.875 at midpoint (t=0.5)", () => {
      expect(easeOutCubic(0.5)).toBeCloseTo(0.875, 3);
    });

    it("is monotonically increasing", () => {
      let prev = -1;
      for (let t = 0; t <= 1; t += 0.1) {
        const current = easeOutCubic(t);
        expect(current).toBeGreaterThanOrEqual(prev);
        prev = current;
      }
    });

    it("handles values close to 0", () => {
      expect(easeOutCubic(0.001)).toBeCloseTo(0.003, 5);
    });

    it("handles values close to 1", () => {
      expect(easeOutCubic(0.999)).toBeCloseTo(1, 5);
    });
  });

  describe("easeInOutSine", () => {
    it("returns ~0 at start (t=0)", () => {
      expect(easeInOutSine(0)).toBeCloseTo(0, 10);
    });

    it("returns ~1 at end (t=1)", () => {
      expect(easeInOutSine(1)).toBeCloseTo(1, 10);
    });

    it("returns 0.5 at midpoint (t=0.5)", () => {
      expect(easeInOutSine(0.5)).toBeCloseTo(0.5, 10);
    });

    it("is symmetric around 0.5", () => {
      // easeInOutSine(0.25) + easeInOutSine(0.75) should equal 1
      const firstQuarter = easeInOutSine(0.25);
      const thirdQuarter = easeInOutSine(0.75);
      expect(firstQuarter + thirdQuarter).toBeCloseTo(1, 10);
    });

    it("is monotonically increasing", () => {
      let prev = -1;
      for (let t = 0; t <= 1; t += 0.1) {
        const current = easeInOutSine(t);
        expect(current).toBeGreaterThanOrEqual(prev);
        prev = current;
      }
    });
  });

  describe("easeOutQuad", () => {
    it("returns 0 at start (t=0)", () => {
      expect(easeOutQuad(0)).toBe(0);
    });

    it("returns 1 at end (t=1)", () => {
      expect(easeOutQuad(1)).toBe(1);
    });

    it("returns 0.75 at midpoint (t=0.5)", () => {
      expect(easeOutQuad(0.5)).toBeCloseTo(0.75, 10);
    });

    it("is softer than easeOutCubic at midpoint", () => {
      // easeOutQuad should have lower value than easeOutCubic at midpoint
      expect(easeOutQuad(0.5)).toBeLessThan(easeOutCubic(0.5));
    });
  });

  describe("easeOutExpo", () => {
    it("returns ~0 at start (t=0)", () => {
      expect(easeOutExpo(0)).toBeCloseTo(0, 5);
    });

    it("returns 1 at end (t=1)", () => {
      expect(easeOutExpo(1)).toBe(1);
    });

    it("decelerates rapidly at the start", () => {
      // At t=0.1, easeOutExpo should already be >= 0.5
      // This demonstrates the sharp initial deceleration
      expect(easeOutExpo(0.1)).toBeGreaterThanOrEqual(0.5);
      // At t=0.2, it should be significantly higher
      expect(easeOutExpo(0.2)).toBeGreaterThan(0.7);
    });

    it("is monotonically increasing", () => {
      let prev = -1;
      for (let t = 0; t <= 1; t += 0.1) {
        const current = easeOutExpo(t);
        expect(current).toBeGreaterThanOrEqual(prev);
        prev = current;
      }
    });
  });

  describe("lerp", () => {
    it("returns start value at t=0", () => {
      expect(lerp(10, 20, 0)).toBe(10);
    });

    it("returns end value at t=1", () => {
      expect(lerp(10, 20, 1)).toBe(20);
    });

    it("returns midpoint at t=0.5", () => {
      expect(lerp(10, 20, 0.5)).toBe(15);
    });

    it("handles negative values", () => {
      expect(lerp(-10, 10, 0.5)).toBe(0);
    });

    it("handles reverse interpolation (a > b)", () => {
      expect(lerp(20, 10, 0.5)).toBe(15);
    });

    it("extrapolates beyond 0-1 range", () => {
      expect(lerp(0, 10, 2)).toBe(20);
      expect(lerp(0, 10, -1)).toBe(-10);
    });

    it("handles same start and end values", () => {
      expect(lerp(5, 5, 0.5)).toBe(5);
    });

    it("handles floating point values correctly", () => {
      expect(lerp(0, 1, 0.25)).toBeCloseTo(0.25, 10);
      expect(lerp(0, 1, 0.75)).toBeCloseTo(0.75, 10);
    });
  });

  describe("clamp", () => {
    it("returns value when within bounds", () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it("returns min when value is below", () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it("returns max when value is above", () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it("returns value when equal to min", () => {
      expect(clamp(0, 0, 10)).toBe(0);
    });

    it("returns value when equal to max", () => {
      expect(clamp(10, 0, 10)).toBe(10);
    });

    it("handles equal min and max", () => {
      expect(clamp(5, 10, 10)).toBe(10);
      expect(clamp(15, 10, 10)).toBe(10);
    });

    it("handles negative bounds", () => {
      expect(clamp(0, -10, -5)).toBe(-5);
      expect(clamp(-15, -10, -5)).toBe(-10);
      expect(clamp(-7, -10, -5)).toBe(-7);
    });

    it("handles floating point values", () => {
      expect(clamp(0.5, 0, 1)).toBe(0.5);
      expect(clamp(1.5, 0, 1)).toBe(1);
    });
  });

  describe("normalize", () => {
    it("returns 0 at min value", () => {
      expect(normalize(0, 0, 100)).toBe(0);
    });

    it("returns 1 at max value", () => {
      expect(normalize(100, 0, 100)).toBe(1);
    });

    it("returns 0.5 at midpoint", () => {
      expect(normalize(50, 0, 100)).toBe(0.5);
    });

    it("clamps values below min to 0", () => {
      expect(normalize(-10, 0, 100)).toBe(0);
    });

    it("clamps values above max to 1", () => {
      expect(normalize(110, 0, 100)).toBe(1);
    });

    it("returns 0 when min equals max", () => {
      expect(normalize(5, 10, 10)).toBe(0);
      expect(normalize(10, 10, 10)).toBe(0);
      expect(normalize(15, 10, 10)).toBe(0);
    });

    it("handles negative ranges", () => {
      expect(normalize(-50, -100, 0)).toBe(0.5);
      expect(normalize(-100, -100, 0)).toBe(0);
      expect(normalize(0, -100, 0)).toBe(1);
    });

    it("handles floating point values", () => {
      expect(normalize(0.25, 0, 1)).toBeCloseTo(0.25, 10);
      expect(normalize(0.75, 0, 1)).toBeCloseTo(0.75, 10);
    });

    it("handles reverse ranges correctly when clamped", () => {
      // When min > max, this is an edge case
      // The function divides by (max - min) which would be negative
      // But the clamp ensures output is 0-1
      const result = normalize(50, 100, 0);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
    });
  });
});
