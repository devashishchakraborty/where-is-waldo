const normalizeAxes = (clickInfo) => {
  const normFactor =
    (932 / parseFloat(clickInfo.height) + 1491 / parseFloat(clickInfo.width)) /
    2;

  return { x: clickInfo.x * normFactor, y: clickInfo.y * normFactor };
};

export { normalizeAxes };
