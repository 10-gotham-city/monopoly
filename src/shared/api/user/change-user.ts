import { http } from '../axios';
import { TChangeUserQuery, TChangeUserResponse } from './types';

export const changeUser = (data: TChangeUserQuery) =>
  http.getInstance().post<TChangeUserResponse>('/user/profile', data);
