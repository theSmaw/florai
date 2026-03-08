import type { Meta, StoryObj } from '@storybook/react';
import { SheetTitle } from './SheetTitle';

const meta: Meta<typeof SheetTitle> = {
  title: 'Components/SheetTitle',
  component: SheetTitle,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Filters: Story = {
  name: 'Filters',
  render: () => <SheetTitle>Filters</SheetTitle>,
};

export const NewArrangement: Story = {
  name: 'New Arrangement',
  render: () => <SheetTitle>New Arrangement</SheetTitle>,
};
