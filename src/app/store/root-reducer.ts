import { modelPlayer } from 'entities/player';

export const rootReducer = {
  players: modelPlayer.reducer,
};
