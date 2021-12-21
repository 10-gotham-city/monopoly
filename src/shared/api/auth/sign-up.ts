import { PATH } from 'shared/api/config';
import { instanceAxios } from 'shared/api/axios';
import { AxiosResponse } from 'axios';

type TSignUp = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
};

type TBadRequest = {
  reason: string
};

type TResp = string | TBadRequest;

export const signUp = async ({
  first_name,
  second_name,
  login,
  email,
  password,
  phone,
}: TSignUp): Promise<AxiosResponse<TResp>> => {
  const response = await instanceAxios.post(PATH.AUTH.SIGN_IN, {
    first_name,
    second_name,
    login,
    email,
    password,
    phone,
  });

  return response;
};
