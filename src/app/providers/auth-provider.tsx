import { useMemo, useState } from 'react';

import { authContext, useAuth, useOauth } from 'features/auth';

type Props = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: Props) => {
  const { initialValue } = useAuth();
  const { isAuthorizedOauth } = useOauth();
  const [isAuthorized, setIsAuthorized] = useState(initialValue);

  const providerValue = useMemo(
    () => ({
      isAuthorized: isAuthorized || isAuthorizedOauth,
      setIsAuthorized: (value: boolean) => setIsAuthorized(value),
    }),
    [isAuthorized, isAuthorizedOauth],
  );

  return <authContext.Provider value={providerValue}>{children}</authContext.Provider>;
};
