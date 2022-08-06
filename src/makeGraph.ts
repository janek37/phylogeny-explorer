import {TreeParent} from "./TreeNode";
import {Leaf, Parent} from "./GraphNode";

function makeGraph(tree: TreeParent): Parent {
  return addPositions(tree).graph;
}

function addPositions(tree: TreeParent, startPosition: number = 0): {graph: Parent, position: number} {
  let position = startPosition;
  let newChildren = [];
  let newChild;
  for (const child of tree.children) {
    if ('children' in child) {
      const result = addPositions(child, position);
      newChild = result.graph;
      position = result.position;
    } else {
      newChild = new Leaf(child, position);
      position++;
    }
    newChildren.push(newChild);
  }
  return {graph: new Parent(newChildren), position: position};
}

export default makeGraph;
