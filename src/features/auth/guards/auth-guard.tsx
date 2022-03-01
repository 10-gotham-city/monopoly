import { Navigate, useLocation } from 'react-router-dom';

import { routes } from 'shared/config';

import { useAuth, useOauth } from '../hooks';

type Props = { children: JSX.Element };

const AUTH_ROUTES = [routes.login, routes.registration];
const AVAILABLE_ROUTES = [routes.home];

export const AuthGuard = ({ children }: Props) => {
  const { isAuthorized } = useAuth();
  const { isAuthorizedOauth } = useOauth();
  const { pathname } = useLocation();

  if (isAuthorized || isAuthorizedOauth) {
    if (AUTH_ROUTES.includes(pathname)) {
      return <Navigate to={routes.game} replace />;
    }

    return children;
  }

  if (![...AUTH_ROUTES, ...AVAILABLE_ROUTES].includes(pathname)) {
    return <Navigate to={routes.login} replace />;
  }

  return children;
};
