/**
 * Test data factories for EternalConstruction tests
 * Creates mock objects with sensible defaults and easy overrides
 */

import type {
  Node,
  Line,
  Structure,
  AnimationState,
  CanvasConfig,
  ConnectionPulse,
} from '../types';

/**
 * Create a mock node with optional overrides
 */
export function createMockNode(overrides: Partial<Node> = {}): Node {
  return {
    id: 1,
    x: 100,
    y: 100,
    vx: 5,
    vy: 3,
    radius: 4,
    opacity: 1,
    phase: 'active',
    lifespan: 20000,
    age: 5000,
    connections: new Set<number>(),
    ...overrides,
  };
}

/**
 * Create a mock line with optional overrides
 */
export function createMockLine(overrides: Partial<Line> = {}): Line {
  return {
    id: 1,
    fromNodeId: 1,
    toNodeId: 2,
    progress: 0.5,
    phase: 'extending',
    startTime: 0,
    duration: 3000,
    opacity: 1,
    ...overrides,
  };
}

/**
 * Create a mock line at the start of extension (progress 0)
 */
export function createMockLineAtStart(overrides: Partial<Line> = {}): Line {
  return createMockLine({
    progress: 0,
    phase: 'extending',
    startTime: 0,
    ...overrides,
  });
}

/**
 * Create a mock line at the end of extension (progress 1, locked)
 */
export function createMockLineAtEnd(overrides: Partial<Line> = {}): Line {
  return createMockLine({
    progress: 1,
    phase: 'locked',
    startTime: 0,
    ...overrides,
  });
}

/**
 * Create a mock fading line
 */
export function createMockFadingLine(overrides: Partial<Line> = {}): Line {
  return createMockLine({
    progress: 1,
    phase: 'fading',
    opacity: 0.5,
    ...overrides,
  });
}

/**
 * Create a mock structure with optional overrides
 */
export function createMockStructure(overrides: Partial<Structure> = {}): Structure {
  return {
    id: 1,
    nodeIds: new Set([1, 2, 3]),
    lineIds: new Set([1, 2, 3]),
    opacity: 1,
    createdAt: 0,
    lifespan: 15000,
    age: 5000,
    phase: 'active',
    ...overrides,
  };
}

/**
 * Create a mock connection pulse with optional overrides
 */
export function createMockPulse(overrides: Partial<ConnectionPulse> = {}): ConnectionPulse {
  return {
    id: 1,
    x: 150,
    y: 150,
    progress: 0.5,
    startTime: 0,
    ...overrides,
  };
}

/**
 * Create a mock animation state with optional overrides
 */
export function createMockState(overrides: Partial<AnimationState> = {}): AnimationState {
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
    ...overrides,
  };
}

/**
 * Create a mock animation state with nodes
 */
export function createMockStateWithNodes(nodeCount: number): AnimationState {
  const nodes = new Map<number, Node>();
  for (let i = 1; i <= nodeCount; i++) {
    nodes.set(i, createMockNode({
      id: i,
      x: 100 + i * 50,
      y: 100 + i * 30,
    }));
  }
  return createMockState({
    nodes,
    nextNodeId: nodeCount + 1,
  });
}

/**
 * Create a mock animation state with nodes and lines
 */
export function createMockStateWithNodesAndLines(
  nodeCount: number,
  lineCount: number
): AnimationState {
  const state = createMockStateWithNodes(nodeCount);
  const lines = new Map<number, Line>();

  for (let i = 1; i <= Math.min(lineCount, nodeCount - 1); i++) {
    lines.set(i, createMockLine({
      id: i,
      fromNodeId: i,
      toNodeId: i + 1,
    }));
  }

  return {
    ...state,
    lines,
    nextLineId: lineCount + 1,
  };
}

/**
 * Create a mock canvas config with optional overrides
 */
export function createMockConfig(overrides: Partial<CanvasConfig> = {}): CanvasConfig {
  return {
    width: 1920,
    height: 1080,
    dpr: 2,
    isMobile: false,
    ...overrides,
  };
}

/**
 * Create a mock mobile canvas config
 */
export function createMockMobileConfig(overrides: Partial<CanvasConfig> = {}): CanvasConfig {
  return createMockConfig({
    width: 375,
    height: 812,
    dpr: 3,
    isMobile: true,
    ...overrides,
  });
}

/**
 * Create two connected mock nodes (for line testing)
 */
export function createMockConnectedNodes(): { fromNode: Node; toNode: Node } {
  return {
    fromNode: createMockNode({
      id: 1,
      x: 100,
      y: 100,
    }),
    toNode: createMockNode({
      id: 2,
      x: 300,
      y: 200,
    }),
  };
}

/**
 * Create a Map of nodes from an array
 */
export function createNodesMap(nodes: Node[]): Map<number, Node> {
  const map = new Map<number, Node>();
  for (const node of nodes) {
    map.set(node.id, node);
  }
  return map;
}

/**
 * Create a Map of lines from an array
 */
export function createLinesMap(lines: Line[]): Map<number, Line> {
  const map = new Map<number, Line>();
  for (const line of lines) {
    map.set(line.id, line);
  }
  return map;
}
