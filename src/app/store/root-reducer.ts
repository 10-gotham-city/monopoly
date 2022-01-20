import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from 'shared/api';

export const rootReducer = {
  api: combineReducers({
    [authApi.reducerPath]: authApi.reducer,
  }),
};
