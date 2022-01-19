import { http } from 'shared/api/axios';

import { TSignInTSignInRequest } from './types';

export const signIn = (data: TSignInTSignInRequest) =>
  http.getInstance().post('/auth/signin', data);
