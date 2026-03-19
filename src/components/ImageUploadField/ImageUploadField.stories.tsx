import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ImageUploadField } from './ImageUploadField';

const meta: Meta<typeof ImageUploadField> = {
  title: 'Components/ImageUploadField',
  component: ImageUploadField,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NoImage: Story = {
  name: 'No image (default)',
  render: () => {
    const [file, setFile] = useState<File | null>(null);
    return (
      <div style={{ width: 320 }}>
        <ImageUploadField file={file} onChange={setFile} />
      </div>
    );
  },
};

export const WithImage: Story = {
  name: 'With image',
  render: () => {
    const mockFile = new File([''], 'rose.jpg', { type: 'image/jpeg' });
    const [file, setFile] = useState<File | null>(mockFile);
    return (
      <div style={{ width: 320 }}>
        <ImageUploadField file={file} onChange={setFile} />
      </div>
    );
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <div style={{ width: 320 }}>
      <ImageUploadField file={null} onChange={() => undefined} disabled />
    </div>
  ),
};
