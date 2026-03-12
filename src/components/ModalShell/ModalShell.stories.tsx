import type { Meta, StoryObj } from '@storybook/react';
import { ModalShell } from './ModalShell';

const meta: Meta<typeof ModalShell> = {
  title: 'Components/ModalShell',
  component: ModalShell,
  tags: ['autodocs'],
  args: {
    open: true,
    onOpenChange: () => undefined,
    title: 'Example Modal',
    children: <p style={{ margin: 0 }}>Modal body content goes here.</p>,
    footer: <span>Footer content</span>,
  },
};

export default meta;
type Story = StoryObj<typeof ModalShell>;

export const Default: Story = {};

export const ClosingDisabled: Story = {
  args: { closingDisabled: true },
};
