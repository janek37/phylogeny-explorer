import {TreeLeaf} from "./TreeNode";

export type GraphNode = Leaf | Parent;

export class Leaf {
  id: number;
  position: number;
  level = 0;
  value: TreeLeaf;

  constructor(value: TreeLeaf, position: number) {
    this.id = value.id;
    this.position = position;
    this.value = value;
  }

  leavesCount() {
    return 1;
  }
}

export class Parent {
  id: number;
  position: number;
  level: number;
  children: GraphNode[];

  constructor(id: number, children: GraphNode[]) {
    this.id = id;
    this.children = children;
    this.position = this.getPosition();
    this.level = this.getLevel();
  }

  private getPosition(): number {
    const firstChildPosition = this.children[0].position;
    const lastChildPosition = (this.children.at(-1) as GraphNode).position;
    return (firstChildPosition + lastChildPosition)/2
  }

  private getLevel(): number {
    const maxChildLevel = Math.max(...this.children.map(child => child.level));
    return maxChildLevel + 1;
  }

  public leavesCount(): number {
    return this.children.map(child => child.leavesCount()).reduce((n1, n2) => n1 + n2);
  }

  public findSpecies(speciesName: string): Leaf | undefined {
    for (const child of this.children) {
      if ('children' in child) {
        const species = child.findSpecies(speciesName);
        if (species) return species;
      } else if (child.value.name === speciesName) {
        return child;
      }
    }
  }
}