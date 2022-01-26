import { useContext } from 'react';

import { useLogoutMutation, useSignInMutation } from 'shared/api/auth';

import { authContext } from '../model';

const AUTH_KEY = 'authorized';

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
    initialValue: localStorage.getItem(AUTH_KEY) === 'true',
    isAuthorized,
    isLogoutPending,
  };
};
