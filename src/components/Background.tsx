/* eslint-disable prefer-const */
import { useRef, useEffect, useState } from "react";
import styles from "../styles/Background.module.scss";
import "../styles/variables.scss";
// import swarmOriginImgSrc from "../assets/moon.png";
// import { adjustImageSizeForDevice } from "../utils/responsiveUtils";
import {
  ShootingStar,
  createShootingStar,
  animateShootingStar,
} from "../utils/bgAnimationUtils";

import { onResize, getDotColors, drawStaticBackground } from "../utils/bgUtils";

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasOverhang = 1.1;
  const [style, setStyle] = useState({
    filter: "brightness(100%)",
    transform: "scale(1)",
    transformOrigin: "bottom right",
    transition: "transform 1s ease, filter 1s ease",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    // set initial canvas size, draw static background
    canvas.width = window.innerWidth * canvasOverhang;
    canvas.height = window.innerHeight * canvasOverhang;
    drawStaticBackground(context, canvas.width, canvas.height);

    // handle resize
    const onResize = () => {
      canvas.width = window.innerWidth * canvasOverhang;
      canvas.height = window.innerHeight * canvasOverhang;
      drawStaticBackground(context, canvas.width, canvas.height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let shootingStars: ShootingStar[] = [];

    const addShootingStar = () => {
      const star = createShootingStar(context, canvas.width, canvas.height);
      shootingStars.push(star);
      setTimeout(addShootingStar, Math.random() * 7500 + 3500); // 3.5 to 11 seconds
    };

    const animateStars = () => {
      shootingStars.forEach((star, index) => {
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
          animateShootingStar(star, context); // move and redraw star
        }
      });

      requestAnimationFrame(animateStars);
    };

    addShootingStar();
    animateStars();
  }, []);

  useEffect(() => {
    let frameId: number;

    const animateCanvasStyle = () => {
      const intervalScale = Date.now() * 0.002;
      const intervalBrightness = Date.now() * 0.001;
      const brightness = 100 + Math.sin(intervalBrightness) * 75; // oscillate brightness
      const scale = 1 + Math.sin(intervalScale) * 0.01; // oscillate scale
      setStyle({
        filter: `brightness(${brightness}%)`,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        transition: "transform 1s ease, filter 1s ease",
      });
      frameId = requestAnimationFrame(animateCanvasStyle);
    };

    animateCanvasStyle();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className={styles["bg-container"]}
      style={style}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Background;
