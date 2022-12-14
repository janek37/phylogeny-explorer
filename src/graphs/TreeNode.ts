import {KnownForItem, LocalNames} from "./InputTree";
import type {Image} from "./InputTree";

export type TreeLeaf = {
  id: number;
  speciesCount?: number;
  name?: string;
  extinct: boolean;
  localNames: LocalNames;
  knownFor: KnownForItem[];
  image: Image;
}

export type TreeParent = {
  id: number;
  children: TreeNode[];
}

export type TreeNode = TreeLeaf | TreeParent;
