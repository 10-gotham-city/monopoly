import { configureStore } from '@reduxjs/toolkit';

import { instanceApi } from 'shared/api';

import { rootReducer } from './root-reducer';

export const initStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instanceApi.middleware),
  });

  return store;
};
