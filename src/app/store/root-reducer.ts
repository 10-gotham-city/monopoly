import { combineReducers } from '@reduxjs/toolkit';

import { modelPlayer } from 'entities/player';

import { instanceApi } from 'shared/api';

export const rootReducer = combineReducers({
  [instanceApi.reducerPath]: instanceApi.reducer,
  players: modelPlayer.reducer,
});
