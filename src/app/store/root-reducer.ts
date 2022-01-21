import { instanceApi } from 'shared/api';

export const rootReducer = {
  [instanceApi.reducerPath]: instanceApi.reducer,
};
