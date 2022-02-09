import { Add as AddIcon } from '@mui/icons-material';
import { IconButton, InputBase, Paper, styled } from '@mui/material';
import { KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { modelPlayer } from 'entities/player';

import { GAME } from 'shared/config';

const InputField = styled(Paper)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing()};
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled(InputBase)`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing()};
`;

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

  if (players.length >= GAME.MAX_PLAYERS) {
    return null;
  }

  return (
    <InputField>
      <Input
        placeholder="Назовите своего игрока"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={handleKeyDownEnter}
      />
      <IconButton onClick={handleAddPlayer} sx={{ p: '10px' }}>
        <AddIcon />
      </IconButton>
    </InputField>
  );
};
