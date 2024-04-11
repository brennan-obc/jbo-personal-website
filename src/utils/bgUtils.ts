/* eslint-disable prefer-const */
export interface Dot {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export const getDotColors = () => [
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-light-dot-1")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-light-dot-2")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-light-dot-3")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-light-dot-4")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-light-dot-5")
    .trim(),
];

// create dynamically generated static background
export const drawStaticBackground = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const starCount = 500;
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 3;
    const opacity = Math.random();

    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fill();
  }
};

// handle window resize
export const handleResize = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  draw: () => void
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  // store current dimensions to compare against new dimensions
  const currentWidth = canvas.width;
  const currentHeight = canvas.height;

  // update canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // only redraw if dimensions have changed
  if (canvas.width !== currentWidth || canvas.height !== currentHeight) {
    draw();
  }
};
