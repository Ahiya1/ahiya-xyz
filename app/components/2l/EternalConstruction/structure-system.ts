/**
 * Structure system for EternalConstruction
 * Handles structure detection (3+ interconnected nodes),
 * structure lifecycle (persistence and fading)
 */

import type {
  Node,
  Line,
  Structure,
  AnimationState,
  CanvasConfig,
  StructurePhase,
} from './types';
import { TIMING, LIMITS, PHYSICS } from './constants';
import { easeOutQuad, clamp, randomInRange } from './easing';

/**
 * Find all nodes connected to a given node
 * @pure
 */
export function getConnectedNodes(
  nodeId: number,
  nodes: Map<number, Node>
): Set<number> {
  const node = nodes.get(nodeId);
  if (!node) return new Set();
  return new Set(node.connections);
}

/**
 * Check if a set of nodes forms a structure (all mutually connected)
 * A structure requires MIN_NODES_FOR_STRUCTURE (3) or more nodes
 * where each node is connected to every other node in the set
 * @pure
 */
export function isValidStructure(
  nodeIds: Set<number>,
  nodes: Map<number, Node>
): boolean {
  if (nodeIds.size < PHYSICS.MIN_NODES_FOR_STRUCTURE) {
    return false;
  }

  const nodeArray = Array.from(nodeIds);

  // Check if all nodes exist and are mutually connected
  for (let i = 0; i < nodeArray.length; i++) {
    const node = nodes.get(nodeArray[i]);
    if (!node) return false;

    // Check connections to all other nodes in the set
    for (let j = i + 1; j < nodeArray.length; j++) {
      if (!node.connections.has(nodeArray[j])) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Find all lines that connect nodes within a structure
 * @pure
 */
export function findStructureLines(
  nodeIds: Set<number>,
  lines: Map<number, Line>
): Set<number> {
  const lineIds = new Set<number>();

  for (const [lineId, line] of lines) {
    if (nodeIds.has(line.fromNodeId) && nodeIds.has(line.toNodeId)) {
      lineIds.add(lineId);
    }
  }

  return lineIds;
}

/**
 * Detect potential structures from nodes with 2+ connections
 * Uses a simple heuristic: find triangles (3 mutually connected nodes)
 * @pure
 */
export function detectStructures(
  nodes: Map<number, Node>,
  lines: Map<number, Line>,
  existingStructures: Map<number, Structure>
): Set<number>[] {
  const candidates: Set<number>[] = [];
  const existingNodeSets = new Set(
    Array.from(existingStructures.values()).map((s) =>
      Array.from(s.nodeIds).sort().join(',')
    )
  );

  // Find nodes with 2+ connections (potential structure vertices)
  const nodesWithConnections: Node[] = [];
  for (const node of nodes.values()) {
    if (node.connections.size >= 2 && node.phase !== 'fading') {
      nodesWithConnections.push(node);
    }
  }

  // For each node with 2+ connections, check if any pair of its connections
  // are also connected to each other (forming a triangle)
  for (const node of nodesWithConnections) {
    const connectedIds = Array.from(node.connections);

    // Check all pairs of connected nodes
    for (let i = 0; i < connectedIds.length; i++) {
      for (let j = i + 1; j < connectedIds.length; j++) {
        const nodeA = nodes.get(connectedIds[i]);
        const nodeB = nodes.get(connectedIds[j]);

        if (!nodeA || !nodeB) continue;
        if (nodeA.phase === 'fading' || nodeB.phase === 'fading') continue;

        // Check if nodeA and nodeB are connected to each other
        if (nodeA.connections.has(nodeB.id)) {
          const triangleIds = new Set([node.id, nodeA.id, nodeB.id]);
          const key = Array.from(triangleIds).sort().join(',');

          // Don't add duplicates or existing structures
          if (!existingNodeSets.has(key)) {
            const isDuplicate = candidates.some(
              (c) => Array.from(c).sort().join(',') === key
            );
            if (!isDuplicate) {
              candidates.push(triangleIds);
            }
          }
        }
      }
    }
  }

  return candidates;
}

/**
 * Create a new structure from a set of node IDs
 * @pure
 */
export function createStructure(
  id: number,
  nodeIds: Set<number>,
  lines: Map<number, Line>,
  timestamp: number
): Structure {
  const lineIds = findStructureLines(nodeIds, lines);
  const lifespan = randomInRange(TIMING.STRUCTURE_LIFESPAN_MIN, TIMING.STRUCTURE_LIFESPAN_MAX);

  return {
    id,
    nodeIds: new Set(nodeIds),
    lineIds,
    opacity: 0.6, // Locked structure opacity
    createdAt: timestamp,
    lifespan,
    age: 0,
    phase: 'active',
  };
}

/**
 * Update structure age and handle phase transitions
 * Returns null if structure should be removed
 * @pure
 */
export function updateStructure(
  structure: Structure,
  deltaTime: number,
  nodes: Map<number, Node>
): Structure | null {
  const newAge = structure.age + deltaTime;
  const fadeOutStart = structure.lifespan - TIMING.STRUCTURE_FADE_OUT;

  // Check if all component nodes still exist and are not fading
  const allNodesValid = Array.from(structure.nodeIds).every((nodeId) => {
    const node = nodes.get(nodeId);
    return node && node.phase !== 'fading';
  });

  if (!allNodesValid) {
    // Structure should be removed if any node is gone or fading
    return null;
  }

  let newPhase: StructurePhase = structure.phase;
  let newOpacity = structure.opacity;

  if (newAge >= fadeOutStart) {
    newPhase = 'fading';
    const fadeProgress = (newAge - fadeOutStart) / TIMING.STRUCTURE_FADE_OUT;
    newOpacity = 0.6 * (1 - easeOutQuad(clamp(fadeProgress, 0, 1)));
  }

  // Remove if fading is complete
  if (newAge >= structure.lifespan) {
    return null;
  }

  return {
    ...structure,
    age: newAge,
    phase: newPhase,
    opacity: newOpacity,
  };
}

/**
 * Check if a structure should be removed
 * @pure
 */
export function shouldRemoveStructure(
  structure: Structure,
  nodes: Map<number, Node>
): boolean {
  // Remove if lifespan exceeded
  if (structure.age >= structure.lifespan) {
    return true;
  }

  // Remove if any component node is gone or fading
  for (const nodeId of structure.nodeIds) {
    const node = nodes.get(nodeId);
    if (!node || node.phase === 'fading') {
      return true;
    }
  }

  return false;
}

/**
 * Get structure limits based on platform
 * @pure
 */
export function getStructureLimits(isMobile: boolean): {
  maxStructures: number;
} {
  return {
    maxStructures: isMobile ? LIMITS.STRUCTURES_MOBILE : LIMITS.STRUCTURES_MAX,
  };
}

/**
 * Process structures: detect new ones, update existing, remove completed
 * @pure
 */
export function processStructures(
  state: AnimationState,
  config: CanvasConfig,
  deltaTime: number,
  timestamp: number
): AnimationState {
  const { maxStructures } = getStructureLimits(config.isMobile);
  const newStructures = new Map<number, Structure>();
  let nextStructureId = state.nextStructureId;

  // Update existing structures
  for (const [id, structure] of state.structures) {
    const updated = updateStructure(structure, deltaTime, state.nodes);
    if (updated) {
      newStructures.set(id, updated);
    }
  }

  // Detect and create new structures if under limit
  if (newStructures.size < maxStructures) {
    const candidates = detectStructures(state.nodes, state.lines, newStructures);

    for (const nodeIds of candidates) {
      if (newStructures.size >= maxStructures) break;

      // Validate the structure
      if (isValidStructure(nodeIds, state.nodes)) {
        const structure = createStructure(
          nextStructureId,
          nodeIds,
          state.lines,
          timestamp
        );
        newStructures.set(nextStructureId, structure);
        nextStructureId++;
      }
    }
  }

  return {
    ...state,
    structures: newStructures,
    nextStructureId,
  };
}
