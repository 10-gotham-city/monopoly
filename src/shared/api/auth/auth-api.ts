import { addBaseUrl } from '../../lib';
import { instanceApi } from '../instance-api';
import { TGetUserResponse, TSignInRequest, TSignUpRequest, TSignUpResponse } from './types';

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
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getUser: builder.query<TGetUserResponse, void>({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'user' }],
      transformResponse: (result: TGetUserResponse) =>
        addBaseUrl({
          payload: result,
          resourceKeyName: 'avatar',
        }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation, useGetUserQuery } = authApi;
