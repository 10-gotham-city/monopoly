import { useEffect } from 'react';

import { useSignInOauthMutation } from 'shared/api/oauth';
import { REDIRECT_URI } from 'shared/config';

export const useOauth = () => {
  const [signInOauth, { isError, error }] = useSignInOauthMutation();
  useEffect(() => {
    async function signIn(code: string) {
      await signInOauth({
        code,
        redirect_uri: REDIRECT_URI,
      });
    }
    const code = /code=([^&]+)/.exec(document.location.search);
    if (code && code[1]) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      signIn(code[1]);
    }
  }, [signInOauth]);

  console.log(error);
  // rtq не обработал ответ "ОК"
  // "SyntaxError: Unexpected token O in JSON at position 0"
  return { isAuthorizedOauth: isError && error === 200 };
};
