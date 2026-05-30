export interface Scheme {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  documents: string[];
  applySteps: string[];
  importantNotes: string[];
  officialLink: string;
  imageColor: string; // gradient color for the scheme card
  isFeatured: boolean;
  isTrending: boolean;
  launchedYear: string;
  ministry: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  count: number;
}

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  SchemeDetails: { schemeId: string };
  CategorySchemes: { categoryId: string; categoryName: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Bookmarks: undefined;
  Settings: undefined;
};
