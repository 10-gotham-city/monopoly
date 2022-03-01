import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader/root';

import { Router } from 'pages';

import { theme } from 'shared/ui/theme';

import { AuthProvider, ErrorBoundary, SnackbarProvider } from './providers';

export const App = hot(() => (
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Monopoly</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Helmet>
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <CssBaseline />
        <SnackbarProvider>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </SnackbarProvider>
      </ErrorBoundary>
    </ThemeProvider>
  </>
));
