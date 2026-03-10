import type { Meta, StoryObj } from '@storybook/react';
import type { Flower } from '../../domain/Flower';
import { FlowerThumbnailList } from './FlowerThumbnailList';

const meta: Meta<typeof FlowerThumbnailList> = {
  title: 'Components/FlowerThumbnailList',
  component: FlowerThumbnailList,
  tags: ['autodocs'],
  args: {
    emptyText: 'No flowers added yet.',
    onFlowerSelect: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_FLOWERS: Flower[] = [
  {
    id: '1',
    name: 'Explorer Red Rose',
    colors: ['red'],
    type: 'Rose',
    wholesalePrice: 2.25,
    supplier: 'Kenya Blooms',
    suppliers: [],
    season: ['Year-round'],
    availability: 'always',
    climate: 'subtropical',
    complementaryFlowerIds: [],
    careInstructions: '',
    notes: '',
  },
  {
    id: '2',
    name: 'Annabelle Hydrangea',
    colors: ['white'],
    type: 'Hydrangea',
    wholesalePrice: 3.75,
    supplier: 'Dutch Garden',
    suppliers: [],
    season: ['Summer'],
    availability: 'seasonal',
    climate: 'temperate',
    complementaryFlowerIds: [],
    careInstructions: '',
    notes: '',
  },
  {
    id: '3',
    name: 'White Ranunculus',
    colors: ['white'],
    type: 'Ranunculus',
    wholesalePrice: 3.0,
    supplier: 'Holland Flowers',
    suppliers: [],
    season: ['Spring'],
    availability: 'seasonal',
    climate: 'mediterranean',
    complementaryFlowerIds: [],
    careInstructions: '',
    notes: '',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88df5691cc69?w=200',
  },
];

export const Default: Story = {
  name: 'With flowers',
  args: {
    flowers: MOCK_FLOWERS,
  },
};

export const Empty: Story = {
  name: 'No pairings',
  args: {
    flowers: [],
  },
};

export const Single: Story = {
  name: 'Single flower',
  args: {
    flowers: MOCK_FLOWERS.slice(0, 1),
  },
};
