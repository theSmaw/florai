import type { Meta, StoryObj } from '@storybook/react';
import { StatList } from './StatList';
import { Tag } from '../Tag/Tag';

const meta: Meta<typeof StatList> = {
  title: 'Components/StatList',
  component: StatList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Stem Length', value: '50 cm' },
      { label: 'Vase Life', value: '7 days' },
    ],
  },
};

export const WithNodeValues: Story = {
  name: 'With node values',
  args: {
    items: [
      { label: 'Wholesale Cost', value: '$42.50' },
      { label: 'Toxicity', value: <Tag variant="brand">Safe</Tag> },
    ],
  },
};
