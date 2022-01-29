import { Route, Routes } from 'react-router-dom';

import { AuthGuard } from 'features/auth';

import { routes } from 'shared/config';

import { AuthorizationPage } from './authorization-page';
import { GamePage } from './game-page';
import { HomePage } from './home-page';
import { LeaderboardPage } from './leaderboard-page';
import { ProfilePage } from './profile-page';
import { RegistrationPage } from './registration-page';

export const Router = () => (
  <Routes>
    <Route
      path={routes.home}
      element={
        <AuthGuard>
          <HomePage />
        </AuthGuard>
      }
    />
    <Route
      path={routes.registration}
      element={
        <AuthGuard>
          <RegistrationPage />
        </AuthGuard>
      }
    />
    <Route
      path={routes.profile}
      element={
        <AuthGuard>
          <ProfilePage />
        </AuthGuard>
      }
    />
    <Route
      path={routes.leaderboard}
      element={
        <AuthGuard>
          <LeaderboardPage />
        </AuthGuard>
      }
    />
    <Route
      path={routes.login}
      element={
        <AuthGuard>
          <AuthorizationPage />
        </AuthGuard>
      }
    />
    <Route
      path={routes.game}
      element={
        <AuthGuard>
          <GamePage />
        </AuthGuard>
      }
    />
  </Routes>
);
