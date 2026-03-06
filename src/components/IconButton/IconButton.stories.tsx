import type { Meta, StoryObj } from '@storybook/react';
import { BellIcon, HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Bell: Story = {
  name: 'Bell icon',
  args: { children: <BellIcon width={20} height={20} />, 'aria-label': 'Notifications' },
};

export const HamburgerMenu: Story = {
  name: 'Hamburger menu icon',
  args: { children: <HamburgerMenuIcon width={20} height={20} />, 'aria-label': 'Open menu' },
};

export const Person: Story = {
  name: 'Person icon',
  args: { children: <PersonIcon width={20} height={20} />, 'aria-label': 'Open user menu' },
};
