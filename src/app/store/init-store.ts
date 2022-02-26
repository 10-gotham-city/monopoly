import { configureStore } from '@reduxjs/toolkit';

import { instanceApi } from 'shared/api';

import { rootReducer } from './root-reducer';

export const getInitialState = () => ({});

export const initStore = (state: GlobalStore) => {
  const store = configureStore({
    preloadedState: state,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instanceApi.middleware),
  });

  return store;
};
