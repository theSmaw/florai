import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';

const meta: Meta<typeof RequireAuth> = {
  title: 'Components/RequireAuth',
  component: RequireAuth,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>Login page</div>} />
          <Route path="/protected" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  args: {
    children: <div>Protected content</div>,
  },
};

export default meta;
type Story = StoryObj<typeof RequireAuth>;

export const Authenticated: Story = {
  args: { initialized: true, isAuthenticated: true },
};

export const NotAuthenticated: Story = {
  args: { initialized: true, isAuthenticated: false },
};

export const NotInitialized: Story = {
  name: 'Loading (not yet initialized)',
  args: { initialized: false, isAuthenticated: false },
};
