// File: app/components/2l/EternalConstruction/geometry.ts
// Pure geometry functions for canvas calculations

import type { Point, Node } from './types';
import { PHYSICS } from './constants';

/**
 * Calculate Euclidean distance between two points
 * @pure
 */
export function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate distance between two nodes
 * @pure
 */
export function nodeDistance(n1: Node, n2: Node): number {
  return distance({ x: n1.x, y: n1.y }, { x: n2.x, y: n2.y });
}

/**
 * Generate random position within bounds with margin
 * @pure (given deterministic random)
 */
export function randomPosition(
  width: number,
  height: number,
  margin: number = PHYSICS.SPAWN_MARGIN
): Point {
  return {
    x: margin + Math.random() * (width - 2 * margin),
    y: margin + Math.random() * (height - 2 * margin),
  };
}

/**
 * Generate random velocity within speed range
 * @pure (given deterministic random)
 */
export function randomVelocity(
  minSpeed: number = PHYSICS.DRIFT_MIN,
  maxSpeed: number = PHYSICS.DRIFT_MAX
): { vx: number; vy: number } {
  const angle = Math.random() * Math.PI * 2;
  const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  };
}

/**
 * Generate random value in range
 * @pure (given deterministic random)
 */
export function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Bounce velocity off bounds
 * @pure
 */
export function bounceVelocity(
  x: number,
  y: number,
  vx: number,
  vy: number,
  width: number,
  height: number,
  margin: number = PHYSICS.SPAWN_MARGIN
): { vx: number; vy: number } {
  let newVx = vx;
  let newVy = vy;

  if (x <= margin || x >= width - margin) {
    newVx = -vx;
  }
  if (y <= margin || y >= height - margin) {
    newVy = -vy;
  }

  return { vx: newVx, vy: newVy };
}

/**
 * Clamp position within bounds
 * @pure
 */
export function clampPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  margin: number = PHYSICS.SPAWN_MARGIN
): Point {
  return {
    x: Math.max(margin, Math.min(width - margin, x)),
    y: Math.max(margin, Math.min(height - margin, y)),
  };
}

/**
 * Calculate center point of multiple nodes
 * @pure
 */
export function calculateCenter(nodes: Node[]): Point {
  if (nodes.length === 0) return { x: 0, y: 0 };

  const sum = nodes.reduce(
    (acc, node) => ({ x: acc.x + node.x, y: acc.y + node.y }),
    { x: 0, y: 0 }
  );

  return {
    x: sum.x / nodes.length,
    y: sum.y / nodes.length,
  };
}
