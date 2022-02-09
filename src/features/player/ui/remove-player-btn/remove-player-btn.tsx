import { Close as DeleteIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';

import { modelPlayer } from 'entities/player';

type TProps = {
  id: string;
};

export const RemovePlayerBtn = ({ id }: TProps) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(modelPlayer.removePlayer({ id }));
  };

  return (
    <IconButton onClick={handleRemove}>
      <DeleteIcon />
    </IconButton>
  );
};
