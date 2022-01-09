import { http } from 'shared/api/axios';

type TSignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export const signUp = ({ first_name, second_name, login, email, password, phone }: TSignUp) =>
  http.getInstance().post('/auth/signup', {
    data: {
      first_name,
      second_name,
      login,
      email,
      password,
      phone,
    },
  });
