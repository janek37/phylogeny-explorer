import {TreeNode} from "./TreeNode";
import {InputLeaf, InputTree} from "./InputTree";

function trimData(data: InputTree, levelLimit: number): TreeNode {
  if (levelLimit === 0) {
    const leaf = findLeaf(data);
    return {id: leaf.id, url: leaf.image.image_url};
  }
  if ('children' in data) {
    if (data.children.length === 1) {
      return trimData(data.children[0], levelLimit);
    } else {
      return {
        id: data.id,
        children: data.children.map(child => trimData(child, levelLimit - 1)),
      };
    }
  } else {
    return {id: data.id, url: data.image.image_url};
  }
}

function findLeaf(node: InputTree): InputLeaf {
  if ('children' in node) {
    return findLeaf(node.children[0]);
  } else {
    return node;
  }
}

export default trimData;
