import { Box } from '@mui/material';
import { useCallback } from 'react';

import {
  RegistrationForm,
  TRegistrationFormValues,
  mapRegistrationFormToQuery,
} from 'features/auth';

import { useSignUpMutation } from 'shared/api/auth';
import { BaseLayout } from 'shared/ui/layouts';

export const RegistrationPage = () => {
  const [sighUpMutation] = useSignUpMutation();

  const registrationSubmitHandler = useCallback(
    async (formValues: TRegistrationFormValues) => {
      await sighUpMutation(mapRegistrationFormToQuery(formValues));
    },
    [sighUpMutation],
  );

  return (
    <BaseLayout>
      <Box width={1} height={1} display="flex" alignItems="center" justifyContent="center">
        <RegistrationForm onSubmit={registrationSubmitHandler} />
      </Box>
    </BaseLayout>
  );
};
