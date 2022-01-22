import CssBaseline from '@mui/material/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Router } from 'pages';

import { AuthProvider, ErrorBoundary } from './providers';
import { reduxStore } from './store';

export const App = () => (
  <ErrorBoundary>
    <CssBaseline />
    <ReduxProvider store={reduxStore}>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </ReduxProvider>
  </ErrorBoundary>
);
