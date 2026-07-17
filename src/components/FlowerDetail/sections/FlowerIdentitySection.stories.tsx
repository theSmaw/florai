import type { Meta, StoryObj } from '@storybook/react';
import { FlowerIdentitySection } from './FlowerIdentitySection';
import { MOCK_FLOWER, fieldProps } from './storyMocks';

const meta: Meta<typeof FlowerIdentitySection> = {
  title: 'Components/FlowerDetail/IdentitySection',
  component: FlowerIdentitySection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Read: Story = {
  render: () => <FlowerIdentitySection flower={MOCK_FLOWER} {...fieldProps(false)} />,
};

export const Editing: Story = {
  render: () => <FlowerIdentitySection flower={MOCK_FLOWER} {...fieldProps(true)} />,
};
