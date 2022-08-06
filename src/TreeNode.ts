export type TreeLeaf = {
  url: string;
}

export type TreeParent = {
  children: TreeNode[];
}

export type TreeNode = TreeLeaf | TreeParent;
