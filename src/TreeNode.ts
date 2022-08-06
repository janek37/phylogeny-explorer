export type TreeLeaf = {
  url: string;
  type: 'leaf',
}

export type TreeParent = {
  children: TreeNode[];
  type: 'parent',
}

export type TreeNode = TreeLeaf | TreeParent;
