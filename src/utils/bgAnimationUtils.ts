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
