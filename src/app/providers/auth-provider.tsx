import { useMemo, useState } from 'react';

import { authContext, useAuth, useOauth } from 'features/auth';

type Props = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: Props) => {
  useOauth();
  const { initialValue } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(initialValue);

  const providerValue = useMemo(
    () => ({
      isAuthorized,
      setIsAuthorized: (value: boolean) => setIsAuthorized(value),
    }),
    [isAuthorized],
  );

  return <authContext.Provider value={providerValue}>{children}</authContext.Provider>;
};
