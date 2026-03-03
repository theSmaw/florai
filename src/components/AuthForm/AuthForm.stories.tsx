import type { Meta, StoryObj } from '@storybook/react';
import { AuthForm } from './AuthForm';

const meta: Meta<typeof AuthForm> = {
  title: 'Components/AuthForm',
  component: AuthForm,
  tags: ['autodocs'],
  args: {
    loading: false,
    error: null,
    onSubmit: () => undefined,
    onToggleMode: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof AuthForm>;

export const SignIn: Story = {
  args: { mode: 'signIn' },
};

export const SignUp: Story = {
  args: { mode: 'signUp' },
};

export const Loading: Story = {
  args: { mode: 'signIn', loading: true },
};

export const WithError: Story = {
  args: {
    mode: 'signIn',
    error: 'Invalid login credentials',
  },
};

export const SignUpWithError: Story = {
  args: {
    mode: 'signUp',
    error: 'Email address is already registered',
  },
};
