import type { Meta, StoryObj } from '@storybook/react';
import { SupplierCard } from './SupplierCard';
import type { Supplier } from '../../domain/Supplier';

const meta: Meta<typeof SupplierCard> = {
  title: 'Components/SupplierCard',
  component: SupplierCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const FULL_SUPPLIER: Supplier = {
  id: 's1',
  name: 'Holland Flowers',
  emails: ['info@holland.com'],
  phones: ['+31 20 000 0000'],
  website: 'https://holland-flowers.com',
  address: '123 Tulip Lane, Amsterdam',
  contactPerson: 'Jan de Vries',
  paymentTerms: 'Net 30',
  notes: 'Primary wholesale supplier for peonies and tulips. Excellent quality, consistent delivery.',
  createdAt: '2024-01-01T00:00:00Z',
};

const MINIMAL_SUPPLIER: Supplier = {
  id: 's2',
  name: 'Bloom & Co',
  emails: [],
  phones: [],
  createdAt: '2024-02-01T00:00:00Z',
};

const NO_OP = () => {};

export const Default: Story = {
  args: {
    supplier: FULL_SUPPLIER,
    onEdit: NO_OP,
    onDelete: NO_OP,
  },
};

export const WithAllFields: Story = {
  args: {
    supplier: {
      ...FULL_SUPPLIER,
      emails: ['info@holland.com', 'orders@holland.com'],
      phones: ['+31 20 000 0000', '+31 20 111 1111'],
    },
    onEdit: NO_OP,
    onDelete: NO_OP,
  },
};

export const MinimalFields: Story = {
  args: {
    supplier: MINIMAL_SUPPLIER,
    onEdit: NO_OP,
    onDelete: NO_OP,
  },
};
