import { ChangePasswordFormNames, TChangePasswordFormValues } from '../../types';

export const validator = (values: TChangePasswordFormValues) => {
  const errors: Partial<Record<ChangePasswordFormNames, string>> = {};

  if (!values['old-password']) {
    errors['old-password'] = 'Обязательное поле';
  }

  if (!values['new-password']) {
    errors['new-password'] = 'Обязательное поле';
  }

  if (!values['repeat-new-password']) {
    errors['repeat-new-password'] = 'Обязательное поле';
  }

  if (values['new-password'] && values['repeat-new-password']) {
    if (values['new-password'] !== values['repeat-new-password']) {
      errors['repeat-new-password'] = 'Пароли должны совпадать';
    }
  }

  return errors;
};
