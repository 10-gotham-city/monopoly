import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AuthorizationForm,
  TAuthorizationFormValues,
  useAuth, // useOauth
} from 'features/auth';

import { routes } from 'shared/config';
import { BaseLayout } from 'shared/ui/layouts';

export const AuthorizationPage = () => {
  const navigate = useNavigate();
  // const { isAuthorizedOauthLoading } = useOauth();

  const { signIn } = useAuth();

  const signInHandler = useCallback(
    async (values: TAuthorizationFormValues) => {
      await signIn(values);
      navigate(routes.game);
    },
    [signIn, navigate],
  );

  return (
    <BaseLayout>
      <Box width={1} height={1} display="flex" alignItems="center" justifyContent="center">
        <AuthorizationForm onSubmit={signInHandler} />
      </Box>
    </BaseLayout>
  );
};
