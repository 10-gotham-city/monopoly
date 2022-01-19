import { Box } from '@mui/material';
import { FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { TRegistrationFormValues } from 'features/auth';
import { RegistrationForm, registrationRequestAction } from 'features/auth';

import { BaseLayer } from 'shared/ui/layers';

export const RegistrationPage = () => {
  const dispatch = useDispatch<GlobalDispatch>();

  const registrationSubmitHandler = useCallback(
    (formValues: TRegistrationFormValues, helpers: FormikHelpers<TRegistrationFormValues>) => {
      dispatch(registrationRequestAction(formValues)).then(() => helpers.setSubmitting(false));
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
