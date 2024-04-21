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
  const starColors = getDotColors();
  const starCount = 1000;

  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    // ToDo: rename "star" & "shadow"
    const starSize = Math.random() * 1.85 + 0.5;
    const shadowSize = Math.random() * 2 + 0.75;
    const shadowOpacity = Math.random() * 0.3 + 0.2;

    // shadow is always larger than the star
    const effectiveShadowSize = Math.max(shadowSize, starSize + 0.2);

    // modify shadow opacity
    let shadowColor =
      shadowColors[Math.floor(Math.random() * shadowColors.length)];
    // extract RGB
    let rgbMatch = shadowColor.match(
      /rgba\((\d+), (\d+), (\d+), (\d+\.?\d*)\)/
    );
    if (rgbMatch) {
      shadowColor = `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${shadowOpacity})`;
    }

    const starColor = starColors[Math.floor(Math.random() * starColors.length)];

    // draw shadow
    context.beginPath();
    context.arc(x, y, effectiveShadowSize, 0, Math.PI * 2);
    context.fillStyle = shadowColor;
    context.fill();

    // draw star
    context.beginPath();
    context.arc(x, y, starSize, 0, Math.PI * 2);
    context.fillStyle = starColor;
    context.fill();
  }
};

// handle window resize
export const onResize = (
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
