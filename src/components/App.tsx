import './App.css';
import React from 'react';
import Tree from './Tree';

import type {TreeParent} from '../TreeNode';
import makeGraph from "../makeGraph";
import axios from "axios";
import trimData from "../trimData";
import {InputTree} from "../InputTree";

const MAX_LEVEL = 5;

type Index = {[key: number]: InputTree};

class App extends React.Component<{}, {data: InputTree | undefined; currentId: number, index: Index, nodeStack: number[]}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: undefined,
      currentId: 0,
      index: {},
      nodeStack: [],
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
      index[data.id] = data;
      for (const child of data.children) {
        Object.assign(index, this.buildIndex(child));
      }
    }
    return index;
  }

  switchNode(nodeId: number) {
    if (nodeId === -1) {
      this.setState({
        currentId: this.state.nodeStack.at(-1) as number,
        nodeStack: this.state.nodeStack.slice(0, -1),
      });
    } else {
      let newStack = this.state.nodeStack.slice();
      newStack.push(this.state.currentId);
      this.setState({
        currentId: nodeId,
        nodeStack: newStack,
      });
    }
  }

  addOutgroup(data: TreeParent) {
    if (this.state.nodeStack.length > 0) {
      const outgroup = {
        id: -1, url: '/outgroup.svg',
      }
      return {id: data.id, children: [outgroup, data]};
    } else {
      return data;
    }
  }

  render() {
    if (!this.state.data) {
      return <div></div>
    }
    let data = trimData(this.state.index[this.state.currentId], MAX_LEVEL) as TreeParent;
    data = this.addOutgroup(data);
    let graph = makeGraph(data);
    return (
      <div className="App">
        <Tree graph={graph} imageOnClick={(nodeId: number) => this.switchNode(nodeId)}/>
      </div>
    );
  }
}

export default App;
