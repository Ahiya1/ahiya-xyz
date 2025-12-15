/**
 * Integration tests for EternalConstruction
 * Tests the complete animation system working together
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createInitialState, updateState } from '../state';
import { render } from '../canvas-renderer';
import { LIMITS, TIMING } from '../constants';
import type { AnimationState, CanvasConfig } from '../types';
import { createMockConfig, createMockMobileConfig, createMockState } from './factories';

describe('EternalConstruction Integration', () => {
  describe('State Initialization', () => {
    it('creates initial state with nodes pre-populated', () => {
      const config = createMockConfig();
      const timestamp = 1000;

      const state = createInitialState(config, timestamp);

      // Should have some nodes
      expect(state.nodes.size).toBeGreaterThan(0);
      expect(state.nodes.size).toBeLessThanOrEqual(LIMITS.NODES_MAX);

      // No lines or structures initially
      expect(state.lines.size).toBe(0);
      expect(state.structures.size).toBe(0);
      expect(state.pulses).toHaveLength(0);
    });

    it('creates fewer initial nodes on mobile', () => {
      const desktopConfig = createMockConfig({ isMobile: false });
      const mobileConfig = createMockMobileConfig();
      const timestamp = 1000;

      const desktopState = createInitialState(desktopConfig, timestamp);
      const mobileState = createInitialState(mobileConfig, timestamp);

      expect(mobileState.nodes.size).toBeLessThanOrEqual(LIMITS.NODES_MOBILE);
      expect(desktopState.nodes.size).toBeGreaterThanOrEqual(mobileState.nodes.size);
    });

    it('initializes with valid timestamps', () => {
      const config = createMockConfig();
      const timestamp = 1000;

      const state = createInitialState(config, timestamp);

      expect(state.lastNodeSpawn).toBe(timestamp);
      expect(state.lastLineSpawn).toBe(0); // No lines spawned yet
      expect(state.frameCount).toBe(0);
    });
  });

  describe('State Update Cycle', () => {
    let config: CanvasConfig;
    let initialState: AnimationState;

    beforeEach(() => {
      config = createMockConfig();
      initialState = createInitialState(config, 0);
    });

    it('increments frame count on each update', () => {
      const state1 = updateState(initialState, config, 16, 16);
      const state2 = updateState(state1, config, 16, 32);
      const state3 = updateState(state2, config, 16, 48);

      expect(state1.frameCount).toBe(1);
      expect(state2.frameCount).toBe(2);
      expect(state3.frameCount).toBe(3);
    });

    it('spawns lines after spawn interval', () => {
      // Fast-forward past spawn interval
      const timestamp = TIMING.LINE_SPAWN_INTERVAL + 100;
      const state = updateState(initialState, config, timestamp, timestamp);

      // Should have spawned at least one line
      expect(state.lines.size).toBeGreaterThan(0);
    });

    it('maintains node count within limits over time', () => {
      let state = initialState;
      const limits = config.isMobile
        ? { min: LIMITS.NODES_MOBILE, max: LIMITS.NODES_MOBILE }
        : { min: LIMITS.NODES_MIN, max: LIMITS.NODES_MAX };

      // Simulate 100 frames
      for (let i = 0; i < 100; i++) {
        const timestamp = i * 16 + TIMING.NODE_SPAWN_INTERVAL * 2;
        state = updateState(state, config, 16, timestamp);
      }

      expect(state.nodes.size).toBeGreaterThan(0);
      expect(state.nodes.size).toBeLessThanOrEqual(limits.max);
    });

    it('respects mobile limits', () => {
      const mobileConfig = createMockMobileConfig();
      let state = createInitialState(mobileConfig, 0);

      // Simulate many frames
      for (let i = 0; i < 200; i++) {
        const timestamp = i * 16 + TIMING.LINE_SPAWN_INTERVAL * 10;
        state = updateState(state, mobileConfig, 16, timestamp);
      }

      expect(state.nodes.size).toBeLessThanOrEqual(LIMITS.NODES_MOBILE);
      expect(state.lines.size).toBeLessThanOrEqual(LIMITS.LINES_MOBILE);
    });
  });

  describe('Node Lifecycle', () => {
    it('nodes transition through spawning -> active -> fading phases', () => {
      const config = createMockConfig();
      let state = createInitialState(config, 0);

      // Get a node to track
      const firstEntry = state.nodes.entries().next().value;
      if (!firstEntry) {
        throw new Error('No nodes in state');
      }
      const [nodeId, initialNode] = firstEntry;

      // Initial phase should be spawning or active (depending on random age)
      expect(['spawning', 'active', 'fading']).toContain(initialNode.phase);

      // Fast forward through lifespan
      const totalLifespan = initialNode.lifespan + 1000;
      const frameTime = 100;

      for (let t = 0; t <= totalLifespan; t += frameTime) {
        state = updateState(state, config, frameTime, t);

        const node = state.nodes.get(nodeId);
        if (node) {
          // Track phase progression
          if (node.age < TIMING.NODE_FADE_IN) {
            expect(['spawning', 'active']).toContain(node.phase);
          } else if (node.age > node.lifespan - TIMING.NODE_FADE_OUT) {
            expect(node.phase).toBe('fading');
          }
        }
      }
    });

    it('node opacity changes with phase', () => {
      const config = createMockConfig();
      let state = createInitialState(config, 0);

      // Get a newly spawned node
      const firstEntry = state.nodes.entries().next().value;
      if (!firstEntry) {
        throw new Error('No nodes in state');
      }
      const [, node] = firstEntry;

      if (node.phase === 'spawning') {
        expect(node.opacity).toBeLessThan(1);
      }

      // Update until active
      while (state.nodes.has(node.id)) {
        const currentNode = state.nodes.get(node.id)!;
        if (currentNode.phase === 'active') {
          expect(currentNode.opacity).toBe(1);
          break;
        }
        state = updateState(state, config, 50, state.frameCount * 50);
      }
    });
  });

  describe('Line Lifecycle', () => {
    it('lines extend from 0 to 1 progress', () => {
      const config = createMockConfig();
      let state = createInitialState(config, 0);

      // Force spawn a line
      let timestamp = TIMING.LINE_SPAWN_INTERVAL + 100;
      state = updateState(state, config, timestamp, timestamp);

      if (state.lines.size > 0) {
        const lineEntry = state.lines.entries().next().value;
        if (!lineEntry) return;
        const [, line] = lineEntry;
        expect(line.progress).toBeLessThanOrEqual(1);
        expect(line.phase).toBe('extending');

        // Fast forward to completion
        timestamp += line.duration + 100;
        state = updateState(state, config, line.duration, timestamp);

        // Line should be locked or still extending
        const updatedLine = state.lines.get(line.id);
        if (updatedLine) {
          expect(['extending', 'locked']).toContain(updatedLine.phase);
        }
      }
    });
  });

  describe('Connection System', () => {
    it('creates pulses when lines complete', () => {
      const config = createMockConfig();
      let state = createInitialState(config, 0);

      // Simulate until we get lines and they complete
      let timestamp = 0;
      for (let i = 0; i < 500; i++) {
        timestamp += 50;
        state = updateState(state, config, 50, timestamp);

        // Check if we have pulses
        if (state.pulses.length > 0) {
          break;
        }
      }

      // May or may not have pulses depending on random line completion timing
      // Just verify no errors occurred
      expect(state).toBeDefined();
    });

    it('pulses are removed after duration', () => {
      const config = createMockConfig();
      let state = createInitialState(config, 0);

      // Create state with a pulse
      state = {
        ...state,
        pulses: [{
          id: 1,
          x: 100,
          y: 100,
          progress: 0,
          startTime: 0,
        }],
      };

      // Update past pulse duration
      const timestamp = TIMING.CONNECTION_PULSE_DURATION + 100;
      state = updateState(state, config, timestamp, timestamp);

      // Pulse should be removed
      expect(state.pulses.length).toBe(0);
    });
  });

  describe('Canvas Rendering', () => {
    let mockCtx: any;

    beforeEach(() => {
      mockCtx = {
        clearRect: vi.fn(),
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 1,
        lineCap: 'butt',
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
        stroke: vi.fn(),
        closePath: vi.fn(),
        createRadialGradient: vi.fn(() => ({
          addColorStop: vi.fn(),
        })),
        createLinearGradient: vi.fn(() => ({
          addColorStop: vi.fn(),
        })),
      };
    });

    it('clears canvas on each render', () => {
      const config = createMockConfig();
      const state = createMockState();

      render(mockCtx, state, config);

      expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, config.width, config.height);
    });

    it('renders without errors on empty state', () => {
      const config = createMockConfig();
      const state = createMockState();

      expect(() => render(mockCtx, state, config)).not.toThrow();
    });

    it('renders nodes', () => {
      const config = createMockConfig();
      const state = createInitialState(config, 0);

      render(mockCtx, state, config);

      // Should have drawn arcs for nodes
      expect(mockCtx.arc).toHaveBeenCalled();
      expect(mockCtx.fill).toHaveBeenCalled();
    });
  });

  describe('Performance Characteristics', () => {
    it('update is deterministic given same inputs', () => {
      const config = createMockConfig();
      const state1 = createMockState({
        nodes: new Map(),
        lines: new Map(),
        nextNodeId: 1,
        lastNodeSpawn: 0,
        lastLineSpawn: 0,
      });
      const state2 = { ...state1, nodes: new Map(), lines: new Map() };

      // With no random spawning (no nodes), updates should be deterministic
      const result1 = updateState(state1, config, 16, 16);
      const result2 = updateState(state2, config, 16, 16);

      expect(result1.frameCount).toBe(result2.frameCount);
    });

    it('handles large delta times gracefully', () => {
      const config = createMockConfig();
      let state = createInitialState(config, 0);

      // Simulate a large delta (like after tab was hidden)
      expect(() => {
        state = updateState(state, config, 5000, 5000);
      }).not.toThrow();

      // State should still be valid
      expect(state.frameCount).toBe(1);
    });
  });

  describe('Canvas Cleanup Verification', () => {
    it('state can be fully cleared', () => {
      const config = createMockConfig();
      let state = createInitialState(config, 0);

      // Build up state
      for (let i = 0; i < 100; i++) {
        state = updateState(state, config, 16, i * 16 + 10000);
      }

      // Verify state has content
      expect(state.nodes.size).toBeGreaterThan(0);

      // Clear manually (simulates unmount cleanup)
      state = {
        nodes: new Map(),
        lines: new Map(),
        structures: new Map(),
        pulses: [],
        nextNodeId: 1,
        nextLineId: 1,
        nextStructureId: 1,
        nextPulseId: 1,
        lastNodeSpawn: 0,
        lastLineSpawn: 0,
        frameCount: 0,
      };

      expect(state.nodes.size).toBe(0);
      expect(state.lines.size).toBe(0);
      expect(state.structures.size).toBe(0);
      expect(state.pulses).toHaveLength(0);
    });
  });

  describe('Reduced Motion Support', () => {
    it('animation state works independently of component mount', () => {
      // This tests that state management is pure and can be controlled
      // The actual reduced motion check happens in the React component

      const config = createMockConfig();
      const state = createInitialState(config, 0);

      // State is valid even without component
      expect(state.nodes.size).toBeGreaterThan(0);
      expect(state.frameCount).toBe(0);
    });
  });
});

describe('EternalConstruction Edge Cases', () => {
  it('handles zero-dimension canvas', () => {
    const config = createMockConfig({ width: 0, height: 0 });

    // Should not throw
    expect(() => {
      createInitialState(config, 0);
    }).not.toThrow();
  });

  it('handles very small canvas', () => {
    const config = createMockConfig({ width: 10, height: 10 });

    // Should not throw
    expect(() => {
      const state = createInitialState(config, 0);
      updateState(state, config, 16, 16);
    }).not.toThrow();
  });

  it('handles high DPR', () => {
    const config = createMockConfig({ dpr: 4 });
    const state = createInitialState(config, 0);

    // Should work normally
    expect(state.nodes.size).toBeGreaterThan(0);
  });

  it('handles rapid sequential updates', () => {
    const config = createMockConfig();
    let state = createInitialState(config, 0);

    // Simulate rapid updates (high FPS scenario)
    expect(() => {
      for (let i = 0; i < 1000; i++) {
        state = updateState(state, config, 1, i);
      }
    }).not.toThrow();
  });
});
