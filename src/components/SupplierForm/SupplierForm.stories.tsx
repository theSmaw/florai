import type { Meta, StoryObj } from '@storybook/react';
import { SupplierForm } from './SupplierForm';

const meta: Meta<typeof SupplierForm> = {
  title: 'Components/SupplierForm',
  component: SupplierForm,
  tags: ['autodocs'],
  args: {
    saving: false,
    onSave: () => undefined,
    onCancel: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Add: Story = {
  name: 'Add (empty)',
};

export const Edit: Story = {
  name: 'Edit (pre-filled)',
  args: {
    initialName: 'Holland Flowers',
    initialPrice: 4.5,
  },
};

export const Saving: Story = {
  name: 'Saving in progress',
  args: {
    initialName: 'Holland Flowers',
    initialPrice: 4.5,
    saving: true,
  },
};
