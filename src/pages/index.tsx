import { Route, Routes } from 'react-router-dom';
import { routes } from 'shared/config';
import { RegistrationPage } from './registration-page';
import { ProfilePage } from './profile-page';
import { AuthorizationPage } from './authorization-page';

export const Router = () => (
  <Routes>
    <Route path={routes.home} element={<>App</>} />
    <Route path={routes.registration} element={<RegistrationPage />} />
    <Route path={routes.profile} element={<ProfilePage />} />
    <Route path={routes.login} element={<AuthorizationPage />} />
  </Routes>
);
