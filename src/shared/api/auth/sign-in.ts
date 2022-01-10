import { http } from 'shared/api/axios';

type TSignInTSignInRequest = {
  login: string;
  password: string;
};

export const signIn = ({ login, password }: TSignInTSignInRequest) =>
  http.getInstance().post('/auth/signin', {
    data: {
      login,
      password,
    },
  });
