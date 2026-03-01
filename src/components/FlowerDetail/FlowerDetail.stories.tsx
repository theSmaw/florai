import type { Meta, StoryObj } from '@storybook/react';
import type { Flower } from '../../domain/Flower';
import { FlowerDetail } from './FlowerDetail';

const meta: Meta<typeof FlowerDetail> = {
  title: 'Components/FlowerDetail',
  component: FlowerDetail,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_FLOWER: Flower = {
  id: '1',
  name: 'Peony Sarah Bernhardt',
  colors: ['pink', 'white'],
  type: 'Peony',
  wholesalePrice: 4.5,
  retailPrice: 8.99,
  supplier: 'Holland Flowers',
  origin: 'Netherlands',
  season: ['Spring'],
  availability: 'seasonal',
  quantityOnHand: 45,
  stemLengthCm: 50,
  fragranceLevel: 'strong',
  toxicity: 'safe',
  vaseLifeDays: 7,
  careInstructions: 'Keep in cool water, change daily. Remove lower leaves that would sit below the waterline.',
  notes: 'Beautiful full bloom. Order 2 weeks in advance for spring weddings.',
  complementaryFlowerIds: ['2', '3'],
};

const MOCK_COMPLEMENTARY: Flower[] = [
  {
    id: '2',
    name: 'Explorer Red Rose',
    colors: ['red'],
    type: 'Rose',
    wholesalePrice: 2.25,
    retailPrice: 4.99,
    supplier: 'Kenya Blooms',
    origin: 'Kenya',
    season: ['Year-round'],
    availability: 'always',
    quantityOnHand: 120,
    complementaryFlowerIds: [],
  },
  {
    id: '3',
    name: 'Annabelle Hydrangea',
    colors: ['white'],
    type: 'Hydrangea',
    wholesalePrice: 3.75,
    retailPrice: 7.49,
    supplier: 'Dutch Garden',
    origin: 'Netherlands',
    season: ['Summer'],
    availability: 'seasonal',
    quantityOnHand: 30,
    complementaryFlowerIds: [],
  },
];

const NO_OP = () => {};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: 'Full details',
  render: () => (
    <FlowerDetail
      flower={MOCK_FLOWER}
      complementaryFlowers={MOCK_COMPLEMENTARY}
      onBack={NO_OP}
    />
  ),
};

export const NoOptionalFields: Story = {
  name: 'Minimal (no optional fields)',
  render: () => (
    <FlowerDetail
      flower={{
        id: '4',
        name: 'Simple Tulip',
        colors: ['yellow'],
        type: 'Tulip',
        wholesalePrice: 1.5,
        retailPrice: 3.0,
        supplier: 'Spring Co.',
        origin: 'Turkey',
        season: ['Spring'],
        availability: 'limited',
        quantityOnHand: 20,
        complementaryFlowerIds: [],
      }}
      complementaryFlowers={[]}
      onBack={NO_OP}
    />
  ),
};

export const NoPairings: Story = {
  name: 'No complementary flowers',
  render: () => (
    <FlowerDetail
      flower={MOCK_FLOWER}
      complementaryFlowers={[]}
      onBack={NO_OP}
    />
  ),
};

export const ToxicFlower: Story = {
  name: 'Toxic flower',
  render: () => (
    <FlowerDetail
      flower={{
        ...MOCK_FLOWER,
        name: 'Lily of the Valley',
        toxicity: 'toxic',
        availability: 'always',
        fragranceLevel: 'moderate',
      }}
      complementaryFlowers={[]}
      onBack={NO_OP}
    />
  ),
};
