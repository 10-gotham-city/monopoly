import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';
import { ErrorBoundary } from './providers/error-boundary';

export const App = () => (
  <ErrorBoundary>
    <CssBaseline />
    <Typography variant="h1">App</Typography>
  </ErrorBoundary>
);
