import type { Meta, StoryObj } from '@storybook/react';
import { EditButton } from './EditButton';

const meta: Meta<typeof EditButton> = {
  title: 'Components/EditButton',
  component: EditButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
};
