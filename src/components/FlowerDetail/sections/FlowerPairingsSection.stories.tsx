import type { Meta, StoryObj } from '@storybook/react';
import { FlowerPairingsSection } from './FlowerPairingsSection';
import { MOCK_FLOWER, MOCK_FLOWERS } from './storyMocks';

const meta: Meta<typeof FlowerPairingsSection> = {
  title: 'Components/FlowerDetail/PairingsSection',
  component: FlowerPairingsSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const NO_OP = () => {};

const base = {
  flower: MOCK_FLOWER,
  complementaryFlowers: [MOCK_FLOWERS[1]!],
  allFlowers: MOCK_FLOWERS,
  saving: false,
  error: null,
  onSave: NO_OP,
  onFlowerSelect: NO_OP,
};

export const Read: Story = {
  render: () => <FlowerPairingsSection {...base} />,
};

export const Empty: Story = {
  render: () => (
    <FlowerPairingsSection
      {...base}
      flower={{ ...MOCK_FLOWER, complementaryFlowerIds: [] }}
      complementaryFlowers={[]}
    />
  ),
};
