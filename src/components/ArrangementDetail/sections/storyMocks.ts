// Shared mock data and prop helpers for the arrangement section stories.
import type { Arrangement } from '../../../domain/Arrangement';
import type { Flower } from '../../../domain/Flower';
import type { ArrangementSectionProps } from './types';

export const MOCK_FLOWERS: Flower[] = [
  {
    id: '1',
    name: 'Peony Sarah Bernhardt',
    colors: ['pink'],
    type: 'Peony',
    wholesalePrice: 4.5,
    supplier: 'Holland Flowers',
    suppliers: [],
    season: ['Spring'],
    availability: 'seasonal',
    climate: 'temperate',
    careInstructions: '',
    notes: '',
    complementaryFlowerIds: [],
  },
  {
    id: '2',
    name: 'Explorer Red Rose',
    colors: ['red'],
    type: 'Rose',
    wholesalePrice: 2.25,
    supplier: 'Kenya Blooms',
    suppliers: [],
    season: ['Year-round'],
    availability: 'always',
    climate: 'subtropical',
    careInstructions: '',
    notes: '',
    complementaryFlowerIds: [],
  },
];

export const MOCK_ARRANGEMENT: Arrangement = {
  id: 'a1',
  name: 'Spring Romance',
  size: 'medium',
  style: 'romantic',
  occasion: ['wedding'],
  flowerIds: ['1', '2'],
  stemCount: 25,
  estimatedWeightGrams: 450,
  timeToBuildMinutes: 45,
  vaseLifeDays: 7,
  wholesaleCost: 42.5,
  retailPrice: 120,
  notes: 'Great for spring weddings. Blush and cream palette.',
  createdAt: '2026-01-15T10:00:00Z',
};

const NO_OP = () => {};

/** Common props shared by the coordinated field-section stories. */
export function fieldProps(isEditing = false): Omit<ArrangementSectionProps, 'arrangement'> {
  return {
    isEditing,
    canEdit: true,
    saving: false,
    error: null,
    onEditStart: NO_OP,
    onEditEnd: NO_OP,
    onSave: NO_OP,
  };
}
