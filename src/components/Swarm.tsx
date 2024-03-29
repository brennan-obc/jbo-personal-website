/* eslint-disable prefer-const */
import React, { useRef, useEffect } from "react";
import styles from "../styles/Swarm.module.scss";

import {
  createDots,
  alignment,
  cohesion,
  separation,
  findNeighbors,
  normalizeVelocity,
  applyRandomness,
} from "../utils/swarmUtils";

const Swarm: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedFactor = 0.75;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dots = createDots(1000, canvas.width, canvas.height);

    // animation logic
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

      dots.forEach((dot) => {
        let neighbors = findNeighbors(dot, dots);

        let { ax: alignmentX, ay: alignmentY } = alignment(dot, neighbors);
        let { ax: cohesionX, ay: cohesionY } = cohesion(dot, neighbors);
        let { ax: separationX, ay: separationY } = separation(dot, neighbors);

        dot.vx += alignmentX + cohesionX + separationX;
        dot.vy += alignmentY + cohesionY + separationY;

        applyRandomness(dot);
        normalizeVelocity(dot);

        // ensure dots wrap around edges
        if (dot.x <= 0 || dot.x >= canvas.width) dot.vx = -dot.vx;
        if (dot.y <= 0 || dot.y >= canvas.height) dot.vy = -dot.vy;

        dot.x += dot.vx * speedFactor;
        dot.y += dot.vy * speedFactor;

        // use drawDot to render the dot on the canvas
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        context.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  //? handle resize

  return (
    <div className={styles["swarm-container"]}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Swarm;
