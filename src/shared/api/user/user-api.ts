import { instanceApi } from '../instance-api';
import {
  TChangeAvatarRequest,
  TChangeAvatarResponse,
  TChangePasswordRequest,
  TChangeProfileRequest,
  TChangeProfileResponse,
} from './types';

export const userApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    changeProfile: builder.mutation<TChangeProfileResponse, TChangeProfileRequest>({
      query: (body) => ({
        url: '/user/profile',
        method: 'PUT',
        body,
      }),
    }),
    changeAvatar: builder.mutation<TChangeAvatarResponse, TChangeAvatarRequest>({
      query: (formData) => ({
        url: '/user/profile/avatar',
        method: 'PUT',
        headers: {
          'Content-type': 'multipart/form-data',
        },
        body: formData,
      }),
    }),
    changePassword: builder.mutation<void, TChangePasswordRequest>({
      query: (body) => ({
        url: '/user/password',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useChangeProfileMutation, useChangeAvatarMutation, useChangePasswordMutation } =
  userApi;
