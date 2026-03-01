import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from './SectionHeader';

const meta: Meta<typeof SectionHeader> = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  render: () => <SectionHeader label="General" />,
};

export const Pricing: Story = {
  name: 'Pricing',
  render: () => <SectionHeader label="Pricing" />,
};

export const LongLabel: Story = {
  name: 'Long label',
  render: () => <SectionHeader label="Botanical Care Instructions" />,
};
