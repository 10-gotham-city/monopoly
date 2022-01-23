import { Box, Button, FormGroup, TextField, Typography, styled } from '@mui/material';
import { useCallback } from 'react';

import { ForumMessage } from 'entities/forum';

import { BaseLayer } from 'shared/ui/layers';

const ForumTitleBox = styled(Typography)`
  padding: ${({ theme }) => `${theme.spacing(3)} 0`};
  font-weight: ${({ theme }) => `${theme.typography.fontWeightBold}`};
  font-size: ${({ theme }) => `${theme.typography.h5.fontSize} `};
`;

const tempData = {
  title: 'Название темы',
  message: [
    {
      userName: 'Имя пользователя отправившего сообщение',
      text: 'Текст сообщения',
      time: '14:14',
    },
    {
      userName: 'Петя',
      text: 'Текст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщенияТекст сообщения',
      time: '15:12',
    },
    {
      userName: 'Олег',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Noname',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: '12312eld',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Bujhm',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Bujhm',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Bujhm',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Bujhm',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Bujhm',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Bujhm',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Bujhm',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Bujhm',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Bujhm',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Bujhm',
      text: 'Текст сообщения',
      time: '15:12',
    },
    {
      userName: 'Bujhm',
      text: 'Текст сообщения',
      time: '15:12',
    },
  ],
};

const ContainerMessage = styled(Box)`
  max-height: calc(100vh - 64px - 264px);
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow: scroll;
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 8px;
`;

export const ForumSelectedPage = () => {
  const handleSendMessage = useCallback((event) => null, []);

  const Messages = tempData.message.map((item, index) => (
    <ForumMessage
      userName={item.userName}
      time={item.time}
      text={item.text}
      key={`${item.userName}_${index}`}
    />
  ));

  return (
    <BaseLayer>
      <ForumTitleBox>{tempData.title}</ForumTitleBox>
      <ContainerMessage>{Messages}</ContainerMessage>
      <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
        <CustomTextField
          id="sendMessage"
          name="message"
          label="Сообщение"
          placeholder="Введите сообщение"
          multiline
          rows={4}
        />
        <Button sx={{ marginLeft: 'auto' }} variant="contained" onClick={handleSendMessage}>
          Отправить
        </Button>
      </FormGroup>
    </BaseLayer>
  );
};
