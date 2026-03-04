import type { Meta, StoryObj } from '@storybook/react';
import { FilterChip } from './FilterChip';

const meta: Meta<typeof FilterChip> = {
  title: 'Components/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  args: {
    onClick: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof FilterChip>;

export const Default: Story = {
  args: {
    label: 'Spring',
  },
};

export const Selected: Story = {
  args: {
    label: 'Spring',
    selected: true,
    showClearIcon: true,
  },
};

export const SelectedNoIcon: Story = {
  name: 'Selected (no clear icon)',
  args: {
    label: 'Color',
    selected: true,
  },
};

export const WithColorDot: Story = {
  name: 'With colour dot',
  args: {
    label: 'pink',
    colorDot: '#f9a8d4',
  },
};

export const WithColorDotSelected: Story = {
  name: 'With colour dot (selected)',
  args: {
    label: 'pink',
    colorDot: '#f9a8d4',
    selected: true,
    showClearIcon: true,
  },
};
