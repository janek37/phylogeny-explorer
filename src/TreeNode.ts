export type TreeLeaf = {
  id: number;
  url: string;
  speciesCount?: number;
}

export type TreeParent = {
  id: number;
  children: TreeNode[];
}

export type TreeNode = TreeLeaf | TreeParent;
