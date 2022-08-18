import trimData from "./trimData";
import {TreeLeaf, TreeParent} from "./TreeNode";
import {InputParent} from "./InputTree";
import makeGraph from "./makeGraph";

function prepareGraph(inputNode: InputParent, maxLeafCount: number) {
  let data = trimData(inputNode, maxLeafCount) as TreeParent;
  if (inputNode.parent_id !== null) {
    data = addOutgroup(data);
  }
  return makeGraph(data);
}

function addOutgroup(treeNode: TreeParent): TreeParent {
  const outgroup: TreeLeaf = {
    id: -1,
    extinct: false,
    localNames: {},
    knownFor: [],
    image: {
      image_url: '/outgroup.svg',
      url: '/outgroup.svg',
      thumbnail_url: '/outgroup.svg',
      local_thumbnail_url: '/outgroup.svg',
      author: '',
      license_code: '',
      license_string: '',
      license_url: '',
      name: undefined,
    }
  }
  return {id: treeNode.id, children: [outgroup, treeNode]};
}

export default prepareGraph;
