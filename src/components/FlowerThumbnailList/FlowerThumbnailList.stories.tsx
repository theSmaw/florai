import type { Meta, StoryObj } from '@storybook/react';
import { FlowerThumbnailList } from './FlowerThumbnailList';

const meta: Meta<typeof FlowerThumbnailList> = {
  title: 'Components/FlowerThumbnailList',
  component: FlowerThumbnailList,
  tags: ['autodocs'],
  args: {
    emptyText: 'No items added yet.',
    onSelect: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_ITEMS = [
  { id: '1', name: 'Explorer Red Rose' },
  { id: '2', name: 'Annabelle Hydrangea' },
  {
    id: '3',
    name: 'White Ranunculus',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88df5691cc69?w=200',
  },
];

export const Default: Story = {
  name: 'With items',
  args: {
    items: MOCK_ITEMS,
  },
};

export const Empty: Story = {
  name: 'Empty',
  args: {
    items: [],
  },
};

export const Single: Story = {
  name: 'Single item',
  args: {
    items: MOCK_ITEMS.slice(0, 1),
  },
};
