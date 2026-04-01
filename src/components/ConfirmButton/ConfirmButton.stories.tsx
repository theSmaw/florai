import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmButton } from './ConfirmButton';

const meta: Meta<typeof ConfirmButton> = {
  title: 'Components/ConfirmButton',
  component: ConfirmButton,
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
