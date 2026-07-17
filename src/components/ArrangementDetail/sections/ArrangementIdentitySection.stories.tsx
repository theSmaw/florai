import type { Meta, StoryObj } from '@storybook/react';
import { ArrangementIdentitySection } from './ArrangementIdentitySection';
import { MOCK_ARRANGEMENT, fieldProps } from './storyMocks';

const meta: Meta<typeof ArrangementIdentitySection> = {
  title: 'Components/ArrangementDetail/IdentitySection',
  component: ArrangementIdentitySection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Read: Story = {
  render: () => (
    <ArrangementIdentitySection arrangement={MOCK_ARRANGEMENT} {...fieldProps(false)} />
  ),
};

export const Editing: Story = {
  render: () => <ArrangementIdentitySection arrangement={MOCK_ARRANGEMENT} {...fieldProps(true)} />,
};
