/**
 * Connection system for EternalConstruction
 * Handles connection detection when lines reach their targets,
 * pulse effect creation and updates
 */

import type {
  Line,
  Node,
  ConnectionPulse,
  AnimationState,
  Point,
} from './types';
import { TIMING } from './constants';
import { easeOutExpo, clamp } from './easing';

/**
 * Check if a line has reached its target node and should create a connection
 * A connection occurs when progress >= 1 and the line is still extending (not already locked)
 * @pure
 */
export function checkLineConnection(line: Line, toNode: Node | undefined): boolean {
  if (!toNode) return false;
  return line.progress >= 1 && line.phase === 'extending';
}

/**
 * Create a connection pulse effect at the target node position
 * @pure
 */
export function createPulse(
  id: number,
  position: Point,
  timestamp: number
): ConnectionPulse {
  return {
    id,
    x: position.x,
    y: position.y,
    progress: 0,
    startTime: timestamp,
  };
}

/**
 * Update a connection pulse progress based on delta time
 * Returns null if pulse is complete (should be removed)
 * @pure
 */
export function updatePulse(
  pulse: ConnectionPulse,
  deltaTime: number
): ConnectionPulse | null {
  const newProgress = pulse.progress + deltaTime / TIMING.CONNECTION_PULSE_DURATION;

  if (newProgress >= 1) {
    return null; // Pulse is complete, should be removed
  }

  return {
    ...pulse,
    progress: clamp(newProgress, 0, 1),
  };
}

/**
 * Get the opacity for a pulse based on its progress
 * Uses easeOutExpo for sharp initial brightness, then long fade
 * @pure
 */
export function getPulseOpacity(progress: number): number {
  // Fade from 1 to 0 as progress increases
  // easeOutExpo creates sharp initial fade then long tail
  return 1 - easeOutExpo(progress);
}

/**
 * Add a connection between two nodes (bidirectional)
 * Mutates the node objects' connection sets
 * @impure
 */
export function addConnectionToNodes(
  fromNode: Node,
  toNode: Node
): void {
  fromNode.connections.add(toNode.id);
  toNode.connections.add(fromNode.id);
}

/**
 * Create a new connection when a line reaches its target
 * Returns the pulse to add and updates nodes in place
 * @impure (modifies node connections)
 */
export function createConnection(
  line: Line,
  fromNode: Node,
  toNode: Node,
  nextPulseId: number,
  timestamp: number
): ConnectionPulse {
  // Add bidirectional connection
  addConnectionToNodes(fromNode, toNode);

  // Create pulse at target node position
  return createPulse(nextPulseId, { x: toNode.x, y: toNode.y }, timestamp);
}

/**
 * Process all lines and detect/create connections
 * Returns updated state with new pulses and locked lines
 * @pure (returns new state, does not mutate input)
 */
export function processConnections(
  state: AnimationState,
  timestamp: number
): AnimationState {
  const newPulses = [...state.pulses];
  const newLines = new Map(state.lines);
  const newNodes = state.nodes; // Node connections are mutated in place for performance
  let nextPulseId = state.nextPulseId;

  for (const [lineId, line] of newLines) {
    const fromNode = newNodes.get(line.fromNodeId);
    const toNode = newNodes.get(line.toNodeId);

    if (!fromNode || !toNode) continue;

    if (checkLineConnection(line, toNode)) {
      // Create the connection and pulse
      const pulse = createConnection(line, fromNode, toNode, nextPulseId, timestamp);
      newPulses.push(pulse);
      nextPulseId++;

      // Lock the line
      newLines.set(lineId, {
        ...line,
        phase: 'locked',
        progress: 1,
      });
    }
  }

  return {
    ...state,
    lines: newLines,
    pulses: newPulses,
    nextPulseId,
  };
}

/**
 * Update all pulses and remove completed ones
 * @pure
 */
export function updatePulses(
  state: AnimationState,
  deltaTime: number
): AnimationState {
  const newPulses: ConnectionPulse[] = [];

  for (const pulse of state.pulses) {
    const updated = updatePulse(pulse, deltaTime);
    if (updated) {
      newPulses.push(updated);
    }
  }

  return {
    ...state,
    pulses: newPulses,
  };
}

/**
 * Get connection limits based on platform
 * @pure
 */
export function getConnectionLimits(isMobile: boolean): {
  maxPulses: number;
} {
  return {
    maxPulses: isMobile ? 5 : 10,
  };
}
