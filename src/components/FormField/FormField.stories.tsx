import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Text input',
  render: () => (
    <FormField label="Name" htmlFor="demo-name">
      <input id="demo-name" type="text" placeholder="Enter name…" />
    </FormField>
  ),
};

export const Required: Story = {
  name: 'Required field',
  render: () => (
    <FormField label="Name" htmlFor="demo-required" required>
      <input id="demo-required" type="text" placeholder="Required…" />
    </FormField>
  ),
};

export const WithSelect: Story = {
  name: 'Select input',
  render: () => (
    <FormField label="Size" htmlFor="demo-size">
      <select id="demo-size">
        <option value="">Select…</option>
        <option value="small">Small</option>
        <option value="large">Large</option>
      </select>
    </FormField>
  ),
};
