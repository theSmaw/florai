import type { Meta, StoryObj } from '@storybook/react';
import { SelectInput } from './SelectInput';

const meta: Meta<typeof SelectInput> = {
  title: 'Components/SelectInput',
  component: SelectInput,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <option value="">Select an option…</option>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
