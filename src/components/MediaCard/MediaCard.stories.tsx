import type { Meta, StoryObj } from '@storybook/react';
import { MediaCard } from './MediaCard';

const meta: Meta<typeof MediaCard> = {
  title: 'Components/MediaCard',
  component: MediaCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'With placeholder image',
  render: () => (
    <div style={{ width: 160 }}>
      <MediaCard imageAlt="Example" onClick={() => {}}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 700 }}>Card title</p>
      </MediaCard>
    </div>
  ),
};

export const WithImage: Story = {
  name: 'With image',
  render: () => (
    <div style={{ width: 160 }}>
      <MediaCard
        imageUrl="https://placehold.co/160x213"
        imageAlt="Example flower"
        onClick={() => {}}
      >
        <p style={{ margin: 0, fontSize: 12, fontWeight: 700 }}>Rose</p>
      </MediaCard>
    </div>
  ),
};
