/* eslint-disable prefer-const */
import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/Swarm.module.scss";
import "../styles/variables.scss";
import swarmOriginImgSrc from "../assets/moon.png";
import { adjustImageSizeForDevice } from "../utils/responsiveUtils";

import {
  createDots,
  alignment,
  cohesion,
  separation,
  findNeighbors,
  normalizeVelocity,
  applyDirectionChange,
  getDotColors,
} from "../utils/swarmUtils";

const Swarm: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hiveImage, setHiveImage] = useState(new Image());
  const speedFactor = 0.1; // ToDo: slowed for development; increase speed
  const colors = getDotColors();

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHiveImage(img);
    img.src = swarmOriginImgSrc;
  }, []);

  // create "hive" (swarm origin)
  const drawHive = (context: CanvasRenderingContext2D) => {
    const xOffset = 35;
    const yOffset = -35;
    const imageSize = adjustImageSizeForDevice();
    const hiveX = window.innerWidth - imageSize + xOffset;
    const hiveY = yOffset;

    if (hiveImage.complete) {
      // draw image at specified coords at adjusted size
      context.drawImage(hiveImage, hiveX, hiveY, imageSize, imageSize);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !hiveImage.complete) return; // ensure image loaded

    // set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // pin hive to top-right corner
    const hiveX = window.innerWidth - adjustImageSizeForDevice() / 2;
    const hiveY = 0 + adjustImageSizeForDevice() / 2;

    const dots = createDots(1000, hiveX, hiveY);

    // animation logic
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

      // draw hive
      drawHive(context);

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

      drawHive(context);

      requestAnimationFrame(animate);
    };

    animate();
  }, [hiveImage]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context || !hiveImage.complete) return;

      // update canvas size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // update swarm origin position
      const newHiveX = window.innerWidth - adjustImageSizeForDevice() / 2;
      const newHiveY = 0 + adjustImageSizeForDevice() / 2;

      // clear canvas, redraw scene
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawHive(context);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hiveImage]);

  return (
    <div className={styles["swarm-container"]}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Swarm;
