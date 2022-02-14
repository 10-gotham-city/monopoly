import { TUserData } from 'entities/user';

import { TGetUserResponse } from 'shared/api/auth';

export const mapUserResponse = (responseData: TGetUserResponse | undefined): TUserData => {
  if (!responseData) {
    return {
      displayName: '',
      email: '',
      firstName: '',
      login: '',
      phone: '',
      secondName: '',
    };
  }

  return {
    displayName: responseData.display_name,
    email: responseData.email,
    firstName: responseData.first_name,
    login: responseData.login,
    phone: responseData.phone,
    secondName: responseData.second_name,
  };
};
