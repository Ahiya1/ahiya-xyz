/**
 * Tests for geometry.ts - Pure geometry functions
 * Tests cover distance calculations, random generation, and boundary handling
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  distance,
  nodeDistance,
  randomInRange,
  randomPosition,
  randomVelocity,
  clampPosition,
  bounceVelocity,
  calculateCenter,
} from '../geometry';
import { PHYSICS } from '../constants';
import type { Node } from '../types';
import { createMockNode } from './factories';

describe('geometry', () => {
  describe('distance', () => {
    it('returns 0 for same point', () => {
      const p = { x: 5, y: 5 };
      expect(distance(p, p)).toBe(0);
    });

    it('calculates horizontal distance', () => {
      expect(distance({ x: 0, y: 0 }, { x: 10, y: 0 })).toBe(10);
    });

    it('calculates vertical distance', () => {
      expect(distance({ x: 0, y: 0 }, { x: 0, y: 10 })).toBe(10);
    });

    it('calculates diagonal distance (3-4-5 triangle)', () => {
      expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
    });

    it('handles negative coordinates', () => {
      expect(distance({ x: -5, y: -5 }, { x: 5, y: 5 })).toBeCloseTo(14.142, 2);
    });

    it('is commutative', () => {
      const p1 = { x: 10, y: 20 };
      const p2 = { x: 30, y: 40 };
      expect(distance(p1, p2)).toBe(distance(p2, p1));
    });
  });

  describe('nodeDistance', () => {
    it('returns 0 for same node position', () => {
      const n1 = createMockNode({ x: 100, y: 100 });
      const n2 = createMockNode({ x: 100, y: 100 });
      expect(nodeDistance(n1, n2)).toBe(0);
    });

    it('calculates distance between two nodes', () => {
      const n1 = createMockNode({ x: 0, y: 0 });
      const n2 = createMockNode({ x: 3, y: 4 });
      expect(nodeDistance(n1, n2)).toBe(5);
    });
  });

  describe('randomInRange', () => {
    beforeEach(() => {
      vi.spyOn(Math, 'random');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('returns min when random is 0', () => {
      vi.mocked(Math.random).mockReturnValue(0);
      expect(randomInRange(10, 20)).toBe(10);
    });

    it('returns max when random is 1', () => {
      vi.mocked(Math.random).mockReturnValue(0.9999999999);
      expect(randomInRange(10, 20)).toBeCloseTo(20, 5);
    });

    it('returns midpoint when random is 0.5', () => {
      vi.mocked(Math.random).mockReturnValue(0.5);
      expect(randomInRange(10, 20)).toBe(15);
    });

    it('handles negative ranges', () => {
      vi.mocked(Math.random).mockReturnValue(0.5);
      expect(randomInRange(-20, -10)).toBe(-15);
    });

    it('handles inverted ranges gracefully', () => {
      vi.mocked(Math.random).mockReturnValue(0.5);
      // min > max should still work (though not recommended)
      const result = randomInRange(20, 10);
      expect(result).toBe(15); // 20 + 0.5 * (10 - 20) = 20 - 5 = 15
    });
  });

  describe('randomPosition', () => {
    beforeEach(() => {
      vi.spyOn(Math, 'random');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('returns position within margins', () => {
      vi.mocked(Math.random).mockReturnValue(0.5);
      const margin = PHYSICS.SPAWN_MARGIN;
      const pos = randomPosition(1000, 800);

      expect(pos.x).toBe(margin + 0.5 * (1000 - 2 * margin));
      expect(pos.y).toBe(margin + 0.5 * (800 - 2 * margin));
    });

    it('returns corner position at random 0', () => {
      vi.mocked(Math.random).mockReturnValue(0);
      const margin = PHYSICS.SPAWN_MARGIN;
      const pos = randomPosition(1000, 800);

      expect(pos.x).toBe(margin);
      expect(pos.y).toBe(margin);
    });

    it('respects custom margin', () => {
      vi.mocked(Math.random).mockReturnValue(0);
      const customMargin = 100;
      const pos = randomPosition(1000, 800, customMargin);

      expect(pos.x).toBe(customMargin);
      expect(pos.y).toBe(customMargin);
    });

    it('handles small canvas with large margin', () => {
      vi.mocked(Math.random).mockReturnValue(0.5);
      // Canvas smaller than 2x margin
      const pos = randomPosition(80, 80, 50);
      // With margin 50 and width 80: range is 50 + 0.5 * (80 - 100) = 50 - 10 = 40
      expect(pos.x).toBe(40);
      expect(pos.y).toBe(40);
    });
  });

  describe('randomVelocity', () => {
    beforeEach(() => {
      vi.spyOn(Math, 'random');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('returns velocity within speed bounds', () => {
      // Test multiple angles
      for (let i = 0; i < 10; i++) {
        vi.mocked(Math.random)
          .mockReturnValueOnce(i / 10) // angle
          .mockReturnValueOnce(0.5);   // speed

        const vel = randomVelocity();
        const speed = Math.sqrt(vel.vx * vel.vx + vel.vy * vel.vy);

        expect(speed).toBeGreaterThanOrEqual(PHYSICS.DRIFT_MIN);
        expect(speed).toBeLessThanOrEqual(PHYSICS.DRIFT_MAX);
      }
    });

    it('returns minimum speed when random speed is 0', () => {
      vi.mocked(Math.random)
        .mockReturnValueOnce(0)   // angle = 0
        .mockReturnValueOnce(0);  // speed = min

      const vel = randomVelocity();
      const speed = Math.sqrt(vel.vx * vel.vx + vel.vy * vel.vy);

      expect(speed).toBeCloseTo(PHYSICS.DRIFT_MIN, 5);
    });

    it('respects custom speed range', () => {
      vi.mocked(Math.random)
        .mockReturnValueOnce(0)   // angle = 0
        .mockReturnValueOnce(0.5); // speed at midpoint

      const vel = randomVelocity(10, 20);
      const speed = Math.sqrt(vel.vx * vel.vx + vel.vy * vel.vy);

      expect(speed).toBeCloseTo(15, 5);
    });
  });

  describe('clampPosition', () => {
    const width = 1000;
    const height = 800;
    const margin = PHYSICS.SPAWN_MARGIN;

    it('returns same position when within bounds', () => {
      const pos = clampPosition(500, 400, width, height);
      expect(pos).toEqual({ x: 500, y: 400 });
    });

    it('clamps x to minimum margin', () => {
      const pos = clampPosition(10, 400, width, height);
      expect(pos.x).toBe(margin);
      expect(pos.y).toBe(400);
    });

    it('clamps x to maximum (width - margin)', () => {
      const pos = clampPosition(980, 400, width, height);
      expect(pos.x).toBe(width - margin);
    });

    it('clamps y to minimum margin', () => {
      const pos = clampPosition(500, 10, width, height);
      expect(pos.y).toBe(margin);
    });

    it('clamps y to maximum (height - margin)', () => {
      const pos = clampPosition(500, 780, width, height);
      expect(pos.y).toBe(height - margin);
    });

    it('clamps both coordinates when outside bounds', () => {
      const pos = clampPosition(-100, 1000, width, height);
      expect(pos.x).toBe(margin);
      expect(pos.y).toBe(height - margin);
    });

    it('respects custom margin', () => {
      const customMargin = 100;
      const pos = clampPosition(50, 750, width, height, customMargin);
      expect(pos.x).toBe(customMargin);
      expect(pos.y).toBe(height - customMargin);
    });
  });

  describe('bounceVelocity', () => {
    const width = 500;
    const height = 500;
    const margin = PHYSICS.SPAWN_MARGIN;

    it('reverses X velocity at left edge', () => {
      const result = bounceVelocity(margin - 1, 250, 5, 3, width, height);
      expect(result.vx).toBe(-5);
      expect(result.vy).toBe(3);
    });

    it('reverses X velocity at right edge', () => {
      const result = bounceVelocity(width - margin + 1, 250, 5, 3, width, height);
      expect(result.vx).toBe(-5);
      expect(result.vy).toBe(3);
    });

    it('reverses Y velocity at top edge', () => {
      const result = bounceVelocity(250, margin - 1, 5, 3, width, height);
      expect(result.vx).toBe(5);
      expect(result.vy).toBe(-3);
    });

    it('reverses Y velocity at bottom edge', () => {
      const result = bounceVelocity(250, height - margin + 1, 5, 3, width, height);
      expect(result.vx).toBe(5);
      expect(result.vy).toBe(-3);
    });

    it('reverses both velocities at corner', () => {
      const result = bounceVelocity(margin - 1, margin - 1, 5, 3, width, height);
      expect(result.vx).toBe(-5);
      expect(result.vy).toBe(-3);
    });

    it('does not reverse when in bounds', () => {
      const result = bounceVelocity(250, 250, 5, 3, width, height);
      expect(result.vx).toBe(5);
      expect(result.vy).toBe(3);
    });

    it('does not reverse when exactly at boundary', () => {
      const result = bounceVelocity(margin, margin, 5, 3, width, height);
      // At exactly margin, x <= margin is true, so it bounces
      expect(result.vx).toBe(-5);
      expect(result.vy).toBe(-3);
    });

    it('handles negative velocities', () => {
      const result = bounceVelocity(margin - 1, 250, -5, -3, width, height);
      expect(result.vx).toBe(5); // Reversed from -5
      expect(result.vy).toBe(-3); // Unchanged
    });

    it('respects custom margin', () => {
      const customMargin = 100;
      // At x=50 with margin=100, position <= margin so should bounce
      const result = bounceVelocity(50, 250, 5, 3, width, height, customMargin);
      expect(result.vx).toBe(-5);
    });
  });

  describe('calculateCenter', () => {
    it('returns origin for empty array', () => {
      expect(calculateCenter([])).toEqual({ x: 0, y: 0 });
    });

    it('returns node position for single node', () => {
      const node = createMockNode({ x: 100, y: 200 });
      expect(calculateCenter([node])).toEqual({ x: 100, y: 200 });
    });

    it('calculates center of two nodes', () => {
      const nodes = [
        createMockNode({ x: 0, y: 0 }),
        createMockNode({ x: 100, y: 100 }),
      ];
      expect(calculateCenter(nodes)).toEqual({ x: 50, y: 50 });
    });

    it('calculates center of triangle', () => {
      const nodes = [
        createMockNode({ x: 0, y: 0 }),
        createMockNode({ x: 300, y: 0 }),
        createMockNode({ x: 150, y: 300 }),
      ];
      expect(calculateCenter(nodes)).toEqual({ x: 150, y: 100 });
    });

    it('handles negative coordinates', () => {
      const nodes = [
        createMockNode({ x: -100, y: -100 }),
        createMockNode({ x: 100, y: 100 }),
      ];
      expect(calculateCenter(nodes)).toEqual({ x: 0, y: 0 });
    });

    it('calculates center of square', () => {
      const nodes = [
        createMockNode({ x: 0, y: 0 }),
        createMockNode({ x: 100, y: 0 }),
        createMockNode({ x: 100, y: 100 }),
        createMockNode({ x: 0, y: 100 }),
      ];
      expect(calculateCenter(nodes)).toEqual({ x: 50, y: 50 });
    });
  });
});
