import { createContext } from 'react';

export const authContext = createContext({
  isAuthorized: false,
  setIsAuthorized: (value: boolean) => {},
});
