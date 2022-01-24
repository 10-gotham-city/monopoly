import { Avatar, Box, Button, styled } from '@mui/material';
import { useCallback, useState } from 'react';

import {
  ChangeAvatarDialog,
  ChangePasswordDialog,
  ChangeUserDataDialog,
  TChangePasswordFormValues,
  mapPasswordFormToQuery,
} from 'features/user';

import { UserData } from 'entities/user';

import { useChangePasswordMutation } from 'shared/api/user';

const AvatarWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const ButtonsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

export const ProfilePage = () => {
  const [changePasswordMutation] = useChangePasswordMutation();

  const [isChangePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
  const [isChangeUserDataDialogOpen, setChangeUserDataDialogOpen] = useState(false);
  const [isChangeAvatarDialogOpen, setChangeAvatarDialogOpen] = useState(false);

  const handleOpenChangePassword = useCallback(() => setChangePasswordDialogOpen(true), []);
  const handleCloseChangePassword = useCallback(() => setChangePasswordDialogOpen(false), []);

  const handleOpenChangeUserData = useCallback(() => setChangeUserDataDialogOpen(true), []);
  const handleCloseChangeUserData = useCallback(() => setChangeUserDataDialogOpen(false), []);

  const handleOpenChangeAvatar = useCallback(() => setChangeAvatarDialogOpen(true), []);
  const handleCloseChangeAvatar = useCallback(() => setChangeAvatarDialogOpen(false), []);

  const logoutHandler = useCallback(() => null, []);
  // TODO: add snack
  const handleSubmitChangePassword = useCallback(
    async (values: TChangePasswordFormValues) => {
      await changePasswordMutation(mapPasswordFormToQuery(values));
    },
    [changePasswordMutation],
  );
  const handleSubmitChangeUserData = useCallback(() => null, []);
  const handleSubmitChangeAvatar = useCallback(() => null, []);

  const avatarSrc =
    'https://im0-tub-ru.yandex.net/i?id=a482f9ff07db5e691c0ed263cdeab7d4&n=13&exp=1';
  const isChangeAvatarLoading = false;

  return (
    <>
      <Box width={500} display="flex" flexDirection="column" alignItems="center" margin="0 auto">
        <AvatarWrapper>
          <Avatar
            alt=""
            src={avatarSrc}
            sx={{
              width: 200,
              height: 200,
            }}
          />
          <Button onClick={handleOpenChangeAvatar} variant="outlined" size="small">
            Изменить аватар
          </Button>
        </AvatarWrapper>

        <Box width={1} mb={5}>
          <UserData
            firstName="Иван"
            secondName="Иванова"
            displayName="Ivan"
            email="ivan@ivan.ivan"
            login="Ivan"
            phone="89990009090"
          />
        </Box>

        <ButtonsWrapper>
          <Box display="flex" gap={2}>
            <Button variant="outlined" onClick={handleOpenChangeUserData}>
              Изменить данные
            </Button>
            <Button variant="outlined" onClick={handleOpenChangePassword}>
              Изменить пароль
            </Button>
          </Box>
          <Button variant="text" color="error" onClick={logoutHandler}>
            Выйти
          </Button>
        </ButtonsWrapper>
      </Box>

      <ChangePasswordDialog
        open={isChangePasswordDialogOpen}
        onClose={handleCloseChangePassword}
        onSubmit={handleSubmitChangePassword}
      />
      <ChangeUserDataDialog
        // tmp
        initialValues={{
          'display-name': 'Иван',
          'first-name': 'Иван',
          'second-name': 'Иванов',
          email: 'ivan@ivan.ivan',
          login: 'Ivan',
          phone: '89099990099',
        }}
        open={isChangeUserDataDialogOpen}
        onClose={handleCloseChangeUserData}
        onSubmit={handleSubmitChangeUserData}
      />
      <ChangeAvatarDialog
        open={isChangeAvatarDialogOpen}
        isLoading={isChangeAvatarLoading}
        onClose={handleCloseChangeAvatar}
        onSubmit={handleSubmitChangeAvatar}
      />
    </>
  );
};
