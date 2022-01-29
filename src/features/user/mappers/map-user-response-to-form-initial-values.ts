import { TGetUserResponse } from 'shared/api/auth';

import { TChangeUserDataFormValues } from '../types';

export const mapUserResponseToFormInitialValues = (
  responseData: TGetUserResponse | undefined,
): TChangeUserDataFormValues => {
  if (!responseData) {
    return {
      'display-name': '',
      'first-name': '',
      'second-name': '',
      email: '',
      login: '',
      phone: '',
    };
  }

  return {
    'display-name': responseData.display_name,
    'first-name': responseData.first_name,
    'second-name': responseData.second_name,
    email: responseData.email,
    login: responseData.login,
    phone: responseData.phone,
  };
};
