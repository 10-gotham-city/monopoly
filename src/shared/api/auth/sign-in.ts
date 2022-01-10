import { http } from 'shared/api/axios';

type TSignInTSignInRequest = {
  login: string;
  password: string;
};

export const signIn = (data: TSignInTSignInRequest) =>
  http.getInstance().post('/auth/signin', data);
