export interface Author {
  name: string;
}

export interface Work {
  id: string;
  name: string;
  authors: Author[];
  title: string;
  source: string;
  sourceUrl: string;
}

export interface CorpusMetrics {
  works: number;
  authors: number;
  words: number;
}

export interface CorpusListEntry {
  name: string;
  title: string;
  description: string;
  repository: string;
  license: string;
  licenseUrl: string;
  uri: string;
  metrics?: CorpusMetrics;
}

export interface CorpusData {
  name: string;
  title: string;
  description: string;
  works: Work[];
}
