import type { Meta, StoryObj } from '@storybook/react';
import { FilterRangeSection } from './FilterRangeSection';

const meta: Meta<typeof FilterRangeSection> = {
  title: 'Components/FilterRangeSection',
  component: FilterRangeSection,
  tags: ['autodocs'],
  args: {
    onMinChange: () => undefined,
    onMaxChange: () => undefined,
    dataCyMin: 'range-min',
    dataCyMax: 'range-max',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StemLength: Story = {
  name: 'Stem length (cm)',
  args: {
    title: 'Stem Length',
    unit: 'cm',
    min: 20,
    max: 120,
    currentMin: 20,
    currentMax: 120,
  },
};

export const VaseLife: Story = {
  name: 'Vase life (days)',
  args: {
    title: 'Vase Life',
    unit: 'days',
    min: 3,
    max: 21,
    currentMin: 3,
    currentMax: 21,
  },
};

export const ActiveFilter: Story = {
  name: 'With active filter (narrowed range)',
  args: {
    title: 'Stem Length',
    unit: 'cm',
    min: 20,
    max: 120,
    currentMin: 40,
    currentMax: 80,
  },
};
