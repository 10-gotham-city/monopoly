import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ya-praktikum.tech/api/v2',
  prepareHeaders: (headers) => {
    headers.set('Content-type', 'application/json');
    headers.set('timeout', '3000');

    return headers;
  },
  credentials: 'include',
});
