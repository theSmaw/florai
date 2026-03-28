import type { Meta, StoryObj } from '@storybook/react';
import { SupplierModal } from './SupplierModal';
import type { Supplier } from '../../domain/Supplier';

const meta: Meta<typeof SupplierModal> = {
  title: 'Components/SupplierModal',
  component: SupplierModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const EDIT_SUPPLIER: Supplier = {
  id: 's1',
  name: 'Holland Flowers',
  emails: ['info@holland.com'],
  phones: ['+31 20 000 0000'],
  website: 'https://holland-flowers.com',
  address: '123 Tulip Lane, Amsterdam',
  contactPerson: 'Jan de Vries',
  paymentTerms: 'Net 30',
  notes: 'Primary wholesale supplier.',
  createdAt: '2024-01-01T00:00:00Z',
};

export const AddMode: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    supplier: undefined,
    saving: false,
    error: null,
    onSave: () => {},
  },
};

export const EditMode: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    supplier: EDIT_SUPPLIER,
    saving: false,
    error: null,
    onSave: () => {},
  },
};

export const Saving: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    supplier: undefined,
    saving: true,
    error: null,
    onSave: () => {},
  },
};

export const WithError: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    supplier: undefined,
    saving: false,
    error: 'Failed to save supplier. Please try again.',
    onSave: () => {},
  },
};
