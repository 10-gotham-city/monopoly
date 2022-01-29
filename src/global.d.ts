import { reduxStore } from './app/store';

declare global {
  type GlobalStore = ReturnType<typeof reduxStore.getState>;
  type GlobalDispatch = typeof reduxStore.dispatch;
}

declare module '@mui/material/styles' {
  interface Theme {
    size: {
      formWidth: string;
    };
  }

  interface ThemeOptions {
    size?: {
      formWidth?: string;
    };
  }
}
