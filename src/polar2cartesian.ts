function polar2cartesian(polarCoordinates: {radius: number, angle: number}, center: {x: number, y: number}): {x: number, y: number} {
  const {x: x0, y: y0} = center;
  let {radius, angle} = polarCoordinates;
  return {
    x: x0 + radius * Math.cos(angle),
    y: y0 + radius * Math.sin(angle),
  };
}

export default polar2cartesian;
