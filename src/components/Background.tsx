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
  const staticCanvasRef = useRef<HTMLCanvasElement>(null);
  const shootingStarsCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasOverhang = 1.1;
  const [style, setStyle] = useState({
    filter: "brightness(100%)",
    transform: "scale(1)",
    transformOrigin: "bottom right",
    transition: "transform 1s ease, filter 1s ease",
  });

  useEffect(() => {
    const canvas = staticCanvasRef.current;
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
    const shootingStarsCanvas = shootingStarsCanvasRef.current;
    const shootingStarsContext = shootingStarsCanvas?.getContext("2d");
    if (!shootingStarsCanvas || !shootingStarsContext) return;

    let shootingStars: ShootingStar[] = [];

    const addShootingStar = () => {
      const star = createShootingStar(
        shootingStarsCanvas.width,
        shootingStarsCanvas.height
      );
      shootingStars.push(star);
      setTimeout(addShootingStar, Math.random() * 2000 + 2000); // 3.5 to 7 seconds
      // setTimeout(addShootingStar, Math.random() * 4500 + 3500); // 3.5 to 7 seconds
    };

    const animateStars = () => {
      shootingStarsContext.clearRect(
        0,
        0,
        shootingStarsCanvas.width,
        shootingStarsCanvas.height
      );

      shootingStars.forEach((star, index) => {
        if (
          star.x < 0 ||
          star.x > shootingStarsCanvas.width ||
          star.y < 0 ||
          star.y > shootingStarsCanvas.height
        ) {
          shootingStars.splice(index, 1);
        } else {
          animateShootingStar(star, shootingStarsContext);
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
      // calculate random intervals for each effect
      const intervalScale = Math.random() * 0.1 + 0.5;
      const intervalBrightness = Math.random() * 1 + 0.9;
      const intervalHue = Math.random() * 360;
      const intervalBlur = Math.random() * 2;
      const intervalSaturation = Math.random() * 100 + 100;

      const time = Date.now() * 0.002; // base time for fluctuation

      // dynamic style oscillation calculation
      const brightness = 100 + Math.sin(time * intervalBrightness) * 50; // brightness: 50%-150%
      const scale = 1 + Math.sin(time * intervalScale) * 0.015; // scale: 0.95-1.05
      const hueRotation = Math.sin(time) * intervalHue; // hue rotation: 0deg-360deg
      const blur = Math.abs(Math.sin(time)) * intervalBlur; // blur: 0px-2px
      const saturation = 100 + Math.sin(time) * intervalSaturation; // saturation: 100%-200%

      setStyle({
        filter: `brightness(${brightness}%) hue-rotate(${hueRotation}deg) blur(${blur}px) saturate(${saturation}%)`,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        transition: "transform 1s ease, filter 1s ease",
      });
      frameId = requestAnimationFrame(animateCanvasStyle);
    };

    const staticCanvas = staticCanvasRef.current;
    if (staticCanvas) {
      animateCanvasStyle();

      return () => {
        cancelAnimationFrame(frameId);
      };
    }
  }, []);

  return (
    <div className={styles["bg-container"]}>
      {/* static background */}
      <canvas
        style={style}
        ref={staticCanvasRef}
      ></canvas>
      {/* shooting stars */}
      <canvas ref={shootingStarsCanvasRef}></canvas>{" "}
    </div>
  );
};

export default Background;
