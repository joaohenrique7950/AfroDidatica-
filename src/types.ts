export type Language = 'pt' | 'en' | 'fr' | 'es' | string;

export interface PrimaryDocument {
  id: string;
  title: Record<Language, string>;
  source: Record<Language, string>;
  content: Record<Language, string>;
}

export interface BibliographyEntry {
  author: string;
  title: string;
  year?: string;
  note?: Record<Language, string>;
}

export interface SeshatData {
  capital: Record<Language, string>;
  territory: Record<Language, string>;
  population: Record<Language, string>;
  settlementHierarchy: Record<Language, string>;
  administrativeLevels: Record<Language, string>;
  governmentType: Record<Language, string>;
  languages: Record<Language, string>;
  religionInfo: Record<Language, string>;
}

export interface HistoricalPoint {
  id: string;
  name: Record<Language, string>;
  region: 'nile_valley' | 'horn_of_africa' | 'west_africa' | 'north_africa' | 'central_sahara' | 'custom';
  regionLabel: Record<Language, string>;
  era: 'pre_bronze' | 'antiquity' | 'classical_era';
  eraLabel: Record<Language, string>;
  coordinates: { x: number; y: number }; // percentage positions on map (X: 0-100, Y: 0-100)
  period: Record<Language, string>;
  description: Record<Language, string>;
  primaryDocuments: PrimaryDocument[];
  bibliography: BibliographyEntry[];
  pedagogicalSuggestions?: Record<Language, string[]>;
  seshatData?: Partial<SeshatData>;
}

export interface OnboardingState {
  language: Language;
  gradeLevel: 'primary' | 'middle' | 'high' | 'university';
  focusTopics: string[];
}

export type PedagogicalFormat = 'lesson_plan' | 'activity' | 'didactic_sequence';

export interface GeneratedPedagogy {
  id: string;
  format: PedagogicalFormat;
  pointId: string;
  pointName: string;
  title: string;
  content: string; // Markdown formatted content
  createdAt: string;
  language: Language;
}
