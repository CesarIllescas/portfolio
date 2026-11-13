export type Locale = 'en' | 'es';
export type Localized = Record<Locale, string>;
export type DiagramKind = 'agent' | 'logistics' | 'forecast' | 'freshhire';

export interface Project {
  id: string;
  diagram: DiagramKind;
  title: string;
  subtitle: Localized;
  category: Localized;
  problem: Localized;
  solution: Localized;
  outcome: Localized;
  metric?: { value: string; label: Localized };
  technologies: string[];
  url?: string;
}

export interface Experience {
  company: string;
  relationship?: Localized;
  roles: {
    title: string;
    start: string;
    end: string | null;
    contributions: Localized[];
    technologies: string[];
  }[];
}
