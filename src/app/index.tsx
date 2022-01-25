import CssBaseline from '@mui/material/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Router } from 'pages';

import { ErrorBoundary, SnackbarProvider } from './providers';
import { reduxStore } from './store';

export const App = () => (
  <ErrorBoundary>
    <CssBaseline />
    <SnackbarProvider>
      <ReduxProvider store={reduxStore}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ReduxProvider>
    </SnackbarProvider>
  </ErrorBoundary>
);
