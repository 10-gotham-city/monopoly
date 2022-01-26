import { Box, ListItemButton, Theme, styled } from '@mui/material';
import { Link as RouterLint } from 'react-router-dom';

import { ForumMessage } from 'entities/forum';

import { TForumMessage } from '../';

const styledListItemButton = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderBottom: '1px',
  borderStyle: 'solid',
  borderColor: (theme: Theme) => theme.palette.grey.A400,

  ':last-child': {
    border: 'none',
  },
};

const TitleThemeBox = styled(Box)`
  margin-bottom: ${({ theme }) => `${theme.spacing(1)}`};
  font-size: ${({ theme }) => `${theme.typography.h6.fontSize}`};
`;

type Props = {
  id: string;
  title: string;
} & TForumMessage;

export const PreviewMessage = ({ title, id, userName, time, text }: Props) => (
  <ListItemButton sx={styledListItemButton} component={RouterLint} to={id}>
    <TitleThemeBox>{title}</TitleThemeBox>
    <ForumMessage userName={userName} time={time} text={text} />
  </ListItemButton>
);
