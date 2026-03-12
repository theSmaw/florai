import type { Meta, StoryObj } from '@storybook/react';
import { AddArrangementCard } from './AddArrangementCard';

const meta: Meta<typeof AddArrangementCard> = {
  title: 'Components/AddArrangementCard',
  component: AddArrangementCard,
  tags: ['autodocs'],
  args: {
    onClick: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof AddArrangementCard>;

export const Default: Story = {};
