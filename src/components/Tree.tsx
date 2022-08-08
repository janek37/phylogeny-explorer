import React from 'react';

import type {Parent} from '../GraphNode';
import Node from "./Node";
import Positioner from "../Positioner";

const SIZE = 900;

function Tree(props: {graph: Parent}) {
  const positioner = new Positioner({
    positionCount: props.graph.leavesCount(),
    levelCount: props.graph.level,
    treeRadius: SIZE * 0.5,
    center: {x: SIZE/2, y: SIZE/2},
  });
  return <svg width={SIZE} height={SIZE}>
    <Node node={props.graph} positioner={positioner} />
  </svg>
}

export default Tree;
