import { createContext } from 'react';

export const authContext = createContext({
  isAuthorized: false,
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  setIsAuthorized: (value: boolean) => {},
});
