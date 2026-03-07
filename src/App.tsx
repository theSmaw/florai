// App root: bootstraps Redux store and sets up React Router
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { store } from './stores/store';
import type { AppDispatch } from './stores/store';
import { sessionChanged } from './stores/auth/slice';
import { supabase } from './lib/supabase';
import { AppLayout } from './layouts/AppLayout/AppLayout';
import { CatalogueView } from './views/Catalogue/CatalogueView';
import { ArrangementsView } from './views/Arrangements/ArrangementsView';
import { WeddingsView } from './views/Weddings/WeddingsView';
import { FlowerDetailView } from './views/FlowerDetail/FlowerDetailView';
import { ArrangementDetailView } from './views/ArrangementDetail/ArrangementDetailView';
import { AuthView } from './views/Auth/AuthView';
import { RequireAuthContainer } from './containers/RequireAuth/RequireAuthContainer';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthView />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, loader: () => redirect('/catalogue') },
      {
        path: 'catalogue',
        element: (
          <RequireAuthContainer>
            <CatalogueView />
          </RequireAuthContainer>
        ),
      },
      {
        path: 'catalogue/:flowerId',
        element: (
          <RequireAuthContainer>
            <FlowerDetailView />
          </RequireAuthContainer>
        ),
      },
      {
        path: 'arrangements',
        element: (
          <RequireAuthContainer>
            <ArrangementsView />
          </RequireAuthContainer>
        ),
      },
      {
        path: 'arrangements/:arrangementId',
        element: (
          <RequireAuthContainer>
            <ArrangementDetailView />
          </RequireAuthContainer>
        ),
      },
      {
        path: 'weddings',
        element: (
          <RequireAuthContainer>
            <WeddingsView />
          </RequireAuthContainer>
        ),
      },
    ],
  },
]);

// Keeps Redux auth state in sync with Supabase session changes
function AuthSync() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Bootstrap existing session (e.g. page refresh)
    void supabase.auth.getSession().then(({ data }) => {
      dispatch(sessionChanged(data.session));
    });

    // Subscribe to future auth events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(sessionChanged(session));
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return null;
}

export function App() {
  return (
    <Provider store={store}>
      <AuthSync />
      <RouterProvider router={router} />
    </Provider>
  );
}
