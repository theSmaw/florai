import type { Meta, StoryObj } from '@storybook/react';
import { Collection } from './Collection';
import type { CollectionProps } from './Collection';
import type { Arrangement, ArrangementFilter } from '../../domain/Arrangement';
import type { Flower } from '../../domain/Flower';

const meta: Meta<typeof Collection> = {
  title: 'Components/Collection',
  component: Collection,
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
];

const MOCK_ARRANGEMENTS: Arrangement[] = [
  {
    id: 'a1',
    name: 'Spring Romance',
    size: 'medium',
    style: 'romantic',
    occasion: ['wedding'],
    flowerIds: ['1'],
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'a2',
    name: 'Wild Garden Posy',
    size: 'small',
    style: 'wild',
    occasion: ['everyday', 'birthday'],
    flowerIds: ['1'],
    createdAt: '2026-01-10T10:00:00Z',
  },
];

const EMPTY_FILTER: ArrangementFilter = { groupBy: 'none' };
const NO_OP = () => {};

function defaultProps(overrides?: Partial<CollectionProps>): CollectionProps {
  return {
    arrangements: MOCK_ARRANGEMENTS,
    groupedArrangements: { All: MOCK_ARRANGEMENTS },
    currentFilter: EMPTY_FILTER,
    isLoading: false,
    flowers: MOCK_FLOWERS,
    onFilterChange: NO_OP,
    onCardClick: NO_OP,
    onAddClick: NO_OP,
    filterPills: [],
    saving: false,
    saveError: null,
    isAddOpen: false,
    onAddOpenChange: NO_OP,
    ...overrides,
  };
}

export const Default: Story = {
  name: 'With arrangements',
  render: () => <Collection {...defaultProps()} />,
};

export const Loading: Story = {
  name: 'Loading',
  render: () => (
    <Collection
      {...defaultProps({
        isLoading: true,
        arrangements: [],
        groupedArrangements: {},
      })}
    />
  ),
};

export const Empty: Story = {
  name: 'Empty state',
  render: () => (
    <Collection
      {...defaultProps({
        arrangements: [],
        groupedArrangements: { All: [] },
      })}
    />
  ),
};

export const WithActiveFilters: Story = {
  name: 'With active filters',
  render: () => (
    <Collection
      {...defaultProps({
        currentFilter: { size: 'medium', groupBy: 'none' },
        filterPills: [{ label: 'Medium', onClear: NO_OP }],
      })}
    />
  ),
};
