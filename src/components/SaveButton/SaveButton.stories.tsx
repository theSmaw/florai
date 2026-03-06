import type { Meta, StoryObj } from '@storybook/react';
import { SaveButton } from './SaveButton';

const meta: Meta<typeof SaveButton> = {
  title: 'Components/SaveButton',
  component: SaveButton,
  tags: ['autodocs'],
  args: {
    onClick: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
};

export const Saving: Story = {
  name: 'Saving in progress',
  args: { saving: true },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
};
