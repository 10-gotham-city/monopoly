import { PATH } from 'shared/api/config';
import { instanceAxios } from 'shared/api/axios';
import { AxiosResponse } from 'axios';

type TSignIn = {
  login: string,
  password: string
};

type TBadRequest = {
  reason: string
};

type TResp = string | TBadRequest;

export const signIn = async ({ login, password }: TSignIn): Promise<AxiosResponse<TResp>> => {
  const response = await instanceAxios.post(PATH.AUTH.SIGNIN, { login, password });

  return response;
};
