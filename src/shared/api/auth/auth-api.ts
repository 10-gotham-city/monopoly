import { instanceApi } from '../instance-api';
import { TSignInRequest, TSignUpRequest, TSignUpResponse } from './types';

export const authApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<string, TSignInRequest>({
      query: (body) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<TSignUpResponse, TSignUpRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation } = authApi;
