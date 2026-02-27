// Root view for the application
// Implements minimal hash-based routing between Catalogue and Collection
import { useEffect, useState } from 'react';
import { BellIcon } from '@radix-ui/react-icons';
import { CatalogueContainer } from '../../containers/Catalogue/CatalogueContainer';
import { CollectionView } from '../Collection/CollectionView';
import { WeddingsView } from '../Weddings/WeddingsView';
import { HeaderMenu } from '../../components/HeaderMenu/HeaderMenu';
import { UserMenuContainer } from '../../containers/UserMenu/UserMenuContainer';
import styles from './RootView.module.css';

function getRoute(): 'catalogue' | 'collection' | 'weddings' {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith('/collection')) return 'collection';
  if (hash.startsWith('/weddings')) return 'weddings';
  return 'catalogue';
}

export function RootView() {
  const [route, setRoute] = useState<'catalogue' | 'collection' | 'weddings'>(() => getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    // Ensure there's an initial hash
    if (!window.location.hash) {
      window.location.hash = '/catalogue';
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      <div className={styles.iconButtons}>
        <HeaderMenu />
        <button className={styles.iconButton} aria-label="Notifications">
          <BellIcon width={20} height={20} aria-hidden="true" />
        </button>
        <UserMenuContainer />
      </div>
      {route === 'collection' && <CollectionView />}
      {route === 'weddings' && <WeddingsView />}
      {route === 'catalogue' && <CatalogueContainer />}
    </>
  );
}
