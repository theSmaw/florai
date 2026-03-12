import type { Meta, StoryObj } from '@storybook/react';
import { ChipGroup } from './ChipGroup';

const meta: Meta<typeof ChipGroup> = {
  title: 'Components/ChipGroup',
  component: ChipGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChipGroup>;

export const Default: Story = {
  args: {
    options: ['Spring', 'Summer', 'Autumn', 'Winter'],
    selected: ['Spring'],
    onToggle: () => undefined,
  },
};

export const NoneSelected: Story = {
  args: {
    options: ['red', 'pink', 'white', 'yellow', 'purple'],
    selected: [],
    onToggle: () => undefined,
  },
};

export const AllSelected: Story = {
  args: {
    options: ['romantic', 'rustic', 'modern', 'wild'],
    selected: ['romantic', 'rustic', 'modern', 'wild'],
    onToggle: () => undefined,
  },
};

export const Disabled: Story = {
  args: {
    options: ['Spring', 'Summer', 'Autumn', 'Winter'],
    selected: ['Summer'],
    onToggle: () => undefined,
    disabled: true,
  },
};
