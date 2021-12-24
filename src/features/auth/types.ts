export enum RegistrationFormNames {
  Login = 'login',
  Password = 'password',
  FirstName = 'first_name',
  SecondName = 'second_name',
  Email = 'email',
  Phone = 'phone',
}

export enum AuthorizationFormNames {
  Login = 'login',
  Password = 'password',
}

export type TRegistrationFormValues = {
  [key in RegistrationFormNames]: string;
};

export type TAuthorizationFormValues = {
  [key in AuthorizationFormNames]: string;
};
