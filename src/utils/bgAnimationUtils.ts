/* eslint-disable prefer-const */

export interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export const createShootingStar = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): ShootingStar => {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const size = Math.random() * 3 + 1; // size: 1px — 4px
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 4 + 1; // speed: 1 — 5
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

  return { x, y, vx, vy, size, color };
};

export const animateShootingStar = (
  star: ShootingStar,
  context: CanvasRenderingContext2D,
  callback: () => void
) => {
  context.beginPath();
  context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
  context.fillStyle = star.color;
  context.fill();

  // update star position
  star.x += star.vx;
  star.y += star.vy;

  // check if star is out of bounds
  if (
    star.x < 0 ||
    star.x > context.canvas.width ||
    star.y < 0 ||
    star.y > context.canvas.height
  ) {
    callback(); // reset or remove star
  }
};
