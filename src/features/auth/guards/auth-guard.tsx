import { Navigate, useLocation } from 'react-router-dom';

import { routes } from 'shared/config';

import { useAuth } from '../hooks';

type Props = { children: JSX.Element };

const AUTH_ROUTES = [routes.login, routes.registration];

export const AuthGuard = ({ children }: Props) => {
  const { isAuthorized } = useAuth();
  const { pathname } = useLocation();

  if (isAuthorized) {
    if (AUTH_ROUTES.includes(pathname)) {
      return <Navigate to={routes.game} replace />;
    }

    return children;
  }

  if (!AUTH_ROUTES.includes(pathname)) {
    return <Navigate to={routes.login} replace />;
  }

  return children;
};
