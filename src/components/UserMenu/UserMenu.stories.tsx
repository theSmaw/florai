import type { Meta, StoryObj } from '@storybook/react';
import { UserMenu } from './UserMenu';

const meta: Meta<typeof UserMenu> = {
  title: 'Components/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

const NO_OP = () => undefined;

export const SignedIn: Story = {
  args: {
    user: { id: '1', name: 'Jane Smith', email: 'jane@florai.test' },
    onSignOut: NO_OP,
  },
};

export const NoName: Story = {
  args: {
    user: { id: '2', name: '', email: 'noname@florai.test' },
    onSignOut: NO_OP,
  },
};

export const NoUser: Story = {
  args: {
    user: null,
    onSignOut: NO_OP,
  },
};

// onSignOut omitted — the menu hides the Sign out action when no handler is given.
export const WithoutSignOut: Story = {
  args: {
    user: { id: '1', name: 'Jane Smith', email: 'jane@florai.test' },
  },
};
