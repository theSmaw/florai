import type { Meta, StoryObj } from '@storybook/react';
import { DetailLayout } from './DetailLayout';

const meta: Meta<typeof DetailLayout> = {
  title: 'Components/DetailLayout',
  component: DetailLayout,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
  backLabel: 'Catalogue',
  onBack: () => undefined,
  contextLabel: 'Flower Details',
  imageAlt: 'Rose',
  uploadingImage: false,
  uploadError: null,
  onImageUpload: () => undefined,
  children: <p style={{ padding: '1rem' }}>Right panel content goes here.</p>,
};

export const Default: Story = {
  args: defaultProps,
};

export const WithImage: Story = {
  args: {
    ...defaultProps,
    imageUrl: '/images/placeholder.svg',
  },
};

export const Uploading: Story = {
  args: {
    ...defaultProps,
    uploadingImage: true,
  },
};

export const UploadError: Story = {
  args: {
    ...defaultProps,
    uploadError: 'Upload failed. Please try again.',
  },
};
