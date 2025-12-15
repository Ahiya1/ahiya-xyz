/**
 * Line system for EternalConstruction canvas animation
 * Handles line creation, updates, and lifecycle management
 * All functions are pure with no side effects
 */

import type { Line, Node, CanvasConfig, Point } from './types';
import { TIMING, LIMITS } from './constants';
import { easeOutCubic, lerp, clamp } from './easing';

/**
 * Create a new line between two nodes
 * @param id - Unique line identifier
 * @param fromNode - Source node
 * @param toNode - Target node
 * @param currentTime - Current timestamp in ms
 * @returns A new Line object in extending phase
 * @pure
 */
export function createLine(
  id: number,
  fromNode: Node,
  toNode: Node,
  currentTime: number
): Line {
  const duration = randomInRange(TIMING.LINE_TRAVEL_MIN, TIMING.LINE_TRAVEL_MAX);

  return {
    id,
    fromNodeId: fromNode.id,
    toNodeId: toNode.id,
    progress: 0,
    phase: 'extending',
    startTime: currentTime,
    duration,
    opacity: 1,
  };
}

/**
 * Update a line's state based on elapsed time
 * @param line - The line to update
 * @param currentTime - Current timestamp in ms
 * @returns Updated line, or null if the line should be removed
 * @pure
 */
export function updateLine(
  line: Line,
  currentTime: number
): Line | null {
  const elapsed = currentTime - line.startTime;

  switch (line.phase) {
    case 'extending': {
      // Handle zero or negative duration (line is instantly complete)
      if (line.duration <= 0) {
        return {
          ...line,
          progress: 1,
          phase: 'locked',
        };
      }

      // Calculate raw progress (0-1) based on time
      const rawProgress = clamp(elapsed / line.duration, 0, 1);
      // Apply easing for smooth extension
      const easedProgress = easeOutCubic(rawProgress);

      // Check if line reached target
      if (rawProgress >= 1) {
        return {
          ...line,
          progress: 1,
          phase: 'locked',
        };
      }

      return {
        ...line,
        progress: easedProgress,
      };
    }

    case 'locked':
      // Locked lines persist until nodes are removed
      return line;

    case 'fading': {
      // Calculate fade progress
      const fadeStart = line.startTime + line.duration;
      const fadeElapsed = currentTime - fadeStart;
      const fadeProgress = clamp(fadeElapsed / TIMING.NODE_FADE_OUT, 0, 1);

      if (fadeProgress >= 1) {
        return null; // Remove the line
      }

      return {
        ...line,
        opacity: 1 - fadeProgress,
      };
    }

    default:
      return line;
  }
}

/**
 * Calculate the current progress of a line with easing applied
 * @param line - The line to calculate progress for
 * @param currentTime - Current timestamp in ms
 * @returns Progress value 0-1 with easing applied
 * @pure
 */
export function calculateLineProgress(line: Line, currentTime: number): number {
  if (line.phase === 'locked' || line.phase === 'fading') {
    return 1; // Locked/fading lines are fully extended
  }

  // Handle zero or negative duration (line is instantly complete)
  if (line.duration <= 0) {
    return 1;
  }

  const elapsed = currentTime - line.startTime;
  const rawProgress = clamp(elapsed / line.duration, 0, 1);
  return easeOutCubic(rawProgress);
}

/**
 * Calculate the current endpoint of a line based on its progress
 * @param fromNode - Source node
 * @param toNode - Target node
 * @param progress - Line progress 0-1 (already eased)
 * @returns Current endpoint position
 * @pure
 */
export function calculateLineEndpoint(
  fromNode: Node,
  toNode: Node,
  progress: number
): Point {
  return {
    x: lerp(fromNode.x, toNode.x, progress),
    y: lerp(fromNode.y, toNode.y, progress),
  };
}

/**
 * Determine if a new line should be spawned
 * @param nodes - Map of current nodes
 * @param lines - Map of current lines
 * @param maxLines - Maximum allowed lines
 * @param lastSpawnTime - Timestamp of last spawn
 * @param currentTime - Current timestamp
 * @returns true if a new line should spawn
 * @pure
 */
export function shouldSpawnLine(
  nodes: Map<number, Node>,
  lines: Map<number, Line>,
  maxLines: number,
  lastSpawnTime: number,
  currentTime: number
): boolean {
  // Check line limit
  if (lines.size >= maxLines) {
    return false;
  }

  // Check spawn interval
  if (currentTime - lastSpawnTime < TIMING.LINE_SPAWN_INTERVAL) {
    return false;
  }

  // Need at least 2 active nodes to draw a line
  const activeNodes = getActiveNodes(nodes);
  if (activeNodes.length < 2) {
    return false;
  }

  return true;
}

/**
 * Find a suitable target node for a line from a source node
 * @param fromNode - Source node
 * @param nodes - Map of all nodes
 * @param existingLines - Map of existing lines (to avoid duplicates)
 * @returns A target node, or null if no valid target exists
 * @pure (except for Math.random)
 */
export function findTargetNode(
  fromNode: Node,
  nodes: Map<number, Node>,
  existingLines: Map<number, Line>
): Node | null {
  // Get active nodes excluding the source
  const candidates: Node[] = [];

  for (const node of nodes.values()) {
    // Skip self
    if (node.id === fromNode.id) continue;

    // Skip fading nodes
    if (node.phase === 'fading') continue;

    // Skip nodes already connected by an existing line
    const alreadyConnected = hasExistingConnection(
      fromNode.id,
      node.id,
      existingLines
    );
    if (alreadyConnected) continue;

    candidates.push(node);
  }

  if (candidates.length === 0) {
    return null;
  }

  // Random selection from candidates
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}

/**
 * Select a random source node for spawning a new line
 * @param nodes - Map of all nodes
 * @returns A source node, or null if no valid source exists
 * @pure (except for Math.random)
 */
export function selectSourceNode(nodes: Map<number, Node>): Node | null {
  const activeNodes = getActiveNodes(nodes);

  if (activeNodes.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * activeNodes.length);
  return activeNodes[index];
}

/**
 * Get the line limits based on device type
 * @param isMobile - Whether on mobile device
 * @returns Maximum line count
 * @pure
 */
export function getLineLimits(isMobile: boolean): number {
  return isMobile ? LIMITS.LINES_MOBILE : LIMITS.LINES_MAX;
}

/**
 * Mark a line as fading (to be removed)
 * @param line - The line to mark for removal
 * @param currentTime - Current timestamp
 * @returns Updated line in fading phase
 * @pure
 */
export function startLineFading(line: Line, currentTime: number): Line {
  return {
    ...line,
    phase: 'fading',
    startTime: currentTime - line.duration, // Reset timing for fade calculation
  };
}

/**
 * Check if a line should be removed because one of its nodes is gone
 * @param line - The line to check
 * @param nodes - Map of existing nodes
 * @returns true if line should be removed
 * @pure
 */
export function shouldRemoveLine(line: Line, nodes: Map<number, Node>): boolean {
  // Check if source node exists and is not completely faded
  const fromNode = nodes.get(line.fromNodeId);
  if (!fromNode || (fromNode.phase === 'fading' && fromNode.opacity <= 0)) {
    return true;
  }

  // Check if target node exists and is not completely faded
  const toNode = nodes.get(line.toNodeId);
  if (!toNode || (toNode.phase === 'fading' && toNode.opacity <= 0)) {
    return true;
  }

  // Remove if line has finished fading
  if (line.phase === 'fading' && line.opacity <= 0) {
    return true;
  }

  return false;
}

/**
 * Get all lines that are currently extending (not locked or fading)
 * @param lines - Map of all lines
 * @returns Array of extending lines
 * @pure
 */
export function getExtendingLines(lines: Map<number, Line>): Line[] {
  const extending: Line[] = [];
  for (const line of lines.values()) {
    if (line.phase === 'extending') {
      extending.push(line);
    }
  }
  return extending;
}

/**
 * Get all locked lines (fully connected)
 * @param lines - Map of all lines
 * @returns Array of locked lines
 * @pure
 */
export function getLockedLines(lines: Map<number, Line>): Line[] {
  const locked: Line[] = [];
  for (const line of lines.values()) {
    if (line.phase === 'locked') {
      locked.push(line);
    }
  }
  return locked;
}

// ============ Helper Functions ============

/**
 * Get all active (non-fading) nodes
 * @pure
 */
function getActiveNodes(nodes: Map<number, Node>): Node[] {
  const active: Node[] = [];
  for (const node of nodes.values()) {
    if (node.phase !== 'fading') {
      active.push(node);
    }
  }
  return active;
}

/**
 * Check if there's already a line between two nodes
 * @pure
 */
function hasExistingConnection(
  nodeId1: number,
  nodeId2: number,
  lines: Map<number, Line>
): boolean {
  for (const line of lines.values()) {
    // Check both directions
    if (
      (line.fromNodeId === nodeId1 && line.toNodeId === nodeId2) ||
      (line.fromNodeId === nodeId2 && line.toNodeId === nodeId1)
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Generate random number in range
 * @pure (except for Math.random)
 */
function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
