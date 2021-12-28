import CssBaseline from '@mui/material/CssBaseline';
import { Router } from 'pages';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './providers';

export const App = () => (
  <ErrorBoundary>
    <CssBaseline />
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ErrorBoundary>
);
