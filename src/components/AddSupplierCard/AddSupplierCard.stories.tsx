import type { Meta, StoryObj } from '@storybook/react';
import { AddSupplierCard } from './AddSupplierCard';

const meta: Meta<typeof AddSupplierCard> = {
  title: 'Components/AddSupplierCard',
  component: AddSupplierCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
