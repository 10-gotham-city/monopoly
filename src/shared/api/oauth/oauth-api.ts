import { REDIRECT_URI } from 'shared/config';

import { instanceApi } from '../instance-api';
import { TGetServiceIdResponse, TOauthSignInRequest } from './types';

export const oauthApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    signInOauth: builder.mutation<void, TOauthSignInRequest>({
      query: (body) => ({
        url: '/oauth/yandex',
        method: 'POST',
        body,
      }),
      // eslint-disable-next-line @typescript-eslint/no-shadow
      transformResponse: (response) => {
        console.log('response', response);
      },
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

export const { useGetServiceIdQuery, useSignInOauthMutation } = oauthApi;
