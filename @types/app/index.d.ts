import { reduxStore } from '../../src/app/store';

declare global {
  type GlobalStore = ReturnType<typeof reduxStore.getState>;
  type GlobalDispatch = typeof reduxStore.dispatch;

  namespace Express {
    interface Request {
      /** Logger instance associated with current request */
      logger: () => void;
    }

    interface Response {
      /**
       * Renders bundle to html, then sends it
       * or performs redirect if necessary
       */
      // tslint:disable-next-line:no-any
      renderBundle(bundleName: string, data?: any): void;
    }
  }
}
