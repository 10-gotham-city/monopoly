import { instanceApi } from '../instance-api';
import { TAllLeaderboardRequest, TAllLeaderboardResponse, TUserLeaderboardRequest } from './types';

export const leaderboardApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    addUserToLeaderboard: builder.mutation<string, TUserLeaderboardRequest>({
      query: (body) => ({
        url: '/leaderboard',
        method: 'POST',
        body,
      }),
    }),
    getAllLeaderboard: builder.mutation<TAllLeaderboardResponse, TAllLeaderboardRequest>({
      query: (body) => ({
        url: '/leaderboard/all',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useAddUserToLeaderboardMutation, useGetAllLeaderboardMutation } = leaderboardApi;
