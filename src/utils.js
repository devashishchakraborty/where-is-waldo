const normalizeAxes = (clickInfo) => {
  const normFactor =
    (932 / parseFloat(clickInfo.height) + 1491 / parseFloat(clickInfo.width)) /
    2;

  return { x: clickInfo.x * normFactor, y: clickInfo.y * normFactor };
};

const getOpacity = (charactersLeft, characterId) => {
  const characters = charactersLeft.filter((character) => character.id == characterId);
  return characters.length > 0 ? "1" : "0.5";
}

export { normalizeAxes, getOpacity };
