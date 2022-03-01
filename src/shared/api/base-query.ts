import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ya-praktikum.tech/api/v2',
  credentials: 'include',
});
