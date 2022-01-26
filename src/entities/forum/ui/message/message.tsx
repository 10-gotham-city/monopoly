import { Box, BoxProps, Typography, styled } from '@mui/material';

import { TMessage } from './types';

const MessageBox = styled(Box)`
  width: 100%;
`;

const InfoBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const UserNameBox = styled(Typography)`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

type Props = TMessage & BoxProps;

export const Message = ({ userName, time, text, ...props }: Props) => (
  <MessageBox {...props}>
    <InfoBox>
      <UserNameBox>{userName}:</UserNameBox>
      <Typography>{time}</Typography>
    </InfoBox>
    <Typography>{text}</Typography>
  </MessageBox>
);
