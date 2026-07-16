import type { Meta, StoryObj } from '@storybook/react';
import { FlowerGeneralSection } from './FlowerGeneralSection';
import { MOCK_FLOWER, fieldProps } from './storyMocks';

const meta: Meta<typeof FlowerGeneralSection> = {
  title: 'Components/FlowerDetail/GeneralSection',
  component: FlowerGeneralSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Read: Story = {
  render: () => <FlowerGeneralSection flower={MOCK_FLOWER} {...fieldProps(false)} />,
};

export const Editing: Story = {
  render: () => <FlowerGeneralSection flower={MOCK_FLOWER} {...fieldProps(true)} />,
};
