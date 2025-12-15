/**
 * State management for EternalConstruction
 * Orchestrates all animation systems and provides the main update loop
 */

import type { AnimationState, CanvasConfig } from './types';
import { updateNodes, initializeNodes } from './node-system';
import {
  updateLine,
  shouldSpawnLine,
  selectSourceNode,
  findTargetNode,
  createLine,
  shouldRemoveLine,
  getLineLimits,
} from './line-system';
import { processConnections, updatePulses } from './connection-system';
import { processStructures } from './structure-system';

/**
 * Create an empty initial animation state
 * @pure
 */
export function createEmptyState(): AnimationState {
  return {
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
}

/**
 * Create initial animation state with pre-populated nodes
 * @pure (given deterministic random)
 */
export function createInitialState(
  config: CanvasConfig,
  timestamp: number = performance.now()
): AnimationState {
  const { nodes, nextNodeId } = initializeNodes(config, timestamp);

  return {
    nodes,
    lines: new Map(),
    structures: new Map(),
    pulses: [],
    nextNodeId,
    nextLineId: 1,
    nextStructureId: 1,
    nextPulseId: 1,
    lastNodeSpawn: timestamp,
    lastLineSpawn: 0,
    frameCount: 0,
  };
}

/**
 * Update lines in the animation state
 * Handles line updates, removal, and spawning
 */
function updateLinesInState(
  state: AnimationState,
  config: CanvasConfig,
  deltaTime: number,
  currentTime: number
): AnimationState {
  const maxLines = getLineLimits(config.isMobile);
  const newLines = new Map(state.lines);

  // Update and remove finished lines
  const linesToRemove: number[] = [];
  for (const [lineId, line] of newLines) {
    if (shouldRemoveLine(line, state.nodes)) {
      linesToRemove.push(lineId);
      continue;
    }

    const updated = updateLine(line, currentTime);
    if (updated === null) {
      linesToRemove.push(lineId);
    } else {
      newLines.set(lineId, updated);
    }
  }

  for (const lineId of linesToRemove) {
    newLines.delete(lineId);
  }

  // Spawn new line if conditions are met
  let nextLineId = state.nextLineId;
  let lastLineSpawn = state.lastLineSpawn;

  if (shouldSpawnLine(state.nodes, newLines, maxLines, lastLineSpawn, currentTime)) {
    const sourceNode = selectSourceNode(state.nodes);
    if (sourceNode) {
      const targetNode = findTargetNode(sourceNode, state.nodes, newLines);
      if (targetNode) {
        const newLine = createLine(nextLineId, sourceNode, targetNode, currentTime);
        newLines.set(nextLineId, newLine);
        nextLineId++;
        lastLineSpawn = currentTime;
      }
    }
  }

  return {
    ...state,
    lines: newLines,
    nextLineId,
    lastLineSpawn,
  };
}

/**
 * Main state update function
 * Orchestrates all systems in the correct order:
 * 1. Update nodes (movement, lifecycle)
 * 2. Update lines (extension, removal, spawning)
 * 3. Process connections (detect completions, create pulses)
 * 4. Update pulses (animation, removal)
 * 5. Process structures (detect, update, remove)
 *
 * @pure
 */
export function updateState(
  state: AnimationState,
  config: CanvasConfig,
  deltaTime: number,
  timestamp: number
): AnimationState {
  // 1. Update nodes
  let newState = updateNodes(state, config, deltaTime, timestamp);

  // 2. Update lines
  newState = updateLinesInState(newState, config, deltaTime, timestamp);

  // 3. Process connections (detect line completions, create pulses)
  newState = processConnections(newState, timestamp);

  // 4. Update pulses
  newState = updatePulses(newState, deltaTime);

  // 5. Process structures
  newState = processStructures(newState, config, deltaTime, timestamp);

  // Increment frame count
  newState.frameCount++;

  return newState;
}

/**
 * Get a summary of current animation state (for debugging)
 */
export function getStateSummary(state: AnimationState): {
  nodeCount: number;
  lineCount: number;
  structureCount: number;
  pulseCount: number;
  frameCount: number;
} {
  return {
    nodeCount: state.nodes.size,
    lineCount: state.lines.size,
    structureCount: state.structures.size,
    pulseCount: state.pulses.length,
    frameCount: state.frameCount,
  };
}
