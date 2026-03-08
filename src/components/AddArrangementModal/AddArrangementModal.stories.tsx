import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AddArrangementModal } from './AddArrangementModal';
import type { Flower } from '../../domain/Flower';

const meta: Meta<typeof AddArrangementModal> = {
  title: 'Components/AddArrangementModal',
  component: AddArrangementModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_FLOWERS: Flower[] = [
  {
    id: '1',
    name: 'Peony Sarah Bernhardt',
    colors: ['pink'],
    type: 'Peony',
    wholesalePrice: 4.5,
    supplier: 'Holland Flowers',
    suppliers: [],
    season: ['Spring'],
    availability: 'seasonal',
    climate: 'temperate',
    careInstructions: '',
    notes: '',
    complementaryFlowerIds: [],
  },
  {
    id: '2',
    name: 'Explorer Red Rose',
    colors: ['red'],
    type: 'Rose',
    wholesalePrice: 2.25,
    supplier: 'Kenya Blooms',
    suppliers: [],
    season: ['Year-round'],
    availability: 'always',
    climate: 'subtropical',
    careInstructions: '',
    notes: '',
    complementaryFlowerIds: [],
  },
];

export const Default: Story = {
  name: 'Open modal',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <AddArrangementModal
        open={open}
        onOpenChange={setOpen}
        flowers={MOCK_FLOWERS}
        saving={false}
        error={null}
        onSave={() => setOpen(false)}
      />
    );
  },
};

export const Saving: Story = {
  name: 'Saving state',
  render: () => (
    <AddArrangementModal
      open={true}
      onOpenChange={() => {}}
      flowers={MOCK_FLOWERS}
      saving={true}
      error={null}
      onSave={() => {}}
    />
  ),
};

export const WithError: Story = {
  name: 'With error',
  render: () => (
    <AddArrangementModal
      open={true}
      onOpenChange={() => {}}
      flowers={MOCK_FLOWERS}
      saving={false}
      error="Failed to save arrangement. Please try again."
      onSave={() => {}}
    />
  ),
};

export const EmptyFlowerList: Story = {
  name: 'No flowers available',
  render: () => (
    <AddArrangementModal
      open={true}
      onOpenChange={() => {}}
      flowers={[]}
      saving={false}
      error={null}
      onSave={() => {}}
    />
  ),
};
