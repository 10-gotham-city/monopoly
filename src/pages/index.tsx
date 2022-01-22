import { Route, Routes } from 'react-router-dom';

import { Forum } from 'pages/forum/forum';

import { routes } from 'shared/config';

import { AuthorizationPage } from './authorization-page';
import { GamePage } from './game-page';
import { HomePage } from './home-page';
import { LeaderboardPage } from './leaderboard-page';
import { ProfilePage } from './profile-page';
import { RegistrationPage } from './registration-page';

export const Router = () => (
  <Routes>
    <Route path={routes.home} element={<HomePage />} />
    <Route path={routes.registration} element={<RegistrationPage />} />
    <Route path={routes.profile} element={<ProfilePage />} />
    <Route path={routes.leaderboard} element={<LeaderboardPage />} />
    <Route path={routes.login} element={<AuthorizationPage />} />
    <Route path={routes.game} element={<GamePage />} />
    <Route path={routes.forum} element={<Forum />} />
  </Routes>
);
