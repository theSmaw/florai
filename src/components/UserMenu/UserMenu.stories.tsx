import type { Meta, StoryObj } from '@storybook/react';
import { UserMenu } from './UserMenu';

const meta: Meta<typeof UserMenu> = {
  title: 'Components/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
  args: {
    onSignOut: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

export const SignedIn: Story = {
  args: {
    user: { id: '1', name: 'Jane Smith', email: 'jane@florai.test' },
  },
};

export const NoName: Story = {
  args: {
    user: { id: '2', name: '', email: 'noname@florai.test' },
  },
};

export const NoUser: Story = {
  args: {
    user: null,
  },
};

export const WithoutSignOut: Story = {
  args: {
    user: { id: '1', name: 'Jane Smith', email: 'jane@florai.test' },
    onSignOut: undefined,
  },
};
