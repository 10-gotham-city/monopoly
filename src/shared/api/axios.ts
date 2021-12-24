import axios, { AxiosInstance } from 'axios';

export const http = (function () {
  let instance: AxiosInstance | undefined;

  function createInstanceAxios(): AxiosInstance {
    return axios.create({
      baseURL: 'ya-praktikum.tech/api/v2',
      headers: { 'Content-type': 'application/json' },
      withCredentials: true,
      timeout: 3000,
    });
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstanceAxios();
      }

      return instance;
    },
  };
}());
