export enum RegistrationFormNames {
  login = 'login',
  password = 'password',
  firstName = 'first-name',
  secondName = 'second-name',
  email = 'email',
  phone = 'phone',
}

export type TRegistrationFormValues = {
  [key in RegistrationFormNames]: string
};
