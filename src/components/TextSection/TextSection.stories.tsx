import type { Meta, StoryObj } from '@storybook/react';
import { TextSection } from './TextSection';
import type { TextSectionProps } from './TextSection';

const meta: Meta<typeof TextSection> = {
  title: 'Components/TextSection',
  component: TextSection,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const NO_OP = () => {};

function baseProps(overrides?: Partial<TextSectionProps>): TextSectionProps {
  return {
    label: 'Notes',
    value: 'Great for spring weddings. Blush and cream palette.',
    emptyText: 'No notes yet. Click Edit to add.',
    saving: false,
    error: null,
    onSave: NO_OP,
    editCy: 'edit-notes-button',
    textareaCy: 'notes-textarea',
    saveCy: 'save-notes-button',
    cancelCy: 'cancel-notes-button',
    errorCy: 'save-notes-error',
    editAriaLabel: 'Edit notes',
    ...overrides,
  };
}

export const WithContent: Story = {
  name: 'With content',
  render: () => <TextSection {...baseProps()} />,
};

export const Empty: Story = {
  name: 'Empty',
  render: () => <TextSection {...baseProps({ value: '' })} />,
};

export const Saving: Story = {
  name: 'Saving',
  render: () => <TextSection {...baseProps({ saving: true })} />,
};
