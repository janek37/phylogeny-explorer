import React from 'react';
import Tree from './Tree';

import type {TreeParent} from '../TreeNode';
import makeGraph from "../makeGraph";
import axios from "axios";
import trimData from "../trimData";
import {InputTree} from "../InputTree";

const MAX_LEVEL = 5;

type Index = {[key: number]: InputTree};

class App extends React.Component<{}, {data: InputTree | undefined; currentId: number, index: Index}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: undefined,
      currentId: 0,
      index: {},
    };
  }

  componentDidMount() {
    axios.get(`/export.json`)
      .then(res => {
        const data = res.data;
        const index = this.buildIndex(data);
        this.setState({ data, index });
      });
  }

  buildIndex(data: InputTree): Index {
    let index: Index = {};
    if ('children' in data) {
      if (data.children.length > 1) {
        index[data.id] = data;
      }
      for (const child of data.children) {
        Object.assign(index, this.buildIndex(child));
      }
    }
    return index;
  }

  render() {
    if (!this.state.data) {
      return <div></div>
    }
    const data = trimData(this.state.index[this.state.currentId], MAX_LEVEL) as TreeParent;
    const graph = makeGraph(data);
    return (
      <div className="App">
        <Tree graph={graph} imageOnClick={(nodeId: number) => this.setState({currentId: nodeId})}/>
      </div>
    );
  }
}

export default App;
