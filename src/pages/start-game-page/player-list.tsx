import { useSelector } from 'react-redux';

import { RemovePlayerBtn } from 'features/player';

import { PlayerCard, PlayersList, modelPlayer } from 'entities/player';

export const PlayerList = () => {
  const players = useSelector(modelPlayer.selectPlayers);

  return (
    <PlayersList>
      {players.map((player) => (
        <PlayerCard {...player} key={player.id} removeBtn={<RemovePlayerBtn id={player.id} />} />
      ))}
    </PlayersList>
  );
};
