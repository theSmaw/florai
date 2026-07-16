import type { Meta, StoryObj } from '@storybook/react';
import { ArrangementFlowersSection } from './ArrangementFlowersSection';
import { MOCK_ARRANGEMENT, MOCK_FLOWERS, fieldProps } from './storyMocks';

const meta: Meta<typeof ArrangementFlowersSection> = {
  title: 'Components/ArrangementDetail/FlowersSection',
  component: ArrangementFlowersSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const NO_OP = () => {};

export const Read: Story = {
  render: () => (
    <ArrangementFlowersSection
      arrangement={MOCK_ARRANGEMENT}
      flowers={MOCK_FLOWERS}
      onFlowerSelect={NO_OP}
      {...fieldProps(false)}
    />
  ),
};

export const Editing: Story = {
  render: () => (
    <ArrangementFlowersSection
      arrangement={MOCK_ARRANGEMENT}
      flowers={MOCK_FLOWERS}
      onFlowerSelect={NO_OP}
      {...fieldProps(true)}
    />
  ),
};
