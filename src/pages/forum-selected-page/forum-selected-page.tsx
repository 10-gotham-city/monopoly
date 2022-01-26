import { Box, Button, FormGroup, TextField, Theme, Typography, styled } from '@mui/material';
import { useCallback, useMemo } from 'react';

import { ForumMessage } from 'entities/forum';

import { BaseLayout } from 'shared/ui/layouts';

const ForumTitleBox = styled(Typography)`
  padding: ${({ theme }) => `${theme.spacing(3)} 0`};
`;

const ContainerMessage = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-bottom: ${({ theme }) => `${theme.spacing(3)}`};
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  margin-bottom: ${({ theme }) => `${theme.spacing(1)}`}; ;
`;

const CustomFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
`;

const CustomButton = styled(Button)`
  margin-left: auto;
`;

const styledForumMessage = {
  marginBottom: (theme: Theme) => theme.spacing(2),
};

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

export const ForumSelectedPage = () => {
  const handleSendMessage = useCallback((event) => null, []);

  const messages = useMemo(
    () =>
      tempData.message.map(({ userName, time, text }, index) => (
        <ForumMessage
          userName={userName}
          time={time}
          text={text}
          key={`${userName}_${index}`}
          sx={styledForumMessage}
        />
      )),
    [],
  );

  return (
    <BaseLayout>
      <ForumTitleBox variant="h4">{tempData.title}</ForumTitleBox>
      <ContainerMessage>{messages}</ContainerMessage>
      <CustomFormGroup>
        <CustomTextField
          id="sendMessage"
          name="message"
          label="Сообщение"
          placeholder="Введите сообщение"
          multiline
          rows={4}
        />
        <CustomButton variant="contained" onClick={handleSendMessage}>
          Отправить
        </CustomButton>
      </CustomFormGroup>
    </BaseLayout>
  );
};
