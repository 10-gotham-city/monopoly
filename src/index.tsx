import { hydrate } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from './app';
import { initStore } from './app/store';

const store = initStore(window.__INITIAL_STATE__);

const persistor = persistStore(store);

hydrate(
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>,
  document.getElementById('root'),
);
