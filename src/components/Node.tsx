import {GraphNode, Parent} from "../graphs/GraphNode";
import Positioner from "../Positioner";
import {arcTo, line, lineTo, path} from "../svg";
import Image from "./Image";

function Node(props: {node: Parent, positioner: Positioner, imageOnClick: (nodeId: number) => void}) {
  const {node, positioner} = props;
  let svgElements = [];
  for (const child of node.children) {
    if (child !== node.children[0] && child !== node.children.at(-1)) {
      const lineStart = positioner.getCoordinates(node.level, child.position);
      const lineEnd = positioner.getCoordinates(child.level, child.position);
      svgElements.push(line(lineStart, lineEnd, `line-${node.id}-${child.id}`));
    }
    if ('children' in child) {
      svgElements.push(<Node key={child.id} node={child} positioner={positioner} imageOnClick={props.imageOnClick}/>);
    } else {
      svgElements.push(<Image key={child.id} leaf={child} positioner={positioner} onClick={props.imageOnClick} />);
    }
  }
  return <g>
    {makeMainPath(node, positioner)}
    {svgElements}
  </g>;
}

function makeMainPath(node: Parent, positioner: Positioner) {
  const firstChild = node.children[0];
  const lastChild = node.children.at(-1) as GraphNode;
  const start = positioner.getCoordinates(firstChild.level, firstChild.position);
  const end = positioner.getCoordinates(lastChild.level, lastChild.position);
  const arcStart = positioner.getCoordinates(node.level, firstChild.position);
  const arcEnd = positioner.getCoordinates(node.level, lastChild.position);
  const radius = positioner.getRadius(node.level)
  const angle = positioner.getAngle(lastChild.position - firstChild.position);
  let pathElements = [lineTo(arcStart), lineTo(end)];
  if (arcStart !== arcEnd) {
    pathElements.splice(1, 0, arcTo(arcEnd, radius, angle > Math.PI));
  }
  return path(start, pathElements);
}

export default Node;
