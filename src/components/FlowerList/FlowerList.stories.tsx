import type { Meta, StoryObj } from '@storybook/react';
import type { Flower } from '../../domain/Flower';
import { FlowerList } from './FlowerList';

const meta: Meta<typeof FlowerList> = {
  title: 'Components/FlowerList',
  component: FlowerList,
  tags: ['autodocs'],
  args: {
    onCardClick: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function makeFlower(id: string, name: string, type: string, color: Flower['colors'][0]): Flower {
  return {
    id,
    name,
    colors: [color],
    type,
    wholesalePrice: 3.0,
    supplier: 'Test Supplier',
    suppliers: [],
    season: ['Spring'],
    availability: 'always',
    climate: 'temperate',
    careInstructions: '',
    notes: '',
    complementaryFlowerIds: [],
  };
}

const FLOWERS: Flower[] = [
  makeFlower('1', 'Peony Sarah Bernhardt', 'Peony', 'pink'),
  makeFlower('2', 'Explorer Red Rose', 'Rose', 'red'),
  makeFlower('3', 'Annabelle Hydrangea', 'Hydrangea', 'white'),
  makeFlower('4', 'English Lavender', 'Lavender', 'purple'),
  makeFlower('5', 'White Ranunculus', 'Ranunculus', 'white'),
  makeFlower('6', 'Sunflower Vanilla', 'Sunflower', 'yellow'),
];

export const Default: Story = {
  name: 'Flat list',
  args: { flowers: FLOWERS },
};

export const Grouped: Story = {
  name: 'Grouped by type',
  args: {
    flowers: FLOWERS,
    groupedFlowers: {
      Peony: [FLOWERS[0]!],
      Rose: [FLOWERS[1]!],
      Hydrangea: [FLOWERS[2]!],
      Lavender: [FLOWERS[3]!],
    },
  },
};

export const Loading: Story = {
  name: 'Loading state',
  args: { flowers: [], isLoading: true },
};

export const Empty: Story = {
  name: 'No flowers found',
  args: { flowers: [] },
};
