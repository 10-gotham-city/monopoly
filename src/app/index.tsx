import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { hot } from 'react-hot-loader/root';
import { Provider as ReduxProvider } from 'react-redux';

import { Router } from 'pages';

import { theme } from 'shared/ui/theme';

import { AuthProvider, ErrorBoundary, SnackbarProvider } from './providers';
import { reduxStore } from './store';

export const App = hot(() => (
  <ThemeProvider theme={theme}>
    <ErrorBoundary>
      <CssBaseline />
      <SnackbarProvider>
        <ReduxProvider store={reduxStore}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ReduxProvider>
      </SnackbarProvider>
    </ErrorBoundary>
  </ThemeProvider>
));
