import Coords from "./Coords";
import polar2cartesian from "./polar2cartesian";

class Positioner {
  positionCount: number;
  levelCount: number;
  treeRadius: number;
  center: Coords;

  constructor(props: {positionCount: number, levelCount: number, treeRadius: number, center: Coords}) {
    this.positionCount = props.positionCount;
    this.levelCount = props.levelCount;
    this.treeRadius = props.treeRadius;
    this.center = props.center;
  }

  getRadius(level: number): number {
    if (level < 0) {
      return this.treeRadius - level;
    }
    return (this.levelCount - level) / this.levelCount * this.treeRadius;
  }

  getAngle(position: number): number {
    return position/this.positionCount * 2*Math.PI;
  }

  getCoordinates(level: number, position: number): Coords {
    const radius = this.getRadius(level);
    const angle = this.getAngle(position);
    return polar2cartesian({radius, angle}, this.center);
  }

  getImageSize(): number {
    return this.treeRadius * Math.sin(Math.PI/this.positionCount) * 1.5;
  }
}

export default Positioner;
