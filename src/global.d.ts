import { reduxStore } from './app/store';

declare global {
  type GlobalStore = ReturnType<typeof reduxStore.getState>;
  type GlobalDispatch = typeof reduxStore.dispatch;
}

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
