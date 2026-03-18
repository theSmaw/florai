// Arrangement domain types and interfaces

export type ArrangementSize = 'small' | 'medium' | 'large' | 'extra-large';
export type ArrangementStyle = 'romantic' | 'rustic' | 'modern' | 'wild' | 'classic' | 'contemporary';
export type ArrangementOccasion = 'wedding' | 'birthday' | 'funeral' | 'everyday' | 'sympathy' | 'anniversary';

export const SIZE_ORDER: ArrangementSize[] = ['small', 'medium', 'large', 'extra-large'];

export const SIZE_LABEL: Record<ArrangementSize, string> = {
  'small': 'Small',
  'medium': 'Medium',
  'large': 'Large',
  'extra-large': 'Extra Large',
};

export const STYLE_LABEL: Record<ArrangementStyle, string> = {
  'romantic': 'Romantic',
  'rustic': 'Rustic',
  'modern': 'Modern',
  'wild': 'Wild',
  'classic': 'Classic',
  'contemporary': 'Contemporary',
};

export const OCCASION_LABEL: Record<ArrangementOccasion, string> = {
  'wedding': 'Wedding',
  'birthday': 'Birthday',
  'funeral': 'Funeral',
  'everyday': 'Everyday',
  'sympathy': 'Sympathy',
  'anniversary': 'Anniversary',
};

export interface ArrangementFilter {
  searchTerm?: string;
  size?: ArrangementSize;
  style?: ArrangementStyle;
  occasion?: ArrangementOccasion;
  groupBy?: 'size' | 'occasion' | 'none';
}

export interface Arrangement {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  flowerIds: string[];
  size: ArrangementSize;
  style?: ArrangementStyle;
  occasion?: ArrangementOccasion[];
  stemCount?: number;
  estimatedWeightGrams?: number;
  timeToBuildMinutes?: number;
  vaseLifeDays?: number;
  wholesaleCost?: number;
  retailPrice?: number;
  notes?: string;
  createdAt: string;
}

export type NewArrangement = Omit<Arrangement, 'id' | 'createdAt'>;
