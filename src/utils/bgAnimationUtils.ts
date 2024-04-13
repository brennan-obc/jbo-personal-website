/* eslint-disable prefer-const */

import { getShadowColors } from "./bgUtils";

export interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  prevX: number;
  prevY: number;
}

export interface DriftingShape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  // prevX: number;
  // prevY: number;
}

export const createDriftingShape = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): DriftingShape => {
  const colors = getShadowColors();
  const x = Math.random() * width;
  const y = Math.random() * height;
  const vx = (Math.random() - 0.5) * 0.5;
  const vy = (Math.random() - 0.5) * 0.5;
  const size = Math.random() * 50 + 30;
  const opacity = Math.random() * 0.5 + 0.25;
  const color = colors[Math.floor(Math.random() * colors.length)];

  return { x, y, vx, vy, size, opacity, color };
};

export const animateDriftingShape = (
  shape: DriftingShape,
  context: CanvasRenderingContext2D
) => {
  // move shape
  shape.x += shape.vx;
  shape.y += shape.vy;

  // apply global composite operation
  context.globalCompositeOperation = "lighter"; //ToDo: experiment with effects
  // lighter, copy, xor, multiply, screen, overlay, darken, lighten,
  //  color-dodge, color-burn, hard-light, soft-light, difference,
  //  exclusion, hue, saturation, color, luminosity

  // draw shape
  context.fillStyle = `rgba(${shape.color},${shape.opacity})`;
  context.beginPath();
  context.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
  context.fill();
};

export const createShootingStar = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): ShootingStar => {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const size = Math.random() * 4 + 1.5; // 1.5px — 5.5px
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 9 + 9; // 9 — 18
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  const colors = [
    "#210535",
    "#430D4B",
    "#7B337D",
    "#C874B2",
    "#F5D5E0",
    "#013026",
    "#014760",
    "#107E57",
    "#A1CE3F",
    "#CBE58E",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return { x, y, vx, vy, size, color, prevX: x, prevY: y };
};

export const animateShootingStar = (
  star: ShootingStar,
  context: CanvasRenderingContext2D
) => {
  // update previous position
  star.prevX = star.x;
  star.prevY = star.y;

  // update star position
  star.x += star.vx;
  star.y += star.vy;

  // draw star at new position
  context.beginPath();
  context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
  context.fillStyle = star.color;
  context.fill();
};
