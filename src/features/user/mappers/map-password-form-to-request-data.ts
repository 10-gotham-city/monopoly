import { TChangePasswordRequest } from 'shared/api/user';

import { TChangePasswordFormValues } from '../types';

export const mapPasswordFormToRequestData = (
  values: TChangePasswordFormValues,
): TChangePasswordRequest => ({
  newPassword: values['new-password'],
  oldPassword: values['old-password'],
});
