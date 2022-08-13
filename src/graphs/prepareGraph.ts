import trimData from "./trimData";
import {TreeLeaf, TreeParent} from "./TreeNode";
import {InputParent} from "./InputTree";
import makeGraph from "./makeGraph";

function prepareGraph(inputNode: InputParent, maxLeafCount: number, isRoot: boolean) {
  let data = trimData(inputNode, maxLeafCount) as TreeParent;
  if (!isRoot) {
    data = addOutgroup(data);
  }
  return makeGraph(data);
}

function addOutgroup(treeNode: TreeParent): TreeParent {
  const outgroup: TreeLeaf = {
    id: -1, url: '/outgroup.svg', thumbUrl: '/outgroup.svg', extinct: false
  }
  return {id: treeNode.id, children: [outgroup, treeNode]};
}

export default prepareGraph;