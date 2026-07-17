import type { Meta, StoryObj } from '@storybook/react';
import { ArrangementPhysicalSection } from './ArrangementPhysicalSection';
import { MOCK_ARRANGEMENT, fieldProps } from './storyMocks';

const meta: Meta<typeof ArrangementPhysicalSection> = {
  title: 'Components/ArrangementDetail/PhysicalSection',
  component: ArrangementPhysicalSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Read: Story = {
  render: () => (
    <ArrangementPhysicalSection arrangement={MOCK_ARRANGEMENT} {...fieldProps(false)} />
  ),
};

export const Editing: Story = {
  render: () => <ArrangementPhysicalSection arrangement={MOCK_ARRANGEMENT} {...fieldProps(true)} />,
};
