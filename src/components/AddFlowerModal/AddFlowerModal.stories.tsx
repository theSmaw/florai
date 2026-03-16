import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AddFlowerModal } from './AddFlowerModal';

const meta: Meta<typeof AddFlowerModal> = {
  title: 'Components/AddFlowerModal',
  component: AddFlowerModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Open modal',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <AddFlowerModal
        open={open}
        onOpenChange={setOpen}
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
    <AddFlowerModal
      open={true}
      onOpenChange={() => {}}
      saving={true}
      error={null}
      onSave={() => {}}
    />
  ),
};

export const WithError: Story = {
  name: 'With error',
  render: () => (
    <AddFlowerModal
      open={true}
      onOpenChange={() => {}}
      saving={false}
      error="Failed to save flower. Please try again."
      onSave={() => {}}
    />
  ),
};
