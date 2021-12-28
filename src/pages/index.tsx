import { Route, Routes } from 'react-router-dom';

import { routes } from 'shared/config';

import { AuthorizationPage } from './authorization-page';
import { RegistrationPage } from './registration-page';

export const Router = () => (
  <Routes>
    <Route path={routes.home} element={<>App</>} />
    <Route path={routes.registration} element={<RegistrationPage />} />
    <Route path={routes.login} element={<AuthorizationPage />} />
  </Routes>
);
