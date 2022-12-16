export interface Author {
  name: string;
}

export interface Work {
  id: string;
  name: string;
  authors: Author[];
  title: string;
}

export interface CorpusListEntry {
  name: string;
  title: string;
  description: string;
  repository: string;
  license: string;
  licenseUrl: string;
  uri: string;
}

export interface CorpusData {
  name: string;
  title: string;
  description: string;
  works: Work[];
}
