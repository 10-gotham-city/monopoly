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

  return <button onClick={handleRemove}>del</button>;
};
