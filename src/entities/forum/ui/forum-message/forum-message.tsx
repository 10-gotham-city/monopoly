import { Box, styled } from '@mui/material';

import { TForumMessage } from './types';

const MessageBox = styled(Box)`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing(2)} 0`};
`;

const InfoBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const UserNameBox = styled(Box)`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

type Props = TForumMessage;

export const ForumMessage = ({ userName, time, text }: Props) => (
  <MessageBox>
    <InfoBox>
      <UserNameBox>{userName}:</UserNameBox>
      <Box>{time}</Box>
    </InfoBox>
    <Box>{text}</Box>
  </MessageBox>
);
