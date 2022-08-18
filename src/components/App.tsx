import './App.css';
import React, {useEffect, useState} from 'react';
import Tree from './Tree';

import axios from "axios";
import {InputParent, InputTree} from "../graphs/InputTree";
import prepareGraph from "../graphs/prepareGraph";
import {useNavigate, useParams} from "react-router-dom";
import {TreeLeaf} from "../graphs/TreeNode";
import {Infobox} from "./Infobox";

const MAX_LEAF_COUNT = 20;

const OUTGROUP_JUMP = 4;

type Index = {[key: number]: InputParent};

function App() {
  const [data, setData] = useState<InputTree | undefined>(undefined);
  const [index, setIndex] = useState<Index | undefined>(undefined);
  const [infoboxOpen, setInfoboxOpen] = useState<boolean>(false);
  const [infoboxLeaf, setInfoboxLeaf] = useState<TreeLeaf | undefined>(undefined);
  const [nodeStack] = useState<number[]>([]);
  const navigate = useNavigate();
  const params = useParams();
  const nodeId = params.nodeId ? parseInt(params.nodeId, 10) : 0;

  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/export.json`)
      .then(res => {
        const data: InputParent = res.data;
        setData(data);
        setIndex(buildIndex(data));
      });
  }, []);

  useEffect(() => {
    if (index && nodeId !== 0 && nodeStack.length === 0) {
      nodeStack.push(getAncestorId(nodeId, OUTGROUP_JUMP, index));
    }
  });

  function switchToNode(newNodeId: number) {
    if (newNodeId === -1) {
      newNodeId = nodeStack.pop() as number;
    } else {
      nodeStack.push(nodeId);
    }
    navigate(`/${newNodeId}`);
  }

  function openInfobox(leaf: TreeLeaf) {
    setInfoboxLeaf(leaf);
    setInfoboxOpen(true);
  }

  function imageOnClick(leaf: TreeLeaf) {
    if ((leaf.speciesCount && leaf.speciesCount > 1) || leaf.id === -1) {
      switchToNode(leaf.id);
    } else {
      openInfobox(leaf);
    }
  }

  if (!data || !index) {
    return <div></div>
  }
  let graph = prepareGraph(
    index[nodeId],
    MAX_LEAF_COUNT,
  );
  return (
    <div className="App">
      <Tree
        graph={graph}
        imageOnClick={imageOnClick}
      />
      <Infobox open={infoboxOpen} onClose={() => {setInfoboxOpen(false);}} leaf={infoboxLeaf}/>
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
