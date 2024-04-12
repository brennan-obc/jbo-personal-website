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

export const getShadowColors = () => [
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-star-orange")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-star-red")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-star-blue")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-star-yellow")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-star-purple")
    .trim(),
];

// dynamically generate cosmic background
export const drawStaticBackground = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const shadowColors = getShadowColors();
  const starCount = 500;

  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 3;
    const opacity = Math.random();

    const shadowColorIndex = Math.floor(Math.random() * shadowColors.length);
    const shadowColor = shadowColors[shadowColorIndex];
    const shadowOpacity = Math.random();

    // debug log
    console.log(`Star ${i}:`, {
      x,
      y,
      size,
      shadowColor: `rgba(${shadowColor}, ${shadowOpacity})`,
      shadowBlur: 10,
      shadowOpacity,
    });

    // set shadows
    context.shadowColor = `rgba(${shadowColor}, ${shadowOpacity})`;
    context.shadowBlur = 10;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    // draw star with shadow
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fill();

    // reset shadows after drawing each star
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
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
