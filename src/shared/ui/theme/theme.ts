import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0C2F35',
      paper: '#06262B',
    },
    primary: {
      main: '#35ACEE',
    },
    error: {
      main: '#ff867d',
    },
  },
  typography: {
    h1: {
      fontSize: '1.5rem',
      fontWeight: 400,
      marginBottom: '0.35em',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
  },
});
