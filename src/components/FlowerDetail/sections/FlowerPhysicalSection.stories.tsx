import type { Meta, StoryObj } from '@storybook/react';
import type { Flower } from '../../../domain/Flower';
import { FlowerPhysicalSection } from './FlowerPhysicalSection';
import { MOCK_FLOWER, fieldProps } from './storyMocks';

const meta: Meta<typeof FlowerPhysicalSection> = {
  title: 'Components/FlowerDetail/PhysicalSection',
  component: FlowerPhysicalSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Read: Story = {
  render: () => <FlowerPhysicalSection flower={MOCK_FLOWER} {...fieldProps(false)} />,
};

// Drop the optional physical fields to render the "no physical details" empty state.
const FLOWER_NO_PHYSICAL: Flower = { ...MOCK_FLOWER };
delete FLOWER_NO_PHYSICAL.stemLengthCm;
delete FLOWER_NO_PHYSICAL.vaseLifeDays;
delete FLOWER_NO_PHYSICAL.fragranceLevel;
delete FLOWER_NO_PHYSICAL.toxicity;

export const Empty: Story = {
  render: () => <FlowerPhysicalSection flower={FLOWER_NO_PHYSICAL} {...fieldProps(false)} />,
};

export const Editing: Story = {
  render: () => <FlowerPhysicalSection flower={MOCK_FLOWER} {...fieldProps(true)} />,
};
