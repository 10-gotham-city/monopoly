export enum ChangePasswordFormNames {
  OldPassword = 'old-password',
  NewPassword = 'new-password',
  RepeatNewPassword = 'repeat-new-password',
}

export type TChangePasswordFormValues = {
  [key in ChangePasswordFormNames]: string;
};
