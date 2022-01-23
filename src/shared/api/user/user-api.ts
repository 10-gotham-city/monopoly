import { instanceApi } from '../instance-api';
import { TChangeProfileQuery, TChangeProfileResponse } from './types';

export const userApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    changeProfile: builder.mutation<TChangeProfileResponse, TChangeProfileQuery>({
      query: (body) => ({
        url: '/user/profile',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useChangeProfileMutation } = userApi;
