/* eslint-disable prefer-const */
import React, { useEffect } from "react";
import styles from "../styles/Swarm.module.scss";

interface Dot {
  id: number;
  x: number; // position
  y: number;
  vx: number; // velocity
  vy: number;
  size: number;
}

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
  neighbors.forEach((neighbor) => {
    let distance = Math.sqrt(
      Math.pow(neighbor.x - dot.x, 2) + Math.pow(neighbor.y - dot.y, 2)
    );
    if (distance < 20) {
      moveX += dot.x - neighbor.x;
      moveY += dot.y - neighbor.y;
    }
  });

  return { ax: moveX * 0.1, ay: moveY * 0.1 };
}

const Swarm: React.FC = () => {
  useEffect(() => {
    const container = document.querySelector(`.${styles["swarm-container"]}`);
    const containerWidth = container?.clientWidth ?? 0;
    const containerHeight = container?.clientHeight ?? 0;

    const dots = createDots(1000, containerWidth, containerHeight);

    dots.forEach((dot) => {
      const dotEl = document.createElement("div");
      dotEl.classList.add(styles.dot);
      dotEl.style.left = `${dot.x}px`;
      dotEl.style.top = `${dot.y}px`;
      dotEl.style.height = `${dot.size}px`;
      container?.appendChild(dotEl);

      // animation logic
      const animate = () => {
        // find neighbors
        let neighbors = dots.filter((d) => d.id !== dot.id);

        let align = alignment(dot, neighbors);
        let cohes = cohesion(dot, neighbors);
        let separ = separation(dot, neighbors);

        // update velocity based on Boids rules
        dot.vx += align.ax + cohes.ax + separ.ax;
        dot.vy += align.ay + cohes.ay + separ.ay;

        // update position based on velocity
        dot.x += dot.vx;
        dot.y += dot.vy;

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

  return <div className={styles.swarmContainer}></div>;
};

export default Swarm;
