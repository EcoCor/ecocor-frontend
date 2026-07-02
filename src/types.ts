export interface ApiInfo {
  base: string;
  name: string;
  version: string;
  existdb: string;
}
export interface Author {
  name: string;
  ref?: string;
}

export interface SourceLink {
  url: string;
  text?: string;
}

export interface Source {
  bibl: string;
  type?: string;
  title?: string;
  author?: string;
  publisher?: string;
  year?: string;
  placePublished?: string;
  links?: SourceLink[];
}

export interface Text {
  id: string;
  name: string;
  corpus: string;
  title: string;
  authors?: Author[];
  ref?: string;
  refs?: string[];
  sources?: Source[];
  commit?: string;
  referenceYear?: string;
  metrics: {
    biodiversityIndex?: number;
    numOfAnimals?: number;
    numOfChapters?: number;
    numOfEntities?: number;
    numOfEntityTypes?: number;
    numOfParagraphs?: number;
    numOfPlants?: number;
    numOfWords?: number;
  };
  corpusUrl: string;
  entitiesUrl: string;
}

export interface CorpusMetrics {
  numOfTexts: number;
  numOfAuthors: number;
  numOfParagraphs: number;
  numOfWords: number;
  numOfEntities: number;
  numOfEntityTypes: number;
  numOfAnimals: number;
  numOfPlants: number;
  biodiversityIndex: number;
}

export interface CorpusListEntry {
  name: string;
  title: string;
  description: string;
  repository: string;
  license: string;
  licenseUrl: string;
  uri: string;
  commit?: string;
  metrics?: CorpusMetrics;
  updated?: string;
}

export interface CorpusData {
  name: string;
  title: string;
  description: string;
  repository: string;
  license: string;
  licenseUrl: string;
  uri: string;
  commit?: string;
  metrics?: CorpusMetrics;
}

export interface EntityOccurrence {
  id: string;
  frequency: number;
  text?: string;
}

export interface Entity {
  id: string;
  name: string;
  type: 'Animal' | 'Plant';
  metrics: {
    overallFrequency: number;
    occurrences: EntityOccurrence[];
  };
}
