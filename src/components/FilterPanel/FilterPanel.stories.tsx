import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterPanel } from './FilterPanel';
import type { Climate, Color, FlowerFilter } from '../../domain/Flower';

const meta: Meta<typeof FilterPanel> = {
  title: 'Components/FilterPanel',
  component: FilterPanel,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const AVAILABLE_COLORS: Color[] = ['red', 'pink', 'white', 'yellow', 'purple', 'blue'];
const AVAILABLE_CLIMATES: Climate[] = ['temperate', 'mediterranean', 'subtropical', 'tropical'];
const STEM_BOUNDS = { min: 30, max: 70 };
const VASE_BOUNDS = { min: 7, max: 12 };

function FilterPanelWrapper(props: { initialFilter?: Partial<FlowerFilter> }) {
  const [filter, setFilter] = useState<FlowerFilter>({
    colors: [],
    groupBy: 'none',
    ...props.initialFilter,
  });

  return (
    <div
      style={{
        maxWidth: 420,
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 8px 40px rgba(15,23,42,0.14)',
      }}
    >
      <FilterPanel
        availableColors={AVAILABLE_COLORS}
        availableSeasons={['Spring', 'Summer', 'Autumn', 'Winter']}
        availableTypes={['Rose', 'Peony', 'Hydrangea']}
        availableClimates={AVAILABLE_CLIMATES}
        stemLengthBounds={STEM_BOUNDS}
        vaseLifeBounds={VASE_BOUNDS}
        currentFilter={filter}
        onColorToggle={(color) =>
          setFilter((f) => ({
            ...f,
            colors: f.colors.includes(color)
              ? f.colors.filter((c) => c !== color)
              : [...f.colors, color],
          }))
        }
        onAvailabilityChange={(availability) => setFilter((f) => ({ ...f, availability }))}
        onSeasonChange={(season) => setFilter((f) => ({ ...f, season }))}
        onTypeChange={(type) => setFilter((f) => ({ ...f, type }))}
        onClimateChange={(climate) => setFilter((f) => ({ ...f, climate }))}
        onFragranceLevelChange={(fragranceLevel) => setFilter((f) => ({ ...f, fragranceLevel }))}
        onToxicityChange={(toxicity) => setFilter((f) => ({ ...f, toxicity }))}
        onStemLengthChange={(min, max) =>
          setFilter((f) => ({ ...f, stemLengthRange: { min, max } }))
        }
        onVaseLifeChange={(min, max) => setFilter((f) => ({ ...f, vaseLifeRange: { min, max } }))}
        onGroupByChange={(groupBy) => setFilter((f) => ({ ...f, groupBy }))}
        onApplyFilters={() => {}}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <FilterPanelWrapper />,
};

export const WithSelectedColors: Story = {
  name: 'With selected colors',
  render: () => <FilterPanelWrapper initialFilter={{ colors: ['red', 'pink'] }} />,
};

export const WithSeasonFilter: Story = {
  name: 'With season filter',
  render: () => <FilterPanelWrapper initialFilter={{ colors: [], season: 'Spring' }} />,
};

export const GroupByColor: Story = {
  name: 'Group by: color',
  render: () => <FilterPanelWrapper initialFilter={{ colors: [], groupBy: 'color' }} />,
};
