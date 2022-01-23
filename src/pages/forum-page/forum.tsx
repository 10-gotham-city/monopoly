import { Box, Button, List, ListSubheader, Typography, styled } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddForumThemeDialog } from 'features/forum';

import { NameThemeWithLastMessage } from 'entities/forum/ui';

import { BaseLayer } from 'shared/ui/layers';

const CustomListSubheader = styled(ListSubheader)`
  font-weight: ${({ theme }) => `${theme.typography.fontWeightBold}`};
  font-size: ${({ theme }) => `${theme.typography.h5.fontSize}`};
  padding: ${({ theme }) => `${theme.spacing(0)}`};
`;

const ForumTitleBox = styled(Typography)`
  padding: ${({ theme }) => `${theme.spacing(3)} 0`};
  font-weight: ${({ theme }) => `${theme.typography.fontWeightBold}`};
  font-size: ${({ theme }) => `${theme.typography.h5.fontSize} `};
`;

const WrapperButton = styled(Box)`
  display: flex;
  justify-content: flex-end;
`;

const CustomList = styled(List)`
  padding: ${({ theme }) => `${theme.spacing(3)} 0`};
`;

export const Forum = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelectForumTheme = () => navigate('123');
  const handleClickOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleAddTheme = useCallback(() => null, []);

  return (
    <BaseLayer>
      <ForumTitleBox>Форум</ForumTitleBox>
      <WrapperButton>
        <Button variant="outlined" onClick={handleClickOpen}>
          Создать тему
        </Button>
      </WrapperButton>
      <AddForumThemeDialog open={open} handleClose={handleClose} handleAddTheme={handleAddTheme} />
      <CustomList>
        <CustomListSubheader>Популярное (топ 3)</CustomListSubheader>
        <NameThemeWithLastMessage
          nameTheme={'Название темы'}
          onClick={handleSelectForumTheme}
          userName={'11'}
          time={'11:11'}
          text={'бла бла бла бла бла'}
        />
        <NameThemeWithLastMessage
          nameTheme={'Название темы'}
          onClick={handleSelectForumTheme}
          userName={'22'}
          time={'12:12'}
          text={'бла бла бла бла бла'}
        />
        <NameThemeWithLastMessage
          nameTheme={'Название темы'}
          onClick={handleSelectForumTheme}
          userName={'33'}
          time={'13:13'}
          text={'бла бла бла бла бла'}
        />
      </CustomList>
      <List>
        <CustomListSubheader>Темы</CustomListSubheader>
        <NameThemeWithLastMessage
          nameTheme={'Название темы'}
          onClick={handleSelectForumTheme}
          userName={'44'}
          time={'14:14'}
          text={'бла бла бла бла бла'}
        />
        <NameThemeWithLastMessage
          nameTheme={'Название темы'}
          onClick={handleSelectForumTheme}
          userName={'55'}
          time={'15:15'}
          text={'бла бла бла бла бла'}
        />
        <NameThemeWithLastMessage
          nameTheme={'Название темы'}
          onClick={handleSelectForumTheme}
          userName={'66'}
          time={'16:16'}
          text={'бла бла бла бла бла'}
        />
        <NameThemeWithLastMessage
          nameTheme={'Название темы'}
          onClick={handleSelectForumTheme}
          userName={'77'}
          time={'17;17'}
          text={'бла бла бла бла бла'}
        />
      </List>
    </BaseLayer>
  );
};
