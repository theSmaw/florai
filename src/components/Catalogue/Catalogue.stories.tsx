import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Catalogue } from './Catalogue';
import type { CatalogueProps } from './Catalogue';
import type { Climate, Flower, FlowerFilter } from '../../domain/Flower';

const meta: Meta<typeof Catalogue> = {
  title: 'Components/Catalogue',
  component: Catalogue,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_FLOWERS: Flower[] = [
  {
    id: '1',
    name: 'Peony Sarah Bernhardt',
    colors: ['pink'],
    type: 'Peony',
    wholesalePrice: 4.5,
    supplier: 'Holland Flowers',
    season: ['Spring'],
    availability: 'seasonal',
    climate: 'temperate',
    stemLengthCm: 50,
    fragranceLevel: 'strong',
    toxicity: 'safe',
    vaseLifeDays: 7,
    careInstructions: 'Keep in cool water, change daily',
    notes: 'Beautiful full bloom',
    complementaryFlowerIds: [],
  },
  {
    id: '2',
    name: 'Explorer Red Rose',
    colors: ['red'],
    type: 'Rose',
    wholesalePrice: 2.25,
    supplier: 'Kenya Blooms',
    season: ['Year-round'],
    availability: 'always',
    climate: 'subtropical',
    stemLengthCm: 60,
    fragranceLevel: 'light',
    toxicity: 'mild',
    vaseLifeDays: 10,
    careInstructions: 'Trim stems at 45° angle',
    notes: 'Classic red rose',
    complementaryFlowerIds: [],
  },
  {
    id: '3',
    name: 'Annabelle Hydrangea',
    colors: ['white'],
    type: 'Hydrangea',
    wholesalePrice: 3.75,
    supplier: 'Dutch Garden',
    season: ['Summer'],
    availability: 'seasonal',
    climate: 'temperate',
    stemLengthCm: 40,
    fragranceLevel: 'none',
    toxicity: 'mild',
    vaseLifeDays: 8,
    careInstructions: 'Mist regularly to keep hydrated',
    notes: 'Large round blooms',
    complementaryFlowerIds: [],
  },
];

const EMPTY_FILTER: FlowerFilter = { colors: [] };
const AVAILABLE_CLIMATES: Climate[] = ['temperate', 'subtropical'];

const GROUPED_ALL: Record<string, Flower[]> = { 'All Flowers': MOCK_FLOWERS };

const NO_OP = () => {};

function defaultProps(overrides?: Partial<CatalogueProps>): CatalogueProps {
  return {
    flowers: MOCK_FLOWERS,
    groupedFlowers: GROUPED_ALL,
    currentFilter: EMPTY_FILTER,
    isLoading: false,
    availableColors: ['pink', 'red', 'white'],
    availableSeasons: ['Spring', 'Summer', 'Year-round'],
    availableTypes: ['Peony', 'Rose', 'Hydrangea'],
    availableClimates: AVAILABLE_CLIMATES,
    stemLengthBounds: { min: 40, max: 60 },
    vaseLifeBounds: { min: 7, max: 10 },
    onSearchChange: NO_OP,
    onColorToggle: NO_OP,
    onAvailabilityChange: NO_OP,
    onSeasonChange: NO_OP,
    onTypeChange: NO_OP,
    onClimateChange: NO_OP,
    onFragranceLevelChange: NO_OP,
    onToxicityChange: NO_OP,
    onStemLengthChange: NO_OP,
    onVaseLifeChange: NO_OP,
    onGroupByChange: NO_OP,
    onCardClick: NO_OP,
    onAddFlowerClick: NO_OP,
    filterPills: [],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: 'With flowers',
  render: () => <Catalogue {...defaultProps()} />,
};

export const Loading: Story = {
  name: 'Loading',
  render: () => (
    <Catalogue {...defaultProps({ isLoading: true, flowers: [], groupedFlowers: {} })} />
  ),
};

export const Empty: Story = {
  name: 'Empty (no results)',
  render: () => (
    <Catalogue
      {...defaultProps({
        flowers: [],
        groupedFlowers: { 'All Flowers': [] },
      })}
    />
  ),
};

export const WithActiveFilters: Story = {
  name: 'With active filters',
  render: () => {
    const [filter, setFilter] = useState<FlowerFilter>({
      colors: ['pink'],
      season: 'Spring',
    });
    const filtered = MOCK_FLOWERS.filter(
      (f) => f.colors.includes('pink') && f.season.includes('Spring'),
    );
    const clearColor = (color: (typeof filter.colors)[number]) =>
      setFilter((f) => ({ ...f, colors: f.colors.filter((c) => c !== color) }));
    const clearSeason = () => setFilter((f) => { const { season: _, ...rest } = f; return rest; });
    const pills = [
      ...filter.colors.map((c) => ({ label: c, onClear: () => clearColor(c) })),
      ...(filter.season ? [{ label: filter.season, onClear: clearSeason }] : []),
    ];
    return (
      <Catalogue
        {...defaultProps({
          flowers: filtered,
          groupedFlowers: { 'All Flowers': filtered },
          currentFilter: filter,
          filterPills: pills,
          onColorToggle: (color) => {
            setFilter((f) => ({
              ...f,
              colors: f.colors.includes(color)
                ? f.colors.filter((c) => c !== color)
                : [...f.colors, color],
            }));
          },
          onSeasonChange: clearSeason,
        })}
      />
    );
  },
};
