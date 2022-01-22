import { useMemo, useState } from 'react';

import { authContext, useAuth } from 'features/auth';

type Props = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: Props) => {
  const { defaultValue } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(defaultValue);

  const providerValue = useMemo(
    () => ({
      isAuthorized,
      setIsAuthorized: (value: boolean) => setIsAuthorized(value),
    }),
    [isAuthorized],
  );

  return <authContext.Provider value={providerValue}>{children}</authContext.Provider>;
};
