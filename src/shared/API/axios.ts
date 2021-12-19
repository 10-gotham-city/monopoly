import axios from 'axios';
import { BASE_URL } from 'shared/API/config';

export const instanceAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
  timeout: 3000,
});
