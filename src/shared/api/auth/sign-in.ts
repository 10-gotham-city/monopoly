import { http } from 'shared/api/axios';
import { TFailedResponse, TSuccessResponse } from 'shared/api/types';

type TSignInTSignInRequest = {
  login: string;
  password: string;
};

export const signIn = ({
  login,
  password,
}: TSignInTSignInRequest): Promise<TSuccessResponse | TFailedResponse> =>
  http.getInstance().post('/auth/signin', {
    data: {
      login,
      password,
    },
  });
