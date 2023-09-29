export interface Author {
  name: string;
  ref?: string;
}

export interface Text {
  id: string;
  name: string;
  authors: Author[];
  title: string;
  source: string;
  sourceUrl: string;
  dates?: {
    yearNormalized: string;
    yearWritten?: string;
    yearPrinted?: string;
  };
  metrics?: {
    biodiversityIndex: number;
    numOfAnimals: number;
    numOfChapters: number;
    numOfEntities: number;
    numOfEntityTypes: number;
    numOfParagraphs: number;
    numOfPlants: number;
    numOfWords: number;
  };
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
  metrics: {
    overallFrequency: number;
    occurrences: EntityOccurrence[];
  };
}
