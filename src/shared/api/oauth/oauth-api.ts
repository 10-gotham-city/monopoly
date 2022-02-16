import { REDIRECT_URI } from 'shared/config';

import { instanceApi } from '../instance-api';
import { TGetServiceIdResponse, TOauthSignInRequest } from './types';

export const oauthApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<void, TOauthSignInRequest>({
      query: (body) => ({
        url: '/oauth/yandex',
        method: 'POST',
        body,
      }),
    }),
    getServiceId: builder.query<TGetServiceIdResponse, void>({
      query: () => ({
        url: `/oauth/yandex/service-id?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetServiceIdQuery, useSignInMutation } = oauthApi;
