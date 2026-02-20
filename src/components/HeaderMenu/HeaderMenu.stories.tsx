import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { HeaderMenu } from './HeaderMenu';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof HeaderMenu> = {
  title: 'Components/HeaderMenu',
  component: HeaderMenu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

function Shell(props: { children: React.ReactNode }) {
  // Provide some space so the popover is visible and not clipped
  return (
    <div style={{ padding: 24, display: 'flex', justifyContent: 'flex-end' }}>
      {props.children}
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <Shell>
      <HeaderMenu />
    </Shell>
  ),
};

function AutoOpen() {
  useEffect(() => {
    // Click the first button inside our shell to open the menu
    const btn = document.querySelector('button[aria-haspopup="true"]') as HTMLButtonElement | null;
    btn?.click();
  }, []);
  return (
    <Shell>
      <HeaderMenu />
    </Shell>
  );
}

export const Open: Story = {
  name: 'Open (auto-clicked)',
  render: () => <AutoOpen />,
};

function AutoNavigateCatalogue() {
  useEffect(() => {
    const btn = document.querySelector('button[aria-haspopup="true"]') as HTMLButtonElement | null;
    btn?.click();
    // Slight delay to ensure the panel is in the DOM
    setTimeout(() => {
      const catBtn = Array.from(document.querySelectorAll('button'))
        .find((b) => b.textContent?.toLowerCase().includes('catalogue')) as HTMLButtonElement | undefined;
      if (catBtn) {
        catBtn.click();
        action('navigated')('hash set to ' + window.location.hash);
      }
    }, 0);
  }, []);
  return (
    <Shell>
      <HeaderMenu />
    </Shell>
  );
}

export const NavigateCatalogue: Story = {
  name: 'Navigate: Catalogue',
  render: () => <AutoNavigateCatalogue />,
};
