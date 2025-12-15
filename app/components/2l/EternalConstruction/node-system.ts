/**
 * Node system - pure functions for node lifecycle management
 * Handles spawning, drifting, phase transitions, and removal
 *
 * Node lifecycle: spawning -> active -> fading -> removed
 */

import type { Node, NodePhase, CanvasConfig, AnimationState } from './types';
import { TIMING, LIMITS, PHYSICS } from './constants';
import { easeInOutSine, easeOutQuad, clamp } from './easing';
import { randomPosition, randomVelocity, randomInRange, bounceVelocity, clampPosition } from './geometry';

/**
 * Get node count limits based on device type
 * @pure
 */
export function getNodeLimits(isMobile: boolean): { min: number; max: number } {
  if (isMobile) {
    return { min: LIMITS.NODES_MOBILE, max: LIMITS.NODES_MOBILE };
  }
  return { min: LIMITS.NODES_MIN, max: LIMITS.NODES_MAX };
}

/**
 * Create a new node at a random position with random velocity
 * @pure (given deterministic random)
 */
export function createNode(
  id: number,
  canvasWidth: number,
  canvasHeight: number
): Node {
  const position = randomPosition(canvasWidth, canvasHeight);
  const velocity = randomVelocity();
  const radius = randomInRange(PHYSICS.NODE_RADIUS_MIN, PHYSICS.NODE_RADIUS_MAX);
  const lifespan = randomInRange(TIMING.NODE_LIFESPAN_MIN, TIMING.NODE_LIFESPAN_MAX);

  return {
    id,
    x: position.x,
    y: position.y,
    vx: velocity.vx,
    vy: velocity.vy,
    radius,
    opacity: 0, // Starts invisible, fades in during 'spawning' phase
    phase: 'spawning',
    lifespan,
    age: 0,
    connections: new Set<number>(),
  };
}

/**
 * Calculate node opacity based on current phase and age
 * @pure
 */
export function calculateNodeOpacity(node: Node): number {
  const fadeInEnd = TIMING.NODE_FADE_IN;
  const fadeOutStart = node.lifespan - TIMING.NODE_FADE_OUT;

  switch (node.phase) {
    case 'spawning': {
      // Fade in with smooth easing
      const progress = clamp(node.age / fadeInEnd, 0, 1);
      return easeInOutSine(progress);
    }
    case 'active': {
      return 1;
    }
    case 'fading': {
      // Fade out with gentle easing
      const fadeProgress = clamp((node.age - fadeOutStart) / TIMING.NODE_FADE_OUT, 0, 1);
      return 1 - easeOutQuad(fadeProgress);
    }
    default:
      return 0;
  }
}

/**
 * Determine the new phase based on age and lifespan
 * @pure
 */
export function calculateNodePhase(node: Node): NodePhase {
  const fadeInEnd = TIMING.NODE_FADE_IN;
  const fadeOutStart = node.lifespan - TIMING.NODE_FADE_OUT;

  if (node.age < fadeInEnd) {
    return 'spawning';
  } else if (node.age < fadeOutStart) {
    return 'active';
  } else {
    return 'fading';
  }
}

/**
 * Check if a node should be removed (completed its lifecycle)
 * @pure
 */
export function shouldRemoveNode(node: Node): boolean {
  return node.age >= node.lifespan;
}

/**
 * Update a single node's state
 * Returns updated node or null if node should be removed
 * @pure
 */
export function updateNode(
  node: Node,
  deltaTime: number,
  canvasWidth: number,
  canvasHeight: number
): Node | null {
  // Update age
  const newAge = node.age + deltaTime;

  // Check if node should be removed
  if (newAge >= node.lifespan) {
    return null;
  }

  // Convert delta time to seconds for physics
  const dt = deltaTime / 1000;

  // Calculate new position
  let newX = node.x + node.vx * dt;
  let newY = node.y + node.vy * dt;

  // Handle boundary bouncing
  const { vx: newVx, vy: newVy } = bounceVelocity(
    newX,
    newY,
    node.vx,
    node.vy,
    canvasWidth,
    canvasHeight
  );

  // Clamp position to bounds
  const clampedPos = clampPosition(newX, newY, canvasWidth, canvasHeight);
  newX = clampedPos.x;
  newY = clampedPos.y;

  // Create updated node
  const updatedNode: Node = {
    ...node,
    x: newX,
    y: newY,
    vx: newVx,
    vy: newVy,
    age: newAge,
  };

  // Calculate new phase and opacity
  updatedNode.phase = calculateNodePhase(updatedNode);
  updatedNode.opacity = calculateNodeOpacity(updatedNode);

  return updatedNode;
}

/**
 * Check if we should spawn a new node
 * @pure
 */
export function shouldSpawnNode(
  currentNodeCount: number,
  maxNodes: number,
  lastSpawnTime: number,
  currentTime: number
): boolean {
  // Don't spawn if at max capacity
  if (currentNodeCount >= maxNodes) {
    return false;
  }

  // Check spawn interval
  const timeSinceLastSpawn = currentTime - lastSpawnTime;
  return timeSinceLastSpawn >= TIMING.NODE_SPAWN_INTERVAL;
}

/**
 * Update all nodes in the state
 * Returns new state with updated nodes
 * @pure
 */
export function updateNodes(
  state: AnimationState,
  config: CanvasConfig,
  deltaTime: number,
  currentTime: number
): AnimationState {
  const { width, height, isMobile } = config;
  const limits = getNodeLimits(isMobile);

  // Create new nodes map
  const newNodes = new Map<number, Node>();

  // Update existing nodes
  for (const [id, node] of state.nodes) {
    const updated = updateNode(node, deltaTime, width, height);
    if (updated !== null) {
      newNodes.set(id, updated);
    }
  }

  // Check if we should spawn new nodes
  let nextNodeId = state.nextNodeId;
  let lastNodeSpawn = state.lastNodeSpawn;

  if (shouldSpawnNode(newNodes.size, limits.max, lastNodeSpawn, currentTime)) {
    const newNode = createNode(nextNodeId, width, height);
    newNodes.set(nextNodeId, newNode);
    nextNodeId++;
    lastNodeSpawn = currentTime;
  }

  return {
    ...state,
    nodes: newNodes,
    nextNodeId,
    lastNodeSpawn,
  };
}

/**
 * Initialize nodes for the initial state
 * @pure (given deterministic random)
 */
export function initializeNodes(
  config: CanvasConfig,
  startTime: number
): { nodes: Map<number, Node>; nextNodeId: number } {
  const { width, height, isMobile } = config;
  const limits = getNodeLimits(isMobile);
  const initialCount = Math.floor((limits.min + limits.max) / 2);

  const nodes = new Map<number, Node>();

  for (let i = 0; i < initialCount; i++) {
    const node = createNode(i, width, height);
    // Stagger ages so nodes don't all fade at once
    node.age = randomInRange(0, node.lifespan * 0.5);
    node.phase = calculateNodePhase(node);
    node.opacity = calculateNodeOpacity(node);
    nodes.set(i, node);
  }

  return {
    nodes,
    nextNodeId: initialCount,
  };
}
