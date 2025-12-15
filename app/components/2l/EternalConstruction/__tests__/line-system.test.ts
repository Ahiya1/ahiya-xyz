/**
 * Tests for line-system.ts
 * Tests all pure functions for line creation, updates, and lifecycle management
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createLine,
  updateLine,
  calculateLineProgress,
  calculateLineEndpoint,
  shouldSpawnLine,
  findTargetNode,
  selectSourceNode,
  getLineLimits,
  startLineFading,
  shouldRemoveLine,
  getExtendingLines,
  getLockedLines,
} from '../line-system';
import { TIMING, LIMITS } from '../constants';
import { easeOutCubic } from '../easing';
import {
  createMockNode,
  createMockLine,
  createMockLineAtStart,
  createMockLineAtEnd,
  createMockFadingLine,
  createMockConnectedNodes,
  createNodesMap,
  createLinesMap,
} from './factories';

describe('line-system', () => {
  describe('createLine', () => {
    it('returns a valid line with correct defaults', () => {
      const { fromNode, toNode } = createMockConnectedNodes();
      const currentTime = 1000;

      const line = createLine(1, fromNode, toNode, currentTime);

      expect(line.id).toBe(1);
      expect(line.fromNodeId).toBe(fromNode.id);
      expect(line.toNodeId).toBe(toNode.id);
      expect(line.progress).toBe(0);
      expect(line.phase).toBe('extending');
      expect(line.startTime).toBe(currentTime);
      expect(line.opacity).toBe(1);
    });

    it('sets duration within expected range', () => {
      const { fromNode, toNode } = createMockConnectedNodes();

      // Create multiple lines to check range
      for (let i = 0; i < 50; i++) {
        const line = createLine(i, fromNode, toNode, 0);
        expect(line.duration).toBeGreaterThanOrEqual(TIMING.LINE_TRAVEL_MIN);
        expect(line.duration).toBeLessThanOrEqual(TIMING.LINE_TRAVEL_MAX);
      }
    });
  });

  describe('updateLine', () => {
    describe('extending phase', () => {
      it('increases progress over time', () => {
        const line = createMockLineAtStart({ startTime: 0, duration: 3000 });

        const updated = updateLine(line, 1500);

        expect(updated).not.toBeNull();
        expect(updated!.progress).toBeGreaterThan(0);
        expect(updated!.progress).toBeLessThan(1);
        expect(updated!.phase).toBe('extending');
      });

      it('applies easeOutCubic easing', () => {
        const line = createMockLineAtStart({ startTime: 0, duration: 3000 });
        const currentTime = 1500; // 50% elapsed

        const updated = updateLine(line, currentTime);

        // At 50% elapsed time, easeOutCubic gives ~0.875
        const expectedProgress = easeOutCubic(0.5);
        expect(updated!.progress).toBeCloseTo(expectedProgress, 3);
      });

      it('transitions to locked phase when progress reaches 1', () => {
        const line = createMockLineAtStart({ startTime: 0, duration: 3000 });

        const updated = updateLine(line, 3000); // Full duration elapsed

        expect(updated!.phase).toBe('locked');
        expect(updated!.progress).toBe(1);
      });

      it('returns progress 0 at start time', () => {
        const line = createMockLineAtStart({ startTime: 1000, duration: 3000 });

        const updated = updateLine(line, 1000);

        expect(updated!.progress).toBe(0);
      });
    });

    describe('locked phase', () => {
      it('returns line unchanged', () => {
        const line = createMockLineAtEnd();

        const updated = updateLine(line, 5000);

        expect(updated).toEqual(line);
      });
    });

    describe('fading phase', () => {
      it('decreases opacity over time', () => {
        const line = createMockFadingLine({
          startTime: 0,
          duration: 1000,
          opacity: 1,
        });

        // Simulate some time passing after fade started
        const currentTime = 1000 + TIMING.NODE_FADE_OUT * 0.5;
        const updated = updateLine(line, currentTime);

        expect(updated).not.toBeNull();
        expect(updated!.opacity).toBeLessThan(1);
        expect(updated!.opacity).toBeGreaterThan(0);
      });

      it('returns null when fade is complete', () => {
        const line = createMockFadingLine({
          startTime: 0,
          duration: 1000,
        });

        const currentTime = 1000 + TIMING.NODE_FADE_OUT + 100;
        const updated = updateLine(line, currentTime);

        expect(updated).toBeNull();
      });
    });
  });

  describe('calculateLineProgress', () => {
    it('returns 0 at start time', () => {
      const line = createMockLineAtStart({ startTime: 1000, duration: 3000 });

      const progress = calculateLineProgress(line, 1000);

      expect(progress).toBe(0);
    });

    it('returns 1 at end time', () => {
      const line = createMockLineAtStart({ startTime: 1000, duration: 3000 });

      const progress = calculateLineProgress(line, 4000);

      expect(progress).toBe(1);
    });

    it('returns ~0.875 at midpoint (easeOutCubic)', () => {
      const line = createMockLineAtStart({ startTime: 0, duration: 2000 });

      const progress = calculateLineProgress(line, 1000);

      // easeOutCubic(0.5) = 1 - (1-0.5)^3 = 1 - 0.125 = 0.875
      expect(progress).toBeCloseTo(0.875, 3);
    });

    it('returns 1 for locked lines', () => {
      const line = createMockLineAtEnd();

      const progress = calculateLineProgress(line, 99999);

      expect(progress).toBe(1);
    });

    it('returns 1 for fading lines', () => {
      const line = createMockFadingLine();

      const progress = calculateLineProgress(line, 99999);

      expect(progress).toBe(1);
    });

    it('clamps progress to 0-1 range', () => {
      const line = createMockLineAtStart({ startTime: 1000, duration: 3000 });

      // Before start
      const beforeStart = calculateLineProgress(line, 500);
      expect(beforeStart).toBe(0);

      // After end
      const afterEnd = calculateLineProgress(line, 10000);
      expect(afterEnd).toBe(1);
    });
  });

  describe('calculateLineEndpoint', () => {
    it('returns source position at progress 0', () => {
      const { fromNode, toNode } = createMockConnectedNodes();

      const endpoint = calculateLineEndpoint(fromNode, toNode, 0);

      expect(endpoint.x).toBe(fromNode.x);
      expect(endpoint.y).toBe(fromNode.y);
    });

    it('returns target position at progress 1', () => {
      const { fromNode, toNode } = createMockConnectedNodes();

      const endpoint = calculateLineEndpoint(fromNode, toNode, 1);

      expect(endpoint.x).toBe(toNode.x);
      expect(endpoint.y).toBe(toNode.y);
    });

    it('returns midpoint at progress 0.5', () => {
      const fromNode = createMockNode({ id: 1, x: 0, y: 0 });
      const toNode = createMockNode({ id: 2, x: 200, y: 100 });

      const endpoint = calculateLineEndpoint(fromNode, toNode, 0.5);

      expect(endpoint.x).toBe(100);
      expect(endpoint.y).toBe(50);
    });

    it('interpolates correctly at various progress values', () => {
      const fromNode = createMockNode({ id: 1, x: 100, y: 100 });
      const toNode = createMockNode({ id: 2, x: 300, y: 200 });

      // 25% progress
      const at25 = calculateLineEndpoint(fromNode, toNode, 0.25);
      expect(at25.x).toBe(150);
      expect(at25.y).toBe(125);

      // 75% progress
      const at75 = calculateLineEndpoint(fromNode, toNode, 0.75);
      expect(at75.x).toBe(250);
      expect(at75.y).toBe(175);
    });
  });

  describe('shouldSpawnLine', () => {
    it('returns false when at max line limit', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
      ]);
      const lines = createLinesMap([
        createMockLine({ id: 1 }),
        createMockLine({ id: 2 }),
      ]);

      const result = shouldSpawnLine(nodes, lines, 2, 0, 2000);

      expect(result).toBe(false);
    });

    it('returns false when spawn interval not elapsed', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
      ]);
      const lines = new Map();

      const result = shouldSpawnLine(
        nodes,
        lines,
        20,
        1000,
        1000 + TIMING.LINE_SPAWN_INTERVAL - 100
      );

      expect(result).toBe(false);
    });

    it('returns false when fewer than 2 active nodes', () => {
      const nodes = createNodesMap([createMockNode({ id: 1 })]);
      const lines = new Map();

      const result = shouldSpawnLine(nodes, lines, 20, 0, 2000);

      expect(result).toBe(false);
    });

    it('returns true when all conditions met', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
        createMockNode({ id: 3 }),
      ]);
      const lines = new Map();

      const result = shouldSpawnLine(
        nodes,
        lines,
        20,
        0,
        TIMING.LINE_SPAWN_INTERVAL + 100
      );

      expect(result).toBe(true);
    });

    it('excludes fading nodes from active count', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, phase: 'active' }),
        createMockNode({ id: 2, phase: 'fading' }),
      ]);
      const lines = new Map();

      const result = shouldSpawnLine(nodes, lines, 20, 0, 2000);

      expect(result).toBe(false);
    });
  });

  describe('findTargetNode', () => {
    let randomSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      randomSpy = vi.spyOn(Math, 'random');
    });

    afterEach(() => {
      randomSpy.mockRestore();
    });

    it('never selects source node', () => {
      const fromNode = createMockNode({ id: 1 });
      const nodes = createNodesMap([
        fromNode,
        createMockNode({ id: 2 }),
      ]);
      const lines = new Map();

      // Run multiple times to ensure
      for (let i = 0; i < 20; i++) {
        const target = findTargetNode(fromNode, nodes, lines);
        expect(target).not.toBeNull();
        expect(target!.id).not.toBe(fromNode.id);
      }
    });

    it('returns null when no valid targets', () => {
      const fromNode = createMockNode({ id: 1 });
      const nodes = createNodesMap([fromNode]); // Only source node
      const lines = new Map();

      const target = findTargetNode(fromNode, nodes, lines);

      expect(target).toBeNull();
    });

    it('excludes fading nodes', () => {
      const fromNode = createMockNode({ id: 1 });
      const nodes = createNodesMap([
        fromNode,
        createMockNode({ id: 2, phase: 'fading' }),
      ]);
      const lines = new Map();

      const target = findTargetNode(fromNode, nodes, lines);

      expect(target).toBeNull();
    });

    it('excludes nodes already connected by existing lines', () => {
      const fromNode = createMockNode({ id: 1 });
      const nodes = createNodesMap([
        fromNode,
        createMockNode({ id: 2 }),
        createMockNode({ id: 3 }),
      ]);
      const lines = createLinesMap([
        createMockLine({ id: 1, fromNodeId: 1, toNodeId: 2 }),
      ]);

      // Mock random to return 0 first (would select node 2 if available)
      randomSpy.mockReturnValue(0);

      const target = findTargetNode(fromNode, nodes, lines);

      expect(target).not.toBeNull();
      expect(target!.id).toBe(3); // Should skip node 2 (already connected)
    });

    it('considers reverse connections as existing', () => {
      const fromNode = createMockNode({ id: 1 });
      const nodes = createNodesMap([
        fromNode,
        createMockNode({ id: 2 }),
      ]);
      // Line from 2 to 1 (reverse direction)
      const lines = createLinesMap([
        createMockLine({ id: 1, fromNodeId: 2, toNodeId: 1 }),
      ]);

      const target = findTargetNode(fromNode, nodes, lines);

      expect(target).toBeNull(); // No valid targets
    });

    it('returns random selection from valid candidates', () => {
      const fromNode = createMockNode({ id: 1 });
      const nodes = createNodesMap([
        fromNode,
        createMockNode({ id: 2 }),
        createMockNode({ id: 3 }),
        createMockNode({ id: 4 }),
      ]);
      const lines = new Map();

      // Track selected IDs
      const selectedIds = new Set<number>();
      for (let i = 0; i < 100; i++) {
        const target = findTargetNode(fromNode, nodes, lines);
        if (target) selectedIds.add(target.id);
      }

      // Should have selected at least 2 different targets
      expect(selectedIds.size).toBeGreaterThan(1);
    });
  });

  describe('selectSourceNode', () => {
    it('returns null when no nodes', () => {
      const nodes = new Map<number, ReturnType<typeof createMockNode>>();

      const source = selectSourceNode(nodes);

      expect(source).toBeNull();
    });

    it('returns null when all nodes are fading', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, phase: 'fading' }),
        createMockNode({ id: 2, phase: 'fading' }),
      ]);

      const source = selectSourceNode(nodes);

      expect(source).toBeNull();
    });

    it('returns an active or spawning node', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, phase: 'active' }),
        createMockNode({ id: 2, phase: 'spawning' }),
        createMockNode({ id: 3, phase: 'fading' }),
      ]);

      const source = selectSourceNode(nodes);

      expect(source).not.toBeNull();
      expect(['active', 'spawning']).toContain(source!.phase);
    });
  });

  describe('getLineLimits', () => {
    it('returns desktop limit for non-mobile', () => {
      const limit = getLineLimits(false);

      expect(limit).toBe(LIMITS.LINES_MAX);
    });

    it('returns mobile limit for mobile', () => {
      const limit = getLineLimits(true);

      expect(limit).toBe(LIMITS.LINES_MOBILE);
    });
  });

  describe('startLineFading', () => {
    it('sets phase to fading', () => {
      const line = createMockLineAtEnd();

      const result = startLineFading(line, 5000);

      expect(result.phase).toBe('fading');
    });

    it('preserves other properties', () => {
      const line = createMockLineAtEnd();

      const result = startLineFading(line, 5000);

      expect(result.id).toBe(line.id);
      expect(result.fromNodeId).toBe(line.fromNodeId);
      expect(result.toNodeId).toBe(line.toNodeId);
      expect(result.progress).toBe(line.progress);
      expect(result.opacity).toBe(line.opacity);
    });
  });

  describe('shouldRemoveLine', () => {
    it('returns true when source node does not exist', () => {
      const line = createMockLine({ fromNodeId: 1, toNodeId: 2 });
      const nodes = createNodesMap([
        createMockNode({ id: 2 }), // Only target node exists
      ]);

      const result = shouldRemoveLine(line, nodes);

      expect(result).toBe(true);
    });

    it('returns true when target node does not exist', () => {
      const line = createMockLine({ fromNodeId: 1, toNodeId: 2 });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }), // Only source node exists
      ]);

      const result = shouldRemoveLine(line, nodes);

      expect(result).toBe(true);
    });

    it('returns true when source node is completely faded', () => {
      const line = createMockLine({ fromNodeId: 1, toNodeId: 2 });
      const nodes = createNodesMap([
        createMockNode({ id: 1, phase: 'fading', opacity: 0 }),
        createMockNode({ id: 2 }),
      ]);

      const result = shouldRemoveLine(line, nodes);

      expect(result).toBe(true);
    });

    it('returns true when target node is completely faded', () => {
      const line = createMockLine({ fromNodeId: 1, toNodeId: 2 });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2, phase: 'fading', opacity: 0 }),
      ]);

      const result = shouldRemoveLine(line, nodes);

      expect(result).toBe(true);
    });

    it('returns true when line is faded out', () => {
      const line = createMockFadingLine({ opacity: 0 });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
      ]);

      const result = shouldRemoveLine(line, nodes);

      expect(result).toBe(true);
    });

    it('returns false when both nodes exist and are visible', () => {
      const line = createMockLine({ fromNodeId: 1, toNodeId: 2 });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
      ]);

      const result = shouldRemoveLine(line, nodes);

      expect(result).toBe(false);
    });

    it('returns false when node is fading but still visible', () => {
      const line = createMockLine({ fromNodeId: 1, toNodeId: 2 });
      const nodes = createNodesMap([
        createMockNode({ id: 1, phase: 'fading', opacity: 0.5 }),
        createMockNode({ id: 2 }),
      ]);

      const result = shouldRemoveLine(line, nodes);

      expect(result).toBe(false);
    });
  });

  describe('getExtendingLines', () => {
    it('returns only extending lines', () => {
      const lines = createLinesMap([
        createMockLine({ id: 1, phase: 'extending' }),
        createMockLine({ id: 2, phase: 'locked' }),
        createMockLine({ id: 3, phase: 'fading' }),
        createMockLine({ id: 4, phase: 'extending' }),
      ]);

      const extending = getExtendingLines(lines);

      expect(extending).toHaveLength(2);
      expect(extending.map(l => l.id)).toEqual([1, 4]);
    });

    it('returns empty array when no extending lines', () => {
      const lines = createLinesMap([
        createMockLine({ id: 1, phase: 'locked' }),
        createMockLine({ id: 2, phase: 'fading' }),
      ]);

      const extending = getExtendingLines(lines);

      expect(extending).toHaveLength(0);
    });
  });

  describe('getLockedLines', () => {
    it('returns only locked lines', () => {
      const lines = createLinesMap([
        createMockLine({ id: 1, phase: 'extending' }),
        createMockLine({ id: 2, phase: 'locked' }),
        createMockLine({ id: 3, phase: 'fading' }),
        createMockLine({ id: 4, phase: 'locked' }),
      ]);

      const locked = getLockedLines(lines);

      expect(locked).toHaveLength(2);
      expect(locked.map(l => l.id)).toEqual([2, 4]);
    });

    it('returns empty array when no locked lines', () => {
      const lines = createLinesMap([
        createMockLine({ id: 1, phase: 'extending' }),
      ]);

      const locked = getLockedLines(lines);

      expect(locked).toHaveLength(0);
    });
  });

  describe('easing behavior', () => {
    it('line extends faster at start, slower at end (easeOutCubic)', () => {
      const line = createMockLineAtStart({ startTime: 0, duration: 4000 });

      // Progress at 25% elapsed time
      const at25 = calculateLineProgress(line, 1000);
      // Progress at 50% elapsed time
      const at50 = calculateLineProgress(line, 2000);
      // Progress at 75% elapsed time
      const at75 = calculateLineProgress(line, 3000);

      // First quarter of time covers more than 25% of distance
      expect(at25).toBeGreaterThan(0.25);

      // Progress difference between quarters should decrease
      const diff1 = at25 - 0;
      const diff2 = at50 - at25;
      const diff3 = at75 - at50;
      const diff4 = 1 - at75;

      // Each subsequent quarter should cover less distance
      expect(diff1).toBeGreaterThan(diff2);
      expect(diff2).toBeGreaterThan(diff3);
      expect(diff3).toBeGreaterThan(diff4);
    });
  });
});

describe('line-system edge cases', () => {
  it('handles zero-duration lines gracefully', () => {
    const line = createMockLineAtStart({ startTime: 0, duration: 0 });

    // Should immediately be at progress 1
    const progress = calculateLineProgress(line, 0);
    expect(progress).toBe(1);
  });

  it('handles negative timestamps gracefully', () => {
    const line = createMockLineAtStart({ startTime: 100, duration: 3000 });

    // Timestamp before start time
    const progress = calculateLineProgress(line, 50);
    expect(progress).toBe(0);
  });

  it('handles empty node map', () => {
    const nodes = new Map<number, ReturnType<typeof createMockNode>>();
    const lines = new Map();

    const result = shouldSpawnLine(nodes, lines, 20, 0, 2000);
    expect(result).toBe(false);

    const source = selectSourceNode(nodes);
    expect(source).toBeNull();
  });

  it('handles single node in findTargetNode', () => {
    const fromNode = createMockNode({ id: 1 });
    const nodes = createNodesMap([fromNode]);
    const lines = new Map();

    const target = findTargetNode(fromNode, nodes, lines);
    expect(target).toBeNull();
  });
});
