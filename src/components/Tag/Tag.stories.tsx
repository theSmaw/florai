import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Medium' },
};

export const Brand: Story = {
  args: { variant: 'brand', children: 'Safe' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Mild' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Toxic' },
};
