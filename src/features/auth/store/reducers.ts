import { createReducer } from '@reduxjs/toolkit';

import { registrationRequestAction } from './action-creators';
import { TRegistrationState } from './types';

export const registrationReducer = createReducer<TRegistrationState>({}, (builder) => {
  builder.addCase(registrationRequestAction.fulfilled, (state, { payload }) => {
    state.userId = payload.data.id;
  });
});
