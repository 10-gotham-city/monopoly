import { TSignUpRequest } from 'shared/api/auth';

import { TRegistrationFormValues } from '../types';

export const mapRegistrationFormToRequestData = (
  formValues: TRegistrationFormValues,
): TSignUpRequest => ({
  email: formValues.email,
  first_name: formValues['first-name'],
  login: formValues.login,
  password: formValues.password,
  phone: formValues.phone,
  second_name: formValues['second-name'],
});
