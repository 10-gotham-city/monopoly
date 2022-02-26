import { hydrate } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app';
import { initStore } from './app/store';

const store = initStore(window.__INITIAL_STATE__);

hydrate(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById('root'),
);
