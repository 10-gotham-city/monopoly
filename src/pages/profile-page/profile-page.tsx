import { useState, useCallback } from 'react';
import { Box, Avatar, styled, Button } from '@mui/material';
import { UserData } from 'entities/user';
import { ChangePasswordDialog } from 'features/user';

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
  const [isChangePasswordDialogOpen, setPasswordDialogOpen] = useState(false);

  const handleOpenChangePassword = useCallback(() => setPasswordDialogOpen(true), []);
  const handleCloseChangePassword = useCallback(() => setPasswordDialogOpen(false), []);

  const handleChangeAvatar = useCallback(() => null, []);

  const handleSubmitChangePassword = useCallback(() => null, []);

  const avatarSrc =
    'https://im0-tub-ru.yandex.net/i?id=a482f9ff07db5e691c0ed263cdeab7d4&n=13&exp=1';

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
          <Button onClick={handleChangeAvatar} variant="outlined" size="small">
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
            <Button variant="outlined">Изменить данные</Button>
            <Button variant="outlined" onClick={handleOpenChangePassword}>
              Изменить пароль
            </Button>
          </Box>
          <Button variant="text" color="error">
            Выйти
          </Button>
        </ButtonsWrapper>
      </Box>

      <ChangePasswordDialog
        open={isChangePasswordDialogOpen}
        onClose={handleCloseChangePassword}
        onSubmit={handleSubmitChangePassword}
      />
    </>
  );
};
