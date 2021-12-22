import { Route, Routes } from 'react-router-dom';
import { routes } from 'shared/config';

export const Router = () => (
  <Routes>
    <Route
      path={routes.home}
      element={<>App</>}
    />
    <Route path={routes.test} element={<>Test</>} />
  </Routes>
);
