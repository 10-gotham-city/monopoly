import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignInOauthMutation } from 'shared/api/oauth';
import { REDIRECT_URI, routes } from 'shared/config';

import { AUTH_KEY_LS, authContext } from '../model';

export const useOauth = () => {
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized } = useContext(authContext);
  const [signInOauth, { isLoading }] = useSignInOauthMutation();

  useEffect(() => {
    async function signIn(code: string) {
      const response = await signInOauth({
        code,
        redirect_uri: REDIRECT_URI,
      });

      if ('data' in response && response.data === 'OK') {
        setIsAuthorized(true);
        localStorage.setItem(AUTH_KEY_LS, 'true');
        navigate(routes.game);
      }
    }
    const code = /code=([^&]+)/.exec(document.location.search);
    if (code && code[1]) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      signIn(code[1]);
    }
  }, [signInOauth, navigate, setIsAuthorized]);

  return {
    isAuthorizedOauth: isAuthorized,
    isAuthorizedOauthLoading: isLoading,
  };
};
