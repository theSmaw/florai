import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterPanel } from './FilterPanel';
import type { FlowerFilter } from '../../domain/Flower';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof FilterPanel> = {
  title: 'Components/FilterPanel',
  component: FilterPanel,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const COLORS = ['red', 'pink', 'white', 'yellow', 'purple', 'blue', 'orange', 'green'];

function FilterPanelWrapper(props: {
  initialFilter?: FlowerFilter;
  availableColors?: string[];
}) {
  const [filter, setFilter] = useState<FlowerFilter>(
    props.initialFilter ?? { colors: [], groupBy: 'none' }
  );
  const availableColors = props.availableColors ?? COLORS;

  return (
    <div style={{ maxWidth: 420 }}>
      <FilterPanel
        availableColors={availableColors}
        currentFilter={filter}
        onSearchChange={(searchTerm) => setFilter((f) => ({ ...f, searchTerm }))}
        onColorToggle={(color) =>
          setFilter((f) => ({
            ...f,
            colors: f.colors.includes(color)
              ? f.colors.filter((c) => c !== color)
              : [...f.colors, color],
          }))
        }
        onAvailabilityChange={(availability) => setFilter((f) => ({ ...f, availability }))}
        onGroupByChange={(groupBy) => setFilter((f) => ({ ...f, groupBy }))}
        onApplyFilters={() => action('apply-filters')(filter)}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <FilterPanelWrapper />,
};

export const WithSelectedColors: Story = {
  name: 'With selected colors',
  render: () => (
    <FilterPanelWrapper initialFilter={{ colors: ['red', 'white'], groupBy: 'none' }} />
  ),
};

export const WithSearchTerm: Story = {
  name: 'With search term',
  render: () => (
    <FilterPanelWrapper initialFilter={{ colors: [], searchTerm: 'rose', groupBy: 'none' }} />
  ),
};

export const AvailabilitySeasonal: Story = {
  name: 'Availability: seasonal',
  render: () => (
    <FilterPanelWrapper initialFilter={{ colors: [], availability: 'seasonal', groupBy: 'none' }} />
  ),
};

export const GroupByColor: Story = {
  name: 'Group by: color',
  render: () => (
    <FilterPanelWrapper initialFilter={{ colors: [], groupBy: 'color' }} />
  ),
};
