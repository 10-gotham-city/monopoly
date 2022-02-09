import { Box, Button, Card, Typography, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Navigation } from 'widgets/navigation';
import { UserProfile } from 'widgets/user-profile';

import { AddPlayerForm } from 'features/player';

import { modelPlayer } from 'entities/player';

import { routes } from 'shared/config';
import { BaseLayout } from 'shared/ui/layouts';

import { PlayerList } from './player-list';

const StartGameCard = styled(Card)`
  margin-top: ${({ theme }) => theme.spacing(3)};
  width: 500px;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const Description = styled(Typography)`
  margin: ${({ theme }) => theme.spacing(2)};
`;

const WrapBtnGame = styled('div')`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing(2)};
`;

export const StartGamePage = () => {
  const players = useSelector(modelPlayer.selectPlayers);

  return (
    <BaseLayout appBarEndContent={<UserProfile />} appBarStartContent={<Navigation />}>
      <Box width={1} height={1} display="flex" alignItems="start" justifyContent="center">
        <StartGameCard>
          <Typography variant="h1" align="center">
            Начало игры
          </Typography>
          <Description variant="body1" align="center">
            Добавте игроков
          </Description>

          <PlayerList />

          <AddPlayerForm />

          {players.length ? (
            <WrapBtnGame>
              <Button variant="contained" size="large" to={routes.game} component={RouterLink}>
                Играть
              </Button>
            </WrapBtnGame>
          ) : null}
        </StartGameCard>
      </Box>
    </BaseLayout>
  );
};
