/* eslint-disable prefer-const */
import React, { useEffect } from "react";
import styles from "../styles/Swarm.module.scss";
console.log(styles);

interface Dot {
  id: number;
  x: number; // position
  y: number;
  vx: number; // velocity
  vy: number;
  size: number;
}

let frameCount = 0;
const NEIGHBOR_RADIUS = 200;
const MIN_VELOCITY = 0.2;

const createDots = (
  count: number,
  containerWidth: number,
  containerHeight: number
): Dot[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    x: Math.random() * containerWidth,
    y: Math.random() * containerHeight,
    vx: Math.random() * 2 - 1, // velocity range [-1, 1]
    vy: Math.random() * 2 - 1,
    size: Math.random() * 2 + 1, // 1-3px diameter
  }));
};

function alignment(dot: Dot, neighbors: Dot[]): { ax: number; ay: number } {
  let averageVx = 0;
  let averageVy = 0;
  neighbors.forEach((neighbor) => {
    averageVx += neighbor.vx;
    averageVy += neighbor.vy;
  });
  averageVx /= neighbors.length;
  averageVy /= neighbors.length;

  return { ax: (averageVx - dot.vx) * 0.05, ay: (averageVy - dot.vy) * 0.05 };
}

function cohesion(dot: Dot, neighbors: Dot[]): { ax: number; ay: number } {
  let averageX = 0;
  let averageY = 0;
  neighbors.forEach((neighbor) => {
    averageX += neighbor.x;
    averageY += neighbor.y;
  });
  averageX /= neighbors.length;
  averageY /= neighbors.length;

  return { ax: (averageX - dot.x) * 0.01, ay: (averageY - dot.y) * 0.01 };
}

function separation(dot: Dot, neighbors: Dot[]): { ax: number; ay: number } {
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
}

function findNeighbors(dot: Dot, dots: Dot[]): Dot[] {
  return dots.filter((otherDot) => {
    if (dot.id === otherDot.id) return false; // skip self
    const distance = Math.sqrt(
      (dot.x - otherDot.x) ** 2 + (dot.y - otherDot.y) ** 2
    );
    return distance <= NEIGHBOR_RADIUS;
  });
}

function normalizeVelocity(dot: Dot) {
  const magnitude = Math.sqrt(dot.vx ** 2 + dot.vy ** 2);
  if (magnitude < MIN_VELOCITY) {
    const scale = MIN_VELOCITY / magnitude;
    dot.vx *= scale;
    dot.vy *= scale;
  }
}

function applyRandomness(dot: Dot) {
  const baseRandomness = 0.2;
  const currentSpeed = Math.sqrt(dot.vx ** 2 + dot.vy ** 2);

  // apply more randomness to slower dots
  const scaledRandomness =
    currentSpeed < MIN_VELOCITY ? baseRandomness * 2 : baseRandomness;

  dot.vx += (Math.random() - 0.5) * scaledRandomness;
  dot.vy += (Math.random() - 0.5) * scaledRandomness;
}

// apply periodic perturbances to prevent swarm from settling
const preventEquilibrium = (dot: Dot, frameCount: number) => {
  if (frameCount % 1000 === 0) {
    const angle = Math.random() * 2 * Math.PI;
    const pertubationSpeed = 2;
    dot.vx = Math.cos(angle) * pertubationSpeed;
    dot.vy = Math.sin(angle) * pertubationSpeed;
  }
};

const Swarm: React.FC = () => {
  const speedFactor = 0.75;

  let containerWidth = 0;
  let containerHeight = 0;
  useEffect(() => {
    const container = document.querySelector(`.${styles["swarm-container"]}`);
    containerWidth = container?.clientWidth ?? 0;
    containerHeight = container?.clientHeight ?? 0;

    const dots = createDots(1000, containerWidth, containerHeight);

    dots.forEach((dot) => {
      const dotEl = document.createElement("div");
      dotEl.classList.add(styles["swarm-container__dot"]);
      dotEl.style.left = `${dot.x}px`;
      dotEl.style.top = `${dot.y}px`;
      dotEl.style.width = `${dot.size}px`;
      dotEl.style.height = `${dot.size}px`;
      container?.appendChild(dotEl);

      // animation logic
      const animate = () => {
        frameCount++;

        // find neighbors
        let neighbors = findNeighbors(dot, dots);

        let align = alignment(dot, neighbors);
        let cohes = cohesion(dot, neighbors);
        let separ = separation(dot, neighbors);

        // update velocity based on Boids rules
        dot.vx += align.ax + cohes.ax + separ.ax;
        dot.vy += align.ay + cohes.ay + separ.ay;

        // introduce randomness to motion
        applyRandomness(dot);

        // adjust horizontal velocity
        if (dot.x <= 0 || dot.x >= containerWidth - dot.size) {
          dot.vx = -dot.vx;
          dot.vy += (Math.random() - 0.5) * 0.1;
        }
        // adjust vertical velocity
        if (dot.y <= 0 || dot.y >= containerHeight - dot.size) {
          dot.vy = -dot.vy;
          dot.vx += (Math.random() - 0.5) * 0.1;
        }

        normalizeVelocity(dot);
        preventEquilibrium(dot, frameCount);

        // update position based on velocity
        dot.x += dot.vx * speedFactor;
        dot.y += dot.vy * speedFactor;

        // ensure dots stay within container
        dot.x = Math.max(0, Math.min(dot.x, containerWidth - dot.size));
        dot.y = Math.max(0, Math.min(dot.y, containerHeight - dot.size));

        // Apply the updated position to the element
        dotEl.style.left = `${dot.x}px`;
        dotEl.style.top = `${dot.y}px`;

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    });
  }, []);

  // handle resize
  useEffect(() => {
    const handleResize = () => {
      // update dimensions
      const container = document.querySelector(`.${styles["swarm-container"]}`);
      containerWidth = container?.clientWidth ?? 0;
      containerHeight = container?.clientHeight ?? 0;
      //• optional: adjust dot position
    };

    // attach resize event listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div className={styles["swarm-container"]}>TEST</div>;
};

export default Swarm;
