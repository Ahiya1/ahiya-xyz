/**
 * Tests for connection-system.ts
 * Covers connection detection, pulse creation/updates, and node connection tracking
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  checkLineConnection,
  createPulse,
  updatePulse,
  getPulseOpacity,
  addConnectionToNodes,
  createConnection,
  processConnections,
  updatePulses,
  getConnectionLimits,
} from '../connection-system';
import { TIMING } from '../constants';
import {
  createMockLine,
  createMockNode,
  createMockPulse,
  createMockState,
  createNodesMap,
  createLinesMap,
} from './factories';

describe('connection-system', () => {
  describe('checkLineConnection', () => {
    it('returns true when line.progress >= 1 and phase is extending', () => {
      const line = createMockLine({ progress: 1, phase: 'extending' });
      const toNode = createMockNode({ id: 2 });

      expect(checkLineConnection(line, toNode)).toBe(true);
    });

    it('returns true when line.progress > 1 and phase is extending', () => {
      const line = createMockLine({ progress: 1.05, phase: 'extending' });
      const toNode = createMockNode({ id: 2 });

      expect(checkLineConnection(line, toNode)).toBe(true);
    });

    it('returns false when progress < 1', () => {
      const line = createMockLine({ progress: 0.99, phase: 'extending' });
      const toNode = createMockNode({ id: 2 });

      expect(checkLineConnection(line, toNode)).toBe(false);
    });

    it('returns false when line is already locked', () => {
      const line = createMockLine({ progress: 1, phase: 'locked' });
      const toNode = createMockNode({ id: 2 });

      expect(checkLineConnection(line, toNode)).toBe(false);
    });

    it('returns false when line is fading', () => {
      const line = createMockLine({ progress: 1, phase: 'fading' });
      const toNode = createMockNode({ id: 2 });

      expect(checkLineConnection(line, toNode)).toBe(false);
    });

    it('returns false when toNode is undefined', () => {
      const line = createMockLine({ progress: 1, phase: 'extending' });

      expect(checkLineConnection(line, undefined)).toBe(false);
    });
  });

  describe('createPulse', () => {
    it('returns valid pulse at correct position', () => {
      const position = { x: 200, y: 300 };
      const timestamp = 1000;

      const pulse = createPulse(1, position, timestamp);

      expect(pulse).toEqual({
        id: 1,
        x: 200,
        y: 300,
        progress: 0,
        startTime: 1000,
      });
    });

    it('creates pulse with initial progress of 0', () => {
      const pulse = createPulse(5, { x: 0, y: 0 }, 5000);

      expect(pulse.progress).toBe(0);
    });

    it('assigns correct ID', () => {
      const pulse = createPulse(42, { x: 100, y: 100 }, 0);

      expect(pulse.id).toBe(42);
    });
  });

  describe('updatePulse', () => {
    it('increases progress with delta time', () => {
      const pulse = createMockPulse({ progress: 0 });
      const deltaTime = TIMING.CONNECTION_PULSE_DURATION / 2; // Half duration

      const updated = updatePulse(pulse, deltaTime);

      expect(updated).not.toBeNull();
      expect(updated!.progress).toBeCloseTo(0.5, 2);
    });

    it('returns null when progress >= 1 (pulse complete)', () => {
      const pulse = createMockPulse({ progress: 0.9 });
      const deltaTime = TIMING.CONNECTION_PULSE_DURATION; // Full duration more

      const updated = updatePulse(pulse, deltaTime);

      expect(updated).toBeNull();
    });

    it('returns null when progress would exceed 1 (not clamping)', () => {
      const pulse = createMockPulse({ progress: 0.8 });
      const deltaTime = TIMING.CONNECTION_PULSE_DURATION / 2; // Would make progress 1.3

      const updated = updatePulse(pulse, deltaTime);

      // Function returns null instead of clamping - pulse is complete
      expect(updated).toBeNull();
    });

    it('clamps progress when slightly under 1', () => {
      const pulse = createMockPulse({ progress: 0.8 });
      const deltaTime = TIMING.CONNECTION_PULSE_DURATION / 10; // Would make progress 0.9

      const updated = updatePulse(pulse, deltaTime);

      expect(updated).not.toBeNull();
      expect(updated!.progress).toBeCloseTo(0.9, 1);
      expect(updated!.progress).toBeLessThanOrEqual(1);
    });

    it('preserves other pulse properties', () => {
      const pulse = createMockPulse({
        id: 5,
        x: 123,
        y: 456,
        progress: 0.2,
        startTime: 999,
      });

      const updated = updatePulse(pulse, 50);

      expect(updated).not.toBeNull();
      expect(updated!.id).toBe(5);
      expect(updated!.x).toBe(123);
      expect(updated!.y).toBe(456);
      expect(updated!.startTime).toBe(999);
    });
  });

  describe('getPulseOpacity', () => {
    it('returns 1 at progress 0 (start)', () => {
      expect(getPulseOpacity(0)).toBe(1);
    });

    it('returns 0 at progress 1 (end)', () => {
      expect(getPulseOpacity(1)).toBe(0);
    });

    it('decreases as progress increases', () => {
      const opacity0 = getPulseOpacity(0);
      const opacity25 = getPulseOpacity(0.25);
      const opacity50 = getPulseOpacity(0.5);
      const opacity75 = getPulseOpacity(0.75);
      const opacity100 = getPulseOpacity(1);

      expect(opacity25).toBeLessThan(opacity0);
      expect(opacity50).toBeLessThan(opacity25);
      expect(opacity75).toBeLessThan(opacity50);
      expect(opacity100).toBeLessThan(opacity75);
    });

    it('uses easeOutExpo curve (sharp initial fade)', () => {
      // easeOutExpo has rapid initial change
      const opacity10 = getPulseOpacity(0.1);
      // Should be significantly faded at only 10% progress
      expect(opacity10).toBeLessThan(0.6);
    });
  });

  describe('addConnectionToNodes', () => {
    it('adds bidirectional connection to both nodes', () => {
      const fromNode = createMockNode({ id: 1, connections: new Set() });
      const toNode = createMockNode({ id: 2, connections: new Set() });

      addConnectionToNodes(fromNode, toNode);

      expect(fromNode.connections.has(2)).toBe(true);
      expect(toNode.connections.has(1)).toBe(true);
    });

    it('handles existing connections gracefully', () => {
      const fromNode = createMockNode({ id: 1, connections: new Set([2, 3]) });
      const toNode = createMockNode({ id: 2, connections: new Set([1, 4]) });

      // Should not throw even if connection exists
      addConnectionToNodes(fromNode, toNode);

      expect(fromNode.connections.has(2)).toBe(true);
      expect(toNode.connections.has(1)).toBe(true);
      // Should preserve other connections
      expect(fromNode.connections.has(3)).toBe(true);
      expect(toNode.connections.has(4)).toBe(true);
    });

    it('updates connection size correctly', () => {
      const fromNode = createMockNode({ id: 1, connections: new Set() });
      const toNode = createMockNode({ id: 2, connections: new Set() });

      addConnectionToNodes(fromNode, toNode);

      expect(fromNode.connections.size).toBe(1);
      expect(toNode.connections.size).toBe(1);
    });
  });

  describe('createConnection', () => {
    it('creates pulse at toNode position', () => {
      const line = createMockLine({ id: 1, fromNodeId: 1, toNodeId: 2 });
      const fromNode = createMockNode({ id: 1, x: 100, y: 100 });
      const toNode = createMockNode({ id: 2, x: 200, y: 300 });

      const pulse = createConnection(line, fromNode, toNode, 1, 1000);

      expect(pulse.x).toBe(200);
      expect(pulse.y).toBe(300);
    });

    it('adds connections to both nodes', () => {
      const line = createMockLine({ id: 1, fromNodeId: 1, toNodeId: 2 });
      const fromNode = createMockNode({ id: 1, connections: new Set() });
      const toNode = createMockNode({ id: 2, connections: new Set() });

      createConnection(line, fromNode, toNode, 1, 1000);

      expect(fromNode.connections.has(2)).toBe(true);
      expect(toNode.connections.has(1)).toBe(true);
    });

    it('uses provided pulse ID', () => {
      const line = createMockLine();
      const fromNode = createMockNode({ id: 1 });
      const toNode = createMockNode({ id: 2 });

      const pulse = createConnection(line, fromNode, toNode, 42, 1000);

      expect(pulse.id).toBe(42);
    });
  });

  describe('processConnections', () => {
    it('creates pulse when line reaches target', () => {
      const fromNode = createMockNode({ id: 1, x: 0, y: 0 });
      const toNode = createMockNode({ id: 2, x: 100, y: 100 });
      const line = createMockLine({
        id: 1,
        fromNodeId: 1,
        toNodeId: 2,
        progress: 1,
        phase: 'extending',
      });

      const state = createMockState({
        nodes: createNodesMap([fromNode, toNode]),
        lines: createLinesMap([line]),
        pulses: [],
        nextPulseId: 1,
      });

      const newState = processConnections(state, 1000);

      expect(newState.pulses).toHaveLength(1);
      expect(newState.pulses[0].x).toBe(100);
      expect(newState.pulses[0].y).toBe(100);
    });

    it('locks line when connection is created', () => {
      const fromNode = createMockNode({ id: 1 });
      const toNode = createMockNode({ id: 2 });
      const line = createMockLine({
        id: 1,
        fromNodeId: 1,
        toNodeId: 2,
        progress: 1,
        phase: 'extending',
      });

      const state = createMockState({
        nodes: createNodesMap([fromNode, toNode]),
        lines: createLinesMap([line]),
      });

      const newState = processConnections(state, 1000);

      const updatedLine = newState.lines.get(1);
      expect(updatedLine?.phase).toBe('locked');
      expect(updatedLine?.progress).toBe(1);
    });

    it('increments nextPulseId for each new pulse', () => {
      const node1 = createMockNode({ id: 1 });
      const node2 = createMockNode({ id: 2 });
      const node3 = createMockNode({ id: 3 });
      const line1 = createMockLine({
        id: 1,
        fromNodeId: 1,
        toNodeId: 2,
        progress: 1,
        phase: 'extending',
      });
      const line2 = createMockLine({
        id: 2,
        fromNodeId: 2,
        toNodeId: 3,
        progress: 1,
        phase: 'extending',
      });

      const state = createMockState({
        nodes: createNodesMap([node1, node2, node3]),
        lines: createLinesMap([line1, line2]),
        nextPulseId: 1,
      });

      const newState = processConnections(state, 1000);

      expect(newState.pulses).toHaveLength(2);
      expect(newState.nextPulseId).toBe(3);
    });

    it('does not create pulse for already locked lines', () => {
      const fromNode = createMockNode({ id: 1 });
      const toNode = createMockNode({ id: 2 });
      const line = createMockLine({
        id: 1,
        fromNodeId: 1,
        toNodeId: 2,
        progress: 1,
        phase: 'locked',
      });

      const state = createMockState({
        nodes: createNodesMap([fromNode, toNode]),
        lines: createLinesMap([line]),
        pulses: [],
      });

      const newState = processConnections(state, 1000);

      expect(newState.pulses).toHaveLength(0);
    });

    it('skips lines with missing nodes', () => {
      const fromNode = createMockNode({ id: 1 });
      // No toNode (id: 2) in nodes map
      const line = createMockLine({
        id: 1,
        fromNodeId: 1,
        toNodeId: 2,
        progress: 1,
        phase: 'extending',
      });

      const state = createMockState({
        nodes: createNodesMap([fromNode]),
        lines: createLinesMap([line]),
        pulses: [],
      });

      const newState = processConnections(state, 1000);

      expect(newState.pulses).toHaveLength(0);
    });
  });

  describe('updatePulses', () => {
    it('updates all pulse progress values', () => {
      const pulse1 = createMockPulse({ id: 1, progress: 0 });
      const pulse2 = createMockPulse({ id: 2, progress: 0.3 });

      const state = createMockState({
        pulses: [pulse1, pulse2],
      });

      const deltaTime = TIMING.CONNECTION_PULSE_DURATION / 4;
      const newState = updatePulses(state, deltaTime);

      expect(newState.pulses[0].progress).toBeCloseTo(0.25, 2);
      expect(newState.pulses[1].progress).toBeCloseTo(0.55, 2);
    });

    it('removes completed pulses', () => {
      const pulse1 = createMockPulse({ id: 1, progress: 0.9 });
      const pulse2 = createMockPulse({ id: 2, progress: 0.2 });

      const state = createMockState({
        pulses: [pulse1, pulse2],
      });

      const deltaTime = TIMING.CONNECTION_PULSE_DURATION / 2;
      const newState = updatePulses(state, deltaTime);

      // pulse1 should be removed (would exceed 1.0)
      expect(newState.pulses).toHaveLength(1);
      expect(newState.pulses[0].id).toBe(2);
    });

    it('returns empty array when all pulses complete', () => {
      const pulse1 = createMockPulse({ id: 1, progress: 0.95 });
      const pulse2 = createMockPulse({ id: 2, progress: 0.98 });

      const state = createMockState({
        pulses: [pulse1, pulse2],
      });

      const deltaTime = TIMING.CONNECTION_PULSE_DURATION;
      const newState = updatePulses(state, deltaTime);

      expect(newState.pulses).toHaveLength(0);
    });
  });

  describe('getConnectionLimits', () => {
    it('returns correct limits for desktop', () => {
      const limits = getConnectionLimits(false);

      expect(limits.maxPulses).toBe(10);
    });

    it('returns reduced limits for mobile', () => {
      const limits = getConnectionLimits(true);

      expect(limits.maxPulses).toBe(5);
    });
  });
});
