export type InputTree = InputParent | InputLeaf;

export type InputParent = InputNode & {
  children: InputTree[];
  species_count: number;
};

export type InputLeaf = InputNode & {
  image: Image;
  name: string;
};

type LANG = 'en' | 'pl';

type InputNode = {
  id: number;
  name?: string;
  rank: string;
  extinct: boolean;
  local_names: {[key in LANG]?: string};
  known_for: KnownForItem[];
};

type KnownForItem = {
  image?: Image;
  url?: string;
  name?: string;
  local_names: {[key in LANG]?: string},
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
