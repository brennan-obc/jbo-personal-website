/* eslint-disable prefer-const */
import { Dot } from "./bgUtils";

const NEIGHBOR_RADIUS = 275;
const MIN_VELOCITY = 0.1;

// add dots to canvas
export const createDots = (
  count: number,
  hiveX: number,
  hiveY: number
): Dot[] => {
  return Array.from({ length: count }, () => {
    // adjust initial position slightly
    const originRadius = 2.5; // 5px hive exit
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * originRadius;
    const initialX = hiveX + radius * Math.cos(angle);
    const initialY = hiveY + radius * Math.sin(angle);

    // ensure slightly varied SW exit direction
    const baseDirectionRadians = Math.PI * 1.25; // 225° / SW
    const variation = (Math.PI / 180) * (Math.random() * 10 - 5); // ± 5° variation

    const velocityMagnitude = 0.05; // ToDo: slowed for development; increase speed
    const vx = Math.cos(baseDirectionRadians + variation) * velocityMagnitude;
    const vy = Math.sin(baseDirectionRadians + variation) * velocityMagnitude;

    return {
      id: Math.random(),
      x: initialX,
      y: initialY,
      vx: vx,
      vy: vy,
      size: Math.random() * 1 + 0.5, // 0.5px — 1.5px
    };
  });
};

// control alignment
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

// control cohesion
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

// control separation
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

// determine which dots are neighbors
export const findNeighbors = (dot: Dot, dots: Dot[]): Dot[] => {
  return dots.filter((otherDot) => {
    if (dot.id === otherDot.id) return false; // skip self
    const distance = Math.sqrt(
      (dot.x - otherDot.x) ** 2 + (dot.y - otherDot.y) ** 2
    );
    return distance <= NEIGHBOR_RADIUS;
  });
};

// normalize velocity of dots
export const normalizeVelocity = (dot: Dot) => {
  const magnitude = Math.sqrt(dot.vx ** 2 + dot.vy ** 2);
  if (magnitude < MIN_VELOCITY) {
    const scale = MIN_VELOCITY / magnitude;
    dot.vx *= scale;
    dot.vy *= scale;
  }
};

export const applyGravity = (
  dot: Dot,
  pointOfGravity: { x: number; y: number },
  strength: number
) => {
  const dx = pointOfGravity.x - dot.x;
  const dy = pointOfGravity.y - dot.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // normalize direction
  const dirX = dx / distance;
  const dirY = dy / distance;

  // apply gravity as force towards point of gravity
  dot.vx += dirX * strength;
  dot.vy += dirY * strength;
};

// increase frequency & impact of direction changes
export const applyDirectionChange = (dot: Dot) => {
  // define how often direction should change
  const directionChangeProbability = 0.1;

  // randomly decide whether to change direction
  if (Math.random() < directionChangeProbability) {
    // define range of direction change
    const maxDirectionChange = Math.PI / 4; // 45 degrees in radians

    // calculate current angle of movement
    let currentAngle = Math.atan2(dot.vy, dot.vx);

    // apply random change to angle
    currentAngle += (Math.random() - 0.5) * 2 * maxDirectionChange;

    // define speed of dot to maintain current speed
    const speed = Math.sqrt(dot.vx ** 2 + dot.vy ** 2);

    // update velocity based on new angle
    dot.vx = Math.cos(currentAngle) * speed;
    dot.vy = Math.sin(currentAngle) * speed;
  }
};

// create swarm effect
export const animateSwarm = (
  context: CanvasRenderingContext2D,
  dots: Dot[],
  speedFactor: number,
  colors: string[],
  hiveImage: HTMLImageElement,
  drawHive: (context: CanvasRenderingContext2D) => void
) => {
  const animate = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear canvas

    drawHive(context); // Draw hive image

    dots.forEach((dot) => {
      const neighbors = findNeighbors(dot, dots);
      const { ax: alignmentX, ay: alignmentY } = alignment(dot, neighbors);
      const { ax: cohesionX, ay: cohesionY } = cohesion(dot, neighbors);
      const { ax: separationX, ay: separationY } = separation(dot, neighbors);

      dot.vx += alignmentX + cohesionX + separationX;
      dot.vy += alignmentY + cohesionY + separationY;

      applyDirectionChange(dot);
      normalizeVelocity(dot);

      if (dot.x <= 0 || dot.x >= context.canvas.width) dot.vx = -dot.vx;
      if (dot.y <= 0 || dot.y >= context.canvas.height) dot.vy = -dot.vy;

      dot.x += dot.vx * speedFactor;
      dot.y += dot.vy * speedFactor;

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      context.fillStyle = randomColor;
      context.beginPath();
      context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      context.fill();
    });

    requestAnimationFrame(animate);
  };

  animate();
};
