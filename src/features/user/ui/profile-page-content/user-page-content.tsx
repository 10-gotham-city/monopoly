import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, styled } from '@mui/material';

import { TUserData, UserData } from 'entities/user';

const AvatarWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const StyledAvatar = styled(Avatar)`
  width: 200px;
  height: 200px;
`;

const ButtonsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

type Props = {
  avatarSrc: string;
  isLogoutPending: boolean;
  onChangeAvatarClick: () => void;
  onChangeDataClick: () => void;
  onChangePasswordClick: () => void;
  onLogoutClick: () => void;
} & TUserData;

export const ProfilePageContent = ({
  displayName,
  email,
  firstName,
  login,
  phone,
  secondName,
  avatarSrc,
  isLogoutPending,
  onChangeAvatarClick,
  onChangeDataClick,
  onChangePasswordClick,
  onLogoutClick,
}: Props) => (
  <>
    <AvatarWrapper>
      <StyledAvatar alt="" src={avatarSrc} />
      <Button onClick={onChangeAvatarClick} variant="outlined" size="small">
        Изменить аватар
      </Button>
    </AvatarWrapper>

    <Box width={1} mb={5}>
      <UserData
        firstName={firstName}
        secondName={secondName}
        displayName={displayName}
        email={email}
        login={login}
        phone={phone}
      />
    </Box>

    <ButtonsWrapper>
      <Box display="flex" gap={2}>
        <Button variant="outlined" onClick={onChangeDataClick}>
          Изменить данные
        </Button>
        <Button variant="outlined" onClick={onChangePasswordClick}>
          Изменить пароль
        </Button>
      </Box>
      <LoadingButton variant="text" color="error" onClick={onLogoutClick} loading={isLogoutPending}>
        Выйти
      </LoadingButton>
    </ButtonsWrapper>
  </>
);
