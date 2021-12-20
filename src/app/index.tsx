import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'pages';
import { ErrorBoundary } from './providers';

export const App = () => (
  <ErrorBoundary>
    <CssBaseline />
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ErrorBoundary>
);
