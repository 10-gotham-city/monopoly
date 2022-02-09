import { colors } from '@mui/material';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { TPlayer } from './type';

const initialState: {
  data: Record<string, TPlayer>;
  colors: string[];
} = {
  data: {},
  colors: [
    colors.deepPurple['300'],
    colors.orange['500'],
    colors.green['500'],
    colors.blue['500'],
    colors.red['500'],
  ],
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayer(state, action: PayloadAction<{ name: string }>) {
      const id = uuidv4();
      const color = state.colors.pop()!;
      state.data[id] = {
        id,
        name: action.payload.name,
        color,
      };
    },
    removePlayer(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;

      if (state.data[id]) {
        const { color } = state.data[id];
        state.colors.push(color);
        delete state.data[id];
      }
    },
  },
});

export const selectPlayers = createSelector(
  (state: GlobalStore) => state.players,
  (players) => Object.values(players.data),
);

export const { addPlayer, removePlayer } = playersSlice.actions;
export const { reducer } = playersSlice;
