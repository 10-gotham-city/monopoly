import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0C2F35',
      paper: '#06262B',
    },
    text: {
      // primary: '#FFFFFF',
    },
    primary: {
      main: '#35ACEE',
    },
  },
  status: {
    danger: '',
  },
});
