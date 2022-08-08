import React from 'react';
import Tree from './Tree';

import type {TreeParent} from './TreeNode';
import makeGraph from "./makeGraph";
import axios from "axios";
import trimData from "./trimData";
import {InputTree} from "./InputTree";

const MAX_LEVEL = 5;

class App extends React.Component<{}, {data: InputTree | undefined}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  componentDidMount() {
    axios.get(`/export.json`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      });
  }

  render() {
    if (!this.state.data) {
      return <div></div>
    }
    const data = trimData(this.state.data, MAX_LEVEL) as TreeParent;
    const graph = makeGraph(data);
    return (
      <div className="App">
        <Tree graph={graph}/>
      </div>
    );
  }
}

export default App;
