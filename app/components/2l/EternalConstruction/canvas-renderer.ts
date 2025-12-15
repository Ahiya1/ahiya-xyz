/**
 * Canvas rendering functions for EternalConstruction
 * Handles all drawing operations for nodes, lines, structures, and effects
 */

import type {
  AnimationState,
  CanvasConfig,
  Node,
  Line,
  Structure,
  ConnectionPulse,
  Point,
} from './types';
import { COLORS, PHYSICS } from './constants';
import { lerp } from './easing';

/**
 * Main render function - clears and redraws entire canvas
 * Render order is critical for correct visual layering:
 * 1. Structures (background)
 * 2. Lines (middle)
 * 3. Pulses (on top of lines)
 * 4. Nodes (foreground)
 */
export function render(
  ctx: CanvasRenderingContext2D,
  state: AnimationState,
  config: CanvasConfig
): void {
  const { width, height } = config;

  // 1. Clear canvas
  ctx.clearRect(0, 0, width, height);

  // 2. Render structures (background layer)
  renderStructures(ctx, state.structures, state.nodes);

  // 3. Render lines (middle layer)
  renderLines(ctx, state.lines, state.nodes);

  // 4. Render connection pulses (on top of lines)
  renderPulses(ctx, state.pulses);

  // 5. Render nodes (top layer)
  renderNodes(ctx, state.nodes);
}

/**
 * Render all visible nodes with glow effect
 */
export function renderNodes(
  ctx: CanvasRenderingContext2D,
  nodes: Map<number, Node>
): void {
  for (const node of nodes.values()) {
    if (node.opacity <= 0) continue;

    renderNode(ctx, node);
  }
}

/**
 * Render a single node with glow effect and white core
 */
export function renderNode(
  ctx: CanvasRenderingContext2D,
  node: Node
): void {
  const { x, y, radius, opacity } = node;
  const glowRadius = radius * PHYSICS.NODE_GLOW_MULTIPLIER;

  // Outer glow (radial gradient)
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
  gradient.addColorStop(0, `rgba(${COLORS.PURPLE}, ${opacity * COLORS.NODE_GLOW_OPACITY})`);
  gradient.addColorStop(0.5, `rgba(${COLORS.PURPLE}, ${opacity * COLORS.NODE_GLOW_MID_OPACITY})`);
  gradient.addColorStop(1, `rgba(${COLORS.PURPLE}, 0)`);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
  ctx.fill();

  // Core (solid white)
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity * COLORS.NODE_CORE_OPACITY})`;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Render all visible lines with gradient from dim origin to bright destination
 */
export function renderLines(
  ctx: CanvasRenderingContext2D,
  lines: Map<number, Line>,
  nodes: Map<number, Node>
): void {
  ctx.lineWidth = PHYSICS.LINE_WIDTH;
  ctx.lineCap = 'round';

  for (const line of lines.values()) {
    if (line.opacity <= 0) continue;

    const fromNode = nodes.get(line.fromNodeId);
    const toNode = nodes.get(line.toNodeId);
    if (!fromNode || !toNode) continue;

    renderLine(ctx, line, fromNode, toNode);
  }
}

/**
 * Render a single line with gradient
 * Gradient goes from dim at origin (0.12 opacity) to bright at destination (0.4 opacity)
 * Line only renders up to current progress
 */
export function renderLine(
  ctx: CanvasRenderingContext2D,
  line: Line,
  fromNode: Node,
  toNode: Node
): void {
  // Calculate current endpoint based on progress
  const currentX = lerp(fromNode.x, toNode.x, line.progress);
  const currentY = lerp(fromNode.y, toNode.y, line.progress);

  // Don't render if essentially at same point (avoids gradient errors)
  const dx = currentX - fromNode.x;
  const dy = currentY - fromNode.y;
  if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
    return;
  }

  // Create gradient from origin to current position
  const gradient = ctx.createLinearGradient(
    fromNode.x, fromNode.y,
    currentX, currentY
  );

  // Determine destination opacity based on phase
  const baseOpacity = line.phase === 'locked'
    ? COLORS.LINE_LOCKED_OPACITY
    : COLORS.LINE_DEST_OPACITY;

  // Apply line's overall opacity (for fading)
  const originOpacity = line.opacity * COLORS.LINE_ORIGIN_OPACITY;
  const destOpacity = line.opacity * baseOpacity;

  gradient.addColorStop(0, `rgba(${COLORS.PURPLE}, ${originOpacity})`);
  gradient.addColorStop(1, `rgba(${COLORS.PURPLE}, ${destOpacity})`);

  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(fromNode.x, fromNode.y);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();
}

/**
 * Calculate the gradient colors for a line
 * @returns Object with origin and destination color strings
 * @pure
 */
export function calculateLineGradient(
  line: Line
): { originColor: string; destColor: string } {
  const baseOpacity = line.phase === 'locked'
    ? COLORS.LINE_LOCKED_OPACITY
    : COLORS.LINE_DEST_OPACITY;

  const originOpacity = line.opacity * COLORS.LINE_ORIGIN_OPACITY;
  const destOpacity = line.opacity * baseOpacity;

  return {
    originColor: `rgba(${COLORS.PURPLE}, ${originOpacity})`,
    destColor: `rgba(${COLORS.PURPLE}, ${destOpacity})`,
  };
}

/**
 * Render structure fill polygons
 */
export function renderStructures(
  ctx: CanvasRenderingContext2D,
  structures: Map<number, Structure>,
  nodes: Map<number, Node>
): void {
  for (const structure of structures.values()) {
    if (structure.opacity <= 0) continue;

    const structureNodes = Array.from(structure.nodeIds)
      .map(id => nodes.get(id))
      .filter((n): n is Node => n !== undefined);

    if (structureNodes.length < 3) continue;

    renderStructure(ctx, structure, structureNodes);
  }
}

/**
 * Render a single structure as a filled polygon
 */
export function renderStructure(
  ctx: CanvasRenderingContext2D,
  structure: Structure,
  nodes: Node[]
): void {
  // Draw filled polygon
  ctx.fillStyle = `rgba(${COLORS.PURPLE}, ${structure.opacity * COLORS.STRUCTURE_FILL_OPACITY})`;
  ctx.beginPath();
  ctx.moveTo(nodes[0].x, nodes[0].y);
  for (let i = 1; i < nodes.length; i++) {
    ctx.lineTo(nodes[i].x, nodes[i].y);
  }
  ctx.closePath();
  ctx.fill();
}

/**
 * Render connection pulse effects
 */
export function renderPulses(
  ctx: CanvasRenderingContext2D,
  pulses: ConnectionPulse[]
): void {
  for (const pulse of pulses) {
    renderPulse(ctx, pulse);
  }
}

/**
 * Render a single connection pulse
 */
export function renderPulse(
  ctx: CanvasRenderingContext2D,
  pulse: ConnectionPulse
): void {
  const opacity = (1 - pulse.progress) * COLORS.PULSE_OPACITY;
  const radius = 5 + pulse.progress * 15;

  const gradient = ctx.createRadialGradient(
    pulse.x, pulse.y, 0,
    pulse.x, pulse.y, radius
  );
  gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
  gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(pulse.x, pulse.y, radius, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Calculate the current endpoint of a line for rendering
 * @pure
 */
export function getLineEndpoint(
  fromNode: Node,
  toNode: Node,
  progress: number
): Point {
  return {
    x: lerp(fromNode.x, toNode.x, progress),
    y: lerp(fromNode.y, toNode.y, progress),
  };
}
