import { instanceApi } from '../instance-api';
import {
  TAllLeaderboardRequest,
  TAllLeaderboardResponse,
  TTeamLeaderboardRequest,
  TUserLeaderboardRequest,
} from './types';

export const leaderboardApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    addUserToLeaderboard: builder.mutation<string, TUserLeaderboardRequest>({
      query: (body) => ({
        url: '/leaderboard',
        method: 'POST',
        body,
      }),
    }),
    getTeamLeaderboard: builder.query<TAllLeaderboardResponse, TTeamLeaderboardRequest>({
      query: ({ teamName, body }) => ({
        url: `/leaderboard/${teamName}`,
        method: 'POST',
        body,
      }),
    }),
    getAllLeaderboard: builder.query<TAllLeaderboardResponse, TAllLeaderboardRequest>({
      query: (body) => ({
        url: '/leaderboard/all',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useAddUserToLeaderboardMutation,
  useGetTeamLeaderboardQuery,
  useGetAllLeaderboardQuery,
} = leaderboardApi;
