import { Outlet } from 'react-router-dom';
import { BellIcon } from '@radix-ui/react-icons';
import { HeaderMenuContainer } from '../../containers/HeaderMenu/HeaderMenuContainer';
import { UserMenuContainer } from '../../containers/UserMenu/UserMenuContainer';
import { IconButton } from '../../components/IconButton/IconButton';
import styles from './AppLayout.module.css';

export function AppLayout() {
  return (
    <>
      <div className={styles.iconButtons}>
        <HeaderMenuContainer />
        <IconButton aria-label="Notifications">
          <BellIcon width={20} height={20} aria-hidden="true" />
        </IconButton>
        <UserMenuContainer />
      </div>
      <Outlet />
    </>
  );
}
