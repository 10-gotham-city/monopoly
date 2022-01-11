import { Route, Routes } from 'react-router-dom';
import { routes } from 'shared/config';
import { RegistrationPage } from './registration-page';
import { ProfilePage } from './profile-page';
import { LeaderboardPage } from './leaderboard-page';
import { AuthorizationPage } from './authorization-page';
import { GamePage } from './game-page';

export const Router = () => (
  <Routes>
    <Route path={routes.home} element={<>App</>} />
    <Route path={routes.registration} element={<RegistrationPage />} />
    <Route path={routes.profile} element={<ProfilePage />} />
    <Route path={routes.leaderboard} element={<LeaderboardPage />} />
    <Route path={routes.login} element={<AuthorizationPage />} />
    <Route path={routes.game} element={<GamePage />} />
  </Routes>
);
