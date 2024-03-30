/* eslint-disable prefer-const */
export interface Dot {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const NEIGHBOR_RADIUS = 375;
const MIN_VELOCITY = 0.1;

export const getDotColors = () => [
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-light-dot-1")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-light-dot-2")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-light-dot-3")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-light-dot-4")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-light-dot-5")
    .trim(),
];

// createDots
export const createDots = (
  count: number,
  canvasWidth: number,
  canvasHeight: number
): Dot[] => {
  return Array.from({ length: count }, (_, index) => {
    return {
      id: index,
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      vx: Math.random() * 2 - 1, // velocity range [-1, 1]
      vy: Math.random() * 2 - 1,
      size: Math.random() * 1 + 0.5, // 0.5px — 1.5px
    };
  });
};

// alignment
export const alignment = (
  dot: Dot,
  neighbors: Dot[]
): { ax: number; ay: number } => {
  let averageVx = 0;
  let averageVy = 0;
  neighbors.forEach((neighbor) => {
    averageVx += neighbor.vx;
    averageVy += neighbor.vy;
  });
  averageVx /= neighbors.length;
  averageVy /= neighbors.length;

  return { ax: (averageVx - dot.vx) * 0.05, ay: (averageVy - dot.vy) * 0.05 };
};

// cohesion
export const cohesion = (
  dot: Dot,
  neighbors: Dot[]
): { ax: number; ay: number } => {
  let averageX = 0;
  let averageY = 0;
  neighbors.forEach((neighbor) => {
    averageX += neighbor.x;
    averageY += neighbor.y;
  });
  averageX /= neighbors.length;
  averageY /= neighbors.length;

  return { ax: (averageX - dot.x) * 0.01, ay: (averageY - dot.y) * 0.01 };
};

// separation
export const separation = (
  dot: Dot,
  neighbors: Dot[]
): { ax: number; ay: number } => {
  let moveX = 0;
  let moveY = 0;
  let xMult = 0.2;
  let yMult = 0.2;

  neighbors.forEach((neighbor) => {
    let distance = Math.sqrt(
      Math.pow(neighbor.x - dot.x, 2) + Math.pow(neighbor.y - dot.y, 2)
    );
    if (distance < 20) {
      moveX += dot.x - neighbor.x;
      moveY += dot.y - neighbor.y;
    }
  });

  return { ax: moveX * xMult, ay: moveY * yMult };
};

// findNeighbors
export const findNeighbors = (dot: Dot, dots: Dot[]): Dot[] => {
  return dots.filter((otherDot) => {
    if (dot.id === otherDot.id) return false; // skip self
    const distance = Math.sqrt(
      (dot.x - otherDot.x) ** 2 + (dot.y - otherDot.y) ** 2
    );
    return distance <= NEIGHBOR_RADIUS;
  });
};

// normalizeVelocity
export const normalizeVelocity = (dot: Dot) => {
  const magnitude = Math.sqrt(dot.vx ** 2 + dot.vy ** 2);
  if (magnitude < MIN_VELOCITY) {
    const scale = MIN_VELOCITY / magnitude;
    dot.vx *= scale;
    dot.vy *= scale;
  }
};

// applyRandomness
export const applyRandomness = (dot: Dot) => {
  const baseRandomness = 0.2;
  const currentSpeed = Math.sqrt(dot.vx ** 2 + dot.vy ** 2);

  // apply more randomness to slower dots
  const scaledRandomness =
    currentSpeed < MIN_VELOCITY ? baseRandomness * 2 : baseRandomness;

  dot.vx += (Math.random() - 0.5) * scaledRandomness;
  dot.vy += (Math.random() - 0.5) * scaledRandomness;
};
