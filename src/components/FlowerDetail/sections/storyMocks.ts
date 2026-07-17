// Shared mock data and prop helpers for the flower section stories.
import type { Flower } from '../../../domain/Flower';
import type { FlowerFieldSectionProps } from './types';

export const MOCK_FLOWER: Flower = {
  id: '1',
  name: 'Peony Sarah Bernhardt',
  colors: ['pink', 'white'],
  type: 'Peony',
  imageUrl: '/images/flowers/peony.png',
  wholesalePrice: 4.5,
  supplier: 'Holland Flowers',
  suppliers: [],
  season: ['Spring'],
  availability: 'seasonal',
  climate: 'temperate',
  stemLengthCm: 50,
  fragranceLevel: 'strong',
  toxicity: 'safe',
  vaseLifeDays: 7,
  careInstructions: 'Keep in cool water, change daily.',
  notes: 'Beautiful full bloom, long lasting.',
  complementaryFlowerIds: ['2'],
};

export const MOCK_FLOWERS: Flower[] = [
  MOCK_FLOWER,
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

const NO_OP = () => {};

/** Common props shared by the coordinated flower field-section stories. */
export function fieldProps(isEditing = false): Omit<FlowerFieldSectionProps, 'flower'> {
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
