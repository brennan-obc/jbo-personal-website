/* eslint-disable prefer-const */
import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/Background.module.scss";
import "../styles/variables.scss";
// import swarmOriginImgSrc from "../assets/moon.png";
// import { adjustImageSizeForDevice } from "../utils/responsiveUtils";
import {
  ShootingStar,
  createShootingStar,
  animateShootingStar,
} from "../utils/bgAnimationUtils";

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

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStaticBackground(context, canvas.width, canvas.height);
    };
    window.addEventListener("resize", handleResize);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // initialize and draw static background once
    drawStaticBackground(context, canvas.width, canvas.height);

    let shootingStars: ShootingStar[] = [];

    const addShootingStar = () => {
      const star = createShootingStar(context, canvas.width, canvas.height);
      shootingStars.push(star);

      // set timeout to add shooting star
      setTimeout(addShootingStar, Math.random() * 7500 + 3500); // 3.5 to 11 seconds
    };

    const animate = () => {
      shootingStars.forEach((star, index) => {
        // Clear only the old path of the star
        context.clearRect(
          star.prevX - star.size * 2,
          star.prevY - star.size * 2,
          star.size * 4,
          star.size * 4
        );

        if (
          star.x < 0 ||
          star.x > context.canvas.width ||
          star.y < 0 ||
          star.y > context.canvas.height
        ) {
          shootingStars.splice(index, 1); // remove out of bounds stars
        } else {
          animateShootingStar(star, context);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    addShootingStar();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
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
