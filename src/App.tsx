// App root: bootstraps Redux store and sets up React Router
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { store } from './stores/store';
import { AppLayout } from './layouts/AppLayout/AppLayout';
import { CatalogueView } from './views/Catalogue/CatalogueView';
import { CollectionView } from './views/Collection/CollectionView';
import { WeddingsView } from './views/Weddings/WeddingsView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, loader: () => redirect('/catalogue') },
      { path: 'catalogue', element: <CatalogueView /> },
      { path: 'collection', element: <CollectionView /> },
      { path: 'weddings', element: <WeddingsView /> },
    ],
  },
]);

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
