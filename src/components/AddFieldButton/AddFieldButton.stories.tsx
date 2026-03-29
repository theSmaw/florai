import type { Meta, StoryObj } from '@storybook/react';
import { AddFieldButton } from './AddFieldButton';

const meta: Meta<typeof AddFieldButton> = {
  title: 'Components/AddFieldButton',
  component: AddFieldButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: { label: 'Add email' },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { label: 'Add email', disabled: true },
};
