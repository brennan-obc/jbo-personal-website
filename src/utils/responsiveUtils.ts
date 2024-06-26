export const setCanvasSize = (canvas: HTMLCanvasElement) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // calculate diagonal
  const diagonal = Math.sqrt(width * width + height * height);

  // set canvas dimensions
  canvas.width = diagonal;
  canvas.height = diagonal;

  // center canvas
  canvas.style.position = "absolute";
  canvas.style.left = `${(width - diagonal) / 2}px`;
  canvas.style.top = `${(height - diagonal) / 2}px`;
};

export const adjustImageSizeForDevice = (): number => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 320) {
    // mobile
    return 50;
  } else if (screenWidth > 320 && screenWidth <= 768) {
    // large phone / small tablet
    return 75;
  } else if (screenWidth > 769 && screenWidth <= 1024) {
    // large tablet / small laptop
    return 200;
  } else if (screenWidth > 1025 && screenWidth <= 1440) {
    // large laptop / small desktop monitor
    return 250;
  } else if (screenWidth > 1441 && screenWidth <= 1920) {
    // large desktop monitor
    return 300;
  } else {
    // XL desktop monitor / TVs
    return 350;
  }
};
