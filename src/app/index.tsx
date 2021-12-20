import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'pages';

export const App = () => (
  <BrowserRouter>
    <CssBaseline />
    <Router />
  </BrowserRouter>
);
