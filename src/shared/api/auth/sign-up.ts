import { http } from 'shared/api/axios';

type TSignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export const signUp = (data: TSignUp) => http.getInstance().post('/auth/signup', data);
