import {TreeNode} from "./TreeNode";

function trimData(data: any, levelCount: number): TreeNode {
  if (levelCount === 0) {
    const leaf = findLeaf(data);
    return {url: leaf.image.image_url};
  }
  if ('children' in data) {
    if (data.children.length === 1) {
      return trimData(data.children[0], levelCount);
    } else {
      return {children: data.children.map((child: any) => trimData(child, levelCount - 1))};
    }
  } else {
    return {url: data.image.image_url};
  }
}

function findLeaf(node: any): any {
  if ('children' in node) {
    return findLeaf(node.children[0]);
  } else {
    return node;
  }
}

export default trimData;
