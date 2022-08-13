export type TreeLeaf = {
  id: number;
  url: string;
  thumbUrl: string;
  speciesCount?: number;
  name?: string;
  extinct: boolean;
}

export type TreeParent = {
  id: number;
  children: TreeNode[];
}

export type TreeNode = TreeLeaf | TreeParent;
