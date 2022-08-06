import React from 'react';
import Tree from './Tree';

import type {TreeParent} from './TreeNode';
import makeGraph from "./makeGraph";

const data = {
  children: [
    {url: ''},
    {
      children: [
        {url: ''},
        {url: ''},
        {children: [{url: ''}, {url: ''}]},
      ],
    }
  ],
} as TreeParent;

function App() {
  const graph = makeGraph(data);
  return (
    <div className="App">
      <Tree graph={graph}/>
    </div>
  );
}

export default App;
