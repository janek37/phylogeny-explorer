import {TreeNode} from "./TreeNode";
import {InputLeaf, InputTree} from "./InputTree";

function trimData(data: InputTree, levelLimit: number): TreeNode {
  if (levelLimit === 0) {
    const leaf = findLeaf(data);
    let trimmed: TreeNode = {id: data.id, url: leaf.image.image_url, name: data.name};
    if ('species_count' in data && data.species_count > 1) {
      trimmed['speciesCount'] = data.species_count;
    } else {
      trimmed['name'] = leaf.name;
    }
    const children = closestFork(data);
    if (!data.name && children.length === 2 && children[0].name && children[1].name) {
      trimmed['name'] = `${children[0].name} and ${children[1].name}`
    }
    return trimmed;
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
    return {id: data.id, url: data.image.image_url, name: data.name};
  }
}

function findLeaf(node: InputTree): InputLeaf {
  if ('children' in node) {
    return findLeaf(node.children[0]);
  } else {
    return node;
  }
}

function closestFork(node: InputTree): InputTree[] {
  if ('children' in node) {
    if (node.children.length > 1) {
      return node.children;
    } else {
      return closestFork(node.children[0]);
    }
  } else {
    return [node];
  }
}

export default trimData;
