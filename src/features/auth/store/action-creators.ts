import { createAsyncThunk } from '@reduxjs/toolkit';

import { mapRegistrationFormToQuery } from '../mappers';

import { api } from 'shared/api';

import { TRegistrationFormValues } from '../types';
import { REGISTRATION_REQUEST } from './actions';

export const registrationRequestAction = createAsyncThunk(
  REGISTRATION_REQUEST,
  async (formValues: TRegistrationFormValues) => {
    const response = await api.auth.signUp(mapRegistrationFormToQuery(formValues));
    return response;
  },
);
