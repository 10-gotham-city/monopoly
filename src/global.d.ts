import { reduxStore } from './app/store';

declare global {
  type GlobalStore = ReturnType<typeof reduxStore.getState>;
  type GlobalDispatch = typeof reduxStore.dispatch;
  interface Window {
    __INITIAL_STATE__?: object;
  }
}
