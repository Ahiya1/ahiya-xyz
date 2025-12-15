/**
 * Tests for structure-system.ts
 * Covers structure detection, lifecycle management, and limits
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getConnectedNodes,
  isValidStructure,
  findStructureLines,
  detectStructures,
  createStructure,
  updateStructure,
  shouldRemoveStructure,
  getStructureLimits,
  processStructures,
} from '../structure-system';
import { TIMING, LIMITS, PHYSICS } from '../constants';
import {
  createMockNode,
  createMockLine,
  createMockStructure,
  createMockState,
  createMockConfig,
  createNodesMap,
  createLinesMap,
} from './factories';

describe('structure-system', () => {
  describe('getConnectedNodes', () => {
    it('returns empty set for non-existent node', () => {
      const nodes = new Map<number, ReturnType<typeof createMockNode>>();

      const result = getConnectedNodes(999, nodes);

      expect(result.size).toBe(0);
    });

    it('returns empty set for node with no connections', () => {
      const node = createMockNode({ id: 1, connections: new Set() });
      const nodes = createNodesMap([node]);

      const result = getConnectedNodes(1, nodes);

      expect(result.size).toBe(0);
    });

    it('returns set of connected node IDs', () => {
      const node = createMockNode({ id: 1, connections: new Set([2, 3, 4]) });
      const nodes = createNodesMap([node]);

      const result = getConnectedNodes(1, nodes);

      expect(result.size).toBe(3);
      expect(result.has(2)).toBe(true);
      expect(result.has(3)).toBe(true);
      expect(result.has(4)).toBe(true);
    });
  });

  describe('isValidStructure', () => {
    it('returns false when < 3 nodes', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2]) }),
        createMockNode({ id: 2, connections: new Set([1]) }),
      ]);

      const result = isValidStructure(new Set([1, 2]), nodes);

      expect(result).toBe(false);
    });

    it('returns false when nodes are not mutually connected', () => {
      // Node 1 and 2 connected, but 3 is not connected to 1
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2]) }),
        createMockNode({ id: 2, connections: new Set([1, 3]) }),
        createMockNode({ id: 3, connections: new Set([2]) }),
      ]);

      const result = isValidStructure(new Set([1, 2, 3]), nodes);

      expect(result).toBe(false);
    });

    it('returns true when 3 nodes form a triangle (all mutually connected)', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2, 3]) }),
        createMockNode({ id: 2, connections: new Set([1, 3]) }),
        createMockNode({ id: 3, connections: new Set([1, 2]) }),
      ]);

      const result = isValidStructure(new Set([1, 2, 3]), nodes);

      expect(result).toBe(true);
    });

    it('returns true for 4+ fully connected nodes', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2, 3, 4]) }),
        createMockNode({ id: 2, connections: new Set([1, 3, 4]) }),
        createMockNode({ id: 3, connections: new Set([1, 2, 4]) }),
        createMockNode({ id: 4, connections: new Set([1, 2, 3]) }),
      ]);

      const result = isValidStructure(new Set([1, 2, 3, 4]), nodes);

      expect(result).toBe(true);
    });

    it('returns false if any node does not exist', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2, 3]) }),
        createMockNode({ id: 2, connections: new Set([1, 3]) }),
        // Node 3 doesn't exist
      ]);

      const result = isValidStructure(new Set([1, 2, 3]), nodes);

      expect(result).toBe(false);
    });
  });

  describe('findStructureLines', () => {
    it('returns empty set when no lines exist', () => {
      const lines = new Map<number, ReturnType<typeof createMockLine>>();
      const nodeIds = new Set([1, 2, 3]);

      const result = findStructureLines(nodeIds, lines);

      expect(result.size).toBe(0);
    });

    it('returns lines that connect structure nodes', () => {
      const lines = createLinesMap([
        createMockLine({ id: 1, fromNodeId: 1, toNodeId: 2 }),
        createMockLine({ id: 2, fromNodeId: 2, toNodeId: 3 }),
        createMockLine({ id: 3, fromNodeId: 1, toNodeId: 3 }),
      ]);
      const nodeIds = new Set([1, 2, 3]);

      const result = findStructureLines(nodeIds, lines);

      expect(result.size).toBe(3);
      expect(result.has(1)).toBe(true);
      expect(result.has(2)).toBe(true);
      expect(result.has(3)).toBe(true);
    });

    it('excludes lines connecting to nodes outside structure', () => {
      const lines = createLinesMap([
        createMockLine({ id: 1, fromNodeId: 1, toNodeId: 2 }),
        createMockLine({ id: 2, fromNodeId: 2, toNodeId: 4 }), // 4 not in structure
        createMockLine({ id: 3, fromNodeId: 5, toNodeId: 3 }), // 5 not in structure
      ]);
      const nodeIds = new Set([1, 2, 3]);

      const result = findStructureLines(nodeIds, lines);

      expect(result.size).toBe(1);
      expect(result.has(1)).toBe(true);
    });
  });

  describe('detectStructures', () => {
    it('returns empty array when < 3 connected nodes', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2]) }),
        createMockNode({ id: 2, connections: new Set([1]) }),
      ]);
      const lines = new Map();
      const existingStructures = new Map();

      const result = detectStructures(nodes, lines, existingStructures);

      expect(result).toHaveLength(0);
    });

    it('detects triangle when 3 nodes are mutually connected', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2, 3]) }),
        createMockNode({ id: 2, connections: new Set([1, 3]) }),
        createMockNode({ id: 3, connections: new Set([1, 2]) }),
      ]);
      const lines = new Map();
      const existingStructures = new Map();

      const result = detectStructures(nodes, lines, existingStructures);

      expect(result).toHaveLength(1);
      expect(result[0].size).toBe(3);
      expect(result[0].has(1)).toBe(true);
      expect(result[0].has(2)).toBe(true);
      expect(result[0].has(3)).toBe(true);
    });

    it('detects multiple separate triangles', () => {
      const nodes = createNodesMap([
        // Triangle 1: 1, 2, 3
        createMockNode({ id: 1, connections: new Set([2, 3]) }),
        createMockNode({ id: 2, connections: new Set([1, 3]) }),
        createMockNode({ id: 3, connections: new Set([1, 2]) }),
        // Triangle 2: 4, 5, 6
        createMockNode({ id: 4, connections: new Set([5, 6]) }),
        createMockNode({ id: 5, connections: new Set([4, 6]) }),
        createMockNode({ id: 6, connections: new Set([4, 5]) }),
      ]);
      const lines = new Map();
      const existingStructures = new Map();

      const result = detectStructures(nodes, lines, existingStructures);

      expect(result).toHaveLength(2);
    });

    it('does not detect structures with fading nodes', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2, 3]) }),
        createMockNode({ id: 2, connections: new Set([1, 3]) }),
        createMockNode({ id: 3, connections: new Set([1, 2]), phase: 'fading' }),
      ]);
      const lines = new Map();
      const existingStructures = new Map();

      const result = detectStructures(nodes, lines, existingStructures);

      expect(result).toHaveLength(0);
    });

    it('does not return existing structures', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2, 3]) }),
        createMockNode({ id: 2, connections: new Set([1, 3]) }),
        createMockNode({ id: 3, connections: new Set([1, 2]) }),
      ]);
      const lines = new Map();
      const existingStructure = createMockStructure({
        id: 1,
        nodeIds: new Set([1, 2, 3]),
      });
      const existingStructures = new Map([[1, existingStructure]]);

      const result = detectStructures(nodes, lines, existingStructures);

      expect(result).toHaveLength(0);
    });
  });

  describe('createStructure', () => {
    it('creates structure with correct node IDs', () => {
      const nodeIds = new Set([1, 2, 3]);
      const lines = new Map();

      const structure = createStructure(1, nodeIds, lines, 1000);

      expect(structure.nodeIds.size).toBe(3);
      expect(structure.nodeIds.has(1)).toBe(true);
      expect(structure.nodeIds.has(2)).toBe(true);
      expect(structure.nodeIds.has(3)).toBe(true);
    });

    it('finds and includes lines connecting structure nodes', () => {
      const nodeIds = new Set([1, 2, 3]);
      const lines = createLinesMap([
        createMockLine({ id: 1, fromNodeId: 1, toNodeId: 2 }),
        createMockLine({ id: 2, fromNodeId: 2, toNodeId: 3 }),
        createMockLine({ id: 3, fromNodeId: 1, toNodeId: 3 }),
      ]);

      const structure = createStructure(1, nodeIds, lines, 1000);

      expect(structure.lineIds.size).toBe(3);
    });

    it('sets initial opacity to 0.6 (locked structure)', () => {
      const nodeIds = new Set([1, 2, 3]);
      const lines = new Map();

      const structure = createStructure(1, nodeIds, lines, 1000);

      expect(structure.opacity).toBe(0.6);
    });

    it('sets initial age to 0', () => {
      const nodeIds = new Set([1, 2, 3]);
      const lines = new Map();

      const structure = createStructure(1, nodeIds, lines, 1000);

      expect(structure.age).toBe(0);
    });

    it('sets initial phase to active', () => {
      const nodeIds = new Set([1, 2, 3]);
      const lines = new Map();

      const structure = createStructure(1, nodeIds, lines, 1000);

      expect(structure.phase).toBe('active');
    });

    it('assigns lifespan within configured range', () => {
      const nodeIds = new Set([1, 2, 3]);
      const lines = new Map();

      const structure = createStructure(1, nodeIds, lines, 1000);

      expect(structure.lifespan).toBeGreaterThanOrEqual(TIMING.STRUCTURE_LIFESPAN_MIN);
      expect(structure.lifespan).toBeLessThanOrEqual(TIMING.STRUCTURE_LIFESPAN_MAX);
    });
  });

  describe('updateStructure', () => {
    it('increases age with delta time', () => {
      const structure = createMockStructure({ age: 1000 });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
        createMockNode({ id: 3 }),
      ]);

      const updated = updateStructure(structure, 500, nodes);

      expect(updated).not.toBeNull();
      expect(updated!.age).toBe(1500);
    });

    it('returns null when any component node is fading', () => {
      const structure = createMockStructure({
        nodeIds: new Set([1, 2, 3]),
        age: 1000,
        lifespan: 15000,
      });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2, phase: 'fading' }),
        createMockNode({ id: 3 }),
      ]);

      const updated = updateStructure(structure, 100, nodes);

      expect(updated).toBeNull();
    });

    it('returns null when any component node is missing', () => {
      const structure = createMockStructure({
        nodeIds: new Set([1, 2, 3]),
        age: 1000,
        lifespan: 15000,
      });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
        // Node 3 is missing
      ]);

      const updated = updateStructure(structure, 100, nodes);

      expect(updated).toBeNull();
    });

    it('transitions to fading phase when approaching lifespan end', () => {
      const structure = createMockStructure({
        nodeIds: new Set([1, 2, 3]),
        age: 14000,
        lifespan: 15000,
        phase: 'active',
      });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
        createMockNode({ id: 3 }),
      ]);

      // Age is already past fadeOutStart (15000 - 2500 = 12500)
      const updated = updateStructure(structure, 100, nodes);

      expect(updated).not.toBeNull();
      expect(updated!.phase).toBe('fading');
    });

    it('decreases opacity during fade out', () => {
      const structure = createMockStructure({
        nodeIds: new Set([1, 2, 3]),
        age: 14000,
        lifespan: 15000,
        opacity: 0.6,
        phase: 'active',
      });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
        createMockNode({ id: 3 }),
      ]);

      const updated = updateStructure(structure, 500, nodes);

      expect(updated).not.toBeNull();
      expect(updated!.opacity).toBeLessThan(0.6);
    });

    it('returns null when fading is complete (age >= lifespan)', () => {
      const structure = createMockStructure({
        nodeIds: new Set([1, 2, 3]),
        age: 14900,
        lifespan: 15000,
        phase: 'fading',
      });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
        createMockNode({ id: 3 }),
      ]);

      const updated = updateStructure(structure, 200, nodes);

      expect(updated).toBeNull();
    });
  });

  describe('shouldRemoveStructure', () => {
    it('returns true when age exceeds lifespan', () => {
      const structure = createMockStructure({
        nodeIds: new Set([1, 2, 3]),
        age: 16000,
        lifespan: 15000,
      });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
        createMockNode({ id: 3 }),
      ]);

      const result = shouldRemoveStructure(structure, nodes);

      expect(result).toBe(true);
    });

    it('returns true when any component node is fading', () => {
      const structure = createMockStructure({
        nodeIds: new Set([1, 2, 3]),
        age: 5000,
        lifespan: 15000,
      });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2, phase: 'fading' }),
        createMockNode({ id: 3 }),
      ]);

      const result = shouldRemoveStructure(structure, nodes);

      expect(result).toBe(true);
    });

    it('returns true when any component node is removed', () => {
      const structure = createMockStructure({
        nodeIds: new Set([1, 2, 3]),
        age: 5000,
        lifespan: 15000,
      });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
        // Node 3 is removed
      ]);

      const result = shouldRemoveStructure(structure, nodes);

      expect(result).toBe(true);
    });

    it('returns false when structure is valid and active', () => {
      const structure = createMockStructure({
        nodeIds: new Set([1, 2, 3]),
        age: 5000,
        lifespan: 15000,
      });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
        createMockNode({ id: 3 }),
      ]);

      const result = shouldRemoveStructure(structure, nodes);

      expect(result).toBe(false);
    });
  });

  describe('getStructureLimits', () => {
    it('returns correct limits for desktop', () => {
      const limits = getStructureLimits(false);

      expect(limits.maxStructures).toBe(LIMITS.STRUCTURES_MAX);
    });

    it('returns reduced limits for mobile', () => {
      const limits = getStructureLimits(true);

      expect(limits.maxStructures).toBe(LIMITS.STRUCTURES_MOBILE);
    });
  });

  describe('processStructures', () => {
    it('updates existing structures', () => {
      const structure = createMockStructure({
        id: 1,
        nodeIds: new Set([1, 2, 3]),
        age: 1000,
        lifespan: 15000,
      });
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2, 3]) }),
        createMockNode({ id: 2, connections: new Set([1, 3]) }),
        createMockNode({ id: 3, connections: new Set([1, 2]) }),
      ]);

      const state = createMockState({
        nodes,
        structures: new Map([[1, structure]]),
      });
      const config = createMockConfig();

      const newState = processStructures(state, config, 500, 2000);

      const updatedStructure = newState.structures.get(1);
      expect(updatedStructure?.age).toBe(1500);
    });

    it('removes structures when component nodes are removed', () => {
      const structure = createMockStructure({
        id: 1,
        nodeIds: new Set([1, 2, 3]),
        age: 1000,
        lifespan: 15000,
      });
      const nodes = createNodesMap([
        createMockNode({ id: 1 }),
        createMockNode({ id: 2 }),
        // Node 3 is missing
      ]);

      const state = createMockState({
        nodes,
        structures: new Map([[1, structure]]),
      });
      const config = createMockConfig();

      const newState = processStructures(state, config, 100, 2000);

      expect(newState.structures.size).toBe(0);
    });

    it('creates new structures when triangle is detected', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2, 3]) }),
        createMockNode({ id: 2, connections: new Set([1, 3]) }),
        createMockNode({ id: 3, connections: new Set([1, 2]) }),
      ]);
      const lines = createLinesMap([
        createMockLine({ id: 1, fromNodeId: 1, toNodeId: 2 }),
        createMockLine({ id: 2, fromNodeId: 2, toNodeId: 3 }),
        createMockLine({ id: 3, fromNodeId: 1, toNodeId: 3 }),
      ]);

      const state = createMockState({
        nodes,
        lines,
        structures: new Map(),
        nextStructureId: 1,
      });
      const config = createMockConfig();

      const newState = processStructures(state, config, 100, 1000);

      expect(newState.structures.size).toBe(1);
      expect(newState.nextStructureId).toBe(2);
    });

    it('respects maxStructures limit', () => {
      // Create 6 separate triangles but limit is 5
      const nodes = new Map<number, ReturnType<typeof createMockNode>>();
      const nodeIdBase = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

      // Create 6 triangles: (1,2,3), (4,5,6), (7,8,9), (10,11,12), (13,14,15), (16,17,18)
      for (let t = 0; t < 6; t++) {
        const base = t * 3;
        const n1 = base + 1;
        const n2 = base + 2;
        const n3 = base + 3;
        nodes.set(n1, createMockNode({ id: n1, connections: new Set([n2, n3]) }));
        nodes.set(n2, createMockNode({ id: n2, connections: new Set([n1, n3]) }));
        nodes.set(n3, createMockNode({ id: n3, connections: new Set([n1, n2]) }));
      }

      const state = createMockState({
        nodes,
        structures: new Map(),
        nextStructureId: 1,
      });
      const config = createMockConfig({ isMobile: false });

      const newState = processStructures(state, config, 100, 1000);

      // Should only create up to LIMITS.STRUCTURES_MAX (5) structures
      expect(newState.structures.size).toBeLessThanOrEqual(LIMITS.STRUCTURES_MAX);
    });

    it('increments nextStructureId for each new structure', () => {
      const nodes = createNodesMap([
        createMockNode({ id: 1, connections: new Set([2, 3]) }),
        createMockNode({ id: 2, connections: new Set([1, 3]) }),
        createMockNode({ id: 3, connections: new Set([1, 2]) }),
      ]);

      const state = createMockState({
        nodes,
        structures: new Map(),
        nextStructureId: 5,
      });
      const config = createMockConfig();

      const newState = processStructures(state, config, 100, 1000);

      expect(newState.nextStructureId).toBe(6);
    });
  });
});
