import React from 'react';

import type {Parent} from './GraphNode';

const SIZE = 1000;

function Tree(props: {graph: Parent}) {
  return <svg width={SIZE} height={SIZE}></svg>
}

export default Tree;
