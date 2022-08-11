export type TreeLeaf = {
  id: number;
  url: string;
  speciesCount?: number;
  name?: string;
}

export type TreeParent = {
  id: number;
  children: TreeNode[];
}

export type TreeNode = TreeLeaf | TreeParent;
