import Coords from "./Coords";
import polar2cartesian from "./polar2cartesian";

class Positioner {
  positionCount: number;
  levelCount: number;
  treeRadius: number;
  innerRadius: number;
  imageSize: number;
  center: Coords;

  constructor(props: {positionCount: number, levelCount: number, treeRadius: number, center: Coords}) {
    this.positionCount = props.positionCount;
    this.levelCount = props.levelCount;
    this.treeRadius = props.treeRadius;
    this.center = props.center;
    this.imageSize = this.getImageSize();
    this.innerRadius = (props.treeRadius - this.imageSize) * 0.98;
  }

  getRadius(level: number): number {
    if (level < 0) {
      return this.innerRadius - level;
    }
    return (this.levelCount - level) / this.levelCount * this.innerRadius;
  }

  getAngle(position: number): number {
    return position/this.positionCount * 2*Math.PI;
  }

  getCoordinates(level: number, position: number): Coords {
    const radius = this.getRadius(level);
    const angle = this.getAngle(position);
    return polar2cartesian({radius, angle}, this.center);
  }

  getImageCoordinates(position: number): Coords {
    const angle = this.getAngle(position);
    const radiusOffset = 1/(2*Math.max(Math.abs(Math.sin(angle)), Math.abs(Math.cos(angle))));
    const radius = this.treeRadius + this.imageSize*(radiusOffset - 1);
    return polar2cartesian({radius, angle}, this.center);
  }

  private getImageSize(): number {
    const sin = Math.sin(Math.PI/this.positionCount)
    return this.treeRadius * sin/(1+sin) * 1.41;
  }
}

export default Positioner;
