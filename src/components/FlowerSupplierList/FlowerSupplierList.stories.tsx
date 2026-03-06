import type { Meta, StoryObj } from '@storybook/react';
import { FlowerSupplierList } from './FlowerSupplierList';

const meta: Meta<typeof FlowerSupplierList> = {
  title: 'Components/FlowerSupplierList',
  component: FlowerSupplierList,
  tags: ['autodocs'],
  args: {
    defaultSupplier: 'Holland Flowers',
    defaultWholesalePrice: 4.5,
    saving: false,
    error: null,
    onAdd: () => undefined,
    onUpdate: () => undefined,
    onRemove: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_SUPPLIERS = [
  { id: '1', name: 'Holland Flowers', wholesalePrice: 4.5 },
  { id: '2', name: 'Kenya Blooms', wholesalePrice: 3.25 },
];

export const WithSuppliers: Story = {
  name: 'With suppliers',
  args: {
    suppliers: MOCK_SUPPLIERS,
  },
};

export const Empty: Story = {
  name: 'Empty (shows hint)',
  args: {
    suppliers: [],
  },
};

export const Saving: Story = {
  name: 'Saving in progress',
  args: {
    suppliers: MOCK_SUPPLIERS,
    saving: true,
  },
};

export const WithError: Story = {
  name: 'With error',
  args: {
    suppliers: MOCK_SUPPLIERS,
    error: 'Failed to save supplier: network error',
  },
};
