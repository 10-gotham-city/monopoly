import { http } from 'shared/api/axios';

import { TSignUpRequest, TSignUpResponse } from './types';

export const signUp = (data: TSignUpRequest) =>
  http.getInstance().post<TSignUpResponse>('/auth/signup', data);
