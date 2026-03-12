import type { Meta, StoryObj } from '@storybook/react';
import { AddCard } from './AddCard';

const meta: Meta<typeof AddCard> = {
  title: 'Components/AddCard',
  component: AddCard,
  tags: ['autodocs'],
  args: {
    onClick: () => undefined,
    label: 'New item',
    dataCy: 'add-card',
    ariaLabel: 'New item',
  },
};

export default meta;
type Story = StoryObj<typeof AddCard>;

export const Default: Story = {};

export const FlowerVariant: Story = {
  args: { label: 'New flower', dataCy: 'add-flower-card', ariaLabel: 'New flower' },
};

export const ArrangementVariant: Story = {
  args: { label: 'New arrangement', dataCy: 'add-arrangement-card', ariaLabel: 'New arrangement' },
};
