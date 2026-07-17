import type { Meta, StoryObj } from '@storybook/react';
import { FieldGrid } from './FieldGrid';
import { FormField } from '../FormField/FormField';
import { TextInput } from '../TextInput/TextInput';

const meta: Meta<typeof FieldGrid> = {
  title: 'Components/FieldGrid',
  component: FieldGrid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const NO_OP = () => {};

export const TwoColumns: Story = {
  render: () => (
    <FieldGrid>
      <FormField label="Stem count" htmlFor="fg-a">
        <TextInput id="fg-a" type="number" value="24" onChange={NO_OP} />
      </FormField>
      <FormField label="Vase life (days)" htmlFor="fg-b">
        <TextInput id="fg-b" type="number" value="7" onChange={NO_OP} />
      </FormField>
    </FieldGrid>
  ),
};
