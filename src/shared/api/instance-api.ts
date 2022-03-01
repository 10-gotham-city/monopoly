import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './base-query';

export const instanceApi = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['user'],
});
