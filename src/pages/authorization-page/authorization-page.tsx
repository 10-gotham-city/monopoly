import { Box } from '@mui/material';
import { FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthorizationForm, TAuthorizationFormValues } from 'features/auth';

import { useSignInMutation } from 'shared/api/auth';
import { routes } from 'shared/config';
import { BaseLayout } from 'shared/ui/layouts';

export const AuthorizationPage = () => {
  const navigate = useNavigate();

  const [signInMutation] = useSignInMutation();

  const signInHandler = useCallback(
    (
      values: TAuthorizationFormValues,
      { setSubmitting }: FormikHelpers<TAuthorizationFormValues>,
    ) => {
      signInMutation(values)
        .then(() => navigate(routes.game))
        .finally(() => setSubmitting(false));
    },
    [signInMutation, navigate],
  );

  return (
    <BaseLayout>
      <Box width={1} height={1} display="flex" alignItems="center" justifyContent="center">
        <AuthorizationForm onSubmit={signInHandler} />
      </Box>
    </BaseLayout>
  );
};
