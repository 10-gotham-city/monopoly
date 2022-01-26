import { Box, BoxProps, styled } from '@mui/material';

import { TMessage } from './types';

const MessageBox = styled(Box)`
  width: 100%;
`;

const InfoBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const UserNameBox = styled(Box)`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

type Props = TMessage & BoxProps;

export const Message = ({ userName, time, text, ...props }: Props) => (
  <MessageBox {...props}>
    <InfoBox>
      <UserNameBox>{userName}:</UserNameBox>
      <Box>{time}</Box>
    </InfoBox>
    <Box>{text}</Box>
  </MessageBox>
);
