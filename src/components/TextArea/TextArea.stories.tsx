import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text…',
    rows: 3,
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, value: 'Some existing notes…' },
};
