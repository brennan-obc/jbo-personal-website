/* eslint-disable prefer-const */

export const effectZoomIn = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  xCoord: number,
  yCoord: number,
  duration: 2500,
  interval: 250
) => {
  if (!canvasRef.current) return;

  const totalSteps = duration / interval;
  let currentStep = 0;
  const scaleFactor = 0.01; // step: +1%
  let currentScale = 1;

  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const offsetX = centerX - xCoord;
  const offsetY = centerY - yCoord;
  const moveFactorX = offsetX / totalSteps;
  const moveFactorY = offsetY / totalSteps;

  const animateZoom = () => {
    if (currentStep < totalSteps) {
      currentScale += scaleFactor;
      canvas.style.transform = `scale(${currentScale}) translate(${
        moveFactorX * currentStep
      }px, ${moveFactorY * currentStep}px)`;
      currentStep++;
      setTimeout(animateZoom, interval);
    }
  };

  animateZoom();
};

export const effectZoomOut = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  duration = 2500,
  interval = 250
) => {
  if (!canvasRef.current) return;

  const totalSteps = duration / interval;
  let currentStep = totalSteps;
  let scaleFactor = 0.01; // step: -1%
  let currentScale = 1 + scaleFactor * totalSteps;

  const canvas = canvasRef.current;
  canvas.style.transition = `transform ${duration}ms ease`;

  const animateZoom = () => {
    if (currentStep > 0) {
      currentScale -= scaleFactor;
      canvas.style.transform = `scale(${currentScale}) translate(0px, 0px)`;
      currentStep--;
      setTimeout(animateZoom, interval);
    } else {
      canvas.style.transform = `scale(1) translate(0, 0)`;
    }
  };

  animateZoom();
};
