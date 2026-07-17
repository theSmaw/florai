import type { Meta, StoryObj } from '@storybook/react';
import { ArrangementDescriptionSection } from './ArrangementDescriptionSection';
import { MOCK_ARRANGEMENT, fieldProps } from './storyMocks';

const meta: Meta<typeof ArrangementDescriptionSection> = {
  title: 'Components/ArrangementDetail/DescriptionSection',
  component: ArrangementDescriptionSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const withDescription = {
  ...MOCK_ARRANGEMENT,
  description: 'A romantic spring bouquet in blush tones.',
};

export const Read: Story = {
  render: () => (
    <ArrangementDescriptionSection arrangement={withDescription} {...fieldProps(false)} />
  ),
};

export const Empty: Story = {
  // MOCK_ARRANGEMENT has no description, so it renders the empty state.
  render: () => (
    <ArrangementDescriptionSection arrangement={MOCK_ARRANGEMENT} {...fieldProps(false)} />
  ),
};

export const Editing: Story = {
  render: () => (
    <ArrangementDescriptionSection arrangement={withDescription} {...fieldProps(true)} />
  ),
};
