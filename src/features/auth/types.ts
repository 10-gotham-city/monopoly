export enum RegistrationFormNames {
  Login = 'login',
  Password = 'password',
  FirstName = 'first-name',
  SecondName = 'second-name',
  Email = 'email',
  Phone = 'phone',
}

export type TRegistrationFormValues = {
  [key in RegistrationFormNames]: string;
};
