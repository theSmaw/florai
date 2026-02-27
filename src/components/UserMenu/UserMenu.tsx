import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PersonIcon } from '@radix-ui/react-icons';
import type { AppDispatch, RootState } from '../../stores/store';
import { loadUser } from '../../stores/user/asyncActions/loadUser';
import styles from './UserMenu.module.css';

export function UserMenu() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const promise = dispatch(loadUser());
    return () => promise.abort();
  }, [dispatch]);

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
              <span className={styles.userName}>{user?.name ?? '—'}</span>
              <span className={styles.userEmail}>{user?.email ?? '—'}</span>
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
