import { buildCreateApi, coreModule, reactHooksModule } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './base-query';

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true }),
);

export const instanceApi = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});
