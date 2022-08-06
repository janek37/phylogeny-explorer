import React from 'react';
import Tree from './Tree';

import type {TreeParent} from './TreeNode';
import makeGraph from "./makeGraph";

const data = {
  children: [
    {url: '', type: 'leaf'},
    {
      children: [
        {url: '', type: 'leaf'},
        {url: '', type: 'leaf'},
        {children: [{url: '', type: 'leaf'}, {url: '', type: 'leaf'}], type: 'parent'},
      ],
      type: 'parent',
    }
  ],
  type: 'parent',
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
