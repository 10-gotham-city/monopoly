import { useContext } from 'react';

import { useLogoutMutation, useSignInMutation } from 'shared/api/auth';

import { AUTH_KEY_LS, authContext } from '../model';

export const useAuth = () => {
  const { isAuthorized, setIsAuthorized } = useContext(authContext);

  const [signInMutation] = useSignInMutation();
  const [logoutMutation, { isLoading: isLogoutPending }] = useLogoutMutation();

  return {
    signIn: async (payload: Parameters<typeof signInMutation>[0]) => {
      await signInMutation(payload);
      setIsAuthorized(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_KEY_LS, 'true');
      }
    },
    logout: async () => {
      await logoutMutation();
      setIsAuthorized(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_KEY_LS);
      }
    },
    initialValue:
      typeof window !== 'undefined' ? localStorage.getItem(AUTH_KEY_LS) === 'true' : false,
    isAuthorized,
    isLogoutPending,
  };
};
