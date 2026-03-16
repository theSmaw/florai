import type { Meta, StoryObj } from '@storybook/react';
import { AddFlowerCard } from './AddFlowerCard';

const meta: Meta<typeof AddFlowerCard> = {
  title: 'Components/AddFlowerCard',
  component: AddFlowerCard,
  tags: ['autodocs'],
  args: {
    onClick: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof AddFlowerCard>;

export const Default: Story = {};
