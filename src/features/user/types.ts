export enum ChangePasswordFormNames {
  OldPassword = 'old-password',
  NewPassword = 'new-password',
  RepeatNewPassword = 'repeat-new-password',
}

export type TChangePasswordFormValues = {
  [key in ChangePasswordFormNames]: string;
};

export enum ChangeUserDataFormNames {
  FirstName = 'first-name',
  SecondName = 'second-name',
  DisplayName = 'display-name',
  Login = 'login',
  Email = 'email',
  Phone = 'phone',
}

export type TChangeUserDataFormValues = {
  [key in ChangeUserDataFormNames]: string;
};
