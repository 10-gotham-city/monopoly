import { List, ListSubheader, Typography, styled } from '@mui/material';

import { AddForumThemeDialog } from 'features/forum';

import { ForumPreviewMessage } from 'entities/forum';

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

const CustomList = styled(List)`
  padding: ${({ theme }) => `${theme.spacing(3)} 0`};
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
  const topPreviewsMessage = topPreviews.map(({ title, id, userName, time, text }) => (
    <ForumPreviewMessage
      title={title}
      id={id}
      userName={userName}
      time={time}
      text={text}
    ></ForumPreviewMessage>
  ));

  const themePreviewsMessage = themePreviews.map(({ title, id, userName, time, text }) => (
    <ForumPreviewMessage
      title={title}
      id={id}
      userName={userName}
      time={time}
      text={text}
    ></ForumPreviewMessage>
  ));

  return (
    <BaseLayer>
      <ForumTitleBox>Форум</ForumTitleBox>
      <AddForumThemeDialog />
      <CustomList>
        <CustomListSubheader>Популярное (топ 3)</CustomListSubheader>
        {topPreviewsMessage}
      </CustomList>
      <List>
        <CustomListSubheader>Темы</CustomListSubheader>
        {themePreviewsMessage}
      </List>
    </BaseLayer>
  );
};
