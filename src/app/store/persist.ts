import storage from 'redux-persist/lib/storage';

import { instanceApi } from 'shared/api';

export const persistConfig = {
  key: 'root',
  storage,
  blacklist: [instanceApi.reducerPath],
};
