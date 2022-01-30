import { ListItemButton, Theme, Typography } from '@mui/material';
import { Link as RouterLint } from 'react-router-dom';

import { ForumMessage } from 'entities/forum';

import { TForumMessage } from '../message';

const styledListItemButton = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderBottom: '1px',
  borderStyle: 'solid',
  padding: (theme: Theme) => theme.spacing(1),
  borderColor: (theme: Theme) => theme.palette.grey.A400,

  ':last-child': {
    border: 'none',
  },
};

type Props = {
  id: string;
  title: string;
} & TForumMessage;

export const PreviewMessage = ({ title, id, userName, time, text }: Props) => (
  <ListItemButton sx={styledListItemButton} component={RouterLint} to={id}>
    <Typography variant="h6">{title}</Typography>
    <ForumMessage userName={userName} time={time} text={text} />
  </ListItemButton>
);
