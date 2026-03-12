import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text…',
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'Explorer Red Rose', readOnly: true },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Read-only value' },
};
