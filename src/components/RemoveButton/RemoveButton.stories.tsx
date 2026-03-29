import type { Meta, StoryObj } from '@storybook/react';
import { RemoveButton } from './RemoveButton';

const meta: Meta<typeof RemoveButton> = {
  title: 'Components/RemoveButton',
  component: RemoveButton,
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
