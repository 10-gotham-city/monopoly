import { styled } from '@mui/material';

import { TPlayer } from '../model/type';

type Props = TPlayer & {
  removeBtn: JSX.Element;
};

const Card = styled('div')<{ color: string }>`
  display: flex;
  border: 4px solid ${({ color }) => color};
  border-radius: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
`;

const Name = styled('div')`
  display: flex;
  align-items: center;
  flex-grow: 1;
  font-weight: bold;
  ${({ theme }) => theme.typography.subtitle1};
`;

export const PlayerCard = ({ name, color, removeBtn }: Props) => (
  <Card color={color}>
    <Name>{name}</Name>
    {removeBtn}
  </Card>
);
