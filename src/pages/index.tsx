import { Route, Routes } from 'react-router-dom';
import { routes } from 'shared/config';
import { RegistrationPage } from './registration-page';
import { LeaderboardPage } from './leaderboard-page';
import { AuthorizationPage } from './authorization-page';


export const Router = () => (
  <Routes>
    <Route path={routes.home} element={<>App</>} />
    <Route path={routes.registration} element={<RegistrationPage />} />
    <Route path={routes.leaderboard} element={<LeaderboardPage />} />
    <Route path={routes.login} element={<AuthorizationPage />} />
  </Routes>
);
