import {Leaf} from "./GraphNode";
import positioner from "./Positioner";

function Image(props: {leaf: Leaf, positioner: positioner}) {
  const size = props.positioner.getImageSize();
  const {x, y} = props.positioner.getCoordinates(-size*0.7, props.leaf.position);
  return <image href={props.leaf.value.url} width={size} height={size} x={x - size/2} y={y - size/2}/>
}

export default Image;
