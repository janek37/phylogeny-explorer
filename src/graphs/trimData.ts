import {TreeLeaf, TreeNode, TreeParent} from "./TreeNode";
import {InputLeaf, InputParent, InputTree} from "./InputTree";

function trimData(data: InputParent, leafLimit: number): TreeNode {
  let nodes: (TreeNode|undefined)[] = [undefined];
  let queue: [InputParent, (TreeNode|undefined)[], number][] = [[data, nodes, 0]];
  let leafCount = 0;
  while (queue.length && queue.length + leafCount < leafLimit) {
    let [inputParent, treeNodes, index] = queue[0];
    while (inputParent.children.length === 1) {
      const child = inputParent.children[0];
      if ('children' in child) {
        inputParent = child;
      } else {
        break;
      }
    }
    let treeNode: TreeParent = {id: inputParent.id, children: []};
    queue = queue.slice(1);
    for (const child of inputParent.children) {
      let childNode;
      if ('children' in child) {
        if (child.species_count > 3) {
          childNode = undefined;
          queue.push([child, treeNode.children, treeNode.children.length]);
        } else {
          childNode = trimNode(child);
          leafCount += child.species_count;
        }
      } else {
        childNode = trimLeaf(child);
        leafCount++;
      }
      treeNode.children.push(childNode as TreeNode); // undefined's are only temporary
    }
    treeNodes[index] = treeNode;
  }
  for (const [inputParent, treeNodes, index] of queue) {
    treeNodes[index] = trimNodeToLeaf(inputParent);
  }
  return nodes[0] as TreeNode;
}

function trimNode(data: InputTree): TreeNode {
  if ('children' in data) {
    if (data.children.length === 1) {
      return trimNode(data.children[0]);
    } else {
      return {
        id: data.id,
        children: data.children.map(trimNode),
      };
    }
  } else {
    return trimLeaf(data);
  }
}

function trimNodeToLeaf(data: InputTree): TreeLeaf {
  const leaf = findLeaf(data);
  let trimmed: TreeNode = {id: data.id, url: leaf.image.image_url, name: data.name, extinct: data.extinct};
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

function trimLeaf(leaf: InputLeaf): TreeLeaf {
  return {id: leaf.id, url: leaf.image.image_url, name: leaf.name, extinct: leaf.extinct};
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
