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
  // create background gradient
  const innerX = width / 2; // center X
  const innerY = height / 2; // center Y
  const innerRadius = 0; // starting circle radius
  const outerRadius = Math.sqrt(width * width + height * height) / 2; // half diagonal

  // define gradient colors (`--color-cool-black-#` or `--color-near-black-#`)
  const colorStopDarker = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--color-cool-black-1");
  const colorStopDark = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--color-cool-black-2");
  const colorStopMid = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--color-cool-black-3");
  const colorStopLight = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--color-cool-black-4");
  const colorStopLighter = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--color-cool-black-5");

  const gradient = context.createRadialGradient(
    innerX,
    innerY,
    innerRadius,
    innerX,
    innerY,
    outerRadius
  );

  // gradient color stops
  gradient.addColorStop(0, colorStopDarker);
  gradient.addColorStop(0.25, colorStopDark);
  gradient.addColorStop(0.5, colorStopMid);
  gradient.addColorStop(0.75, colorStopLight);
  gradient.addColorStop(1, colorStopLighter);

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

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
