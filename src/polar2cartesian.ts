import Coords from "./Coords";

function polar2cartesian(polarCoordinates: {radius: number, angle: number}, center: Coords): Coords {
  const {x: x0, y: y0} = center;
  let {radius, angle} = polarCoordinates;
  return {
    x: x0 + radius * Math.cos(angle),
    y: y0 + radius * Math.sin(angle),
  };
}

export default polar2cartesian;
