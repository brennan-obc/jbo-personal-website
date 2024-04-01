/* eslint-disable prefer-const */
import React, { useRef, useEffect } from "react";
import styles from "../styles/Swarm.module.scss";
import "../styles/variables.scss";

import {
  createDots,
  alignment,
  cohesion,
  separation,
  findNeighbors,
  normalizeVelocity,
  // applyRandomness,
  applyDirectionChange,
  getDotColors,
} from "../utils/swarmUtils";

const Swarm: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedFactor = 0.05; // ToDo: slowed for development; increase speed
  const colors = getDotColors();

  // create "hive" (swarm origin)
  const drawHive = (
    context: CanvasRenderingContext2D,
    hiveX: number,
    hiveY: number
  ) => {
    const hiveSize = 30; // ToDo: adjust
    const hiveColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-light-accent")
      .trim();
    context.fillStyle = hiveColor;
    context.beginPath();
    context.arc(hiveX, hiveY, hiveSize, 0, Math.PI * 2);
    context.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // set canvas size
    canvas.width = window.innerWidth * 1.25;
    canvas.height = window.innerHeight * 1.25;

    const hiveX = canvas.width * 0.875;
    const hiveY = canvas.height * 0.125;

    const dots = createDots(1000, hiveX, hiveY);

    // animation logic
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

      // draw hive
      const hiveX = canvas.width * 0.875; // 87.5% from left
      const hiveY = canvas.height * 0.125; // 12.5% from top
      drawHive(context, hiveX, hiveY);

      dots.forEach((dot) => {
        let neighbors = findNeighbors(dot, dots);

        let { ax: alignmentX, ay: alignmentY } = alignment(dot, neighbors);
        let { ax: cohesionX, ay: cohesionY } = cohesion(dot, neighbors);
        let { ax: separationX, ay: separationY } = separation(dot, neighbors);

        dot.vx += alignmentX + cohesionX + separationX;
        dot.vy += alignmentY + cohesionY + separationY;

        // applyRandomness(dot);
        applyDirectionChange(dot);
        normalizeVelocity(dot);

        // ensure dots wrap around edges
        if (dot.x <= 0 || dot.x >= canvas.width) dot.vx = -dot.vx;
        if (dot.y <= 0 || dot.y >= canvas.height) dot.vy = -dot.vy;

        dot.x += dot.vx * speedFactor;
        dot.y += dot.vy * speedFactor;

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // use drawDot to render the dot on the canvas
        context.fillStyle = randomColor;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        context.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className={styles["swarm-container"]}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Swarm;
