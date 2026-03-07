import type { Meta, StoryObj } from '@storybook/react';
import { ArrangementCard } from './ArrangementCard';
import type { ArrangementCardProps } from './ArrangementCard';
import type { Arrangement } from '../../domain/Arrangement';
import type { Flower } from '../../domain/Flower';

const meta: Meta<typeof ArrangementCard> = {
  title: 'Components/ArrangementCard',
  component: ArrangementCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_FLOWERS: Flower[] = [
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

const MOCK_ARRANGEMENT: Arrangement = {
  id: 'a1',
  name: 'Spring Romance',
  size: 'medium',
  style: 'romantic',
  occasion: ['wedding'],
  flowerIds: ['1', '2'],
  createdAt: '2026-01-15T10:00:00Z',
};

const NO_OP = () => {};

function defaultProps(overrides?: Partial<ArrangementCardProps>): ArrangementCardProps {
  return {
    arrangement: MOCK_ARRANGEMENT,
    flowers: MOCK_FLOWERS,
    onClick: NO_OP,
    ...overrides,
  };
}

export const Default: Story = {
  name: 'Default',
  render: () => (
    <div style={{ width: 200 }}>
      <ArrangementCard {...defaultProps()} />
    </div>
  ),
};

export const WithImage: Story = {
  name: 'With image',
  render: () => (
    <div style={{ width: 200 }}>
      <ArrangementCard
        {...defaultProps({
          arrangement: { ...MOCK_ARRANGEMENT, imageUrl: '/images/placeholder.svg' },
        })}
      />
    </div>
  ),
};

export const SmallSize: Story = {
  name: 'Small arrangement',
  render: () => (
    <div style={{ width: 200 }}>
      <ArrangementCard
        {...defaultProps({
          arrangement: { ...MOCK_ARRANGEMENT, size: 'small', flowerIds: ['1'] },
        })}
      />
    </div>
  ),
};

export const NoFlowers: Story = {
  name: 'No flowers',
  render: () => (
    <div style={{ width: 200 }}>
      <ArrangementCard
        {...defaultProps({
          arrangement: { ...MOCK_ARRANGEMENT, flowerIds: [] },
        })}
      />
    </div>
  ),
};
