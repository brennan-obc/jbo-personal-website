/* eslint-disable prefer-const */
import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/Background.module.scss";
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
  animateSwarm,
} from "../utils/bgSwarmUtils";

import {
  handleResize,
  getDotColors,
  drawStaticBackground,
} from "../utils/bgUtils";

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hiveImage, setHiveImage] = useState(new Image());
  const colors = getDotColors();

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHiveImage(img);
    img.src = swarmOriginImgSrc;
  }, []);

  // draw background, handle window resizes
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context /*  || !hiveImage.complete */) return; // ToDo: hive image?

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStaticBackground(context, canvas.width, canvas.height);

    // wrapper for handling resize
    const resizeAndRedraw = () => {
      handleResize(canvasRef, () => {
        drawStaticBackground(context, canvas.width, canvas.height);
      });
    };

    window.addEventListener("resize", resizeAndRedraw);

    return () => {
      window.removeEventListener("resize", resizeAndRedraw);
    };
  }, []);

  return (
    <div className={styles["bg-container"]}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Background;
