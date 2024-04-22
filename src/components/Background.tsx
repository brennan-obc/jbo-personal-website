/* eslint-disable prefer-const */
import { useRef, useEffect, useState } from "react";
import styles from "../styles/Background.module.scss";
import "../styles/variables.scss";
import { setCanvasSize } from "../utils/responsiveUtils";
import {
  ShootingStar,
  createShootingStar,
  animateShootingStar,
} from "../utils/bgAnimationUtils";

import { drawStaticBackground } from "../utils/bgUtils";

const Background = () => {
  const staticCanvasRef = useRef<HTMLCanvasElement>(null);
  const shootingStarsCanvasRef = useRef<HTMLCanvasElement>(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [rotationEffect, setRotationEffect] = useState({
    transform: `rotate(${rotationDegrees}deg)`,
    transformOrigin: "center center",
    transition: "tranform 1s ease",
  });
  const [staticStyles, setStaticStyles] = useState({
    filter: "brightness(85%)",
    transform: "scale(1)",
    transformOrigin: "center center",
    transition: "transform 1s ease, filter 1s ease",
  });

  const setupCanvases = () => {
    const staticCanvas = staticCanvasRef.current;
    const shootingStarsCanvas = shootingStarsCanvasRef.current;
    if (staticCanvas && shootingStarsCanvas) {
      setCanvasSize(staticCanvas);
      setCanvasSize(shootingStarsCanvas);

      // initial drawing: static canvas
      const context = staticCanvas.getContext("2d");
      if (context) {
        drawStaticBackground(context, staticCanvas.width, staticCanvas.height);
      }

      animateShootingStars(shootingStarsCanvas);
    }
  };

  useEffect(() => {
    // on initial load
    setupCanvases();

    // on resize
    const handleResize = () => {
      setupCanvases();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const animateShootingStars = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d");
    if (!context) return;

    let shootingStars: ShootingStar[] = [];

    const addShootingStar = () => {
      const star = createShootingStar(canvas.width, canvas.height);
      shootingStars.push(star);
      setTimeout(addShootingStar, Math.random() * 2000 + 2000);
    };

    const animateShootingStars = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      shootingStars.forEach((star, index) => {
        if (
          star.x < 0 ||
          star.x > canvas.width ||
          star.y < 0 ||
          star.y > canvas.height
        ) {
          shootingStars.splice(index, 1);
        } else {
          animateShootingStar(star, context);
        }
      });
      requestAnimationFrame(animateShootingStars);
    };

    addShootingStar();
    animateShootingStars();
  };

  useEffect(() => {
    let frameId: number;
    const rotationSpeed = 0.1;

    const updateRotation = () => {
      setRotationDegrees((prev) => (prev + rotationSpeed) % 360);
      frameId = requestAnimationFrame(updateRotation);
    };

    updateRotation();

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    setRotationEffect({
      transform: `rotate(${rotationDegrees}deg)`,
      transformOrigin: "center center",
      transition: "transform 1s ease",
    });
  }, [rotationDegrees]);

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

      setStaticStyles({
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
    <div
      className={styles["bg-container"]}
      style={rotationEffect}
    >
      {/* static background */}
      <canvas
        style={staticStyles}
        ref={staticCanvasRef}
      ></canvas>
      {/* shooting stars */}
      <canvas ref={shootingStarsCanvasRef}></canvas>{" "}
    </div>
  );
};

export default Background;
