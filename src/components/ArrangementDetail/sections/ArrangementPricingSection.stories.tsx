import type { Meta, StoryObj } from '@storybook/react';
import { ArrangementPricingSection } from './ArrangementPricingSection';
import { MOCK_ARRANGEMENT, fieldProps } from './storyMocks';

const meta: Meta<typeof ArrangementPricingSection> = {
  title: 'Components/ArrangementDetail/PricingSection',
  component: ArrangementPricingSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Read: Story = {
  render: () => <ArrangementPricingSection arrangement={MOCK_ARRANGEMENT} {...fieldProps(false)} />,
};

export const Editing: Story = {
  render: () => <ArrangementPricingSection arrangement={MOCK_ARRANGEMENT} {...fieldProps(true)} />,
};
