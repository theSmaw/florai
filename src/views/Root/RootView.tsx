// Root view for the application
// Implements minimal hash-based routing between Catalogue and Collection
import { useEffect, useState } from 'react';
import { CatalogueContainer } from '../../containers/Catalogue/CatalogueContainer';
import { CollectionView } from '../Collection/CollectionView';
import { WeddingsView } from '../Weddings/WeddingsView';

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

  if (route === 'collection') return <CollectionView />;
  if (route === 'weddings') return <WeddingsView />;
  return <CatalogueContainer />;
}
