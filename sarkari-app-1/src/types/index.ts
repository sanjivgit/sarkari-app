// src/types/index.ts

export interface Scheme {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  tagline: string;
  description: string;
  launchedBy: string;
  launchYear: string;
  ministry: string;
  eligibility: string[];
  benefits: Benefit[];
  documents: string[];
  applySteps: ApplyStep[];
  importantNotes: string[];
  officialLink: string;
  helplineNumber?: string;
  image: string;
  coverColor: string;
  tags: string[];
  faq: FAQ[];
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface ApplyStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  SchemeDetail: { schemeId: string; section?: string };
  Eligibility: { schemeId: string };
  Benefits: { schemeId: string };
  Documents: { schemeId: string };
  ApplyProcess: { schemeId: string };
  FAQ: { schemeId: string };
  Bookmarks: undefined;
  Settings: undefined;
  About: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Bookmarks: undefined;
  Settings: undefined;
  Eligibility: { schemeId: string };
  FAQ: { schemeId: string };
};