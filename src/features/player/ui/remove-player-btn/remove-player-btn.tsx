import { Close as DeleteIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { modelPlayer } from 'entities/player';

type TProps = {
  id: string;
};

export const RemovePlayerBtn = memo(({ id }: TProps) => {
  const dispatch = useDispatch();

  const handleRemove = useCallback(() => {
    dispatch(modelPlayer.removePlayer({ id }));
  }, [dispatch, id]);

  return (
    <IconButton onClick={handleRemove}>
      <DeleteIcon />
    </IconButton>
  );
});
