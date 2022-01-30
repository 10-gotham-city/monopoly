import { Typography } from '@mui/material';

import { AddPlayerForm } from 'features/player';

import { PlayerList } from './player-list';

export const StartGamePage = () => {
  return (
    <>
      <Typography variant={'h1'}>Начало игры</Typography>
      <PlayerList />
      <AddPlayerForm />
    </>
  );
};
