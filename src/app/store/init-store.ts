import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';

export const initStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};
