import { Box, Button, List, Typography, styled } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { AddForumThemeDialog } from 'features/forum';

import { ForumPreviewMessage } from 'entities/forum';

import { BaseLayout } from 'shared/ui/layouts';

const CustomListSubheader = styled(Typography)`
  padding: ${({ theme }) => `${theme.spacing(0)}`};
`;

const ForumTitleBox = styled(Typography)`
  padding: ${({ theme }) => `${theme.spacing(3)} 0`};
`;

const CustomList = styled(List)`
  padding: ${({ theme }) => `${theme.spacing(3)} 0`};
`;

const WrapperButton = styled(Box)`
  display: flex;
  justify-content: flex-end;
`;

const topPreviews = [
  {
    title: 'Особенности игры',
    id: '111',
    userName: 'Игорь',
    time: '10:45',
    text: 'Хотелось бы здесь обсудить правила игры и ее особенности',
  },
  {
    title: 'Стратегия',
    id: '222',
    userName: 'Олег Петрович',
    time: '16:19',
    text: 'игра довольная непростая...',
  },
  {
    title: 'Собираем команды',
    id: '333',
    userName: 'Оксана',
    time: '19:00',
    text: 'Пишите кто хочет сыграть',
  },
];

const themePreviews = [
  {
    title: 'Балаган',
    id: '444',
    userName: 'Мегамонстр',
    time: '15:15',
    text: 'Любые темы обсуждаем',
  },
  {
    title: 'Новые карточеки',
    id: '555',
    userName: 'Победитель',
    time: '09:17',
    text: 'если у кого есть идеи, накидайте, обсудим',
  },
  {
    title: 'Дополнительные режимы игры',
    id: '666',
    userName: 'Sam',
    time: '18:13',
    text: 'если бы было нескольок режимов игры, было бы прикольно',
  },
  {
    title: 'Смена темы игры',
    id: '777',
    userName: 'Ivan003',
    time: '16:33',
    text: 'Будет ли возможность смены темы ?!',
  },
];

export const ForumPage = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleAddTheme = useCallback(() => null, []);

  const topPreviewsMessage = useMemo(
    () =>
      topPreviews.map(({ title, id, userName, time, text }) => (
        <ForumPreviewMessage title={title} id={id} userName={userName} time={time} text={text} />
      )),
    [],
  );

  const themePreviewsMessage = useMemo(
    () =>
      themePreviews.map(({ title, id, userName, time, text }) => (
        <ForumPreviewMessage title={title} id={id} userName={userName} time={time} text={text} />
      )),
    [],
  );

  return (
    <BaseLayout>
      <ForumTitleBox variant="h4">Форум</ForumTitleBox>
      <WrapperButton>
        <Button variant="outlined" onClick={handleClickOpen}>
          Создать тему
        </Button>
      </WrapperButton>
      <AddForumThemeDialog
        open={open}
        handlerClose={handleClose}
        handlerAddTheme={handleAddTheme}
      />
      <CustomList>
        <CustomListSubheader variant="h5">Популярное (топ 3)</CustomListSubheader>
        {topPreviewsMessage}
      </CustomList>
      <List>
        <CustomListSubheader>Темы</CustomListSubheader>
        {themePreviewsMessage}
      </List>
    </BaseLayout>
  );
};
