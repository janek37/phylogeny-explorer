import './App.css';
import React, {useEffect, useState} from 'react';
import Tree from './Tree';

import axios from "axios";
import {InputParent, InputTree} from "../graphs/InputTree";
import prepareGraph from "../graphs/prepareGraph";
import {useNavigate, useParams} from "react-router-dom";
import {TreeLeaf} from "../graphs/TreeNode";
import {Infobox} from "./Infobox";

const MAX_LEAF_COUNT = 15;

const OUTGROUP_JUMP = 4;

type Index = {[key: number]: InputParent};

function getNodePath(nodeId: number): string {
  return nodeId === 0 ? '/' : `/${nodeId}`;
}

function getLeafPath(nodeId: number, leaf: TreeLeaf): string {
  return `/${nodeId}/${leaf.name}`
}

function App() {
  const [data, setData] = useState<InputTree | undefined>(undefined);
  const [index, setIndex] = useState<Index | undefined>(undefined);
  const [nodeStack, setNodeStack] = useState<number[]>([]);
  const navigate = useNavigate();
  const params = useParams();
  const nodeId = params.nodeId ? parseInt(params.nodeId, 10) : 0;
  const {speciesName} = params;

  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/export.json`)
      .then(res => {
        const data: InputParent = res.data;
        setData(data);
        setIndex(buildIndex(data));
      });
  }, []);

  function switchToNode(newNodeId: number) {
    if (newNodeId === -1) {
      if (nodeStack.length > 0) {
        newNodeId = nodeStack[nodeStack.length - 1];
        setNodeStack(nodeStack.filter((value, index) => index !== nodeStack.length - 1));
      } else if (index) {
        newNodeId = getAncestorId(nodeId, OUTGROUP_JUMP, index);
      } else {
        newNodeId = 0;
      }
    } else {
      setNodeStack([...nodeStack, nodeId]);
    }
    navigate(getNodePath(newNodeId));
  }

  function imageOnClick(leaf: TreeLeaf) {
    if ((leaf.speciesCount && leaf.speciesCount > 1) || leaf.id === -1) {
      switchToNode(leaf.id);
    } else {
      navigate(getLeafPath(nodeId, leaf));
    }
  }

  if (!data || !index) {
    return <div></div>
  }
  let graph = prepareGraph(
    index[nodeId],
    MAX_LEAF_COUNT,
  );
  const openSpecies = speciesName ? graph.findSpecies(speciesName)?.value : undefined;
  return (
    <div className="App">
      <div className='node-desc'>{index[nodeId].name}</div>
      <Tree
        graph={graph}
        imageOnClick={imageOnClick}
      />
      <Infobox open={!!openSpecies} onClose={() => {navigate(getNodePath(nodeId));}} leaf={openSpecies}/>
    </div>
  );
}

function buildIndex(data: InputTree): Index {
  let index: Index = {};
  if ('children' in data) {
    index[data.id] = data;
    for (const child of data.children) {
      Object.assign(index, buildIndex(child));
    }
  }
  return index;
}

function getAncestorId(nodeId: number, jump: number, index: Index): number {
  let ancestorId = nodeId;
  for (let i = 0; i < jump; i++) {
    ancestorId = index[ancestorId].parent_id;
    if (ancestorId === 0) break;
  }
  return ancestorId;
}

export default App;
