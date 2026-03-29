import type { Meta, StoryObj } from '@storybook/react';
import { DeleteButton } from './DeleteButton';

const meta: Meta<typeof DeleteButton> = {
  title: 'Components/DeleteButton',
  component: DeleteButton,
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
