import type { Meta, StoryObj } from '@storybook/react';
import { ArrangementFilterPanel } from './ArrangementFilterPanel';

const meta: Meta<typeof ArrangementFilterPanel> = {
  title: 'Components/ArrangementFilterPanel',
  component: ArrangementFilterPanel,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
  currentFilter: {},
  onSizeChange: () => undefined,
  onStyleChange: () => undefined,
  onOccasionChange: () => undefined,
  onGroupByChange: () => undefined,
  onApply: () => undefined,
};

export const Default: Story = {
  args: defaultProps,
};

export const WithActiveFilters: Story = {
  args: {
    ...defaultProps,
    currentFilter: { size: 'medium', style: 'romantic', groupBy: 'size' },
  },
};
