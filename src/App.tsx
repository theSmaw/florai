// App root: bootstraps Redux store and provides React app
import { Provider } from 'react-redux';
import { store } from './stores/store';
import { RootView } from './views/Root/RootView';

export function App() {
  return (
    <Provider store={store}>
      <RootView />
    </Provider>
  );
}
