import { modelPlayer } from 'entities/player';

import { instanceApi } from 'shared/api';

export const rootReducer = {
  [instanceApi.reducerPath]: instanceApi.reducer,
  players: modelPlayer.reducer,
};
