import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from 'pages';

import { theme } from 'shared/ui/theme';

import { AuthProvider, ErrorBoundary, SnackbarProvider } from './providers';
import { reduxStore } from './store';

const persistor = persistStore(reduxStore);

export const App = () => (
  <ThemeProvider theme={theme}>
    <ErrorBoundary>
      <CssBaseline />
      <SnackbarProvider>
        <ReduxProvider store={reduxStore}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <AuthProvider>
                <Router />
              </AuthProvider>
            </BrowserRouter>
          </PersistGate>
        </ReduxProvider>
      </SnackbarProvider>
    </ErrorBoundary>
  </ThemeProvider>
);
