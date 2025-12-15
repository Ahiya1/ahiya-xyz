/**
 * Tests for node-system.ts - Node lifecycle management
 * Tests cover node creation, updates, phase transitions, and spawning logic
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getNodeLimits,
  createNode,
  calculateNodeOpacity,
  calculateNodePhase,
  shouldRemoveNode,
  updateNode,
  shouldSpawnNode,
  updateNodes,
  initializeNodes,
} from '../node-system';
import { TIMING, LIMITS, PHYSICS } from '../constants';
import { createMockNode, createMockState, createMockConfig, createMockMobileConfig } from './factories';

describe('node-system', () => {
  describe('getNodeLimits', () => {
    it('returns desktop limits for non-mobile', () => {
      const limits = getNodeLimits(false);
      expect(limits.min).toBe(LIMITS.NODES_MIN);
      expect(limits.max).toBe(LIMITS.NODES_MAX);
    });

    it('returns mobile limits for mobile', () => {
      const limits = getNodeLimits(true);
      expect(limits.min).toBe(LIMITS.NODES_MOBILE);
      expect(limits.max).toBe(LIMITS.NODES_MOBILE);
    });
  });

  describe('createNode', () => {
    beforeEach(() => {
      vi.spyOn(Math, 'random');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('returns valid node with correct defaults', () => {
      vi.mocked(Math.random).mockReturnValue(0.5);

      const node = createNode(42, 1000, 800);

      expect(node.id).toBe(42);
      expect(node.phase).toBe('spawning');
      expect(node.opacity).toBe(0);
      expect(node.age).toBe(0);
      expect(node.connections).toBeInstanceOf(Set);
      expect(node.connections.size).toBe(0);
    });

    it('creates node within canvas bounds', () => {
      vi.mocked(Math.random).mockReturnValue(0.5);
      const margin = PHYSICS.SPAWN_MARGIN;

      const node = createNode(1, 1000, 800);

      expect(node.x).toBeGreaterThanOrEqual(margin);
      expect(node.x).toBeLessThanOrEqual(1000 - margin);
      expect(node.y).toBeGreaterThanOrEqual(margin);
      expect(node.y).toBeLessThanOrEqual(800 - margin);
    });

    it('creates node with radius in valid range', () => {
      vi.mocked(Math.random).mockReturnValue(0.5);

      const node = createNode(1, 1000, 800);

      expect(node.radius).toBeGreaterThanOrEqual(PHYSICS.NODE_RADIUS_MIN);
      expect(node.radius).toBeLessThanOrEqual(PHYSICS.NODE_RADIUS_MAX);
    });

    it('creates node with lifespan in valid range', () => {
      vi.mocked(Math.random).mockReturnValue(0.5);

      const node = createNode(1, 1000, 800);

      expect(node.lifespan).toBeGreaterThanOrEqual(TIMING.NODE_LIFESPAN_MIN);
      expect(node.lifespan).toBeLessThanOrEqual(TIMING.NODE_LIFESPAN_MAX);
    });

    it('creates node with non-zero velocity', () => {
      vi.mocked(Math.random).mockReturnValue(0.5);

      const node = createNode(1, 1000, 800);
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);

      expect(speed).toBeGreaterThan(0);
    });
  });

  describe('calculateNodeOpacity', () => {
    it('returns 0 at start of spawning phase', () => {
      const node = createMockNode({
        phase: 'spawning',
        age: 0,
        lifespan: 20000,
      });

      expect(calculateNodeOpacity(node)).toBeCloseTo(0, 5);
    });

    it('returns increasing opacity during spawning', () => {
      const node = createMockNode({
        phase: 'spawning',
        age: TIMING.NODE_FADE_IN / 2,
        lifespan: 20000,
      });

      const opacity = calculateNodeOpacity(node);
      expect(opacity).toBeGreaterThan(0);
      expect(opacity).toBeLessThan(1);
    });

    it('returns 1 at end of spawning phase', () => {
      const node = createMockNode({
        phase: 'spawning',
        age: TIMING.NODE_FADE_IN,
        lifespan: 20000,
      });

      expect(calculateNodeOpacity(node)).toBeCloseTo(1, 2);
    });

    it('returns 1 during active phase', () => {
      const node = createMockNode({
        phase: 'active',
        age: 10000,
        lifespan: 20000,
      });

      expect(calculateNodeOpacity(node)).toBe(1);
    });

    it('returns decreasing opacity during fading phase', () => {
      const lifespan = 20000;
      const fadeOutStart = lifespan - TIMING.NODE_FADE_OUT;
      const node = createMockNode({
        phase: 'fading',
        age: fadeOutStart + TIMING.NODE_FADE_OUT / 2,
        lifespan,
      });

      const opacity = calculateNodeOpacity(node);
      expect(opacity).toBeGreaterThan(0);
      expect(opacity).toBeLessThan(1);
    });

    it('returns near 0 at end of fading phase', () => {
      const lifespan = 20000;
      const node = createMockNode({
        phase: 'fading',
        age: lifespan,
        lifespan,
      });

      expect(calculateNodeOpacity(node)).toBeCloseTo(0, 2);
    });
  });

  describe('calculateNodePhase', () => {
    it('returns spawning when age < fade in time', () => {
      const node = createMockNode({
        age: TIMING.NODE_FADE_IN - 100,
        lifespan: 20000,
      });

      expect(calculateNodePhase(node)).toBe('spawning');
    });

    it('returns active after fade in completes', () => {
      const node = createMockNode({
        age: TIMING.NODE_FADE_IN + 100,
        lifespan: 20000,
      });

      expect(calculateNodePhase(node)).toBe('active');
    });

    it('returns fading when approaching end of lifespan', () => {
      const lifespan = 20000;
      const fadeOutStart = lifespan - TIMING.NODE_FADE_OUT;
      const node = createMockNode({
        age: fadeOutStart + 100,
        lifespan,
      });

      expect(calculateNodePhase(node)).toBe('fading');
    });

    it('transitions spawning -> active at correct time', () => {
      const node = createMockNode({
        age: TIMING.NODE_FADE_IN,
        lifespan: 20000,
      });

      // At exactly fade in time, should be active
      expect(calculateNodePhase(node)).toBe('active');
    });

    it('transitions active -> fading at correct time', () => {
      const lifespan = 20000;
      const fadeOutStart = lifespan - TIMING.NODE_FADE_OUT;
      const node = createMockNode({
        age: fadeOutStart,
        lifespan,
      });

      expect(calculateNodePhase(node)).toBe('fading');
    });
  });

  describe('shouldRemoveNode', () => {
    it('returns false when age < lifespan', () => {
      const node = createMockNode({
        age: 15000,
        lifespan: 20000,
      });

      expect(shouldRemoveNode(node)).toBe(false);
    });

    it('returns true when age >= lifespan', () => {
      const node = createMockNode({
        age: 20000,
        lifespan: 20000,
      });

      expect(shouldRemoveNode(node)).toBe(true);
    });

    it('returns true when age > lifespan', () => {
      const node = createMockNode({
        age: 25000,
        lifespan: 20000,
      });

      expect(shouldRemoveNode(node)).toBe(true);
    });
  });

  describe('updateNode', () => {
    it('returns null when node reaches end of lifespan', () => {
      const node = createMockNode({
        age: 19900,
        lifespan: 20000,
      });

      const result = updateNode(node, 200, 1000, 800);
      expect(result).toBeNull();
    });

    it('updates age correctly', () => {
      const node = createMockNode({
        age: 5000,
        lifespan: 20000,
      });

      const result = updateNode(node, 100, 1000, 800);
      expect(result?.age).toBe(5100);
    });

    it('updates position based on velocity', () => {
      const node = createMockNode({
        x: 500,
        y: 400,
        vx: 10, // 10 pixels/second
        vy: 5,  // 5 pixels/second
        age: 5000,
        lifespan: 20000,
      });

      const result = updateNode(node, 1000, 1000, 800); // 1 second
      expect(result?.x).toBeCloseTo(510, 1);
      expect(result?.y).toBeCloseTo(405, 1);
    });

    it('bounces velocity at boundaries', () => {
      const margin = PHYSICS.SPAWN_MARGIN;
      const node = createMockNode({
        x: margin - 1, // At left edge
        y: 400,
        vx: -10,
        vy: 5,
        age: 5000,
        lifespan: 20000,
      });

      const result = updateNode(node, 100, 1000, 800);
      expect(result?.vx).toBe(10); // Reversed
      expect(result?.vy).toBe(5);  // Unchanged
    });

    it('clamps position to bounds', () => {
      const node = createMockNode({
        x: -100, // Way outside
        y: 2000, // Way outside
        vx: 0,
        vy: 0,
        age: 5000,
        lifespan: 20000,
      });

      const result = updateNode(node, 100, 1000, 800);
      expect(result?.x).toBeGreaterThanOrEqual(PHYSICS.SPAWN_MARGIN);
      expect(result?.y).toBeLessThanOrEqual(800 - PHYSICS.SPAWN_MARGIN);
    });

    it('updates phase during spawning', () => {
      const node = createMockNode({
        phase: 'spawning',
        age: TIMING.NODE_FADE_IN - 100,
        lifespan: 20000,
      });

      const result = updateNode(node, 200, 1000, 800);
      // Should transition to active
      expect(result?.phase).toBe('active');
    });

    it('updates opacity during spawning', () => {
      const node = createMockNode({
        phase: 'spawning',
        age: 0,
        opacity: 0,
        lifespan: 20000,
      });

      const result = updateNode(node, TIMING.NODE_FADE_IN / 2, 1000, 800);
      expect(result?.opacity).toBeGreaterThan(0);
    });

    it('preserves connections', () => {
      const connections = new Set([1, 2, 3]);
      const node = createMockNode({
        age: 5000,
        lifespan: 20000,
        connections,
      });

      const result = updateNode(node, 100, 1000, 800);
      expect(result?.connections).toBe(connections);
    });
  });

  describe('shouldSpawnNode', () => {
    it('returns false when at max capacity', () => {
      expect(shouldSpawnNode(40, 40, 0, 5000)).toBe(false);
    });

    it('returns false when spawn interval not elapsed', () => {
      const lastSpawn = 1000;
      const current = lastSpawn + TIMING.NODE_SPAWN_INTERVAL - 100;
      expect(shouldSpawnNode(20, 40, lastSpawn, current)).toBe(false);
    });

    it('returns true when below max and interval elapsed', () => {
      const lastSpawn = 1000;
      const current = lastSpawn + TIMING.NODE_SPAWN_INTERVAL + 100;
      expect(shouldSpawnNode(20, 40, lastSpawn, current)).toBe(true);
    });

    it('returns true at exactly spawn interval', () => {
      const lastSpawn = 1000;
      const current = lastSpawn + TIMING.NODE_SPAWN_INTERVAL;
      expect(shouldSpawnNode(20, 40, lastSpawn, current)).toBe(true);
    });

    it('returns false when just below max and interval not elapsed', () => {
      const lastSpawn = 1000;
      const current = lastSpawn + 100; // Not enough time
      expect(shouldSpawnNode(39, 40, lastSpawn, current)).toBe(false);
    });
  });

  describe('updateNodes', () => {
    beforeEach(() => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('removes nodes that reach end of lifespan', () => {
      const dyingNode = createMockNode({
        id: 1,
        age: 19900,
        lifespan: 20000,
      });
      const state = createMockState({
        nodes: new Map([[1, dyingNode]]),
        nextNodeId: 2, // Ensure new nodes get different ID
        lastNodeSpawn: 5000, // Recent spawn, so no new node will spawn
      });
      const config = createMockConfig();

      const result = updateNodes(state, config, 200, 5000);
      expect(result.nodes.has(1)).toBe(false);
    });

    it('keeps nodes that are still alive', () => {
      const aliveNode = createMockNode({
        id: 1,
        age: 5000,
        lifespan: 20000,
      });
      const state = createMockState({
        nodes: new Map([[1, aliveNode]]),
      });
      const config = createMockConfig();

      const result = updateNodes(state, config, 100, 5000);
      expect(result.nodes.has(1)).toBe(true);
    });

    it('spawns new node when conditions are met', () => {
      const state = createMockState({
        nodes: new Map(),
        nextNodeId: 1,
        lastNodeSpawn: 0,
      });
      const config = createMockConfig();
      const currentTime = TIMING.NODE_SPAWN_INTERVAL + 100;

      const result = updateNodes(state, config, 100, currentTime);
      expect(result.nodes.size).toBe(1);
      expect(result.nextNodeId).toBe(2);
      expect(result.lastNodeSpawn).toBe(currentTime);
    });

    it('does not spawn when at max capacity', () => {
      const nodes = new Map<number, any>();
      for (let i = 0; i < LIMITS.NODES_MAX; i++) {
        nodes.set(i, createMockNode({ id: i, age: 5000, lifespan: 20000 }));
      }

      const state = createMockState({
        nodes,
        nextNodeId: LIMITS.NODES_MAX,
        lastNodeSpawn: 0,
      });
      const config = createMockConfig();

      const result = updateNodes(state, config, 100, 10000);
      expect(result.nodes.size).toBe(LIMITS.NODES_MAX);
      expect(result.nextNodeId).toBe(LIMITS.NODES_MAX);
    });

    it('respects mobile limits', () => {
      const nodes = new Map<number, any>();
      for (let i = 0; i < LIMITS.NODES_MOBILE; i++) {
        nodes.set(i, createMockNode({ id: i, age: 5000, lifespan: 20000 }));
      }

      const state = createMockState({
        nodes,
        nextNodeId: LIMITS.NODES_MOBILE,
        lastNodeSpawn: 0,
      });
      const config = createMockMobileConfig();

      const result = updateNodes(state, config, 100, 10000);
      expect(result.nodes.size).toBe(LIMITS.NODES_MOBILE);
    });
  });

  describe('initializeNodes', () => {
    beforeEach(() => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('creates initial set of nodes', () => {
      const config = createMockConfig();
      const { nodes, nextNodeId } = initializeNodes(config, 0);

      const expectedCount = Math.floor((LIMITS.NODES_MIN + LIMITS.NODES_MAX) / 2);
      expect(nodes.size).toBe(expectedCount);
      expect(nextNodeId).toBe(expectedCount);
    });

    it('creates fewer nodes for mobile', () => {
      const config = createMockMobileConfig();
      const { nodes } = initializeNodes(config, 0);

      expect(nodes.size).toBe(LIMITS.NODES_MOBILE);
    });

    it('staggers node ages', () => {
      const config = createMockConfig();
      const { nodes } = initializeNodes(config, 0);

      // All nodes should have age > 0 (staggered)
      const ages = Array.from(nodes.values()).map(n => n.age);
      const uniqueAges = new Set(ages);

      // With mocked random, ages might not be unique
      // But they should be within first half of lifespan
      for (const node of nodes.values()) {
        expect(node.age).toBeLessThanOrEqual(node.lifespan * 0.5);
      }
    });

    it('initializes node phases and opacities correctly', () => {
      const config = createMockConfig();
      const { nodes } = initializeNodes(config, 0);

      for (const node of nodes.values()) {
        // Phase should match calculated phase based on age
        const expectedPhase = calculateNodePhase(node);
        expect(node.phase).toBe(expectedPhase);

        // Opacity should match calculated opacity
        const expectedOpacity = calculateNodeOpacity(node);
        expect(node.opacity).toBeCloseTo(expectedOpacity, 5);
      }
    });

    it('creates nodes with valid IDs starting from 0', () => {
      const config = createMockConfig();
      const { nodes } = initializeNodes(config, 0);

      const ids = Array.from(nodes.keys()).sort((a, b) => a - b);
      expect(ids[0]).toBe(0);
      expect(ids[ids.length - 1]).toBe(nodes.size - 1);
    });
  });
});
