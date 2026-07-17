import type { Meta, StoryObj } from '@storybook/react';
import { EditableSection } from './EditableSection';
import type { EditableSectionProps } from './EditableSection';

const meta: Meta<typeof EditableSection> = {
  title: 'Components/EditableSection',
  component: EditableSection,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const NO_OP = () => {};

function baseProps(overrides?: Partial<EditableSectionProps>): EditableSectionProps {
  return {
    label: 'Physical',
    isEditing: false,
    canEdit: true,
    saving: false,
    error: null,
    onEditStart: NO_OP,
    onEditEnd: NO_OP,
    onSave: NO_OP,
    editCy: 'edit-demo-button',
    saveCy: 'save-demo-button',
    cancelCy: 'cancel-demo-button',
    errorCy: 'save-demo-error',
    readView: <p style={{ margin: 0 }}>Stem length: 50 cm · Vase life: 7 days</p>,
    editView: (
      <input defaultValue="50" style={{ padding: 8, width: '100%', boxSizing: 'border-box' }} />
    ),
    ...overrides,
  };
}

export const Read: Story = {
  name: 'Read view',
  render: () => <EditableSection {...baseProps()} />,
};

export const Editing: Story = {
  name: 'Editing',
  render: () => <EditableSection {...baseProps({ isEditing: true })} />,
};

export const Saving: Story = {
  name: 'Saving',
  render: () => <EditableSection {...baseProps({ isEditing: true, saving: true })} />,
};

export const WithError: Story = {
  name: 'With save error',
  render: () => (
    <EditableSection
      {...baseProps({ isEditing: true, error: 'Something went wrong. Try again.' })}
    />
  ),
};

export const EditDisabled: Story = {
  name: 'Edit disabled (another section active)',
  render: () => <EditableSection {...baseProps({ canEdit: false })} />,
};
