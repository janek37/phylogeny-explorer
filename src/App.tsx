import React from 'react';
import Tree from './Tree';

import type {TreeParent} from './TreeNode';
import makeGraph from "./makeGraph";
import axios from "axios";
import trimData from "./trimData";

const MAX_LEVEL = 5;

class App extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: {},
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
    if (Object.keys(this.state.data).length === 0) {
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
