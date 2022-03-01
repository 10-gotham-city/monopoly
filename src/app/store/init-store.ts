import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';

import { instanceApi } from 'shared/api';

import { persistConfig } from './persist';
import { rootReducer } from './root-reducer';

export const getInitialState = () => ({});

// необходимо объявить до конфигурации store
// https://github.com/reduxjs/redux-toolkit/issues/1831
const reducer = persistReducer(persistConfig, rootReducer);

export const initStore = (state: GlobalStore) => {
  const store = configureStore({
    preloadedState: state,
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(instanceApi.middleware),
  });

  return store;
};
