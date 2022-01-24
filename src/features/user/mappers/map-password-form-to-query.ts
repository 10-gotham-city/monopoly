import { TChangePasswordRequest } from 'shared/api/user';

import { TChangePasswordFormValues } from '../types';

export const mapPasswordFormToQuery = (
  values: TChangePasswordFormValues,
): TChangePasswordRequest => ({
  newPassword: values['new-password'],
  oldPassword: values['old-password'],
});
