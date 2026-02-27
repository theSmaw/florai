import { Outlet } from 'react-router-dom';
import { BellIcon } from '@radix-ui/react-icons';
import { HeaderMenuContainer } from '../../containers/HeaderMenu/HeaderMenuContainer';
import { UserMenuContainer } from '../../containers/UserMenu/UserMenuContainer';
import styles from './AppLayout.module.css';

export function AppLayout() {
  return (
    <>
      <div className={styles.iconButtons}>
        <HeaderMenuContainer />
        <button className={styles.iconButton} aria-label="Notifications">
          <BellIcon width={20} height={20} aria-hidden="true" />
        </button>
        <UserMenuContainer />
      </div>
      <Outlet />
    </>
  );
}
