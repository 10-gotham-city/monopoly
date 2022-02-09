import { styled } from '@mui/material';

export const PlayersList = styled('div')`
  display: flex;
  gap: ${({ theme }) => theme.spacing()};
  flex-direction: column;
  margin: 0 auto;
`;
