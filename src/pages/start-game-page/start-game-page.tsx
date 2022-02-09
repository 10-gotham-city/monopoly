import { Typography } from '@mui/material';

import { AddPlayerForm } from 'features/player';

import { BaseLayer } from 'shared/ui/layers';

import { PlayerList } from './player-list';

export const StartGamePage = () => {
  return (
    <BaseLayer>
      <Typography variant={'h1'}>Начало игры</Typography>
      <PlayerList />
      <AddPlayerForm />
    </BaseLayer>
  );
};
