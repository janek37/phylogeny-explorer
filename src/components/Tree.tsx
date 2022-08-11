import './Tree.css';
import React from 'react';

import type {Parent} from '../GraphNode';
import Node from "./Node";
import Positioner from "../Positioner";

const SIZE = 500;

function Tree(props: {graph: Parent, imageOnClick: (nodeId: number) => void}) {
  const positioner = new Positioner({
    positionCount: props.graph.leavesCount(),
    levelCount: props.graph.level,
    treeRadius: SIZE * 0.48,
    center: {x: SIZE/2, y: SIZE/2},
  });
  return <svg viewBox={`0 0 ${SIZE} ${SIZE}`}>
    <Node node={props.graph} positioner={positioner} imageOnClick={props.imageOnClick} />
  </svg>
}

export default Tree;
