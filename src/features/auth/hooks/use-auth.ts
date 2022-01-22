import { createContext, useContext } from 'react';

import { useLogoutMutation, useSignInMutation } from 'shared/api/auth';

const AUTH_KEY = 'authorized';

export const authContext = createContext({
  isAuthorized: false,
  setIsAuthorized: (value: boolean) => {},
});

export const useAuth = () => {
  const { isAuthorized, setIsAuthorized } = useContext(authContext);

  const [signInMutation] = useSignInMutation();
  const [logoutMutation, { isLoading: isLogoutPending }] = useLogoutMutation();

  return {
    signIn: async (payload: Parameters<typeof signInMutation>[0]) => {
      await signInMutation(payload);
      setIsAuthorized(true);
      localStorage.setItem(AUTH_KEY, 'true');
    },
    logout: async () => {
      await logoutMutation();
      setIsAuthorized(false);
      localStorage.removeItem(AUTH_KEY);
    },
    defaultValue: localStorage.getItem(AUTH_KEY) === 'true',
    isAuthorized,
    setIsAuthorized,
    isLogoutPending,
  };
};
