import {Leaf} from "./GraphNode";
import positioner from "./Positioner";

function Image(props: {leaf: Leaf, positioner: positioner}) {
  const size = props.positioner.imageSize;
  const {x, y} = props.positioner.getImageCoordinates(props.leaf.position);
  return <image href={props.leaf.value.url} width={size} height={size} x={x - size/2} y={y - size/2}/>;
}

export default Image;
