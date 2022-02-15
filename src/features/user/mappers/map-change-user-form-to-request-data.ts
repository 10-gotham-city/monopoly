import { TChangeProfileRequest } from 'shared/api/user';

import { TChangeUserDataFormValues } from '../types';

export const mapChangeUserDataFormToRequestData = (
  values: TChangeUserDataFormValues,
): TChangeProfileRequest => ({
  display_name: values['display-name'],
  email: values.email,
  first_name: values['first-name'],
  login: values.login,
  phone: values.phone,
  second_name: values['second-name'],
});
