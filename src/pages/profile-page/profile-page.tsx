import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'features/auth';
import {
  ChangeAvatarDialog,
  ChangePasswordDialog,
  ChangeUserDataDialog,
  ProfilePageContent,
  TChangePasswordFormValues,
  TChangeUserDataFormValues,
  mapChangeUserDataFormToRequestData,
  mapPasswordFormToRequestData,
  mapUserResponse,
  mapUserResponseToFormInitialValues,
} from 'features/user';
import { TChangeAvatarDataFormValues } from 'features/user/types';

import { useGetUserQuery } from 'shared/api/auth';
import {
  useChangeAvatarMutation,
  useChangePasswordMutation,
  useChangeProfileMutation,
} from 'shared/api/user';
import { routes } from 'shared/config';
import { ErrorContent } from 'shared/ui/components';

import { ProfilePageTemplate } from './profile-page-template';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { logout, isLogoutPending } = useAuth();
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserError,
    refetch: refetchUserData,
  } = useGetUserQuery();
  const [changePasswordMutation] = useChangePasswordMutation();
  const [changeUserDataMutation] = useChangeProfileMutation();
  const [changeAvatarMutation] = useChangeAvatarMutation();

  const [isChangePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
  const [isChangeUserDataDialogOpen, setChangeUserDataDialogOpen] = useState(false);
  const [isChangeAvatarDialogOpen, setChangeAvatarDialogOpen] = useState(false);

  const handleOpenChangePassword = useCallback(() => setChangePasswordDialogOpen(true), []);
  const handleCloseChangePassword = useCallback(() => setChangePasswordDialogOpen(false), []);

  const handleOpenChangeUserData = useCallback(() => setChangeUserDataDialogOpen(true), []);
  const handleCloseChangeUserData = useCallback(() => setChangeUserDataDialogOpen(false), []);

  const handleOpenChangeAvatar = useCallback(() => setChangeAvatarDialogOpen(true), []);
  const handleCloseChangeAvatar = useCallback(() => setChangeAvatarDialogOpen(false), []);

  const handleSubmitChangePassword = useCallback(
    async (values: TChangePasswordFormValues) => {
      await changePasswordMutation(mapPasswordFormToRequestData(values))
        .unwrap()
        .then(() => {
          handleCloseChangePassword();
          enqueueSnackbar('Пароль успешно изменен', { variant: 'success' });
        })
        .catch(() => enqueueSnackbar('Не удалось изменить пароль', { variant: 'error' }));
    },
    [changePasswordMutation, handleCloseChangePassword, enqueueSnackbar],
  );
  const handleSubmitChangeUserData = useCallback(
    async (values: TChangeUserDataFormValues) => {
      await changeUserDataMutation(mapChangeUserDataFormToRequestData(values))
        .unwrap()
        .then(() => {
          handleCloseChangeUserData();
          enqueueSnackbar('Данные профиля успешно изменены', { variant: 'success' });
        })
        .catch(() => enqueueSnackbar('Не удалось изменить данные профиля', { variant: 'error' }));
    },
    [changeUserDataMutation, handleCloseChangeUserData, enqueueSnackbar],
  );
  const handleSubmitChangeAvatar = useCallback(
    async (values: TChangeAvatarDataFormValues) => {
      const formData = new FormData();

      if (values.avatar) {
        formData.set('avatar', values.avatar);
        await changeAvatarMutation(formData)
          .unwrap()
          .then(() => {
            handleCloseChangeAvatar();
            enqueueSnackbar('Аватар успешно изменен', { variant: 'success' });
          })
          .catch(() => enqueueSnackbar('Не удалось изменить аватар', { variant: 'error' }));
      }
    },
    [changeAvatarMutation, handleCloseChangeAvatar, enqueueSnackbar],
  );

  const logoutHandler = useCallback(async () => {
    await logout();
    navigate(routes.login);
  }, [logout, navigate]);

  const pageContent = useMemo(
    () => (
      <ProfilePageContent
        {...mapUserResponse(userData)}
        avatarSrc={userData?.avatar ?? ''}
        isLogoutPending={isLogoutPending}
        onChangeAvatarClick={handleOpenChangeAvatar}
        onChangeDataClick={handleOpenChangeUserData}
        onChangePasswordClick={handleOpenChangePassword}
        onLogoutClick={logoutHandler}
      />
    ),
    [
      userData,
      isLogoutPending,
      handleOpenChangeUserData,
      handleOpenChangePassword,
      logoutHandler,
      handleOpenChangeAvatar,
    ],
  );

  const errorContent = useMemo(
    () => <ErrorContent isLoading={isUserDataLoading} onRefetchClick={refetchUserData} />,
    [isUserDataLoading, refetchUserData],
  );

  return (
    <>
      <ProfilePageTemplate
        content={pageContent}
        errorContent={errorContent}
        isLoading={isUserDataLoading}
        isError={isUserError}
      />

      <ChangePasswordDialog
        open={isChangePasswordDialogOpen}
        onClose={handleCloseChangePassword}
        onSubmit={handleSubmitChangePassword}
      />
      <ChangeUserDataDialog
        initialValues={mapUserResponseToFormInitialValues(userData)}
        open={isChangeUserDataDialogOpen}
        onClose={handleCloseChangeUserData}
        onSubmit={handleSubmitChangeUserData}
      />
      <ChangeAvatarDialog
        open={isChangeAvatarDialogOpen}
        onClose={handleCloseChangeAvatar}
        onSubmit={handleSubmitChangeAvatar}
      />
    </>
  );
};
