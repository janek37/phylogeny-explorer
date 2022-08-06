import {GraphNode, Parent} from "./GraphNode";
import Positioner from "./Positioner";
import {arcTo, line, lineTo, path} from "./svg";

function Node(props: {node: Parent, positioner: Positioner}) {
  const {node, positioner} = props;
  let svgElements = [];
  svgElements.push(makeMainPath(node, positioner));
  for (const child of node.children) {
    if (child !== node.children[0] && child !== node.children.at(-1)) {
      const lineStart = positioner.getCoordinates(node.level, child.position);
      const lineEnd = positioner.getCoordinates(child.level, child.position);
      svgElements.push(line(lineStart, lineEnd));
    }
    if ('children' in child) {
      svgElements.push(<Node node={child} positioner={positioner}/>);
    }
  }
  return <g>{svgElements}</g>;
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
