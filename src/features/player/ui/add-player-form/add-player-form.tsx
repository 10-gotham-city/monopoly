import { KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { modelPlayer } from 'entities/player';

import { GAME } from 'shared/config';

export const AddPlayerForm = () => {
  const players = useSelector(modelPlayer.selectPlayers);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleAddPlayer = () => {
    dispatch(modelPlayer.addPlayer({ name }));
    setName('');
  };

  const handleKeyDownEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleAddPlayer();
    }
  };

  if (players.length > GAME.MAX_PLAYERS) {
    return null;
  }

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={handleKeyDownEnter}
      />
      <button onClick={handleAddPlayer}>add</button>
    </>
  );
};
