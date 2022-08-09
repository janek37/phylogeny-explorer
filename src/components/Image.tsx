import {Leaf} from "../GraphNode";
import positioner from "../Positioner";
import './Image.css';

function Image(props: {leaf: Leaf, positioner: positioner, onClick: (nodeId: number) => void}) {
  const size = props.positioner.imageSize;
  const {leaf} = props;
  const {x, y} = props.positioner.getImageCoordinates(leaf.position);
  return <g onClick={
    () => {
      if (leaf.value.speciesCount && leaf.value.speciesCount > 1) {
        props.onClick(props.leaf.id);
      }
    }
  }>
    <image href={props.leaf.value.url} width={size} height={size} x={x - size/2} y={y - size/2}/>
    <text x={x + size/2} y={y + size/2} className='num' textAnchor='end'>{props.leaf.value.speciesCount}</text>
  </g>;
}

export default Image;
