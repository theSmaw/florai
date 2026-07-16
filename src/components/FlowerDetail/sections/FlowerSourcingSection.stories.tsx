import type { Meta, StoryObj } from '@storybook/react';
import { FlowerSourcingSection } from './FlowerSourcingSection';
import { MOCK_FLOWER, fieldProps } from './storyMocks';

const meta: Meta<typeof FlowerSourcingSection> = {
  title: 'Components/FlowerDetail/SourcingSection',
  component: FlowerSourcingSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const NO_OP = () => {};

const supplierProps = {
  savingSupplier: false,
  supplierError: null,
  onAddSupplier: NO_OP,
  onUpdateSupplier: NO_OP,
  onRemoveSupplier: NO_OP,
};

export const GlobalFlower: Story = {
  name: 'Global flower (supplier list)',
  render: () => (
    <FlowerSourcingSection
      flower={MOCK_FLOWER}
      isCustom={false}
      {...supplierProps}
      {...fieldProps(false)}
    />
  ),
};

export const CustomFlower: Story = {
  name: 'Custom flower (supplier + price)',
  render: () => (
    <FlowerSourcingSection
      flower={MOCK_FLOWER}
      isCustom={true}
      {...supplierProps}
      {...fieldProps(false)}
    />
  ),
};

export const Editing: Story = {
  render: () => (
    <FlowerSourcingSection
      flower={MOCK_FLOWER}
      isCustom={true}
      {...supplierProps}
      {...fieldProps(true)}
    />
  ),
};
