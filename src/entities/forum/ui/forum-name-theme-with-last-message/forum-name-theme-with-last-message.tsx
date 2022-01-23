import { Box, ListItemButton, styled } from '@mui/material';

import { ForumMessage } from 'entities/forum';

import { TForumMessage } from '../forum-message/types';

const CustomListItemButton = styled(ListItemButton)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px;
  border-style: solid;
  border-color: ${({ theme }) => `${theme.palette.grey.A400}`};

  :last-child {
    border: none;
  }
`;

const TitleThemeBox = styled(Box)`
  margin-bottom: ${({ theme }) => `${theme.spacing(1)}`};
  font-size: ${({ theme }) => `${theme.typography.h6.fontSize}`};
`;

type Props = {
  nameTheme: string;
  onClick: () => void;
} & TForumMessage;

export const ForumNameThemeWithLastMessage = ({
  nameTheme,
  onClick,
  userName,
  time,
  text,
}: Props) => (
  <CustomListItemButton onClick={onClick}>
    <TitleThemeBox>{nameTheme}</TitleThemeBox>
    <ForumMessage userName={userName} time={time} text={text} />
  </CustomListItemButton>
);
