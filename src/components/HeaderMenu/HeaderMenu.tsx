import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  GridIcon,
  BookmarkFilledIcon,
  HeartFilledIcon,
} from '@radix-ui/react-icons';
import styles from './HeaderMenu.module.css';

/**
 * Reusable header hamburger menu with Radix DropdownMenu.
 * - Built-in a11y, keyboard navigation, focus management
 * - Hash-based navigation to keep parity with existing app
 */
export function HeaderMenu() {
  function navigate(hash: string) {
    window.location.hash = hash;
  }

  return (
    <div className={styles.wrapper}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            data-cy="hamburger-menu-trigger"
            className={styles.iconButton}
            aria-haspopup="true"
            aria-label="Open main menu"
          >
            <HamburgerMenuIcon className={styles.triggerIcon} aria-hidden="true" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.menuPanel}
            side="bottom"
            align="end"
            sideOffset={8}
            aria-label="Main menu"
          >
            <DropdownMenu.Item asChild onSelect={() => navigate('/catalogue')}>
              <button
                data-cy="nav-catalogue"
                type="button"
                className={styles.menuItem}
                role="menuitem"
              >
                <GridIcon className={styles.menuIcon} aria-hidden="true" />
                <span>Catalogue</span>
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild onSelect={() => navigate('/collection')}>
              <button
                data-cy="nav-collection"
                type="button"
                className={styles.menuItem}
                role="menuitem"
              >
                <BookmarkFilledIcon className={styles.menuIcon} aria-hidden="true" />
                <span>Collection</span>
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild onSelect={() => navigate('/weddings')}>
              <button
                data-cy="nav-weddings"
                type="button"
                className={styles.menuItem}
                role="menuitem"
              >
                <HeartFilledIcon className={styles.menuIcon} aria-hidden="true" />
                <span>Weddings</span>
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
