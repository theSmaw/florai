import type { Meta, StoryObj } from '@storybook/react';
import { Suppliers } from './Suppliers';
import type { SuppliersProps } from './Suppliers';
import type { Supplier } from '../../domain/Supplier';

const meta: Meta<typeof Suppliers> = {
  title: 'Components/Suppliers',
  component: Suppliers,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 's1',
    name: 'Holland Flowers',
    emails: ['info@holland.com'],
    phones: ['+31 20 000 0000'],
    website: 'https://holland-flowers.com',
    address: '123 Tulip Lane, Amsterdam',
    contactPerson: 'Jan de Vries',
    paymentTerms: 'Net 30',
    notes: 'Primary wholesale supplier for peonies and tulips.',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 's2',
    name: 'Bloom & Co',
    emails: ['orders@bloomco.com', 'accounts@bloomco.com'],
    phones: ['+44 20 0000 0000'],
    contactPerson: 'Sarah Green',
    createdAt: '2024-02-01T00:00:00Z',
  },
];

const NO_OP = () => {};

function defaultProps(overrides?: Partial<SuppliersProps>): SuppliersProps {
  return {
    suppliers: MOCK_SUPPLIERS,
    isLoading: false,
    isSaving: false,
    saveError: null,
    modalSupplier: null,
    onAddClick: NO_OP,
    onEditClick: NO_OP,
    onSave: NO_OP,
    onDelete: NO_OP,
    onModalClose: NO_OP,
    ...overrides,
  };
}

export const Default: Story = {
  args: defaultProps(),
};

export const Empty: Story = {
  args: defaultProps({ suppliers: [] }),
};

export const Loading: Story = {
  args: defaultProps({ isLoading: true }),
};
