import type { Meta, StoryObj } from '@storybook/react';
import type { Flower } from '../../domain/Flower';
import { FlowerCard } from './FlowerCard';

const meta: Meta<typeof FlowerCard> = {
  title: 'Components/FlowerCard',
  component: FlowerCard,
  tags: ['autodocs'],
  args: {
    onCardClick: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_FLOWER: Flower = {
  id: '1',
  name: 'Peony Sarah Bernhardt',
  colors: ['pink', 'white'],
  type: 'Peony',
  wholesalePrice: 4.5,
  supplier: 'Holland Flowers',
  suppliers: [],
  season: ['Spring'],
  availability: 'seasonal',
  climate: 'temperate',
  imageUrl: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=400&h=400&fit=crop',
  careInstructions: '',
  notes: '',
  complementaryFlowerIds: [],
};

export const Default: Story = {
  name: 'With image',
  args: { flower: MOCK_FLOWER },
};

export const NoImage: Story = {
  name: 'No image (placeholder)',
  args: {
    flower: { ...MOCK_FLOWER, imageUrl: undefined },
  },
};

export const LongName: Story = {
  name: 'Long flower name',
  args: {
    flower: { ...MOCK_FLOWER, name: 'Ranunculus Cloni Success Hanoi Dark Rose' },
  },
};
