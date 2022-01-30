import { TPlayer } from '../model/type';

type Props = TPlayer & {
  removeBtn: JSX.Element;
};

export const PlayerCard = ({ name, color, removeBtn }: Props) => {
  return (
    <div>
      <p style={{ backgroundColor: color }}>{name}</p>
      {removeBtn}
    </div>
  );
};
