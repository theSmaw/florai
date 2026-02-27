import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PersonIcon } from '@radix-ui/react-icons';
import styles from './UserMenu.module.css';

const MOCK_USER = { name: 'Demo Florist', email: 'demo@florai.com' };

export function UserMenu() {
  return (
    <div className={styles.wrapper}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            data-cy="user-menu-trigger"
            className={styles.iconButton}
            aria-haspopup="true"
            aria-label="Open user menu"
          >
            <PersonIcon width={20} height={20} aria-hidden="true" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.menuPanel}
            side="bottom"
            align="end"
            sideOffset={8}
            aria-label="User menu"
          >
            {/* Non-interactive user details header */}
            <div className={styles.userInfo}>
              <span className={styles.userName}>{MOCK_USER.name}</span>
              <span className={styles.userEmail}>{MOCK_USER.email}</span>
            </div>

            <div className={styles.separator} role="separator" />

            <DropdownMenu.Item asChild disabled>
              <button
                data-cy="user-menu-profile"
                type="button"
                className={styles.menuItem}
                role="menuitem"
                disabled
              >
                <PersonIcon className={styles.menuIcon} aria-hidden="true" />
                <span>View Profile</span>
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
