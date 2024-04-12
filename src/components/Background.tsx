/* eslint-disable prefer-const */
import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/Background.module.scss";
import "../styles/variables.scss";
import swarmOriginImgSrc from "../assets/moon.png";
import { adjustImageSizeForDevice } from "../utils/responsiveUtils";
import {
  ShootingStar,
  createShootingStar,
  animateShootingStar,
} from "../utils/bgAnimationUtils";

import {
  createDots,
  alignment,
  cohesion,
  separation,
  findNeighbors,
  normalizeVelocity,
  applyDirectionChange,
  animateSwarm,
} from "../utils/bgSwarmUtils";

import {
  handleResize,
  getDotColors,
  drawStaticBackground,
} from "../utils/bgUtils";

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationFrameId: number;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // initialize and draw static background once
    drawStaticBackground(context, canvas.width, canvas.height);

    let shootingStars: ShootingStar[] = [];

    const addShootingStar = () => {
      const star = createShootingStar(context, canvas.width, canvas.height);
      shootingStars.push(star);

      // set timeout to add shooting star
      setTimeout(addShootingStar, Math.random() * 10000 + 5000); // 5 to 15 seconds
    };

    const animate = () => {
      shootingStars.forEach((star, index) => {
        // ToDo: fix path clearing
        context.clearRect(
          star.x - star.size * 2,
          star.y - star.size * 2,
          star.size * 4,
          star.size * 4
        );
        animateShootingStar(star, context, () => {
          shootingStars.splice(index, 1); // ToDo: ensure removal
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    addShootingStar();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles["bg-container"]}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Background;
