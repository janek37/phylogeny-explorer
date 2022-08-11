export type InputTree = InputParent | InputLeaf;

export type InputParent = InputNode & {
  children: InputTree[];
  species_count: number;
};

export type InputLeaf = InputNode & {
  image: Image;
  name: string;
};

type InputNode = {
  id: number;
  name?: string;
  rank: string;
  extinct: boolean;
  local_names: {[key: string]: string};
  known_for: KnownForItem[];
};

type KnownForItem = {
  image: Image | undefined;
};

type Image = {
  image_url: string;
  url: string;
  author: string;
  license_code: string;
  license_string: string;
  license_url: string;
  name: string | undefined;
};
