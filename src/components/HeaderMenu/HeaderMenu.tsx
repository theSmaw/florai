import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  GridIcon,
  BookmarkFilledIcon,
  HeartFilledIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { IconButton } from '../IconButton/IconButton';
import styles from './HeaderMenu.module.css';

interface HeaderMenuProps {
  onCatalogueClick: () => void;
  onArrangementsClick: () => void;
  onWeddingsClick: () => void;
  onSuppliersClick: () => void;
}

/**
 * Reusable header hamburger menu with Radix DropdownMenu.
 * - Built-in a11y, keyboard navigation, focus management
 */
export function HeaderMenu({
  onCatalogueClick,
  onArrangementsClick,
  onWeddingsClick,
  onSuppliersClick,
}: HeaderMenuProps) {
  return (
    <div className={styles.wrapper}>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <IconButton
            data-cy="hamburger-menu-trigger"
            aria-haspopup="true"
            aria-label="Open main menu"
          >
            <HamburgerMenuIcon className={styles.triggerIcon} aria-hidden="true" />
          </IconButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.menuPanel}
            side="bottom"
            align="end"
            sideOffset={8}
            aria-label="Main menu"
          >
            <DropdownMenu.Item asChild onSelect={onCatalogueClick}>
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
            <DropdownMenu.Item asChild onSelect={onArrangementsClick}>
              <button
                data-cy="nav-arrangements"
                type="button"
                className={styles.menuItem}
                role="menuitem"
              >
                <BookmarkFilledIcon className={styles.menuIcon} aria-hidden="true" />
                <span>Arrangements</span>
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild onSelect={onWeddingsClick}>
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
            <DropdownMenu.Item asChild onSelect={onSuppliersClick}>
              <button
                data-cy="nav-suppliers"
                type="button"
                className={styles.menuItem}
                role="menuitem"
              >
                <PersonIcon className={styles.menuIcon} aria-hidden="true" />
                <span>Suppliers</span>
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
