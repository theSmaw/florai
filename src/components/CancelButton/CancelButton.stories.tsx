import type { Meta, StoryObj } from '@storybook/react';
import { CancelButton } from './CancelButton';

const meta: Meta<typeof CancelButton> = {
  title: 'Components/CancelButton',
  component: CancelButton,
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

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
};
