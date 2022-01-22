import { Box } from '@mui/material';
import { FormikHelpers } from 'formik';
import { useCallback } from 'react';

import { TRegistrationFormValues } from 'features/auth';
import { RegistrationForm, mapRegistrationFormToQuery } from 'features/auth';

import { useSignUpMutation } from 'shared/api/auth';
import { BaseLayer } from 'shared/ui/layers';

export const RegistrationPage = () => {
  const [sighUpMutation] = useSignUpMutation();

  const registrationSubmitHandler = useCallback(
    (
      formValues: TRegistrationFormValues,
      { setSubmitting }: FormikHelpers<TRegistrationFormValues>,
    ) => {
      sighUpMutation(mapRegistrationFormToQuery(formValues)).finally(() => {
        setSubmitting(false);
      });
    },
    [],
  );

  return (
    <BaseLayer>
      <Box width={1} height={1} display="flex" alignItems="center" justifyContent="center">
        <RegistrationForm onSubmit={registrationSubmitHandler} />
      </Box>
    </BaseLayer>
  );
};
