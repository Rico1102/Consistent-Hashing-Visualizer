const findXY = (position, anglePerPart, radius) => {
    const angle = position * anglePerPart;
    const radians = (angle * Math.PI) / 180;

    const x = radius * 1.25 + radius * Math.cos(radians);
    const y = radius * 1.25 + radius * Math.sin(radians);

    return { x, y };
};

export default findXY;
