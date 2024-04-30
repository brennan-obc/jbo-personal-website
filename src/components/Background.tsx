/* eslint-disable prefer-const */
import { useRef, useEffect, useState } from "react";
import styles from "../styles/modules/Background.module.scss";
import "../styles/global.scss";
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

  const [staticStyles, setStaticStyles] = useState({
    filter: "brightness(100%)",
    transform: "scale(1)",
    transformOrigin: "center center",
    transition: "transform 1s ease, filter 1s ease",
  });

  useEffect(() => {
    const setupCanvases = () => {
      const staticCanvas = staticCanvasRef.current;
      const shootingStarsCanvas = shootingStarsCanvasRef.current;
      if (staticCanvas && shootingStarsCanvas) {
        setCanvasSize(staticCanvas);
        setCanvasSize(shootingStarsCanvas);
        const context = staticCanvas.getContext("2d");
        if (context) {
          drawStaticBackground(
            context,
            staticCanvas.width,
            staticCanvas.height
          );
        }
        initShootingStars(shootingStarsCanvas);
      }
    };

    setupCanvases();
    const handleResize = () => {
      setupCanvases();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const updateCanvasStyles = () => {
      const rotationStyle = {
        transform: `rotate(${rotationDegrees}deg)`,
        transformOrigin: "center center",
        transition: "tranform 1s ease",
      };
      if (staticCanvasRef.current) {
        Object.assign(staticCanvasRef.current.style, rotationStyle);
      }
      if (shootingStarsCanvasRef.current) {
        Object.assign(shootingStarsCanvasRef.current.style, rotationStyle);
      }
    };

    updateCanvasStyles();
  }, [rotationDegrees, staticStyles]);

  useEffect(() => {
    const initRotation = () => {
      const rotationSpeed = 0.005;
      const upcomingDegrees = (rotationDegrees + rotationSpeed) % 360;
      setRotationDegrees(upcomingDegrees);
    };

    const frameId: number = requestAnimationFrame(initRotation);
    return () => cancelAnimationFrame(frameId);
  }, [rotationDegrees]);

  const initShootingStars = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d");
    if (!context) return;

    let shootingStars: ShootingStar[] = [];

    const addShootingStars = () => {
      const star = createShootingStar(canvas.width, canvas.height);
      shootingStars.push(star);
      setTimeout(addShootingStars, Math.random() * 2000 + 2000);
    };

    const runShootingStars = () => {
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
      requestAnimationFrame(runShootingStars);
    };

    addShootingStars();
    runShootingStars();
  };

  useEffect(() => {
    let frameId: number;

    const animateCanvasStyle = () => {
      // calculate random intervals for each effect
      const intervalScale = Math.random() * 0.04 + 0.3;
      const intervalBrightness = Math.random() * 0.2 + 0.1;
      const intervalHue = Math.random() * 10 + 5;
      const intervalBlur = Math.random() * 0.4 + 0.1;
      const intervalSaturation = Math.random() * 20 + 10;

      const time = Date.now() * 0.00005; // base time for fluctuation

      // dynamic style oscillation calculation
      const brightness = 100 + Math.sin(time * intervalBrightness) * 5; // brightness: 50%-150%
      const scale = 1 + Math.sin(time * intervalScale) * 0.005; // scale: 0.95-1.05
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

    // const staticCanvas = staticCanvasRef.current;
    // if (staticCanvas) {
    animateCanvasStyle();

    return () => {
      cancelAnimationFrame(frameId);
    };
    // }
  }, []);

  return (
    <div className={styles["bg-container"]}>
      <canvas
        style={staticStyles}
        ref={staticCanvasRef}
      ></canvas>
      <canvas ref={shootingStarsCanvasRef}></canvas>{" "}
    </div>
  );
};

export default Background;
