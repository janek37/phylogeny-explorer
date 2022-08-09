import {Leaf} from "../GraphNode";
import positioner from "../Positioner";
import './Image.css';

function Image(props: {leaf: Leaf, positioner: positioner}) {
  const size = props.positioner.imageSize;
  const {x, y} = props.positioner.getImageCoordinates(props.leaf.position);
  return <g>
    <image href={props.leaf.value.url} width={size} height={size} x={x - size/2} y={y - size/2}/>
    <text x={x + size/2} y={y + size/2} className='num' textAnchor='end'>{props.leaf.value.speciesCount}</text>
  </g>;
}

export default Image;
