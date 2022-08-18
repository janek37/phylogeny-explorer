export type InputTree = InputParent | InputLeaf;

export type InputParent = InputNode & {
  parent_id: number;
  children: InputTree[];
  species_count: number;
};

export type InputLeaf = InputNode & {
  image: Image;
  name: string;
};

type LANG = 'en' | 'pl';

export type LocalNames = {[key in LANG]?: string};

type InputNode = {
  id: number;
  name?: string;
  rank: string;
  extinct: boolean;
  local_names: LocalNames;
  known_for: KnownForItem[];
};

export type KnownForItem = {
  image?: Image;
  url?: string;
  name?: string;
  local_names: LocalNames,
};

export type Image = {
  image_url: string;
  thumbnail_url: string;
  local_thumbnail_url: string;
  url: string;
  author: string;
  license_code: string;
  license_string: string;
  license_url: string;
  name: string | undefined;
};
